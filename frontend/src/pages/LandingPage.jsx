import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Scissors, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Layers, 
  DollarSign, 
  Clock, 
  Star,
  Compass,
  ArrowUpRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { designApi, designerApi } from '../services/api';
import { DesignCard } from '../components/DesignCard';
import { DesignerCard } from '../components/DesignerCard';

export const LandingPage = ({ setCurrentView, setSelectedDesignerId, onOpenDemoLogin }) => {
  const [featuredDesigns, setFeaturedDesigns] = useState([]);
  const [featuredDesigners, setFeaturedDesigners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [designsRes, designersRes] = await Promise.all([
          designApi.getFeatured(),
          designerApi.getAll()
        ]);
        setFeaturedDesigns(designsRes.data || []);
        setFeaturedDesigners((designersRes.data || []).slice(0, 3));
      } catch (err) {
        console.error('Error fetching landing data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSelectDesigner = (designer) => {
    setSelectedDesignerId(designer.id);
    setCurrentView('designer-detail');
  };

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
        {/* Background haute image with dark overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=85"
            alt="Haute Couture Background"
            className="w-full h-full object-cover object-top opacity-20 filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-couture-950/90 via-couture-950/80 to-couture-950" />
        </div>

        {/* Ambient lighting glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          
          {/* Tagline Pill */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-couture-900/90 border border-gold-500/30 text-gold-300 text-xs font-semibold uppercase tracking-widest backdrop-blur-md shadow-glow-gold animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>AI-Assisted Bespoke Fashion Marketplace</span>
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
            Where Custom Fashion Meets <br />
            <span className="gold-gradient-text italic font-normal">Haute Intelligence.</span>
          </h1>

          {/* Official Subtitle requested by prompt */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-couture-300 font-light leading-relaxed">
            Stitchly is an AI-assisted marketplace connecting discerning clients with independent bespoke fashion designers, couturiers, and master tailors.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setCurrentView('ai-studio')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-gold-600 via-gold-500 to-amber-400 hover:from-gold-500 hover:to-amber-300 text-couture-950 font-bold text-sm uppercase tracking-wider shadow-glow-gold transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2.5"
            >
              <Sparkles className="w-4 h-4 text-couture-950 fill-couture-950" />
              <span>Launch AI Studio</span>
            </button>

            <button
              onClick={() => setCurrentView('post-requirement')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-couture-900/90 hover:bg-couture-850 text-white border border-couture-700 hover:border-gold-500/60 font-semibold text-sm transition-all flex items-center justify-center space-x-2"
            >
              <Scissors className="w-4 h-4 text-gold-400" />
              <span>Post Custom Brief</span>
            </button>

            <button
              onClick={() => setCurrentView('explore')}
              className="w-full sm:w-auto px-6 py-4 rounded-xl text-couture-300 hover:text-white text-sm font-medium transition-colors flex items-center justify-center space-x-1.5"
            >
              <span>Explore Designs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Trust Metrics Bar */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto border-t border-couture-800/60 text-left">
            <div className="space-y-1">
              <span className="font-serif text-2xl font-bold text-white">100%</span>
              <p className="text-xs text-couture-400">Custom Bespoke Patterns</p>
            </div>
            <div className="space-y-1">
              <span className="font-serif text-2xl font-bold text-gold-400">Verified</span>
              <p className="text-xs text-couture-400">Independent Ateliers</p>
            </div>
            <div className="space-y-1">
              <span className="font-serif text-2xl font-bold text-white">Competitive</span>
              <p className="text-xs text-couture-400">Designer Bids & Quotes</p>
            </div>
            <div className="space-y-1">
              <span className="font-serif text-2xl font-bold text-emerald-400">Milestone</span>
              <p className="text-xs text-couture-400">Fitting & Delivery Escrow</p>
            </div>
          </div>

        </div>
      </section>

      {/* The Marketplace Differentiator Flow (How It Works) */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-couture-800/60">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold text-gold-400 uppercase tracking-widest">
            The Bespoke Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            How The Stitchly Marketplace Works
          </h2>
          <p className="text-sm text-couture-400 leading-relaxed">
            Eliminate off-the-rack compromises. Commission one-of-a-kind garments handcrafted precisely to your posture and textile taste.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          
          {/* Step 1 */}
          <div className="p-6 rounded-2xl bg-couture-900/60 border border-couture-800/80 hover:border-gold-500/40 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 font-serif font-bold text-lg group-hover:scale-105 transition-transform">
                01
              </div>
              <h3 className="font-serif text-lg font-bold text-white">
                Conceptualize or Consult AI
              </h3>
              <p className="text-xs text-couture-400 leading-relaxed">
                Describe your dream outfit or upload an inspiration photo. Our AI Assistant suggests silhouette cuts, luxury fabrics, palette swatches, and estimated price ranges.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-couture-800/60 text-xs text-gold-400 font-semibold flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart Pre-fill Brief</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-2xl bg-couture-900/60 border border-couture-800/80 hover:border-gold-500/40 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-champagne-500/10 border border-champagne-500/30 flex items-center justify-center text-champagne-300 font-serif font-bold text-lg group-hover:scale-105 transition-transform">
                02
              </div>
              <h3 className="font-serif text-lg font-bold text-white">
                Post Custom Clothing Brief
              </h3>
              <p className="text-xs text-couture-400 leading-relaxed">
                Set your budget, target deadline, measurements, and preferred silk/wool/linen fibers. Your request is immediately broadcast to skilled ateliers.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-couture-800/60 text-xs text-champagne-300 font-semibold flex items-center space-x-1">
              <Scissors className="w-3.5 h-3.5" />
              <span>Broadcast to Artisans</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-2xl bg-couture-900/60 border border-couture-800/80 hover:border-gold-500/40 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 font-serif font-bold text-lg group-hover:scale-105 transition-transform">
                03
              </div>
              <h3 className="font-serif text-lg font-bold text-white">
                Compare Designer Quotes
              </h3>
              <p className="text-xs text-couture-400 leading-relaxed">
                Receive personalized quotations from master tailors. Compare transparent cost breakdowns, turnaround times, and styling nuances side-by-side.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-couture-800/60 text-xs text-gold-400 font-semibold flex items-center space-x-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Select Best Match</span>
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-6 rounded-2xl bg-couture-900/60 border border-couture-800/80 hover:border-gold-500/40 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-serif font-bold text-lg group-hover:scale-105 transition-transform">
                04
              </div>
              <h3 className="font-serif text-lg font-bold text-white">
                Fittings & White-Glove Delivery
              </h3>
              <p className="text-xs text-couture-400 leading-relaxed">
                Accepting a quote converts it instantly into an active order. Track toile fitting progress through every milestone right to your door.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-couture-800/60 text-xs text-emerald-400 font-semibold flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Full Order Tracking</span>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive AI Studio Teaser Banner */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative rounded-3xl overflow-hidden border border-gold-500/30 bg-gradient-to-br from-couture-900 via-couture-950 to-couture-900 p-8 sm:p-12 shadow-card-dark">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
            <div className="space-y-6">
              <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-semibold uppercase tracking-wider border border-gold-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Design Stylist Studio</span>
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                Have a Dress in Mind? <br />
                <span className="gold-gradient-text">Let AI Architect the Details.</span>
              </h2>

              <p className="text-sm text-couture-300 leading-relaxed">
                Type an inspiration snippet (e.g. <em>"Emerald green velvet evening gown with structured boning and cowl neckline"</em>) or upload a runway moodboard image. The AI Design Assistant instantly provides:
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs text-couture-200">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Silhouette & Style Analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Luxury Fabric Recommendations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Harmonious Color Hex Palettes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Non-Binding Estimated Price</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setCurrentView('ai-studio')}
                  className="px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-couture-950 font-bold text-xs uppercase tracking-wider shadow-glow-gold transition-all"
                >
                  Try AI Studio Experience →
                </button>
              </div>
            </div>

            {/* Visual Preview Card */}
            <div className="p-6 rounded-2xl bg-couture-950/90 border border-couture-800 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-couture-800">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs text-couture-400 ml-2">AI Styling Engine Result</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-gold-500/20 text-gold-300 font-semibold uppercase">
                  Live Preview
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase text-couture-500 font-semibold">Architectural Concept</span>
                <h4 className="font-serif text-lg font-bold text-white">The Luminary Emerald Corset Gown</h4>
              </div>

              {/* Color swatch demo */}
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-[#0F4C3A] ring-1 ring-white/20" title="#0F4C3A Deep Emerald" />
                <div className="w-6 h-6 rounded-full bg-[#D4AF37] ring-1 ring-white/20" title="#D4AF37 Antique Gold" />
                <div className="w-6 h-6 rounded-full bg-[#1E3F20] ring-1 ring-white/20" title="#1E3F20 Forest Pine" />
                <div className="w-6 h-6 rounded-full bg-[#F9F6F0] ring-1 ring-white/20" title="#F9F6F0 Alabaster Ivory" />
                <span className="text-xs text-couture-400 ml-2">Extracted Color Palette</span>
              </div>

              <div className="p-3 rounded-xl bg-couture-900 border border-couture-800 space-y-1">
                <span className="text-[10px] uppercase text-gold-400 font-semibold">Recommended Textile</span>
                <p className="text-xs text-couture-200">Silk-Viscose Plush Velvet with Mulberry Habotai lining & horsehair hem braid.</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-couture-800">
                <div>
                  <span className="text-[10px] text-couture-500 uppercase block">Estimated Range</span>
                  <span className="font-serif text-base font-bold text-champagne-300">$620 - $780</span>
                </div>
                <span className="text-[11px] text-couture-400 italic">
                  Non-binding estimate
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Featured Designs Catalog */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-semibold text-gold-400 uppercase tracking-widest block mb-2">
              Curated Ateliers
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Trending Bespoke Commissions
            </h2>
          </div>
          <button
            onClick={() => setCurrentView('explore')}
            className="mt-4 sm:mt-0 text-sm font-semibold text-gold-300 hover:text-gold-200 flex items-center space-x-1"
          >
            <span>Explore All Designs</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDesigns.slice(0, 4).map((design) => (
            <DesignCard
              key={design.id}
              design={design}
              onSelect={() => setCurrentView('explore')}
              onDesignerClick={(designerId) => {
                setSelectedDesignerId(designerId);
                setCurrentView('designer-detail');
              }}
            />
          ))}
        </div>
      </section>

      {/* Verified Independent Ateliers */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-couture-800/60">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-semibold text-gold-400 uppercase tracking-widest block mb-2">
              Master Tailors & Couturiers
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Featured Verified Ateliers
            </h2>
          </div>
          <button
            onClick={() => setCurrentView('designers')}
            className="mt-4 sm:mt-0 text-sm font-semibold text-gold-300 hover:text-gold-200 flex items-center space-x-1"
          >
            <span>View All Designers</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredDesigners.map((designer) => (
            <DesignerCard
              key={designer.id}
              designer={designer}
              onSelect={handleSelectDesigner}
            />
          ))}
        </div>
      </section>

      {/* High-Impact Bottom CTA */}
      <section className="w-full py-24 bg-gradient-to-t from-couture-950 via-couture-900 to-couture-950 border-t border-couture-800 text-center px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white">
            Ready to Wear Something Crafted <br />
            <span className="gold-gradient-text italic font-normal">Exclusively For You?</span>
          </h2>
          <p className="text-sm text-couture-300 leading-relaxed max-w-xl mx-auto">
            Join thousands of discerning patrons who have abandoned off-the-rack sizing for true bespoke perfection.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setCurrentView('post-requirement')}
              className="px-8 py-4 rounded-xl bg-gold-500 hover:bg-gold-400 text-couture-950 font-bold text-sm uppercase tracking-wider shadow-glow-gold transition-all"
            >
              Post a Custom Garment Brief
            </button>
            <button
              onClick={() => setCurrentView('register')}
              className="px-8 py-4 rounded-xl bg-couture-900 border border-couture-700 text-white font-semibold text-sm hover:border-gold-500 transition-colors"
            >
              Join as a Designer Atelier
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
