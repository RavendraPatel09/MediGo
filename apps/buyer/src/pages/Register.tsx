import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Input } from '@medicycle/ui';
import { ThreeBackground } from '../components/ThreeBackground';
import { ArrowLeft, Mail, User } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'register' | 'otp'>('register');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('otp'); // Move to OTP step
  };

  const handleOtp = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, verify OTP then login
    navigate('/login');
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center p-6">
      <ThreeBackground />
      
      <button 
        onClick={() => step === 'otp' ? setStep('register') : navigate('/login')}
        className="absolute top-8 left-8 text-white/60 hover:text-white transition-colors flex items-center gap-2 group z-20"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Back
      </button>

      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="w-full max-w-md z-10"
      >
        <Card glass className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              {step === 'register' ? 'Create Account' : 'Verify Email'}
            </h1>
            <p className="text-white/60 text-sm">
              {step === 'register' 
                ? 'Join MediCycle as a Buyer' 
                : 'Enter the 6-digit code sent to your email'}
            </p>
          </div>

          {step === 'register' ? (
            <form onSubmit={handleRegister} className="space-y-5">
              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-[34px] w-5 h-5 text-white/30" />
                  <Input label="Full Name" placeholder="John Doe" className="pl-10" required />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-[34px] w-5 h-5 text-white/30" />
                  <Input label="Email Address" type="email" placeholder="you@example.com" className="pl-10" required />
                </div>
              </div>
              <Button type="submit" className="w-full h-12 text-base mt-4">
                Continue
              </Button>
            </form>
          ) : (
            <form onSubmit={handleOtp} className="space-y-5 text-center">
              <div className="flex justify-center gap-3 my-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <input 
                    key={i}
                    type="text"
                    maxLength={1}
                    className="w-12 h-14 rounded-xl border border-white/10 bg-surfaceSecondary text-center text-xl font-bold text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  />
                ))}
              </div>
              <Button type="submit" className="w-full h-12 text-base">
                Verify & Register
              </Button>
              <p className="text-sm text-white/60 mt-4">
                Didn't receive the code? <button className="text-primary hover:underline">Resend</button>
              </p>
            </form>
          )}
        </Card>
      </motion.div>
    </main>
  );
}
