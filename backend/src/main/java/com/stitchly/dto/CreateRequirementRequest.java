package com.stitchly.dto;

import jakarta.validation.constraints.NotBlank;
import java.math.BigDecimal;
import java.time.LocalDate;

public class CreateRequirementRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Clothing type is required")
    private String clothingType;

    private String preferredFabric;

    private String preferredColors;

    private BigDecimal budgetMin;

    private BigDecimal budgetMax;

    private LocalDate deadline;

    private String inspirationImageUrl;

    private String notes;

    private String measurementsNotes;

    public CreateRequirementRequest() {
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
}
