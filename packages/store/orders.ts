import { create } from 'zustand';
import type { CartItem } from './cart';

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'transit' | 'delivered';
  items: CartItem[];
}

interface OrdersState {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'date'>) => void;
}

const mockOrders: Order[] = [
  {
    id: 'ORD-72941',
    date: 'Oct 12, 2026',
    total: 14.00,
    status: 'delivered',
    items: [
      { id: 'c1', medicineId: '1', name: 'Paracetamol 500mg', price: 5.00, quantity: 2, pharmacy: 'City Health' }
    ]
  }
];

export const useOrdersStore = create<OrdersState>((set) => ({
  orders: mockOrders,
  addOrder: (order) => set((state) => ({
    orders: [
      {
        ...order,
        id: `ORD-${Math.floor(Math.random() * 90000) + 10000}`,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      },
      ...state.orders
    ]
  }))
}));
