import { useGetAllAccounts } from '@/features/data/queries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { maskAccountName } from '../utils/masking';
import AccountGrowthChart from '../components/AccountGrowthChart';
import { usePageMeta } from '@/features/seo/usePageMeta';
import { Wallet, TrendingUp, Shield } from 'lucide-react';

export default function ManagedAccountsPage() {
  usePageMeta(
    'Managed Accounts | Quarterly FXelangbam algo',
    'Overview of managed trading accounts with performance metrics and growth charts.'
  );

  const { data: accounts, isLoading } = useGetAllAccounts();

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Managed Accounts</h1>
        <p className="text-muted-foreground">
          Professional account management with transparent performance tracking
        </p>
      </section>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-24 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : accounts && accounts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {accounts.map((account) => (
            <Card key={Number(account.id)} className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-chart-1" />
                  {maskAccountName(account.name)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Balance</p>
                    <p className="text-2xl font-bold text-chart-2">
                      ${account.balance.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Risk Profile</p>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-chart-3" />
                      <p className="text-lg font-semibold">{account.riskProfile}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/50">
                  <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Account Growth
                  </p>
                  <AccountGrowthChart accountId={Number(account.id)} balance={account.balance} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No managed accounts available yet.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
