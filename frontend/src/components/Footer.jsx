import React from 'react';
import { Scissors, Sparkles, Heart, Shield, Award, Compass } from 'lucide-react';

export const Footer = ({ setCurrentView }) => {
  return (
    <footer className="w-full bg-couture-950 border-t border-couture-800/80 pt-16 pb-12 text-couture-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-gold-500/20 border border-gold-500/40 flex items-center justify-center">
                <Scissors className="w-4 h-4 text-gold-400 transform -rotate-45" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-wider text-white">
                STITCHLY
              </span>
            </div>
            <p className="text-sm leading-relaxed text-couture-300">
              An AI-assisted bespoke marketplace connecting discerning clients with independent couture fashion designers and master tailors worldwide.
            </p>
            <div className="flex items-center space-x-3 text-xs text-gold-400/90 pt-1">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Verified Artisans & Escrow Protection</span>
            </div>
          </div>

          {/* Bespoke Marketplace */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider text-white uppercase mb-4">
              Marketplace
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => setCurrentView('explore')} className="hover:text-gold-400 transition-colors">
                  Explore Curated Designs
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('designers')} className="hover:text-gold-400 transition-colors">
                  Browse Independent Ateliers
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('post-requirement')} className="hover:text-gold-400 transition-colors">
                  Post Custom Clothing Brief
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('explore')} className="hover:text-gold-400 transition-colors">
                  Bridal & Red Carpet Gowns
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('explore')} className="hover:text-gold-400 transition-colors">
                  Savile Row Tailored Suits
                </button>
              </li>
            </ul>
          </div>

          {/* AI Fashion Studio */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider text-white uppercase mb-4">
              AI Fashion Studio
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => setCurrentView('ai-studio')} className="hover:text-gold-400 transition-colors flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                  <span>Interactive Style Assistant</span>
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('ai-studio')} className="hover:text-gold-400 transition-colors">
                  Textile & Fabric Advisor
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('ai-studio')} className="hover:text-gold-400 transition-colors">
                  Artisanal Price Estimator
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('ai-studio')} className="hover:text-gold-400 transition-colors">
                  Color Harmony Palette
                </button>
              </li>
            </ul>
          </div>

          {/* For Designers & Trust */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider text-white uppercase mb-4">
              For Designers
            </h4>
            <p className="text-sm text-couture-300 leading-relaxed mb-4">
              Showcase your bespoke portfolio, receive custom commission requests directly from high-intent patrons, and manage your fittings smoothly.
            </p>
            <button
              onClick={() => setCurrentView('register')}
              className="text-xs uppercase tracking-wider font-semibold px-4 py-2 rounded-lg bg-couture-900 border border-gold-500/40 text-gold-300 hover:bg-gold-500/10 transition-colors"
            >
              Apply as Bespoke Designer
            </button>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="pt-8 border-t border-couture-900 flex flex-col sm:flex-row items-center justify-between text-xs text-couture-500 space-y-4 sm:space-y-0">
          <p>© 2026 Stitchly Haute Couture Inc. All bespoke designs copyrighted to respective creators.</p>
          <div className="flex items-center space-x-6">
            <span>Non-binding AI price estimates</span>
            <span>Bespoke Quality Standard</span>
            <span className="flex items-center space-x-1">
              <span>Made with</span>
              <Heart className="w-3 h-3 text-gold-400 fill-gold-400" />
              <span>for Haute Couture</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
