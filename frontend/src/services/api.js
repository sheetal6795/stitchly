import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('stitchly_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to catch unauthorized responses
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token if expired/unauthorized
      const hadToken = !!localStorage.getItem('stitchly_token');
      localStorage.removeItem('stitchly_token');
      localStorage.removeItem('stitchly_user');
      if (hadToken && !window.location.pathname.includes('/login')) {
        window.dispatchEvent(new Event('stitchly_auth_logout'));
      }
    }
    const message = error.response?.data?.message || error.response?.data?.error || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

// Auth Endpoints
export const authApi = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getCurrentUser: () => api.get('/auth/me'),
};

// Designers Endpoints
export const designerApi = {
  getAll: (params) => api.get('/designers', { params }),
  getById: (id) => api.get(`/designers/${id}`),
  getMyProfile: () => api.get('/designer/me'),
  updateProfile: (data) => api.put('/designer/profile', data),
};

// Designs Endpoints
export const designApi = {
  getAll: (params) => api.get('/designs', { params }),
  getFeatured: () => api.get('/designs/featured'),
  getByDesigner: (designerId) => api.get(`/designs/designer/${designerId}`),
  getById: (id) => api.get(`/designs/${id}`),
  create: (data) => api.post('/designs', data),
  update: (id, data) => api.put(`/designs/${id}`, data),
  delete: (id) => api.delete(`/designs/${id}`),
  toggleLike: (id) => api.post(`/designs/${id}/like`),
  getMyLikes: () => api.get('/designs/my-likes'),
  report: (id) => api.post(`/designs/${id}/report`),
};

// Custom Requirements Endpoints
export const requirementApi = {
  create: (data) => api.post('/requirements', data),
  getMyRequirements: () => api.get('/requirements/my'),
  getOpen: (params) => api.get('/requirements/open', { params }),
  getById: (id) => api.get(`/requirements/${id}`),
  cancel: (id) => api.put(`/requirements/${id}/cancel`),
};

// Quotations Endpoints
export const quotationApi = {
  submit: (data) => api.post('/quotations', data),
  getByRequirement: (requirementId) => api.get(`/quotations/requirement/${requirementId}`),
  getMyQuotations: () => api.get('/quotations/my'),
  accept: (id, data) => api.post(`/quotations/${id}/accept`, data),
};

// Orders Endpoints
export const orderApi = {
  getCustomerOrders: () => api.get('/orders/customer'),
  getDesignerOrders: () => api.get('/orders/designer'),
  getById: (id) => api.get(`/orders/${id}`),
  updateStatus: (id, data) => api.put(`/orders/${id}/status`, data),
};

// Reviews Endpoints
export const reviewApi = {
  submit: (data) => api.post('/reviews', data),
  getByDesigner: (designerId) => api.get(`/reviews/designer/${designerId}`),
};

// AI Assistant Endpoints
export const aiApi = {
  consult: (data) => api.post('/ai/consult', data),
};

// Admin Endpoints
export const adminApi = {
  getStats: () => api.get('/admin/stats'),
  getUsers: () => api.get('/admin/users'),
  toggleUserStatus: (id) => api.put(`/admin/users/${id}/toggle-status`),
  getPendingDesigners: () => api.get('/admin/designers/pending'),
  verifyDesigner: (id, verified) => api.put(`/admin/designers/${id}/verify`, { verified }),
  getReportedDesigns: () => api.get('/admin/designs/reported'),
  dismissReport: (id) => api.put(`/admin/designs/${id}/dismiss-report`),
  getAllOrders: () => api.get('/admin/orders'),
};

// File Upload
export const uploadApi = {
  uploadFile: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/uploads', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

export default api;
