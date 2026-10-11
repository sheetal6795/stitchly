package com.stitchly.controller;

import com.stitchly.dto.ApiResponse;
import com.stitchly.dto.OrderDto;
import com.stitchly.dto.UpdateOrderStatusRequest;
import com.stitchly.entity.User;
import com.stitchly.service.AuthService;
import com.stitchly.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;
    private final AuthService authService;

    public OrderController(OrderService orderService, AuthService authService) {
        this.orderService = orderService;
        this.authService = authService;
    }

    @GetMapping("/customer")
    public ResponseEntity<ApiResponse<List<OrderDto>>> getCustomerOrders() {
        User customer = authService.getCurrentAuthenticatedUser();
        List<OrderDto> list = orderService.getCustomerOrders(customer);
        return ResponseEntity.ok(ApiResponse.ok(list));
    }

    @GetMapping("/designer")
    public ResponseEntity<ApiResponse<List<OrderDto>>> getDesignerOrders() {
        User designerUser = authService.getCurrentAuthenticatedUser();
        List<OrderDto> list = orderService.getDesignerOrders(designerUser);
        return ResponseEntity.ok(ApiResponse.ok(list));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<OrderDto>> getOrderById(@PathVariable Long id) {
        User user = authService.getCurrentAuthenticatedUser();
        OrderDto order = orderService.getOrderById(id, user);
        return ResponseEntity.ok(ApiResponse.ok(order));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<OrderDto>> updateOrderStatus(
            @PathVariable Long id,
            @Valid @RequestBody UpdateOrderStatusRequest req) {
        User user = authService.getCurrentAuthenticatedUser();
        OrderDto updated = orderService.updateOrderStatus(id, user, req);
        return ResponseEntity.ok(ApiResponse.ok("Order status updated successfully", updated));
    }
}
