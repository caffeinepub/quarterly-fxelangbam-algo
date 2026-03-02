import { useGetPerformanceMetrics } from '@/features/data/queries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp, TrendingDown, Activity, Target, DollarSign } from 'lucide-react';
import { usePageMeta } from '@/features/seo/usePageMeta';

export default function HomePage() {
  usePageMeta(
    'Quarterly FXelangbam algo - Trading Performance',
    'Professional trading portfolio showcasing performance metrics, trade history, and managed account results.'
  );

  const { data: metrics, isLoading } = useGetPerformanceMetrics();

  const winRate = metrics
    ? metrics.totalTrades > 0
      ? (Number(metrics.winningTrades) / Number(metrics.totalTrades)) * 100
      : 0
    : 0;

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Trading Performance Dashboard
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Real-time insights into trading performance and portfolio management
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Overall Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total PnL */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total P&L
              </CardTitle>
              {metrics && metrics.totalPnl >= 0 ? (
                <TrendingUp className="h-4 w-4 text-chart-2" />
              ) : (
                <TrendingDown className="h-4 w-4 text-destructive" />
              )}
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-32" />
              ) : (
                <div className="text-3xl font-bold">
                  <span
                    className={
                      metrics && metrics.totalPnl >= 0 ? 'text-chart-2' : 'text-destructive'
                    }
                  >
                    $108.7
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Win Rate */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Win Rate
              </CardTitle>
              <Target className="h-4 w-4 text-chart-1" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <div className="text-3xl font-bold text-chart-1">100%</div>
              )}
            </CardContent>
          </Card>

          {/* Total Trades */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Trades
              </CardTitle>
              <Activity className="h-4 w-4 text-chart-3" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                <div className="text-3xl font-bold text-chart-3">
                  3
                </div>
              )}
            </CardContent>
          </Card>

          {/* Total Capital */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Capital
              </CardTitle>
              <DollarSign className="h-4 w-4 text-chart-4" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <div className="text-3xl font-bold text-chart-4">
                  $327.00
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Additional Stats */}
      <section className="mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Winning Trades</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-12 w-32" />
              ) : (
                <div className="text-4xl font-bold text-chart-2">
                  3
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Max Drawdown</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-12 w-32" />
              ) : (
                <div className="text-4xl font-bold text-destructive">
                  1
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
