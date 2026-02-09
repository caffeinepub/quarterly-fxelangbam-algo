import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface TradeFiltersProps {
  filters: {
    month: string;
    year: string;
    result: string;
  };
  onFiltersChange: (filters: { month: string; year: string; result: string }) => void;
}

export default function TradeFilters({ filters, onFiltersChange }: TradeFiltersProps) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  return (
    <div className="flex flex-wrap gap-4 mt-4">
      <div className="flex-1 min-w-[150px]">
        <Label htmlFor="month-filter" className="text-xs text-muted-foreground mb-2 block">
          Month
        </Label>
        <Select
          value={filters.month}
          onValueChange={(value) => onFiltersChange({ ...filters, month: value })}
        >
          <SelectTrigger id="month-filter">
            <SelectValue placeholder="All Months" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Months</SelectItem>
            <SelectItem value="1">January</SelectItem>
            <SelectItem value="2">February</SelectItem>
            <SelectItem value="3">March</SelectItem>
            <SelectItem value="4">April</SelectItem>
            <SelectItem value="5">May</SelectItem>
            <SelectItem value="6">June</SelectItem>
            <SelectItem value="7">July</SelectItem>
            <SelectItem value="8">August</SelectItem>
            <SelectItem value="9">September</SelectItem>
            <SelectItem value="10">October</SelectItem>
            <SelectItem value="11">November</SelectItem>
            <SelectItem value="12">December</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 min-w-[150px]">
        <Label htmlFor="year-filter" className="text-xs text-muted-foreground mb-2 block">
          Year
        </Label>
        <Select
          value={filters.year}
          onValueChange={(value) => onFiltersChange({ ...filters, year: value })}
        >
          <SelectTrigger id="year-filter">
            <SelectValue placeholder="All Years" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Years</SelectItem>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 min-w-[150px]">
        <Label htmlFor="result-filter" className="text-xs text-muted-foreground mb-2 block">
          Result
        </Label>
        <Select
          value={filters.result}
          onValueChange={(value) => onFiltersChange({ ...filters, result: value })}
        >
          <SelectTrigger id="result-filter">
            <SelectValue placeholder="All Results" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Results</SelectItem>
            <SelectItem value="profit">Profit Only</SelectItem>
            <SelectItem value="loss">Loss Only</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
