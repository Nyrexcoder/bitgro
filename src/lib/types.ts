
export type Transaction = {
  id: string;
  walletId: string;
  transactionType: 'Purchase' | 'Profit' | 'Referral' | 'Withdrawal';
  amount: number;
  transactionDate: string; // ISO 8601 format
  description: string;
  relatedEntityId?: string;
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
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  walletId?: string;
};

export type UserPackage = {
    id: string;
    userId: string;
    packageId: string;
    purchaseDate: string; // ISO 8601 format
    isActive: boolean;
};

export type Wallet = {
    id: string;
    balance: number;
};
