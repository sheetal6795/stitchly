package com.stitchly.dto;

import java.math.BigDecimal;
import java.util.List;

public class AiConsultationResponse {
    private String designTitle;
    private String clothingType;
    private String clothingStyle;
    private List<FabricRecommendation> suggestedFabrics;
    private List<ColorPaletteItem> recommendedColors;
    private List<String> customizationSuggestions;
    private BigDecimal estimatedPriceMin;
    private BigDecimal estimatedPriceMax;
    private String priceDisclaimer;
    private Integer estimatedDays;
    private List<String> tags;
    private String visualConceptSummary;

    public static class FabricRecommendation {
        private String fabricName;
        private String characteristics;
        private String suitability;

        public FabricRecommendation() {}
        public FabricRecommendation(String fabricName, String characteristics, String suitability) {
            this.fabricName = fabricName;
            this.characteristics = characteristics;
            this.suitability = suitability;
        }

        public String getFabricName() { return fabricName; }
        public void setFabricName(String fabricName) { this.fabricName = fabricName; }
        public String getCharacteristics() { return characteristics; }
        public void setCharacteristics(String characteristics) { this.characteristics = characteristics; }
        public String getSuitability() { return suitability; }
        public void setSuitability(String suitability) { this.suitability = suitability; }
    }

    public static class ColorPaletteItem {
        private String name;
        private String hex;
        private String mood;

        public ColorPaletteItem() {}
        public ColorPaletteItem(String name, String hex, String mood) {
            this.name = name;
            this.hex = hex;
            this.mood = mood;
        }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getHex() { return hex; }
        public void setHex(String hex) { this.hex = hex; }
        public String getMood() { return mood; }
        public void setMood(String mood) { this.mood = mood; }
    }

    public AiConsultationResponse() {
    }

    public String getDesignTitle() {
        return designTitle;
    }

    public void setDesignTitle(String designTitle) {
        this.designTitle = designTitle;
    }

    public String getClothingType() {
        return clothingType;
    }

    public void setClothingType(String clothingType) {
        this.clothingType = clothingType;
    }

    public String getClothingStyle() {
        return clothingStyle;
    }

    public void setClothingStyle(String clothingStyle) {
        this.clothingStyle = clothingStyle;
    }

    public List<FabricRecommendation> getSuggestedFabrics() {
        return suggestedFabrics;
    }

    public void setSuggestedFabrics(List<FabricRecommendation> suggestedFabrics) {
        this.suggestedFabrics = suggestedFabrics;
    }

    public List<ColorPaletteItem> getRecommendedColors() {
        return recommendedColors;
    }

    public void setRecommendedColors(List<ColorPaletteItem> recommendedColors) {
        this.recommendedColors = recommendedColors;
    }

    public List<String> getCustomizationSuggestions() {
        return customizationSuggestions;
    }

    public void setCustomizationSuggestions(List<String> customizationSuggestions) {
        this.customizationSuggestions = customizationSuggestions;
    }

    public BigDecimal getEstimatedPriceMin() {
        return estimatedPriceMin;
    }

    public void setEstimatedPriceMin(BigDecimal estimatedPriceMin) {
        this.estimatedPriceMin = estimatedPriceMin;
    }

    public BigDecimal getEstimatedPriceMax() {
        return estimatedPriceMax;
    }

    public void setEstimatedPriceMax(BigDecimal estimatedPriceMax) {
        this.estimatedPriceMax = estimatedPriceMax;
    }

    public String getPriceDisclaimer() {
        return priceDisclaimer;
    }

    public void setPriceDisclaimer(String priceDisclaimer) {
        this.priceDisclaimer = priceDisclaimer;
    }

    public Integer getEstimatedDays() {
        return estimatedDays;
    }

    public void setEstimatedDays(Integer estimatedDays) {
        this.estimatedDays = estimatedDays;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public String getVisualConceptSummary() {
        return visualConceptSummary;
    }

    public void setVisualConceptSummary(String visualConceptSummary) {
        this.visualConceptSummary = visualConceptSummary;
    }
}
