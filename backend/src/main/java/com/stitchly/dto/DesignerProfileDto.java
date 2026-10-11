package com.stitchly.dto;

import com.stitchly.entity.DesignerProfile;

public class DesignerProfileDto {
    private Long id;
    private Long userId;
    private String designerName;
    private String email;
    private String avatarUrl;
    private String brandName;
    private String bio;
    private String specialties;
    private Integer experienceYears;
    private String location;
    private boolean verified;
    private Double ratingAverage;
    private Integer reviewCount;
    private Integer completedOrdersCount;
    private String pricingTier;
    private String bannerUrl;
    private String instagramHandle;

    public DesignerProfileDto() {
    }

    public static DesignerProfileDto fromEntity(DesignerProfile profile) {
        DesignerProfileDto dto = new DesignerProfileDto();
        dto.setId(profile.getId());
        dto.setBrandName(profile.getBrandName());
        dto.setBio(profile.getBio());
        dto.setSpecialties(profile.getSpecialties());
        dto.setExperienceYears(profile.getExperienceYears());
        dto.setLocation(profile.getLocation());
        dto.setVerified(profile.isVerified());
        dto.setRatingAverage(profile.getRatingAverage());
        dto.setReviewCount(profile.getReviewCount());
        dto.setCompletedOrdersCount(profile.getCompletedOrdersCount());
        dto.setPricingTier(profile.getPricingTier());
        dto.setBannerUrl(profile.getBannerUrl());
        dto.setInstagramHandle(profile.getInstagramHandle());
        if (profile.getUser() != null) {
            dto.setUserId(profile.getUser().getId());
            dto.setDesignerName(profile.getUser().getName());
            dto.setEmail(profile.getUser().getEmail());
            dto.setAvatarUrl(profile.getUser().getAvatarUrl());
        }
        return dto;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getDesignerName() {
        return designerName;
    }

    public void setDesignerName(String designerName) {
        this.designerName = designerName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
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
}
