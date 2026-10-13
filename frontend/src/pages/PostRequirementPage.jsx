import React, { useState, useEffect } from 'react';
import { 
  Scissors, 
  Upload, 
  Calendar, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Info,
  ArrowLeft
} from 'lucide-react';
import { requirementApi, uploadApi } from '../services/api';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

export const PostRequirementPage = ({ preFilledData, setCurrentView, onOpenDemoLogin }) => {
  const toast = useToast();
  const { isAuthenticated, isCustomer } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    clothingType: 'Lehenga & Choli',
    preferredFabric: '',
    preferredColors: '',
    budgetMin: '3500',
    budgetMax: '15000',
    deadline: '',
    inspirationImageUrl: '',
    notes: '',
    measurementsNotes: '',
  });

  useEffect(() => {
    if (preFilledData) {
      setFormData(prev => ({
        ...prev,
        title: preFilledData.title || prev.title,
        clothingType: preFilledData.clothingType || prev.clothingType,
        preferredFabric: preFilledData.preferredFabric || prev.preferredFabric,
        preferredColors: preFilledData.preferredColors || prev.preferredColors,
        budgetMin: preFilledData.budgetMin?.toString() || prev.budgetMin,
        budgetMax: preFilledData.budgetMax?.toString() || prev.budgetMax,
        inspirationImageUrl: preFilledData.inspirationImageUrl || prev.inspirationImageUrl,
        notes: preFilledData.notes || prev.notes,
      }));
    }
  }, [preFilledData]);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const res = await uploadApi.uploadFile(file);
      if (res.data?.url) {
        setFormData(prev => ({ ...prev, inspirationImageUrl: res.data.url }));
        toast.success('Inspiration photo uploaded successfully!');
      }
    } catch (err) {
      toast.error('Image upload failed. You can also paste an image URL directly.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.info('Please sign in as a Customer or use Demo Logins to post requirements.');
      onOpenDemoLogin && onOpenDemoLogin();
      return;
    }

    if (!isCustomer) {
      toast.error('Only customer accounts can post outfit requirements. Switch to a Customer account.');
      onOpenDemoLogin && onOpenDemoLogin();
      return;
    }

    if (!formData.title || !formData.clothingType) {
      toast.error('Please enter a title and select an outfit category.');
      return;
    }

    setSubmitting(true);
    try {
      await requirementApi.create({
        title: formData.title.trim(),
        clothingType: formData.clothingType,
        preferredFabric: formData.preferredFabric.trim(),
        preferredColors: formData.preferredColors.trim(),
        budgetMin: formData.budgetMin ? parseFloat(formData.budgetMin) : null,
        budgetMax: formData.budgetMax ? parseFloat(formData.budgetMax) : null,
        deadline: formData.deadline || null,
        inspirationImageUrl: formData.inspirationImageUrl.trim() || null,
        notes: formData.notes.trim(),
        measurementsNotes: formData.measurementsNotes.trim(),
      });

      toast.success('Your outfit requirement has been posted to local tailors and designers!');
      setCurrentView('customer-dashboard');
    } catch (err) {
      toast.error(err.message || 'Failed to post requirement');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Back button */}
      <button
        onClick={() => setCurrentView('home')}
        className="inline-flex items-center space-x-1.5 text-xs text-couture-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Home</span>
      </button>

      {/* Main Container */}
      <div className="bg-couture-900/80 border border-couture-800 rounded-3xl p-6 sm:p-10 shadow-card-dark">
        
        {/* Header */}
        <div className="space-y-2 mb-8 pb-6 border-b border-couture-800">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-widest">
            <Scissors className="w-3.5 h-3.5" />
            <span>Post Outfit Request</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-white">
            Post Your Custom Outfit Requirement
          </h1>
          <p className="text-xs sm:text-sm text-couture-300 leading-relaxed">
            Share your outfit idea with verified local tailors, boutiques, and designers. You will receive direct price quotes with estimated delivery dates.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-couture-300 uppercase tracking-wider mb-2">
              Outfit Title or Idea *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Silk Bridal Lehenga with Velvet Dupatta & Zardozi Border"
              className="w-full px-4 py-3 rounded-xl bg-couture-950 border border-couture-700 text-white placeholder-couture-600 focus:outline-none focus:border-gold-500 text-sm font-medium"
            />
          </div>

          {/* Clothing Type & Fabric Preference */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-couture-300 uppercase tracking-wider mb-2">
                Outfit Category *
              </label>
              <select
                value={formData.clothingType}
                onChange={(e) => setFormData({ ...formData, clothingType: e.target.value })}
                className="w-full px-3.5 py-3 rounded-xl bg-couture-950 border border-couture-700 text-white text-sm focus:outline-none focus:border-gold-500"
              >
                <option value="Lehenga & Choli">Lehenga & Choli</option>
                <option value="Saree & Blouse">Custom Saree Blouse</option>
                <option value="Anarkali & Salwar Suit">Anarkali & Salwar Suit</option>
                <option value="Sherwani & Kurta Set">Sherwani & Kurta Set</option>
                <option value="Indo-Western & Gown">Indo-Western & Evening Gown</option>
                <option value="Custom Blazer & Suit">Custom Blazer & Suit</option>
                <option value="Casual & Festive Wear">Casual & Festive Wear</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-couture-300 uppercase tracking-wider mb-2">
                Preferred Fabric & Textiles
              </label>
              <input
                type="text"
                value={formData.preferredFabric}
                onChange={(e) => setFormData({ ...formData, preferredFabric: e.target.value })}
                placeholder="e.g. Raw Silk, Banarasi Brocade, Organza, Velvet, Georgette..."
                className="w-full px-4 py-3 rounded-xl bg-couture-950 border border-couture-700 text-white placeholder-couture-600 focus:outline-none focus:border-gold-500 text-sm"
              />
            </div>
          </div>

          {/* Color & Budget Range */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-semibold text-couture-300 uppercase tracking-wider mb-2">
                Preferred Color(s)
              </label>
              <input
                type="text"
                value={formData.preferredColors}
                onChange={(e) => setFormData({ ...formData, preferredColors: e.target.value })}
                placeholder="e.g. Royal Blue, Antique Gold"
                className="w-full px-4 py-3 rounded-xl bg-couture-950 border border-couture-700 text-white placeholder-couture-600 focus:outline-none focus:border-gold-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-couture-300 uppercase tracking-wider mb-2">
                Min Budget (₹ INR)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-couture-400 font-semibold text-sm">₹</span>
                <input
                  type="number"
                  step="500"
                  value={formData.budgetMin}
                  onChange={(e) => setFormData({ ...formData, budgetMin: e.target.value })}
                  placeholder="3500"
                  className="w-full pl-8 pr-3 py-3 rounded-xl bg-couture-950 border border-couture-700 text-white placeholder-couture-600 focus:outline-none focus:border-gold-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-couture-300 uppercase tracking-wider mb-2">
                Max Budget (₹ INR)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-couture-400 font-semibold text-sm">₹</span>
                <input
                  type="number"
                  step="500"
                  value={formData.budgetMax}
                  onChange={(e) => setFormData({ ...formData, budgetMax: e.target.value })}
                  placeholder="15000"
                  className="w-full pl-8 pr-3 py-3 rounded-xl bg-couture-950 border border-couture-700 text-white placeholder-couture-600 focus:outline-none focus:border-gold-500 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Deadline & Inspiration Image */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-couture-300 uppercase tracking-wider mb-2">
                Event Date / Target Deadline
              </label>
              <div className="relative">
                <Calendar className="absolute top-3.5 left-3.5 w-4 h-4 text-couture-500" />
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-couture-950 border border-couture-700 text-white text-sm focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-couture-300 uppercase tracking-wider mb-2">
                Inspiration Photo (Upload or URL)
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="url"
                  value={formData.inspirationImageUrl}
                  onChange={(e) => setFormData({ ...formData, inspirationImageUrl: e.target.value })}
                  placeholder="Paste URL or upload below..."
                  className="w-full px-3 py-2.5 rounded-xl bg-couture-950 border border-couture-700 text-white placeholder-couture-600 focus:outline-none focus:border-gold-500 text-xs"
                />
                <label className="cursor-pointer flex-shrink-0 px-3 py-2.5 rounded-xl bg-couture-800 hover:bg-couture-700 text-couture-200 text-xs font-medium border border-couture-600 transition-colors">
                  <Upload className="w-3.5 h-3.5 inline mr-1" />
                  <span>{uploadingImage ? '...' : 'Upload'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Inspiration Preview if present */}
          {formData.inspirationImageUrl && (
            <div className="flex items-center space-x-3 p-3 rounded-xl bg-couture-950/60 border border-couture-800">
              <img
                src={formData.inspirationImageUrl}
                alt="Inspiration Preview"
                className="w-16 h-20 rounded-lg object-cover ring-1 ring-gold-500/40"
              />
              <div className="text-xs text-couture-400">
                <span className="text-emerald-400 font-semibold block mb-0.5">Photo Attached</span>
                Tailors and designers will review this photo when preparing their price quotes.
              </div>
            </div>
          )}

          {/* Detailed Styling Notes */}
          <div>
            <label className="block text-xs font-semibold text-couture-300 uppercase tracking-wider mb-2">
              Stitching & Customization Details
            </label>
            <textarea
              rows="4"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Describe embroidery details, blouse necklines, sleeve style, lining preferences, zipper/hook preference, or padding details..."
              className="w-full p-3.5 rounded-xl bg-couture-950 border border-couture-700 text-white placeholder-couture-600 focus:outline-none focus:border-gold-500 text-sm leading-relaxed"
            />
          </div>

          {/* Measurements Notes */}
          <div>
            <label className="block text-xs font-semibold text-couture-300 uppercase tracking-wider mb-2">
              Measurements & Fitting Notes (Optional)
            </label>
            <textarea
              rows="2"
              value={formData.measurementsNotes}
              onChange={(e) => setFormData({ ...formData, measurementsNotes: e.target.value })}
              placeholder="e.g. Bust 36in, Waist 28in, Lehenga length 42in, Shoulder 14in..."
              className="w-full p-3 rounded-xl bg-couture-950 border border-couture-700 text-white placeholder-couture-600 focus:outline-none focus:border-gold-500 text-sm leading-relaxed"
            />
          </div>

          {/* Notice Banner */}
          <div className="p-4 rounded-xl bg-couture-950/80 border border-couture-800 text-xs text-couture-400 flex items-start space-x-2.5">
            <Info className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
            <span>
              Once posted, verified local tailors and designers will review your request and send price quotes. You can compare quotes and select your favorite on your dashboard.
            </span>
          </div>

          {/* Submit Action */}
          <div className="pt-4 flex items-center justify-end space-x-4">
            <button
              type="button"
              onClick={() => setCurrentView('home')}
              className="px-5 py-3 rounded-xl text-sm font-medium text-couture-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-gold-600 via-gold-500 to-amber-400 hover:from-gold-500 hover:to-amber-300 text-couture-950 font-bold text-sm uppercase tracking-wider shadow-glow-gold transition-all disabled:opacity-50 flex items-center space-x-2"
            >
              {submitting ? (
                <span>Posting Request...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Publish Requirement</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};