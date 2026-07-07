import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@medicycle/store';
import { 
  LayoutDashboard, Users, Store, Pill, 
  CheckSquare, FileBarChart, ShieldCheck, 
  Settings, LogOut, ChevronLeft, Menu 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@medicycle/utils';

const navItems = [
  { name: 'Overview', path: '/admin', icon: LayoutDashboard },
  { name: 'Users', path: '/admin/users', icon: Users },
  { name: 'Sellers', path: '/admin/sellers', icon: Store },
  { name: 'Medicines', path: '/admin/medicines', icon: Pill },
  { name: 'Approvals', path: '/admin/approvals', icon: CheckSquare },
  { name: 'Reports', path: '/admin/reports', icon: FileBarChart },
];

export default function AdminLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 noise-bg" />
      
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? 80 : 260 }}
        className="relative z-20 flex flex-col glass-panel border-y-0 border-l-0 rounded-none h-full transition-all duration-300"
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-white/5">
          <AnimatePresence mode="popLayout">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-accent to-primary whitespace-nowrap flex items-center gap-2"
              >
                <ShieldCheck className="w-5 h-5 text-accent" />
                Admin Portal
              </motion.div>
            )}
          </AnimatePresence>
          
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-white/50 hover:text-white transition-colors"
          >
            {isCollapsed ? <Menu className="w-5 h-5 mx-auto" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group',
                  isActive 
                    ? 'bg-accent/20 text-accent' 
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                )}
                title={isCollapsed ? item.name : undefined}
              >
                <Icon className={cn('w-5 h-5 shrink-0', isActive ? 'text-accent' : 'text-white/50 group-hover:text-white/80')} />
                {!isCollapsed && (
                  <span className="font-medium truncate">{item.name}</span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          {!isCollapsed && (
            <div className="mb-4 px-2">
              <p className="text-sm font-medium text-white/90 truncate">{user?.name || 'System Admin'}</p>
              <p className="text-xs text-accent">Super Administrator</p>
            </div>
          )}
          
          <button 
            onClick={logout}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-400/10 transition-colors",
              isCollapsed && "justify-center"
            )}
            title={isCollapsed ? "Logout" : undefined}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!isCollapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 flex items-center justify-between px-8 border-b border-white/5 bg-surface/50 backdrop-blur-md">
          <h2 className="text-lg font-semibold text-white/90">
            {navItems.find(i => i.path === location.pathname)?.name || 'Dashboard'}
          </h2>
          
          <div className="flex items-center gap-4">
            <button className="p-2 text-white/60 hover:text-white transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
