'use client';

import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { addDays, format, isWithinInterval, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

import { transactions as allTransactions } from '@/lib/data';
import type { Transaction } from '@/lib/types';

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

export function HistoryTable({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });

  const filteredTransactions = allTransactions.filter((transaction) => {
    if (!date?.from || !date?.to) return true;
    const transactionDate = parseISO(transaction.date);
    return isWithinInterval(transactionDate, { start: date.from, end: date.to });
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={'outline'}
              className={cn(
                'w-[300px] justify-start text-left font-normal',
                !date && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                  </>
                ) : (
                  format(date.from, 'LLL dd, y')
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead className="hidden sm:table-cell">Type</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <div className="font-medium">{transaction.description}</div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant={getBadgeVariant(transaction.type)} className="capitalize">
                      {transaction.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {format(parseISO(transaction.date), 'PPpp')}
                  </TableCell>
                  <TableCell
                    className={cn(
                      'text-right font-medium',
                      transaction.amount > 0 ? 'text-accent-foreground' : 'text-foreground'
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
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
