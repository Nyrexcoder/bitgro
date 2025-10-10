// This is a new file for the admin user management page.

'use client';

import { useMemo } from 'react';
import { collection, query } from 'firebase/firestore';
import { useCollection, useFirestore, useUser } from '@/firebase';
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
  const { user: authUser, isUserLoading } = useUser();
  const router = useRouter();

  const usersQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'users'));
  }, [firestore]);

  const { data: users, isLoading: usersLoading } = useCollection<User>(usersQuery);

  // A real app would get user roles from the user object
  const isAdmin = authUser && !authUser.isAnonymous; // For now, we assume any logged in user is admin.

  if (!isUserLoading && !isAdmin) {
    router.push('/login');
    return null;
  }


  const isLoading = isUserLoading || usersLoading;

  return (
    <div className="flex-1 flex flex-col">
      <Header title="Manage Users" />
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
                {isLoading && (
                  <>
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
                  </>
                )}
                {!isLoading && users && users.length > 0 ? (
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
                  !isLoading && (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center">
                        No users found.
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
