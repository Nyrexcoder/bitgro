'use client';

import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Package } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart } from 'lucide-react';

interface PackageCardProps {
  packageInfo: Package;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export function PackageCard({ packageInfo }: PackageCardProps) {
  const { toast } = useToast();

  const handlePurchase = () => {
    toast({
      title: 'Purchase Successful!',
      description: `You have purchased the ${packageInfo.name}.`,
    });
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={packageInfo.image}
            alt={packageInfo.name}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
            data-ai-hint={packageInfo.imageHint}
          />
        </div>
        <div className="p-6 pb-2">
            <CardTitle>{packageInfo.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex justify-between items-baseline mb-4">
          <span className="text-3xl font-bold">{formatCurrency(packageInfo.price)}</span>
          <span className="text-sm text-muted-foreground">one-time purchase</span>
        </div>
        <div className="space-y-2 text-sm">
            <div className="flex justify-between">
                <span className="text-muted-foreground">Weekly Profit</span>
                <span className="font-medium text-accent-foreground">{packageInfo.weeklyProfitPercentage}%</span>
            </div>
             <div className="flex justify-between">
                <span className="text-muted-foreground">Referral Bonus</span>
                <span className="font-medium">{packageInfo.referralBonusPercentage}%</span>
            </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handlePurchase}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Purchase Package
        </Button>
      </CardFooter>
    </Card>
  );
}
