import React, { useState } from 'react';
import { Scissors, User, Sparkles, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const AuthPage = ({ initialMode = 'login', setCurrentView, onOpenDemoLogin }) => {
  const { login, register } = useAuth();
  const toast = useToast();

  const [mode, setMode] = useState(initialMode); // 'login' or 'register'
  const [selectedRole, setSelectedRole] = useState('ROLE_CUSTOMER'); // 'ROLE_CUSTOMER' or 'ROLE_DESIGNER'
  const [loading, setLoading] = useState(false);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // Designer fields
  const [brandName, setBrandName] = useState('');
  const [bio, setBio] = useState('');
  const [specialties, setSpecialties] = useState('');
  const [experienceYears, setExperienceYears] = useState(5);
  const [location, setLocation] = useState('');
  const [instagramHandle, setInstagramHandle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'login') {
        const user = await login(email.trim(), password);
        toast.success(`Welcome back, ${user.name}! 💕`);
        
        if (user.role === 'ROLE_ADMIN') {
          setCurrentView('admin-dashboard');
        } else if (user.role === 'ROLE_DESIGNER') {
          setCurrentView('designer-dashboard');
        } else {
          setCurrentView('customer-dashboard');
        }
      } else {
        // Register
        const registerPayload = {
          name: name.trim(),
          email: email.trim(),
          password,
          phone: phone.trim() || undefined,
          role: selectedRole,
          brandName: selectedRole === 'ROLE_DESIGNER' ? (brandName.trim() || `${name} Atelier`) : undefined,
          bio: selectedRole === 'ROLE_DESIGNER' ? bio.trim() : undefined,
          specialties: selectedRole === 'ROLE_DESIGNER' ? specialties.trim() : undefined,
          experienceYears: selectedRole === 'ROLE_DESIGNER' ? parseInt(experienceYears) || 1 : undefined,
          location: selectedRole === 'ROLE_DESIGNER' ? location.trim() : undefined,
          instagramHandle: selectedRole === 'ROLE_DESIGNER' ? instagramHandle.trim() : undefined,
        };

        const user = await register(registerPayload);
        toast.success(`Account created successfully! Welcome to Stitchly. ✨`);

        if (user.role === 'ROLE_DESIGNER') {
          setCurrentView('designer-dashboard');
        } else {
          setCurrentView('customer-dashboard');
        }
      }
    } catch (err) {
      toast.error(err.message || 'Authentication error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[85vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-couture-950">
      <div className="w-full max-w-md space-y-6">
        
        {/* Card */}
        <div className="bg-couture-900 border border-couture-800 rounded-3xl p-8 shadow-card-dark">
          
          {/* Header Brand */}
          <div className="text-center space-y-2 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-300 p-[1px] mx-auto flex items-center justify-center shadow-sm">
              <Scissors className="w-6 h-6 text-pink-600 transform -rotate-45" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-couture-200">
              {mode === 'login' ? 'Welcome Back' : 'Create an Account'}
            </h2>
            <p className="text-xs text-couture-400">
              {mode === 'login'
                ? 'Sign in to access your saved designs & custom orders'
                : 'Join India’s custom fashion marketplace'}
            </p>
          </div>

          {/* Quick Demo Credentials shortcut */}
          <div className="mb-6 p-3.5 rounded-2xl bg-couture-950 border border-pink-200 flex items-center justify-between">
            <div className="text-xs">
              <span className="text-pink-600 font-bold block">Need a quick demo login?</span>
              <span className="text-couture-400 text-[11px]">Instant customer or designer sign-in</span>
            </div>
            <button
              type="button"
              onClick={onOpenDemoLogin}
              className="text-xs px-3 py-1.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-500 text-white font-bold uppercase tracking-wider shadow-sm hover:from-pink-500 hover:to-rose-400 transition-all"
            >
              Demo Logins
            </button>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 p-1 rounded-xl bg-couture-950 border border-couture-800 mb-6 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`py-2 rounded-lg transition-all ${
                mode === 'login'
                  ? 'bg-pink-500 text-white shadow-sm font-bold'
                  : 'text-couture-400 hover:text-couture-200'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode('register')}
              className={`py-2 rounded-lg transition-all ${
                mode === 'register'
                  ? 'bg-pink-500 text-white shadow-sm font-bold'
                  : 'text-couture-400 hover:text-couture-200'
              }`}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* If Register: Role selector */}
            {mode === 'register' && (
              <div className="space-y-2 mb-4">
                <label className="block text-[11px] font-bold text-couture-400 uppercase tracking-wider">
                  I Want To Join As:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('ROLE_CUSTOMER')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedRole === 'ROLE_CUSTOMER'
                        ? 'bg-pink-500/10 border-pink-300 text-pink-600'
                        : 'bg-couture-950 border-couture-800 text-couture-400 hover:text-couture-200'
                    }`}
                  >
                    <User className="w-4 h-4 mb-1 text-pink-500" />
                    <p className="text-xs font-bold">Shopper / Client</p>
                    <span className="text-[10px] text-couture-400 block">Get custom outfits stitched</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole('ROLE_DESIGNER')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedRole === 'ROLE_DESIGNER'
                        ? 'bg-pink-500/10 border-pink-300 text-pink-600'
                        : 'bg-couture-950 border-couture-800 text-couture-400 hover:text-couture-200'
                    }`}
                  >
                    <Scissors className="w-4 h-4 mb-1 text-pink-500" />
                    <p className="text-xs font-bold">Tailor / Designer</p>
                    <span className="text-[10px] text-couture-400 block">Receive client order requests</span>
                  </button>
                </div>
              </div>
            )}

            {/* Name (if register) */}
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-couture-200 uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ananya Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-couture-950 border border-couture-800 text-couture-200 placeholder-couture-400 focus:outline-none focus:border-pink-500 text-sm"
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-couture-200 uppercase tracking-wider mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-couture-950 border border-couture-800 text-couture-200 placeholder-couture-400 focus:outline-none focus:border-pink-500 text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-couture-200 uppercase tracking-wider mb-1.5">
                Password *
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-couture-950 border border-couture-800 text-couture-200 placeholder-couture-400 focus:outline-none focus:border-pink-500 text-sm"
              />
            </div>

            {/* Extra Designer Registration Fields */}
            {mode === 'register' && selectedRole === 'ROLE_DESIGNER' && (
              <div className="pt-3 space-y-3 border-t border-couture-800">
                <span className="text-[10px] font-bold uppercase tracking-widest text-pink-600 block">
                  Boutique / Atelier Profile
                </span>

                <div>
                  <label className="block text-[11px] text-couture-400 mb-1">Brand or Boutique Name</label>
                  <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="e.g. Ananya Haute Boutique"
                    className="w-full px-3 py-2 rounded-xl bg-couture-950 border border-couture-800 text-couture-200 text-xs focus:outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-couture-400 mb-1">Specialties & Crafts</label>
                  <input
                    type="text"
                    value={specialties}
                    onChange={(e) => setSpecialties(e.target.value)}
                    placeholder="e.g. Bridal Lehengas, Zardozi Embroidery, Saree Blouses"
                    className="w-full px-3 py-2 rounded-xl bg-couture-950 border border-couture-800 text-couture-200 text-xs focus:outline-none focus:border-pink-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] text-couture-400 mb-1">City / Location</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Mumbai / Delhi"
                      className="w-full px-3 py-2 rounded-xl bg-couture-950 border border-couture-800 text-couture-200 text-xs focus:outline-none focus:border-pink-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-couture-400 mb-1">Years Experience</label>
                    <input
                      type="number"
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-couture-950 border border-couture-800 text-couture-200 text-xs focus:outline-none focus:border-pink-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-couture-400 mb-1">Short Bio</label>
                  <textarea
                    rows="2"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell clients about your stitching expertise and custom design style..."
                    className="w-full p-2.5 rounded-xl bg-couture-950 border border-couture-800 text-couture-200 text-xs focus:outline-none focus:border-pink-500"
                  />
                </div>
              </div>
            )}

            {/* Submit CTA */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-600 via-rose-500 to-pink-500 hover:from-pink-500 hover:to-rose-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-pink-500/20 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <span>{loading ? 'Authenticating...' : mode === 'login' ? 'Sign In to Stitchly' : 'Complete Registration'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
};