export interface ParsedTrade {
  symbol: string;
  direction: "buy" | "sell";
  entryPrice: number;
  exitPrice: number;
  quantity: number;
  profitLoss: number;
  timestamp: number;
}

export interface ValidationError {
  row: number;
  error: string;
}

export interface ValidationResult {
  valid: ParsedTrade[];
  invalid: ValidationError[];
}

export function parseCsvTrades(csvText: string): ValidationResult {
  const lines = csvText.trim().split("\n");
  const valid: ParsedTrade[] = [];
  const invalid: ValidationError[] = [];

  // Skip header row
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    try {
      const parts = line.split(",").map((p) => p.trim());

      if (parts.length < 7) {
        invalid.push({ row: i + 1, error: "Insufficient columns" });
        continue;
      }

      const symbol = parts[0];
      const direction = parts[1].toLowerCase();
      const entryPrice = Number.parseFloat(parts[2]);
      const exitPrice = Number.parseFloat(parts[3]);
      const quantity = Number.parseFloat(parts[4]);
      const profitLoss = Number.parseFloat(parts[5]);
      const timestamp = parts[6] ? new Date(parts[6]).getTime() : Date.now();

      // Validation
      if (!symbol) {
        invalid.push({ row: i + 1, error: "Missing symbol" });
        continue;
      }

      if (direction !== "buy" && direction !== "sell") {
        invalid.push({
          row: i + 1,
          error: "Invalid direction (must be buy or sell)",
        });
        continue;
      }

      if (
        Number.isNaN(entryPrice) ||
        Number.isNaN(exitPrice) ||
        Number.isNaN(quantity) ||
        Number.isNaN(profitLoss)
      ) {
        invalid.push({ row: i + 1, error: "Invalid numeric values" });
        continue;
      }

      if (Number.isNaN(timestamp)) {
        invalid.push({ row: i + 1, error: "Invalid timestamp" });
        continue;
      }

      valid.push({
        symbol,
        direction: direction as "buy" | "sell",
        entryPrice,
        exitPrice,
        quantity,
        profitLoss,
        timestamp,
      });
    } catch (_error) {
      invalid.push({ row: i + 1, error: "Parse error" });
    }
  }

  return { valid, invalid };
}
