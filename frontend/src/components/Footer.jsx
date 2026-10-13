import React from 'react';
import { Scissors, Sparkles, Heart, Shield } from 'lucide-react';

export const Footer = ({ setCurrentView }) => {
  return (
    <footer className="w-full bg-couture-950 border-t border-couture-800 pt-16 pb-12 text-couture-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/30 flex items-center justify-center">
                <Scissors className="w-4 h-4 text-pink-500 transform -rotate-45" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-wider text-couture-200">
                STITCHLY
              </span>
            </div>
            <p className="text-sm leading-relaxed text-couture-400">
              An AI-powered custom fashion marketplace connecting you with verified local tailors, boutiques, and designers across India.
            </p>
            <div className="flex items-center space-x-3 text-xs text-pink-600 font-medium pt-1">
              <Shield className="w-4 h-4 text-emerald-500" />
              <span>Verified Tailors & Secure Payments</span>
            </div>
          </div>

          {/* Marketplace */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider text-couture-200 uppercase mb-4">
              Marketplace
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => setCurrentView('explore')} className="hover:text-pink-600 transition-colors">
                  Explore Custom Outfits
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('designers')} className="hover:text-pink-600 transition-colors">
                  Find Tailors & Designers
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('post-requirement')} className="hover:text-pink-600 transition-colors">
                  Post Outfit Requirement
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('explore')} className="hover:text-pink-600 transition-colors">
                  Bridal Lehengas & Gowns
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('explore')} className="hover:text-pink-600 transition-colors">
                  Sherwanis & Suits
                </button>
              </li>
            </ul>
          </div>

          {/* AI Fashion Studio */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider text-couture-200 uppercase mb-4">
              AI Fashion Studio
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => setCurrentView('ai-studio')} className="hover:text-pink-600 transition-colors flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                  <span>AI Style Assistant</span>
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('ai-studio')} className="hover:text-pink-600 transition-colors">
                  Fabric & Textile Advisor
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('ai-studio')} className="hover:text-pink-600 transition-colors">
                  Instant INR Price Estimator
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('ai-studio')} className="hover:text-pink-600 transition-colors">
                  Matching Color Palettes
                </button>
              </li>
            </ul>
          </div>

          {/* For Designers & Tailors */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider text-couture-200 uppercase mb-4">
              For Designers & Tailors
            </h4>
            <p className="text-sm text-couture-400 leading-relaxed mb-4">
              Showcase your custom designs, receive order requests directly from clients, and grow your boutique online.
            </p>
            <button
              onClick={() => setCurrentView('register')}
              className="text-xs uppercase tracking-wider font-semibold px-4 py-2 rounded-lg bg-couture-900 border border-pink-500/30 text-pink-600 hover:bg-pink-500/10 transition-colors"
            >
              Join as a Designer
            </button>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="pt-8 border-t border-couture-800 flex flex-col sm:flex-row items-center justify-between text-xs text-couture-400 space-y-4 sm:space-y-0">
          <p>© 2026 Stitchly India. All custom designs copyrighted to respective creators.</p>
          <div className="flex items-center space-x-6">
            <span>Fair Price Transparency</span>
            <span>Perfect Fit Guarantee</span>
            <span className="flex items-center space-x-1">
              <span>Made with</span>
              <Heart className="w-3 h-3 text-pink-500 fill-pink-500" />
              <span>for Custom Fashion</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};