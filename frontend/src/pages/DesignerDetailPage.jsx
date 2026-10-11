import React, { useState, useEffect } from 'react';
import { 
  Star, 
  CheckCircle2, 
  MapPin, 
  Scissors, 
  Clock, 
  ArrowLeft, 
  Sparkles, 
  MessageSquare, 
  PlusCircle, 
  Heart
} from 'lucide-react';
import { designerApi, designApi, reviewApi } from '../services/api';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { DesignCard } from '../components/DesignCard';

export const DesignerDetailPage = ({ designerId, setCurrentView, setPreFilledRequirement }) => {
  const toast = useToast();
  const { isAuthenticated } = useAuth();
  const [designer, setDesigner] = useState(null);
  const [designs, setDesigns] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (designerId) {
      loadDesignerData();
    }
  }, [designerId]);

  const loadDesignerData = async () => {
    setLoading(true);
    try {
      const [designerRes, designsRes, reviewsRes] = await Promise.all([
        designerApi.getById(designerId),
        designApi.getByDesigner(designerId),
        reviewApi.getByDesigner(designerId)
      ]);

      setDesigner(designerRes.data);
      setDesigns(designsRes.data || []);
      setReviews(reviewsRes.data || []);
    } catch (err) {
      console.error('Failed to load designer detail', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCommissionAtelier = () => {
    setPreFilledRequirement({
      title: `Bespoke Commission for ${designer?.brandName}`,
      clothingType: designer?.specialties?.split(',')[0]?.trim() || 'Evening Gown',
      preferredFabric: '',
      preferredColors: '',
      budgetMin: '500',
      budgetMax: '1000',
      notes: `Direct commission request tailored specifically for ${designer?.brandName}. Looking to leverage your bespoke craftsmanship in ${designer?.specialties}.`,
      inspirationImageUrl: '',
    });
    setCurrentView('post-requirement');
    toast.info(`Pre-filled Custom Garment Brief for ${designer?.brandName}!`);
  };

  const handleToggleLike = async (id) => {
    if (!isAuthenticated) {
      toast.info('Sign in to save pieces.');
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
    } catch (err) {
      toast.error('Could not save design');
    }
  };

  if (loading) {
    return (
      <div className="w-full py-32 text-center text-couture-400">
        <Sparkles className="w-8 h-8 text-gold-400 animate-spin mx-auto mb-2" />
        <p className="text-sm">Visiting atelier studio...</p>
      </div>
    );
  }

  if (!designer) {
    return (
      <div className="w-full py-32 text-center text-couture-400">
        <p className="text-base text-white">Atelier profile not found.</p>
        <button
          onClick={() => setCurrentView('designers')}
          className="mt-4 px-4 py-2 rounded-xl bg-couture-800 text-xs text-white"
        >
          Back to Designers
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Back button */}
      <button
        onClick={() => setCurrentView('designers')}
        className="inline-flex items-center space-x-1.5 text-xs text-couture-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Designers Directory</span>
      </button>

      {/* Atelier Banner Header */}
      <div className="relative rounded-3xl overflow-hidden border border-couture-800 bg-couture-900 shadow-card-dark mb-12">
        
        {/* Cover Photo */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-couture-950">
          <img
            src={designer.bannerUrl || "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80"}
            alt={designer.brandName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-couture-950 via-couture-950/60 to-transparent" />
        </div>

        {/* Profile Card Body */}
        <div className="px-6 sm:px-10 pb-8 pt-0 relative -mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-couture-800/80">
            
            <div className="flex flex-col sm:flex-row sm:items-end space-y-4 sm:space-y-0 sm:space-x-5">
              <img
                src={designer.avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"}
                alt={designer.brandName}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover ring-4 ring-couture-950 shadow-2xl bg-couture-950"
              />

              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h1 className="font-serif text-2xl sm:text-4xl font-bold text-white">
                    {designer.brandName}
                  </h1>
                  {designer.verified && (
                    <span className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified Atelier</span>
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-couture-400">
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-couture-500" />
                    <span>{designer.location || 'Global Studio'}</span>
                  </span>
                  <span>•</span>
                  <span>{designer.experienceYears || 5} Years Craftsmanship</span>
                  <span>•</span>
                  <span className="text-gold-400 font-semibold">{designer.pricingTier || '$$$'} Tier</span>
                </div>
              </div>
            </div>

            {/* Direct Commission CTA */}
            <button
              onClick={handleCommissionAtelier}
              className="flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-gold-600 via-gold-500 to-amber-400 hover:from-gold-500 hover:to-amber-300 text-couture-950 font-bold text-xs uppercase tracking-wider shadow-glow-gold transition-all self-start sm:self-auto"
            >
              <Scissors className="w-4 h-4" />
              <span>Commission This Atelier</span>
            </button>

          </div>

          {/* Stats Bar & Bio */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6">
            
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-xs uppercase font-bold tracking-wider text-gold-400">
                Atelier Story & Philosophy
              </h3>
              <p className="text-sm text-couture-200 leading-relaxed font-light">
                {designer.bio}
              </p>

              {/* Specialties tags */}
              {designer.specialties && (
                <div className="pt-2">
                  <span className="text-xs uppercase font-bold tracking-wider text-couture-400 block mb-2">
                    Mastered Crafts & Disciplines
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {designer.specialties.split(',').map((spec, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg text-xs font-medium bg-couture-950 text-gold-300 border border-couture-700/80"
                      >
                        {spec.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Stats Sidebar */}
            <div className="p-5 rounded-2xl bg-couture-950/70 border border-couture-800 space-y-4 self-start">
              <h4 className="text-xs uppercase font-bold tracking-wider text-couture-400">
                Performance Record
              </h4>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-couture-800/60">
                  <span className="text-couture-400">Average Rating</span>
                  <span className="font-serif text-base font-bold text-gold-400 flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-gold-400" />
                    <span>{designer.ratingAverage?.toFixed(1) || '5.0'}</span>
                    <span className="text-xs text-couture-500 font-sans font-normal">({designer.reviewCount || 0})</span>
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-couture-800/60">
                  <span className="text-couture-400">Completed Commissions</span>
                  <span className="font-serif text-base font-bold text-white">
                    {designer.completedOrdersCount || 0} pieces
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-couture-400">Direct Contact</span>
                  <span className="text-couture-300">
                    {designer.instagramHandle || '@stitchly_couture'}
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Portfolio Showcase Section */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-semibold text-gold-400 uppercase tracking-widest block mb-1">
              Atelier Archive
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Bespoke Portfolio Showcase ({designs.length})
            </h2>
          </div>
        </div>

        {designs.length === 0 ? (
          <div className="py-16 text-center rounded-2xl bg-couture-900/40 border border-couture-800">
            <p className="text-sm text-couture-400">No portfolio pieces published yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {designs.map((design) => (
              <DesignCard
                key={design.id}
                design={design}
                onLike={handleToggleLike}
              />
            ))}
          </div>
        )}
      </section>

      {/* Verified Client Reviews Section */}
      <section className="pt-10 border-t border-couture-800/80">
        <div className="mb-8">
          <span className="text-xs font-semibold text-gold-400 uppercase tracking-widest block mb-1">
            Client Testimonials
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Verified Patron Reviews ({reviews.length})
          </h2>
        </div>

        {reviews.length === 0 ? (
          <div className="py-12 text-center rounded-2xl bg-couture-900/40 border border-couture-800">
            <p className="text-sm text-couture-400">No reviews yet for this atelier.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-2xl bg-couture-900/60 border border-couture-800 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={rev.customerAvatarUrl || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80"}
                      alt={rev.customerName}
                      className="w-10 h-10 rounded-full object-cover ring-1 ring-gold-500/40"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white">{rev.customerName}</h4>
                      <span className="text-[10px] text-emerald-400 font-semibold uppercase">
                        Verified Bespoke Purchase
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 text-gold-400">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-gold-400" />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-couture-200 leading-relaxed italic">
                  "{rev.comment}"
                </p>

                <div className="text-[10px] text-couture-500 pt-1">
                  Commission finalized {rev.createdAt?.substring(0, 10)}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
};
