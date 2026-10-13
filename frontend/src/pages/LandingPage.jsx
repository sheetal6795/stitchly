import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Scissors, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingUp
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
    <div className="w-full flex flex-col items-center bg-couture-950 text-couture-200">
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
        {/* Background image with soft overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=85"
            alt="Indian Fashion Background"
            className="w-full h-full object-cover object-top opacity-15 filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-couture-950/80 via-couture-950/90 to-couture-950" />
        </div>

        {/* Ambient lighting glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          
          {/* Tagline Pill */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-couture-900 border border-pink-300 text-pink-600 text-xs font-semibold uppercase tracking-widest shadow-sm animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>AI-Powered Custom Fashion Marketplace</span>
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-couture-200 leading-[1.1]">
            Custom Ethnic & Contemporary Wear, <br />
            <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-purple-500 bg-clip-text text-transparent italic font-normal">Stitched Just For You.</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-couture-300 font-medium leading-relaxed">
            Stitchly connects you with verified local tailors, boutiques, and designers. Upload your outfit idea, get instant price estimates in INR, and enjoy the perfect fit delivered to your doorstep.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setCurrentView('ai-studio')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-pink-600 via-rose-500 to-pink-500 hover:from-pink-500 hover:to-rose-400 text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-pink-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2.5"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>Try AI Style Assistant</span>
            </button>

            <button
              onClick={() => setCurrentView('post-requirement')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-couture-900 hover:bg-couture-850 text-couture-200 border border-couture-800 hover:border-pink-400 font-semibold text-sm transition-all flex items-center justify-center space-x-2 shadow-sm"
            >
              <Scissors className="w-4 h-4 text-pink-500" />
              <span>Post Outfit Requirement</span>
            </button>

            <button
              onClick={() => setCurrentView('explore')}
              className="w-full sm:w-auto px-6 py-4 rounded-xl text-couture-300 hover:text-couture-200 text-sm font-semibold transition-colors flex items-center justify-center space-x-1.5"
            >
              <span>Explore Designs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Trust Metrics Bar */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto border-t border-couture-800 text-left">
            <div className="space-y-1">
              <span className="font-serif text-2xl font-bold text-pink-600">100%</span>
              <p className="text-xs text-couture-300 font-medium">Custom Fit Guarantee</p>
            </div>
            <div className="space-y-1">
              <span className="font-serif text-2xl font-bold text-pink-600">Verified</span>
              <p className="text-xs text-couture-300 font-medium">Local Tailors & Designers</p>
            </div>
            <div className="space-y-1">
              <span className="font-serif text-2xl font-bold text-pink-600">Transparent</span>
              <p className="text-xs text-couture-300 font-medium">Quotes & INR Pricing</p>
            </div>
            <div className="space-y-1">
              <span className="font-serif text-2xl font-bold text-emerald-400">Secure</span>
              <p className="text-xs text-couture-300 font-medium">Milestone Payments</p>
            </div>
          </div>

        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-couture-800">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-pink-600 uppercase tracking-widest">
            The Stitchly Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-couture-200">
            How Stitchly Works
          </h2>
          <p className="text-sm text-couture-300 leading-relaxed font-medium">
            No more standard store sizes that don't fit right. Get one-of-a-kind outfits stitched precisely to your measurements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          
          {/* Step 1 */}
          <div className="p-6 rounded-2xl bg-couture-900 border border-couture-800 hover:border-pink-300 transition-all flex flex-col justify-between group shadow-card-dark">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-600 font-serif font-bold text-lg group-hover:scale-105 transition-transform">
                01
              </div>
              <h3 className="font-serif text-lg font-bold text-couture-200">
                Share Idea or Ask AI
              </h3>
              <p className="text-xs text-couture-300 leading-relaxed font-medium">
                Describe your dream outfit or upload an inspiration photo. Our AI Assistant suggests fabric choices, matching colors, and an estimated INR price.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-couture-800 text-xs text-pink-600 font-bold flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart AI Assistant</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-2xl bg-couture-900 border border-couture-800 hover:border-pink-300 transition-all flex flex-col justify-between group shadow-card-dark">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-600 font-serif font-bold text-lg group-hover:scale-105 transition-transform">
                02
              </div>
              <h3 className="font-serif text-lg font-bold text-couture-200">
                Post Outfit Requirement
              </h3>
              <p className="text-xs text-couture-300 leading-relaxed font-medium">
                Set your budget in ₹, target deadline, measurements, and preferred fabric (Silk, Georgette, Velvet, Cotton). Local tailors will see your request instantly.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-couture-800 text-xs text-pink-600 font-bold flex items-center space-x-1">
              <Scissors className="w-3.5 h-3.5" />
              <span>Broadcast to Tailors</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-2xl bg-couture-900 border border-couture-800 hover:border-pink-300 transition-all flex flex-col justify-between group shadow-card-dark">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-600 font-serif font-bold text-lg group-hover:scale-105 transition-transform">
                03
              </div>
              <h3 className="font-serif text-lg font-bold text-couture-200">
                Compare Designer Quotes
              </h3>
              <p className="text-xs text-couture-300 leading-relaxed font-medium">
                Receive price offers directly from skilled designers and tailors. Compare costs in INR, delivery timelines, and previous work side-by-side.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-couture-800 text-xs text-pink-600 font-bold flex items-center space-x-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Select Best Match</span>
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-6 rounded-2xl bg-couture-900 border border-couture-800 hover:border-pink-300 transition-all flex flex-col justify-between group shadow-card-dark">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-serif font-bold text-lg group-hover:scale-105 transition-transform">
                04
              </div>
              <h3 className="font-serif text-lg font-bold text-couture-200">
                Trial Fittings & Delivery
              </h3>
              <p className="text-xs text-couture-300 leading-relaxed font-medium">
                Track your order step-by-step—from fabric cutting and trial fitting right to your doorstep.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-couture-800 text-xs text-emerald-400 font-bold flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Full Order Tracking</span>
            </div>
          </div>

        </div>
      </section>

      {/* AI Design Studio Teaser Banner */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative rounded-3xl overflow-hidden border border-pink-300 bg-gradient-to-br from-couture-900 via-couture-950 to-couture-900 p-8 sm:p-12 shadow-card-dark">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
            <div className="space-y-6">
              <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-pink-500/10 text-pink-600 text-xs font-semibold uppercase tracking-wider border border-pink-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Design Studio</span>
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-couture-200 leading-tight">
                Have an Outfit Idea in Mind? <br />
                <span className="text-pink-600">Let AI Help You Design It.</span>
              </h2>

              <p className="text-sm text-couture-300 leading-relaxed font-medium">
                Type a simple prompt like <em>"Emerald green velvet lehenga with subtle embroidery"</em> or upload an inspiration photo. The AI Style Assistant instantly provides:
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs text-couture-200 font-medium">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Silhouette & Style Tips</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Fabric Recommendations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Matching Color Palettes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Estimated Price in ₹</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setCurrentView('ai-studio')}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-500 hover:to-rose-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-pink-500/20 transition-all"
                >
                  Try AI Studio Experience →
                </button>
              </div>
            </div>

            {/* Visual Preview Card */}
            <div className="p-6 rounded-2xl bg-couture-900 border border-couture-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-couture-800">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-pink-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-xs text-couture-300 ml-2 font-medium">AI Preview Result</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-pink-50 text-pink-600 border border-pink-200 font-bold uppercase">
                  Live Preview
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase text-pink-600 font-bold tracking-wider">Outfit Concept</span>
                <h4 className="font-serif text-lg font-bold text-couture-200">Emerald Green Velvet Lehenga Set</h4>
              </div>

              {/* Color swatch demo */}
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-[#0F4C3A] ring-1 ring-pink-300" title="Deep Emerald" />
                <div className="w-6 h-6 rounded-full bg-[#EC4899] ring-1 ring-pink-300" title="Rose Pink" />
                <div className="w-6 h-6 rounded-full bg-[#1E3F20] ring-1 ring-pink-300" title="Forest Pine" />
                <div className="w-6 h-6 rounded-full bg-[#FDF8F6] ring-1 ring-pink-300" title="Ivory" />
                <span className="text-xs text-couture-300 ml-2 font-medium">Color Palette</span>
              </div>

              <div className="p-3 rounded-xl bg-couture-950 border border-couture-800 space-y-1">
                <span className="text-[10px] uppercase text-pink-600 font-bold">Recommended Fabric</span>
                <p className="text-xs text-couture-300 font-medium">Plush Silk-Velvet with Soft Satin Lining & Zari Border.</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-couture-800">
                <div>
                  <span className="text-[10px] text-couture-300 uppercase block font-semibold">Estimated Cost</span>
                  <span className="font-serif text-base font-bold text-pink-600">₹8,500 - ₹12,500</span>
                </div>
                <span className="text-[11px] text-couture-300 italic font-medium">
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
            <span className="text-xs font-bold text-pink-600 uppercase tracking-widest block mb-2">
              Trending Collections
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-couture-200">
              Popular Custom Outfits
            </h2>
          </div>
          <button
            onClick={() => setCurrentView('explore')}
            className="mt-4 sm:mt-0 text-sm font-bold text-pink-600 hover:text-rose-500 flex items-center space-x-1"
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

      {/* Verified Local Ateliers */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-couture-800">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold text-pink-600 uppercase tracking-widest block mb-2">
              Master Tailors & Boutiques
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-couture-200">
              Featured Verified Designers
            </h2>
          </div>
          <button
            onClick={() => setCurrentView('designers')}
            className="mt-4 sm:mt-0 text-sm font-bold text-pink-600 hover:text-rose-500 flex items-center space-x-1"
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
      <section className="w-full py-24 bg-couture-900 border-t border-couture-800 text-center px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-couture-200">
            Ready to Wear Something Made <br />
            <span className="text-pink-600 italic font-normal">Exclusively For You?</span>
          </h2>
          <p className="text-sm text-couture-300 leading-relaxed max-w-xl mx-auto font-medium">
            Join thousands of happy customers across India who switched to custom-stitched clothing.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setCurrentView('post-requirement')}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-500 hover:to-rose-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-pink-500/20 transition-all"
            >
              Post Outfit Requirement
            </button>
            <button
              onClick={() => setCurrentView('register')}
              className="px-8 py-4 rounded-xl bg-couture-950 border border-couture-800 text-couture-200 font-bold text-sm hover:border-pink-300 transition-colors"
            >
              Join as a Designer / Tailor
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};