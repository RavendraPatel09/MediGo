
import { Card, Button, Input } from '@medicycle/ui';
import { Search, Plus, Filter, Edit, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const mockInventory = [
  { id: 'MED-001', name: 'Paracetamol 500mg', stock: 145, price: '$5.00', expiry: 'Oct 2027', status: 'Active' },
  { id: 'MED-002', name: 'Amoxicillin 250mg', stock: 12, price: '$8.50', expiry: 'Dec 2026', status: 'Low Stock' },
  { id: 'MED-003', name: 'Vitamin C 1000mg', stock: 0, price: '$12.00', expiry: 'Jan 2028', status: 'Out of Stock' },
];

export default function Inventory() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Inventory Management</h1>
          <p className="text-white/60">Track and manage your listed medicines.</p>
        </div>
        <Button onClick={() => navigate('/seller/add')} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add New Medicine
        </Button>
      </div>

      <Card glass className="p-0 overflow-hidden">
        <div className="p-4 border-b border-white/5 flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <Input placeholder="Search inventory..." className="pl-10" />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filters
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-white/60">
              <tr>
                <th className="p-4 font-medium">Item Name</th>
                <th className="p-4 font-medium">SKU</th>
                <th className="p-4 font-medium">Stock</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">Expiry</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockInventory.map((item, index) => (
                <motion.tr 
                  key={item.id} 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-white/5 transition-colors"
                >
                  <td className="p-4 font-medium text-white">{item.name}</td>
                  <td className="p-4 text-white/60">{item.id}</td>
                  <td className="p-4">{item.stock}</td>
                  <td className="p-4">{item.price}</td>
                  <td className="p-4 text-white/60">{item.expiry}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      item.status === 'Active' ? 'bg-success/20 text-success' :
                      item.status === 'Low Stock' ? 'bg-warning/20 text-warning' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-red-500/10 rounded-lg text-white/60 hover:text-red-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
