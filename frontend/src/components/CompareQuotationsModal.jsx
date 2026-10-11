import React, { useState, useEffect } from 'react';
import { X, Check, Star, Clock, DollarSign, CheckCircle, Sparkles, AlertCircle } from 'lucide-react';
import { quotationApi } from '../services/api';
import { useToast } from '../context/ToastContext';

export const CompareQuotationsModal = ({ requirement, isOpen, onClose, onOrderCreated }) => {
  const toast = useToast();
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [acceptingId, setAcceptingId] = useState(null);
  const [showAddressInput, setShowAddressInput] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [shippingAddress, setShippingAddress] = useState('742 Evergreen Terrace, Manhattan, NY 10001');

  useEffect(() => {
    if (isOpen && requirement) {
      loadQuotations();
    }
  }, [isOpen, requirement]);

  const loadQuotations = async () => {
    setLoading(true);
    try {
      const res = await quotationApi.getByRequirement(requirement.id);
      setQuotations(res.data || []);
    } catch (err) {
      toast.error('Failed to load quotations');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectQuoteToAccept = (quote) => {
    setSelectedQuote(quote);
    setShowAddressInput(true);
  };

  const handleConfirmAccept = async () => {
    if (!selectedQuote) return;
    setAcceptingId(selectedQuote.id);

    try {
      const res = await quotationApi.accept(selectedQuote.id, {
        shippingAddress: shippingAddress.trim(),
        customerNotes: 'Measurements confirmed. Excited to begin this custom garment!'
      });

      toast.success('Quotation accepted! Your bespoke commission order is now active.');
      onOrderCreated && onOrderCreated(res.data);
      onClose();
    } catch (err) {
      toast.error(err.message || 'Failed to accept quotation');
    } finally {
      setAcceptingId(null);
    }
  };

  if (!isOpen || !requirement) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-couture-900 border border-couture-800 rounded-2xl shadow-card-dark overflow-hidden my-8">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-couture-800 flex items-center justify-between bg-couture-950/60">
          <div>
            <span className="text-[11px] font-semibold text-gold-400 uppercase tracking-widest block">
              Marketplace Comparison
            </span>
            <h3 className="font-serif text-xl font-bold text-white mt-0.5">
              Quotations for: {requirement.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-couture-400 hover:text-white hover:bg-couture-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="py-16 text-center text-couture-400">
              <Sparkles className="w-8 h-8 text-gold-400 animate-spin mx-auto mb-2" />
              <p className="text-sm">Fetching designer proposals...</p>
            </div>
          ) : quotations.length === 0 ? (
            <div className="py-16 text-center">
              <div className="w-12 h-12 rounded-full bg-couture-800 flex items-center justify-center mx-auto mb-3 text-couture-500">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="text-base font-semibold text-white">No quotations received yet</h4>
              <p className="text-xs text-couture-400 max-w-md mx-auto mt-1 leading-relaxed">
                Your requirement is active on the Designers Board. Ateliers are currently reviewing your inspiration and drafting their custom proposals. Check back shortly!
              </p>
            </div>
          ) : showAddressInput ? (
            /* Step 2: Confirm Order & Shipping Address */
            <div className="py-4 space-y-6 max-w-xl mx-auto">
              <div className="p-4 rounded-xl bg-gold-500/10 border border-gold-500/30">
                <span className="text-xs uppercase tracking-wider font-semibold text-gold-400 block mb-1">
                  Selected Atelier
                </span>
                <h4 className="font-serif text-lg font-bold text-white">
                  {selectedQuote?.designerBrandName}
                </h4>
                <div className="flex items-center space-x-4 mt-2 text-sm text-champagne-300">
                  <span>Price: <strong className="text-white">${selectedQuote?.quotePrice}</strong></span>
                  <span>•</span>
                  <span>Turnaround: <strong className="text-white">{selectedQuote?.estimatedDays} days</strong></span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-couture-300 uppercase tracking-wider mb-2">
                  Delivery & Fitting Address *
                </label>
                <textarea
                  rows="3"
                  required
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="Street address, apartment/suite, city, state, postal code, country..."
                  className="w-full p-3.5 rounded-xl bg-couture-950 border border-couture-700 text-white placeholder-couture-600 focus:outline-none focus:border-gold-500 text-sm leading-relaxed"
                />
                <p className="text-[11px] text-couture-500 mt-1.5">
                  Your address will be shared securely with your chosen atelier for fabric fitting swatches and finished courier delivery.
                </p>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddressInput(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-couture-400 hover:text-white"
                >
                  Back to Quotes
                </button>
                <button
                  type="button"
                  onClick={handleConfirmAccept}
                  disabled={acceptingId !== null}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-amber-400 text-couture-950 font-bold text-sm shadow-glow-gold transition-all disabled:opacity-50"
                >
                  {acceptingId ? 'Creating Order...' : 'Confirm & Commission Order'}
                </button>
              </div>
            </div>
          ) : (
            /* Step 1: Compare Quotations side-by-side */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {quotations.map((quote) => {
                const isAccepted = quote.status === 'ACCEPTED';
                const isRejected = quote.status === 'REJECTED';

                return (
                  <div
                    key={quote.id}
                    className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                      isAccepted
                        ? 'bg-emerald-950/20 border-emerald-500/60 ring-1 ring-emerald-500/40'
                        : isRejected
                        ? 'bg-couture-950/40 border-couture-800/40 opacity-50'
                        : 'bg-couture-950/70 border-couture-800 hover:border-gold-500/50 shadow-card-dark'
                    }`}
                  >
                    <div>
                      {/* Designer Brand & Header */}
                      <div className="flex items-start justify-between pb-3 border-b border-couture-800/60 mb-3">
                        <div className="flex items-center space-x-3">
                          <img
                            src={quote.designerAvatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"}
                            alt={quote.designerBrandName}
                            className="w-10 h-10 rounded-full object-cover ring-1 ring-gold-500/40"
                          />
                          <div>
                            <h4 className="font-serif text-base font-bold text-white flex items-center space-x-1.5">
                              <span>{quote.designerBrandName}</span>
                              {quote.designerVerified && (
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                              )}
                            </h4>
                            <div className="flex items-center space-x-1 text-xs text-gold-400">
                              <Star className="w-3 h-3 fill-gold-400 text-gold-400" />
                              <span>{quote.designerRating?.toFixed(1) || '5.0'}</span>
                            </div>
                          </div>
                        </div>

                        {/* Price Badge */}
                        <div className="text-right">
                          <span className="text-[10px] uppercase text-couture-500 block">Proposed Fee</span>
                          <span className="font-serif text-xl font-bold text-champagne-300">
                            ${quote.quotePrice?.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Proposal Notes */}
                      <div className="space-y-2 mb-4">
                        <p className="text-xs text-couture-300 leading-relaxed italic">
                          "{quote.proposalNotes}"
                        </p>

                        {quote.fabricSuggestions && (
                          <div className="p-2.5 rounded-lg bg-couture-900/80 border border-couture-800/80 text-xs">
                            <span className="text-gold-400 font-semibold block text-[11px] mb-0.5">
                              Recommended Textiles:
                            </span>
                            <span className="text-couture-300">{quote.fabricSuggestions}</span>
                          </div>
                        )}

                        {quote.costBreakdown && (
                          <div className="text-[11px] text-couture-400 pt-1">
                            <span className="text-couture-500 font-medium">Cost detail:</span> {quote.costBreakdown}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom stats and accept CTA */}
                    <div className="pt-3 border-t border-couture-800/60 flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-xs text-couture-400">
                        <Clock className="w-3.5 h-3.5 text-gold-400" />
                        <span><strong>{quote.estimatedDays}</strong> days turnaround</span>
                      </div>

                      {isAccepted ? (
                        <span className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-500/40">
                          Accepted
                        </span>
                      ) : isRejected ? (
                        <span className="text-xs text-couture-500">Declined</span>
                      ) : (
                        <button
                          onClick={() => handleSelectQuoteToAccept(quote)}
                          className="flex items-center space-x-1 px-4 py-2 rounded-xl bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-amber-400 text-couture-950 font-bold text-xs uppercase tracking-wider shadow-glow-gold transition-all"
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Accept & Order</span>
                        </button>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
