import React from 'react';
import { Card, Input, Button } from '@medicycle/ui';
import { Search, Filter, MapPin, Pill, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock Data
const mockMedicines = [
  { id: 1, name: 'Paracetamol 500mg', type: 'Pain Reliever', price: '$5.00', originalPrice: '$12.00', expiry: '2027-10', distance: '2.4 km away', pharmacy: 'City Health' },
  { id: 2, name: 'Amoxicillin 250mg', type: 'Antibiotic', price: '$8.50', originalPrice: '$18.00', expiry: '2026-12', distance: '6.0 km away', pharmacy: 'Green Cross' },
  { id: 3, name: 'Ibuprofen 400mg', type: 'Anti-inflammatory', price: '$4.20', originalPrice: '$9.00', expiry: '2028-01', distance: '12 km away', pharmacy: 'MediCare Hub' },
];

export default function Marketplace() {
  return (
    <div className="space-y-8">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Available Medicines
          </h1>
          <p className="text-white/60 mt-1">Safely purchase unexpired medicines from verified sellers.</p>
        </div>
        
        <div className="flex w-full md:w-auto gap-3">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <Input placeholder="Search medicines..." className="pl-10" />
          </div>
          <Button variant="outline" className="px-3">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockMedicines.map((med, index) => (
          <motion.div
            key={med.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card glass className="p-0 overflow-hidden flex flex-col group cursor-pointer">
              {/* Image Placeholder */}
              <div className="h-48 bg-white/5 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent z-10" />
                <Pill className="w-16 h-16 text-white/10 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 right-4 z-20 bg-green-500/20 text-green-400 text-xs font-semibold px-2 py-1 rounded-md border border-green-500/20 backdrop-blur-md">
                  Verified
                </div>
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold truncate pr-4">{med.name}</h3>
                  <div className="text-right flex-shrink-0">
                    <div className="text-lg font-bold text-primary">{med.price}</div>
                    <div className="text-xs text-white/40 line-through">{med.originalPrice}</div>
                  </div>
                </div>
                
                <p className="text-sm text-white/50 mb-4">{med.type}</p>
                
                <div className="mt-auto space-y-2 text-sm text-white/60">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent" />
                    {med.distance} • {med.pharmacy}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-warning" />
                    Expires: {med.expiry}
                  </div>
                </div>
                
                <Button className="w-full mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View Details
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
