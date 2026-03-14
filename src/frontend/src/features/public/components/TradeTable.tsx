import { type Trade, Variant_buy_sell } from "@/backend";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

interface TradeTableProps {
  trades: Trade[];
}

export default function TradeTable({ trades }: TradeTableProps) {
  if (trades.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No trades match the selected filters.
      </div>
    );
  }

  return (
    <div className="rounded-md border border-border/50 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30">
            <TableHead>Date</TableHead>
            <TableHead>Symbol</TableHead>
            <TableHead>Direction</TableHead>
            <TableHead className="text-right">Entry</TableHead>
            <TableHead className="text-right">Exit</TableHead>
            <TableHead className="text-right">Quantity</TableHead>
            <TableHead className="text-right">P&L</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trades.map((trade) => {
            const date = new Date(Number(trade.timestamp) / 1000000);
            const isProfitable = trade.profitLoss > 0;
            const isBuy = trade.direction === Variant_buy_sell.buy;

            return (
              <TableRow key={Number(trade.id)}>
                <TableCell className="font-medium">
                  {date.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell className="font-mono font-semibold">
                  {trade.symbol}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={isBuy ? "default" : "secondary"}
                    className="font-medium"
                  >
                    {isBuy ? (
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                    )}
                    {trade.direction.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-mono">
                  ${trade.entryPrice.toFixed(2)}
                </TableCell>
                <TableCell className="text-right font-mono">
                  ${trade.exitPrice.toFixed(2)}
                </TableCell>
                <TableCell className="text-right font-mono">
                  {trade.quantity.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  <span
                    className={`font-bold ${isProfitable ? "text-chart-2" : "text-destructive"}`}
                  >
                    {isProfitable ? "+" : ""}${trade.profitLoss.toFixed(2)}
                  </span>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
