import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Filter, CheckCircle2, Users } from 'lucide-react';
import { designerApi } from '../services/api';
import { DesignerCard } from '../components/DesignerCard';

export const DesignersDirectoryPage = ({ setCurrentView, setSelectedDesignerId }) => {
  const [designers, setDesigners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  useEffect(() => {
    loadDesigners();
  }, [specialty]);

  const loadDesigners = async () => {
    setLoading(true);
    try {
      const res = await designerApi.getAll({
        specialty: specialty || null,
        search: search.trim() || null,
      });
      setDesigners(res.data || []);
    } catch (err) {
      console.error('Failed to load designers', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadDesigners();
  };

  const handleSelectDesigner = (designer) => {
    setSelectedDesignerId(designer.id);
    setCurrentView('designer-detail');
  };

  const displayedDesigners = verifiedOnly
    ? designers.filter(d => d.verified)
    : designers;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <span className="text-xs font-semibold text-pink-600 uppercase tracking-widest block">
          Local Tailors & Designers Directory
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-couture-200">
          Find Master Tailors & Boutiques
        </h1>
        <p className="text-sm text-couture-400 leading-relaxed">
          Connect with expert local tailors, boutique designers, and embroidery masters across India. Browse portfolios, verified reviews, and ratings.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-couture-900 border border-couture-800 rounded-2xl p-4 sm:p-5 shadow-card-dark mb-10 space-y-4">
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute top-3.5 left-3.5 w-4 h-4 text-pink-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by designer name, city (Mumbai, Delhi, Jaipur, Hyderabad...), or craft..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-couture-950 border border-couture-800 text-couture-200 placeholder-couture-400 focus:outline-none focus:border-pink-500 text-sm"
            />
          </div>

          <div className="flex items-center space-x-3">
            <select
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl bg-couture-950 border border-couture-800 text-couture-200 text-xs focus:outline-none focus:border-pink-500"
            >
              <option value="">All Specialties</option>
              <option value="Bridal">Bridal & Lehengas</option>
              <option value="Saree Blouse">Saree Blouses & Draping</option>
              <option value="Sherwani">Sherwanis & Kurta Sets</option>
              <option value="Anarkali">Anarkalis & Salwar Suits</option>
              <option value="Heritage">Zardozi & Heritage Embroidery</option>
              <option value="Indo-Western">Indo-Western & Gowns</option>
            </select>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-500 hover:to-rose-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-pink-500/20 transition-all"
            >
              Search
            </button>
          </div>
        </form>

        <div className="flex items-center justify-between text-xs text-couture-400 pt-1">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={(e) => setVerifiedOnly(e.target.checked)}
              className="rounded bg-couture-950 border-couture-800 text-pink-500 focus:ring-0"
            />
            <span className="text-couture-300 font-medium">Show Verified Tailors & Designers Only</span>
          </label>
          <span className="font-medium text-couture-400">{displayedDesigners.length} designers available</span>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="py-24 text-center text-couture-400">
          <Sparkles className="w-8 h-8 text-pink-500 animate-spin mx-auto mb-2" />
          <p className="text-sm">Loading designers...</p>
        </div>
      ) : displayedDesigners.length === 0 ? (
        <div className="py-24 text-center rounded-2xl bg-couture-900 border border-couture-800">
          <Users className="w-10 h-10 text-pink-400 mx-auto mb-2" />
          <p className="font-serif text-lg text-couture-200">No designers match your filters</p>
          <p className="text-xs text-couture-400 mt-1">Try selecting "All Specialties" or resetting search terms.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedDesigners.map((designer) => (
            <DesignerCard
              key={designer.id}
              designer={designer}
              onSelect={handleSelectDesigner}
            />
          ))}
        </div>
      )}

    </div>
  );
};