import React from 'react';
import { Card, Button, Input } from '@medicycle/ui';
import { Search, Shield, Ban, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const mockUsers = [
  { id: 'USR-001', name: 'Alice Smith', role: 'Buyer', email: 'alice@example.com', status: 'Active', joined: 'Oct 2026' },
  { id: 'USR-002', name: 'City Health', role: 'Seller', email: 'store@cityhealth.com', status: 'Verified', joined: 'Sep 2026' },
  { id: 'USR-003', name: 'John Doe', role: 'Buyer', email: 'john@example.com', status: 'Suspended', joined: 'Oct 2026' },
];

export default function Users() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">User Management</h1>
          <p className="text-white/60">Manage buyers and sellers across the platform.</p>
        </div>
      </div>

      <Card glass className="p-0 overflow-hidden">
        <div className="p-4 border-b border-white/5 flex gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <Input placeholder="Search users by name or email..." className="pl-10" />
          </div>
          <Button variant="outline">Filter by Role</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-white/60">
              <tr>
                <th className="p-4 font-medium">User Name</th>
                <th className="p-4 font-medium">Email</th>
                <th className="p-4 font-medium">Role</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Joined</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockUsers.map((user, index) => (
                <motion.tr 
                  key={user.id} 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-white/5 transition-colors"
                >
                  <td className="p-4 font-medium text-white flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs">
                      {user.name.charAt(0)}
                    </div>
                    {user.name}
                  </td>
                  <td className="p-4 text-white/60">{user.email}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      user.role === 'Seller' ? 'bg-accent/20 text-accent' : 'bg-primary/20 text-primary'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      user.status === 'Active' || user.status === 'Verified' ? 'text-success' : 'text-red-400'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 text-white/60">{user.joined}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-colors" title="Manage Permissions">
                        <Shield className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-red-500/10 rounded-lg text-white/60 hover:text-red-400 transition-colors" title="Suspend User">
                        <Ban className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
