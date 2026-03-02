import { useState } from 'react';
import { useGetAllTrades } from '@/features/data/queries';
import { useDeleteTrade } from '../hooks/useAdminMutations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import TradeFormDialog from './TradeFormDialog';
import type { Trade } from '@/backend';
import { toast } from 'sonner';

export default function TradesAdminTable() {
  const { data: trades, isLoading } = useGetAllTrades();
  const deleteTrade = useDeleteTrade();
  const [editingTrade, setEditingTrade] = useState<Trade | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleDelete = async (id: bigint) => {
    if (!confirm('Are you sure you want to delete this trade?')) return;

    try {
      await deleteTrade.mutateAsync(id);
      toast.success('Trade deleted successfully');
    } catch (error) {
      toast.error('Failed to delete trade');
      console.error(error);
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Manage Trades</CardTitle>
          <Button onClick={() => setIsAddDialogOpen(true)} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Trade
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : trades && trades.length > 0 ? (
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Direction</TableHead>
                    <TableHead className="text-right">Entry</TableHead>
                    <TableHead className="text-right">Exit</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">P&L</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trades.map((trade) => (
                    <TableRow key={Number(trade.id)}>
                      <TableCell className="font-mono font-semibold">{trade.symbol}</TableCell>
                      <TableCell className="uppercase">{trade.direction}</TableCell>
                      <TableCell className="text-right">${trade.entryPrice.toFixed(2)}</TableCell>
                      <TableCell className="text-right">${trade.exitPrice.toFixed(2)}</TableCell>
                      <TableCell className="text-right">{trade.quantity.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <span
                          className={
                            trade.profitLoss >= 0 ? 'text-chart-2' : 'text-destructive'
                          }
                        >
                          ${trade.profitLoss.toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingTrade(trade)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(trade.id)}
                            disabled={deleteTrade.isPending}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No trades yet. Add your first trade to get started.
            </div>
          )}
        </CardContent>
      </Card>

      <TradeFormDialog
        trade={editingTrade}
        open={!!editingTrade || isAddDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            setEditingTrade(null);
            setIsAddDialogOpen(false);
          }
        }}
      />
    </>
  );
}
