import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@medicycle/store';
import { Button, Card, Input } from '@medicycle/ui';
import { ThreeBackground } from '../components/ThreeBackground';
import { ArrowLeft, Lock, Mail } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const role = useAuthStore((state) => state.role);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login
    login({
      id: 'mock-user-1',
      name: 'Test User',
      email: 'test@example.com',
      role: role || 'buyer',
    });
    // Redirect based on role (for now we only have buyer setup locally)
    navigate('/buyer');
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center p-6">
      <ThreeBackground />
      
      <button 
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 text-white/60 hover:text-white transition-colors flex items-center gap-2 group z-20"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Back to Roles
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <Card glass className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-white/60 text-sm">
              Sign in to your {role || 'buyer'} account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-[34px] w-5 h-5 text-white/30" />
                <Input 
                  label="Email Address"
                  type="email" 
                  placeholder="you@example.com"
                  className="pl-10"
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-[34px] w-5 h-5 text-white/30" />
                <Input 
                  label="Password"
                  type="password" 
                  placeholder="••••••••"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-white/70 cursor-pointer">
                <input type="checkbox" className="rounded border-white/10 bg-white/5 accent-primary" />
                Remember me
              </label>
              <a href="#" className="text-primary hover:text-primary/80 transition-colors">
                Forgot password?
              </a>
            </div>

            <Button type="submit" className="w-full h-12 text-base mt-4">
              Sign In
            </Button>
            
            <p className="text-center text-sm text-white/60 mt-6">
              Don't have an account?{' '}
              <a href="#" className="text-white hover:text-primary transition-colors font-medium">
                Register now
              </a>
            </p>
          </form>
        </Card>
      </motion.div>
    </main>
  );
}
