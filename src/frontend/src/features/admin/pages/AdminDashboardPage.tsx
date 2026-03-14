import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TrendingUp, Upload, Users } from "lucide-react";
import AccountsAdminTable from "../components/AccountsAdminTable";
import CsvTradeImportPanel from "../components/CsvTradeImportPanel";
import MetricsEditorCard from "../components/MetricsEditorCard";
import TradesAdminTable from "../components/TradesAdminTable";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Manage trades, accounts, and performance metrics
        </p>
      </div>

      <Tabs defaultValue="trades" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="trades" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Trades</span>
          </TabsTrigger>
          <TabsTrigger value="accounts" className="gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Accounts</span>
          </TabsTrigger>
          <TabsTrigger value="metrics" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Metrics</span>
          </TabsTrigger>
          <TabsTrigger value="import" className="gap-2">
            <Upload className="h-4 w-4" />
            <span className="hidden sm:inline">Import</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trades" className="space-y-4">
          <TradesAdminTable />
        </TabsContent>

        <TabsContent value="accounts" className="space-y-4">
          <AccountsAdminTable />
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <MetricsEditorCard />
        </TabsContent>

        <TabsContent value="import" className="space-y-4">
          <CsvTradeImportPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}
