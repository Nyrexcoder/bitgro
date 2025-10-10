'use client';
import { useMemo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Wallet, TrendingUp, Package } from 'lucide-react';
import { WithdrawalDialog } from './withdrawal-dialog';
import { useCountUp } from '@/hooks/use-count-up';
import { useUser, useFirestore, useDoc, useCollection, useMemoFirebase } from '@/firebase';
import { doc, collection, query, where, getDocs } from 'firebase/firestore';
import type { User, UserPackage, Wallet as UserWallet } from '@/lib/types';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};

export function OverviewCards() {
  const { user: authUser } = useUser();
  const firestore = useFirestore();

  const walletRef = useMemoFirebase(() => {
    if (!authUser || !firestore) return null;
    // Assuming a single wallet per user, with a known or discoverable ID.
    // For this app, we'll assume the wallet ID is the same as the user ID for simplicity.
    return doc(firestore, 'users', authUser.uid, 'wallets', authUser.uid);
  }, [authUser, firestore]);

  const userPackagesQuery = useMemoFirebase(() => {
    if (!authUser || !firestore) return null;
    return query(collection(firestore, 'users', authUser.uid, 'userPackages'), where('isActive', '==', true));
  }, [authUser, firestore]);

  const transactionsQuery = useMemoFirebase(() => {
    if (!authUser || !firestore) return null;
    return query(collection(firestore, 'users', authUser.uid, 'wallets', authUser.uid, 'transactions'), where('type', '==', 'Profit'));
  }, [authUser, firestore]);


  const { data: walletData, isLoading: isWalletLoading } = useDoc<UserWallet>(walletRef);
  const { data: activePackagesData, isLoading: isActivePackagesLoading } = useCollection<UserPackage>(userPackagesQuery);
  const { data: profitTransactions, isLoading: areProfitsLoading } = useCollection(transactionsQuery);

  const totalProfits = useMemo(() => {
    return profitTransactions?.reduce((sum, t) => sum + t.amount, 0) || 0;
  }, [profitTransactions]);


  const walletBalance = useCountUp(walletData?.balance || 0);
  const totalProfitsCountUp = useCountUp(totalProfits);
  const activePackagesCount = useCountUp(activePackagesData?.length || 0);
  
  const walletBalanceForDialog = walletData?.balance || 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isWalletLoading ? '...' : formatCurrency(walletBalance)}
          </div>
          <div className="mt-4 flex items-center gap-2">
            <WithdrawalDialog walletBalance={walletBalanceForDialog} />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Profits</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-accent-foreground">
            {areProfitsLoading ? '...' : formatCurrency(totalProfitsCountUp)}
          </div>
          <p className="text-xs text-muted-foreground">+20.1% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Active Investments
          </CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{isActivePackagesLoading ? '...' : activePackagesCount}</div>
          <p className="text-xs text-muted-foreground">+1 since last week</p>
        </CardContent>
      </Card>
    </div>
  );
}
