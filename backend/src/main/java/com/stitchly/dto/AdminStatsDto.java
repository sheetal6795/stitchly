package com.stitchly.dto;

import java.math.BigDecimal;

public class AdminStatsDto {
    private long totalUsers;
    private long totalCustomers;
    private long totalDesigners;
    private long verifiedDesigners;
    private long pendingVerifications;
    private long totalDesigns;
    private long totalRequirements;
    private long openRequirements;
    private long totalQuotations;
    private long totalOrders;
    private long activeOrders;
    private BigDecimal grossMerchandiseValue;
    private long reportedDesignsCount;

    public AdminStatsDto() {
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public long getTotalCustomers() {
        return totalCustomers;
    }

    public void setTotalCustomers(long totalCustomers) {
        this.totalCustomers = totalCustomers;
    }

    public long getTotalDesigners() {
        return totalDesigners;
    }

    public void setTotalDesigners(long totalDesigners) {
        this.totalDesigners = totalDesigners;
    }

    public long getVerifiedDesigners() {
        return verifiedDesigners;
    }

    public void setVerifiedDesigners(long verifiedDesigners) {
        this.verifiedDesigners = verifiedDesigners;
    }

    public long getPendingVerifications() {
        return pendingVerifications;
    }

    public void setPendingVerifications(long pendingVerifications) {
        this.pendingVerifications = pendingVerifications;
    }

    public long getTotalDesigns() {
        return totalDesigns;
    }

    public void setTotalDesigns(long totalDesigns) {
        this.totalDesigns = totalDesigns;
    }

    public long getTotalRequirements() {
        return totalRequirements;
    }

    public void setTotalRequirements(long totalRequirements) {
        this.totalRequirements = totalRequirements;
    }

    public long getOpenRequirements() {
        return openRequirements;
    }

    public void setOpenRequirements(long openRequirements) {
        this.openRequirements = openRequirements;
    }

    public long getTotalQuotations() {
        return totalQuotations;
    }

    public void setTotalQuotations(long totalQuotations) {
        this.totalQuotations = totalQuotations;
    }

    public long getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(long totalOrders) {
        this.totalOrders = totalOrders;
    }

    public long getActiveOrders() {
        return activeOrders;
    }

    public void setActiveOrders(long activeOrders) {
        this.activeOrders = activeOrders;
    }

    public BigDecimal getGrossMerchandiseValue() {
        return grossMerchandiseValue;
    }

    public void setGrossMerchandiseValue(BigDecimal grossMerchandiseValue) {
        this.grossMerchandiseValue = grossMerchandiseValue;
    }

    public long getReportedDesignsCount() {
        return reportedDesignsCount;
    }

    public void setReportedDesignsCount(long reportedDesignsCount) {
        this.reportedDesignsCount = reportedDesignsCount;
    }
}
