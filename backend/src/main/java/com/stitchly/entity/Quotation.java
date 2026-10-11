package com.stitchly.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "quotations")
public class Quotation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "requirement_id", nullable = false)
    private CustomRequirement requirement;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "designer_id", nullable = false)
    private DesignerProfile designer;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal quotePrice;

    @Column(nullable = false)
    private Integer estimatedDays;

    @Column(length = 3000)
    private String proposalNotes;

    @Column(length = 1500)
    private String fabricSuggestions;

    @Column(length = 1500)
    private String costBreakdown;

    @Column(nullable = false)
    private String status = "PENDING"; // PENDING, ACCEPTED, REJECTED, WITHDRAWN

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Quotation() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CustomRequirement getRequirement() {
        return requirement;
    }

    public void setRequirement(CustomRequirement requirement) {
        this.requirement = requirement;
    }

    public DesignerProfile getDesigner() {
        return designer;
    }

    public void setDesigner(DesignerProfile designer) {
        this.designer = designer;
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
