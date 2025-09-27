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
import { transactions } from '@/lib/data';
import type { Transaction } from '@/lib/types';
import { cn } from '@/lib/utils';
import { format, parseISO } from 'date-fns';

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
  const recentTransactions = transactions.slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>
          A quick look at your latest account activity.
        </CardDescription>
      </CardHeader>
      <CardContent>
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
            {recentTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  <div className="font-medium">{transaction.description}</div>
                  <div className="text-sm text-muted-foreground md:hidden">
                    {format(parseISO(transaction.date), 'MMM d, yyyy')}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge
                    variant={getBadgeVariant(transaction.type)}
                    className="capitalize"
                  >
                    {transaction.type}
                  </Badge>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                   {format(parseISO(transaction.date), 'MMM d, yyyy')}
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
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
