import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import React, { Suspense, lazy } from 'react';

// Lazy Load Pages
const LandingPage = lazy(() => import('./pages/LandingPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

// Loading Screen
const LoadingScreen = () => (
  <div className="min-h-screen bg-slate-950 flex items-center justify-center">
    <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
  </div>
);

// Protect Route Wrapper
const ProtectedRoute = ({ children, roles }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-blue-500">Loading...</div>;

  if (!user) return <Navigate to="/login" />;

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <div className="min-h-screen bg-slate-950 text-white">
                    <Navbar />
                    <div className="pt-20">
                      <Dashboard />
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </AuthProvider>
    </Router>
  );
}

export default App;
