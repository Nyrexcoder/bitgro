import { Header } from '@/components/header';
import { OverviewCards } from '@/components/dashboard/overview-cards';
import { RecentTransactions } from '@/components/dashboard/recent-transactions';

export default function DashboardPage() {
  return (
    <div className="flex-1 flex flex-col">
      <Header title="Dashboard" />
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <OverviewCards />
        <div className="grid gap-4">
          <RecentTransactions />
        </div>
      </div>
    </div>
  );
}
