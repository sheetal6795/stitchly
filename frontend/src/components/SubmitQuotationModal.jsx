import React, { useState } from 'react';
import { X, DollarSign, Clock, Sparkles, Send, Calendar, Scissors } from 'lucide-react';
import { quotationApi } from '../services/api';
import { useToast } from '../context/ToastContext';

export const SubmitQuotationModal = ({ requirement, isOpen, onClose, onSuccess }) => {
  const toast = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    quotePrice: requirement?.budgetMin || '',
    estimatedDays: 14,
    proposalNotes: '',
    fabricSuggestions: requirement?.preferredFabric || '',
    costBreakdown: '',
  });

  if (!isOpen || !requirement) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.quotePrice || !formData.estimatedDays) {
      toast.error('Please specify quoted price and completion timeframe.');
      return;
    }

    setSubmitting(true);
    try {
      await quotationApi.submit({
        requirementId: requirement.id,
        quotePrice: parseFloat(formData.quotePrice),
        estimatedDays: parseInt(formData.estimatedDays),
        proposalNotes: formData.proposalNotes,
        fabricSuggestions: formData.fabricSuggestions,
        costBreakdown: formData.costBreakdown,
      });

      toast.success('Your quotation has been sent to the client!');
      onSuccess && onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.message || 'Failed to submit quotation');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-couture-900 border border-couture-800 rounded-2xl shadow-card-dark overflow-hidden my-8">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-couture-800 flex items-center justify-between bg-couture-950/60">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-gold-500/20 text-gold-400">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white">
                Submit Atelier Quotation
              </h3>
              <p className="text-xs text-couture-400">
                Offer your bespoke vision for this client commission
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-couture-400 hover:text-white hover:bg-couture-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Client Requirement Summary Banner */}
        <div className="p-4 bg-couture-950/40 border-b border-couture-800/80 flex items-start space-x-4">
          {requirement.inspirationImageUrl ? (
            <img
              src={requirement.inspirationImageUrl}
              alt="Inspiration"
              className="w-16 h-20 rounded-lg object-cover flex-shrink-0 ring-1 ring-couture-700"
            />
          ) : (
            <div className="w-16 h-20 rounded-lg bg-couture-800 flex items-center justify-center text-couture-500 text-xs">
              No Photo
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-white truncate">{requirement.title}</h4>
            <div className="flex flex-wrap gap-2 text-xs text-couture-400 mt-1">
              <span className="text-gold-300 font-medium">{requirement.clothingType}</span>
              <span>•</span>
              <span>Budget: ${requirement.budgetMin} - ${requirement.budgetMax}</span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Calendar className="w-3 h-3 text-couture-500" />
                <span>Due: {requirement.deadline || 'Flexible'}</span>
              </span>
            </div>
            {requirement.preferredFabric && (
              <p className="text-xs text-couture-300 mt-1 truncate">
                <span className="text-couture-500">Fabric pref:</span> {requirement.preferredFabric}
              </p>
            )}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Quoted Price */}
            <div>
              <label className="block text-xs font-semibold text-couture-300 uppercase tracking-wider mb-1.5">
                Quoted Commission Price (USD) *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gold-400 font-serif text-base pointer-events-none">
                  $
                </span>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.quotePrice}
                  onChange={(e) => setFormData({ ...formData, quotePrice: e.target.value })}
                  placeholder="e.g. 650.00"
                  className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-couture-950 border border-couture-700/80 text-white placeholder-couture-600 focus:outline-none focus:border-gold-500 text-sm font-medium"
                />
              </div>
              <p className="text-[11px] text-couture-500 mt-1">
                Client budget range: ${requirement.budgetMin} - ${requirement.budgetMax}
              </p>
            </div>

            {/* Turnaround Days */}
            <div>
              <label className="block text-xs font-semibold text-couture-300 uppercase tracking-wider mb-1.5">
                Estimated Turnaround (Days) *
              </label>
              <div className="relative">
                <Clock className="absolute top-3 left-3 w-4 h-4 text-couture-500" />
                <input
                  type="number"
                  min="1"
                  required
                  value={formData.estimatedDays}
                  onChange={(e) => setFormData({ ...formData, estimatedDays: e.target.value })}
                  placeholder="e.g. 14"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-couture-950 border border-couture-700/80 text-white placeholder-couture-600 focus:outline-none focus:border-gold-500 text-sm font-medium"
                />
              </div>
              <p className="text-[11px] text-couture-500 mt-1">
                From measurement confirmation to finished piece
              </p>
            </div>

          </div>

          {/* Proposal & Styling Notes */}
          <div>
            <label className="block text-xs font-semibold text-couture-300 uppercase tracking-wider mb-1.5">
              Atelier Vision & Proposal Notes *
            </label>
            <textarea
              rows="3"
              required
              value={formData.proposalNotes}
              onChange={(e) => setFormData({ ...formData, proposalNotes: e.target.value })}
              placeholder="Explain how you will construct this garment, your approach to fittings, and why your atelier is the perfect choice for this piece..."
              className="w-full p-3 rounded-xl bg-couture-950 border border-couture-700/80 text-white placeholder-couture-600 focus:outline-none focus:border-gold-500 text-sm leading-relaxed"
            />
          </div>

          {/* Fabric Suggestions */}
          <div>
            <label className="block text-xs font-semibold text-couture-300 uppercase tracking-wider mb-1.5">
              Recommended Fabric & Linings
            </label>
            <input
              type="text"
              value={formData.fabricSuggestions}
              onChange={(e) => setFormData({ ...formData, fabricSuggestions: e.target.value })}
              placeholder="e.g. Italian Silk-Viscose Velvet with Habotai Silk lining & Horsehair braid"
              className="w-full px-3 py-2.5 rounded-xl bg-couture-950 border border-couture-700/80 text-white placeholder-couture-600 focus:outline-none focus:border-gold-500 text-sm"
            />
          </div>

          {/* Cost Breakdown */}
          <div>
            <label className="block text-xs font-semibold text-couture-300 uppercase tracking-wider mb-1.5">
              Transparent Cost Breakdown (Optional)
            </label>
            <input
              type="text"
              value={formData.costBreakdown}
              onChange={(e) => setFormData({ ...formData, costBreakdown: e.target.value })}
              placeholder="e.g. Fabrics & Notions: $250 | Pattern & Muslin Toile: $150 | Hand Assembly: $250"
              className="w-full px-3 py-2.5 rounded-xl bg-couture-950 border border-couture-700/80 text-white placeholder-couture-600 focus:outline-none focus:border-gold-500 text-sm"
            />
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-couture-800 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-couture-400 hover:text-white hover:bg-couture-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-amber-400 text-couture-950 font-bold text-sm shadow-glow-gold transition-all disabled:opacity-50"
            >
              {submitting ? (
                <span>Submitting...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Quotation</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
