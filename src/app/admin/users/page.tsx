
// This is a new file for the admin user management page.

'use client';

import { useEffect, useMemo } from 'react';
import { useMemoFirebase } from '@/firebase/provider';
import { collection, query, doc } from 'firebase/firestore';
import { useCollection, useDoc, useFirestore, useUser } from '@/firebase';
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

// Define the shape of a user object based on your backend.json
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
}

export default function ManageUsersPage() {
  const firestore = useFirestore();
  const { user: authUser, isUserLoading: isAuthUserLoading } = useUser();
  const router = useRouter();

  const userDocRef = useMemoFirebase(() => {
    if (!firestore || !authUser) return null;
    return doc(firestore, 'users', authUser.uid);
  }, [firestore, authUser]);

  const { data: userProfile, isLoading: isProfileLoading } = useDoc<User>(userDocRef);

  // This is a placeholder. In a real-world secure app, you would fetch users
  // via a Cloud Function, not a direct client-side query.
  // For now, we only show the current admin to avoid security rule violations.
  const users = userProfile ? [userProfile] : [];
  const usersLoading = isProfileLoading;


  const isAdmin = userProfile?.isAdmin === true;

  useEffect(() => {
    // Redirect non-admins away from this page
    if (!isAuthUserLoading && !isProfileLoading && !isAdmin) {
      router.push('/dashboard');
    }
  }, [isAuthUserLoading, isProfileLoading, isAdmin, router]);


  const isLoading = isAuthUserLoading || usersLoading;

  if (isLoading && !users.length) {
      // Show a loading skeleton while we verify admin status and fetch data
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
                                {[...Array(3)].map((_, i) => (
                                <TableRow key={i}>
                                  <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Skeleton className="h-10 w-10 rounded-full" />
                                        <Skeleton className="h-4 w-32" />
                                    </div>
                                  </TableCell>
                                   <TableCell className="hidden sm:table-cell"><Skeleton className="h-4 w-48" /></TableCell>
                                  <TableCell className="hidden md:table-cell">
                                    <Skeleton className="h-6 w-16 rounded-full" />
                                  </TableCell>
                                   <TableCell className="text-right">
                                     <Skeleton className="h-8 w-20" />
                                   </TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </main>
        </div>
      )
  }

  if (!isAdmin) {
    // If not an admin, we'll be redirected by the useEffect.
    // Return null to prevent rendering anything for non-admins.
    return null;
  }

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
                {users && users.length > 0 ? (
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
                        No users to display. A secure implementation would use a Cloud Function to fetch all users.
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
