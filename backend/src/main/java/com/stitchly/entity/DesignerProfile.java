package com.stitchly.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "designer_profiles")
public class DesignerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(nullable = false)
    private String brandName;

    @Column(length = 2000)
    private String bio;

    private String specialties; // e.g. "Bridal, Evening Gowns, Sustainable Silk"

    private Integer experienceYears = 0;

    private String location; // e.g. "Milan / New York / Remote"

    @Column(nullable = false)
    private boolean verified = false;

    private Double ratingAverage = 5.0;

    private Integer reviewCount = 0;

    private Integer completedOrdersCount = 0;

    private String pricingTier = "$$"; // $, $$, $$$, $$$$

    @Column(length = 1000)
    private String bannerUrl;

    @Column(length = 1000)
    private String instagramHandle;

    private LocalDateTime createdAt = LocalDateTime.now();

    public DesignerProfile() {
    }

    public DesignerProfile(User user, String brandName, String bio, String specialties, Integer experienceYears, String location) {
        this.user = user;
        this.brandName = brandName;
        this.bio = bio;
        this.specialties = specialties;
        this.experienceYears = experienceYears;
        this.location = location;
        this.verified = false;
        this.ratingAverage = 5.0;
        this.reviewCount = 0;
        this.completedOrdersCount = 0;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getBrandName() {
        return brandName;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getSpecialties() {
        return specialties;
    }

    public void setSpecialties(String specialties) {
        this.specialties = specialties;
    }

    public Integer getExperienceYears() {
        return experienceYears;
    }

    public void setExperienceYears(Integer experienceYears) {
        this.experienceYears = experienceYears;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public boolean isVerified() {
        return verified;
    }

    public void setVerified(boolean verified) {
        this.verified = verified;
    }

    public Double getRatingAverage() {
        return ratingAverage;
    }

    public void setRatingAverage(Double ratingAverage) {
        this.ratingAverage = ratingAverage;
    }

    public Integer getReviewCount() {
        return reviewCount;
    }

    public void setReviewCount(Integer reviewCount) {
        this.reviewCount = reviewCount;
    }

    public Integer getCompletedOrdersCount() {
        return completedOrdersCount;
    }

    public void setCompletedOrdersCount(Integer completedOrdersCount) {
        this.completedOrdersCount = completedOrdersCount;
    }

    public String getPricingTier() {
        return pricingTier;
    }

    public void setPricingTier(String pricingTier) {
        this.pricingTier = pricingTier;
    }

    public String getBannerUrl() {
        return bannerUrl;
    }

    public void setBannerUrl(String bannerUrl) {
        this.bannerUrl = bannerUrl;
    }

    public String getInstagramHandle() {
        return instagramHandle;
    }

    public void setInstagramHandle(String instagramHandle) {
        this.instagramHandle = instagramHandle;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
