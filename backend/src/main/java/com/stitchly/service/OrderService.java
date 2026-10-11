package com.stitchly.service;

import com.stitchly.dto.OrderDto;
import com.stitchly.dto.UpdateOrderStatusRequest;
import com.stitchly.entity.*;
import com.stitchly.exception.ResourceNotFoundException;
import com.stitchly.exception.UnauthorizedException;
import com.stitchly.repository.DesignerProfileRepository;
import com.stitchly.repository.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final DesignerProfileRepository designerProfileRepository;

    public OrderService(OrderRepository orderRepository, DesignerProfileRepository designerProfileRepository) {
        this.orderRepository = orderRepository;
        this.designerProfileRepository = designerProfileRepository;
    }

    public List<OrderDto> getCustomerOrders(User customer) {
        return orderRepository.findByCustomerIdOrderByCreatedAtDesc(customer.getId()).stream()
                .map(OrderDto::fromEntity)
                .collect(Collectors.toList());
    }

    public List<OrderDto> getDesignerOrders(User designerUser) {
        DesignerProfile designer = designerProfileRepository.findByUser(designerUser)
                .orElseThrow(() -> new UnauthorizedException("Designer profile not found"));

        return orderRepository.findByDesignerIdOrderByCreatedAtDesc(designer.getId()).stream()
                .map(OrderDto::fromEntity)
                .collect(Collectors.toList());
    }

    public List<OrderDto> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(OrderDto::fromEntity)
                .collect(Collectors.toList());
    }

    public OrderDto getOrderById(Long id, User currentUser) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id));

        // Authorization check
        boolean isCustomer = order.getCustomer().getId().equals(currentUser.getId());
        boolean isDesigner = order.getDesigner().getUser().getId().equals(currentUser.getId());
        boolean isAdmin = currentUser.getRole() == Role.ROLE_ADMIN;

        if (!isCustomer && !isDesigner && !isAdmin) {
            throw new UnauthorizedException("You are not authorized to view this order");
        }

        return OrderDto.fromEntity(order);
    }

    @Transactional
    public OrderDto updateOrderStatus(Long orderId, User user, UpdateOrderStatusRequest req) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));

        boolean isDesigner = order.getDesigner().getUser().getId().equals(user.getId());
        boolean isAdmin = user.getRole() == Role.ROLE_ADMIN;
        boolean isCustomer = order.getCustomer().getId().equals(user.getId());

        // Customers can only mark as COMPLETED if received
        if (!isDesigner && !isAdmin && (!isCustomer || !"COMPLETED".equalsIgnoreCase(req.getStatus()))) {
            throw new UnauthorizedException("You are not authorized to change this order status");
        }

        String oldStatus = order.getStatus();
        String newStatus = req.getStatus().toUpperCase();
        order.setStatus(newStatus);
        order.setUpdatedAt(LocalDateTime.now());

        if (req.getTrackingNumber() != null && !req.getTrackingNumber().trim().isEmpty()) {
            order.setTrackingNumber(req.getTrackingNumber().trim());
        }
        if (req.getDesignerNotes() != null) {
            order.setDesignerNotes(req.getDesignerNotes().trim());
        }

        // Increment designer completed order count if completed
        if ("COMPLETED".equalsIgnoreCase(newStatus) && !"COMPLETED".equalsIgnoreCase(oldStatus)) {
            DesignerProfile designer = order.getDesigner();
            designer.setCompletedOrdersCount(designer.getCompletedOrdersCount() + 1);
            designerProfileRepository.save(designer);
        }

        Order updated = orderRepository.save(order);
        return OrderDto.fromEntity(updated);
    }
}
