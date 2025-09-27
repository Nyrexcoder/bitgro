import { Header } from '@/components/header';
import { PackageCard } from '@/components/packages/package-card';
import { packages } from '@/lib/data';

export default function PackagesPage() {
  return (
    <div className="flex-1 flex flex-col">
      <Header title="Investment Packages" />
      <main className="flex-1 p-4 md:p-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} packageInfo={pkg} />
          ))}
        </div>
      </main>
    </div>
  );
}
