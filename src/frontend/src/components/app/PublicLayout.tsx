import { Link } from "@tanstack/react-router";
import { BarChart3, Home, TrendingUp, Users } from "lucide-react";
import AppHeader from "./AppHeader";
import PublicFooter from "./PublicFooter";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background relative">
      {/* Subtle background texture */}
      <div
        className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "url(/assets/generated/trading-bg-texture.dim_1920x1080.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <AppHeader />

      {/* Navigation */}
      <nav className="border-b border-border/30 bg-card/30 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-1 overflow-x-auto">
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors hover:text-primary [&.active]:text-primary [&.active]:border-b-2 [&.active]:border-primary"
              activeProps={{ className: "active" }}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link
              to="/portfolio"
              className="flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors hover:text-primary [&.active]:text-primary [&.active]:border-b-2 [&.active]:border-primary"
              activeProps={{ className: "active" }}
            >
              <TrendingUp className="h-4 w-4" />
              <span>Portfolio</span>
            </Link>
            <Link
              to="/accounts"
              className="flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors hover:text-primary [&.active]:text-primary [&.active]:border-b-2 [&.active]:border-primary"
              activeProps={{ className: "active" }}
            >
              <Users className="h-4 w-4" />
              <span>Managed Accounts</span>
            </Link>
            <Link
              to="/analytics"
              className="flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors hover:text-primary [&.active]:text-primary [&.active]:border-b-2 [&.active]:border-primary"
              activeProps={{ className: "active" }}
            >
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 relative z-10">{children}</main>

      <PublicFooter />
    </div>
  );
}
