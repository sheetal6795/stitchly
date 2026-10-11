import React, { useState, useEffect } from 'react';
import { 
  Scissors, 
  Layers, 
  ShoppingBag, 
  DollarSign, 
  Star, 
  Clock, 
  Plus, 
  Calendar, 
  Upload, 
  Truck, 
  Settings, 
  Send, 
  CheckCircle2, 
  X,
  ExternalLink,
  Edit,
  Trash2
} from 'lucide-react';
import { 
  designerApi, 
  requirementApi, 
  quotationApi, 
  orderApi, 
  designApi, 
  uploadApi 
} from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { OrderProgressTracker } from '../components/OrderProgressTracker';
import { SubmitQuotationModal } from '../components/SubmitQuotationModal';

export const DesignerDashboard = () => {
  const { user } = useAuth();
  const toast = useToast();

  const [activeTab, setActiveTab] = useState('marketplace'); // 'marketplace', 'orders', 'portfolio', 'profile'
  const [profile, setProfile] = useState(null);
  const [openRequirements, setOpenRequirements] = useState([]);
  const [orders, setOrders] = useState([]);
  const [myDesigns, setMyDesigns] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals & form state
  const [selectedReqForQuote, setSelectedReqForQuote] = useState(null);
  const [showAddDesignModal, setShowAddDesignModal] = useState(false);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [newOrderStatus, setNewOrderStatus] = useState('');
  const [newTrackingNumber, setNewTrackingNumber] = useState('');
  const [newDesignerNotes, setNewDesignerNotes] = useState('');

  // Add design form state
  const [designForm, setDesignForm] = useState({
    title: '',
    category: 'Evening Wear',
    price: '650',
    description: '',
    imageUrl: '',
    tags: '',
    estimatedDays: 14,
    featured: false,
  });
  const [uploadingDesignImg, setUploadingDesignImg] = useState(false);

  // Profile edit state
  const [profileForm, setProfileForm] = useState({
    brandName: '',
    bio: '',
    specialties: '',
    experienceYears: 5,
    location: '',
    pricingTier: '$$$',
    bannerUrl: '',
    instagramHandle: '',
  });

  useEffect(() => {
    loadDesignerWorkspace();
  }, []);

  const loadDesignerWorkspace = async () => {
    setLoading(true);
    try {
      const [profRes, reqsRes, ordersRes] = await Promise.all([
        designerApi.getMyProfile(),
        requirementApi.getOpen(),
        orderApi.getDesignerOrders(),
      ]);

      const prof = profRes.data;
      setProfile(prof);
      setOpenRequirements(reqsRes.data || []);
      setOrders(ordersRes.data || []);

      if (prof) {
        setProfileForm({
          brandName: prof.brandName || '',
          bio: prof.bio || '',
          specialties: prof.specialties || '',
          experienceYears: prof.experienceYears || 5,
          location: prof.location || '',
          pricingTier: prof.pricingTier || '$$$',
          bannerUrl: prof.bannerUrl || '',
          instagramHandle: prof.instagramHandle || '',
        });

        // Load designer's portfolio designs
        const designsRes = await designApi.getByDesigner(prof.id);
        setMyDesigns(designsRes.data || []);
      }
    } catch (err) {
      console.error('Error loading designer workspace', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOrderStatus = async (orderId) => {
    if (!newOrderStatus) return;

    try {
      await orderApi.updateStatus(orderId, {
        status: newOrderStatus,
        trackingNumber: newTrackingNumber || undefined,
        designerNotes: newDesignerNotes || undefined,
      });

      toast.success('Order milestone updated successfully!');
      setUpdatingOrderId(null);
      loadDesignerWorkspace();
    } catch (err) {
      toast.error(err.message || 'Failed to update order status');
    }
  };

  const handleDesignImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingDesignImg(true);
    try {
      const res = await uploadApi.uploadFile(file);
      if (res.data?.url) {
        setDesignForm(prev => ({ ...prev, imageUrl: res.data.url }));
        toast.success('Design photograph uploaded successfully!');
      }
    } catch (err) {
      toast.error('Image upload failed.');
    } finally {
      setUploadingDesignImg(false);
    }
  };

  const handleCreateDesign = async (e) => {
    e.preventDefault();
    if (!designForm.title || !designForm.imageUrl || !designForm.price) {
      toast.error('Please fill in title, price, and image.');
      return;
    }

    try {
      await designApi.create({
        ...designForm,
        price: parseFloat(designForm.price),
        estimatedDays: parseInt(designForm.estimatedDays),
      });

      toast.success('New portfolio piece published!');
      setShowAddDesignModal(false);
      setDesignForm({
        title: '',
        category: 'Evening Wear',
        price: '650',
        description: '',
        imageUrl: '',
        tags: '',
        estimatedDays: 14,
        featured: false,
      });
      loadDesignerWorkspace();
    } catch (err) {
      toast.error(err.message || 'Failed to create design');
    }
  };

  const handleDeleteDesign = async (id) => {
    if (!window.confirm('Delete this design from your atelier showcase?')) return;
    try {
      await designApi.delete(id);
      toast.success('Design removed.');
      loadDesignerWorkspace();
    } catch (err) {
      toast.error('Failed to delete design');
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await designerApi.updateProfile(profileForm);
      setProfile(res.data);
      toast.success('Atelier profile updated!');
    } catch (err) {
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Atelier Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-couture-900 via-couture-950 to-couture-900 border border-couture-800 p-6 sm:p-8 mb-8 shadow-card-dark flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <img
            src={profile?.avatarUrl || user?.avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"}
            alt={profile?.brandName}
            className="w-16 h-16 rounded-full object-cover ring-2 ring-gold-500/70 shadow-lg"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-serif text-2xl font-bold text-white">
                {profile?.brandName || `${user?.name} Atelier`}
              </h1>
              {profile?.verified ? (
                <span className="flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Verified</span>
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Pending Verification
                </span>
              )}
            </div>
            <p className="text-xs text-couture-400 mt-1">
              {profile?.location || 'Global Atelier'} • {profile?.experienceYears || 5} Years Bespoke Craftsmanship
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddDesignModal(true)}
          className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-amber-400 text-couture-950 font-bold text-xs uppercase tracking-wider shadow-glow-gold transition-all self-start md:self-center"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add Portfolio Piece</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-couture-900/60 border border-couture-800">
          <span className="text-xs text-couture-400 block mb-1">Open Client Briefs</span>
          <span className="font-serif text-2xl font-bold text-gold-400">
            {openRequirements.length}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-couture-900/60 border border-couture-800">
          <span className="text-xs text-couture-400 block mb-1">Commissions in Work</span>
          <span className="font-serif text-2xl font-bold text-white">
            {orders.filter(o => o.status !== 'COMPLETED' && o.status !== 'CANCELLED').length}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-couture-900/60 border border-couture-800">
          <span className="text-xs text-couture-400 block mb-1">Atelier Rating</span>
          <span className="font-serif text-2xl font-bold text-champagne-300 flex items-center space-x-1">
            <Star className="w-5 h-5 fill-gold-400 text-gold-400" />
            <span>{profile?.ratingAverage?.toFixed(1) || '5.0'}</span>
            <span className="text-xs font-sans text-couture-500 font-normal">({profile?.reviewCount || 0})</span>
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-couture-900/60 border border-couture-800">
          <span className="text-xs text-couture-400 block mb-1">Showcase Pieces</span>
          <span className="font-serif text-2xl font-bold text-white">
            {myDesigns.length}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-couture-800 mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('marketplace')}
          className={`pb-3 px-4 text-sm font-semibold transition-all relative flex-shrink-0 ${
            activeTab === 'marketplace' ? 'text-gold-400' : 'text-couture-400 hover:text-white'
          }`}
        >
          <span>Marketplace Briefs ({openRequirements.length})</span>
          {activeTab === 'marketplace' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-400" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 px-4 text-sm font-semibold transition-all relative flex-shrink-0 ${
            activeTab === 'orders' ? 'text-gold-400' : 'text-couture-400 hover:text-white'
          }`}
        >
          <span>Production & Fittings ({orders.length})</span>
          {activeTab === 'orders' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-400" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('portfolio')}
          className={`pb-3 px-4 text-sm font-semibold transition-all relative flex-shrink-0 ${
            activeTab === 'portfolio' ? 'text-gold-400' : 'text-couture-400 hover:text-white'
          }`}
        >
          <span>My Showcase ({myDesigns.length})</span>
          {activeTab === 'portfolio' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-400" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 px-4 text-sm font-semibold transition-all relative flex-shrink-0 ${
            activeTab === 'profile' ? 'text-gold-400' : 'text-couture-400 hover:text-white'
          }`}
        >
          <span>Atelier Settings</span>
          {activeTab === 'profile' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-400" />
          )}
        </button>
      </div>

      {/* Tab 1: Marketplace Requirements Feed */}
      {activeTab === 'marketplace' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-couture-400">
              Review open client briefs. Submit tailored proposals with your exact pricing and fabric recommendations.
            </p>
          </div>

          {openRequirements.length === 0 ? (
            <div className="py-16 text-center rounded-2xl bg-couture-900/40 border border-couture-800/80">
              <Scissors className="w-10 h-10 text-couture-500 mx-auto mb-3" />
              <h3 className="font-serif text-lg font-bold text-white">No open client requirements currently</h3>
              <p className="text-xs text-couture-400 max-w-sm mx-auto mt-1 leading-relaxed">
                When clients post custom requests, they appear here immediately for you to bid on.
              </p>
            </div>
          ) : (
            openRequirements.map((req) => (
              <div
                key={req.id}
                className="p-6 rounded-2xl bg-couture-900/70 border border-couture-800 hover:border-gold-500/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-card-dark"
              >
                <div className="flex items-start space-x-4">
                  {req.inspirationImageUrl ? (
                    <img
                      src={req.inspirationImageUrl}
                      alt={req.title}
                      className="w-20 h-24 rounded-xl object-cover ring-1 ring-couture-700 flex-shrink-0"
                    />
                  ) : (
                    <div className="w-20 h-24 rounded-xl bg-couture-950 border border-couture-800 flex items-center justify-center text-couture-500 text-xs flex-shrink-0">
                      No Photo
                    </div>
                  )}

                  <div className="space-y-1.5 max-w-xl">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-semibold text-gold-400 uppercase tracking-widest">
                        {req.clothingType}
                      </span>
                      <span className="text-[10px] text-couture-400">
                        Client: {req.customerName || 'Private Patron'}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-white">
                      {req.title}
                    </h3>

                    <p className="text-xs text-couture-300 line-clamp-2 leading-relaxed">
                      {req.notes || 'No extra notes provided.'}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-couture-400 pt-1">
                      <span className="text-champagne-300 font-semibold">
                        Budget: ${req.budgetMin} – ${req.budgetMax}
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

                <div className="flex items-center space-x-3 pt-3 md:pt-0 border-t md:border-t-0 border-couture-800 flex-shrink-0">
                  <button
                    onClick={() => setSelectedReqForQuote(req)}
                    className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-amber-400 text-couture-950 font-bold text-xs uppercase tracking-wider shadow-glow-gold transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Quotation</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Orders in Production */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="py-16 text-center rounded-2xl bg-couture-900/40 border border-couture-800/80">
              <ShoppingBag className="w-10 h-10 text-couture-500 mx-auto mb-3" />
              <h3 className="font-serif text-lg font-bold text-white">No commissions currently in production</h3>
              <p className="text-xs text-couture-400 max-w-sm mx-auto mt-1 leading-relaxed">
                When clients accept your quotes, orders will appear here for you to advance through fitting stages.
              </p>
            </div>
          ) : (
            orders.map((order) => {
              const isUpdating = updatingOrderId === order.id;

              return (
                <div
                  key={order.id}
                  className="p-6 rounded-3xl bg-couture-900/70 border border-couture-800 shadow-card-dark space-y-6"
                >
                  {/* Top info */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-couture-800/80 gap-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono font-semibold text-gold-400">
                          {order.orderNumber}
                        </span>
                        <span className="text-couture-500">•</span>
                        <span className="text-xs text-couture-300">
                          Client: <strong className="text-white">{order.customerName}</strong> ({order.customerEmail})
                        </span>
                      </div>
                      <h3 className="font-serif text-lg font-bold text-white mt-1">
                        {order.requirementTitle || 'Custom Commission'}
                      </h3>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] uppercase text-couture-500 block">Agreed Total</span>
                      <span className="font-serif text-xl font-bold text-champagne-300">
                        ${order.totalAmount?.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Progress Stepper */}
                  <OrderProgressTracker currentStatus={order.status} />

                  {/* Shipping address & current status notes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
                    <div className="p-3.5 rounded-xl bg-couture-950/80 border border-couture-800 space-y-1">
                      <span className="text-[10px] uppercase tracking-wider text-gold-400 font-semibold block">
                        Delivery Destination
                      </span>
                      <p className="text-couture-200">
                        {order.shippingAddress || 'Address on file'}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-couture-950/80 border border-couture-800 space-y-1">
                      <span className="text-[10px] uppercase tracking-wider text-gold-400 font-semibold block">
                        Current Status Note & Courier
                      </span>
                      <p className="text-couture-300">
                        {order.designerNotes || 'Initial pattern drafted.'}
                      </p>
                      {order.trackingNumber && (
                        <p className="font-mono text-emerald-400 mt-1">
                          Tracking: {order.trackingNumber}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Advance status section */}
                  {isUpdating ? (
                    <div className="p-4 rounded-2xl bg-couture-950 border border-gold-500/40 space-y-4">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                        Update Order Milestone
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] text-couture-400 mb-1">New Milestone</label>
                          <select
                            value={newOrderStatus}
                            onChange={(e) => setNewOrderStatus(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-couture-900 border border-couture-700 text-white text-xs"
                          >
                            <option value="MEASUREMENTS_CONFIRMED">Measurements Confirmed</option>
                            <option value="IN_PRODUCTION">In Production (Cutting & Sewing)</option>
                            <option value="FITTINGS_READY">Fittings Ready (Muslin Toile)</option>
                            <option value="SHIPPED">Shipped via Courier</option>
                            <option value="COMPLETED">Completed</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] text-couture-400 mb-1">Tracking Number</label>
                          <input
                            type="text"
                            value={newTrackingNumber}
                            onChange={(e) => setNewTrackingNumber(e.target.value)}
                            placeholder="e.g. FEDEX-8921-9871"
                            className="w-full px-3 py-2 rounded-lg bg-couture-900 border border-couture-700 text-white text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] text-couture-400 mb-1">Production Note</label>
                          <input
                            type="text"
                            value={newDesignerNotes}
                            onChange={(e) => setNewDesignerNotes(e.target.value)}
                            placeholder="e.g. Toile fitted, outer silk stitched..."
                            className="w-full px-3 py-2 rounded-lg bg-couture-900 border border-couture-700 text-white text-xs"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-end space-x-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setUpdatingOrderId(null)}
                          className="px-3 py-1.5 rounded-lg text-xs text-couture-400 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUpdateOrderStatus(order.id)}
                          className="px-4 py-1.5 rounded-lg bg-gold-500 text-couture-950 font-bold text-xs uppercase"
                        >
                          Save Update
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="pt-2 flex items-center justify-end">
                      <button
                        onClick={() => {
                          setUpdatingOrderId(order.id);
                          setNewOrderStatus(order.status);
                          setNewTrackingNumber(order.trackingNumber || '');
                          setNewDesignerNotes(order.designerNotes || '');
                        }}
                        className="px-4 py-2 rounded-xl bg-couture-800 hover:bg-couture-700 text-couture-200 text-xs font-semibold border border-couture-600 transition-colors"
                      >
                        Advance Order Milestone →
                      </button>
                    </div>
                  )}

                </div>
              );
            })
          )}
        </div>
      )}

      {/* Tab 3: My Portfolio & Designs */}
      {activeTab === 'portfolio' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-xs text-couture-400">
              Designs displayed on your public atelier profile and the Stitchly explore catalog.
            </p>
            <button
              onClick={() => setShowAddDesignModal(true)}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gold-500 text-couture-950 font-bold text-xs uppercase"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Piece</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myDesigns.map((design) => (
              <div
                key={design.id}
                className="bg-couture-900/60 rounded-2xl overflow-hidden border border-couture-800 flex flex-col justify-between"
              >
                <div className="relative aspect-[3/4] w-full bg-couture-950">
                  <img
                    src={design.imageUrl}
                    alt={design.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-couture-950/80 text-gold-300">
                    {design.category}
                  </div>
                  <button
                    onClick={() => handleDeleteDesign(design.id)}
                    className="absolute top-3 right-3 p-1.5 rounded-full bg-black/70 text-couture-400 hover:text-red-400 transition-colors"
                    title="Delete piece"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-4 space-y-2">
                  <h4 className="font-serif text-base font-bold text-white truncate">
                    {design.title}
                  </h4>
                  <p className="text-xs text-couture-400 line-clamp-2">
                    {design.description}
                  </p>
                  <div className="pt-2 border-t border-couture-800 flex items-center justify-between">
                    <span className="font-serif text-lg font-bold text-champagne-300">
                      ${design.price}
                    </span>
                    <span className="text-xs text-couture-500">
                      {design.likesCount || 0} saves
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Atelier Settings */}
      {activeTab === 'profile' && (
        <div className="max-w-2xl bg-couture-900/70 border border-couture-800 rounded-3xl p-6 sm:p-8 shadow-card-dark">
          <h3 className="font-serif text-xl font-bold text-white mb-6">
            Atelier Profile & Specialties
          </h3>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-couture-300 uppercase tracking-wider mb-1.5">
                Brand / Atelier Name
              </label>
              <input
                type="text"
                required
                value={profileForm.brandName}
                onChange={(e) => setProfileForm({ ...profileForm, brandName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-couture-950 border border-couture-700 text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-couture-300 uppercase tracking-wider mb-1.5">
                Bio & Design Philosophy
              </label>
              <textarea
                rows="4"
                value={profileForm.bio}
                onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                className="w-full p-3 rounded-xl bg-couture-950 border border-couture-700 text-white text-sm leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-couture-300 uppercase tracking-wider mb-1.5">
                  Location (City/Country)
                </label>
                <input
                  type="text"
                  value={profileForm.location}
                  onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-couture-950 border border-couture-700 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-couture-300 uppercase tracking-wider mb-1.5">
                  Years of Experience
                </label>
                <input
                  type="number"
                  value={profileForm.experienceYears}
                  onChange={(e) => setProfileForm({ ...profileForm, experienceYears: parseInt(e.target.value) || 0 })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-couture-950 border border-couture-700 text-white text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-couture-300 uppercase tracking-wider mb-1.5">
                Specialties (Comma Separated)
              </label>
              <input
                type="text"
                value={profileForm.specialties}
                onChange={(e) => setProfileForm({ ...profileForm, specialties: e.target.value })}
                placeholder="e.g. Evening Wear, Haute Couture, Silk Draping, Corsetry"
                className="w-full px-3.5 py-2.5 rounded-xl bg-couture-950 border border-couture-700 text-white text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-couture-300 uppercase tracking-wider mb-1.5">
                  Pricing Tier
                </label>
                <select
                  value={profileForm.pricingTier}
                  onChange={(e) => setProfileForm({ ...profileForm, pricingTier: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-couture-950 border border-couture-700 text-white text-sm"
                >
                  <option value="$">$ (Accessible)</option>
                  <option value="$$">$$ (Moderate Bespoke)</option>
                  <option value="$$$">$$$ (Haute Couture)</option>
                  <option value="$$$$">$$$$ (Ultra Luxury)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-couture-300 uppercase tracking-wider mb-1.5">
                  Instagram Handle
                </label>
                <input
                  type="text"
                  value={profileForm.instagramHandle}
                  onChange={(e) => setProfileForm({ ...profileForm, instagramHandle: e.target.value })}
                  placeholder="@atelier_name"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-couture-950 border border-couture-700 text-white text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-couture-300 uppercase tracking-wider mb-1.5">
                Banner Cover Image URL
              </label>
              <input
                type="url"
                value={profileForm.bannerUrl}
                onChange={(e) => setProfileForm({ ...profileForm, bannerUrl: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-couture-950 border border-couture-700 text-white text-sm"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-couture-950 font-bold text-xs uppercase tracking-wider shadow-glow-gold"
              >
                Save Atelier Settings
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal: Submit Quotation */}
      {selectedReqForQuote && (
        <SubmitQuotationModal
          requirement={selectedReqForQuote}
          isOpen={true}
          onClose={() => setSelectedReqForQuote(null)}
          onSuccess={loadDesignerWorkspace}
        />
      )}

      {/* Modal: Add Design Portfolio Piece */}
      {showAddDesignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-lg bg-couture-900 border border-couture-800 rounded-2xl shadow-card-dark p-6 space-y-5 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-couture-800">
              <h3 className="font-serif text-lg font-bold text-white">
                Add Piece to Portfolio
              </h3>
              <button
                onClick={() => setShowAddDesignModal(false)}
                className="p-1 text-couture-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateDesign} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-couture-300 mb-1">Design Title *</label>
                <input
                  type="text"
                  required
                  value={designForm.title}
                  onChange={(e) => setDesignForm({ ...designForm, title: e.target.value })}
                  placeholder="e.g. The Luminary Silk Crepe Gown"
                  className="w-full px-3 py-2 rounded-xl bg-couture-950 border border-couture-700 text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-couture-300 mb-1">Category *</label>
                  <select
                    value={designForm.category}
                    onChange={(e) => setDesignForm({ ...designForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-couture-950 border border-couture-700 text-white text-xs"
                  >
                    <option value="Evening Wear">Evening Wear</option>
                    <option value="Bridal">Bridal</option>
                    <option value="Suits & Tailoring">Suits & Tailoring</option>
                    <option value="Traditional/Ethnic">Traditional/Ethnic</option>
                    <option value="Resort Wear">Resort Wear</option>
                    <option value="Cocktail">Cocktail</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-couture-300 mb-1">Base Price ($) *</label>
                  <input
                    type="number"
                    step="10"
                    required
                    value={designForm.price}
                    onChange={(e) => setDesignForm({ ...designForm, price: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-couture-950 border border-couture-700 text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-couture-300 mb-1">Image (Upload or URL) *</label>
                <div className="space-y-2">
                  <input
                    type="url"
                    required
                    value={designForm.imageUrl}
                    onChange={(e) => setDesignForm({ ...designForm, imageUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 rounded-xl bg-couture-950 border border-couture-700 text-white text-xs"
                  />
                  <label className="cursor-pointer inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-couture-800 text-couture-200 text-xs font-medium">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingDesignImg ? 'Uploading...' : 'Upload from Device'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleDesignImageUpload}
                      disabled={uploadingDesignImg}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-couture-300 mb-1">Description & Craftsmanship</label>
                <textarea
                  rows="3"
                  value={designForm.description}
                  onChange={(e) => setDesignForm({ ...designForm, description: e.target.value })}
                  placeholder="Detail the fabrics, seam finishes, and lining construction..."
                  className="w-full p-2.5 rounded-xl bg-couture-950 border border-couture-700 text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-couture-300 mb-1">Tags</label>
                  <input
                    type="text"
                    value={designForm.tags}
                    onChange={(e) => setDesignForm({ ...designForm, tags: e.target.value })}
                    placeholder="silk, corset, bespoke"
                    className="w-full px-3 py-2 rounded-xl bg-couture-950 border border-couture-700 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-couture-300 mb-1">Estimated Days</label>
                  <input
                    type="number"
                    value={designForm.estimatedDays}
                    onChange={(e) => setDesignForm({ ...designForm, estimatedDays: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-couture-950 border border-couture-700 text-white text-xs"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-couture-800 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddDesignModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-couture-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gold-500 text-couture-950 font-bold text-xs uppercase"
                >
                  Publish Piece
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
