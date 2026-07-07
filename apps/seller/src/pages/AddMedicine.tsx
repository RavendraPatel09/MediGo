import React, { useState } from 'react';
import { Card, Button, Input } from '@medicycle/ui';
import { UploadCloud, CheckCircle2, Scan } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AddMedicine() {
  const [ocrStatus, setOcrStatus] = useState<'idle' | 'scanning' | 'success'>('idle');

  const handleUpload = () => {
    setOcrStatus('scanning');
    setTimeout(() => {
      setOcrStatus('success');
    }, 2000);
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
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Input 
                  label="Medicine Name" 
                  defaultValue={ocrStatus === 'success' ? 'Amoxicillin 500mg' : ''} 
                />
              </div>
              <Input 
                label="Batch Number" 
                defaultValue={ocrStatus === 'success' ? 'BXT-889102' : ''} 
              />
              <Input 
                label="Expiry Date" 
                type="month" 
                defaultValue={ocrStatus === 'success' ? '2027-11' : ''} 
              />
              <Input 
                label="Price ($)" 
                type="number" 
                defaultValue={ocrStatus === 'success' ? '12.50' : ''} 
              />
              <Input 
                label="Stock Quantity" 
                type="number" 
                defaultValue={ocrStatus === 'success' ? '50' : ''} 
              />
            </div>
            
            <div className="pt-4 flex justify-end gap-3">
              <Button variant="ghost">Cancel</Button>
              <Button variant="primary">List Medicine</Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
