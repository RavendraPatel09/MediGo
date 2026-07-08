import React, { useState } from 'react';
import { Card, Button, Input } from '@medicycle/ui';
import { useCartStore, useOrdersStore } from '@medicycle/store';
import { CreditCard, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { total, items, clearCart } = useCartStore();
  const addOrder = useOrdersStore(state => state.addOrder);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    
    // Create the order
    addOrder({
      total: total + 2, // including platform fee
      status: 'transit',
      items: [...items]
    });

    setTimeout(() => {
      clearCart();
      navigate('/buyer/orders');
    }, 2000);
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-24 h-24 bg-success/20 rounded-full flex items-center justify-center mb-6 text-success"
        >
          <CheckCircle2 className="w-12 h-12" />
        </motion.div>
        <h2 className="text-3xl font-bold mb-2">Order Confirmed!</h2>
        <p className="text-white/60 mb-8 max-w-md">Your medicines are being prepared for delivery.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Checkout</h1>
      
      <form onSubmit={handleCheckout} className="space-y-6">
        <Card glass className="p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <span className="bg-primary/20 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
            Shipping Address
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Full Name" required />
            <Input label="Phone Number" required />
            <div className="col-span-2">
              <Input label="Address" required />
            </div>
            <Input label="City" required />
            <Input label="Zip Code" required />
          </div>
        </Card>

        <Card glass className="p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <span className="bg-primary/20 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
            Payment Method
          </h2>
          <div className="space-y-4">
            <div className="relative">
              <CreditCard className="absolute left-3 top-[34px] w-5 h-5 text-white/30" />
              <Input label="Card Number" placeholder="0000 0000 0000 0000" className="pl-10" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Expiry Date" placeholder="MM/YY" required />
              <Input label="CVC" placeholder="123" required />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-surfaceSecondary/50 border-primary/20 border text-center flex flex-col items-center">
          <p className="text-white/60 mb-2">Amount to pay</p>
          <div className="text-4xl font-bold text-primary mb-6">${(total + 2).toFixed(2)}</div>
          <Button type="submit" size="lg" className="w-full max-w-xs h-14 text-lg font-bold">
            Pay Now
          </Button>
        </Card>
      </form>
    </div>
  );
}
