import React from 'react';
import { Card, Button } from '@medicycle/ui';
import { useCartStore } from '@medicycle/store';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { items, total, updateQuantity, removeItem } = useCartStore();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
          <ShoppingCart className="w-10 h-10 text-white/20" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-white/60 mb-8 max-w-md">Looks like you haven't added any medicines to your cart yet.</p>
        <Button onClick={() => navigate('/buyer/marketplace')}>Start Shopping</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card glass className="p-4 flex gap-6 items-center">
                <div className="w-20 h-20 bg-white/5 rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-white/20 text-xs text-center px-2">Image</span>
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-white/50 text-sm">{item.pharmacy}</p>
                  <p className="text-primary font-bold mt-1">${item.price.toFixed(2)}</p>
                </div>
                
                <div className="flex flex-col items-end gap-3 shrink-0">
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="text-white/40 hover:text-red-400 transition-colors p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  
                  <div className="flex items-center gap-3 bg-white/5 rounded-lg p-1">
                    <button 
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="p-1 hover:bg-white/10 rounded transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-white/10 rounded transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="lg:col-span-1">
          <Card glass className="p-6 sticky top-24">
            <h3 className="text-xl font-bold mb-6">Order Summary</h3>
            
            <div className="space-y-4 text-sm mb-6">
              <div className="flex justify-between text-white/70">
                <span>Subtotal ({items.length} items)</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Platform Fee</span>
                <span>$2.00</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Delivery</span>
                <span>Calculated at checkout</span>
              </div>
              
              <div className="h-px bg-white/10 my-4" />
              
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">${(total + 2).toFixed(2)}</span>
              </div>
            </div>
            
            <Button className="w-full h-12 flex items-center justify-center gap-2" onClick={() => navigate('/buyer/checkout')}>
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

import { ShoppingCart } from 'lucide-react';
