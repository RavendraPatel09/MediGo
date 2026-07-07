import React from 'react';
import { Card, Button, Input } from '@medicycle/ui';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@medicycle/store';
import { Lock, Mail, ShieldCheck } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      id: 'admin-1',
      name: 'System Admin',
      email: 'admin@medicycle.com',
      role: 'admin',
    });
    navigate('/admin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <div className="absolute inset-0 bg-background noise-bg -z-10" />
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-accent/10 blur-[120px] -z-10" />
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <Card glass className="p-8 border-accent/20">
          <div className="text-center mb-8 flex flex-col items-center">
            <ShieldCheck className="w-12 h-12 text-accent mb-4" />
            <h1 className="text-3xl font-bold mb-2 text-accent">Admin Portal</h1>
            <p className="text-white/60 text-sm">Secure access required</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-[34px] w-5 h-5 text-white/30" />
                <Input label="Admin Email" type="email" placeholder="admin@medicycle.com" className="pl-10" required />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-[34px] w-5 h-5 text-white/30" />
                <Input label="Master Password" type="password" placeholder="••••••••" className="pl-10" required />
              </div>
            </div>

            <Button type="submit" className="w-full h-12 text-base mt-4 bg-accent hover:bg-accent/90 shadow-accent/25">
              Authenticate
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
