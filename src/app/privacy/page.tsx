
import { AppLogo } from '@/components/app-logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PrivacyPage() {
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
          <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Your privacy is important to us. It is bitgro's policy to
              respect your privacy regarding any information we may collect from
              you across our website.
            </p>
            <h2 className="text-xl font-semibold text-foreground">1. Information We Collect</h2>
            <p>
              We only ask for personal information when we truly need it to
              provide a service to you. We collect it by fair and lawful means,
              with your knowledge and consent. We also let you know why we’re
              collecting it and how it will be used.
            </p>
            <h2 className="text-xl font-semibold text-foreground">2. How We Use Your Information</h2>
            <p>
              We may use the information we collect in various ways, including to:
              provide, operate, and maintain our website; improve, personalize,
              and expand our website; understand and analyze how you use our
              website; develop new products, services, features, and
              functionality.
            </p>
             <h2 className="text-xl font-semibold text-foreground">3. Security</h2>
             <p>The security of your personal information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.</p>
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
