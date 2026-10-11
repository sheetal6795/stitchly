package com.stitchly.dto;

import jakarta.validation.constraints.NotBlank;

public class AiConsultationRequest {

    @NotBlank(message = "Prompt or design description is required")
    private String prompt;

    private String inspirationImageUrl;
    private String occasion;
    private String targetAudience;
    private String preferredBudgetTier; // Budget, Mid-range, Luxury Couture

    public AiConsultationRequest() {
    }

    public String getPrompt() {
        return prompt;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }

    public String getInspirationImageUrl() {
        return inspirationImageUrl;
    }

    public void setInspirationImageUrl(String inspirationImageUrl) {
        this.inspirationImageUrl = inspirationImageUrl;
    }

    public String getOccasion() {
        return occasion;
    }

    public void setOccasion(String occasion) {
        this.occasion = occasion;
    }

    public String getTargetAudience() {
        return targetAudience;
    }

    public void setTargetAudience(String targetAudience) {
        this.targetAudience = targetAudience;
    }

    public String getPreferredBudgetTier() {
        return preferredBudgetTier;
    }

    public void setPreferredBudgetTier(String preferredBudgetTier) {
        this.preferredBudgetTier = preferredBudgetTier;
    }
}
