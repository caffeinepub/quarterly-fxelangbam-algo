import type { MonthlyPnlData } from "../utils/analytics";

interface MonthlyPnlChartProps {
  data: MonthlyPnlData[];
}

export default function MonthlyPnlChart({ data }: MonthlyPnlChartProps) {
  if (data.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-muted-foreground">
        No data available
      </div>
    );
  }

  const maxPnl = Math.max(...data.map((d) => Math.abs(d.pnl)));
  const chartHeight = 250;
  const barWidth = Math.min(60, 600 / data.length);
  const chartWidth = data.length * (barWidth + 10);

  return (
    <div className="w-full overflow-x-auto">
      <svg
        width={Math.max(chartWidth, 600)}
        height={chartHeight + 60}
        className="mx-auto"
        role="img"
        aria-label="Monthly PnL chart"
      >
        {/* Zero line */}
        <line
          x1="0"
          y1={chartHeight / 2}
          x2={chartWidth}
          y2={chartHeight / 2}
          stroke="currentColor"
          strokeOpacity="0.2"
          strokeDasharray="4 4"
        />

        {/* Bars */}
        {data.map((item, index) => {
          const x = index * (barWidth + 10) + 20;
          const barHeight =
            (Math.abs(item.pnl) / maxPnl) * (chartHeight / 2 - 20);
          const y =
            item.pnl >= 0 ? chartHeight / 2 - barHeight : chartHeight / 2;
          const color =
            item.pnl >= 0
              ? "oklch(var(--chart-2))"
              : "oklch(var(--destructive))";

          return (
            <g key={item.month}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={color}
                opacity="0.8"
                rx="4"
              />
              <text
                x={x + barWidth / 2}
                y={chartHeight + 20}
                textAnchor="middle"
                fontSize="11"
                fill="currentColor"
                opacity="0.7"
              >
                {item.month}
              </text>
              <text
                x={x + barWidth / 2}
                y={y + (item.pnl >= 0 ? -5 : barHeight + 15)}
                textAnchor="middle"
                fontSize="10"
                fill="currentColor"
                fontWeight="600"
              >
                ${item.pnl.toFixed(0)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
