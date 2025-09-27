import { Header } from '@/components/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HistoryTable } from '@/components/transactions/history-table';

export default function TransactionsPage() {
  return (
    <div className="flex-1 flex flex-col">
      <Header title="Transaction History" />
      <main className="flex-1 space-y-6 p-4 md:p-8">
        <Card>
            <CardHeader>
                <CardTitle>Your Transactions</CardTitle>
                <CardDescription>View and filter your complete transaction history.</CardDescription>
            </CardHeader>
            <CardContent>
                <HistoryTable />
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
