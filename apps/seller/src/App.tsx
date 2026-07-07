import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SellerLayout from './layouts/SellerLayout';
import { useAuthStore } from '@medicycle/store';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Inventory from './pages/Inventory';
import AddMedicine from './pages/AddMedicine';
import Messages from './pages/Messages';
import Orders from './pages/Orders';

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
          <Route path="inventory" element={<Inventory />} />
          <Route path="add" element={<AddMedicine />} />
          <Route path="messages" element={<Messages />} />
          <Route path="orders" element={<Orders />} />
        </Route>

        <Route path="*" element={<Navigate to="/seller" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
