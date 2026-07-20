import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ShoppingBag, Store, Activity, ShieldCheck, Check } from 'lucide-react';
import { useAuthStore } from '@/stores/auth';

const roles = [
  { id: 'buyer', name: 'Buyer', icon: ShoppingBag, color: 'text-primary', bg: 'bg-primary/10' },
  { id: 'seller', name: 'Seller', icon: Store, color: 'text-success', bg: 'bg-success/10' },
  { id: 'pharmacy', name: 'Pharmacy', icon: Activity, color: 'text-accent', bg: 'bg-accent/10' },
  { id: 'admin', name: 'Admin', icon: ShieldCheck, color: 'text-warning', bg: 'bg-warning/10' },
] as const;

export function RoleSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const currentRole = useAuthStore(state => state.currentRole);
  const setRole = useAuthStore(state => state.setRole);

  const activeRole = roles.find(r => r.id === currentRole) || roles[0];
  const ActiveIcon = activeRole.icon;

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 ${activeRole.bg} hover:brightness-110 transition-all`}
      >
        <ActiveIcon className={`w-4 h-4 ${activeRole.color}`} />
        <span className={`text-sm font-medium ${activeRole.color} capitalize`}>{activeRole.name}</span>
        <ChevronDown className={`w-4 h-4 ${activeRole.color} opacity-50`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 w-48 glass-panel rounded-2xl p-2 z-50 flex flex-col gap-1"
            >
              {roles.map(role => {
                const Icon = role.icon;
                const isActive = currentRole === role.id;
                return (
                  <button
                    key={role.id}
                    onClick={() => {
                      setRole(role.id);
                      setIsOpen(false);
                    }}
                    className={`flex items-center justify-between w-full px-3 py-2 rounded-xl transition-all ${
                      isActive ? 'bg-white/10' : 'hover:bg-white/5 text-white/70 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-lg ${role.bg}`}>
                        <Icon className={`w-4 h-4 ${role.color}`} />
                      </div>
                      <span className="text-sm font-medium">{role.name}</span>
                    </div>
                    {isActive && <Check className="w-4 h-4 text-white/50" />}
                  </button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
