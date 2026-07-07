import { create } from 'zustand';

export type UserRole = 'buyer' | 'seller' | 'admin' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  role: UserRole;
  login: (user: User) => void;
  logout: () => void;
  setRole: (role: UserRole) => void; // For the role selection screen
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  role: null,
  login: (user) => set({ user, isAuthenticated: true, role: user.role }),
  logout: () => set({ user: null, isAuthenticated: false, role: null }),
  setRole: (role) => set({ role }),
}));
