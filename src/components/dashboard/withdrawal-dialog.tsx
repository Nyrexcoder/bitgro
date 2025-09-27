'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ArrowDownToLine, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  fraudulentWithdrawalDetection,
  type FraudulentWithdrawalOutput,
} from '@/ai/flows/fraudulent-withdrawal-detection';
import { transactions, user } from '@/lib/data';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

const withdrawalSchema = z.object({
  amount: z.coerce
    .number()
    .positive({ message: 'Amount must be positive.' })
    .max(user.walletBalance, {
      message: 'Amount cannot exceed wallet balance.',
    }),
});

type WithdrawalFormValues = z.infer<typeof withdrawalSchema>;

export function WithdrawalDialog() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] =
    useState<FraudulentWithdrawalOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<WithdrawalFormValues>({
    resolver: zodResolver(withdrawalSchema),
    defaultValues: {
      amount: 0,
    },
  });

  async function onSubmit(values: WithdrawalFormValues) {
    setIsLoading(true);
    setAnalysisResult(null);
    try {
      const result = await fraudulentWithdrawalDetection({
        userId: 'user-123',
        withdrawalAmount: values.amount,
        withdrawalMethod: 'Bank Transfer',
        userAccountAgeDays: 365,
        transactionHistory: JSON.stringify(transactions.slice(0, 10)),
        averageDailyWithdrawal: 150.0,
        ipAddress: '127.0.0.1',
        location: 'New York, USA',
      });
      setAnalysisResult(result);
      if (!result.isFraudulent) {
        toast({
          title: 'Withdrawal Submitted',
          description: `Your request to withdraw $${values.amount} has been processed.`,
        });
        // In a real app, you would close the dialog after a successful non-fraudulent transaction
        // setOpen(false);
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Could not process your withdrawal request.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      form.reset();
      setAnalysisResult(null);
    }
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <ArrowDownToLine className="mr-2 h-4 w-4" /> Withdraw Funds
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request Withdrawal</DialogTitle>
          <DialogDescription>
            Enter the amount you wish to withdraw from your wallet.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Available Balance:
                <span className="font-medium text-foreground">
                  {' '}
                  ${user.walletBalance.toFixed(2)}
                </span>
              </p>
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {analysisResult && (
              <Alert variant={analysisResult.isFraudulent ? "destructive" : "default"}>
                <AlertTitle>
                  {analysisResult.isFraudulent ? 'Fraud Alert!' : 'Analysis Complete'}
                </AlertTitle>
                <AlertDescription>
                  {analysisResult.fraudExplanation} (Confidence: {(analysisResult.confidenceScore * 100).toFixed(1)}%)
                </AlertDescription>
              </Alert>
            )}

            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {analysisResult?.isFraudulent ? 'Retry' : 'Submit Request'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
