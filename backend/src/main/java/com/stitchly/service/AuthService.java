package com.stitchly.service;

import com.stitchly.dto.AuthResponse;
import com.stitchly.dto.LoginRequest;
import com.stitchly.dto.RegisterRequest;
import com.stitchly.dto.UserDto;
import com.stitchly.entity.DesignerProfile;
import com.stitchly.entity.Role;
import com.stitchly.entity.User;
import com.stitchly.exception.BadRequestException;
import com.stitchly.exception.UnauthorizedException;
import com.stitchly.repository.DesignerProfileRepository;
import com.stitchly.repository.UserRepository;
import com.stitchly.security.JwtTokenProvider;
import com.stitchly.security.UserPrincipal;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final DesignerProfileRepository designerProfileRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    public AuthService(UserRepository userRepository,
                       DesignerProfileRepository designerProfileRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtTokenProvider tokenProvider) {
        this.userRepository = userRepository;
        this.designerProfileRepository = designerProfileRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
    }

    @Transactional
    public AuthResponse register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail().toLowerCase().trim())) {
            throw new BadRequestException("Email is already registered: " + req.getEmail());
        }

        User user = new User();
        user.setName(req.getName().trim());
        user.setEmail(req.getEmail().toLowerCase().trim());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setPhone(req.getPhone());
        user.setRole(req.getRole() != null ? req.getRole() : Role.ROLE_CUSTOMER);
        user.setActive(true);

        User savedUser = userRepository.save(user);

        if (savedUser.getRole() == Role.ROLE_DESIGNER) {
            DesignerProfile profile = new DesignerProfile();
            profile.setUser(savedUser);
            profile.setBrandName(req.getBrandName() != null && !req.getBrandName().trim().isEmpty() 
                    ? req.getBrandName().trim() 
                    : req.getName() + " Atelier");
            profile.setBio(req.getBio() != null ? req.getBio().trim() : "Custom bespoke fashion designer.");
            profile.setSpecialties(req.getSpecialties() != null ? req.getSpecialties().trim() : "Bespoke Couture");
            profile.setExperienceYears(req.getExperienceYears() != null ? req.getExperienceYears() : 1);
            profile.setLocation(req.getLocation() != null ? req.getLocation().trim() : "Global Studio");
            profile.setInstagramHandle(req.getInstagramHandle());
            profile.setVerified(false); // Admin verifies new designers
            designerProfileRepository.save(profile);
            savedUser.setDesignerProfile(profile);
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail().toLowerCase().trim(), req.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        return new AuthResponse(jwt, UserDto.fromEntity(savedUser));
    }

    public AuthResponse login(LoginRequest req) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail().toLowerCase().trim(), req.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        User user = userRepository.findByEmail(req.getEmail().toLowerCase().trim())
                .orElseThrow(() -> new UnauthorizedException("User not found"));

        return new AuthResponse(jwt, UserDto.fromEntity(user));
    }

    public User getCurrentAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof UserPrincipal principal)) {
            throw new UnauthorizedException("User is not authenticated");
        }
        return userRepository.findById(principal.getId())
                .orElseThrow(() -> new UnauthorizedException("Authenticated user no longer exists"));
    }
}
