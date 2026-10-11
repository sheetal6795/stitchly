package com.stitchly.controller;

import com.stitchly.dto.ApiResponse;
import com.stitchly.dto.UserDto;
import com.stitchly.entity.User;
import com.stitchly.service.AuthService;
import com.stitchly.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final AuthService authService;

    public UserController(UserService userService, AuthService authService) {
        this.userService = userService;
        this.authService = authService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserDto>> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(userService.getUserById(id)));
    }

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<UserDto>> updateProfile(@RequestBody Map<String, String> body) {
        User currentUser = authService.getCurrentAuthenticatedUser();
        String name = body.get("name");
        String phone = body.get("phone");
        String avatarUrl = body.get("avatarUrl");
        UserDto updated = userService.updateUser(currentUser.getId(), name, phone, avatarUrl);
        return ResponseEntity.ok(ApiResponse.ok("Profile updated successfully", updated));
    }
}
