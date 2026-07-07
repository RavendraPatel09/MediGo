import React from 'react';
import { Card, Button, Input } from '@medicycle/ui';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@medicycle/store';
import { Lock, Mail } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      id: 'seller-1',
      name: 'City Health Pharmacy',
      email: 'store@cityhealth.com',
      role: 'seller',
    });
    navigate('/seller');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <div className="absolute inset-0 bg-background noise-bg -z-10" />
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-success/10 blur-[120px] -z-10" />
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <Card glass className="p-8 border-success/20">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 text-success">Seller Portal</h1>
            <p className="text-white/60 text-sm">Manage your pharmacy inventory</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-[34px] w-5 h-5 text-white/30" />
                <Input label="Business Email" type="email" placeholder="store@example.com" className="pl-10" required />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-[34px] w-5 h-5 text-white/30" />
                <Input label="Password" type="password" placeholder="••••••••" className="pl-10" required />
              </div>
            </div>

            <Button type="submit" className="w-full h-12 text-base mt-4 bg-success hover:bg-success/90">
              Access Dashboard
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
