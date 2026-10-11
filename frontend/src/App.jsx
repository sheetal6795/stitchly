import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { QuickDemoLoginModal } from './components/QuickDemoLoginModal';

// Pages
import { LandingPage } from './pages/LandingPage';
import { ExploreDesignsPage } from './pages/ExploreDesignsPage';
import { DesignersDirectoryPage } from './pages/DesignersDirectoryPage';
import { DesignerDetailPage } from './pages/DesignerDetailPage';
import { AiStudioPage } from './pages/AiStudioPage';
import { PostRequirementPage } from './pages/PostRequirementPage';
import { CustomerDashboard } from './pages/CustomerDashboard';
import { DesignerDashboard } from './pages/DesignerDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { AuthPage } from './pages/AuthPage';

const AppContent = () => {
  const { user, isAuthenticated, isCustomer, isDesigner, isAdmin } = useAuth();
  
  const [currentView, setCurrentView] = useState('home');
  const [selectedDesignerId, setSelectedDesignerId] = useState(null);
  const [preFilledRequirement, setPreFilledRequirement] = useState(null);
  const [demoLoginOpen, setDemoLoginOpen] = useState(false);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  return (
    <div className="flex flex-col min-h-screen bg-couture-950 text-couture-100 font-sans selection:bg-gold-500 selection:text-black">
      
      {/* Navigation Bar */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        onOpenDemoLogin={() => setDemoLoginOpen(true)}
      />

      {/* Main Content Router */}
      <main className="flex-1 w-full">
        {currentView === 'home' && (
          <LandingPage
            setCurrentView={setCurrentView}
            setSelectedDesignerId={setSelectedDesignerId}
            onOpenDemoLogin={() => setDemoLoginOpen(true)}
          />
        )}

        {currentView === 'explore' && (
          <ExploreDesignsPage
            setCurrentView={setCurrentView}
            setSelectedDesignerId={setSelectedDesignerId}
            setPreFilledRequirement={setPreFilledRequirement}
          />
        )}

        {currentView === 'designers' && (
          <DesignersDirectoryPage
            setCurrentView={setCurrentView}
            setSelectedDesignerId={setSelectedDesignerId}
          />
        )}

        {currentView === 'designer-detail' && (
          <DesignerDetailPage
            designerId={selectedDesignerId}
            setCurrentView={setCurrentView}
            setPreFilledRequirement={setPreFilledRequirement}
          />
        )}

        {currentView === 'ai-studio' && (
          <AiStudioPage
            setCurrentView={setCurrentView}
            setPreFilledRequirement={setPreFilledRequirement}
          />
        )}

        {currentView === 'post-requirement' && (
          <PostRequirementPage
            preFilledData={preFilledRequirement}
            setCurrentView={setCurrentView}
            onOpenDemoLogin={() => setDemoLoginOpen(true)}
          />
        )}

        {currentView === 'customer-dashboard' && (
          <CustomerDashboard
            setCurrentView={setCurrentView}
            setSelectedDesignerId={setSelectedDesignerId}
          />
        )}

        {currentView === 'designer-dashboard' && (
          <DesignerDashboard />
        )}

        {currentView === 'admin-dashboard' && (
          <AdminDashboard />
        )}

        {currentView === 'login' && (
          <AuthPage
            initialMode="login"
            setCurrentView={setCurrentView}
            onOpenDemoLogin={() => setDemoLoginOpen(true)}
          />
        )}

        {currentView === 'register' && (
          <AuthPage
            initialMode="register"
            setCurrentView={setCurrentView}
            onOpenDemoLogin={() => setDemoLoginOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer setCurrentView={setCurrentView} />

      {/* Quick Demo Switcher Modal */}
      <QuickDemoLoginModal
        isOpen={demoLoginOpen}
        onClose={() => setDemoLoginOpen(false)}
        onLoggedIn={(targetView) => {
          if (targetView) setCurrentView(targetView);
        }}
      />

    </div>
  );
};

export function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
