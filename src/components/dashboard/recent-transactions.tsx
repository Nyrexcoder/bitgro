'use client';
import { useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { Transaction } from '@/lib/types';
import { cn } from '@/lib/utils';
import { format, parseISO } from 'date-fns';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';


const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};

const getBadgeVariant = (
  type: Transaction['type']
): 'default' | 'secondary' | 'destructive' | 'outline' => {
  switch (type) {
    case 'Profit':
      return 'default';
    case 'Referral':
      return 'secondary';
    case 'Purchase':
      return 'outline';
    case 'Withdrawal':
      return 'destructive';
    default:
      return 'outline';
  }
};

export function RecentTransactions() {
  const { user: authUser } = useUser();
  const firestore = useFirestore();

  const transactionsQuery = useMemoFirebase(() => {
    if (!authUser || !firestore) return null;
    return query(
        collection(firestore, 'users', authUser.uid, 'wallets', authUser.uid, 'transactions'), 
        orderBy('transactionDate', 'desc'), 
        limit(5)
    );
  }, [authUser, firestore]);

  const { data: recentTransactions, isLoading } = useCollection<Transaction>(transactionsQuery);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>
          A quick look at your latest account activity.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
            <div className="flex justify-center items-center h-40">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead className="hidden sm:table-cell">Type</TableHead>
              <TableHead className="hidden sm:table-cell">Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentTransactions && recentTransactions.length > 0 ? (
                recentTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                    <TableCell>
                    <div className="font-medium">{transaction.description}</div>
                    <div className="text-sm text-muted-foreground md:hidden">
                        {format(parseISO(transaction.transactionDate), 'MMM d, yyyy')}
                    </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                    <Badge
                        variant={getBadgeVariant(transaction.transactionType as Transaction['type'])}
                        className="capitalize"
                    >
                        {transaction.transactionType}
                    </Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                    {format(parseISO(transaction.transactionDate), 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell
                    className={cn(
                        'text-right font-medium',
                        transaction.amount > 0
                        ? 'text-accent-foreground'
                        : 'text-foreground'
                    )}
                    >
                    {transaction.amount > 0 ? '+' : ''}
                    {formatCurrency(transaction.amount)}
                    </TableCell>
                </TableRow>
                ))
             ) : (
                <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                    No transactions found.
                    </TableCell>
                </TableRow>
             )}
          </TableBody>
        </Table>
        )}
      </CardContent>
    </Card>
  );
}
