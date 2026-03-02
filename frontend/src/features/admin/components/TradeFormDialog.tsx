import { useState, useEffect } from 'react';
import { useAddTrade, useUpdateTrade } from '../hooks/useAdminMutations';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Trade, Variant_buy_sell } from '@/backend';

interface TradeFormDialogProps {
  trade: Trade | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function TradeFormDialog({ trade, open, onOpenChange }: TradeFormDialogProps) {
  const addTrade = useAddTrade();
  const updateTrade = useUpdateTrade();
  const isEditing = !!trade;

  const [formData, setFormData] = useState({
    symbol: '',
    direction: Variant_buy_sell.buy,
    entryPrice: '',
    exitPrice: '',
    quantity: '',
    profitLoss: '',
  });

  useEffect(() => {
    if (trade) {
      setFormData({
        symbol: trade.symbol,
        direction: trade.direction,
        entryPrice: trade.entryPrice.toString(),
        exitPrice: trade.exitPrice.toString(),
        quantity: trade.quantity.toString(),
        profitLoss: trade.profitLoss.toString(),
      });
    } else {
      setFormData({
        symbol: '',
        direction: Variant_buy_sell.buy,
        entryPrice: '',
        exitPrice: '',
        quantity: '',
        profitLoss: '',
      });
    }
  }, [trade]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const tradeData: Trade = {
      id: trade?.id || BigInt(0),
      symbol: formData.symbol,
      direction: formData.direction,
      entryPrice: parseFloat(formData.entryPrice),
      exitPrice: parseFloat(formData.exitPrice),
      quantity: parseFloat(formData.quantity),
      profitLoss: parseFloat(formData.profitLoss),
      timestamp: trade?.timestamp || BigInt(Date.now() * 1000000),
    };

    try {
      if (isEditing) {
        await updateTrade.mutateAsync({ id: trade.id, trade: tradeData });
        toast.success('Trade updated successfully');
      } else {
        await addTrade.mutateAsync(tradeData);
        toast.success('Trade added successfully');
      }
      onOpenChange(false);
    } catch (error) {
      toast.error(isEditing ? 'Failed to update trade' : 'Failed to add trade');
      console.error(error);
    }
  };

  const isPending = addTrade.isPending || updateTrade.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Trade' : 'Add New Trade'}</DialogTitle>
            <DialogDescription>
              {isEditing ? 'Update the trade details below.' : 'Enter the trade details below.'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="symbol">Symbol</Label>
              <Input
                id="symbol"
                value={formData.symbol}
                onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
                placeholder="e.g., EURUSD"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="direction">Direction</Label>
              <Select
                value={formData.direction}
                onValueChange={(value: Variant_buy_sell) =>
                  setFormData({ ...formData, direction: value })
                }
              >
                <SelectTrigger id="direction">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={Variant_buy_sell.buy}>Buy</SelectItem>
                  <SelectItem value={Variant_buy_sell.sell}>Sell</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="entryPrice">Entry Price</Label>
                <Input
                  id="entryPrice"
                  type="number"
                  step="0.01"
                  value={formData.entryPrice}
                  onChange={(e) => setFormData({ ...formData, entryPrice: e.target.value })}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="exitPrice">Exit Price</Label>
                <Input
                  id="exitPrice"
                  type="number"
                  step="0.01"
                  value={formData.exitPrice}
                  onChange={(e) => setFormData({ ...formData, exitPrice: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  step="0.01"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="profitLoss">Profit/Loss</Label>
                <Input
                  id="profitLoss"
                  type="number"
                  step="0.01"
                  value={formData.profitLoss}
                  onChange={(e) => setFormData({ ...formData, profitLoss: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditing ? 'Update' : 'Add'} Trade
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
