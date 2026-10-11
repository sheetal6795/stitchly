import React, { useState } from 'react';
import { 
  Sparkles, 
  Upload, 
  Send, 
  ArrowRight, 
  Info, 
  CheckCircle2, 
  Palette, 
  Scissors, 
  DollarSign, 
  Clock, 
  FileText,
  Copy,
  Check,
  RefreshCw
} from 'lucide-react';
import { aiApi, uploadApi } from '../services/api';
import { useToast } from '../context/ToastContext';

export const AiStudioPage = ({ setCurrentView, setPreFilledRequirement }) => {
  const toast = useToast();
  const [prompt, setPrompt] = useState('');
  const [inspirationImageUrl, setInspirationImageUrl] = useState('');
  const [occasion, setOccasion] = useState('Gala / Black Tie');
  const [budgetTier, setBudgetTier] = useState('Mid-range');
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [copiedHex, setCopiedHex] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);

  const samplePrompts = [
    "Emerald green velvet evening gown with structured corset bodice, off-shoulder drape and floor-length slit",
    "Bespoke double-breasted midnight navy tuxedo in Italian wool with peak silk lapels and tailored pleats",
    "Modern minimalist silk organza bridal gown with French lace sleeves and a 2-meter train",
    "Royal Benarasi saffron silk brocade lehenga with intricate hand-embroidered gold zardozi motifs"
  ];

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const res = await uploadApi.uploadFile(file);
      if (res.data?.url) {
        setInspirationImageUrl(res.data.url);
        toast.success('Inspiration image uploaded successfully!');
      }
    } catch (err) {
      toast.error('Could not upload image. You can also paste an image URL directly.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleConsult = async (e) => {
    e?.preventDefault();
    if (!prompt.trim()) {
      toast.error('Please describe your desired outfit or design concept.');
      return;
    }

    setLoading(true);
    try {
      const res = await aiApi.consult({
        prompt: prompt.trim(),
        inspirationImageUrl: inspirationImageUrl.trim() || null,
        occasion,
        preferredBudgetTier: budgetTier,
      });

      setAnalysisResult(res.data);
      toast.success('AI fashion consultation generated!');
    } catch (err) {
      toast.error(err.message || 'Consultation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyHex = (hex) => {
    navigator.clipboard?.writeText(hex);
    setCopiedHex(hex);
    toast.success(`Copied ${hex} to clipboard!`);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const handleConvertToRequirement = () => {
    if (!analysisResult) return;

    // Collect fabric names
    const fabrics = analysisResult.suggestedFabrics?.map(f => f.fabricName).join(', ') || '';
    // Collect color names
    const colors = analysisResult.recommendedColors?.map(c => c.name).join(', ') || '';

    const prefill = {
      title: analysisResult.designTitle,
      clothingType: analysisResult.clothingType,
      preferredFabric: fabrics,
      preferredColors: colors,
      budgetMin: analysisResult.estimatedPriceMin,
      budgetMax: analysisResult.estimatedPriceMax,
      notes: `${analysisResult.clothingStyle}\n\nKey Customizations:\n${analysisResult.customizationSuggestions?.map(s => '• ' + s).join('\n')}`,
      inspirationImageUrl: inspirationImageUrl || "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80",
    };

    setPreFilledRequirement(prefill);
    setCurrentView('post-requirement');
    toast.info('AI concept pre-filled into your Custom Garment Brief!');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Haute AI Stylist Studio</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
          AI Fashion Design Assistant
        </h1>
        <p className="text-sm text-couture-300 leading-relaxed">
          Describe any silhouette, fabric vision, or event dress code. Our AI analyzes haute couture tailoring techniques, extracts palette harmonies, and provides instant non-binding price estimations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Input Form (5 cols) */}
        <div className="lg:col-span-5 bg-couture-900/80 border border-couture-800 rounded-2xl p-6 shadow-card-dark space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-couture-800">
            <h3 className="font-serif text-base font-bold text-white flex items-center space-x-2">
              <Scissors className="w-4 h-4 text-gold-400" />
              <span>Garment Parameters</span>
            </h3>
            <span className="text-[10px] text-couture-400 uppercase tracking-wider">
              Step 1 of 2
            </span>
          </div>

          <form onSubmit={handleConsult} className="space-y-5">
            {/* Design Description */}
            <div>
              <label className="block text-xs font-semibold text-couture-300 uppercase tracking-wider mb-1.5">
                Describe Your Desired Dress or Garment *
              </label>
              <textarea
                rows="4"
                required
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. Emerald green velvet evening gown with structured corset boning, off-shoulder drape and floor-length slit..."
                className="w-full p-3.5 rounded-xl bg-couture-950 border border-couture-700 text-white placeholder-couture-600 focus:outline-none focus:border-gold-500 text-sm leading-relaxed"
              />
            </div>

            {/* Quick Inspiration Snippets */}
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase tracking-wider text-couture-500 font-semibold block">
                Or pick an inspirational prompt:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {samplePrompts.map((p, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => setPrompt(p)}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-couture-800/60 hover:bg-couture-800 text-couture-300 hover:text-white border border-couture-700/60 transition-colors text-left truncate max-w-full"
                  >
                    "{p.substring(0, 42)}..."
                  </button>
                ))}
              </div>
            </div>

            {/* Inspiration Image Input / Upload */}
            <div>
              <label className="block text-xs font-semibold text-couture-300 uppercase tracking-wider mb-1.5">
                Inspiration Moodboard Image (Optional)
              </label>
              <div className="space-y-2">
                <input
                  type="url"
                  value={inspirationImageUrl}
                  onChange={(e) => setInspirationImageUrl(e.target.value)}
                  placeholder="Paste image URL (Unsplash, Pinterest, etc.)..."
                  className="w-full px-3 py-2 rounded-xl bg-couture-950 border border-couture-700 text-white placeholder-couture-600 focus:outline-none focus:border-gold-500 text-xs"
                />

                <div className="flex items-center space-x-2">
                  <label className="cursor-pointer inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-couture-800 hover:bg-couture-700 text-couture-200 text-xs font-medium border border-couture-600 transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingImage ? 'Uploading...' : 'Upload Device Image'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                  </label>
                  {inspirationImageUrl && (
                    <span className="text-[11px] text-emerald-400 flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Image attached</span>
                    </span>
                  )}
                </div>
              </div>

              {inspirationImageUrl && (
                <div className="mt-2 relative w-24 h-28 rounded-lg overflow-hidden border border-couture-700">
                  <img
                    src={inspirationImageUrl}
                    alt="Inspiration Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setInspirationImageUrl('')}
                    className="absolute top-1 right-1 bg-black/70 text-white p-1 rounded-full text-xs hover:bg-black"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>

            {/* Occasion & Budget Tier */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-couture-300 uppercase tracking-wider mb-1.5">
                  Occasion
                </label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-couture-950 border border-couture-700 text-white text-xs focus:outline-none focus:border-gold-500"
                >
                  <option value="Gala / Black Tie">Gala / Black Tie</option>
                  <option value="Bridal & Wedding">Bridal & Wedding</option>
                  <option value="Cocktail & Soirée">Cocktail & Soirée</option>
                  <option value="Heritage & Festive">Heritage & Festive</option>
                  <option value="Executive Formal">Executive Formal</option>
                  <option value="Avant-Garde Runway">Avant-Garde Runway</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-couture-300 uppercase tracking-wider mb-1.5">
                  Artisanal Tier
                </label>
                <select
                  value={budgetTier}
                  onChange={(e) => setBudgetTier(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-couture-950 border border-couture-700 text-white text-xs focus:outline-none focus:border-gold-500"
                >
                  <option value="Mid-range">Mid-range Bespoke</option>
                  <option value="Luxury Couture">Luxury Haute Couture</option>
                  <option value="Budget">Accessible Artisanal</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold-600 via-gold-500 to-amber-400 hover:from-gold-500 hover:to-amber-300 text-couture-950 font-bold text-sm uppercase tracking-wider shadow-glow-gold transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-couture-950" />
                  <span>Consulting Fashion AI Engine...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 fill-couture-950" />
                  <span>Generate AI Consultation</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: AI Analysis Result (7 cols) */}
        <div className="lg:col-span-7 bg-couture-900/80 border border-couture-800 rounded-2xl p-6 sm:p-8 shadow-card-dark min-h-[550px] flex flex-col justify-between">
          
          {analysisResult ? (
            <div className="space-y-6 animate-fade-in">
              
              {/* Header with Title and Type */}
              <div className="pb-4 border-b border-couture-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-semibold text-gold-400 uppercase tracking-widest block">
                    {analysisResult.clothingType}
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-white mt-0.5">
                    {analysisResult.designTitle}
                  </h2>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 font-semibold">
                    ~{analysisResult.estimatedDays} Days Craftsmanship
                  </span>
                </div>
              </div>

              {/* Silhouette & Cut Architecture */}
              <div className="p-4 rounded-xl bg-couture-950/70 border border-couture-800 space-y-1.5">
                <span className="text-xs uppercase tracking-wider font-semibold text-gold-400 flex items-center space-x-1.5">
                  <Scissors className="w-3.5 h-3.5" />
                  <span>Silhouette & Style Architecture</span>
                </span>
                <p className="text-xs text-couture-200 leading-relaxed">
                  {analysisResult.clothingStyle}
                </p>
              </div>

              {/* Curated Color Harmony Palette */}
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-gold-400 flex items-center space-x-1.5 mb-2.5">
                  <Palette className="w-3.5 h-3.5" />
                  <span>Curated Color Harmony Palette (Click Hex to Copy)</span>
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {analysisResult.recommendedColors?.map((color, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => handleCopyHex(color.hex)}
                      className="p-3 rounded-xl bg-couture-950 border border-couture-800 hover:border-gold-500/50 transition-all text-left group"
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <div
                          className="w-5 h-5 rounded-full ring-1 ring-white/20 shadow-sm"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="text-[10px] text-couture-400 uppercase font-mono group-hover:text-gold-300 transition-colors">
                          {color.hex}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-white truncate">{color.name}</p>
                      <span className="text-[10px] text-couture-500 block">{color.mood}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recommended Fabrics & Textiles */}
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-gold-400 flex items-center space-x-1.5 mb-2.5">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Textile & Fabric Construction</span>
                </span>
                <div className="space-y-2">
                  {analysisResult.suggestedFabrics?.map((fab, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-couture-950/70 border border-couture-800 text-xs">
                      <div className="flex items-center justify-between font-semibold text-white mb-1">
                        <span>{fab.fabricName}</span>
                        <span className="text-[10px] text-champagne-300 px-2 py-0.5 rounded bg-couture-800">
                          {fab.suitability}
                        </span>
                      </div>
                      <p className="text-couture-400 leading-relaxed text-[11px]">
                        {fab.characteristics}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bespoke Customization Suggestions */}
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-gold-400 flex items-center space-x-1.5 mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Artisanal Finishing & Customizations</span>
                </span>
                <ul className="space-y-1.5 text-xs text-couture-300">
                  {analysisResult.customizationSuggestions?.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-gold-400 font-bold">•</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price Estimate Section (With Prominent Mandatory Disclaimer) */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-couture-950 via-couture-900 to-couture-950 border border-gold-500/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest font-semibold text-gold-400 flex items-center space-x-1">
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>Estimated Price Range</span>
                  </span>
                  <span className="font-serif text-2xl font-bold text-champagne-200">
                    ${analysisResult.estimatedPriceMin?.toLocaleString()} – ${analysisResult.estimatedPriceMax?.toLocaleString()}
                  </span>
                </div>

                {/* Clear prominent disclaimer */}
                <div className="p-2.5 rounded-lg bg-couture-950/80 border border-couture-800 text-[11px] text-couture-300 leading-relaxed flex items-start space-x-2">
                  <Info className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                  <span>{analysisResult.priceDisclaimer}</span>
                </div>
              </div>

              {/* Conversion CTA to Marketplace Brief */}
              <div className="pt-4 border-t border-couture-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-xs text-couture-400">
                  Love this concept? Convert it directly into a live marketplace requirement for designers to submit actual bids.
                </p>
                <button
                  onClick={handleConvertToRequirement}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-amber-400 text-couture-950 font-bold text-xs uppercase tracking-wider shadow-glow-gold transition-all flex items-center justify-center space-x-2 flex-shrink-0"
                >
                  <span>Post as Custom Brief</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ) : (
            /* Empty State Placeholder */
            <div className="py-24 flex flex-col items-center justify-center text-center space-y-4 my-auto">
              <div className="w-16 h-16 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 shadow-glow-gold">
                <Sparkles className="w-8 h-8" />
              </div>
              <div className="space-y-1.5 max-w-md">
                <h3 className="font-serif text-xl font-bold text-white">
                  Your Bespoke Concept Awaits
                </h3>
                <p className="text-xs text-couture-400 leading-relaxed">
                  Enter your dress or garment vision on the left panel to receive an artisanal breakdown complete with fabrics, swatches, silhouette notes, and estimated pricing.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
