'use client';

import { useMemo } from 'react';
import { collection, query } from 'firebase/firestore';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { Header } from '@/components/header';
import { PackageCard } from '@/components/packages/package-card';
import type { Package } from '@/lib/types';
import { Loader2 } from 'lucide-react';

export default function PackagesPage() {
  const firestore = useFirestore();

  const packagesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'packages'));
  }, [firestore]);

  const { data: packages, isLoading } = useCollection<Omit<Package, 'image' | 'imageHint'>>(packagesQuery);

  // Manually add image and imageHint for now as they are not in the DB schema
  const packagesWithImages = packages?.map((pkg, index) => ({
    ...pkg,
    image: `https://picsum.photos/seed/${index + 1}/600/400`,
    imageHint: 'financial image',
  }));

  return (
    <div className="flex-1 flex flex-col">
      <Header title="Investment Packages" />
      <main className="flex-1 p-4 md:p-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {packagesWithImages?.map((pkg, index) => (
              <PackageCard key={pkg.id} packageInfo={pkg} isPopular={index === 1} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
