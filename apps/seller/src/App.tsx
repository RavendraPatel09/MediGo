import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SellerLayout from './layouts/SellerLayout';
import { useAuthStore } from '@medicycle/store';

// Placeholders for now
const Dashboard = () => <div className="text-white">Dashboard Content</div>;
const Login = () => <div className="text-white">Login Content</div>;

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
        <Route path="/login" element={<Login />} />
        
        <Route 
          path="/seller" 
          element={
            <ProtectedRoute>
              <SellerLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          {/* Add more routes here later */}
        </Route>

        <Route path="*" element={<Navigate to="/seller" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
