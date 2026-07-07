import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button } from '@medicycle/ui';
import { ArrowLeft, ShoppingCart, ShieldCheck, Clock, MapPin, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MedicineDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <button 
        onClick={() => navigate(-1)}
        className="text-white/60 hover:text-white transition-colors flex items-center gap-2 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Marketplace
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Image & Badges */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <Card glass className="aspect-square flex items-center justify-center relative overflow-hidden bg-white/5">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-30" />
            <img 
              src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80" 
              alt="Medicine"
              className="w-3/4 h-3/4 object-contain filter drop-shadow-2xl"
            />
            <div className="absolute top-4 right-4 bg-success/20 border border-success/50 text-success px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 backdrop-blur-md">
              <ShieldCheck className="w-4 h-4" /> Verified Authentic
            </div>
          </Card>
        </motion.div>

        {/* Right Column: Details */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h1 className="text-4xl font-bold">Paracetamol 500mg</h1>
            </div>
            <p className="text-lg text-white/50">Pain Reliever & Fever Reducer • 50 Tablets</p>
          </div>

          <div className="flex items-end gap-3 pb-6 border-b border-white/10">
            <span className="text-4xl font-bold text-primary">$5.00</span>
            <span className="text-lg text-white/40 line-through mb-1">$12.00</span>
            <span className="bg-primary/20 text-primary px-2 py-0.5 rounded text-sm mb-2 ml-2">Save 58%</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 text-white/70">
              <Clock className="w-5 h-5 text-warning" />
              <div>
                <p className="text-xs text-white/40">Expiry Date</p>
                <p className="font-medium">October 2027</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-white/70">
              <MapPin className="w-5 h-5 text-accent" />
              <div>
                <p className="text-xs text-white/40">Location</p>
                <p className="font-medium">2.4 km away</p>
              </div>
            </div>
          </div>

          <Card className="p-4 bg-surfaceSecondary/50 border-white/5 mt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Sold by</p>
                <p className="text-primary font-semibold">City Health Pharmacy</p>
              </div>
              <div className="flex items-center gap-1 text-sm bg-white/5 px-2 py-1 rounded">
                <Star className="w-4 h-4 text-warning fill-warning" /> 4.9 (128 reviews)
              </div>
            </div>
          </Card>

          <div className="flex gap-4 pt-4">
            <Button size="lg" className="flex-1 flex gap-2">
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </Button>
            <Button size="lg" variant="secondary" className="flex-1">
              Buy Now
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
