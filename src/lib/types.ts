
export type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'Purchase' | 'Profit' | 'Referral' | 'Withdrawal';
};

export type Package = {
  id: string;
  name: string;
  description: string;
  price: number;
  weeklyProfitPercentage: number;
  referralBonusPercentage: number;
  image: string;
  imageHint: string;
};

export type User = {
  name: string;
  email: string;
  avatar: string;
  walletBalance: number;
  totalProfits: number;
  activePackagesCount: number;
};

    