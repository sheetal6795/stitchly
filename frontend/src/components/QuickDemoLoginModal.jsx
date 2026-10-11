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
      toast.success(`Signed in as demo ${roleName}!`);
      onLoggedIn && onLoggedIn(targetView);
      onClose();
    } catch (err) {
      toast.error(err.message || 'Quick login failed');
    } finally {
      setLoggingInRole(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-couture-900 border border-couture-800 rounded-2xl shadow-card-dark overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-couture-800 flex items-center justify-between bg-couture-950/60">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-gold-400" />
            <h3 className="font-serif text-lg font-bold text-white">
              Instant Demo Personas
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-couture-400 hover:text-white hover:bg-couture-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Persona Options */}
        <div className="p-6 space-y-4">
          <p className="text-xs text-couture-300 leading-relaxed">
            Select any pre-configured role to immediately explore the bespoke customer, designer atelier, or administrator experiences without typing credentials.
          </p>

          {/* Persona 1: Customer */}
          <button
            onClick={() => handleQuickLogin('customer@stitchly.com', 'Customer', 'customer-dashboard')}
            disabled={loggingInRole !== null}
            className="w-full text-left p-4 rounded-xl bg-couture-950 border border-couture-800 hover:border-gold-500/60 hover:bg-couture-900/80 transition-all group flex items-center justify-between"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 group-hover:scale-105 transition-transform">
                <User className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-bold text-white group-hover:text-gold-300 transition-colors">
                    Sophia Vance
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-300 font-semibold uppercase">
                    Customer
                  </span>
                </div>
                <p className="text-xs text-couture-400 mt-0.5">
                  Posts custom requests, compares quotes & accepts orders
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-couture-500 group-hover:text-gold-400 group-hover:translate-x-1 transition-all" />
          </button>

          {/* Persona 2: Designer */}
          <button
            onClick={() => handleQuickLogin('designer@stitchly.com', 'Designer', 'designer-dashboard')}
            disabled={loggingInRole !== null}
            className="w-full text-left p-4 rounded-xl bg-couture-950 border border-couture-800 hover:border-gold-500/60 hover:bg-couture-900/80 transition-all group flex items-center justify-between"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-full bg-champagne-500/10 border border-champagne-500/30 flex items-center justify-center text-champagne-300 group-hover:scale-105 transition-transform">
                <Scissors className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-bold text-white group-hover:text-gold-300 transition-colors">
                    Julian Laurent (Maison Laurent)
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-champagne-500/20 text-champagne-300 font-semibold uppercase">
                    Designer
                  </span>
                </div>
                <p className="text-xs text-couture-400 mt-0.5">
                  Bids on customer requests, manages portfolio & production
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-couture-500 group-hover:text-gold-400 group-hover:translate-x-1 transition-all" />
          </button>

          {/* Persona 3: Admin */}
          <button
            onClick={() => handleQuickLogin('admin@stitchly.com', 'Admin', 'admin-dashboard')}
            disabled={loggingInRole !== null}
            className="w-full text-left p-4 rounded-xl bg-couture-950 border border-couture-800 hover:border-purple-500/60 hover:bg-couture-900/80 transition-all group flex items-center justify-between"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                    Stitchly Platform Admin
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-semibold uppercase">
                    Admin
                  </span>
                </div>
                <p className="text-xs text-couture-400 mt-0.5">
                  Platform oversight, verifies ateliers & moderates designs
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-couture-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
          </button>

        </div>

      </div>
    </div>
  );
};
