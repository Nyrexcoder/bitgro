'use client';

import { Header } from '@/components/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { ReferralForm } from '@/components/referrals/referral-form';
import { useToast } from '@/hooks/use-toast';

export default function ReferralsPage() {
  const { toast } = useToast();
  const referralLink = 'https://bitgro.app/join?ref=user123';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: 'Copied to clipboard!',
      description: 'Your referral link has been copied.',
    });
  };

  return (
    <div className="flex-1 flex flex-col">
      <Header title="Referrals" />
      <main className="flex-1 space-y-6 p-4 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle>Your Referral Link</CardTitle>
            <CardDescription>
              Share this link with others. You'll earn a bonus when they purchase a package.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="text" value={referralLink} readOnly />
              <Button type="button" size="icon" onClick={copyToClipboard}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <ReferralForm />
      </main>
    </div>
  );
}
