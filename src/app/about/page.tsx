
import { AppLogo } from '@/components/app-logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <AppLogo />
            </Link>
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground/60">Home</Link>
              <Link href="/about" className="transition-colors hover:text-foreground/80 text-foreground">About</Link>
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
       <main className="flex-1 py-12 md:py-24">
        <div className="container max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">About Us</h1>
          <div className="space-y-4 text-muted-foreground">
            <p>
              bitgro is a platform dedicated to making smart investments accessible to everyone. We believe in empowering our users with the tools and knowledge to grow their wealth confidently.
            </p>
            <p>
                Our team of financial experts and technologists work tirelessly to curate the best investment opportunities and build a secure, transparent, and easy-to-use platform.
            </p>
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

    