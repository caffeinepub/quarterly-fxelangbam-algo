import { useGetAllTrades, useGetPerformanceMetrics } from '@/features/data/queries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import MonthlyPnlChart from '../components/MonthlyPnlChart';
import WinLossChart from '../components/WinLossChart';
import EquityCurveChart from '../components/EquityCurveChart';
import { usePageMeta } from '@/features/seo/usePageMeta';
import { computeMonthlyPnl, computeWinLossData, computeEquityCurve } from '../utils/analytics';

export default function PerformanceAnalyticsPage() {
  usePageMeta(
    'Performance Analytics | Quarterly FXelangbam algo',
    'Detailed performance analytics with monthly P&L, win/loss ratios, and equity curve visualization.'
  );

  const { data: trades, isLoading: tradesLoading } = useGetAllTrades();
  const { data: metrics, isLoading: metricsLoading } = useGetPerformanceMetrics();

  const isLoading = tradesLoading || metricsLoading;

  const monthlyPnl = trades ? computeMonthlyPnl(trades) : [];
  const winLossData = metrics ? computeWinLossData(metrics) : null;
  const equityCurve = trades ? computeEquityCurve(trades) : [];

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Performance Analytics</h1>
        <p className="text-muted-foreground">
          Comprehensive analysis of trading performance over time
        </p>
      </section>

      <div className="space-y-6">
        {/* Monthly P&L Chart */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Monthly Profit & Loss</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-[300px] w-full" />
            ) : (
              <MonthlyPnlChart data={monthlyPnl} />
            )}
          </CardContent>
        </Card>

        {/* Win/Loss Chart */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Win vs Loss Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-[300px] w-full" />
            ) : (
              <WinLossChart data={winLossData} />
            )}
          </CardContent>
        </Card>

        {/* Equity Curve */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Equity Curve</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-[300px] w-full" />
            ) : (
              <EquityCurveChart data={equityCurve} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
