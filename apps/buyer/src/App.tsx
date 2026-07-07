import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Store, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '@medicycle/store';
import { Card } from '@medicycle/ui';
import { ThreeBackground } from './components/ThreeBackground';

const roles = [
  {
    id: 'buyer',
    title: 'Buyer',
    description: 'Browse and purchase unused medicines safely.',
    icon: ShoppingBag,
    color: 'text-primary',
    bg: 'bg-primary/10',
    border: 'hover:border-primary/50',
    shadow: 'hover:shadow-primary/20',
  },
  {
    id: 'seller',
    title: 'Seller',
    description: 'Sell unexpired medicines and manage your inventory.',
    icon: Store,
    color: 'text-success',
    bg: 'bg-success/10',
    border: 'hover:border-success/50',
    shadow: 'hover:shadow-success/20',
  },
  {
    id: 'admin',
    title: 'Administrator',
    description: 'Manage users, approvals, and platform security.',
    icon: ShieldCheck,
    color: 'text-accent',
    bg: 'bg-accent/10',
    border: 'hover:border-accent/50',
    shadow: 'hover:shadow-accent/20',
  },
] as const;

export default function App() {
  const setRole = useAuthStore((state) => state.setRole);

  const handleRoleSelect = (roleId: typeof roles[number]['id']) => {
    setRole(roleId);
    // In a real app, we'd navigate to the respective login page.
    // For now, we will just alert to verify the interaction.
    if (roleId === 'seller') {
      window.location.href = 'http://localhost:3001'; // Mock seller app URL
    } else if (roleId === 'admin') {
      window.location.href = 'http://localhost:3002'; // Mock admin app URL
    } else {
      alert('Navigate to Buyer Login');
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-6">
      <ThreeBackground />
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center mb-16 z-10"
      >
        <motion.div 
          className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-sm font-medium tracking-wide text-white/80">Welcome to MediCycle</span>
        </motion.div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white via-white/90 to-white/50">
          Continue as
        </h1>
        <p className="text-lg text-white/60 max-w-xl mx-auto">
          Select your role to access the premium medicine resale marketplace.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full z-10">
        {roles.map((role, index) => {
          const Icon = role.icon;
          return (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
            >
              <Card
                glass
                onClick={() => handleRoleSelect(role.id)}
                className={`cursor-pointer group h-full p-8 flex flex-col items-center text-center transition-all duration-500 ${role.border} ${role.shadow}`}
              >
                <div className={`w-16 h-16 rounded-2xl ${role.bg} flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2`}>
                  <Icon className={`w-8 h-8 ${role.color}`} />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70">
                  {role.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {role.description}
                </p>
                
                <div className="mt-8 pt-6 border-t border-white/5 w-full flex items-center justify-center gap-2 text-sm font-medium text-white/40 group-hover:text-white/80 transition-colors">
                  Select <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">→</span>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </main>
  );
}
