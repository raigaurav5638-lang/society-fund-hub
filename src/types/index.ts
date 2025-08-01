export interface Donation {
  id: string;
  donorName: string;
  amount: number;
  purpose: string;
  date: string;
  paymentMethod: 'cash' | 'online' | 'cheque';
  flatNumber?: string;
  phone?: string;
  email?: string;
}

export interface Collection {
  id: string;
  date: string;
  amount: number;
  collectedBy: string;
  purpose: string;
  notes?: string;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  approvedBy: string;
  receipt?: string;
  vendor?: string;
}

export interface Flat {
  id: string;
  number: string;
  ownerName: string;
  phone: string;
  email?: string;
  membershipFee: number;
  lastPaymentDate?: string;
  status: 'active' | 'inactive' | 'pending';
}

export interface DashboardStats {
  totalDonations: number;
  totalCollections: number;
  totalExpenses: number;
  netBalance: number;
  monthlyDonations: number;
  monthlyCollections: number;
  monthlyExpenses: number;
  totalFlats: number;
  activeFlats: number;
}