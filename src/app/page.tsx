
import { AppLogo } from '@/components/app-logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <AppLogo />
            </Link>
          </div>
          <nav className="flex items-center space-x-6 text-sm font-medium"></nav>
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
        <section className="py-20 md:py-32">
          <div className="container text-center">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
              Smart Investments, Simplified.
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              bitgro is your trusted partner for navigating the world of modern
              investments. Grow your wealth with our expert-managed packages.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/signup">Start Investing Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/packages">Explore Packages</Link>
              </Button>
            </div>
            <div className="mt-16">
                 <Image 
                    src="https://picsum.photos/seed/herodashboard/1200/600"
                    alt="Dashboard preview"
                    width={1200}
                    height={600}
                    className="rounded-lg shadow-lg"
                    data-ai-hint="dashboard financial"
                  />
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-20 bg-muted">
          <div className="container">
            <div className="text-center">
              <h2 className="text-3xl font-bold">Why Choose bitgro?</h2>
              <p className="mt-2 text-muted-foreground">
                We provide the tools and expertise to help you succeed.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-semibold">Weekly Profits</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Earn consistent weekly returns on your investment packages,
                    automatically credited to your wallet.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-semibold">Generous Referrals</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Invite friends and earn a substantial bonus when they
                    invest. Our referral program is designed to reward you.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-semibold">Secure & Transparent</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    With state-of-the-art security and a clear view of your
                    transactions, your investments are in safe hands.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20">
          <div className="container">
            <div className="text-center">
              <h2 className="text-3xl font-bold">Loved by Investors Worldwide</h2>
              <p className="mt-2 text-muted-foreground">
                See what our users are saying about their success with bitgro.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <p className="italic">
                    "bitgro has completely changed how I approach investing.
                    The weekly profits are fantastic, and the platform is so easy
                    to use!"
                  </p>
                </CardContent>
                <CardHeader className="flex flex-row items-center gap-4">
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
                <CardHeader className="flex flex-row items-center gap-4">
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
                <CardHeader className="flex flex-row items-center gap-4">
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
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
