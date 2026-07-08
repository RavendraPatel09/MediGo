import { Outlet, Link } from 'react-router-dom';
import { useAuthStore, useCartStore } from '@medicycle/store';
import { ShoppingCart, LogOut, PackageSearch, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BuyerLayout() {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const cartItemsCount = useCartStore((state) => state.items.length);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 glass-panel border-x-0 border-t-0 rounded-none h-16 flex items-center px-6 justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            MediCycle
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-white/70">
            <Link to="/buyer/marketplace" className="hover:text-white transition-colors flex items-center gap-2">
              <PackageSearch className="w-4 h-4" /> Marketplace
            </Link>
            <Link to="/buyer/nearby" className="hover:text-white transition-colors flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Nearby
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <Link to="/buyer/cart" className="relative p-2 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/5">
            <ShoppingCart className="w-5 h-5" />
            {cartItemsCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </Link>
          
          <div className="h-6 w-[1px] bg-white/10" />
          
          <div className="flex items-center gap-3">
            <div className="text-sm text-right hidden sm:block">
              <p className="font-medium">{user?.name || 'Buyer'}</p>
              <p className="text-white/50 text-xs">Buyer Account</p>
            </div>
            <button 
              onClick={logout}
              className="p-2 text-red-400 hover:text-red-300 transition-colors rounded-full hover:bg-white/5"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative">
        <div className="absolute inset-0 noise-bg" />
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="relative z-10 p-6 md:p-8 max-w-7xl mx-auto w-full"
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
}
