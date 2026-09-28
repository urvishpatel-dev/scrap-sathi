import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { AppNavbar } from './components/layout/AppNavbar';
import { Toast } from './components/Toast';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { HowItWorksPage } from './pages/public/HowItWorksPage';
import { CollectorsPage } from './pages/public/CollectorsPage';
import { RecyclersPage } from './pages/public/RecyclersPage';
import { AboutPage } from './pages/public/AboutPage';
import { PublicPassportPage } from './pages/public/PublicPassportPage';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { VerifyOtpPage } from './pages/auth/VerifyOtpPage';

// Collector Pages
import { CollectorDashboard } from './pages/collector/CollectorDashboard';
import { CreateLotPage } from './pages/collector/CreateLotPage';
import { LotDetailsPage } from './pages/collector/LotDetailsPage';
import { OffersPage } from './pages/collector/OffersPage';
import { TransactionsPage } from './pages/collector/TransactionsPage';

// Recycler Pages
import { RecyclerOverviewPage } from './pages/recycler/RecyclerOverviewPage';
import { DiscoverLotsPage } from './pages/recycler/DiscoverLotsPage';
import { RecyclerInventoryPage } from './pages/recycler/RecyclerInventoryPage';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';

// Route Guard Component
const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles?: string[] }> = ({
  children,
  allowedRoles
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f2ffe3] flex items-center justify-center">
        <p className="font-serif text-lg text-[#083a26]">Authenticating session...</p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen bg-[#f2ffe3] flex items-center justify-center p-6 text-center">
        <div className="bg-white rounded-[24px] p-8 max-w-md border border-[#cccccc] shadow-editorial">
          <h2 className="font-serif text-3xl text-red-700">Access Restricted</h2>
          <p className="text-xs text-gray-600 mt-2">
            Your account role ({user.role}) is not authorized to view this portal area.
          </p>
          <div className="mt-6">
            <Navigate to="/" replace />
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <div className="min-h-screen flex flex-col bg-[#f2ffe3] text-[#2d3637] selection:bg-[#a3fda7] selection:text-[#000000]">
            <AppNavbar />
            <Toast />
            <main className="flex-1">
              <Routes>
                {/* 1. Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/how-it-works" element={<HowItWorksPage />} />
                <Route path="/collectors" element={<CollectorsPage />} />
                <Route path="/recyclers" element={<RecyclersPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/passport/:lotNumber" element={<PublicPassportPage />} />

                {/* 2. Authentication Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/verify" element={<VerifyOtpPage />} />
                <Route path="/forgot-password" element={<LoginPage />} />
                <Route path="/reset-password" element={<LoginPage />} />

                {/* 3. Collector Application Routes */}
                <Route
                  path="/app/collector"
                  element={
                    <ProtectedRoute allowedRoles={['COLLECTOR', 'ADMIN']}>
                      <CollectorDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/app/collector/lots"
                  element={
                    <ProtectedRoute allowedRoles={['COLLECTOR', 'ADMIN']}>
                      <CollectorDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/app/collector/lots/new"
                  element={
                    <ProtectedRoute allowedRoles={['COLLECTOR', 'ADMIN']}>
                      <CreateLotPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/app/collector/lots/:id"
                  element={
                    <ProtectedRoute allowedRoles={['COLLECTOR', 'ADMIN']}>
                      <LotDetailsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/app/collector/offers"
                  element={
                    <ProtectedRoute allowedRoles={['COLLECTOR', 'ADMIN']}>
                      <OffersPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/app/collector/transactions"
                  element={
                    <ProtectedRoute allowedRoles={['COLLECTOR', 'ADMIN']}>
                      <TransactionsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/app/collector/passports/:id"
                  element={<PublicPassportPage />}
                />

                {/* 4. Recycler Application Routes */}
                <Route
                  path="/app/recycler"
                  element={
                    <ProtectedRoute allowedRoles={['RECYCLER', 'ADMIN']}>
                      <RecyclerOverviewPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/app/recycler/discover"
                  element={
                    <ProtectedRoute allowedRoles={['RECYCLER', 'ADMIN']}>
                      <DiscoverLotsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/app/recycler/quotes"
                  element={
                    <ProtectedRoute allowedRoles={['RECYCLER', 'ADMIN']}>
                      <RecyclerOverviewPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/app/recycler/inventory"
                  element={
                    <ProtectedRoute allowedRoles={['RECYCLER', 'ADMIN']}>
                      <RecyclerInventoryPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/app/recycler/analytics"
                  element={
                    <ProtectedRoute allowedRoles={['RECYCLER', 'ADMIN']}>
                      <RecyclerOverviewPage />
                    </ProtectedRoute>
                  }
                />

                {/* 5. Admin Application Routes */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute allowedRoles={['ADMIN']}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/*"
                  element={
                    <ProtectedRoute allowedRoles={['ADMIN']}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* Catch-all redirect to Landing */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
