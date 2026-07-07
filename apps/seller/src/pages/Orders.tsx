
import { Card, Button } from '@medicycle/ui';
import { Package, Truck, CheckCircle2, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const mockSellerOrders = [
  { id: 'ORD-99120', customer: 'Alice Smith', date: 'Oct 15, 2026', total: '$32.50', status: 'pending', items: ['Amoxicillin 250mg', 'Vitamin C'] },
  { id: 'ORD-72941', customer: 'John Doe', date: 'Oct 12, 2026', total: '$14.00', status: 'delivered', items: ['Paracetamol 500mg (2x)'] },
];

export default function Orders() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">Order Management</h1>
          <p className="text-white/60">Process and fulfill customer orders.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">Status: All <ChevronDown className="w-4 h-4" /></Button>
        </div>
      </div>
      
      <div className="space-y-4">
        {mockSellerOrders.map((order, index) => (
          <motion.div key={order.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
            <Card glass className="p-6">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-white/5 pb-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-sm text-white/50">Order #{order.id}</span>
                    <span className="text-sm font-medium px-2 py-0.5 rounded bg-white/10">{order.customer}</span>
                  </div>
                  <div className="font-semibold">{order.date}</div>
                </div>
                
                <div className="flex items-center gap-4">
                  {order.status === 'delivered' ? (
                    <span className="flex items-center gap-2 text-sm text-success">
                      <CheckCircle2 className="w-4 h-4" /> Delivered
                    </span>
                  ) : (
                    <Button size="sm" variant="primary" className="gap-2 bg-warning text-warning-foreground hover:bg-warning/90">
                      <Truck className="w-4 h-4" /> Ship Order
                    </Button>
                  )}
                  <div className="text-xl font-bold text-primary">{order.total}</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-white/30" />
                  </div>
                  <p className="text-sm font-medium">{order.items.join(', ')}</p>
                </div>
                
                <Button variant="ghost" size="sm">Print Label</Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
