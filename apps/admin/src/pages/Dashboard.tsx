import React from 'react';
import { Card } from '@medicycle/ui';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Store, ShieldAlert, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const data = [
  { name: 'Mon', transactions: 120 },
  { name: 'Tue', transactions: 132 },
  { name: 'Wed', transactions: 101 },
  { name: 'Thu', transactions: 174 },
  { name: 'Fri', transactions: 190 },
  { name: 'Sat', transactions: 230 },
  { name: 'Sun', transactions: 210 },
];

const stats = [
  { title: 'Total Users', value: '45.2K', icon: Users, color: 'text-primary', bg: 'bg-primary/10' },
  { title: 'Verified Sellers', value: '1,204', icon: Store, color: 'text-success', bg: 'bg-success/10' },
  { title: 'Fraud Alerts', value: '12', icon: ShieldAlert, color: 'text-red-400', bg: 'bg-red-500/10' },
  { title: 'System Health', value: '99.9%', icon: Activity, color: 'text-accent', bg: 'bg-accent/10' },
];

export default function Dashboard() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold mb-2">Platform Overview</h1>
        <p className="text-white/60">Monitor system activity and key metrics.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card glass className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
                <h3 className="text-white/60 text-sm font-medium mb-1">{stat.title}</h3>
                <p className="text-3xl font-bold">{stat.value}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Charts & Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card glass className="lg:col-span-2 p-6">
          <h3 className="text-xl font-bold mb-6">Transaction Volume</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff50" axisLine={false} tickLine={false} />
                <YAxis stroke="#ffffff50" axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: '#ffffff05' }}
                  contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                />
                <Bar dataKey="transactions" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card glass className="p-6">
          <h3 className="text-xl font-bold mb-6">Pending Approvals</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4 items-center p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                  <Store className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New Seller Reg.</p>
                  <p className="text-xs text-white/50">PharmaCo Ltd.</p>
                </div>
                <div className="text-xs text-warning bg-warning/10 px-2 py-1 rounded">Review</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
