
import { AppLogo } from '@/components/app-logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
       <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <AppLogo />
            </Link>
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
       <main className="flex-1 py-12 md:py-24">
        <div className="container max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Welcome to bitgro! These terms and conditions outline the rules
              and regulations for the use of our website and services.
            </p>
            <h2 className="text-xl font-semibold text-foreground">1. Introduction</h2>
            <p>
              By accessing this website we assume you accept these terms and
              conditions. Do not continue to use bitgro if you do not agree
              to take all of the terms and conditions stated on this page.
            </p>
            <h2 className="text-xl font-semibold text-foreground">2. License</h2>
            <p>
              Unless otherwise stated, bitgro and/or its licensors own the
              intellectual property rights for all material on bitgro. All
              intellectual property rights are reserved. You may access this
              from bitgro for your own personal use subjected to restrictions
              set in these terms and conditions.
            </p>
            <h2 className="text-xl font-semibold text-foreground">3. User Comments</h2>
             <p>This Agreement shall begin on the date hereof. Certain parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. bitgro does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of bitgro,its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, bitgro shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.</p>
          </div>
        </div>
      </main>
        <footer className="border-t">
            <div className="container py-6 text-center text-sm text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} bitgro. All rights reserved by nyrexDeveloper.</p>
            </div>
        </footer>
    </div>
  );
}
