import { Variant_buy_sell } from "@/backend";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
import { CheckCircle2, Loader2, Upload, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAddTrade } from "../hooks/useAdminMutations";
import { type ValidationResult, parseCsvTrades } from "../utils/csv";

export default function CsvTradeImportPanel() {
  const addTrade = useAddTrade();
  const [_file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<ValidationResult | null>(null);
  const [importing, setImporting] = useState(false);
  const [importResults, setImportResults] = useState<{
    success: number;
    failed: number;
  } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(null);
    setImportResults(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const result = parseCsvTrades(text);
      setPreview(result);
    };
    reader.readAsText(selectedFile);
  };

  const handleImport = async () => {
    if (!preview || preview.valid.length === 0) return;

    setImporting(true);
    let success = 0;
    let failed = 0;

    for (const trade of preview.valid) {
      try {
        const direction =
          trade.direction === "buy"
            ? Variant_buy_sell.buy
            : Variant_buy_sell.sell;
        await addTrade.mutateAsync({
          id: BigInt(0),
          symbol: trade.symbol,
          direction: direction,
          entryPrice: trade.entryPrice,
          exitPrice: trade.exitPrice,
          quantity: trade.quantity,
          profitLoss: trade.profitLoss,
          timestamp: BigInt(trade.timestamp * 1000000),
        });
        success++;
      } catch (error) {
        console.error("Failed to import trade:", error);
        failed++;
      }
    }

    setImporting(false);
    setImportResults({ success, failed });
    toast.success(`Imported ${success} trades successfully`);

    if (failed > 0) {
      toast.error(`Failed to import ${failed} trades`);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>CSV Trade Import</CardTitle>
        <CardDescription>
          Upload a CSV file with columns: symbol, direction, entryPrice,
          exitPrice, quantity, profitLoss, timestamp
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="csv-file">Select CSV File</Label>
          <Input
            id="csv-file"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            disabled={importing}
          />
        </div>

        {preview && (
          <div className="space-y-4">
            <Alert>
              <AlertDescription>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-chart-2" />
                  <span className="font-semibold">
                    {preview.valid.length} valid trades
                  </span>
                </div>
                {preview.invalid.length > 0 && (
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-destructive" />
                    <span className="font-semibold">
                      {preview.invalid.length} invalid rows
                    </span>
                  </div>
                )}
              </AlertDescription>
            </Alert>

            {preview.valid.length > 0 && (
              <div className="rounded-md border p-4 max-h-[300px] overflow-y-auto">
                <h4 className="font-semibold mb-2">
                  Preview (first 5 trades):
                </h4>
                <div className="space-y-2 text-sm">
                  {preview.valid.slice(0, 5).map((trade) => (
                    <div
                      key={`${trade.symbol}-${trade.timestamp}-${trade.profitLoss}`}
                      className="flex gap-4 text-xs"
                    >
                      <span className="font-mono">{trade.symbol}</span>
                      <span className="uppercase">{trade.direction}</span>
                      <span>${trade.profitLoss.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {preview.invalid.length > 0 && (
              <Alert variant="destructive">
                <AlertDescription>
                  <p className="font-semibold mb-1">
                    Invalid rows will be skipped:
                  </p>
                  <ul className="text-xs space-y-1">
                    {preview.invalid.slice(0, 3).map((error) => (
                      <li key={`${error.row}-${error.error}`}>
                        Row {error.row}: {error.error}
                      </li>
                    ))}
                    {preview.invalid.length > 3 && (
                      <li>...and {preview.invalid.length - 3} more</li>
                    )}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            <Button
              onClick={handleImport}
              disabled={importing || preview.valid.length === 0}
              className="w-full"
            >
              {importing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Importing...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Import {preview.valid.length} Trades
                </>
              )}
            </Button>
          </div>
        )}

        {importResults && (
          <Alert>
            <AlertDescription>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-chart-2">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>
                    {importResults.success} trades imported successfully
                  </span>
                </div>
                {importResults.failed > 0 && (
                  <div className="flex items-center gap-2 text-destructive">
                    <XCircle className="h-4 w-4" />
                    <span>{importResults.failed} trades failed to import</span>
                  </div>
                )}
              </div>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
