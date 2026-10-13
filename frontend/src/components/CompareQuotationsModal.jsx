import React, { useState } from 'react';
import { X, CheckCircle, Clock, ShieldCheck, MapPin, Sparkles, ArrowLeft } from 'lucide-react';
import { quotationApi, orderApi } from '../services/api';
import { useToast } from '../context/ToastContext';

export const CompareQuotationsModal = ({ requirement, isOpen, onClose, onOrderCreated }) => {
  const toast = useToast();
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [shippingAddress, setShippingAddress] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen || !requirement) return null;

  const handleAcceptQuote = async () => {
    if (!selectedQuote) {
      toast.info('Please select a designer quotation first.');
      return;
    }
    if (!shippingAddress.trim()) {
      toast.info('Please provide your delivery & fitting address.');
      return;
    }

    setLoading(true);
    try {
      // 1. Accept quotation
      await quotationApi.accept(selectedQuote.id);

      // 2. Create order
      await orderApi.createOrder({
        requirementId: requirement.id,
        quotationId: selectedQuote.id,
        designerId: selectedQuote.designerId,
        totalAmount: selectedQuote.priceAmount,
        shippingAddress: shippingAddress.trim()
      });

      toast.success('Commission confirmed! Your tailor has been notified.');
      onOrderCreated && onOrderCreated();
      onClose();
    } catch (err) {
      console.error('Failed to confirm order', err);
      toast.error(err.message || 'Could not place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-couture-200/40 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-couture-900 border border-couture-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 my-8 animate-fade-in">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-couture-800">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-pink-50 text-pink-600 text-[10px] font-bold uppercase tracking-wider border border-pink-200 mb-1">
              <Sparkles className="w-3 h-3 text-pink-500" />
              <span>Marketplace Comparison</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-couture-200">
              Quotations for: <span className="italic font-normal">{requirement.title}</span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-couture-400 hover:text-couture-200 hover:bg-couture-850 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quotes List or Selected Step */}
        {!selectedQuote ? (
          <div className="space-y-4">
            <p className="text-xs text-couture-400 leading-relaxed">
              Review price quotes and turnaround times submitted by verified local designers and tailors for this outfit brief.
            </p>

            {(!requirement.quotations || requirement.quotations.length === 0) ? (
              <div className="py-12 text-center rounded-2xl bg-couture-950 border border-couture-800">
                <Clock className="w-8 h-8 text-couture-400 mx-auto mb-2" />
                <h4 className="font-serif text-base font-bold text-couture-200">Awaiting Designer Offers</h4>
                <p className="text-xs text-couture-400 max-w-xs mx-auto mt-1">
                  Local master tailors are reviewing your requirements. You will be notified when quotes arrive.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {requirement.quotations.map((quote) => (
                  <div
                    key={quote.id}
                    className="p-4 sm:p-5 rounded-2xl bg-couture-950 border border-couture-800 hover:border-pink-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
                  >
                    <div className="flex items-start space-x-3.5">
                      <img
                        src={quote.designerAvatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"}
                        alt={quote.designerBrandName}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-pink-300 shadow-sm"
                      />
                      <div>
                        <h4 className="font-serif text-base font-bold text-couture-200">
                          {quote.designerBrandName}
                        </h4>
                        <div className="flex items-center space-x-3 text-xs text-couture-400 mt-0.5">
                          <span className="flex items-center space-x-1">
                            <Clock className="w-3.5 h-3.5 text-pink-500" />
                            <span>{quote.estimatedDays || 14} days turnaround</span>
                          </span>
                        </div>
                        {quote.notes && (
                          <p className="text-xs text-couture-400 mt-2 italic bg-couture-900 p-2 rounded-xl border border-couture-800">
                            "{quote.notes}"
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center sm:flex-col sm:items-end justify-between pt-2 sm:pt-0 border-t sm:border-t-0 border-couture-800">
                      <span className="font-serif text-xl font-bold text-pink-600">
                        ₹{quote.priceAmount?.toLocaleString('en-IN')}
                      </span>
                      <button
                        onClick={() => setSelectedQuote(quote)}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-500 hover:to-rose-400 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
                      >
                        Select Atelier
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Confirmation Step */
          <div className="space-y-5 animate-fade-in">
            {/* Selected Summary Card */}
            <div className="p-4 rounded-2xl bg-couture-950 border border-pink-300 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-pink-600 uppercase tracking-widest block">Selected Atelier</span>
                <h4 className="font-serif text-lg font-bold text-couture-200">{selectedQuote.designerBrandName}</h4>
                <p className="text-xs text-couture-400 mt-0.5">Turnaround: {selectedQuote.estimatedDays || 14} days</p>
              </div>
              <div className="text-right">
                <span className="font-serif text-2xl font-bold text-pink-600">
                  ₹{selectedQuote.priceAmount?.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Address Form */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-couture-200 uppercase tracking-wider">
                Delivery & Fitting Address *
              </label>
              <textarea
                rows={3}
                required
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                placeholder="Enter your full street address, landmark, city, state, and pincode..."
                className="w-full p-3.5 rounded-2xl bg-couture-950 border border-couture-800 text-couture-200 placeholder-couture-400 text-xs focus:outline-none focus:border-pink-500 leading-relaxed"
              />
              <p className="text-[11px] text-couture-400 italic">
                Your address will be shared securely with your chosen atelier for fabric fitting swatches and finished courier delivery.
              </p>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-couture-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setSelectedQuote(null)}
                className="flex items-center space-x-1.5 text-xs text-couture-400 hover:text-couture-200 font-semibold"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Quotes</span>
              </button>

              <button
                type="button"
                onClick={handleAcceptQuote}
                disabled={loading}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 via-rose-500 to-pink-500 hover:from-pink-500 hover:to-rose-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-pink-500/20 transition-all disabled:opacity-50"
              >
                {loading ? 'Confirming Order...' : 'Confirm & Commission Order'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};