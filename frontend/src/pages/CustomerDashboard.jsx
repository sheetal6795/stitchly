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
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-couture-950 text-couture-200">
      
      {/* Client Profile Banner */}
      <div className="relative rounded-3xl bg-couture-900 border border-couture-800 p-6 sm:p-8 mb-8 shadow-card-dark flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <img
            src={user?.avatarUrl || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"}
            alt={user?.name}
            className="w-16 h-16 rounded-full object-cover ring-2 ring-pink-400 shadow-md"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-serif text-2xl font-bold text-couture-200">{user?.name}</h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-pink-50 text-pink-600 border border-pink-200">
                Shopper Profile
              </span>
            </div>
            <p className="text-xs text-couture-400 mt-1">{user?.email}</p>
          </div>
        </div>

        <button
          onClick={() => setCurrentView('post-requirement')}
          className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-500 hover:to-rose-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-pink-500/20 transition-all self-start sm:self-center"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post New Custom Brief</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-couture-900 border border-couture-800 shadow-sm">
          <span className="text-xs font-medium text-couture-400 block mb-1">Active Briefs</span>
          <span className="font-serif text-2xl font-bold text-couture-200">
            {requirements.filter(r => r.status === 'OPEN').length}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-couture-900 border border-couture-800 shadow-sm">
          <span className="text-xs font-medium text-couture-400 block mb-1">Quotes Received</span>
          <span className="font-serif text-2xl font-bold text-pink-600">
            {requirements.reduce((acc, r) => acc + (r.quotationsCount || 0), 0)}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-couture-900 border border-couture-800 shadow-sm">
          <span className="text-xs font-medium text-couture-400 block mb-1">In Production / Fittings</span>
          <span className="font-serif text-2xl font-bold text-purple-600">
            {orders.filter(o => o.status !== 'COMPLETED' && o.status !== 'CANCELLED').length}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-couture-900 border border-couture-800 shadow-sm">
          <span className="text-xs font-medium text-couture-400 block mb-1">Saved Designs</span>
          <span className="font-serif text-2xl font-bold text-couture-200">
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
              ? 'text-pink-600 font-bold'
              : 'text-couture-400 hover:text-couture-200'
          }`}
        >
          <span>My Custom Requirements ({requirements.length})</span>
          {activeTab === 'requirements' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-600 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 px-4 text-sm font-semibold transition-all relative ${
            activeTab === 'orders'
              ? 'text-pink-600 font-bold'
              : 'text-couture-400 hover:text-couture-200'
          }`}
        >
          <span>My Orders & Fittings ({orders.length})</span>
          {activeTab === 'orders' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-600 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`pb-3 px-4 text-sm font-semibold transition-all relative ${
            activeTab === 'saved'
              ? 'text-pink-600 font-bold'
              : 'text-couture-400 hover:text-couture-200'
          }`}
        >
          <span>Saved Lookbook ({savedDesigns.length})</span>
          {activeTab === 'saved' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-600 rounded-full" />
          )}
        </button>
      </div>

      {/* Tab 1: Custom Requirements */}
      {activeTab === 'requirements' && (
        <div className="space-y-4">
          {requirements.length === 0 ? (
            <div className="py-16 text-center rounded-2xl bg-couture-900 border border-couture-800 shadow-sm">
              <Scissors className="w-10 h-10 text-couture-400 mx-auto mb-3" />
              <h3 className="font-serif text-lg font-bold text-couture-200">No custom briefs posted yet</h3>
              <p className="text-xs text-couture-400 max-w-sm mx-auto mt-1 leading-relaxed mb-4">
                Have an outfit concept? Post your custom brief or use the AI Studio to get tailor proposals.
              </p>
              <button
                onClick={() => setCurrentView('post-requirement')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-500 text-white font-bold text-xs uppercase shadow-md hover:from-pink-500 hover:to-rose-400 transition-all"
              >
                Post Your First Requirement
              </button>
            </div>
          ) : (
            requirements.map((req) => (
              <div
                key={req.id}
                className="p-5 sm:p-6 rounded-2xl bg-couture-900 border border-couture-800 hover:border-pink-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-sm"
              >
                <div className="flex items-start space-x-4">
                  {req.inspirationImageUrl ? (
                    <img
                      src={req.inspirationImageUrl}
                      alt={req.title}
                      className="w-16 h-20 sm:w-20 sm:h-24 rounded-xl object-cover ring-1 ring-couture-800 flex-shrink-0"
                    />
                  ) : (
                    <div className="w-16 h-20 sm:w-20 sm:h-24 rounded-xl bg-couture-950 border border-couture-800 flex items-center justify-center text-couture-400 text-xs flex-shrink-0 font-medium">
                      No Photo
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-bold text-pink-600 uppercase tracking-widest">
                        {req.clothingType}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                          req.status === 'OPEN'
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                            : req.status === 'AWARDED'
                            ? 'bg-pink-50 text-pink-600 border border-pink-200'
                            : 'bg-couture-850 text-couture-400'
                        }`}
                      >
                        {req.status}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-couture-200 hover:text-pink-600 transition-colors">
                      {req.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-couture-400">
                      <span className="font-semibold text-pink-600">
                        Budget: ₹{req.budgetMin?.toLocaleString('en-IN')} – ₹{req.budgetMax?.toLocaleString('en-IN')}
                      </span>
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
                      className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-500 hover:to-rose-400 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all"
                    >
                      <span>Compare Quotes ({req.quotationsCount || 0})</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}

                  {req.status === 'OPEN' && (
                    <button
                      onClick={() => handleCancelRequirement(req.id)}
                      className="text-xs text-couture-400 hover:text-rose-600 px-2 py-1 transition-colors font-medium"
                    >
                      Cancel Brief
                    </button>
                  )}

                  {req.status === 'AWARDED' && (
                    <span className="text-xs text-emerald-600 font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200">
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
            <div className="py-16 text-center rounded-2xl bg-couture-900 border border-couture-800 shadow-sm">
              <ShoppingBag className="w-10 h-10 text-couture-400 mx-auto mb-3" />
              <h3 className="font-serif text-lg font-bold text-couture-200">No active bespoke orders</h3>
              <p className="text-xs text-couture-400 max-w-sm mx-auto mt-1 leading-relaxed">
                When you accept a tailor quotation, your order and measurement fitting tracker will appear here.
              </p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="p-6 rounded-3xl bg-couture-900 border border-couture-800 shadow-sm space-y-6"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-couture-800 gap-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono font-semibold text-pink-600">
                        {order.orderNumber}
                      </span>
                      <span className="text-couture-300">•</span>
                      <span className="text-xs text-couture-400">
                        Boutique: <strong className="text-couture-200">{order.designerBrandName}</strong>
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-couture-200 mt-1">
                      {order.requirementTitle || 'Custom Bespoke Commission'}
                    </h3>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] uppercase text-couture-400 block font-medium">Agreed Fee</span>
                    <span className="font-serif text-xl font-bold text-pink-600">
                      ₹{order.totalAmount?.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Progress Stepper */}
                <OrderProgressTracker currentStatus={order.status} />

                {/* Tracking & Designer Production Notes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
                  <div className="p-3.5 rounded-2xl bg-couture-950 border border-couture-800 space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-pink-600 font-semibold block">
                      Production & Fitting Notes
                    </span>
                    <p className="text-couture-400 leading-relaxed">
                      {order.designerNotes || 'Patterns drafted. Fabric cutting underway.'}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-couture-950 border border-couture-800 space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-pink-600 font-semibold block">
                      Delivery Tracking
                    </span>
                    <div className="text-couture-400">
                      {order.trackingNumber ? (
                        <span className="flex items-center space-x-1 font-mono text-emerald-600 font-semibold">
                          <Truck className="w-3.5 h-3.5" />
                          <span>{order.trackingNumber}</span>
                        </span>
                      ) : (
                        <span>Tracking will update once finished garment is dispatched.</span>
                      )}
                    </div>
                    <span className="text-[10px] text-couture-400 block pt-0.5">
                      Target Completion: {order.deadline || 'Per agreement'}
                    </span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="pt-2 flex items-center justify-end space-x-3">
                  {order.status === 'SHIPPED' && (
                    <button
                      onClick={() => handleConfirmDelivery(order.id)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase shadow-sm"
                    >
                      Confirm Delivery Received
                    </button>
                  )}

                  {order.status === 'COMPLETED' && !order.reviewed && (
                    <button
                      onClick={() => setSelectedOrderForReview(order)}
                      className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-500 hover:to-rose-400 text-white font-bold text-xs uppercase shadow-md"
                    >
                      <Star className="w-3.5 h-3.5 fill-white" />
                      <span>Rate & Review Boutique</span>
                    </button>
                  )}

                  {order.reviewed && (
                    <span className="text-xs text-pink-600 font-semibold flex items-center space-x-1">
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
            <div className="py-16 text-center rounded-2xl bg-couture-900 border border-couture-800 shadow-sm">
              <Heart className="w-10 h-10 text-couture-400 mx-auto mb-3" />
              <h3 className="font-serif text-lg font-bold text-couture-200">No saved designs</h3>
              <p className="text-xs text-couture-400 max-w-sm mx-auto mt-1 leading-relaxed mb-4">
                Browse our curated ethnic lookbook and tap the heart icon to curate your personal style board.
              </p>
              <button
                onClick={() => setCurrentView('explore')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-500 text-white font-bold text-xs uppercase shadow-md hover:from-pink-500 hover:to-rose-400 transition-all"
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