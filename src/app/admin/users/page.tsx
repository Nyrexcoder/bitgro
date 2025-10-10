
'use client';

import { useEffect } from 'react';
import { useMemoFirebase } from '@/firebase/provider';
import { doc } from 'firebase/firestore';
import { useDoc, useFirestore, useUser } from '@/firebase';
import { Header } from '@/components/header';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Loader2 } from 'lucide-react';


interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
}

function AdminUsersPageSkeleton() {
    return (
      <div className="flex-1 flex flex-col">
        <Header title="Manage Users">
          <Button disabled>
            <PlusCircle className="mr-2 h-4 w-4" /> Add User
          </Button>
        </Header>
        <main className="flex-1 p-4 md:p-8">
            <div className="flex items-center justify-center flex-1 h-full">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        </main>
      </div>
    );
}

function AdminUsersPageContent({ userProfile, users }: { userProfile: User, users: User[]}) {
    return (
        <div className="flex-1 flex flex-col">
        <Header title="Manage Users">
            <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add User
            </Button>
        </Header>
        <main className="flex-1 p-4 md:p-8">
            <Card>
            <CardHeader>
                <CardTitle>User Administration</CardTitle>
                <CardDescription>View and manage all users in the system.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead className="hidden sm:table-cell">Email</TableHead>
                    <TableHead className="hidden md:table-cell">Role</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.length > 0 ? (
                    users.map((user) => (
                        <TableRow key={user.id}>
                        <TableCell>
                            <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src={`https://avatar.vercel.sh/${user.email}.png`} alt={`${user.firstName} ${user.lastName}`} />
                                <AvatarFallback>{user.firstName?.[0]}{user.lastName?.[0]}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{user.firstName} {user.lastName}</div>
                            </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">{user.email}</TableCell>
                        <TableCell className="hidden md:table-cell">
                            <Badge variant={user.isAdmin ? 'default' : 'secondary'}>
                            {user.isAdmin ? 'Admin' : 'User'}
                            </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                            {/* Action buttons can go here */}
                        </TableCell>
                        </TableRow>
                    ))
                    ) : (
                    <TableRow>
                        <TableCell colSpan={4} className="h-24 text-center">
                        A secure implementation would use a Cloud Function to fetch all users.
                        </TableCell>
                    </TableRow>
                    )}
                </TableBody>
                </Table>
            </CardContent>
            </Card>
        </main>
        </div>
    );
}

export default function ManageUsersPage() {
  const firestore = useFirestore();
  const { user: authUser, isUserLoading: isAuthLoading } = useUser();
  const router = useRouter();

  const userDocRef = useMemoFirebase(() => {
    if (!firestore || !authUser) return null;
    return doc(firestore, 'users', authUser.uid);
  }, [firestore, authUser]);

  const { data: userProfile, isLoading: isProfileLoading } = useDoc<User>(userDocRef);

  const isLoading = isAuthLoading || isProfileLoading;

  useEffect(() => {
    // Wait until loading is fully complete
    if (!isLoading) {
      // If there's no authenticated user, redirect to login
      if (!authUser) {
        router.push('/login');
      } 
      // After confirming user is loaded and not an admin, redirect
      else if (userProfile && !userProfile.isAdmin) {
        router.push('/dashboard');
      }
    }
  }, [isLoading, authUser, userProfile, router]);


  // While loading, show the skeleton.
  if (isLoading || !userProfile) {
    return <AdminUsersPageSkeleton />;
  }

  // If loading is complete and we have an admin user, show the page.
  if (userProfile.isAdmin) {
    return <AdminUsersPageContent userProfile={userProfile} users={[userProfile]} />;
  }

  // If loading is complete but the user is not an admin, show skeleton while redirecting.
  return <AdminUsersPageSkeleton />;
}
