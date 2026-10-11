package com.stitchly.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "custom_requirements")
public class CustomRequirement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private User customer;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String clothingType;

    private String preferredFabric;

    private String preferredColors;

    @Column(precision = 10, scale = 2)
    private BigDecimal budgetMin;

    @Column(precision = 10, scale = 2)
    private BigDecimal budgetMax;

    private LocalDate deadline;

    @Column(length = 1000)
    private String inspirationImageUrl;

    @Column(length = 3000)
    private String notes;

    @Column(length = 1500)
    private String measurementsNotes;

    @Column(nullable = false)
    private String status = "OPEN"; // OPEN, AWARDED, CANCELLED, COMPLETED

    private Integer quotationsCount = 0;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public CustomRequirement() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getCustomer() {
        return customer;
    }

    public void setCustomer(User customer) {
        this.customer = customer;
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
