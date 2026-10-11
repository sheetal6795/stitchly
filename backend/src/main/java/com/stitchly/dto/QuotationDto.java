package com.stitchly.dto;

import com.stitchly.entity.Quotation;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class QuotationDto {
    private Long id;
    private Long requirementId;
    private String requirementTitle;
    private String requirementClothingType;
    private Long designerId;
    private String designerBrandName;
    private String designerAvatarUrl;
    private boolean designerVerified;
    private Double designerRating;
    private BigDecimal quotePrice;
    private Integer estimatedDays;
    private String proposalNotes;
    private String fabricSuggestions;
    private String costBreakdown;
    private String status;
    private LocalDateTime createdAt;

    public QuotationDto() {
    }

    public static QuotationDto fromEntity(Quotation quotation) {
        QuotationDto dto = new QuotationDto();
        dto.setId(quotation.getId());
        dto.setQuotePrice(quotation.getQuotePrice());
        dto.setEstimatedDays(quotation.getEstimatedDays());
        dto.setProposalNotes(quotation.getProposalNotes());
        dto.setFabricSuggestions(quotation.getFabricSuggestions());
        dto.setCostBreakdown(quotation.getCostBreakdown());
        dto.setStatus(quotation.getStatus());
        dto.setCreatedAt(quotation.getCreatedAt());

        if (quotation.getRequirement() != null) {
            dto.setRequirementId(quotation.getRequirement().getId());
            dto.setRequirementTitle(quotation.getRequirement().getTitle());
            dto.setRequirementClothingType(quotation.getRequirement().getClothingType());
        }

        if (quotation.getDesigner() != null) {
            dto.setDesignerId(quotation.getDesigner().getId());
            dto.setDesignerBrandName(quotation.getDesigner().getBrandName());
            dto.setDesignerVerified(quotation.getDesigner().isVerified());
            dto.setDesignerRating(quotation.getDesigner().getRatingAverage());
            if (quotation.getDesigner().getUser() != null) {
                dto.setDesignerAvatarUrl(quotation.getDesigner().getUser().getAvatarUrl());
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

    public boolean isDesignerVerified() {
        return designerVerified;
    }

    public void setDesignerVerified(boolean designerVerified) {
        this.designerVerified = designerVerified;
    }

    public Double getDesignerRating() {
        return designerRating;
    }

    public void setDesignerRating(Double designerRating) {
        this.designerRating = designerRating;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
