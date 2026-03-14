import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetPerformanceMetrics } from "@/features/data/queries";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useUpdateMetrics } from "../hooks/useAdminMutations";

export default function MetricsEditorCard() {
  const { data: metrics, isLoading } = useGetPerformanceMetrics();
  const updateMetrics = useUpdateMetrics();

  const [formData, setFormData] = useState({
    totalPnl: "",
    totalTrades: "",
    winningTrades: "",
    roi: "",
    maxDrawdown: "",
    totalCapital: "",
  });

  useEffect(() => {
    if (metrics) {
      setFormData({
        totalPnl: metrics.totalPnl.toString(),
        totalTrades: metrics.totalTrades.toString(),
        winningTrades: metrics.winningTrades.toString(),
        roi: metrics.roi.toString(),
        maxDrawdown: metrics.maxDrawdown.toString(),
        totalCapital: metrics.totalCapital.toString(),
      });
    }
  }, [metrics]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateMetrics.mutateAsync({
        totalPnl: Number.parseFloat(formData.totalPnl),
        totalTrades: BigInt(formData.totalTrades),
        winningTrades: BigInt(formData.winningTrades),
        roi: Number.parseFloat(formData.roi),
        maxDrawdown: Number.parseFloat(formData.maxDrawdown),
        totalCapital: Number.parseFloat(formData.totalCapital),
      });
      toast.success("Metrics updated successfully");
    } catch (error) {
      toast.error("Failed to update metrics");
      console.error(error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
        <CardDescription>
          Update overall trading performance metrics
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="totalPnl">Total P&L ($)</Label>
                <Input
                  id="totalPnl"
                  type="number"
                  step="0.01"
                  value={formData.totalPnl}
                  onChange={(e) =>
                    setFormData({ ...formData, totalPnl: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="totalTrades">Total Trades</Label>
                <Input
                  id="totalTrades"
                  type="number"
                  value={formData.totalTrades}
                  onChange={(e) =>
                    setFormData({ ...formData, totalTrades: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="winningTrades">Winning Trades</Label>
                <Input
                  id="winningTrades"
                  type="number"
                  value={formData.winningTrades}
                  onChange={(e) =>
                    setFormData({ ...formData, winningTrades: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="roi">ROI (%)</Label>
                <Input
                  id="roi"
                  type="number"
                  step="0.01"
                  value={formData.roi}
                  onChange={(e) =>
                    setFormData({ ...formData, roi: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="maxDrawdown">Max Drawdown (%)</Label>
                <Input
                  id="maxDrawdown"
                  type="number"
                  step="0.01"
                  value={formData.maxDrawdown}
                  onChange={(e) =>
                    setFormData({ ...formData, maxDrawdown: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="totalCapital">Total Capital ($)</Label>
                <Input
                  id="totalCapital"
                  type="number"
                  step="0.01"
                  value={formData.totalCapital}
                  onChange={(e) =>
                    setFormData({ ...formData, totalCapital: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <Button type="submit" disabled={updateMetrics.isPending}>
              {updateMetrics.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Update Metrics
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
