import React from 'react';
import { Heart, Sparkles, Clock, CheckCircle } from 'lucide-react';

export const DesignCard = ({ design, onLike, onSelect, onDesignerClick }) => {
  return (
    <div className="group relative bg-couture-900/60 rounded-2xl overflow-hidden border border-couture-800/80 hover:border-gold-500/50 transition-all duration-500 flex flex-col hover:-translate-y-1.5 shadow-card-dark hover:shadow-glow-gold">
      
      {/* Image container */}
      <div 
        className="relative aspect-[3/4] w-full overflow-hidden cursor-pointer bg-couture-950"
        onClick={() => onSelect && onSelect(design)}
      >
        <img
          src={design.imageUrl}
          alt={design.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Subtle dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-couture-950 via-transparent to-black/30 opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Category Pill */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-couture-950/80 backdrop-blur-md text-gold-300 border border-gold-500/20">
            {design.category}
          </span>
        </div>

        {/* Like Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onLike && onLike(design.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
            design.likedByCurrentUser
              ? 'bg-red-500/20 text-red-400 border border-red-500/40'
              : 'bg-couture-950/70 text-couture-300 hover:text-red-400 hover:bg-couture-950 border border-white/10'
          }`}
          title={design.likedByCurrentUser ? "Saved" : "Save Design"}
        >
          <Heart className={`w-4 h-4 ${design.likedByCurrentUser ? 'fill-red-400' : ''}`} />
        </button>

        {/* Featured Ribbon */}
        {design.featured && (
          <div className="absolute bottom-3 left-3 flex items-center space-x-1 px-2 py-0.5 rounded bg-gold-500/90 text-couture-950 text-[10px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            <span>Curated Choice</span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Designer attribution */}
          {design.designerBrandName && (
            <div 
              onClick={() => onDesignerClick && onDesignerClick(design.designerId)}
              className="flex items-center space-x-2 mb-1.5 cursor-pointer hover:opacity-80 transition-opacity"
            >
              {design.designerAvatarUrl && (
                <img
                  src={design.designerAvatarUrl}
                  alt={design.designerBrandName}
                  className="w-5 h-5 rounded-full object-cover ring-1 ring-gold-500/40"
                />
              )}
              <span className="text-xs text-couture-400 hover:text-gold-300 transition-colors flex items-center space-x-1 truncate">
                <span>{design.designerBrandName}</span>
                {design.designerVerified && (
                  <CheckCircle className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                )}
              </span>
            </div>
          )}

          {/* Title */}
          <h3 
            onClick={() => onSelect && onSelect(design)}
            className="font-serif text-base font-semibold text-white group-hover:text-gold-300 transition-colors line-clamp-1 cursor-pointer"
          >
            {design.title}
          </h3>

          <p className="text-xs text-couture-400 line-clamp-2 mt-1 leading-relaxed">
            {design.description}
          </p>
        </div>

        {/* Price & Turnaround */}
        <div className="pt-3 mt-3 border-t border-couture-800/60 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-couture-500 block">Est. Commission</span>
            <span className="font-serif text-lg font-bold text-champagne-300">
              ${design.price?.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center space-x-3 text-xs text-couture-400">
            {design.estimatedDays && (
              <span className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-gold-400/80" />
                <span>{design.estimatedDays}d</span>
              </span>
            )}
            <span className="flex items-center space-x-1">
              <Heart className="w-3.5 h-3.5 text-couture-500" />
              <span>{design.likesCount || 0}</span>
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
