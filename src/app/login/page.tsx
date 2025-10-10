
'use client';

import { useState, useEffect } from 'react';
import { LoginForm } from '@/components/login-form';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      {isClient ? (
        <LoginForm />
      ) : (
        <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      )}
    </div>
  );
}
