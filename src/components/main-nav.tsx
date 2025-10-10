
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Users,
  ArrowLeftRight,
  Shield,
  Home,
} from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar';
import { useUser, useFirestore, useDoc } from '@/firebase';
import { useMemoFirebase } from '@/firebase/provider';
import { doc } from 'firebase/firestore';


const links = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/packages',
    label: 'Packages',
    icon: Package,
  },
  {
    href: '/referrals',
    label: 'Referrals',
    icon: Users,
  },
  {
    href: '/transactions',
    label: 'Transactions',
    icon: ArrowLeftRight,
  },
];

const adminLinks = [
  {
    href: '/admin/users',
    label: 'Manage Users',
    icon: Shield,
  },
]

interface UserProfile {
  isAdmin: boolean;
}

export function MainNav() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const userDocRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userDocRef);

  // Determine if the user is an admin, but only after all data has loaded.
  const isLoading = isUserLoading || isProfileLoading;
  const isAdmin = !isLoading && userProfile?.isAdmin === true;

  const handleLinkClick = () => {
    if (setOpenMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <SidebarMenu>
        <SidebarMenuItem>
          <Link href="/" passHref>
            <SidebarMenuButton
              isActive={pathname === '/'}
              className="w-full"
              asChild
              onClick={handleLinkClick}
            >
              <span>
                <Home className="mr-2 h-4 w-4" />
                <span>Home</span>
              </span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      {links.map((link) => (
        <SidebarMenuItem key={link.href}>
          <Link href={link.href} passHref>
            <SidebarMenuButton
              isActive={pathname.startsWith(link.href) && link.href !== '/'}
              className="w-full"
              asChild
              onClick={handleLinkClick}
            >
              <span>
                <link.icon className="mr-2 h-4 w-4" />
                <span>{link.label}</span>
              </span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
      {isAdmin && (
        <SidebarMenuItem>
          <div className="my-2">
            <h2 className="px-4 text-xs font-semibold text-muted-foreground">Admin</h2>
          </div>
          {adminLinks.map((link) => (
            <Link href={link.href} passHref key={link.href}>
              <SidebarMenuButton
                isActive={pathname.startsWith(link.href)}
                className="w-full"
                asChild
                onClick={handleLinkClick}
              >
                <span>
                  <link.icon className="mr-2 h-4 w-4" />
                  <span>{link.label}</span>
                </span>
              </SidebarMenuButton>
            </Link>
          ))}
        </SidebarMenuItem>
      )}
    </SidebarMenu>
  );
}
