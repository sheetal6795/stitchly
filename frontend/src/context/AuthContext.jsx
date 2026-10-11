import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('stitchly_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('stitchly_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLogoutEvent = () => {
      setUser(null);
      setToken(null);
    };

    window.addEventListener('stitchly_auth_logout', handleLogoutEvent);
    return () => window.removeEventListener('stitchly_auth_logout', handleLogoutEvent);
  }, []);

  useEffect(() => {
    const verifyUser = async () => {
      if (token) {
        try {
          const res = await authApi.getCurrentUser();
          if (res.data) {
            setUser(res.data);
            localStorage.setItem('stitchly_user', JSON.stringify(res.data));
          }
        } catch (err) {
          console.error('Session expired or invalid', err);
          logout();
        }
      }
      setLoading(false);
    };

    verifyUser();
  }, [token]);

  const login = async (email, password) => {
    const res = await authApi.login({ email, password });
    if (res.data?.token) {
      const jwtToken = res.data.token;
      const userData = res.data.user;
      localStorage.setItem('stitchly_token', jwtToken);
      localStorage.setItem('stitchly_user', JSON.stringify(userData));
      setToken(jwtToken);
      setUser(userData);
      return userData;
    }
    throw new Error('Invalid response from server');
  };

  const register = async (formData) => {
    const res = await authApi.register(formData);
    if (res.data?.token) {
      const jwtToken = res.data.token;
      const userData = res.data.user;
      localStorage.setItem('stitchly_token', jwtToken);
      localStorage.setItem('stitchly_user', JSON.stringify(userData));
      setToken(jwtToken);
      setUser(userData);
      return userData;
    }
    throw new Error('Registration failed');
  };

  const logout = () => {
    localStorage.removeItem('stitchly_token');
    localStorage.removeItem('stitchly_user');
    setToken(null);
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      const res = await authApi.getCurrentUser();
      if (res.data) {
        setUser(res.data);
        localStorage.setItem('stitchly_user', JSON.stringify(res.data));
      }
    } catch (err) {
      console.error('Failed to refresh user', err);
    }
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    role: user?.role || null,
    isCustomer: user?.role === 'ROLE_CUSTOMER',
    isDesigner: user?.role === 'ROLE_DESIGNER',
    isAdmin: user?.role === 'ROLE_ADMIN',
    loading,
    login,
    register,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
