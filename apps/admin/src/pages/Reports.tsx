import React from 'react';
import { Card, Button } from '@medicycle/ui';
import { Download, AlertTriangle, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Reports() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">Reports & Audit Logs</h1>
          <p className="text-white/60">Export data and monitor flagged system events.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" /> Export CSV
          </Button>
          <Button variant="primary" className="gap-2 bg-accent hover:bg-accent/90">
            <Download className="w-4 h-4" /> Export PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card glass className="p-6 h-96 overflow-y-auto">
          <h3 className="text-xl font-bold mb-6 text-red-400 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" /> Fraud Detection Alerts
          </h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 rounded-lg bg-red-500/5 border border-red-500/10">
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-red-400">Suspicious IP Activity</span>
                  <span className="text-xs text-white/40">10 mins ago</span>
                </div>
                <p className="text-sm text-white/70">Multiple failed login attempts from IP 192.168.1.{i}x targeting admin accounts.</p>
              </div>
            ))}
          </div>
        </Card>

        <Card glass className="p-6 h-96 overflow-y-auto">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-accent" /> System Audit Logs
          </h3>
          <div className="space-y-4 relative">
            <div className="absolute left-[11px] top-4 bottom-4 w-px bg-white/10" />
            {[
              { act: 'Seller PharmaCo approved', user: 'Admin 1', time: '1h ago' },
              { act: 'Role changed for USR-003', user: 'System', time: '3h ago' },
              { act: 'Database backup completed', user: 'System', time: '12h ago' }
            ].map((log, i) => (
              <div key={i} className="relative pl-8 pb-4">
                <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-surface border border-white/20 z-10 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                </div>
                <p className="font-medium text-sm">{log.act}</p>
                <p className="text-xs text-white/50">{log.user} • {log.time}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
