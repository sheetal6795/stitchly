import React from 'react';
import { Star, CheckCircle, MapPin, Award, ArrowUpRight } from 'lucide-react';

export const DesignerCard = ({ designer, onSelect, onCommission }) => {
  return (
    <div className="group relative bg-couture-900/70 rounded-2xl overflow-hidden border border-couture-800/80 hover:border-gold-500/50 transition-all duration-300 flex flex-col justify-between shadow-card-dark hover:shadow-glow-gold hover:-translate-y-1">
      
      {/* Banner / Cover */}
      <div className="relative h-28 w-full overflow-hidden bg-couture-950">
        <img
          src={designer.bannerUrl || "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80"}
          alt={designer.brandName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-couture-950 via-couture-950/40 to-transparent" />
        
        {/* Verification Status */}
        <div className="absolute top-3 right-3">
          {designer.verified ? (
            <span className="flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
              <CheckCircle className="w-3 h-3" />
              <span>Verified Atelier</span>
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md">
              Pending Verification
            </span>
          )}
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-5 pb-5 pt-0 relative flex-1 flex flex-col justify-between">
        
        <div>
          {/* Avatar and Pricing Tier */}
          <div className="flex items-end justify-between -mt-9 mb-3">
            <img
              src={designer.avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"}
              alt={designer.brandName}
              className="w-16 h-16 rounded-full object-cover ring-2 ring-gold-500/70 shadow-lg bg-couture-950"
            />
            <div className="text-right">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-couture-800 text-gold-300 border border-couture-700">
                {designer.pricingTier || "$$$"}
              </span>
            </div>
          </div>

          {/* Brand Name & Location */}
          <h3 
            onClick={() => onSelect && onSelect(designer)}
            className="font-serif text-lg font-bold text-white group-hover:text-gold-300 transition-colors cursor-pointer flex items-center space-x-1.5"
          >
            <span>{designer.brandName}</span>
          </h3>

          <div className="flex items-center space-x-3 text-xs text-couture-400 mt-1 mb-2">
            <span className="flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-couture-500" />
              <span>{designer.location || "Global Atelier"}</span>
            </span>
            <span className="text-couture-600">•</span>
            <span>{designer.experienceYears || 5} yrs exp.</span>
          </div>

          {/* Bio */}
          <p className="text-xs text-couture-300 line-clamp-2 leading-relaxed mb-3">
            {designer.bio}
          </p>

          {/* Specialties Badges */}
          {designer.specialties && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {designer.specialties.split(',').slice(0, 3).map((spec, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-couture-800/80 text-couture-300 border border-couture-700/60"
                >
                  {spec.trim()}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Stats & Actions */}
        <div className="pt-3 border-t border-couture-800/80 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 text-gold-400 text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
              <span>{designer.ratingAverage?.toFixed(1) || '5.0'}</span>
              <span className="text-couture-500 font-normal">({designer.reviewCount || 0})</span>
            </div>
            <span className="text-couture-500 text-xs">•</span>
            <span className="text-xs text-couture-400">
              {designer.completedOrdersCount || 0} commissions
            </span>
          </div>

          <button
            onClick={() => onSelect && onSelect(designer)}
            className="flex items-center space-x-1 text-xs font-semibold text-gold-300 hover:text-gold-200 transition-colors p-1"
          >
            <span>Portfolio</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
