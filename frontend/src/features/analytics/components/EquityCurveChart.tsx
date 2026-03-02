import type { EquityPoint } from '../utils/analytics';

interface EquityCurveChartProps {
  data: EquityPoint[];
}

export default function EquityCurveChart({ data }: EquityCurveChartProps) {
  if (data.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-muted-foreground">
        No data available
      </div>
    );
  }

  const maxEquity = Math.max(...data.map((d) => d.equity));
  const minEquity = Math.min(...data.map((d) => d.equity));
  const range = maxEquity - minEquity || 1;
  const chartHeight = 300;
  const chartWidth = 700;
  const padding = 40;

  return (
    <div className="w-full overflow-x-auto">
      <svg width={chartWidth} height={chartHeight} className="mx-auto">
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
          const y = padding + (1 - ratio) * (chartHeight - 2 * padding);
          return (
            <g key={ratio}>
              <line
                x1={padding}
                y1={y}
                x2={chartWidth - padding}
                y2={y}
                stroke="currentColor"
                strokeOpacity="0.1"
              />
              <text
                x={padding - 10}
                y={y + 4}
                textAnchor="end"
                fontSize="11"
                fill="currentColor"
                opacity="0.6"
              >
                ${(minEquity + ratio * range).toFixed(0)}
              </text>
            </g>
          );
        })}

        {/* Area fill */}
        <defs>
          <linearGradient id="equity-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="oklch(var(--chart-1))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="oklch(var(--chart-1))" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        <path
          d={`M ${padding} ${chartHeight - padding} ${data
            .map((point) => {
              const x =
                padding + (point.index / (data.length - 1)) * (chartWidth - 2 * padding);
              const y =
                padding +
                (1 - (point.equity - minEquity) / range) * (chartHeight - 2 * padding);
              return `L ${x} ${y}`;
            })
            .join(' ')} L ${chartWidth - padding} ${chartHeight - padding} Z`}
          fill="url(#equity-gradient)"
        />

        {/* Line */}
        <path
          d={`M ${data
            .map((point) => {
              const x =
                padding + (point.index / (data.length - 1)) * (chartWidth - 2 * padding);
              const y =
                padding +
                (1 - (point.equity - minEquity) / range) * (chartHeight - 2 * padding);
              return `${x} ${y}`;
            })
            .join(' L ')}`}
          fill="none"
          stroke="oklch(var(--chart-1))"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Axes */}
        <line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={chartHeight - padding}
          stroke="currentColor"
          strokeOpacity="0.2"
        />
        <line
          x1={padding}
          y1={chartHeight - padding}
          x2={chartWidth - padding}
          y2={chartHeight - padding}
          stroke="currentColor"
          strokeOpacity="0.2"
        />

        {/* X-axis label */}
        <text
          x={chartWidth / 2}
          y={chartHeight - 10}
          textAnchor="middle"
          fontSize="12"
          fill="currentColor"
          opacity="0.6"
        >
          Trade Number
        </text>
      </svg>
    </div>
  );
}
