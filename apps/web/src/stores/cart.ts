import { create } from 'zustand';

export interface CartItem {
  id: string;
  medicineId: string;
  name: string;
  price: number;
  quantity: number;
  pharmacy: string;
  image?: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  total: 0,
  addItem: (item) => set((state) => {
    const existing = state.items.find(i => i.medicineId === item.medicineId);
    let newItems;
    if (existing) {
      newItems = state.items.map(i => 
        i.medicineId === item.medicineId ? { ...i, quantity: i.quantity + item.quantity } : i
      );
    } else {
      newItems = [...state.items, { ...item, id: Math.random().toString(36).substr(2, 9) }];
    }
    return {
      items: newItems,
      total: newItems.reduce((acc, i) => acc + i.price * i.quantity, 0)
    };
  }),
  removeItem: (id) => set((state) => {
    const newItems = state.items.filter(i => i.id !== id);
    return { items: newItems, total: newItems.reduce((acc, i) => acc + i.price * i.quantity, 0) };
  }),
  updateQuantity: (id, quantity) => set((state) => {
    const newItems = state.items.map(i => i.id === id ? { ...i, quantity } : i);
    return { items: newItems, total: newItems.reduce((acc, i) => acc + i.price * i.quantity, 0) };
  }),
  clearCart: () => set({ items: [], total: 0 })
}));
