import { useMemo } from 'react';

interface AccountGrowthChartProps {
  accountId: number;
  balance: number;
}

export default function AccountGrowthChart({ balance }: AccountGrowthChartProps) {
  // Generate simple growth visualization based on current balance
  const growthData = useMemo(() => {
    const points = 12;
    const data: number[] = [];
    const startBalance = balance * 0.7; // Assume 30% growth
    const step = (balance - startBalance) / (points - 1);

    for (let i = 0; i < points; i++) {
      data.push(startBalance + step * i + (Math.random() - 0.5) * (balance * 0.05));
    }
    return data;
  }, [balance]);

  const max = Math.max(...growthData);
  const min = Math.min(...growthData);
  const range = max - min;

  return (
    <div className="h-24 w-full">
      <svg width="100%" height="100%" viewBox="0 0 300 80" preserveAspectRatio="none">
        {/* Grid lines */}
        <line x1="0" y1="20" x2="300" y2="20" stroke="currentColor" strokeOpacity="0.1" />
        <line x1="0" y1="40" x2="300" y2="40" stroke="currentColor" strokeOpacity="0.1" />
        <line x1="0" y1="60" x2="300" y2="60" stroke="currentColor" strokeOpacity="0.1" />

        {/* Area fill */}
        <defs>
          <linearGradient id={`gradient-${balance}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="oklch(var(--chart-2))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="oklch(var(--chart-2))" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        <path
          d={`M 0 80 ${growthData
            .map((value, i) => {
              const x = (i / (growthData.length - 1)) * 300;
              const y = 70 - ((value - min) / range) * 60;
              return `L ${x} ${y}`;
            })
            .join(' ')} L 300 80 Z`}
          fill={`url(#gradient-${balance})`}
        />

        {/* Line */}
        <path
          d={`M ${growthData
            .map((value, i) => {
              const x = (i / (growthData.length - 1)) * 300;
              const y = 70 - ((value - min) / range) * 60;
              return `${x} ${y}`;
            })
            .join(' L ')}`}
          fill="none"
          stroke="oklch(var(--chart-2))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
