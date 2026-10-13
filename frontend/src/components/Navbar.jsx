import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Sparkles, 
  Scissors, 
  User as UserIcon, 
  LogOut, 
  PlusCircle, 
  Compass, 
  Users, 
  ShieldCheck, 
  ShoppingBag,
  Menu,
  X,
  Layers
} from 'lucide-react';

export const Navbar = ({ currentView, setCurrentView, onOpenDemoLogin }) => {
  const { user, isAuthenticated, isCustomer, isDesigner, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (view) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-couture-950/90 backdrop-blur-xl border-b border-couture-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div 
            onClick={() => handleNav('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-600 via-rose-400 to-purple-400 p-[1px] shadow-lg shadow-pink-500/20 transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-couture-950 rounded-[11px] flex items-center justify-center">
                <Scissors className="w-5 h-5 text-pink-400 transform -rotate-45" />
              </div>
            </div>
            <div>
              <span className="font-serif text-2xl tracking-wider font-semibold bg-gradient-to-r from-pink-400 via-rose-300 to-purple-300 bg-clip-text text-transparent">
                STITCHLY
              </span>
              <span className="block text-[10px] tracking-widest text-pink-300/80 uppercase font-sans -mt-1 font-medium">
                Custom Fashion Made Easy
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <button
              onClick={() => handleNav('home')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentView === 'home' ? 'text-pink-400 bg-couture-900' : 'text-couture-300 hover:text-white hover:bg-couture-900/60'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNav('explore')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentView === 'explore' ? 'text-pink-400 bg-couture-900' : 'text-couture-300 hover:text-white hover:bg-couture-900/60'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Explore Designs</span>
            </button>
            <button
              onClick={() => handleNav('designers')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentView === 'designers' ? 'text-pink-400 bg-couture-900' : 'text-couture-300 hover:text-white hover:bg-couture-900/60'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Find Tailors & Designers</span>
            </button>
            <button
              onClick={() => handleNav('ai-studio')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                currentView === 'ai-studio' 
                  ? 'text-pink-300 bg-pink-500/20 border border-pink-500/40' 
                  : 'text-pink-200/90 hover:text-pink-300 hover:bg-pink-500/10'
              }`}
            >
              <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
              <span>AI Studio</span>
            </button>
          </nav>

          {/* User & Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Quick Demo Switcher Button */}
            <button
              onClick={onOpenDemoLogin}
              className="text-xs px-2.5 py-1.5 rounded-lg border border-couture-700 bg-couture-900/80 text-couture-300 hover:border-pink-500/50 hover:text-pink-300 transition-colors"
              title="Fast switch between Customer, Designer, and Admin accounts"
            >
              Demo Logins
            </button>

            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                {isCustomer && (
                  <>
                    <button
                      onClick={() => handleNav('post-requirement')}
                      className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-gradient-to-r from-pink-600 via-rose-500 to-pink-500 hover:from-pink-500 hover:to-rose-400 text-white font-semibold text-xs uppercase tracking-wider shadow-lg shadow-pink-500/25 transition-all transform hover:-translate-y-0.5"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>Post Outfit Requirement</span>
                    </button>
                    <button
                      onClick={() => handleNav('customer-dashboard')}
                      className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium ${
                        currentView === 'customer-dashboard' ? 'text-pink-400 bg-couture-900' : 'text-couture-300 hover:text-white'
                      }`}
                    >
                      <ShoppingBag className="w-4 h-4 text-pink-400" />
                      <span>My Wardrobe</span>
                    </button>
                  </>
                )}

                {isDesigner && (
                  <button
                    onClick={() => handleNav('designer-dashboard')}
                    className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-sm font-medium ${
                      currentView === 'designer-dashboard' ? 'text-pink-400 bg-couture-900 border border-pink-500/30' : 'text-couture-300 hover:text-white bg-couture-900/50'
                    }`}
                  >
                    <Layers className="w-4 h-4 text-pink-400" />
                    <span>Designer Workspace</span>
                  </button>
                )}

                {isAdmin && (
                  <button
                    onClick={() => handleNav('admin-dashboard')}
                    className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium ${
                      currentView === 'admin-dashboard' ? 'text-purple-400 bg-couture-900 border border-purple-500/30' : 'text-couture-300 hover:text-white'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 text-purple-400" />
                    <span>Admin Portal</span>
                  </button>
                )}

                {/* Profile Pill & Logout */}
                <div className="flex items-center pl-2 space-x-2 border-l border-couture-800">
                  <div className="flex items-center space-x-2">
                    <img
                      src={user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                      alt={user?.name}
                      className="w-8 h-8 rounded-full object-cover ring-1 ring-pink-500/50"
                    />
                    <div className="text-left hidden lg:block">
                      <p className="text-xs font-semibold text-white leading-tight truncate max-w-[100px]">{user?.name}</p>
                      <p className="text-[10px] text-pink-300/80 leading-tight">
                        {isCustomer ? 'Customer' : isDesigner ? 'Designer' : 'Admin'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    className="p-1.5 text-couture-400 hover:text-rose-400 rounded-lg hover:bg-couture-900 transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleNav('login')}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-couture-200 hover:text-white hover:bg-couture-900 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleNav('register')}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-500 hover:to-rose-400 text-white font-semibold text-xs uppercase tracking-wider shadow-lg shadow-pink-500/20 transition-all"
                >
                  Join Stitchly
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={onOpenDemoLogin}
              className="text-[11px] px-2 py-1 rounded border border-couture-700 bg-couture-900 text-pink-300"
            >
              Demo
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-couture-300 hover:text-white hover:bg-couture-900"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-couture-950/95 border-b border-couture-800 px-4 pt-2 pb-6 space-y-3 backdrop-blur-2xl">
          <button
            onClick={() => handleNav('home')}
            className="block w-full text-left py-2 px-3 rounded-lg text-base text-couture-200 hover:bg-couture-900"
          >
            Home
          </button>
          <button
            onClick={() => handleNav('explore')}
            className="block w-full text-left py-2 px-3 rounded-lg text-base text-couture-200 hover:bg-couture-900"
          >
            Explore Designs
          </button>
          <button
            onClick={() => handleNav('designers')}
            className="block w-full text-left py-2 px-3 rounded-lg text-base text-couture-200 hover:bg-couture-900"
          >
            Tailors & Designers
          </button>
          <button
            onClick={() => handleNav('ai-studio')}
            className="block w-full text-left py-2 px-3 rounded-lg text-base text-pink-300 bg-pink-500/10 border border-pink-500/20"
          >
            ✨ AI Design Studio
          </button>

          {isAuthenticated ? (
            <div className="pt-3 border-t border-couture-800 space-y-2">
              <div className="flex items-center space-x-3 px-3 py-2">
                <img
                  src={user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                  alt={user?.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-white">{user?.name}</p>
                  <p className="text-xs text-pink-300">{user?.role}</p>
                </div>
              </div>

              {isCustomer && (
                <>
                  <button
                    onClick={() => handleNav('post-requirement')}
                    className="block w-full text-center py-2.5 rounded-lg bg-pink-500 text-white font-semibold text-sm"
                  >
                    Post Outfit Requirement
                  </button>
                  <button
                    onClick={() => handleNav('customer-dashboard')}
                    className="block w-full text-left py-2 px-3 rounded-lg text-couture-200 hover:bg-couture-900"
                  >
                    My Wardrobe & Orders
                  </button>
                </>
              )}

              {isDesigner && (
                <button
                  onClick={() => handleNav('designer-dashboard')}
                  className="block w-full text-left py-2 px-3 rounded-lg text-pink-300 bg-couture-900"
                >
                  Designer Workspace
                </button>
              )}

              {isAdmin && (
                <button
                  onClick={() => handleNav('admin-dashboard')}
                  className="block w-full text-left py-2 px-3 rounded-lg text-purple-400 bg-couture-900"
                >
                  Admin Portal
                </button>
              )}

              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-2 px-3 rounded-lg text-rose-400 hover:bg-couture-900"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="pt-3 border-t border-couture-800 flex flex-col space-y-2">
              <button
                onClick={() => handleNav('login')}
                className="w-full py-2.5 rounded-lg text-center text-sm font-medium text-couture-200 border border-couture-700"
              >
                Sign In
              </button>
              <button
                onClick={() => handleNav('register')}
                className="w-full py-2.5 rounded-lg bg-pink-500 text-white font-semibold text-sm text-center"
              >
                Join Stitchly
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};