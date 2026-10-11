package com.stitchly.controller;

import com.stitchly.dto.ApiResponse;
import com.stitchly.dto.CreateReviewRequest;
import com.stitchly.dto.ReviewDto;
import com.stitchly.entity.User;
import com.stitchly.service.AuthService;
import com.stitchly.service.ReviewService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;
    private final AuthService authService;

    public ReviewController(ReviewService reviewService, AuthService authService) {
        this.reviewService = reviewService;
        this.authService = authService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ReviewDto>> submitReview(@Valid @RequestBody CreateReviewRequest req) {
        User customer = authService.getCurrentAuthenticatedUser();
        ReviewDto created = reviewService.submitReview(customer, req);
        return ResponseEntity.ok(ApiResponse.ok("Review submitted successfully", created));
    }

    @GetMapping("/designer/{designerId}")
    public ResponseEntity<ApiResponse<List<ReviewDto>>> getDesignerReviews(@PathVariable Long designerId) {
        List<ReviewDto> list = reviewService.getDesignerReviews(designerId);
        return ResponseEntity.ok(ApiResponse.ok(list));
    }
}
