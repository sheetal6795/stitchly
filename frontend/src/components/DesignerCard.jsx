import React from 'react';
import { Star, CheckCircle, MapPin, Award, ArrowUpRight } from 'lucide-react';

export const DesignerCard = ({ designer, onSelect, onCommission }) => {
  return (
    <div className="group relative bg-couture-900 rounded-2xl overflow-hidden border border-couture-800 hover:border-pink-300 transition-all duration-300 flex flex-col justify-between shadow-card-dark hover:shadow-lg hover:shadow-pink-500/10 hover:-translate-y-1">
      
      {/* Banner / Cover */}
      <div className="relative h-28 w-full overflow-hidden bg-couture-950">
        <img
          src={designer.bannerUrl || "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80"}
          alt={designer.brandName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-couture-900 via-couture-900/30 to-transparent" />
        
        {/* Verification Status */}
        <div className="absolute top-3 right-3">
          {designer.verified ? (
            <span className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-sm backdrop-blur-md">
              <CheckCircle className="w-3 h-3" />
              <span>Verified Designer</span>
            </span>
          ) : (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-amber-50 text-amber-600 border border-amber-200 shadow-sm backdrop-blur-md">
              Pending Verification
            </span>
          )}
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-5 pb-5 pt-0 relative flex-1 flex flex-col justify-between">
        
        <div>
          {/* Avatar and Pricing Tier in INR */}
          <div className="flex items-end justify-between -mt-9 mb-3">
            <img
              src={designer.avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"}
              alt={designer.brandName}
              className="w-16 h-16 rounded-full object-cover ring-2 ring-pink-400 shadow-md bg-couture-900"
            />
            <div className="text-right">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-pink-50 text-pink-600 border border-pink-200">
                {designer.pricingTier ? designer.pricingTier.replace(/\$/g, '₹') : "₹₹"}
              </span>
            </div>
          </div>

          {/* Brand Name & Location */}
          <h3 
            onClick={() => onSelect && onSelect(designer)}
            className="font-serif text-lg font-bold text-couture-200 group-hover:text-pink-600 transition-colors cursor-pointer flex items-center space-x-1.5"
          >
            <span>{designer.brandName}</span>
          </h3>

          <div className="flex items-center space-x-3 text-xs text-couture-400 mt-1 mb-2">
            <span className="flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-pink-500" />
              <span>{designer.location || "India"}</span>
            </span>
            <span className="text-couture-300">•</span>
            <span>{designer.experienceYears || 5} yrs exp.</span>
          </div>

          {/* Bio */}
          <p className="text-xs text-couture-400 line-clamp-2 leading-relaxed mb-3">
            {designer.bio}
          </p>

          {/* Specialties Badges */}
          {designer.specialties && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {designer.specialties.split(',').slice(0, 3).map((spec, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-couture-850 text-couture-400 border border-couture-800"
                >
                  {spec.trim()}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Stats & Actions */}
        <div className="pt-3 border-t border-couture-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 text-pink-600 text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
              <span>{designer.ratingAverage?.toFixed(1) || '5.0'}</span>
              <span className="text-couture-400 font-normal">({designer.reviewCount || 0})</span>
            </div>
            <span className="text-couture-300 text-xs">•</span>
            <span className="text-xs text-couture-400">
              {designer.completedOrdersCount || 0} orders
            </span>
          </div>

          <button
            onClick={() => onSelect && onSelect(designer)}
            className="flex items-center space-x-1 text-xs font-semibold text-pink-600 hover:text-rose-500 transition-colors p-1"
          >
            <span>Portfolio</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};