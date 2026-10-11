import React, { useState } from 'react';
import { X, Star, Sparkles, Send } from 'lucide-react';
import { reviewApi } from '../services/api';
import { useToast } from '../context/ToastContext';

export const ReviewModal = ({ order, isOpen, onClose, onSuccess }) => {
  const toast = useToast();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen || !order) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error('Please share your thoughts on the fitting and craftsmanship.');
      return;
    }

    setSubmitting(true);
    try {
      await reviewApi.submit({
        orderId: order.id,
        rating,
        comment: comment.trim(),
      });

      toast.success('Your review has been submitted and added to the atelier profile!');
      onSuccess && onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.message || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-couture-900 border border-couture-800 rounded-2xl shadow-card-dark overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-couture-800 flex items-center justify-between bg-couture-950/60">
          <div>
            <span className="text-[10px] font-semibold text-gold-400 uppercase tracking-widest block">
              Verified Patron Review
            </span>
            <h3 className="font-serif text-lg font-bold text-white mt-0.5">
              Review: {order.designerBrandName}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-couture-400 hover:text-white hover:bg-couture-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Star Rating Selector */}
          <div className="text-center py-2">
            <label className="block text-xs font-semibold text-couture-300 uppercase tracking-wider mb-2">
              Overall Craftsmanship & Fitting Rating
            </label>
            <div className="flex items-center justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="p-1 text-2xl transition-transform hover:scale-125 focus:outline-none"
                >
                  <Star
                    className={`w-8 h-8 ${
                      (hoverRating || rating) >= star
                        ? 'fill-gold-400 text-gold-400'
                        : 'text-couture-700'
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="text-xs text-gold-300 font-semibold mt-1 block">
              {rating === 5 ? 'Exceptional Haute Couture' : rating === 4 ? 'Very Pleased' : rating === 3 ? 'Good' : 'Needs Refinement'}
            </span>
          </div>

          {/* Comment */}
          <div>
            <label className="block text-xs font-semibold text-couture-300 uppercase tracking-wider mb-1.5">
              Your Review & Fitting Feedback *
            </label>
            <textarea
              rows="4"
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Describe the fabric quality, pattern accuracy, precision of fittings, communication, and overall experience..."
              className="w-full p-3 rounded-xl bg-couture-950 border border-couture-700 text-white placeholder-couture-600 focus:outline-none focus:border-gold-500 text-sm leading-relaxed"
            />
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-couture-800 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-couture-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-amber-400 text-couture-950 font-bold text-sm shadow-glow-gold transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? 'Publishing...' : 'Publish Review'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
