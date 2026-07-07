import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RoleSelection from './pages/RoleSelection';
import BuyerLayout from './layouts/BuyerLayout';
import Login from './pages/Login';
import Marketplace from './pages/Marketplace';
import NotFound from './pages/NotFound';
import { useAuthStore } from '@medicycle/store';

// A simple protected route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Buyer Routes */}
        <Route 
          path="/buyer" 
          element={
            <ProtectedRoute>
              <BuyerLayout />
            </ProtectedRoute>
          }
        >
          <Route path="marketplace" element={<Marketplace />} />
          {/* Default to marketplace if user hits /buyer */}
          <Route index element={<Navigate to="marketplace" replace />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
