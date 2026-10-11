package com.stitchly.dto;

import com.stitchly.entity.Order;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class OrderDto {
    private Long id;
    private String orderNumber;
    private Long requirementId;
    private String requirementTitle;
    private String requirementClothingType;
    private Long quotationId;
    private Long customerId;
    private String customerName;
    private String customerEmail;
    private Long designerId;
    private String designerBrandName;
    private String designerAvatarUrl;
    private BigDecimal totalAmount;
    private String status;
    private String shippingAddress;
    private String trackingNumber;
    private String designerNotes;
    private LocalDate deadline;
    private boolean reviewed;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public OrderDto() {
    }

    public static OrderDto fromEntity(Order order) {
        OrderDto dto = new OrderDto();
        dto.setId(order.getId());
        dto.setOrderNumber(order.getOrderNumber());
        dto.setTotalAmount(order.getTotalAmount());
        dto.setStatus(order.getStatus());
        dto.setShippingAddress(order.getShippingAddress());
        dto.setTrackingNumber(order.getTrackingNumber());
        dto.setDesignerNotes(order.getDesignerNotes());
        dto.setDeadline(order.getDeadline());
        dto.setReviewed(order.isReviewed());
        dto.setCreatedAt(order.getCreatedAt());
        dto.setUpdatedAt(order.getUpdatedAt());

        if (order.getRequirement() != null) {
            dto.setRequirementId(order.getRequirement().getId());
            dto.setRequirementTitle(order.getRequirement().getTitle());
            dto.setRequirementClothingType(order.getRequirement().getClothingType());
        }

        if (order.getQuotation() != null) {
            dto.setQuotationId(order.getQuotation().getId());
        }

        if (order.getCustomer() != null) {
            dto.setCustomerId(order.getCustomer().getId());
            dto.setCustomerName(order.getCustomer().getName());
            dto.setCustomerEmail(order.getCustomer().getEmail());
        }

        if (order.getDesigner() != null) {
            dto.setDesignerId(order.getDesigner().getId());
            dto.setDesignerBrandName(order.getDesigner().getBrandName());
            if (order.getDesigner().getUser() != null) {
                dto.setDesignerAvatarUrl(order.getDesigner().getUser().getAvatarUrl());
            }
        }
        return dto;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public Long getRequirementId() {
        return requirementId;
    }

    public void setRequirementId(Long requirementId) {
        this.requirementId = requirementId;
    }

    public String getRequirementTitle() {
        return requirementTitle;
    }

    public void setRequirementTitle(String requirementTitle) {
        this.requirementTitle = requirementTitle;
    }

    public String getRequirementClothingType() {
        return requirementClothingType;
    }

    public void setRequirementClothingType(String requirementClothingType) {
        this.requirementClothingType = requirementClothingType;
    }

    public Long getQuotationId() {
        return quotationId;
    }

    public void setQuotationId(Long quotationId) {
        this.quotationId = quotationId;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public Long getDesignerId() {
        return designerId;
    }

    public void setDesignerId(Long designerId) {
        this.designerId = designerId;
    }

    public String getDesignerBrandName() {
        return designerBrandName;
    }

    public void setDesignerBrandName(String designerBrandName) {
        this.designerBrandName = designerBrandName;
    }

    public String getDesignerAvatarUrl() {
        return designerAvatarUrl;
    }

    public void setDesignerAvatarUrl(String designerAvatarUrl) {
        this.designerAvatarUrl = designerAvatarUrl;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public String getTrackingNumber() {
        return trackingNumber;
    }

    public void setTrackingNumber(String trackingNumber) {
        this.trackingNumber = trackingNumber;
    }

    public String getDesignerNotes() {
        return designerNotes;
    }

    public void setDesignerNotes(String designerNotes) {
        this.designerNotes = designerNotes;
    }

    public LocalDate getDeadline() {
        return deadline;
    }

    public void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }

    public boolean isReviewed() {
        return reviewed;
    }

    public void setReviewed(boolean reviewed) {
        this.reviewed = reviewed;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
