package com.stitchly.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public class CreateQuotationRequest {

    @NotNull(message = "Requirement ID is required")
    private Long requirementId;

    @NotNull(message = "Quoted price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Quoted price must be greater than zero")
    private BigDecimal quotePrice;

    @NotNull(message = "Estimated days is required")
    @Min(value = 1, message = "Estimated days must be at least 1")
    private Integer estimatedDays;

    private String proposalNotes;

    private String fabricSuggestions;

    private String costBreakdown;

    public CreateQuotationRequest() {
    }

    public Long getRequirementId() {
        return requirementId;
    }

    public void setRequirementId(Long requirementId) {
        this.requirementId = requirementId;
    }

    public BigDecimal getQuotePrice() {
        return quotePrice;
    }

    public void setQuotePrice(BigDecimal quotePrice) {
        this.quotePrice = quotePrice;
    }

    public Integer getEstimatedDays() {
        return estimatedDays;
    }

    public void setEstimatedDays(Integer estimatedDays) {
        this.estimatedDays = estimatedDays;
    }

    public String getProposalNotes() {
        return proposalNotes;
    }

    public void setProposalNotes(String proposalNotes) {
        this.proposalNotes = proposalNotes;
    }

    public String getFabricSuggestions() {
        return fabricSuggestions;
    }

    public void setFabricSuggestions(String fabricSuggestions) {
        this.fabricSuggestions = fabricSuggestions;
    }

    public String getCostBreakdown() {
        return costBreakdown;
    }

    public void setCostBreakdown(String costBreakdown) {
        this.costBreakdown = costBreakdown;
    }
}
