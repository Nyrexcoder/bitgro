'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Users,
  ArrowLeftRight,
  Shield,
} from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar';
import { useUser } from '@/firebase';

const links = [
  {
    href: '/',
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

export function MainNav() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  const { user } = useUser();
  
  // A real app would have more robust role management.
  // Here we assume any authenticated non-anonymous user is an admin.
  const isAdmin = user && !user.isAnonymous; 

  const handleLinkClick = () => {
    setOpenMobile(false);
  };

  return (
    <SidebarMenu>
      {links.map((link) => (
        <SidebarMenuItem key={link.href}>
          <Link href={link.href} passHref>
            <SidebarMenuButton
              isActive={pathname === link.href}
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
