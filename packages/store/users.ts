import { create } from 'zustand';

export interface UserAccount {
  id: string;
  name: string;
  role: 'Buyer' | 'Seller' | 'Admin';
  email: string;
  status: 'Active' | 'Verified' | 'Suspended';
  joined: string;
}

interface UsersState {
  users: UserAccount[];
  updateUserStatus: (id: string, status: UserAccount['status']) => void;
}

const mockUsers: UserAccount[] = [
  { id: 'USR-001', name: 'Alice Smith', role: 'Buyer', email: 'alice@example.com', status: 'Active', joined: 'Oct 2026' },
  { id: 'USR-002', name: 'City Health', role: 'Seller', email: 'store@cityhealth.com', status: 'Verified', joined: 'Sep 2026' },
  { id: 'USR-003', name: 'John Doe', role: 'Buyer', email: 'john@example.com', status: 'Suspended', joined: 'Oct 2026' },
];

export const useUsersStore = create<UsersState>((set) => ({
  users: mockUsers,
  updateUserStatus: (id, status) => set((state) => ({
    users: state.users.map(u => u.id === id ? { ...u, status } : u)
  }))
}));
