import type { Trade, PerformanceMetrics } from '@/backend';

export interface MonthlyPnlData {
  month: string;
  pnl: number;
}

export interface WinLossData {
  wins: number;
  losses: number;
}

export interface EquityPoint {
  index: number;
  equity: number;
}

export function computeMonthlyPnl(trades: Trade[]): MonthlyPnlData[] {
  const monthlyMap = new Map<string, number>();

  trades.forEach((trade) => {
    const date = new Date(Number(trade.timestamp) / 1000000);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

    const current = monthlyMap.get(monthKey) || 0;
    monthlyMap.set(monthKey, current + trade.profitLoss);
  });

  const sorted = Array.from(monthlyMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, pnl]) => ({
      month: new Date(month + '-01').toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
      }),
      pnl,
    }));

  return sorted;
}

export function computeWinLossData(metrics: PerformanceMetrics): WinLossData {
  const wins = Number(metrics.winningTrades);
  const losses = Number(metrics.totalTrades) - wins;

  return { wins, losses };
}

export function computeEquityCurve(trades: Trade[]): EquityPoint[] {
  const sortedTrades = [...trades].sort(
    (a, b) => Number(a.timestamp) - Number(b.timestamp)
  );

  let equity = 0;
  const curve: EquityPoint[] = [{ index: 0, equity: 0 }];

  sortedTrades.forEach((trade, index) => {
    equity += trade.profitLoss;
    curve.push({ index: index + 1, equity });
  });

  return curve;
}
