package com.stitchly.config;

import com.stitchly.entity.*;
import com.stitchly.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final DesignerProfileRepository designerProfileRepository;
    private final DesignRepository designRepository;
    private final CustomRequirementRepository customRequirementRepository;
    private final QuotationRepository quotationRepository;
    private final OrderRepository orderRepository;
    private final ReviewRepository reviewRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository,
                           DesignerProfileRepository designerProfileRepository,
                           DesignRepository designRepository,
                           CustomRequirementRepository customRequirementRepository,
                           QuotationRepository quotationRepository,
                           OrderRepository orderRepository,
                           ReviewRepository reviewRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.designerProfileRepository = designerProfileRepository;
        this.designRepository = designRepository;
        this.customRequirementRepository = customRequirementRepository;
        this.quotationRepository = quotationRepository;
        this.orderRepository = orderRepository;
        this.reviewRepository = reviewRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) {
        if (userRepository.count() > 0) {
            return; // Already initialized
        }

        // 1. Seed Admin
        User admin = new User("Stitchly Admin", "admin@stitchly.com", passwordEncoder.encode("password123"), Role.ROLE_ADMIN);
        admin.setAvatarUrl("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80");
        userRepository.save(admin);

        // 2. Seed Customers
        User customer1 = new User("Sophia Vance", "customer@stitchly.com", passwordEncoder.encode("password123"), Role.ROLE_CUSTOMER);
        customer1.setPhone("+1 (555) 234-5678");
        customer1.setAvatarUrl("https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80");
        userRepository.save(customer1);

        User customer2 = new User("Elena Rostova", "elena@stitchly.com", passwordEncoder.encode("password123"), Role.ROLE_CUSTOMER);
        customer2.setPhone("+1 (555) 876-5432");
        customer2.setAvatarUrl("https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80");
        userRepository.save(customer2);

        // 3. Seed Designers
        // Designer 1: Maison Laurent (Evening Gowns)
        User designerUser1 = new User("Julian Laurent", "designer@stitchly.com", passwordEncoder.encode("password123"), Role.ROLE_DESIGNER);
        designerUser1.setAvatarUrl("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80");
        userRepository.save(designerUser1);

        DesignerProfile profile1 = new DesignerProfile(designerUser1, "Maison Laurent Atelier",
                "Haute couture atelier specializing in architectural evening gowns, sculpted corset bodices, and bespoke liquid silk draping. Trained in Paris Chambre Syndicale.",
                "Evening Wear, Haute Couture, Silk Draping, Corsetry", 12, "Paris & New York");
        profile1.setVerified(true);
        profile1.setRatingAverage(4.9);
        profile1.setReviewCount(14);
        profile1.setCompletedOrdersCount(18);
        profile1.setPricingTier("$$$");
        profile1.setBannerUrl("https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80");
        profile1.setInstagramHandle("@maison.laurent");
        designerProfileRepository.save(profile1);

        // Designer 2: Aurora Bridal (Bridal Wear)
        User designerUser2 = new User("Aurora Sterling", "aurora@stitchly.com", passwordEncoder.encode("password123"), Role.ROLE_DESIGNER);
        designerUser2.setAvatarUrl("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80");
        userRepository.save(designerUser2);

        DesignerProfile profile2 = new DesignerProfile(designerUser2, "Aurora Bridal Ateliers",
                "Dedicated exclusively to modern brides seeking minimalist drama, handcrafted French lace veils, and ethereal organza trains tailored to singular perfection.",
                "Modern Bridal, French Lace, Minimalist Gowns, Custom Veils", 8, "London & Milan");
        profile2.setVerified(true);
        profile2.setRatingAverage(5.0);
        profile2.setReviewCount(9);
        profile2.setCompletedOrdersCount(12);
        profile2.setPricingTier("$$$$");
        profile2.setBannerUrl("https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80");
        profile2.setInstagramHandle("@aurora_bridal");
        designerProfileRepository.save(profile2);

        // Designer 3: Savile & Sartorial (Bespoke Men's & Women's Tailoring)
        User designerUser3 = new User("Marcus Sterling-Hayes", "marcus@stitchly.com", passwordEncoder.encode("password123"), Role.ROLE_DESIGNER);
        designerUser3.setAvatarUrl("https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80");
        userRepository.save(designerUser3);

        DesignerProfile profile3 = new DesignerProfile(designerUser3, "Savile & Sartorial",
                "Traditional British and Neapolitan bespoke tailoring. Hand-canvassed suits, cashmere topcoats, and power blazers cut from the world's finest mills (Loro Piana, Scabal, Dormeuil).",
                "Bespoke Suits, Tuxedos, Hand-Canvassed Blazers, Overcoats", 15, "London Savile Row");
        profile3.setVerified(true);
        profile3.setRatingAverage(4.8);
        profile3.setReviewCount(22);
        profile3.setCompletedOrdersCount(30);
        profile3.setPricingTier("$$$");
        profile3.setBannerUrl("https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=80");
        profile3.setInstagramHandle("@savile_sartorial");
        designerProfileRepository.save(profile3);

        // Designer 4: Veda Heritage Couture
        User designerUser4 = new User("Priya Sundaram", "priya@stitchly.com", passwordEncoder.encode("password123"), Role.ROLE_DESIGNER);
        designerUser4.setAvatarUrl("https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80");
        userRepository.save(designerUser4);

        DesignerProfile profile4 = new DesignerProfile(designerUser4, "Veda Heritage Couture",
                "Reviving ancient zardozi, chikankari, and gota patti embroidery on pure Benarasi weaves and raw silks. Crafted for royal weddings and milestone gala festivities.",
                "Royal Lehengas, Handloom Benarasi, Sherwanis, Zari Embroidery", 10, "Mumbai & Dubai");
        profile4.setVerified(true);
        profile4.setRatingAverage(5.0);
        profile4.setReviewCount(18);
        profile4.setCompletedOrdersCount(24);
        profile4.setPricingTier("$$$$");
        profile4.setBannerUrl("https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80");
        profile4.setInstagramHandle("@veda_heritage");
        designerProfileRepository.save(profile4);

        // Designer 5: Kai Tanaka (Pending Verification for Admin demo)
        User designerUser5 = new User("Kai Tanaka", "kai@stitchly.com", passwordEncoder.encode("password123"), Role.ROLE_DESIGNER);
        designerUser5.setAvatarUrl("https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80");
        userRepository.save(designerUser5);

        DesignerProfile profile5 = new DesignerProfile(designerUser5, "Atelier Tanaka Minimal",
                "Avant-garde sculptural streetwear and relaxed Japanese linen tailoring. Focus on raw edges, asymmetric cuts, and organic hand-dyed indigos.",
                "Avant-Garde, Japanese Linen, Asymmetric Tailoring, Artisanal Streetwear", 5, "Tokyo & Berlin");
        profile5.setVerified(false); // Unverified for admin verification showcase!
        profile5.setRatingAverage(4.7);
        profile5.setReviewCount(3);
        profile5.setCompletedOrdersCount(4);
        profile5.setPricingTier("$$");
        profile5.setBannerUrl("https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80");
        profile5.setInstagramHandle("@tanaka_minimal");
        designerProfileRepository.save(profile5);

        // 4. Seed Portfolio Designs
        // Design 1: Emerald Corset Gown
        Design d1 = new Design();
        d1.setDesigner(profile1);
        d1.setTitle("The Luminary Emerald Corset Gown");
        d1.setDescription("Hand-draped mulberry silk crepe gown featuring an interior steel-boned corset, sweetheart cowl neckline, and a sculptural floor-length thigh slit.");
        d1.setCategory("Evening Wear");
        d1.setImageUrl("https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80");
        d1.setPrice(BigDecimal.valueOf(680.00));
        d1.setTags("Emerald, Silk Crepe, Corset, Evening Gown");
        d1.setEstimatedDays(14);
        d1.setLikesCount(42);
        d1.setFeatured(true);
        designRepository.save(d1);

        // Design 2: Obsidian Midnight Blazer
        Design d2 = new Design();
        d2.setDesigner(profile3);
        d2.setTitle("Bespoke Midnight Peak-Lapel Tuxedo");
        d2.setDescription("Single-button peak-lapel tuxedo crafted in English Barathea pure wool with black grosgrain silk facings and natural horn buttons.");
        d2.setCategory("Suits & Tailoring");
        d2.setImageUrl("https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80");
        d2.setPrice(BigDecimal.valueOf(850.00));
        d2.setTags("Tuxedo, Bespoke Suit, Barathea Wool, Black Tie");
        d2.setEstimatedDays(21);
        d2.setLikesCount(31);
        d2.setFeatured(true);
        designRepository.save(d2);

        // Design 3: Ethereal Pearl Bridal
        Design d3 = new Design();
        d3.setDesigner(profile2);
        d3.setTitle("The Elysian Silk Organza Bridal Gown");
        d3.setDescription("Ethereal layered silk organza gown with hand-applied French Chantilly lace appliques, floating illusion sleeves, and a 2.5-meter cathedral train.");
        d3.setCategory("Bridal");
        d3.setImageUrl("https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=800&q=80");
        d3.setPrice(BigDecimal.valueOf(1450.00));
        d3.setTags("Bridal, French Lace, Silk Organza, Cathedral Train");
        d3.setEstimatedDays(30);
        d3.setLikesCount(68);
        d3.setFeatured(true);
        designRepository.save(d3);

        // Design 4: Royal Benarasi Lehenga
        Design d4 = new Design();
        d4.setDesigner(profile4);
        d4.setTitle("Imperial Saffron Zari Brocade Lehenga");
        d4.setDescription("Woven by master weavers in Varanasi with real gold zari threads over pure mulberry silk. Accompanied by hand-embroidered zardozi dupatta.");
        d4.setCategory("Traditional/Ethnic");
        d4.setImageUrl("https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80");
        d4.setPrice(BigDecimal.valueOf(1200.00));
        d4.setTags("Lehenga, Benarasi Silk, Gold Zari, Bridal Heritage");
        d4.setEstimatedDays(25);
        d4.setLikesCount(53);
        d4.setFeatured(true);
        designRepository.save(d4);

        // Design 5: Sculptural Linen Jumpsuit
        Design d5 = new Design();
        d5.setDesigner(profile5);
        d5.setTitle("Architectural Origami Linen Jumpsuit");
        d5.setDescription("Crafted in heavyweight unbleached Japanese linen with asymmetric lapel folds, deep pockets, and a removable obi tie belt.");
        d5.setCategory("Resort Wear");
        d5.setImageUrl("https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80");
        d5.setPrice(BigDecimal.valueOf(360.00));
        d5.setTags("Linen, Jumpsuit, Minimalist, Avant-Garde");
        d5.setEstimatedDays(10);
        d5.setLikesCount(19);
        d5.setFeatured(false);
        designRepository.save(d5);

        // 5. Seed Customer Custom Requirements (Core Marketplace feature!)
        // Requirement 1: Open requirement for designers to bid on
        CustomRequirement req1 = new CustomRequirement();
        req1.setCustomer(customer1);
        req1.setTitle("Bespoke Champagne Velvet Gala Gown for Autumn Symphony");
        req1.setClothingType("Evening Gown");
        req1.setPreferredFabric("Heavy Silk-Viscose Velvet with Satin Lining");
        req1.setPreferredColors("Champagne Gold, Deep Amber, Antique Bronze");
        req1.setBudgetMin(BigDecimal.valueOf(500.00));
        req1.setBudgetMax(BigDecimal.valueOf(800.00));
        req1.setDeadline(LocalDate.now().plusDays(35));
        req1.setInspirationImageUrl("https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80");
        req1.setNotes("Looking for an off-the-shoulder silhouette with structured waist boning and a subtle trumpet skirt. Must be comfortable for walking and sitting through an orchestral gala.");
        req1.setMeasurementsNotes("Bust: 35in, Waist: 27in, Hips: 37in, Height: 5ft 8in with 3in heels.");
        req1.setStatus("OPEN");
        req1.setQuotationsCount(2);
        customRequirementRepository.save(req1);

        // Quotations for Requirement 1 (Allows Customer to Compare Quotes!)
        Quotation q1 = new Quotation();
        q1.setRequirement(req1);
        q1.setDesigner(profile1);
        q1.setQuotePrice(BigDecimal.valueOf(650.00));
        q1.setEstimatedDays(16);
        q1.setProposalNotes("Bonjour Sophia, I would love to craft this for you. I propose an Italian silk-faced velvet with our signature Parisian internal corset for all-night posture comfort. We will conduct a muslin toile fitting first.");
        q1.setFabricSuggestions("Italian Silk Velvet in Warm Champagne, Habotai Silk lining");
        q1.setCostBreakdown("Fabric & Notions: $260 | Pattern Draft & Toile: $140 | Hand Finishes & Assembly: $250");
        q1.setStatus("PENDING");
        quotationRepository.save(q1);

        Quotation q2 = new Quotation();
        q2.setRequirement(req1);
        q2.setDesigner(profile2);
        q2.setQuotePrice(BigDecimal.valueOf(720.00));
        q2.setEstimatedDays(20);
        q2.setProposalNotes("A stunning concept! We can integrate subtle antique crystal beading along the off-shoulder drape to catch the symphony hall chandeliers.");
        q2.setFabricSuggestions("Plush French Viscose Velvet with micro-piping detail");
        q2.setCostBreakdown("Textile sourcing: $280 | Artisanal embellishment: $180 | Tailoring: $260");
        q2.setStatus("PENDING");
        quotationRepository.save(q2);

        // Requirement 2: Already Awarded into an active Order
        CustomRequirement req2 = new CustomRequirement();
        req2.setCustomer(customer2);
        req2.setTitle("Custom Double-Breasted Power Suit in Italian Wool");
        req2.setClothingType("Bespoke Tailored Suit");
        req2.setPreferredFabric("Super 140s Wool Twill");
        req2.setPreferredColors("Midnight Navy with Chalk Pinstripe");
        req2.setBudgetMin(BigDecimal.valueOf(700.00));
        req2.setBudgetMax(BigDecimal.valueOf(950.00));
        req2.setDeadline(LocalDate.now().plusDays(15));
        req2.setInspirationImageUrl("https://images.unsplash.com/photo-1548625361-195fe615b15b?auto=format&fit=crop&w=800&q=80");
        req2.setNotes("Fitted waist, wide peaked lapels, and high-rise flared trousers. Need for an international keynote address.");
        req2.setStatus("AWARDED");
        req2.setQuotationsCount(1);
        customRequirementRepository.save(req2);

        Quotation q3 = new Quotation();
        q3.setRequirement(req2);
        q3.setDesigner(profile3);
        q3.setQuotePrice(BigDecimal.valueOf(820.00));
        q3.setEstimatedDays(14);
        q3.setProposalNotes("I have secured an exclusive bolt of Vitale Barberis Canonico super 140s navy chalk-stripe wool. Hand-padded lapels ensure a roll that off-the-rack suits can never match.");
        q3.setStatus("ACCEPTED");
        quotationRepository.save(q3);

        // Order created for Requirement 2 & Quotation 3
        Order order1 = new Order();
        order1.setOrderNumber("STITCH-84291B");
        order1.setRequirement(req2);
        order1.setQuotation(q3);
        order1.setCustomer(customer2);
        order1.setDesigner(profile3);
        order1.setTotalAmount(BigDecimal.valueOf(820.00));
        order1.setStatus("IN_PRODUCTION");
        order1.setShippingAddress("742 Evergreen Terrace, Manhattan, NY 10001");
        order1.setTrackingNumber("FEDEX-8921-9871");
        order1.setDesignerNotes("Toile fitted and adjusted. Outer fabric cut; currently hand-stitching horsehair canvas chest piece.");
        order1.setDeadline(LocalDate.now().plusDays(10));
        order1.setReviewed(false);
        orderRepository.save(order1);

        // Completed Order with Review
        Order order2 = new Order();
        order2.setOrderNumber("STITCH-29013A");
        order2.setRequirement(req2);
        order2.setQuotation(q1);
        order2.setCustomer(customer1);
        order2.setDesigner(profile1);
        order2.setTotalAmount(BigDecimal.valueOf(650.00));
        order2.setStatus("COMPLETED");
        order2.setShippingAddress("120 Fifth Avenue, New York, NY 10011");
        order2.setTrackingNumber("DHL-4421-1200");
        order2.setDesignerNotes("Final fitting perfected and delivered.");
        order2.setDeadline(LocalDate.now().minusDays(5));
        order2.setReviewed(true);
        orderRepository.save(order2);

        Review review1 = new Review(order2, customer1, profile1, 5,
                "Julian exceeded all expectations! The internal corset made the dress feel like a second skin, and the fabric drape under lighting was breathtaking. I received endless compliments throughout the evening!");
        reviewRepository.save(review1);
    }
}
