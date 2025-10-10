
'use client';

import { useEffect, useMemo, useState } from 'react';
import { doc, setDoc, deleteDoc, collection, getDocs, writeBatch } from 'firebase/firestore';
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
import { PlusCircle, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';


interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
}

function AddEditUserDialog({
  user,
  onSave,
  children,
}: {
  user?: User | null;
  onSave: (user: Omit<User, 'id'>, id?: string) => void;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isAdmin, setIsAdmin] = useState(user?.isAdmin || false);
  const { toast } = useToast();

  const isEditMode = !!user;

  const handleSubmit = () => {
    if (!firstName || !lastName || !email) {
      toast({
        variant: 'destructive',
        title: 'Validation Error',
        description: 'Please fill out all fields.',
      });
      return;
    }
    onSave({ firstName, lastName, email, isAdmin }, user?.id);
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
        setFirstName(user?.firstName || '');
        setLastName(user?.lastName || '');
        setEmail(user?.email || '');
        setIsAdmin(user?.isAdmin || false);
    }
  }, [isOpen, user]);


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Edit User' : 'Add New User'}</DialogTitle>
          <DialogDescription>
            {isEditMode ? "Update the user's details below." : 'Enter the details for the new user.'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="firstName" className="text-right">
              First Name
            </Label>
            <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lastName" className="text-right">
              Last Name
            </Label>
            <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="isAdmin" className="text-right">
              Admin
            </Label>
            <Checkbox id="isAdmin" checked={isAdmin} onCheckedChange={(checked) => setIsAdmin(!!checked)} />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


function AdminUsersPageSkeleton() {
    return (
      <div className="flex-1 flex flex-col">
        <Header title="Manage Users">
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Add User
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

function AdminUsersPageContent({ initialAdminProfile }: { initialAdminProfile: User }) {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoadingUsers, setIsLoadingUsers] = useState(true);
    const { toast } = useToast();
    const firestore = useFirestore();

    // Fetch all users on initial load
    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoadingUsers(true);
            try {
                // In a secure app, this would be a call to a Cloud Function
                // For demonstration, we'll use a less secure direct query
                const usersCollection = collection(firestore, 'users');
                const userSnapshot = await getDocs(usersCollection);
                const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
                setUsers(userList);
            } catch (error) {
                console.error("Error fetching users: ", error);
                toast({
                    variant: "destructive",
                    title: "Failed to load all users",
                    description: "For demonstration, this direct query is blocked by security rules. Only your profile is shown."
                });
                // If fetching all users fails, initialize with just the admin's profile.
                setUsers([initialAdminProfile]);
            } finally {
                setIsLoadingUsers(false);
            }
        };

        fetchUsers();
    }, [firestore, toast, initialAdminProfile]);


    const handleAddUser = async (userData: Omit<User, 'id'>) => {
        // In a real app, this would call a Cloud Function that uses the Admin SDK
        // to create a Firebase Auth user and a Firestore document.
        try {
            const newId = `new-user-${Math.random().toString(36).substr(2, 9)}`;
            const newUser: User = { id: newId, ...userData };

            // Simulate adding to Firestore
            await setDoc(doc(firestore, 'users', newId), {
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
            });

            setUsers(prev => [...prev, newUser]);
            toast({ title: 'User Added', description: `${newUser.firstName} ${newUser.lastName} has been added.` });
        } catch (error) {
             console.error("Error adding user: ", error);
             toast({ variant: 'destructive', title: 'Error', description: 'Could not add user. See console for details.' });
        }
    };

    const handleEditUser = async (userData: Omit<User, 'id'>, id: string) => {
        try {
            const updatedUser: User = { id, ...userData };
            // Simulate updating Firestore
            await setDoc(doc(firestore, 'users', id), userData, { merge: true });

            setUsers(prev => prev.map(u => u.id === id ? updatedUser : u));
            toast({ title: 'User Updated', description: `${updatedUser.firstName} ${updatedUser.lastName}'s details have been updated.` });
        } catch (error) {
            console.error("Error updating user: ", error);
            toast({ variant: 'destructive', title: 'Error', description: 'Could not update user. See console for details.' });
        }
    };

    const handleDeleteUser = async (userId: string) => {
        if (userId === initialAdminProfile.id) {
            toast({ variant: 'destructive', title: 'Action Forbidden', description: 'You cannot delete your own account.' });
            return;
        }
        try {
             // Simulate deleting from Firestore
            await deleteDoc(doc(firestore, 'users', userId));

            setUsers(prev => prev.filter(u => u.id !== userId));
            toast({ title: 'User Deleted', description: 'The user has been successfully deleted.' });
        } catch (error) {
            console.error("Error deleting user: ", error);
            toast({ variant: 'destructive', title: 'Error', description: 'Could not delete user. See console for details.' });
        }
    };


    return (
        <div className="flex-1 flex flex-col">
        <Header title="Manage Users">
             <AddEditUserDialog onSave={handleAddUser}>
                 <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add User
                 </Button>
            </AddEditUserDialog>
        </Header>
        <main className="flex-1 p-4 md:p-8">
            <Card>
            <CardHeader>
                <CardTitle>User Administration</CardTitle>
                <CardDescription>
                    View and manage all users in the system.
                    <br/>
                    <strong className='text-destructive/80 text-xs'>Note: This is a client-side simulation. A production app must use secure Cloud Functions.</strong>
                </CardDescription>
            </CardHeader>
            <CardContent>
                 {isLoadingUsers ? (
                    <div className="flex items-center justify-center p-8">
                        <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                 ) : (
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
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Open menu</span>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <AddEditUserDialog user={user} onSave={(data, id) => handleEditUser(data, id!)}>
                                                <button className='relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full'>
                                                   <Pencil className="mr-2 h-4 w-4" />
                                                   Edit
                                                </button>
                                            </AddEditUserDialog>
                                            <DropdownMenuSeparator />
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <button className='relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full text-red-500'>
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete
                                                    </button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be undone. This will permanently delete the user
                                                        and remove their data from our servers.
                                                    </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => handleDeleteUser(user.id)} className="bg-destructive hover:bg-destructive/90">
                                                        Delete
                                                    </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                                </TableRow>
                            ))
                            ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center">
                                  No users found.
                                </TableCell>
                            </TableRow>
                            )}
                        </TableBody>
                    </Table>
                 )}
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

  const userDocRef = useMemo(() => {
    if (!firestore || !authUser) return null;
    return doc(firestore, 'users', authUser.uid);
  }, [firestore, authUser]);

  const { data: userProfile, isLoading: isProfileLoading } = useDoc<User>(userDocRef);

  useEffect(() => {
    // Only perform actions once both authentication and profile loading are complete
    if (!isAuthLoading && !isProfileLoading) {
      // If there's no authenticated user at all, redirect to login
      if (!authUser) {
        router.push('/login');
      }
      // If there is a user, but their profile doesn't mark them as an admin, redirect
      else if (!userProfile?.isAdmin) {
        router.push('/dashboard');
      }
    }
  }, [isAuthLoading, isProfileLoading, authUser, userProfile, router]);


  // While loading authentication or profile, show a skeleton screen.
  const isLoading = isAuthLoading || isProfileLoading;
  if (isLoading) {
    return <AdminUsersPageSkeleton />;
  }

  // If loading is complete AND the user is an admin, show the page content.
  if (userProfile?.isAdmin) {
    return <AdminUsersPageContent initialAdminProfile={userProfile} />;
  }

  // If loading is complete but user is not an admin (or no profile),
  // a redirect is already in progress from the useEffect. Show a skeleton
  // screen to prevent showing a blank page or forbidden content.
  return <AdminUsersPageSkeleton />;
}
