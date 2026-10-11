package com.stitchly.controller;

import com.stitchly.dto.ApiResponse;
import com.stitchly.dto.DesignerProfileDto;
import com.stitchly.dto.UpdateDesignerProfileRequest;
import com.stitchly.entity.User;
import com.stitchly.service.AuthService;
import com.stitchly.service.DesignerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class DesignerController {

    private final DesignerService designerService;
    private final AuthService authService;

    public DesignerController(DesignerService designerService, AuthService authService) {
        this.designerService = designerService;
        this.authService = authService;
    }

    // Public: browse designers with filters
    @GetMapping("/designers")
    public ResponseEntity<ApiResponse<List<DesignerProfileDto>>> getDesigners(
            @RequestParam(required = false) String specialty,
            @RequestParam(required = false) String search) {
        List<DesignerProfileDto> list = designerService.searchDesigners(specialty, search);
        return ResponseEntity.ok(ApiResponse.ok(list));
    }

    // Public: get specific designer profile
    @GetMapping("/designers/{id}")
    public ResponseEntity<ApiResponse<DesignerProfileDto>> getDesignerById(@PathVariable Long id) {
        DesignerProfileDto dto = designerService.getDesignerProfileById(id);
        return ResponseEntity.ok(ApiResponse.ok(dto));
    }

    // Designer: get own profile
    @GetMapping("/designer/me")
    public ResponseEntity<ApiResponse<DesignerProfileDto>> getMyProfile() {
        User user = authService.getCurrentAuthenticatedUser();
        DesignerProfileDto dto = designerService.getDesignerProfileByUserId(user.getId());
        return ResponseEntity.ok(ApiResponse.ok(dto));
    }

    // Designer: update own profile
    @PutMapping("/designer/profile")
    public ResponseEntity<ApiResponse<DesignerProfileDto>> updateProfile(@RequestBody UpdateDesignerProfileRequest req) {
        User user = authService.getCurrentAuthenticatedUser();
        DesignerProfileDto updated = designerService.updateProfile(user, req);
        return ResponseEntity.ok(ApiResponse.ok("Profile updated successfully", updated));
    }
}
