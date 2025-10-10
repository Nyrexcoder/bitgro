
import type { Package, Transaction, User } from './types';

export const user: User = {
  name: 'Alice Johnson',
  email: 'alice@example.com',
  avatar: '/avatars/01.png',
  walletBalance: 12530.75,
  totalProfits: 4205.50,
  activePackagesCount: 3,
};

export const packages: Package[] = [
  {
    id: 'pkg_starter',
    name: 'Starter Pack',
    description: 'Perfect for getting started with smart investments.',
    price: 500,
    weeklyProfitPercentage: 5,
    referralBonusPercentage: 2,
    image: 'https://picsum.photos/seed/1/600/400',
    imageHint: 'abstract graph',
  },
  {
    id: 'pkg_growth',
    name: 'Growth Engine',
    description: 'Accelerate your earnings with higher returns.',
    price: 2000,
    weeklyProfitPercentage: 7,
    referralBonusPercentage: 3.5,
    image: 'https://picsum.photos/seed/2/600/400',
    imageHint: 'bull market',
  },
  {
    id: 'pkg_pro',
    name: 'Pro Investor',
    description: 'Maximize your potential with our premium plan.',
    price: 5000,
    weeklyProfitPercentage: 10,
    referralBonusPercentage: 5,
    image: 'https://picsum.photos/seed/3/600/400',
    imageHint: 'financial chart',
  },
  {
    id: 'pkg_enterprise',
    name: 'Enterprise Tier',
    description: 'For serious investors looking for the best returns.',
    price: 10000,
    weeklyProfitPercentage: 12,
    referralBonusPercentage: 7,
    image: 'https://picsum.photos/seed/4/600/400',
    imageHint: 'skyline night',
  },
];

export const transactions: Transaction[] = [
  {
    id: 'txn_1',
    date: '2023-10-26T10:00:00Z',
    description: 'Withdrawal to Bank **** 1234',
    amount: -1000.00,
    type: 'Withdrawal',
  },
  {
    id: 'txn_2',
    date: '2023-10-25T14:30:00Z',
    description: 'Weekly Profit: Growth Engine',
    amount: 140.00,
    type: 'Profit',
  },
  {
    id: 'txn_3',
    date: '2023-10-24T09:00:00Z',
    description: 'Referral Bonus from John D.',
    amount: 70.00,
    type: 'Referral',
  },
  {
    id: 'txn_4',
    date: '2023-10-23T18:45:00Z',
    description: 'Package Purchase: Growth Engine',
    amount: -2000.00,
    type: 'Purchase',
  },
  {
    id: 'txn_5',
    date: '2023-10-22T11:20:00Z',
    description: 'Weekly Profit: Starter Pack',
    amount: 25.00,
    type: 'Profit',
  },
  {
    id: 'txn_6',
    date: '2023-10-21T11:20:00Z',
    description: 'Weekly Profit: Starter Pack',
    amount: 25.00,
    type: 'Profit',
  },
  {
    id: 'txn_7',
    date: '2023-10-20T11:20:00Z',
    description: 'Package Purchase: Starter Pack',
    amount: -500.00,
    type: 'Purchase',
  },
  {
    id: 'txn_8',
    date: '2023-10-19T11:20:00Z',
    description: 'Initial Deposit',
    amount: 10000.00,
    type: 'Purchase',
  },
];

    