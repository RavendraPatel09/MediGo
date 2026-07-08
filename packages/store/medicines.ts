import { create } from 'zustand';

export interface Medicine {
  id: string;
  name: string;
  type: string;
  price: number;
  originalPrice: number;
  expiry: string;
  distance: string;
  pharmacy: string;
  description?: string;
  stock: number;
  sellerId: string;
}

interface MedicinesState {
  medicines: Medicine[];
  addMedicine: (med: Medicine) => void;
  getMedicine: (id: string) => Medicine | undefined;
}

const mockMedicines: Medicine[] = [
  { 
    id: '1', 
    name: 'Paracetamol 500mg', 
    type: 'Pain Reliever', 
    price: 5.00, 
    originalPrice: 12.00, 
    expiry: '2027-10', 
    distance: '2.4 km away', 
    pharmacy: 'City Health',
    description: 'Effectively relieves mild to moderate pain and reduces fever.',
    stock: 15,
    sellerId: 'seller1'
  },
  { 
    id: '2', 
    name: 'Amoxicillin 250mg', 
    type: 'Antibiotic', 
    price: 8.50, 
    originalPrice: 18.00, 
    expiry: '2026-12', 
    distance: '6.0 km away', 
    pharmacy: 'Green Cross',
    description: 'Used to treat a variety of bacterial infections.',
    stock: 4,
    sellerId: 'seller2'
  },
  { 
    id: '3', 
    name: 'Ibuprofen 400mg', 
    type: 'Anti-inflammatory', 
    price: 4.20, 
    originalPrice: 9.00, 
    expiry: '2028-01', 
    distance: '12 km away', 
    pharmacy: 'MediCare Hub',
    description: 'Nonsteroidal anti-inflammatory drug (NSAID) used for treating pain, fever, and inflammation.',
    stock: 10,
    sellerId: 'seller3'
  },
];

export const useMedicinesStore = create<MedicinesState>((set, get) => ({
  medicines: mockMedicines,
  addMedicine: (med) => set((state) => ({ medicines: [...state.medicines, med] })),
  getMedicine: (id) => get().medicines.find(m => m.id === id)
}));
