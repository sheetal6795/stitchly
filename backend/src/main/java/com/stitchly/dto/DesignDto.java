package com.stitchly.dto;

import com.stitchly.entity.Design;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class DesignDto {
    private Long id;
    private Long designerId;
    private String designerBrandName;
    private String designerAvatarUrl;
    private boolean designerVerified;
    private String title;
    private String description;
    private String category;
    private String imageUrl;
    private String additionalImages;
    private BigDecimal price;
    private String tags;
    private Integer estimatedDays;
    private Integer likesCount;
    private boolean likedByCurrentUser;
    private boolean featured;
    private boolean reported;
    private LocalDateTime createdAt;

    public DesignDto() {
    }

    public static DesignDto fromEntity(Design design, boolean liked) {
        DesignDto dto = new DesignDto();
        dto.setId(design.getId());
        dto.setTitle(design.getTitle());
        dto.setDescription(design.getDescription());
        dto.setCategory(design.getCategory());
        dto.setImageUrl(design.getImageUrl());
        dto.setAdditionalImages(design.getAdditionalImages());
        dto.setPrice(design.getPrice());
        dto.setTags(design.getTags());
        dto.setEstimatedDays(design.getEstimatedDays());
        dto.setLikesCount(design.getLikesCount());
        dto.setLikedByCurrentUser(liked);
        dto.setFeatured(design.isFeatured());
        dto.setReported(design.isReported());
        dto.setCreatedAt(design.getCreatedAt());

        if (design.getDesigner() != null) {
            dto.setDesignerId(design.getDesigner().getId());
            dto.setDesignerBrandName(design.getDesigner().getBrandName());
            dto.setDesignerVerified(design.getDesigner().isVerified());
            if (design.getDesigner().getUser() != null) {
                dto.setDesignerAvatarUrl(design.getDesigner().getUser().getAvatarUrl());
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getAdditionalImages() {
        return additionalImages;
    }

    public void setAdditionalImages(String additionalImages) {
        this.additionalImages = additionalImages;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public Integer getEstimatedDays() {
        return estimatedDays;
    }

    public void setEstimatedDays(Integer estimatedDays) {
        this.estimatedDays = estimatedDays;
    }

    public Integer getLikesCount() {
        return likesCount;
    }

    public void setLikesCount(Integer likesCount) {
        this.likesCount = likesCount;
    }

    public boolean isLikedByCurrentUser() {
        return likedByCurrentUser;
    }

    public void setLikedByCurrentUser(boolean likedByCurrentUser) {
        this.likedByCurrentUser = likedByCurrentUser;
    }

    public boolean isFeatured() {
        return featured;
    }

    public void setFeatured(boolean featured) {
        this.featured = featured;
    }

    public boolean isReported() {
        return reported;
    }

    public void setReported(boolean reported) {
        this.reported = reported;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
