package com.stitchly.controller;

import com.stitchly.dto.*;
import com.stitchly.entity.Role;
import com.stitchly.repository.*;
import com.stitchly.service.DesignerService;
import com.stitchly.service.DesignService;
import com.stitchly.service.OrderService;
import com.stitchly.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserService userService;
    private final DesignerService designerService;
    private final DesignService designService;
    private final OrderService orderService;
    private final UserRepository userRepository;
    private final DesignerProfileRepository designerProfileRepository;
    private final DesignRepository designRepository;
    private final CustomRequirementRepository customRequirementRepository;
    private final QuotationRepository quotationRepository;
    private final OrderRepository orderRepository;

    public AdminController(UserService userService,
                           DesignerService designerService,
                           DesignService designService,
                           OrderService orderService,
                           UserRepository userRepository,
                           DesignerProfileRepository designerProfileRepository,
                           DesignRepository designRepository,
                           CustomRequirementRepository customRequirementRepository,
                           QuotationRepository quotationRepository,
                           OrderRepository orderRepository) {
        this.userService = userService;
        this.designerService = designerService;
        this.designService = designService;
        this.orderService = orderService;
        this.userRepository = userRepository;
        this.designerProfileRepository = designerProfileRepository;
        this.designRepository = designRepository;
        this.customRequirementRepository = customRequirementRepository;
        this.quotationRepository = quotationRepository;
        this.orderRepository = orderRepository;
    }

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<AdminStatsDto>> getPlatformStats() {
        AdminStatsDto stats = new AdminStatsDto();
        stats.setTotalUsers(userRepository.count());
        stats.setTotalCustomers(userRepository.countByRole(Role.ROLE_CUSTOMER));
        stats.setTotalDesigners(userRepository.countByRole(Role.ROLE_DESIGNER));
        stats.setVerifiedDesigners(designerProfileRepository.countByVerifiedTrue());
        stats.setPendingVerifications(designerProfileRepository.countByVerifiedFalse());
        stats.setTotalDesigns(designRepository.count());
        stats.setTotalRequirements(customRequirementRepository.count());
        stats.setOpenRequirements(customRequirementRepository.countByStatus("OPEN"));
        stats.setTotalQuotations(quotationRepository.count());
        stats.setTotalOrders(orderRepository.count());
        stats.setActiveOrders(orderRepository.countByStatus("IN_PRODUCTION") + orderRepository.countByStatus("PLACED"));
        stats.setGrossMerchandiseValue(orderRepository.calculateTotalGrossMerchandiseValue());
        stats.setReportedDesignsCount(designRepository.findByReportedTrue().size());

        return ResponseEntity.ok(ApiResponse.ok(stats));
    }

    @GetMapping("/users")
    public ResponseEntity<ApiResponse<List<UserDto>>> getAllUsers() {
        return ResponseEntity.ok(ApiResponse.ok(userService.getAllUsers()));
    }

    @PutMapping("/users/{id}/toggle-status")
    public ResponseEntity<ApiResponse<UserDto>> toggleUserStatus(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok("User status updated", userService.toggleUserStatus(id)));
    }

    @GetMapping("/designers/pending")
    public ResponseEntity<ApiResponse<List<DesignerProfileDto>>> getPendingDesigners() {
        return ResponseEntity.ok(ApiResponse.ok(designerService.getPendingVerifications()));
    }

    @PutMapping("/designers/{id}/verify")
    public ResponseEntity<ApiResponse<DesignerProfileDto>> verifyDesigner(
            @PathVariable Long id,
            @RequestBody Map<String, Boolean> body) {
        boolean verified = body.getOrDefault("verified", true);
        DesignerProfileDto updated = designerService.verifyDesigner(id, verified);
        return ResponseEntity.ok(ApiResponse.ok("Designer verification status updated", updated));
    }

    @GetMapping("/designs/reported")
    public ResponseEntity<ApiResponse<List<DesignDto>>> getReportedDesigns() {
        return ResponseEntity.ok(ApiResponse.ok(designService.getReportedDesigns()));
    }

    @PutMapping("/designs/{id}/dismiss-report")
    public ResponseEntity<ApiResponse<String>> dismissReport(@PathVariable Long id) {
        designService.reportDesign(id, false);
        return ResponseEntity.ok(ApiResponse.ok("Report dismissed", "Dismissed"));
    }

    @GetMapping("/orders")
    public ResponseEntity<ApiResponse<List<OrderDto>>> getAllOrders() {
        return ResponseEntity.ok(ApiResponse.ok(orderService.getAllOrders()));
    }
}
