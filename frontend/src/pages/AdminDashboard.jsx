import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Scissors, 
  DollarSign, 
  ShoppingBag, 
  AlertTriangle, 
  Check, 
  X, 
  Clock, 
  RefreshCw,
  Search
} from 'lucide-react';
import { adminApi } from '../services/api';
import { useToast } from '../context/ToastContext';

export const AdminDashboard = () => {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState('verifications'); // 'verifications', 'users', 'moderation', 'orders'
  const [stats, setStats] = useState(null);
  const [pendingDesigners, setPendingDesigners] = useState([]);
  const [users, setUsers] = useState([]);
  const [reportedDesigns, setReportedDesigns] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userSearch, setUserSearch] = useState('');

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [statsRes, pendingRes, usersRes, repRes, ordersRes] = await Promise.all([
        adminApi.getStats(),
        adminApi.getPendingDesigners(),
        adminApi.getUsers(),
        adminApi.getReportedDesigns(),
        adminApi.getAllOrders()
      ]);

      setStats(statsRes.data);
      setPendingDesigners(pendingRes.data || []);
      setUsers(usersRes.data || []);
      setReportedDesigns(repRes.data || []);
      setOrders(ordersRes.data || []);
    } catch (err) {
      console.error('Failed to load admin portal data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyDesigner = async (designerId, verified) => {
    try {
      await adminApi.verifyDesigner(designerId, verified);
      toast.success(verified ? 'Atelier verified successfully!' : 'Verification rejected.');
      loadAdminData();
    } catch (err) {
      toast.error('Failed to update verification status');
    }
  };

  const handleToggleUserStatus = async (userId) => {
    try {
      await adminApi.toggleUserStatus(userId);
      toast.success('User status toggled');
      loadAdminData();
    } catch (err) {
      toast.error('Failed to toggle user status');
    }
  };

  const handleDismissReport = async (designId) => {
    try {
      await adminApi.dismissReport(designId);
      toast.success('Report dismissed');
      loadAdminData();
    } catch (err) {
      toast.error('Failed to dismiss report');
    }
  };

  const filteredUsers = users.filter(u => 
    u.name?.toLowerCase().includes(userSearch.toLowerCase()) || 
    u.email?.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Admin Portal Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-couture-800 mb-8 gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-semibold text-purple-400 uppercase tracking-widest block">
              Governance & Oversight
            </span>
            <h1 className="font-serif text-2xl font-bold text-white">
              Stitchly Administrator Portal
            </h1>
          </div>
        </div>

        <button
          onClick={loadAdminData}
          className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-couture-900 border border-couture-700 text-xs text-couture-300 hover:text-white"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-couture-900/60 border border-couture-800">
          <span className="text-[11px] text-couture-400 block mb-1">Total Users</span>
          <span className="font-serif text-2xl font-bold text-white">
            {stats?.totalUsers || 0}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-couture-900/60 border border-couture-800">
          <span className="text-[11px] text-couture-400 block mb-1">Verified Ateliers</span>
          <span className="font-serif text-2xl font-bold text-emerald-400">
            {stats?.verifiedDesigners || 0}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-couture-900/60 border border-couture-800">
          <span className="text-[11px] text-couture-400 block mb-1">Pending Review</span>
          <span className="font-serif text-2xl font-bold text-amber-400">
            {stats?.pendingVerifications || 0}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-couture-900/60 border border-couture-800">
          <span className="text-[11px] text-couture-400 block mb-1">Briefs Posted</span>
          <span className="font-serif text-2xl font-bold text-gold-400">
            {stats?.totalRequirements || 0}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-couture-900/60 border border-couture-800">
          <span className="text-[11px] text-couture-400 block mb-1">Platform GMV</span>
          <span className="font-serif text-xl font-bold text-champagne-300">
            ${stats?.grossMerchandiseValue?.toLocaleString() || '0'}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-couture-900/60 border border-couture-800">
          <span className="text-[11px] text-couture-400 block mb-1">Reported Items</span>
          <span className="font-serif text-2xl font-bold text-red-400">
            {stats?.reportedDesignsCount || 0}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-couture-800 mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('verifications')}
          className={`pb-3 px-4 text-sm font-semibold transition-all relative flex-shrink-0 ${
            activeTab === 'verifications' ? 'text-purple-400' : 'text-couture-400 hover:text-white'
          }`}
        >
          <span>Designer Verification Queue ({pendingDesigners.length})</span>
          {activeTab === 'verifications' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-400" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`pb-3 px-4 text-sm font-semibold transition-all relative flex-shrink-0 ${
            activeTab === 'users' ? 'text-purple-400' : 'text-couture-400 hover:text-white'
          }`}
        >
          <span>Platform Users ({users.length})</span>
          {activeTab === 'users' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-400" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 px-4 text-sm font-semibold transition-all relative flex-shrink-0 ${
            activeTab === 'orders' ? 'text-purple-400' : 'text-couture-400 hover:text-white'
          }`}
        >
          <span>All Platform Orders ({orders.length})</span>
          {activeTab === 'orders' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-400" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('moderation')}
          className={`pb-3 px-4 text-sm font-semibold transition-all relative flex-shrink-0 ${
            activeTab === 'moderation' ? 'text-purple-400' : 'text-couture-400 hover:text-white'
          }`}
        >
          <span>Content Moderation ({reportedDesigns.length})</span>
          {activeTab === 'moderation' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-400" />
          )}
        </button>
      </div>

      {/* Tab 1: Verification Queue */}
      {activeTab === 'verifications' && (
        <div className="space-y-4">
          {pendingDesigners.length === 0 ? (
            <div className="py-16 text-center rounded-2xl bg-couture-900/40 border border-couture-800">
              <Check className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
              <h3 className="font-serif text-lg font-bold text-white">All designer applications reviewed</h3>
              <p className="text-xs text-couture-400 mt-1">No unverified designers awaiting approval.</p>
            </div>
          ) : (
            pendingDesigners.map((designer) => (
              <div
                key={designer.id}
                className="p-6 rounded-2xl bg-couture-900/70 border border-couture-800 hover:border-purple-500/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={designer.avatarUrl || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80"}
                    alt={designer.brandName}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-amber-500/50 flex-shrink-0"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-serif text-lg font-bold text-white">
                        {designer.brandName}
                      </h3>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold uppercase">
                        Unverified
                      </span>
                    </div>
                    <p className="text-xs text-couture-400">
                      Designer: {designer.designerName} • Email: {designer.email} • Location: {designer.location}
                    </p>
                    <p className="text-xs text-couture-300 italic pt-1">
                      "{designer.bio}"
                    </p>
                    <div className="text-[11px] text-couture-400 pt-1">
                      <span className="text-purple-400 font-semibold">Specialties:</span> {designer.specialties}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 pt-3 md:pt-0 border-t md:border-t-0 border-couture-800">
                  <button
                    onClick={() => handleVerifyDesigner(designer.id, true)}
                    className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-couture-950 font-bold text-xs uppercase transition-all"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Approve & Verify</span>
                  </button>
                  <button
                    onClick={() => handleVerifyDesigner(designer.id, false)}
                    className="px-4 py-2.5 rounded-xl bg-couture-800 hover:bg-couture-700 text-couture-400 hover:text-white text-xs font-semibold transition-colors"
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Users Management */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative max-w-sm w-full">
              <Search className="absolute top-3 left-3 w-4 h-4 text-couture-500" />
              <input
                type="text"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="Search users by name or email..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-couture-950 border border-couture-800 text-white text-xs placeholder-couture-600 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-couture-800 bg-couture-900/70">
            <table className="w-full text-left text-xs text-couture-300">
              <thead className="bg-couture-950/80 text-[10px] uppercase font-bold text-couture-500 border-b border-couture-800">
                <tr>
                  <th className="p-4">User</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-couture-800/60">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-couture-850/40">
                    <td className="p-4 flex items-center space-x-3">
                      <img
                        src={u.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"}
                        alt={u.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="font-semibold text-white">{u.name}</span>
                    </td>
                    <td className="p-4 text-couture-400">{u.email}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-couture-800 text-couture-200">
                        {u.role?.replace('ROLE_', '')}
                      </span>
                    </td>
                    <td className="p-4">
                      {u.active ? (
                        <span className="text-emerald-400 font-semibold">Active</span>
                      ) : (
                        <span className="text-red-400 font-semibold">Disabled</span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleToggleUserStatus(u.id)}
                        className={`text-xs px-3 py-1 rounded-lg font-medium border ${
                          u.active
                            ? 'border-red-500/30 text-red-300 hover:bg-red-500/10'
                            : 'border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10'
                        }`}
                      >
                        {u.active ? 'Disable' : 'Enable'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Orders Monitoring */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="overflow-x-auto rounded-2xl border border-couture-800 bg-couture-900/70">
            <table className="w-full text-left text-xs text-couture-300">
              <thead className="bg-couture-950/80 text-[10px] uppercase font-bold text-couture-500 border-b border-couture-800">
                <tr>
                  <th className="p-4">Order #</th>
                  <th className="p-4">Client</th>
                  <th className="p-4">Atelier</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Milestone</th>
                  <th className="p-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-couture-800/60">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-couture-850/40">
                    <td className="p-4 font-mono font-bold text-purple-400">{o.orderNumber}</td>
                    <td className="p-4 text-white font-medium">{o.customerName}</td>
                    <td className="p-4 text-gold-300">{o.designerBrandName}</td>
                    <td className="p-4 font-serif font-bold text-champagne-300">${o.totalAmount}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-couture-800 text-couture-200">
                        {o.status}
                      </span>
                    </td>
                    <td className="p-4 text-couture-500">
                      {o.createdAt?.substring(0, 10)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Moderation */}
      {activeTab === 'moderation' && (
        <div className="space-y-4">
          {reportedDesigns.length === 0 ? (
            <div className="py-16 text-center rounded-2xl bg-couture-900/40 border border-couture-800">
              <Check className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
              <h3 className="font-serif text-lg font-bold text-white">No reported content</h3>
              <p className="text-xs text-couture-400 mt-1">Platform design catalog is clean and compliant.</p>
            </div>
          ) : (
            reportedDesigns.map((d) => (
              <div
                key={d.id}
                className="p-5 rounded-2xl bg-couture-900 border border-red-500/30 flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <img src={d.imageUrl} alt={d.title} className="w-14 h-16 rounded-lg object-cover" />
                  <div>
                    <h4 className="font-serif font-bold text-white">{d.title}</h4>
                    <p className="text-xs text-couture-400">Atelier: {d.designerBrandName} • ${d.price}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDismissReport(d.id)}
                  className="px-3 py-1.5 rounded-lg bg-couture-800 text-xs text-couture-300 hover:text-white"
                >
                  Dismiss Report
                </button>
              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
};
