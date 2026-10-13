import React, { useState } from 'react';
import { X, User, Scissors, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const QuickDemoLoginModal = ({ isOpen, onClose, onLoggedIn }) => {
  const { login } = useAuth();
  const toast = useToast();
  const [loggingInRole, setLoggingInRole] = useState(null);

  if (!isOpen) return null;

  const handleQuickLogin = async (email, roleName, targetView) => {
    setLoggingInRole(roleName);
    try {
      await login(email, 'password123');
      toast.success(`Signed in as ${roleName}! 💕`);
      onLoggedIn && onLoggedIn(targetView);
      onClose();
    } catch (err) {
      toast.error(err.message || 'Quick login failed. Make sure Spring Boot backend is active on port 8080.');
    } finally {
      setLoggingInRole(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-couture-200/40 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-couture-900 border border-couture-800 rounded-3xl shadow-2xl overflow-hidden animate-fade-in">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-couture-800 flex items-center justify-between bg-couture-950/80">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-pink-500" />
            <h3 className="font-serif text-lg font-bold text-couture-200">
              Instant Demo Personas
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-couture-400 hover:text-couture-200 hover:bg-couture-850 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Persona Options */}
        <div className="p-6 space-y-4">
          <p className="text-xs text-couture-400 leading-relaxed">
            Select any pre-configured role to immediately explore the shopper, tailor/boutique, or admin views without typing credentials.
          </p>

          {/* Persona 1: Customer */}
          <button
            onClick={() => handleQuickLogin('customer@stitchly.com', 'Ananya Sharma (Customer)', 'customer-dashboard')}
            disabled={loggingInRole !== null}
            className="w-full text-left p-4 rounded-2xl bg-couture-950 border border-couture-800 hover:border-pink-300 hover:bg-couture-900 transition-all group flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-300 flex items-center justify-center text-pink-600 group-hover:scale-105 transition-transform">
                <User className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-bold text-couture-200 group-hover:text-pink-600 transition-colors">
                    Ananya Sharma
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-50 text-pink-600 font-semibold uppercase border border-pink-200">
                    Shopper
                  </span>
                </div>
                <p className="text-xs text-couture-400 mt-0.5">
                  Posts custom outfit briefs, compares tailor quotes & tracks stitching
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-couture-400 group-hover:text-pink-600 group-hover:translate-x-1 transition-all" />
          </button>

          {/* Persona 2: Designer */}
          <button
            onClick={() => handleQuickLogin('designer@stitchly.com', 'Priya (Priya Couture)', 'designer-dashboard')}
            disabled={loggingInRole !== null}
            className="w-full text-left p-4 rounded-2xl bg-couture-950 border border-couture-800 hover:border-pink-300 hover:bg-couture-900 transition-all group flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-300 flex items-center justify-center text-purple-600 group-hover:scale-105 transition-transform">
                <Scissors className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-bold text-couture-200 group-hover:text-pink-600 transition-colors">
                    Priya Haute Boutique
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-50 text-purple-600 font-semibold uppercase border border-purple-200">
                    Tailor / Designer
                  </span>
                </div>
                <p className="text-xs text-couture-400 mt-0.5">
                  Bids on customer requests, manages design catalog & orders
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-couture-400 group-hover:text-pink-600 group-hover:translate-x-1 transition-all" />
          </button>

          {/* Persona 3: Admin */}
          <button
            onClick={() => handleQuickLogin('admin@stitchly.com', 'Stitchly Admin', 'admin-dashboard')}
            disabled={loggingInRole !== null}
            className="w-full text-left p-4 rounded-2xl bg-couture-950 border border-couture-800 hover:border-emerald-300 hover:bg-couture-900 transition-all group flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-300 flex items-center justify-center text-emerald-600 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-bold text-couture-200 group-hover:text-emerald-600 transition-colors">
                    Stitchly Platform Admin
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-semibold uppercase border border-emerald-200">
                    Admin
                  </span>
                </div>
                <p className="text-xs text-couture-400 mt-0.5">
                  Platform oversight, verifies local tailors & moderates content
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-couture-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
          </button>

        </div>

      </div>
    </div>
  );
};