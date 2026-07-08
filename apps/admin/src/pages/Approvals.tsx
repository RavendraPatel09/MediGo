
import { Card, Button } from '@medicycle/ui';
import { Check, X, ShieldAlert, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApprovalsStore } from '@medicycle/store';

export default function Approvals() {
  const approvals = useApprovalsStore(state => state.approvals);
  const updateApprovalStatus = useApprovalsStore(state => state.updateApprovalStatus);
  const pendingApprovals = approvals.filter(a => a.status === 'Pending');
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold mb-2">Pending Approvals</h1>
        <p className="text-white/60">Review new seller registrations and medicine listings.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {pendingApprovals.map((req, i) => (
          <motion.div key={req.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
            <Card glass className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex gap-4 items-start">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  req.type === 'Pharmacy Verification' ? 'bg-accent/20 text-accent' : 'bg-primary/20 text-primary'
                }`}>
                  {req.type === 'Pharmacy Verification' ? <FileText className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-semibold">{req.subject}</h3>
                    <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-white/70">{req.id}</span>
                  </div>
                  <p className="text-white/60 text-sm mb-2">{req.type} • Submitted {req.date}</p>
                </div>
              </div>

              <div className="flex w-full md:w-auto gap-3 shrink-0 mt-4 md:mt-0">
                <Button 
                  onClick={() => updateApprovalStatus(req.id, 'Rejected')}
                  variant="outline" 
                  className="flex-1 md:flex-none border-red-500/50 hover:bg-red-500/10 text-red-400"
                >
                  <X className="w-4 h-4 mr-2" /> Reject
                </Button>
                <Button 
                  onClick={() => updateApprovalStatus(req.id, 'Approved')}
                  className="flex-1 md:flex-none bg-success hover:bg-success/90"
                >
                  <Check className="w-4 h-4 mr-2" /> Approve
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
        
        {pendingApprovals.length === 0 && (
          <div className="text-center py-12 text-white/50">
            No pending approvals found.
          </div>
        )}
      </div>
    </div>
  );
}
