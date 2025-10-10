'use client';
import { useMemo } from 'react';
import { collection, query, limit } from 'firebase/firestore';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';

import { AppLogo } from '@/components/app-logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, TrendingUp, Users, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { PackageCard } from '@/components/packages/package-card';
import type { Package } from '@/lib/types';


export default function LandingPage() {
  const firestore = useFirestore();

  const packagesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'packages'), limit(4));
  }, [firestore]);

  const { data: packages, isLoading } = useCollection<Omit<Package, 'image' | 'imageHint'>>(packagesQuery);

    // Manually add image and imageHint for now as they are not in the DB schema
    const packagesWithImages = packages?.map((pkg, index) => ({
      ...pkg,
      image: `https://picsum.photos/seed/${index + 1}/600/400`,
      imageHint: 'financial image',
    }));


  return (
    <div className="flex-1 flex flex-col min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <AppLogo />
            </Link>
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground">Home</Link>
              <Link href="/about" className="transition-colors hover:text-foreground/80 text-foreground/60">About</Link>
              <Link href="/contact" className="transition-colors hover:text-foreground/80 text-foreground/60">Contact</Link>
              <Link href="/packages" className="transition-colors hover:text-foreground/80 text-foreground/60">Packages</Link>
            </nav>
          </div>
          
          <div className="flex flex-1 items-center justify-end space-x-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 animate-fade-in">
            <div
                aria-hidden="true"
                className="absolute inset-0 top-0 z-0 h-full w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,hsl(var(--primary)/0.1),rgba(255,255,255,0))]"
            ></div>
          <div className="container relative z-10 text-center">
            <h1 className="text-5xl font-extrabold tracking-tighter lg:text-6xl">
              Smart Investments, <span className="text-primary">Simplified.</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
              bitgro is your trusted partner for navigating the world of modern
              investments. Grow your wealth with our expert-managed packages.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/signup">Start Investing Now <ArrowRight className="ml-2" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#packages">Explore Packages</Link>
              </Button>
            </div>
            <div className="mt-16 group">
                <div className="relative">
                    <div className="absolute -inset-2 bg-gradient-to-r from-primary/50 to-accent/50 rounded-lg blur-xl opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                    <Image 
                        src="https://picsum.photos/seed/herodashboard/1200/600"
                        alt="Dashboard preview"
                        width={1200}
                        height={600}
                        className="rounded-lg shadow-2xl mx-auto relative transform group-hover:scale-105 transition-transform duration-300"
                        data-ai-hint="dashboard financial"
                    />
                 </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-20 bg-muted animate-fade-in animation-delay-200">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold">Why Choose bitgro?</h2>
              <p className="mt-2 text-muted-foreground">
                We provide the tools and expertise to help you succeed.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="text-xl font-semibold">Weekly Profits</h3>
                  <p className="text-muted-foreground mt-2">
                    Earn consistent weekly returns on your investment packages,
                    automatically credited to your wallet.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                 <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Users className="h-6 w-6" />
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="text-xl font-semibold">Generous Referrals</h3>
                  <p className="text-muted-foreground mt-2">
                    Invite friends and earn a substantial bonus when they
                    invest. Our referral program is designed to reward you.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                 <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Lock className="h-6 w-6" />
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="text-xl font-semibold">Secure & Transparent</h3>
                  <p className="text-muted-foreground mt-2">
                    With state-of-the-art security and a clear view of your
                    transactions, your investments are in safe hands.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Packages Section */}
        <section id="packages" className="py-20 animate-fade-in animation-delay-400">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold">Our Investment Packages</h2>
                <p className="mt-2 text-muted-foreground">
                Choose the plan that's right for you and start growing your wealth today.
                </p>
            </div>
             {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
                ) : (
                <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
                {packagesWithImages?.map((pkg, index) => (
                    <PackageCard key={pkg.id} packageInfo={pkg} isPopular={index === 1} />
                ))}
                </div>
            )}
            <div className="mt-12 text-center">
                <Button size="lg" variant="outline" asChild>
                    <Link href="/packages">View All Packages</Link>
                </Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-muted animate-fade-in animation-delay-600">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold">Loved by Investors Worldwide</h2>
              <p className="mt-2 text-muted-foreground">
                See what our users are saying about their success with bitgro.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              <Card>
                <CardContent className="pt-6">
                  <p className="italic">
                    "bitgro has completely changed how I approach investing.
                    The weekly profits are fantastic, and the platform is so easy
                    to use!"
                  </p>
                </CardContent>
                <CardHeader>
                  <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src="https://avatar.vercel.sh/sarah.png" alt="Sarah J." />
                        <AvatarFallback>SJ</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">Sarah J.</p>
                        <p className="text-sm text-muted-foreground">
                          Pro Investor
                        </p>
                      </div>
                  </div>
                </CardHeader>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <p className="italic">
                    "The referral program is a game-changer. I've earned
                    significant bonuses just by sharing bitgro with my
                    network. Highly recommended!"
                  </p>
                </CardContent>
                <CardHeader>
                   <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src="https://avatar.vercel.sh/mark.png" alt="Mark C." />
                        <AvatarFallback>MC</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">Mark C.</p>
                        <p className="text-sm text-muted-foreground">
                          Growth Engine User
                        </p>
                      </div>
                   </div>
                </CardHeader>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <p className="italic">
                    "As someone new to investing, bitgro's simplicity and
                    transparency gave me the confidence to get started. I'm
                    already seeing great returns."
                  </p>
                </CardContent>
                <CardHeader>
                  <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src="https://avatar.vercel.sh/emily.png" alt="Emily R." />
                        <AvatarFallback>ER</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">Emily R.</p>
                        <p className="text-sm text-muted-foreground">
                          Starter Pack User
                        </p>
                      </div>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>
      </main>

       {/* Footer */}
      <footer className="border-t">
        <div className="container py-12">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-2">
              <AppLogo />
              <p className="text-sm text-muted-foreground">
                Smart Investments, Simplified.
              </p>
            </div>
            <div className="grid grid-cols-2 md:col-span-2 gap-8">
              <div className="space-y-2">
                <h4 className="font-semibold">Company</h4>
                <ul className="space-y-1">
                  <li><Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">About Us</Link></li>
                  <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link></li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Legal</h4>
                <ul className="space-y-1">
                  <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">Terms & Conditions</Link></li>
                  <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} bitgro. All rights reserved by nyrexDeveloper.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
