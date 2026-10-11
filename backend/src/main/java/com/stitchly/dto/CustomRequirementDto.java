package com.stitchly.dto;

import com.stitchly.entity.CustomRequirement;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class CustomRequirementDto {
    private Long id;
    private Long customerId;
    private String customerName;
    private String customerEmail;
    private String customerAvatarUrl;
    private String title;
    private String clothingType;
    private String preferredFabric;
    private String preferredColors;
    private BigDecimal budgetMin;
    private BigDecimal budgetMax;
    private LocalDate deadline;
    private String inspirationImageUrl;
    private String notes;
    private String measurementsNotes;
    private String status;
    private Integer quotationsCount;
    private LocalDateTime createdAt;

    public CustomRequirementDto() {
    }

    public static CustomRequirementDto fromEntity(CustomRequirement req) {
        CustomRequirementDto dto = new CustomRequirementDto();
        dto.setId(req.getId());
        dto.setTitle(req.getTitle());
        dto.setClothingType(req.getClothingType());
        dto.setPreferredFabric(req.getPreferredFabric());
        dto.setPreferredColors(req.getPreferredColors());
        dto.setBudgetMin(req.getBudgetMin());
        dto.setBudgetMax(req.getBudgetMax());
        dto.setDeadline(req.getDeadline());
        dto.setInspirationImageUrl(req.getInspirationImageUrl());
        dto.setNotes(req.getNotes());
        dto.setMeasurementsNotes(req.getMeasurementsNotes());
        dto.setStatus(req.getStatus());
        dto.setQuotationsCount(req.getQuotationsCount());
        dto.setCreatedAt(req.getCreatedAt());

        if (req.getCustomer() != null) {
            dto.setCustomerId(req.getCustomer().getId());
            dto.setCustomerName(req.getCustomer().getName());
            dto.setCustomerEmail(req.getCustomer().getEmail());
            dto.setCustomerAvatarUrl(req.getCustomer().getAvatarUrl());
        }
        return dto;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getCustomerAvatarUrl() {
        return customerAvatarUrl;
    }

    public void setCustomerAvatarUrl(String customerAvatarUrl) {
        this.customerAvatarUrl = customerAvatarUrl;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getClothingType() {
        return clothingType;
    }

    public void setClothingType(String clothingType) {
        this.clothingType = clothingType;
    }

    public String getPreferredFabric() {
        return preferredFabric;
    }

    public void setPreferredFabric(String preferredFabric) {
        this.preferredFabric = preferredFabric;
    }

    public String getPreferredColors() {
        return preferredColors;
    }

    public void setPreferredColors(String preferredColors) {
        this.preferredColors = preferredColors;
    }

    public BigDecimal getBudgetMin() {
        return budgetMin;
    }

    public void setBudgetMin(BigDecimal budgetMin) {
        this.budgetMin = budgetMin;
    }

    public BigDecimal getBudgetMax() {
        return budgetMax;
    }

    public void setBudgetMax(BigDecimal budgetMax) {
        this.budgetMax = budgetMax;
    }

    public LocalDate getDeadline() {
        return deadline;
    }

    public void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }

    public String getInspirationImageUrl() {
        return inspirationImageUrl;
    }

    public void setInspirationImageUrl(String inspirationImageUrl) {
        this.inspirationImageUrl = inspirationImageUrl;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getMeasurementsNotes() {
        return measurementsNotes;
    }

    public void setMeasurementsNotes(String measurementsNotes) {
        this.measurementsNotes = measurementsNotes;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getQuotationsCount() {
        return quotationsCount;
    }

    public void setQuotationsCount(Integer quotationsCount) {
        this.quotationsCount = quotationsCount;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
