package com.stitchly.controller;

import com.stitchly.dto.*;
import com.stitchly.entity.User;
import com.stitchly.service.AuthService;
import com.stitchly.service.QuotationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quotations")
public class QuotationController {

    private final QuotationService quotationService;
    private final AuthService authService;

    public QuotationController(QuotationService quotationService, AuthService authService) {
        this.quotationService = quotationService;
        this.authService = authService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<QuotationDto>> submitQuotation(@Valid @RequestBody CreateQuotationRequest req) {
        User designerUser = authService.getCurrentAuthenticatedUser();
        QuotationDto created = quotationService.submitQuotation(designerUser, req);
        return ResponseEntity.ok(ApiResponse.ok("Quotation submitted successfully", created));
    }

    @GetMapping("/requirement/{requirementId}")
    public ResponseEntity<ApiResponse<List<QuotationDto>>> getQuotationsForRequirement(@PathVariable Long requirementId) {
        User customer = authService.getCurrentAuthenticatedUser();
        List<QuotationDto> list = quotationService.getQuotationsForRequirement(customer, requirementId);
        return ResponseEntity.ok(ApiResponse.ok(list));
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<QuotationDto>>> getMyQuotations() {
        User designerUser = authService.getCurrentAuthenticatedUser();
        List<QuotationDto> list = quotationService.getQuotationsByDesigner(designerUser);
        return ResponseEntity.ok(ApiResponse.ok(list));
    }

    @PostMapping("/{id}/accept")
    public ResponseEntity<ApiResponse<OrderDto>> acceptQuotation(
            @PathVariable Long id,
            @RequestBody(required = false) AcceptQuotationRequest req) {
        User customer = authService.getCurrentAuthenticatedUser();
        OrderDto order = quotationService.acceptQuotation(customer, id, req != null ? req : new AcceptQuotationRequest());
        return ResponseEntity.ok(ApiResponse.ok("Quotation accepted and order created successfully!", order));
    }
}
