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
                  {[...Array(3)].map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Skeleton className="h-10 w-10 rounded-full" />
                          <div className="space-y-2">
                             <Skeleton className="h-4 w-32" />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell"><Skeleton className="h-4 w-48" /></TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Skeleton className="h-6 w-16 rounded-full" />
                      </TableCell>
                      <TableCell className="text-right">
                        <Skeleton className="h-9 w-20" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
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
    console.log('[Debug] isLoading:', isLoading);
    console.log('[Debug] authUser:', authUser);
    console.log('[Debug] userProfile:', userProfile);

    // Wait until all loading is complete before making a decision.
    if (isLoading) {
      console.log('[Debug] Still loading, waiting...');
      return; // Still loading, do nothing.
    }

    // If loading is finished and there's no authenticated user, redirect to login.
    if (!authUser) {
      console.log('[Debug] No authUser found. Redirecting to /login.');
      // router.push('/login');
      return;
    }

    // If loading is finished and the user is not an admin (or profile doesn't exist), redirect to dashboard.
    if (!userProfile?.isAdmin) {
      console.log('[Debug] User is not admin. Redirecting to /dashboard.');
      console.log('[Debug] userProfile.isAdmin value is:', userProfile?.isAdmin);
      // router.push('/dashboard');
    } else {
      console.log('[Debug] User is admin. Not redirecting.');
    }
  }, [isLoading, authUser, userProfile, router]);


  // While loading, show the skeleton. This is the primary loading state.
  if (isLoading) {
    return <AdminUsersPageSkeleton />;
  }

  // If loading is complete and the user is an admin, show the content.
  if (userProfile?.isAdmin) {
    return <AdminUsersPageContent userProfile={userProfile} users={[userProfile]} />;
  }

  // If not loading and not an admin (the useEffect has already started the redirect),
  // render the skeleton to prevent a flash of an empty screen.
  // We also add a message here for debugging purposes on the screen.
  return (
    <div>
        <AdminUsersPageSkeleton />
        <div className="p-4 text-center text-red-500">
            <p>Debugging: Redirection is paused.</p>
            <p>User is not identified as an admin. Check the console for details.</p>
        </div>
    </div>
  );
}
