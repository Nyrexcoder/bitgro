'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { updateProfile, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { useAuth, useFirestore, useUser } from '@/firebase';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Header } from '@/components/header';
import { Separator } from '@/components/ui/separator';

const profileSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required.' }),
  lastName: z.string().min(1, { message: 'Last name is required.' }),
  email: z.string().email(),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, { message: 'Current password is required.'}),
  newPassword: z.string().min(8, { message: 'New password must be at least 8 characters.' }),
});

type ProfileFormValues = z.infer<typeof profileSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function SettingsPage() {
  const router = useRouter();
  const auth = useAuth();
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    values: {
        firstName: user?.displayName?.split(' ')[0] || '',
        lastName: user?.displayName?.split(' ')[1] || '',
        email: user?.email || '',
    }
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
  });

  if (isUserLoading) {
    return (
        <div className="flex-1 flex flex-col">
            <Header title="Settings" />
            <div className="flex items-center justify-center flex-1">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        </div>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  async function onProfileSubmit(values: ProfileFormValues) {
    setIsProfileLoading(true);
    try {
        const displayName = `${values.firstName} ${values.lastName}`;
        // We don't update email here as it's a sensitive operation
        await updateProfile(user, { displayName });
        
        const userDocRef = doc(firestore, 'users', user.uid);
        await updateDoc(userDocRef, {
            firstName: values.firstName,
            lastName: values.lastName,
        });

        toast({ title: 'Profile Updated', description: 'Your profile has been successfully updated.' });
    } catch (error: any) {
        toast({ variant: 'destructive', title: 'Update Failed', description: error.message });
    } finally {
        setIsProfileLoading(false);
    }
  }

  async function onPasswordSubmit(values: PasswordFormValues) {
    setIsPasswordLoading(true);
    try {
      if (user && user.email) {
        const credential = EmailAuthProvider.credential(user.email, values.currentPassword);
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, values.newPassword);
        toast({ title: 'Password Updated', description: 'Your password has been successfully changed.' });
        passwordForm.reset();
      }
    } catch (error: any) {
        toast({ variant: 'destructive', title: 'Password Update Failed', description: error.message });
    } finally {
        setIsPasswordLoading(false);
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      <Header title="Settings" />
      <main className="flex-1 p-4 md:p-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Update your personal information.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...profileForm}>
              <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={profileForm.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={profileForm.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                </div>
                 <FormField
                  control={profileForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input disabled {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isProfileLoading}>
                  {isProfileLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Changes
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        <Separator />

        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>Update your login password.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...passwordForm}>
              <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                <FormField
                  control={passwordForm.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={passwordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isPasswordLoading}>
                  {isPasswordLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Update Password
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
