import type { WinLossData } from "../utils/analytics";

interface WinLossChartProps {
  data: WinLossData | null;
}

export default function WinLossChart({ data }: WinLossChartProps) {
  if (!data || (data.wins === 0 && data.losses === 0)) {
    return (
      <div className="h-[300px] flex items-center justify-center text-muted-foreground">
        No data available
      </div>
    );
  }

  const total = data.wins + data.losses;
  const winPercentage = (data.wins / total) * 100;
  const lossPercentage = (data.losses / total) * 100;

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-8">
      {/* Donut Chart */}
      <div className="relative">
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          role="img"
          aria-label="Win vs loss donut chart"
        >
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="oklch(var(--chart-2))"
            strokeWidth="40"
            strokeDasharray={`${(winPercentage / 100) * 502.65} 502.65`}
            transform="rotate(-90 100 100)"
            opacity="0.8"
          />
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="oklch(var(--destructive))"
            strokeWidth="40"
            strokeDasharray={`${(lossPercentage / 100) * 502.65} 502.65`}
            strokeDashoffset={`-${(winPercentage / 100) * 502.65}`}
            transform="rotate(-90 100 100)"
            opacity="0.8"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-3xl font-bold">{total}</div>
            <div className="text-sm text-muted-foreground">Total</div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-chart-2 opacity-80" />
          <div>
            <div className="font-semibold">Winning Trades</div>
            <div className="text-sm text-muted-foreground">
              {data.wins} ({winPercentage.toFixed(1)}%)
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-destructive opacity-80" />
          <div>
            <div className="font-semibold">Losing Trades</div>
            <div className="text-sm text-muted-foreground">
              {data.losses} ({lossPercentage.toFixed(1)}%)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
