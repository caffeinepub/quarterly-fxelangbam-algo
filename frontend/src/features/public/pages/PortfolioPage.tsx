import { useState, useMemo } from 'react';
import { useGetAllTrades } from '@/features/data/queries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TradeTable from '../components/TradeTable';
import TradeFilters from '../components/TradeFilters';
import { Skeleton } from '@/components/ui/skeleton';
import { usePageMeta } from '@/features/seo/usePageMeta';
import type { Trade } from '@/backend';

export default function PortfolioPage() {
  usePageMeta(
    'Portfolio - Trade History | Quarterly FXelangbam algo',
    'View detailed trade history with filters for date, profit/loss, and trading pairs.'
  );

  const { data: trades, isLoading } = useGetAllTrades();
  const [filters, setFilters] = useState({
    month: 'all',
    year: 'all',
    result: 'all',
  });

  const filteredTrades = useMemo(() => {
    if (!trades) return [];

    return trades.filter((trade: Trade) => {
      const tradeDate = new Date(Number(trade.timestamp) / 1000000);
      const tradeMonth = tradeDate.getMonth() + 1;
      const tradeYear = tradeDate.getFullYear();

      // Month filter
      if (filters.month !== 'all' && tradeMonth !== parseInt(filters.month)) {
        return false;
      }

      // Year filter
      if (filters.year !== 'all' && tradeYear !== parseInt(filters.year)) {
        return false;
      }

      // Result filter
      if (filters.result === 'profit' && trade.profitLoss <= 0) {
        return false;
      }
      if (filters.result === 'loss' && trade.profitLoss >= 0) {
        return false;
      }

      return true;
    });
  }, [trades, filters]);

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Trade Portfolio</h1>
        <p className="text-muted-foreground">
          Complete history of all executed trades with detailed performance metrics
        </p>
      </section>

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Trade History</CardTitle>
          <TradeFilters filters={filters} onFiltersChange={setFilters} />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : (
            <TradeTable trades={filteredTrades} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
