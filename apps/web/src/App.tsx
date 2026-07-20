import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GlobalLayout } from '@/app/layouts/GlobalLayout';
import { useAuthStore } from '@/stores/auth';

function Dashboard() {
  const currentRole = useAuthStore(state => state.currentRole);
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome to MediCycle</h1>
      <p className="text-white/60">You are currently viewing the {currentRole} experience.</p>
      
      <div className="p-12 glass-panel rounded-2xl flex flex-col items-center justify-center text-center">
        <h2 className="text-xl font-semibold mb-2">Phase 1 Complete</h2>
        <p className="text-white/50 max-w-md">
          The unified platform shell is ready. Try clicking the Role Switcher in the top right to instantly change the layout and sidebar context.
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <GlobalLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </GlobalLayout>
    </BrowserRouter>
  );
}
