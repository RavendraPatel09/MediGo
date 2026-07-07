import React from 'react';
import { Card, Button, Input } from '@medicycle/ui';
import { MessageSquare, MoreVertical, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const mockMessages = [
  { id: 1, customer: 'John Doe', message: 'Is this available for pickup today?', time: '2m ago', unread: true },
  { id: 2, customer: 'Alice Smith', message: 'Can you offer a discount if I buy 5?', time: '1h ago', unread: false },
];

export default function Messages() {
  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6">
      {/* Sidebar List */}
      <Card glass className="w-1/3 flex flex-col p-0 overflow-hidden">
        <div className="p-4 border-b border-white/5">
          <Input placeholder="Search messages..." />
        </div>
        <div className="flex-1 overflow-y-auto">
          {mockMessages.map((msg, i) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors ${msg.unread ? 'bg-primary/5' : ''}`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className={`font-semibold ${msg.unread ? 'text-white' : 'text-white/80'}`}>{msg.customer}</span>
                <span className="text-xs text-white/40">{msg.time}</span>
              </div>
              <p className="text-sm text-white/60 truncate">{msg.message}</p>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Chat Window Placeholder */}
      <Card glass className="flex-1 flex flex-col p-0 overflow-hidden relative">
        <div className="p-4 border-b border-white/5 flex justify-between items-center bg-surface/50">
          <div>
            <h3 className="font-semibold">John Doe</h3>
            <p className="text-xs text-success">Online</p>
          </div>
          <Button variant="ghost" size="sm"><MoreVertical className="w-5 h-5" /></Button>
        </div>
        
        <div className="flex-1 p-6 flex flex-col justify-end space-y-4">
          <div className="self-start max-w-[80%]">
            <div className="bg-white/10 text-white px-4 py-2 rounded-2xl rounded-tl-sm text-sm">
              Is this available for pickup today?
            </div>
            <span className="text-xs text-white/40 mt-1 block">2m ago</span>
          </div>
          
          <div className="self-end max-w-[80%]">
            <div className="bg-primary text-white px-4 py-2 rounded-2xl rounded-tr-sm text-sm">
              Yes, we have 15 in stock! You can come by anytime before 8 PM.
            </div>
            <span className="text-xs text-white/40 mt-1 flex items-center justify-end gap-1">
              Just now <Check className="w-3 h-3 text-primary" />
            </span>
          </div>
        </div>
        
        <div className="p-4 border-t border-white/5 bg-surface/50 flex gap-3">
          <Input className="flex-1 bg-white/5" placeholder="Type a message..." />
          <Button>Send</Button>
        </div>
      </Card>
    </div>
  );
}
