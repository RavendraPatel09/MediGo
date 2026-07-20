import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, LogOut, Search, Bell, ShoppingBag, Store, ShieldCheck, Activity } from 'lucide-react';
import { useAuthStore } from '@/stores/auth';
import { RoleSwitcher } from '@/components/ui/RoleSwitcher';

interface GlobalLayoutProps {
  children: React.ReactNode;
}

export function GlobalLayout({ children }: GlobalLayoutProps) {
  const user = useAuthStore(state => state.user);
  const currentRole = useAuthStore(state => state.currentRole);

  const roleColors = {
    buyer: 'bg-primary/10 text-primary',
    seller: 'bg-success/10 text-success',
    pharmacy: 'bg-accent/10 text-accent',
    admin: 'bg-warning/10 text-warning'
  };

  const getSidebarLinks = () => {
    switch(currentRole) {
      case 'seller':
        return [
          { name: 'Dashboard', icon: Activity },
          { name: 'Inventory', icon: Store },
          { name: 'Orders', icon: ShoppingBag },
        ];
      case 'admin':
        return [
          { name: 'Dashboard', icon: Activity },
          { name: 'Users', icon: ShieldCheck },
        ];
      case 'buyer':
      default:
        return [
          { name: 'Marketplace', icon: Store },
          { name: 'Orders', icon: ShoppingBag },
        ];
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden relative">
      
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="w-64 border-r border-white/5 bg-surface/50 backdrop-blur-xl flex flex-col"
      >
        <div className="h-16 flex items-center px-6 border-b border-white/5">
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            MediCycle
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {getSidebarLinks().map((link) => {
            const Icon = link.icon;
            return (
              <button key={link.name} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-colors">
                <Icon className="w-5 h-5" />
                <span className="font-medium">{link.name}</span>
              </button>
            )
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-medium">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name || 'Guest'}</p>
              <p className="text-xs text-white/40 truncate">{user?.email || 'Sign in'}</p>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative z-0 overflow-hidden">
        
        {/* Top Navigation */}
        <header className="h-16 border-b border-white/5 bg-surface/30 backdrop-blur-md flex items-center justify-between px-6 z-20">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all w-64"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <RoleSwitcher />
            
            <button className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full"></span>
            </button>
            
            <button className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentRole}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

    </div>
  );
}
