import { useState } from 'react';
import { Card, Button, Input } from '@medicycle/ui';
import { UploadCloud, CheckCircle2, Scan } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMedicinesStore, useAuthStore } from '@medicycle/store';
import { useNavigate } from 'react-router-dom';

export default function AddMedicine() {
  const [ocrStatus, setOcrStatus] = useState<'idle' | 'scanning' | 'success'>('idle');
  const navigate = useNavigate();
  const addMedicine = useMedicinesStore(state => state.addMedicine);
  const user = useAuthStore(state => state.user);

  const [formData, setFormData] = useState({
    name: '',
    batch: '',
    expiry: '',
    price: '',
    stock: ''
  });

  const handleUpload = () => {
    setOcrStatus('scanning');
    setTimeout(() => {
      setOcrStatus('success');
      setFormData({
        name: 'Amoxicillin 500mg',
        batch: 'BXT-889102',
        expiry: '2027-11',
        price: '12.50',
        stock: '50'
      });
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMedicine({
      id: `MED-${Math.floor(Math.random() * 90000) + 10000}`,
      name: formData.name,
      type: 'Prescription', // Defaulting for mock
      price: parseFloat(formData.price),
      originalPrice: parseFloat(formData.price) * 1.5,
      expiry: formData.expiry,
      distance: '0 km away',
      pharmacy: user?.name || 'Seller Pharmacy',
      description: 'Auto-extracted medicine from OCR.',
      stock: parseInt(formData.stock),
      sellerId: user?.id || 'unknown'
    });
    navigate('/seller/inventory');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Add New Medicine</h1>
        <p className="text-white/60">Upload packaging to auto-fill details using OCR.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* OCR Upload Area */}
        <div className="md:col-span-1">
          <Card glass className="p-6 h-full flex flex-col items-center justify-center text-center border-dashed border-2 border-white/20 hover:border-primary/50 transition-colors cursor-pointer group" onClick={handleUpload}>
            <AnimatePresence mode="wait">
              {ocrStatus === 'idle' && (
                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Upload Image</h3>
                  <p className="text-xs text-white/50">PNG, JPG up to 10MB</p>
                </motion.div>
              )}
              {ocrStatus === 'scanning' && (
                <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-primary">
                  <Scan className="w-12 h-12 mx-auto mb-4 animate-pulse" />
                  <p className="text-sm font-medium animate-pulse">Extracting Data...</p>
                </motion.div>
              )}
              {ocrStatus === 'success' && (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-success">
                  <CheckCircle2 className="w-12 h-12 mx-auto mb-4" />
                  <p className="text-sm font-medium">Data Extracted Successfully</p>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </div>

        {/* Form Fields */}
        <Card glass className="md:col-span-2 p-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Input 
                  label="Medicine Name" 
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                  required
                />
              </div>
              <Input 
                label="Batch Number" 
                value={formData.batch}
                onChange={(e) => setFormData(prev => ({...prev, batch: e.target.value}))}
                required
              />
              <Input 
                label="Expiry Date" 
                type="month" 
                value={formData.expiry}
                onChange={(e) => setFormData(prev => ({...prev, expiry: e.target.value}))}
                required
              />
              <Input 
                label="Price ($)" 
                type="number" 
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({...prev, price: e.target.value}))}
                required
              />
              <Input 
                label="Stock Quantity" 
                type="number" 
                value={formData.stock}
                onChange={(e) => setFormData(prev => ({...prev, stock: e.target.value}))}
                required
              />
            </div>
            
            <div className="pt-4 flex justify-end gap-3">
              <Button type="button" variant="ghost" onClick={() => navigate('/seller/inventory')}>Cancel</Button>
              <Button type="submit" variant="primary">List Medicine</Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
