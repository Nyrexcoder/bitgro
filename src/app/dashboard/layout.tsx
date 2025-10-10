
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
                <footer className="p-4 text-center text-sm text-muted-foreground">
                  all right reserved by nyrexDeveloper
                </footer>
              </div>
            </SidebarInset>
          </SidebarProvider>
  );
}

