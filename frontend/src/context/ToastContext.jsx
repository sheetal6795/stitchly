import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = {
    success: (msg, duration) => addToast(msg, 'success', duration),
    error: (msg, duration) => addToast(msg, 'error', duration),
    info: (msg, duration) => addToast(msg, 'info', duration),
    warning: (msg, duration) => addToast(msg, 'warning', duration),
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast Notification Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 pointer-events-none max-w-sm w-full px-4">
        {toasts.map((item) => (
          <div
            key={item.id}
            className={`pointer-events-auto flex items-start space-x-3 p-4 rounded-xl shadow-card-dark border backdrop-blur-md transition-all duration-300 transform translate-y-0 ${
              item.type === 'success'
                ? 'bg-couture-900/95 border-emerald-500/40 text-emerald-300'
                : item.type === 'error'
                ? 'bg-couture-900/95 border-red-500/40 text-red-300'
                : 'bg-couture-900/95 border-gold-500/40 text-champagne-200'
            }`}
          >
            <div className="flex-shrink-0 mt-0.5">
              {item.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {item.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400" />}
              {(item.type === 'info' || item.type === 'warning') && <Info className="w-5 h-5 text-gold-400" />}
            </div>
            <div className="flex-1 text-sm font-medium leading-snug">{item.message}</div>
            <button
              onClick={() => removeToast(item.id)}
              className="text-couture-400 hover:text-couture-100 p-0.5 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context.toast;
};
