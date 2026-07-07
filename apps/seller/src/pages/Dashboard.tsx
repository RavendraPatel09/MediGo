
import { Card } from '@medicycle/ui';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Package, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

const data = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 2000 },
  { name: 'Thu', revenue: 2780 },
  { name: 'Fri', revenue: 1890 },
  { name: 'Sat', revenue: 2390 },
  { name: 'Sun', revenue: 3490 },
];

const stats = [
  { title: 'Total Revenue', value: '$24,560', change: '+12.5%', icon: DollarSign, color: 'text-primary', bg: 'bg-primary/10' },
  { title: 'Active Orders', value: '142', change: '+5.2%', icon: Package, color: 'text-success', bg: 'bg-success/10' },
  { title: 'Total Customers', value: '1,204', change: '+18.1%', icon: Users, color: 'text-accent', bg: 'bg-accent/10' },
  { title: 'Growth Rate', value: '24%', change: '+2.4%', icon: TrendingUp, color: 'text-warning', bg: 'bg-warning/10' },
];

export default function Dashboard() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome back, Seller!</h1>
        <p className="text-white/60">Here's what's happening with your store today.</p>
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
                  <span className="text-success text-sm font-medium bg-success/10 px-2 py-1 rounded-full">
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-white/60 text-sm font-medium mb-1">{stat.title}</h3>
                <p className="text-3xl font-bold">{stat.value}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card glass className="lg:col-span-2 p-6">
          <h3 className="text-xl font-bold mb-6">Revenue Overview</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff50" axisLine={false} tickLine={false} />
                <YAxis stroke="#ffffff50" axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#10B981' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card glass className="p-6">
          <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-success mt-2 shrink-0 relative">
                  {i !== 4 && <div className="absolute top-4 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-white/10" />}
                </div>
                <div>
                  <p className="text-sm font-medium">New order #ORD-9{i}2</p>
                  <p className="text-xs text-white/50 mt-1">{i * 15} minutes ago</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
