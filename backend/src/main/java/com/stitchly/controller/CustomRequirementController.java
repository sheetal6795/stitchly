package com.stitchly.controller;

import com.stitchly.dto.ApiResponse;
import com.stitchly.dto.CreateRequirementRequest;
import com.stitchly.dto.CustomRequirementDto;
import com.stitchly.entity.User;
import com.stitchly.service.AuthService;
import com.stitchly.service.CustomRequirementService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requirements")
public class CustomRequirementController {

    private final CustomRequirementService customRequirementService;
    private final AuthService authService;

    public CustomRequirementController(CustomRequirementService customRequirementService, AuthService authService) {
        this.customRequirementService = customRequirementService;
        this.authService = authService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<CustomRequirementDto>> createRequirement(@Valid @RequestBody CreateRequirementRequest req) {
        User customer = authService.getCurrentAuthenticatedUser();
        CustomRequirementDto created = customRequirementService.createRequirement(customer, req);
        return ResponseEntity.ok(ApiResponse.ok("Custom requirement posted successfully", created));
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<CustomRequirementDto>>> getMyRequirements() {
        User customer = authService.getCurrentAuthenticatedUser();
        List<CustomRequirementDto> list = customRequirementService.getCustomerRequirements(customer);
        return ResponseEntity.ok(ApiResponse.ok(list));
    }

    @GetMapping("/open")
    public ResponseEntity<ApiResponse<List<CustomRequirementDto>>> getOpenRequirements(
            @RequestParam(required = false) String clothingType) {
        List<CustomRequirementDto> list = customRequirementService.getOpenRequirements(clothingType);
        return ResponseEntity.ok(ApiResponse.ok(list));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CustomRequirementDto>> getRequirementById(@PathVariable Long id) {
        CustomRequirementDto dto = customRequirementService.getRequirementById(id);
        return ResponseEntity.ok(ApiResponse.ok(dto));
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<ApiResponse<CustomRequirementDto>> cancelRequirement(@PathVariable Long id) {
        User customer = authService.getCurrentAuthenticatedUser();
        CustomRequirementDto cancelled = customRequirementService.cancelRequirement(customer, id);
        return ResponseEntity.ok(ApiResponse.ok("Requirement cancelled successfully", cancelled));
    }
}
