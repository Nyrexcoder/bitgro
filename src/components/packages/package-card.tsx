
'use client';

import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Package } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, CheckCircle, Percent, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PackageCardProps {
  packageInfo: Package;
  isPopular?: boolean;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export function PackageCard({ packageInfo, isPopular = false }: PackageCardProps) {
  const { toast } = useToast();

  const handlePurchase = () => {
    toast({
      title: 'Purchase Successful!',
      description: `You have purchased the ${packageInfo.name}.`,
    });
  };

  return (
    <Card className={cn("flex flex-col border-2 hover:border-primary transition-all duration-300 transform hover:scale-105", isPopular ? "border-primary shadow-primary/20 shadow-lg" : "border-border")}>
        {isPopular && (
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-sm font-semibold">
                <Zap className="mr-2 h-4 w-4" />
                Popular
            </Badge>
        )}
      <CardHeader className="p-6">
            <CardTitle className="text-2xl font-bold text-center">{packageInfo.name}</CardTitle>
            <CardDescription className="text-center h-10">{packageInfo.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <div className="text-center my-4">
          <span className="text-4xl font-extrabold">{formatCurrency(packageInfo.price)}</span>
          <span className="text-sm text-muted-foreground">/one-time</span>
        </div>
        <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-muted-foreground">
                    <span className="font-semibold text-foreground">{packageInfo.weeklyProfitPercentage}%</span> Weekly Profit
                </span>
            </div>
             <div className="flex items-center gap-3">
                <Percent className="h-5 w-5 text-green-500" />
                <span className="text-muted-foreground">
                    <span className="font-semibold text-foreground">{packageInfo.referralBonusPercentage}%</span> Referral Bonus
                </span>
            </div>
        </div>
      </CardContent>
      <CardFooter className="p-6">
        <Button className="w-full" onClick={handlePurchase} variant={isPopular ? 'default' : 'outline'}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Purchase Package
        </Button>
      </CardFooter>
    </Card>
  );
}

    