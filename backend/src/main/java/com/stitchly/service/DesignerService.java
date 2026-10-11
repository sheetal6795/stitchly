package com.stitchly.service;

import com.stitchly.dto.DesignerProfileDto;
import com.stitchly.dto.UpdateDesignerProfileRequest;
import com.stitchly.entity.DesignerProfile;
import com.stitchly.entity.User;
import com.stitchly.exception.ResourceNotFoundException;
import com.stitchly.repository.DesignerProfileRepository;
import com.stitchly.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DesignerService {

    private final DesignerProfileRepository designerProfileRepository;
    private final UserRepository userRepository;

    public DesignerService(DesignerProfileRepository designerProfileRepository, UserRepository userRepository) {
        this.designerProfileRepository = designerProfileRepository;
        this.userRepository = userRepository;
    }

    public List<DesignerProfileDto> getAllDesigners() {
        return designerProfileRepository.findAll().stream()
                .map(DesignerProfileDto::fromEntity)
                .collect(Collectors.toList());
    }

    public List<DesignerProfileDto> getVerifiedDesigners() {
        return designerProfileRepository.findByVerifiedTrue().stream()
                .map(DesignerProfileDto::fromEntity)
                .collect(Collectors.toList());
    }

    public List<DesignerProfileDto> getPendingVerifications() {
        return designerProfileRepository.findByVerifiedFalse().stream()
                .map(DesignerProfileDto::fromEntity)
                .collect(Collectors.toList());
    }

    public List<DesignerProfileDto> searchDesigners(String specialty, String search) {
        return designerProfileRepository.searchDesigners(
                (specialty != null && !specialty.trim().isEmpty()) ? specialty.trim() : null,
                (search != null && !search.trim().isEmpty()) ? search.trim() : null
        ).stream().map(DesignerProfileDto::fromEntity).collect(Collectors.toList());
    }

    public DesignerProfileDto getDesignerProfileById(Long id) {
        DesignerProfile profile = designerProfileRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Designer profile not found with id: " + id));
        return DesignerProfileDto.fromEntity(profile);
    }

    public DesignerProfileDto getDesignerProfileByUserId(Long userId) {
        DesignerProfile profile = designerProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Designer profile not found for user id: " + userId));
        return DesignerProfileDto.fromEntity(profile);
    }

    @Transactional
    public DesignerProfileDto updateProfile(User user, UpdateDesignerProfileRequest req) {
        DesignerProfile profile = designerProfileRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("Designer profile not found for user: " + user.getEmail()));

        if (req.getBrandName() != null && !req.getBrandName().trim().isEmpty()) {
            profile.setBrandName(req.getBrandName().trim());
        }
        if (req.getBio() != null) {
            profile.setBio(req.getBio().trim());
        }
        if (req.getSpecialties() != null) {
            profile.setSpecialties(req.getSpecialties().trim());
        }
        if (req.getExperienceYears() != null) {
            profile.setExperienceYears(req.getExperienceYears());
        }
        if (req.getLocation() != null) {
            profile.setLocation(req.getLocation().trim());
        }
        if (req.getPricingTier() != null) {
            profile.setPricingTier(req.getPricingTier().trim());
        }
        if (req.getBannerUrl() != null) {
            profile.setBannerUrl(req.getBannerUrl().trim());
        }
        if (req.getInstagramHandle() != null) {
            profile.setInstagramHandle(req.getInstagramHandle().trim());
        }

        if (req.getAvatarUrl() != null) {
            user.setAvatarUrl(req.getAvatarUrl().trim());
            userRepository.save(user);
        }

        DesignerProfile updated = designerProfileRepository.save(profile);
        return DesignerProfileDto.fromEntity(updated);
    }

    @Transactional
    public DesignerProfileDto verifyDesigner(Long id, boolean verified) {
        DesignerProfile profile = designerProfileRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Designer profile not found with id: " + id));
        profile.setVerified(verified);
        DesignerProfile updated = designerProfileRepository.save(profile);
        return DesignerProfileDto.fromEntity(updated);
    }
}
