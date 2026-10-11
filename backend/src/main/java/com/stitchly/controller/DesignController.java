package com.stitchly.controller;

import com.stitchly.dto.ApiResponse;
import com.stitchly.dto.CreateDesignRequest;
import com.stitchly.dto.DesignDto;
import com.stitchly.entity.User;
import com.stitchly.service.AuthService;
import com.stitchly.service.DesignService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/designs")
public class DesignController {

    private final DesignService designService;
    private final AuthService authService;

    public DesignController(DesignService designService, AuthService authService) {
        this.designService = designService;
        this.authService = authService;
    }

    private User getOptionalCurrentUser() {
        try {
            return authService.getCurrentAuthenticatedUser();
        } catch (Exception e) {
            return null;
        }
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<DesignDto>>> getDesigns(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) String search) {
        User currentUser = getOptionalCurrentUser();
        List<DesignDto> list = designService.searchDesigns(category, minPrice, maxPrice, search, currentUser);
        return ResponseEntity.ok(ApiResponse.ok(list));
    }

    @GetMapping("/featured")
    public ResponseEntity<ApiResponse<List<DesignDto>>> getFeaturedDesigns() {
        User currentUser = getOptionalCurrentUser();
        List<DesignDto> list = designService.getFeaturedDesigns(currentUser);
        return ResponseEntity.ok(ApiResponse.ok(list));
    }

    @GetMapping("/designer/{designerId}")
    public ResponseEntity<ApiResponse<List<DesignDto>>> getDesignsByDesigner(@PathVariable Long designerId) {
        User currentUser = getOptionalCurrentUser();
        List<DesignDto> list = designService.getDesignsByDesignerId(designerId, currentUser);
        return ResponseEntity.ok(ApiResponse.ok(list));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<DesignDto>> getDesignById(@PathVariable Long id) {
        User currentUser = getOptionalCurrentUser();
        DesignDto dto = designService.getDesignById(id, currentUser);
        return ResponseEntity.ok(ApiResponse.ok(dto));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<DesignDto>> createDesign(@Valid @RequestBody CreateDesignRequest req) {
        User user = authService.getCurrentAuthenticatedUser();
        DesignDto created = designService.createDesign(user, req);
        return ResponseEntity.ok(ApiResponse.ok("Design created successfully", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<DesignDto>> updateDesign(@PathVariable Long id, @Valid @RequestBody CreateDesignRequest req) {
        User user = authService.getCurrentAuthenticatedUser();
        DesignDto updated = designService.updateDesign(user, id, req);
        return ResponseEntity.ok(ApiResponse.ok("Design updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteDesign(@PathVariable Long id) {
        User user = authService.getCurrentAuthenticatedUser();
        designService.deleteDesign(user, id);
        return ResponseEntity.ok(ApiResponse.ok("Design deleted successfully", "Deleted"));
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<ApiResponse<Map<String, Object>>> toggleLike(@PathVariable Long id) {
        User user = authService.getCurrentAuthenticatedUser();
        boolean liked = designService.toggleLikeDesign(user, id);
        return ResponseEntity.ok(ApiResponse.ok(Map.of("liked", liked)));
    }

    @GetMapping("/my-likes")
    public ResponseEntity<ApiResponse<List<DesignDto>>> getMyLikedDesigns() {
        User user = authService.getCurrentAuthenticatedUser();
        List<DesignDto> list = designService.getUserLikedDesigns(user);
        return ResponseEntity.ok(ApiResponse.ok(list));
    }

    @PostMapping("/{id}/report")
    public ResponseEntity<ApiResponse<String>> reportDesign(@PathVariable Long id) {
        designService.reportDesign(id, true);
        return ResponseEntity.ok(ApiResponse.ok("Design reported for moderation", "Reported"));
    }
}
