package com.stitchly.dto;

import com.stitchly.entity.Review;
import java.time.LocalDateTime;

public class ReviewDto {
    private Long id;
    private Long orderId;
    private Long customerId;
    private String customerName;
    private String customerAvatarUrl;
    private Long designerId;
    private String designerBrandName;
    private Integer rating;
    private String comment;
    private LocalDateTime createdAt;

    public ReviewDto() {
    }

    public static ReviewDto fromEntity(Review review) {
        ReviewDto dto = new ReviewDto();
        dto.setId(review.getId());
        dto.setRating(review.getRating());
        dto.setComment(review.getComment());
        dto.setCreatedAt(review.getCreatedAt());

        if (review.getOrder() != null) {
            dto.setOrderId(review.getOrder().getId());
        }

        if (review.getCustomer() != null) {
            dto.setCustomerId(review.getCustomer().getId());
            dto.setCustomerName(review.getCustomer().getName());
            dto.setCustomerAvatarUrl(review.getCustomer().getAvatarUrl());
        }

        if (review.getDesigner() != null) {
            dto.setDesignerId(review.getDesigner().getId());
            dto.setDesignerBrandName(review.getDesigner().getBrandName());
        }
        return dto;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
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

    public String getCustomerAvatarUrl() {
        return customerAvatarUrl;
    }

    public void setCustomerAvatarUrl(String customerAvatarUrl) {
        this.customerAvatarUrl = customerAvatarUrl;
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

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
