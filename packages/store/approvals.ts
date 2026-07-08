import { create } from 'zustand';

export interface Approval {
  id: string;
  type: 'Pharmacy Verification' | 'Medicine Listing';
  subject: string;
  submittedBy: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

interface ApprovalsState {
  approvals: Approval[];
  updateApprovalStatus: (id: string, status: Approval['status']) => void;
}

const mockApprovals: Approval[] = [
  { id: 'REQ-089', type: 'Pharmacy Verification', subject: 'Downtown Pharmacy License', submittedBy: 'Sarah Jenkins', date: '2 hours ago', status: 'Pending' },
  { id: 'REQ-088', type: 'Medicine Listing', subject: 'Bulk Paracetamol 500mg', submittedBy: 'City Health', date: '5 hours ago', status: 'Pending' },
  { id: 'REQ-087', type: 'Medicine Listing', subject: 'Amoxicillin 250mg', submittedBy: 'City Health', date: '1 day ago', status: 'Approved' },
];

export const useApprovalsStore = create<ApprovalsState>((set) => ({
  approvals: mockApprovals,
  updateApprovalStatus: (id, status) => set((state) => ({
    approvals: state.approvals.map(a => a.id === id ? { ...a, status } : a)
  }))
}));
