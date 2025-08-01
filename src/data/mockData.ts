import { Donation, Collection, Expense, Flat, DashboardStats } from '@/types';

export const mockDonations: Donation[] = [
  {
    id: '1',
    donorName: 'Rajesh Kumar',
    amount: 5000,
    purpose: 'Festival Celebration',
    date: '2024-01-15',
    paymentMethod: 'online',
    flatNumber: 'A-101',
    phone: '+91 9876543210',
    email: 'rajesh@email.com'
  },
  {
    id: '2',
    donorName: 'Priya Sharma',
    amount: 2500,
    purpose: 'Temple Maintenance',
    date: '2024-01-12',
    paymentMethod: 'cash',
    flatNumber: 'B-205',
    phone: '+91 9876543211'
  },
  {
    id: '3',
    donorName: 'Anand Patel',
    amount: 10000,
    purpose: 'New Temple Construction',
    date: '2024-01-10',
    paymentMethod: 'cheque',
    flatNumber: 'C-304',
    phone: '+91 9876543212',
    email: 'anand@email.com'
  },
  {
    id: '4',
    donorName: 'Sunita Devi',
    amount: 1500,
    purpose: 'Daily Aarti Supplies',
    date: '2024-01-08',
    paymentMethod: 'cash',
    flatNumber: 'A-102',
    phone: '+91 9876543213'
  }
];

export const mockCollections: Collection[] = [
  {
    id: '1',
    date: '2024-01-15',
    amount: 3500,
    collectedBy: 'Ram Prasad',
    purpose: 'Weekly Collection',
    notes: 'Door-to-door collection'
  },
  {
    id: '2',
    date: '2024-01-14',
    amount: 2800,
    collectedBy: 'Geeta Sharma',
    purpose: 'Festival Special Collection',
    notes: 'Special collection for upcoming festival'
  },
  {
    id: '3',
    date: '2024-01-13',
    amount: 4200,
    collectedBy: 'Mohan Lal',
    purpose: 'Monthly Membership',
    notes: 'Monthly membership fees'
  }
];

export const mockExpenses: Expense[] = [
  {
    id: '1',
    description: 'Flowers and Garlands',
    amount: 1200,
    category: 'Pooja Supplies',
    date: '2024-01-15',
    approvedBy: 'Secretary',
    vendor: 'Local Flower Shop'
  },
  {
    id: '2',
    description: 'Electricity Bill',
    amount: 3500,
    category: 'Utilities',
    date: '2024-01-14',
    approvedBy: 'Treasurer',
    vendor: 'State Electricity Board'
  },
  {
    id: '3',
    description: 'Sound System Repair',
    amount: 2800,
    category: 'Maintenance',
    date: '2024-01-12',
    approvedBy: 'President',
    vendor: 'Audio Tech Services'
  },
  {
    id: '4',
    description: 'Cleaning Supplies',
    amount: 800,
    category: 'Maintenance',
    date: '2024-01-10',
    approvedBy: 'Secretary',
    vendor: 'General Store'
  }
];

export const mockFlats: Flat[] = [
  {
    id: '1',
    number: 'A-101',
    ownerName: 'Rajesh Kumar',
    phone: '+91 9876543210',
    email: 'rajesh@email.com',
    membershipFee: 500,
    lastPaymentDate: '2024-01-01',
    status: 'active'
  },
  {
    id: '2',
    number: 'A-102',
    ownerName: 'Sunita Devi',
    phone: '+91 9876543213',
    membershipFee: 500,
    lastPaymentDate: '2023-12-15',
    status: 'pending'
  },
  {
    id: '3',
    number: 'B-205',
    ownerName: 'Priya Sharma',
    phone: '+91 9876543211',
    membershipFee: 500,
    lastPaymentDate: '2024-01-05',
    status: 'active'
  },
  {
    id: '4',
    number: 'C-304',
    ownerName: 'Anand Patel',
    phone: '+91 9876543212',
    email: 'anand@email.com',
    membershipFee: 500,
    lastPaymentDate: '2024-01-01',
    status: 'active'
  },
  {
    id: '5',
    number: 'B-201',
    ownerName: 'Vikram Singh',
    phone: '+91 9876543214',
    membershipFee: 500,
    status: 'inactive'
  }
];

export const mockDashboardStats: DashboardStats = {
  totalDonations: 19000,
  totalCollections: 10500,
  totalExpenses: 8300,
  netBalance: 21200,
  monthlyDonations: 19000,
  monthlyCollections: 10500,
  monthlyExpenses: 8300,
  totalFlats: 5,
  activeFlats: 3
};