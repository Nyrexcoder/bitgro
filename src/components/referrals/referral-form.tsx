'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { BrainCircuit, Loader2 } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import {
  allocateReferralIncome,
  type ReferralIncomeAllocationOutput,
} from '@/ai/flows/referral-income-allocation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const referralSchema = z.object({
  userLevel: z.string().min(1, { message: 'Please select a user level.' }),
  systemConditions: z.string().min(1, { message: 'Please select system conditions.' }),
  referralSuccessRate: z.coerce
    .number()
    .min(0, { message: 'Success rate must be at least 0.' })
    .max(1, { message: 'Success rate cannot be more than 1.' }),
  totalInvestment: z.coerce
    .number()
    .positive({ message: 'Investment must be a positive number.' }),
});

type ReferralFormValues = z.infer<typeof referralSchema>;

export function ReferralForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] =
    useState<ReferralIncomeAllocationOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<ReferralFormValues>({
    resolver: zodResolver(referralSchema),
    defaultValues: {
      userLevel: 'Silver',
      systemConditions: 'Normal',
      referralSuccessRate: 0.5,
      totalInvestment: 1000,
    },
  });

  async function onSubmit(values: ReferralFormValues) {
    setIsLoading(true);
    setAnalysisResult(null);
    try {
      const result = await allocateReferralIncome(values);
      setAnalysisResult(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Could not get AI recommendation.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI-Powered Referral Allocation</CardTitle>
        <CardDescription>
          Use our AI tool to determine the optimal referral income percentage for a specific scenario.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="userLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Level</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select user level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Bronze">Bronze</SelectItem>
                        <SelectItem value="Silver">Silver</SelectItem>
                        <SelectItem value="Gold">Gold</SelectItem>
                        <SelectItem value="Platinum">Platinum</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="systemConditions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>System Conditions</FormLabel>
                    <Select
                      onValuechange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select system conditions" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Low Engagement">
                          Low Engagement
                        </SelectItem>
                        <SelectItem value="Normal">Normal</SelectItem>
                        <SelectItem value="High Traffic">High Traffic</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="referralSuccessRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Referral Success Rate (0-1)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="totalInvestment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Referred User Investment (₹)</FormLabel>
                    <FormControl>
                      <Input type="number" step="100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
             {analysisResult && (
              <Alert>
                <BrainCircuit className="h-4 w-4" />
                <AlertTitle>AI Recommendation</AlertTitle>
                <AlertDescription className="space-y-2">
                  <p className="font-bold text-lg text-primary">
                    Allocate {(analysisResult.referralIncomePercentage).toFixed(2)}%
                  </p>
                  <p className="text-sm">{analysisResult.reasoning}</p>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="ml-auto">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Get Recommendation
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
