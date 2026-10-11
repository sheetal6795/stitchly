package com.stitchly.service;

import com.stitchly.dto.AiConsultationRequest;
import com.stitchly.dto.AiConsultationResponse;
import com.stitchly.dto.AiConsultationResponse.ColorPaletteItem;
import com.stitchly.dto.AiConsultationResponse.FabricRecommendation;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;

@Service
public class AiAssistantService {

    public AiConsultationResponse analyzeDesign(AiConsultationRequest req) {
        String prompt = req.getPrompt() != null ? req.getPrompt().toLowerCase() : "";
        String occasion = req.getOccasion() != null ? req.getOccasion() : "Formal";
        String tier = req.getPreferredBudgetTier() != null ? req.getPreferredBudgetTier() : "Mid-range";

        AiConsultationResponse response = new AiConsultationResponse();

        // 1. Determine Clothing Type & Title
        String clothingType = detectClothingType(prompt);
        String designTitle = generateArtisticTitle(prompt, clothingType, occasion);
        response.setClothingType(clothingType);
        response.setDesignTitle(designTitle);

        // 2. Determine Style & Silhouette
        response.setClothingStyle(determineSilhouetteStyle(prompt, clothingType));

        // 3. Recommended Fabrics & Materials
        response.setSuggestedFabrics(generateFabricRecommendations(prompt, clothingType));

        // 4. Color Palette
        response.setRecommendedColors(generateColorPalette(prompt));

        // 5. Customization Suggestions
        response.setCustomizationSuggestions(generateCustomizations(prompt, clothingType));

        // 6. Estimated Price Range Calculation
        BigDecimal[] priceRange = calculateEstimatedPriceRange(prompt, clothingType, tier);
        response.setEstimatedPriceMin(priceRange[0]);
        response.setEstimatedPriceMax(priceRange[1]);
        response.setPriceDisclaimer("Estimated Price Range: This calculation is an algorithmic estimate based on textile grade and bespoke craftsmanship hours. Actual binding quotations will be submitted by independent designers based on precise measurements and fabric inventory.");

        // 7. Estimated Days & Tags
        int days = determineEstimatedDays(prompt, clothingType);
        response.setEstimatedDays(days);

        response.setTags(generateTags(clothingType, occasion, prompt));
        response.setVisualConceptSummary("A bespoke " + clothingType + " curated for " + occasion + 
                ", highlighting tailored proportions, premium textile drape, and refined artisanal finishes.");

        return response;
    }

    private String detectClothingType(String prompt) {
        if (prompt.contains("bridal") || prompt.contains("wedding") || prompt.contains("bride") || prompt.contains("lehenga")) {
            return "Bridal Couture";
        } else if (prompt.contains("suit") || prompt.contains("tuxedo") || prompt.contains("blazer") || prompt.contains("trouser")) {
            return "Bespoke Tailored Suit";
        } else if (prompt.contains("gown") || prompt.contains("evening") || prompt.contains("ball") || prompt.contains("gala")) {
            return "Evening Gown";
        } else if (prompt.contains("cocktail") || prompt.contains("midi") || prompt.contains("mini dress")) {
            return "Cocktail Dress";
        } else if (prompt.contains("jumpsuit") || prompt.contains("romper")) {
            return "Architectural Jumpsuit";
        } else if (prompt.contains("saree") || prompt.contains("anarkali") || prompt.contains("kurta") || prompt.contains("sherwani")) {
            return "Traditional Heritage Wear";
        } else if (prompt.contains("jacket") || prompt.contains("coat") || prompt.contains("outerwear")) {
            return "Custom Outerwear";
        } else if (prompt.contains("streetwear") || prompt.contains("hoodie") || prompt.contains("cargo")) {
            return "Artisanal Streetwear";
        }
        return "Custom Designer Garment";
    }

    private String generateArtisticTitle(String prompt, String clothingType, String occasion) {
        String[] prefixes = {"The Luminary", "Aura", "Sculpted", "Elysian", "Celestial", "Midnight", "Opulent", "Atelier", "Sovereign"};
        String prefix = prefixes[Math.abs(prompt.hashCode()) % prefixes.length];

        if (prompt.contains("emerald") || prompt.contains("green")) {
            return prefix + " Emerald " + clothingType;
        } else if (prompt.contains("velvet")) {
            return prefix + " Velvet " + clothingType;
        } else if (prompt.contains("silk") || prompt.contains("satin")) {
            return prefix + " Silk Lustre " + clothingType;
        } else if (prompt.contains("minimal") || prompt.contains("clean")) {
            return prefix + " Minimalist " + clothingType;
        }
        return prefix + " " + occasion + " " + clothingType;
    }

    private String determineSilhouetteStyle(String prompt, String clothingType) {
        if (prompt.contains("mermaid") || prompt.contains("fitted")) {
            return "Sculpted mermaid silhouette contouring the waist and hips with architectural flare starting below the mid-thigh.";
        } else if (prompt.contains("a-line") || prompt.contains("flare")) {
            return "Graceful A-line silhouette balancing structured bodice boning with an effortless, floating drape.";
        } else if (prompt.contains("oversized") || prompt.contains("drape")) {
            return "Deconstructed fluid drape with dropped shoulders and relaxed modern ease.";
        } else if (clothingType.contains("Suit")) {
            return "Contemporary slim-cut double-breasted or single-button jacket with high-armhole cut and tapered forward-pleat trousers.";
        } else if (clothingType.contains("Bridal")) {
            return "Regal silhouette with integrated internal corset, cathedral-ready proportion, and balanced volume.";
        }
        return "Classic bespoke silhouette engineered to personal posture with refined seam placement and ergonomic mobility.";
    }

    private List<FabricRecommendation> generateFabricRecommendations(String prompt, String clothingType) {
        List<FabricRecommendation> list = new ArrayList<>();

        if (prompt.contains("velvet")) {
            list.add(new FabricRecommendation("Silk-Viscose Plush Velvet", "Rich light refraction, ultra-soft hand feel, deep color saturation", "Bodice and structured exterior panels"));
            list.add(new FabricRecommendation("Mulberry Silk Habotai", "Breathable, featherlight natural lining", "Interior skin contact lining"));
        } else if (prompt.contains("suit") || clothingType.contains("Suit")) {
            list.add(new FabricRecommendation("Super 150s Merino Wool (Italy)", "Crease-resistant, four-season breathability, micro-twill finish", "Main jacket & tailored trouser shell"));
            list.add(new FabricRecommendation("Bemberg Cupro Jacquard", "Anti-static, silky smooth glide", "Full internal jacket lining"));
        } else if (prompt.contains("bridal") || clothingType.contains("Bridal")) {
            list.add(new FabricRecommendation("Heavy Silk Mikado", "Structured sheen with architectural volume retention", "Main skirt and structured bodice"));
            list.add(new FabricRecommendation("French Chantilly Lace", "Intricate floral scallop edge, handcrafted delicate openwork", "Sleeves, neckline overlay, and train accent"));
        } else {
            list.add(new FabricRecommendation("Heavyweight Silk Crepe de Chine", "Subtle pebbled lustre, liquid drape, wrinkle forgiving", "Main garment silhouette"));
            list.add(new FabricRecommendation("Silk Georgette or Organza", "Semi-sheer structure with ethereal light transparency", "Sleeve details and accent panels"));
        }

        list.add(new FabricRecommendation("Cotton Canvas & Horsehair Braid", "Interfacing for shape retention and hem structure", "Internal collar, lapel, and hem stabilization"));
        return list;
    }

    private List<ColorPaletteItem> generateColorPalette(String prompt) {
        List<ColorPaletteItem> palette = new ArrayList<>();

        if (prompt.contains("green") || prompt.contains("emerald")) {
            palette.add(new ColorPaletteItem("Deep Royal Emerald", "#0F4C3A", "Dominant Body"));
            palette.add(new ColorPaletteItem("Antique Champagne Gold", "#D4AF37", "Hardware & Trims"));
            palette.add(new ColorPaletteItem("Forest Pine", "#1E3F20", "Shadow Seams"));
            palette.add(new ColorPaletteItem("Alabaster Ivory", "#F9F6F0", "Lining Accent"));
        } else if (prompt.contains("blue") || prompt.contains("navy")) {
            palette.add(new ColorPaletteItem("Midnight Navy", "#0B1B3D", "Dominant Body"));
            palette.add(new ColorPaletteItem("Polished Silver / Platinum", "#E5E4E2", "Hardware & Trims"));
            palette.add(new ColorPaletteItem("Cobalt Shadow", "#1A365D", "Underlay"));
            palette.add(new ColorPaletteItem("Ice Blue Mist", "#E0F2FE", "Lining Accent"));
        } else if (prompt.contains("red") || prompt.contains("burgundy") || prompt.contains("wine")) {
            palette.add(new ColorPaletteItem("Imperial Bordeaux", "#5B0E2D", "Dominant Body"));
            palette.add(new ColorPaletteItem("Brushed Rose Gold", "#B76E79", "Hardware & Accents"));
            palette.add(new ColorPaletteItem("Crimson Glow", "#800020", "Layering Contrast"));
            palette.add(new ColorPaletteItem("Warm Cream", "#FFFDD0", "Lining"));
        } else if (prompt.contains("black") || prompt.contains("monochrome")) {
            palette.add(new ColorPaletteItem("Obsidian Noir", "#111116", "Dominant Body"));
            palette.add(new ColorPaletteItem("Gunmetal Titanium", "#4A5568", "Hardware & Trims"));
            palette.add(new ColorPaletteItem("Charcoal Slate", "#2D3748", "Shadow Seams"));
            palette.add(new ColorPaletteItem("Stark Pearl White", "#FAFAFA", "Contrast Binding"));
        } else {
            // Curated Luxury Neutral Palette
            palette.add(new ColorPaletteItem("Golden Sand Champagne", "#E2C499", "Dominant Body"));
            palette.add(new ColorPaletteItem("Rich Espresso Bronze", "#3E2723", "Accent Detailing"));
            palette.add(new ColorPaletteItem("Warm Cashmere Ivory", "#F7F3E9", "Drape & Layering"));
            palette.add(new ColorPaletteItem("Burnished Gold", "#C5A059", "Hardware"));
        }

        return palette;
    }

    private List<String> generateCustomizations(String prompt, String clothingType) {
        List<String> list = new ArrayList<>();
        list.add("Hidden in-seam pockets reinforced with bar-tack stitching for invisible functionality.");
        list.add("Internal waist-stay ribbon with multi-hook closure to relieve zipper tension.");
        list.add("Hand-sewn horsehair braid hem for sculpted circular flare that stays lifted off the floor.");

        if (prompt.contains("back") || prompt.contains("corset")) {
            list.add("Dual-closure option: hidden YKK invisible zipper reinforced with loop-and-covered-button facade.");
        } else {
            list.add("Custom monogramming embroidered inside the collar or lining in tonal silk thread.");
        }

        if (clothingType.contains("Bridal") || clothingType.contains("Gown")) {
            list.add("Detachable overskirt or bustle loops to transition comfortably from ceremony to dinner.");
        }

        list.add("Modular modesty lining panel attached via micro-snaps for customizable opacity.");
        return list;
    }

    private BigDecimal[] calculateEstimatedPriceRange(String prompt, String clothingType, String tier) {
        double baseMin = 280.0;
        double baseMax = 520.0;

        if (clothingType.contains("Bridal")) {
            baseMin = 850.0;
            baseMax = 2200.0;
        } else if (clothingType.contains("Suit")) {
            baseMin = 450.0;
            baseMax = 950.0;
        } else if (clothingType.contains("Gown")) {
            baseMin = 400.0;
            baseMax = 880.0;
        } else if (clothingType.contains("Cocktail")) {
            baseMin = 250.0;
            baseMax = 480.0;
        }

        // Adjust based on tier
        if ("Luxury Couture".equalsIgnoreCase(tier)) {
            baseMin *= 1.45;
            baseMax *= 1.65;
        } else if ("Budget".equalsIgnoreCase(tier)) {
            baseMin *= 0.75;
            baseMax *= 0.80;
        }

        // Embellishment modifiers
        if (prompt.contains("embroidery") || prompt.contains("bead") || prompt.contains("sequin")) {
            baseMin += 120.0;
            baseMax += 300.0;
        }
        if (prompt.contains("silk") || prompt.contains("velvet")) {
            baseMin += 60.0;
            baseMax += 150.0;
        }

        return new BigDecimal[]{
                BigDecimal.valueOf(Math.round(baseMin)).setScale(2, RoundingMode.HALF_UP),
                BigDecimal.valueOf(Math.round(baseMax)).setScale(2, RoundingMode.HALF_UP)
        };
    }

    private int determineEstimatedDays(String prompt, String clothingType) {
        if (clothingType.contains("Bridal")) {
            return 28;
        } else if (clothingType.contains("Suit") || clothingType.contains("Gown")) {
            return 18;
        }
        return 12;
    }

    private List<String> generateTags(String clothingType, String occasion, String prompt) {
        Set<String> tags = new LinkedHashSet<>();
        tags.add(clothingType);
        tags.add(occasion);
        tags.add("Bespoke");
        tags.add("Artisanal");
        if (prompt.contains("silk")) tags.add("Pure Silk");
        if (prompt.contains("velvet")) tags.add("Velvet");
        if (prompt.contains("embroidered")) tags.add("Hand Embroidered");
        return new ArrayList<>(tags);
    }
}
