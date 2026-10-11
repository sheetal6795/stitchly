import React, { useState } from 'react';
import { Scissors, User, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
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
        toast.success(`Welcome back, ${user.name}!`);
        
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
        toast.success(`Account created successfully! Welcome to Stitchly.`);

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
    <div className="w-full min-h-[85vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">
        
        {/* Card */}
        <div className="bg-couture-900/90 border border-couture-800 rounded-3xl p-8 shadow-card-dark backdrop-blur-xl">
          
          {/* Header Brand */}
          <div className="text-center space-y-2 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-gold-600 via-gold-400 to-amber-200 p-[1px] mx-auto shadow-glow-gold">
              <div className="w-full h-full bg-couture-950 rounded-[15px] flex items-center justify-center">
                <Scissors className="w-6 h-6 text-gold-400 transform -rotate-45" />
              </div>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              {mode === 'login' ? 'Welcome Back' : 'Create an Account'}
            </h2>
            <p className="text-xs text-couture-400">
              {mode === 'login'
                ? 'Sign in to access your bespoke wardrobe & commissions'
                : 'Join our haute custom fashion marketplace'}
            </p>
          </div>

          {/* Quick Demo Credentials shortcut */}
          <div className="mb-6 p-3 rounded-xl bg-couture-950/80 border border-gold-500/30 flex items-center justify-between">
            <div className="text-xs">
              <span className="text-gold-300 font-semibold block">Need a quick demo login?</span>
              <span className="text-couture-500 text-[11px]">Instant customer, designer, or admin sign-in</span>
            </div>
            <button
              type="button"
              onClick={onOpenDemoLogin}
              className="text-xs px-2.5 py-1.5 rounded-lg bg-gold-500 text-couture-950 font-bold uppercase"
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
                  ? 'bg-couture-800 text-white shadow-sm'
                  : 'text-couture-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode('register')}
              className={`py-2 rounded-lg transition-all ${
                mode === 'register'
                  ? 'bg-couture-800 text-white shadow-sm'
                  : 'text-couture-400 hover:text-white'
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
                <label className="block text-[11px] font-semibold text-couture-400 uppercase tracking-wider">
                  I Want To Join As:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('ROLE_CUSTOMER')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedRole === 'ROLE_CUSTOMER'
                        ? 'bg-gold-500/10 border-gold-500/60 text-white'
                        : 'bg-couture-950 border-couture-800 text-couture-400 hover:text-white'
                    }`}
                  >
                    <User className="w-4 h-4 mb-1 text-gold-400" />
                    <p className="text-xs font-bold">Client / Patron</p>
                    <span className="text-[10px] text-couture-500 block">Commission custom pieces</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole('ROLE_DESIGNER')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedRole === 'ROLE_DESIGNER'
                        ? 'bg-gold-500/10 border-gold-500/60 text-white'
                        : 'bg-couture-950 border-couture-800 text-couture-400 hover:text-white'
                    }`}
                  >
                    <Scissors className="w-4 h-4 mb-1 text-gold-400" />
                    <p className="text-xs font-bold">Bespoke Designer</p>
                    <span className="text-[10px] text-couture-500 block">Receive custom client bids</span>
                  </button>
                </div>
              </div>
            )}

            {/* Name (if register) */}
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-couture-300 uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sophia Vance"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-couture-950 border border-couture-700 text-white placeholder-couture-600 focus:outline-none focus:border-gold-500 text-sm"
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-couture-300 uppercase tracking-wider mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-couture-950 border border-couture-700 text-white placeholder-couture-600 focus:outline-none focus:border-gold-500 text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-couture-300 uppercase tracking-wider mb-1.5">
                Password *
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-couture-950 border border-couture-700 text-white placeholder-couture-600 focus:outline-none focus:border-gold-500 text-sm"
              />
            </div>

            {/* Extra Designer Registration Fields */}
            {mode === 'register' && selectedRole === 'ROLE_DESIGNER' && (
              <div className="pt-2 space-y-3 border-t border-couture-800">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold-400 block">
                  Atelier Credentials
                </span>

                <div>
                  <label className="block text-[11px] text-couture-400 mb-1">Brand / Atelier Name</label>
                  <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="e.g. Atelier Maison Laurent"
                    className="w-full px-3 py-2 rounded-xl bg-couture-950 border border-couture-700 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-couture-400 mb-1">Specialties & Crafts</label>
                  <input
                    type="text"
                    value={specialties}
                    onChange={(e) => setSpecialties(e.target.value)}
                    placeholder="e.g. Evening Wear, Haute Silk Draping, Corsetry"
                    className="w-full px-3 py-2 rounded-xl bg-couture-950 border border-couture-700 text-white text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] text-couture-400 mb-1">Location</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Paris / New York"
                      className="w-full px-3 py-2 rounded-xl bg-couture-950 border border-couture-700 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-couture-400 mb-1">Years Experience</label>
                    <input
                      type="number"
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-couture-950 border border-couture-700 text-white text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-couture-400 mb-1">Design Philosophy / Bio</label>
                  <textarea
                    rows="2"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Short summary of your artisanal training and design ethos..."
                    className="w-full p-2.5 rounded-xl bg-couture-950 border border-couture-700 text-white text-xs"
                  />
                </div>
              </div>
            )}

            {/* Submit CTA */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold-600 via-gold-500 to-amber-400 hover:from-gold-500 hover:to-amber-300 text-couture-950 font-bold text-sm uppercase tracking-wider shadow-glow-gold transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
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
