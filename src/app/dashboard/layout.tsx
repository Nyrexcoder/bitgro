
import type { Metadata } from 'next';
import { cn } from '@/lib/utils';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import { AppLogo } from '@/components/app-logo';
import { MainNav } from '@/components/main-nav';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';
import Link from 'next/link';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
          <SidebarProvider>
            <Sidebar>
              <SidebarHeader>
                <AppLogo />
              </SidebarHeader>
              <SidebarContent>
                <MainNav />
              </SidebarContent>
              <SidebarFooter>
                <Separator className="my-2" />
                 <Link href="/settings" passHref>
                   <Button variant="ghost" className="w-full justify-start gap-2">
                     <Settings className="h-4 w-4" />
                     <span>Settings</span>
                   </Button>
                 </Link>
              </SidebarFooter>
            </Sidebar>
            <SidebarInset>
              <div className="flex flex-col min-h-screen">
                <main className="flex-1 flex flex-col">
                  {children}
                </main>
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
                    <div className="mt-8 border-t pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
                      <p>&copy; {new Date().getFullYear()} bitgro. All rights reserved by nyrexDeveloper.</p>
                      <p className="mt-4 sm:mt-0">Admin Login: admin@bitgro.app / password</p>
                    </div>
                  </div>
                </footer>
              </div>
            </SidebarInset>
          </SidebarProvider>
  );
}
