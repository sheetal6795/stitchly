import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  X, 
  Clock, 
  Heart, 
  Sparkles, 
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { designApi } from '../services/api';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { DesignCard } from '../components/DesignCard';

const CATEGORIES = [
  'All',
  'Evening Wear',
  'Bridal',
  'Suits & Tailoring',
  'Traditional/Ethnic',
  'Resort Wear',
  'Cocktail'
];

export const ExploreDesignsPage = ({ setCurrentView, setSelectedDesignerId, setPreFilledRequirement }) => {
  const toast = useToast();
  const { isAuthenticated, isCustomer } = useAuth();
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [maxPrice, setMaxPrice] = useState('2000');
  const [selectedDesignModal, setSelectedDesignModal] = useState(null);

  useEffect(() => {
    loadDesigns();
  }, [selectedCategory]);

  const loadDesigns = async () => {
    setLoading(true);
    try {
      const categoryParam = selectedCategory === 'All' ? null : selectedCategory;
      const res = await designApi.getAll({
        category: categoryParam,
        maxPrice: maxPrice ? parseFloat(maxPrice) : null,
        search: search.trim() || null,
      });
      setDesigns(res.data || []);
    } catch (err) {
      console.error('Failed to load designs', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadDesigns();
  };

  const handleToggleLike = async (id) => {
    if (!isAuthenticated) {
      toast.info('Sign in to save pieces to your bespoke lookbook.');
      return;
    }
    try {
      const res = await designApi.toggleLike(id);
      const isLiked = res.data?.liked;
      setDesigns(prev => prev.map(d => {
        if (d.id === id) {
          return {
            ...d,
            likedByCurrentUser: isLiked,
            likesCount: isLiked ? (d.likesCount || 0) + 1 : Math.max(0, (d.likesCount || 1) - 1)
          };
        }
        return d;
      }));
      toast.success(isLiked ? 'Saved to your Lookbook' : 'Removed from Lookbook');
    } catch (err) {
      toast.error('Failed to update saved design');
    }
  };

  const handleCommissionSimilar = (design) => {
    setPreFilledRequirement({
      title: `Bespoke Commission inspired by ${design.title}`,
      clothingType: design.category,
      preferredFabric: design.tags || '',
      preferredColors: '',
      budgetMin: design.price ? design.price * 0.9 : 400,
      budgetMax: design.price ? design.price * 1.3 : 800,
      notes: `Inspired by "${design.title}" by atelier ${design.designerBrandName}. Craftsmanship reference: ${design.description}`,
      inspirationImageUrl: design.imageUrl,
    });
    setSelectedDesignModal(null);
    setCurrentView('post-requirement');
    toast.info('Design inspiration pre-filled into your Custom Garment Brief!');
  };

  const handleReport = async (designId) => {
    try {
      await designApi.report(designId);
      toast.info('Design flagged for administrative review.');
    } catch (err) {
      toast.error('Could not report design');
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <span className="text-xs font-semibold text-gold-400 uppercase tracking-widest block">
          Curated Atelier Lookbook
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
          Explore Bespoke Fashion Designs
        </h1>
        <p className="text-sm text-couture-300 leading-relaxed">
          Discover one-of-a-kind bespoke creations designed and tailored by independent couturiers. Like to save to your wardrobe lookbook or commission a tailored version.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-couture-900/80 border border-couture-800 rounded-2xl p-4 sm:p-5 shadow-card-dark mb-10 space-y-4">
        
        {/* Search Row */}
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute top-3.5 left-3.5 w-4 h-4 text-couture-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by silhouette, velvet, silk, tuxedo, bridal gown..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-couture-950 border border-couture-700 text-white placeholder-couture-600 focus:outline-none focus:border-gold-500 text-sm"
            />
          </div>
          
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-couture-950 font-bold text-xs uppercase tracking-wider shadow-glow-gold transition-all"
          >
            Search Designs
          </button>
        </form>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 pt-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-gold-500 text-couture-950 shadow-glow-gold'
                  : 'bg-couture-950 text-couture-400 hover:text-white border border-couture-800 hover:border-gold-500/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Grid of Designs */}
      {loading ? (
        <div className="py-24 text-center text-couture-400">
          <Sparkles className="w-8 h-8 text-gold-400 animate-spin mx-auto mb-2" />
          <p className="text-sm">Browsing ateliers catalog...</p>
        </div>
      ) : designs.length === 0 ? (
        <div className="py-24 text-center rounded-2xl bg-couture-900/40 border border-couture-800">
          <p className="font-serif text-lg text-white">No designs match this search criteria</p>
          <p className="text-xs text-couture-400 mt-1">Try selecting "All" categories or adjusting keywords.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {designs.map((design) => (
            <DesignCard
              key={design.id}
              design={design}
              onLike={handleToggleLike}
              onSelect={(d) => setSelectedDesignModal(d)}
              onDesignerClick={(designerId) => {
                setSelectedDesignerId(designerId);
                setCurrentView('designer-detail');
              }}
            />
          ))}
        </div>
      )}

      {/* Design Detail Modal */}
      {selectedDesignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-couture-900 border border-couture-800 rounded-3xl shadow-card-dark overflow-hidden my-8 grid grid-cols-1 md:grid-cols-2">
            
            {/* Left Image */}
            <div className="relative aspect-[3/4] md:aspect-auto w-full bg-couture-950">
              <img
                src={selectedDesignModal.imageUrl}
                alt={selectedDesignModal.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedDesignModal(null)}
                className="md:hidden absolute top-3 right-3 p-1.5 rounded-full bg-black/70 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Right Details */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/30">
                    {selectedDesignModal.category}
                  </span>
                  <button
                    onClick={() => setSelectedDesignModal(null)}
                    className="hidden md:block p-1 text-couture-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Designer attribution */}
                <div
                  onClick={() => {
                    setSelectedDesignerId(selectedDesignModal.designerId);
                    setSelectedDesignModal(null);
                    setCurrentView('designer-detail');
                  }}
                  className="flex items-center space-x-2.5 cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <img
                    src={selectedDesignModal.designerAvatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"}
                    alt={selectedDesignModal.designerBrandName}
                    className="w-8 h-8 rounded-full object-cover ring-1 ring-gold-500/40"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center space-x-1">
                      <span>{selectedDesignModal.designerBrandName}</span>
                      {selectedDesignModal.designerVerified && (
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      )}
                    </h4>
                    <span className="text-[10px] text-couture-400">View Atelier Profile →</span>
                  </div>
                </div>

                <h2 className="font-serif text-2xl font-bold text-white">
                  {selectedDesignModal.title}
                </h2>

                <p className="text-xs text-couture-300 leading-relaxed">
                  {selectedDesignModal.description}
                </p>

                {/* Tags */}
                {selectedDesignModal.tags && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {selectedDesignModal.tags.split(',').map((tag, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-couture-950 text-couture-300 border border-couture-800">
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                )}

                {/* Specs */}
                <div className="pt-3 border-t border-couture-800 flex items-center justify-between text-xs text-couture-400">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-gold-400" />
                    <span>~{selectedDesignModal.estimatedDays} days turnaround</span>
                  </span>
                  <span>{selectedDesignModal.likesCount || 0} saves</span>
                </div>
              </div>

              {/* Price & Action */}
              <div className="space-y-3 pt-4 border-t border-couture-800">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-couture-400 uppercase">Estimated Commission</span>
                  <span className="font-serif text-2xl font-bold text-champagne-300">
                    ${selectedDesignModal.price?.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleCommissionSimilar(selectedDesignModal)}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-gold-600 via-gold-500 to-amber-400 hover:from-gold-500 hover:to-amber-300 text-couture-950 font-bold text-xs uppercase tracking-wider shadow-glow-gold transition-all"
                  >
                    Commission Similar Custom Piece
                  </button>
                  <button
                    onClick={() => handleToggleLike(selectedDesignModal.id)}
                    className={`p-3 rounded-xl border transition-colors ${
                      selectedDesignModal.likedByCurrentUser
                        ? 'bg-red-500/20 border-red-500/40 text-red-400'
                        : 'bg-couture-950 border-couture-700 text-couture-400 hover:text-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${selectedDesignModal.likedByCurrentUser ? 'fill-red-400' : ''}`} />
                  </button>
                </div>

                <button
                  onClick={() => handleReport(selectedDesignModal.id)}
                  className="w-full text-center text-[10px] text-couture-500 hover:text-couture-300 pt-1"
                >
                  Report inappropriate content
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
