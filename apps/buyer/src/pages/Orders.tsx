import React from 'react';
import { Card, Button } from '@medicycle/ui';
import { Package, Truck, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const mockOrders = [
  { id: 'ORD-72941', date: 'Oct 12, 2026', total: '$14.00', status: 'delivered', items: ['Paracetamol 500mg (2x)'] },
  { id: 'ORD-99120', date: 'Oct 15, 2026', total: '$32.50', status: 'transit', items: ['Amoxicillin 250mg', 'Vitamin C'] },
];

export default function Orders() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">My Orders</h1>
      
      <div className="space-y-4">
        {mockOrders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card glass className="p-6">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-white/5 pb-4 mb-4">
                <div>
                  <div className="text-sm text-white/50 mb-1">Order #{order.id}</div>
                  <div className="font-semibold">{order.date}</div>
                </div>
                
                <div className="flex items-center gap-2">
                  {order.status === 'delivered' ? (
                    <span className="flex items-center gap-2 text-sm bg-success/10 text-success px-3 py-1.5 rounded-full font-medium">
                      <CheckCircle2 className="w-4 h-4" /> Delivered
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-sm bg-primary/10 text-primary px-3 py-1.5 rounded-full font-medium">
                      <Truck className="w-4 h-4" /> In Transit
                    </span>
                  )}
                  <div className="text-lg font-bold ml-4">{order.total}</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-white/30" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{order.items.join(', ')}</p>
                  </div>
                </div>
                
                <Button variant="outline" size="sm">View Details</Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
