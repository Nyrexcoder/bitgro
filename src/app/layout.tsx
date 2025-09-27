import type { Metadata } from 'next';
import './globals.css';
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

export const metadata: Metadata = {
  title: 'bitgro',
  description: 'Smart Investment Platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          'font-body antialiased h-full bg-background',
          'font-sans'
        )}
      >
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
               <Button variant="ghost" className="w-full justify-start gap-2">
                 <Settings className="h-4 w-4" />
                 <span>Settings</span>
               </Button>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset>
            <main className="flex-1 flex flex-col">
              {children}
            </main>
            <footer className="p-4 text-center text-sm text-muted-foreground">
              all right reserved by nyrexDeveloper
            </footer>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
