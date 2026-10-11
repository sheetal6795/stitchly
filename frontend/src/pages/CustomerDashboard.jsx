import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Scissors, 
  Clock, 
  Star, 
  Heart, 
  Sparkles, 
  PlusCircle, 
  AlertCircle,
  Truck,
  CheckCircle2,
  ChevronRight,
  Eye
} from 'lucide-react';
import { requirementApi, orderApi, designApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { OrderProgressTracker } from '../components/OrderProgressTracker';
import { CompareQuotationsModal } from '../components/CompareQuotationsModal';
import { ReviewModal } from '../components/ReviewModal';
import { DesignCard } from '../components/DesignCard';

export const CustomerDashboard = ({ setCurrentView, setSelectedDesignerId }) => {
  const { user } = useAuth();
  const toast = useToast();
  
  const [activeTab, setActiveTab] = useState('requirements'); // 'requirements', 'orders', 'saved'
  const [requirements, setRequirements] = useState([]);
  const [orders, setOrders] = useState([]);
  const [savedDesigns, setSavedDesigns] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [selectedReqForQuotes, setSelectedReqForQuotes] = useState(null);
  const [selectedOrderForReview, setSelectedOrderForReview] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [reqsRes, ordersRes, likesRes] = await Promise.all([
        requirementApi.getMyRequirements(),
        orderApi.getCustomerOrders(),
        designApi.getMyLikes()
      ]);
      setRequirements(reqsRes.data || []);
      setOrders(ordersRes.data || []);
      setSavedDesigns(likesRes.data || []);
    } catch (err) {
      console.error('Failed to load customer dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelRequirement = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this custom brief?')) return;
    try {
      await requirementApi.cancel(id);
      toast.success('Custom requirement cancelled.');
      loadDashboardData();
    } catch (err) {
      toast.error(err.message || 'Failed to cancel requirement');
    }
  };

  const handleConfirmDelivery = async (orderId) => {
    try {
      await orderApi.updateStatus(orderId, { status: 'COMPLETED' });
      toast.success('Commission completed! You can now review your designer.');
      loadDashboardData();
    } catch (err) {
      toast.error('Failed to mark order completed');
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Client Profile Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-couture-900 via-couture-950 to-couture-900 border border-couture-800 p-6 sm:p-8 mb-8 shadow-card-dark flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <img
            src={user?.avatarUrl || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"}
            alt={user?.name}
            className="w-16 h-16 rounded-full object-cover ring-2 ring-gold-500/60 shadow-lg"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-serif text-2xl font-bold text-white">{user?.name}</h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/30">
                Client Wardrobe
              </span>
            </div>
            <p className="text-xs text-couture-400 mt-1">{user?.email}</p>
          </div>
        </div>

        <button
          onClick={() => setCurrentView('post-requirement')}
          className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-amber-400 text-couture-950 font-bold text-xs uppercase tracking-wider shadow-glow-gold transition-all self-start sm:self-center"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post New Custom Brief</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-couture-900/60 border border-couture-800">
          <span className="text-xs text-couture-400 block mb-1">Active Briefs</span>
          <span className="font-serif text-2xl font-bold text-white">
            {requirements.filter(r => r.status === 'OPEN').length}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-couture-900/60 border border-couture-800">
          <span className="text-xs text-couture-400 block mb-1">Quotes Received</span>
          <span className="font-serif text-2xl font-bold text-gold-400">
            {requirements.reduce((acc, r) => acc + (r.quotationsCount || 0), 0)}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-couture-900/60 border border-couture-800">
          <span className="text-xs text-couture-400 block mb-1">In Production / Fittings</span>
          <span className="font-serif text-2xl font-bold text-champagne-300">
            {orders.filter(o => o.status !== 'COMPLETED' && o.status !== 'CANCELLED').length}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-couture-900/60 border border-couture-800">
          <span className="text-xs text-couture-400 block mb-1">Saved Designs</span>
          <span className="font-serif text-2xl font-bold text-white">
            {savedDesigns.length}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-couture-800 mb-8">
        <button
          onClick={() => setActiveTab('requirements')}
          className={`pb-3 px-4 text-sm font-semibold transition-all relative ${
            activeTab === 'requirements'
              ? 'text-gold-400'
              : 'text-couture-400 hover:text-white'
          }`}
        >
          <span>My Custom Requirements ({requirements.length})</span>
          {activeTab === 'requirements' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-400" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 px-4 text-sm font-semibold transition-all relative ${
            activeTab === 'orders'
              ? 'text-gold-400'
              : 'text-couture-400 hover:text-white'
          }`}
        >
          <span>My Commissions & Orders ({orders.length})</span>
          {activeTab === 'orders' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-400" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`pb-3 px-4 text-sm font-semibold transition-all relative ${
            activeTab === 'saved'
              ? 'text-gold-400'
              : 'text-couture-400 hover:text-white'
          }`}
        >
          <span>Saved Lookbook ({savedDesigns.length})</span>
          {activeTab === 'saved' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-400" />
          )}
        </button>
      </div>

      {/* Tab 1: Custom Requirements */}
      {activeTab === 'requirements' && (
        <div className="space-y-4">
          {requirements.length === 0 ? (
            <div className="py-16 text-center rounded-2xl bg-couture-900/40 border border-couture-800/80">
              <Scissors className="w-10 h-10 text-couture-500 mx-auto mb-3" />
              <h3 className="font-serif text-lg font-bold text-white">No custom briefs posted yet</h3>
              <p className="text-xs text-couture-400 max-w-sm mx-auto mt-1 leading-relaxed mb-4">
                Have an outfit concept? Post your custom brief or use the AI Studio to get tailor proposals.
              </p>
              <button
                onClick={() => setCurrentView('post-requirement')}
                className="px-5 py-2.5 rounded-xl bg-gold-500 text-couture-950 font-bold text-xs uppercase"
              >
                Post Your First Requirement
              </button>
            </div>
          ) : (
            requirements.map((req) => (
              <div
                key={req.id}
                className="p-5 sm:p-6 rounded-2xl bg-couture-900/70 border border-couture-800 hover:border-gold-500/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-card-dark"
              >
                <div className="flex items-start space-x-4">
                  {req.inspirationImageUrl ? (
                    <img
                      src={req.inspirationImageUrl}
                      alt={req.title}
                      className="w-16 h-20 sm:w-20 sm:h-24 rounded-xl object-cover ring-1 ring-couture-700 flex-shrink-0"
                    />
                  ) : (
                    <div className="w-16 h-20 sm:w-20 sm:h-24 rounded-xl bg-couture-950 border border-couture-800 flex items-center justify-center text-couture-500 text-xs flex-shrink-0">
                      No Photo
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-semibold text-gold-400 uppercase tracking-widest">
                        {req.clothingType}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          req.status === 'OPEN'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : req.status === 'AWARDED'
                            ? 'bg-gold-500/20 text-gold-300 border border-gold-500/30'
                            : 'bg-couture-800 text-couture-400'
                        }`}
                      >
                        {req.status}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-white hover:text-gold-300 transition-colors">
                      {req.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-couture-400">
                      <span>Budget: ${req.budgetMin} – ${req.budgetMax}</span>
                      <span>•</span>
                      <span>Target: {req.deadline || 'Flexible'}</span>
                      {req.preferredFabric && (
                        <>
                          <span>•</span>
                          <span className="truncate max-w-[200px]">Fabric: {req.preferredFabric}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center space-x-3 pt-3 md:pt-0 border-t md:border-t-0 border-couture-800">
                  {req.status === 'OPEN' && (
                    <button
                      onClick={() => setSelectedReqForQuotes(req)}
                      className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-amber-400 text-couture-950 font-bold text-xs uppercase tracking-wider shadow-glow-gold transition-all"
                    >
                      <span>Compare Quotes ({req.quotationsCount || 0})</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}

                  {req.status === 'OPEN' && (
                    <button
                      onClick={() => handleCancelRequirement(req.id)}
                      className="text-xs text-couture-500 hover:text-red-400 px-2 py-1 transition-colors"
                    >
                      Cancel Brief
                    </button>
                  )}

                  {req.status === 'AWARDED' && (
                    <span className="text-xs text-emerald-400 font-semibold px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      Commission Awarded
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Orders & Fittings */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="py-16 text-center rounded-2xl bg-couture-900/40 border border-couture-800/80">
              <ShoppingBag className="w-10 h-10 text-couture-500 mx-auto mb-3" />
              <h3 className="font-serif text-lg font-bold text-white">No active bespoke orders</h3>
              <p className="text-xs text-couture-400 max-w-sm mx-auto mt-1 leading-relaxed">
                When you accept a designer quotation, your order and measurement fitting tracker will appear here.
              </p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="p-6 rounded-3xl bg-couture-900/70 border border-couture-800 shadow-card-dark space-y-6"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-couture-800/80 gap-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono font-semibold text-gold-400">
                        {order.orderNumber}
                      </span>
                      <span className="text-couture-500">•</span>
                      <span className="text-xs text-couture-300">
                        Atelier: <strong className="text-white">{order.designerBrandName}</strong>
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-white mt-1">
                      {order.requirementTitle || 'Custom Bespoke Commission'}
                    </h3>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] uppercase text-couture-500 block">Total Agreed Fee</span>
                    <span className="font-serif text-xl font-bold text-champagne-300">
                      ${order.totalAmount?.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Progress Stepper */}
                <OrderProgressTracker currentStatus={order.status} />

                {/* Tracking & Designer Production Notes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
                  <div className="p-3.5 rounded-xl bg-couture-950/80 border border-couture-800 space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-gold-400 font-semibold block">
                      Atelier Production Status
                    </span>
                    <p className="text-couture-300 leading-relaxed">
                      {order.designerNotes || 'Patterns drafted. Material inspection underway.'}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-couture-950/80 border border-couture-800 space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-gold-400 font-semibold block">
                      Courier & Delivery Tracking
                    </span>
                    <p className="text-couture-300">
                      {order.trackingNumber ? (
                        <span className="flex items-center space-x-1 font-mono text-emerald-400">
                          <Truck className="w-3.5 h-3.5" />
                          <span>{order.trackingNumber}</span>
                        </span>
                      ) : (
                        <span>Tracking will update once finished garment is dispatched.</span>
                      )}
                    </p>
                    <span className="text-[10px] text-couture-500 block">
                      Target Completion: {order.deadline || 'Per agreement'}
                    </span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="pt-2 flex items-center justify-end space-x-3">
                  {order.status === 'SHIPPED' && (
                    <button
                      onClick={() => handleConfirmDelivery(order.id)}
                      className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-couture-950 font-bold text-xs uppercase"
                    >
                      Confirm Delivery Received
                    </button>
                  )}

                  {order.status === 'COMPLETED' && !order.reviewed && (
                    <button
                      onClick={() => setSelectedOrderForReview(order)}
                      className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-couture-950 font-bold text-xs uppercase shadow-glow-gold"
                    >
                      <Star className="w-3.5 h-3.5 fill-couture-950" />
                      <span>Rate & Review Atelier</span>
                    </button>
                  )}

                  {order.reviewed && (
                    <span className="text-xs text-gold-400 font-semibold flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Review Published</span>
                    </span>
                  )}
                </div>

              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 3: Saved Designs */}
      {activeTab === 'saved' && (
        <div>
          {savedDesigns.length === 0 ? (
            <div className="py-16 text-center rounded-2xl bg-couture-900/40 border border-couture-800/80">
              <Heart className="w-10 h-10 text-couture-500 mx-auto mb-3" />
              <h3 className="font-serif text-lg font-bold text-white">No saved designs</h3>
              <p className="text-xs text-couture-400 max-w-sm mx-auto mt-1 leading-relaxed mb-4">
                Browse our curated couture lookbook and tap the heart icon to curate your personal style board.
              </p>
              <button
                onClick={() => setCurrentView('explore')}
                className="px-5 py-2.5 rounded-xl bg-gold-500 text-couture-950 font-bold text-xs uppercase"
              >
                Browse Designs
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {savedDesigns.map((design) => (
                <DesignCard
                  key={design.id}
                  design={design}
                  onSelect={() => setCurrentView('explore')}
                  onDesignerClick={(designerId) => {
                    setSelectedDesignerId(designerId);
                    setCurrentView('designer-detail');
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modal: Compare Quotations */}
      {selectedReqForQuotes && (
        <CompareQuotationsModal
          requirement={selectedReqForQuotes}
          isOpen={true}
          onClose={() => setSelectedReqForQuotes(null)}
          onOrderCreated={() => {
            loadDashboardData();
            setActiveTab('orders');
          }}
        />
      )}

      {/* Modal: Review Order */}
      {selectedOrderForReview && (
        <ReviewModal
          order={selectedOrderForReview}
          isOpen={true}
          onClose={() => setSelectedOrderForReview(null)}
          onSuccess={loadDashboardData}
        />
      )}

    </div>
  );
};
