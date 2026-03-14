import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import AdminLayout from "./components/app/AdminLayout";
import PublicLayout from "./components/app/PublicLayout";
import AdminDashboardPage from "./features/admin/pages/AdminDashboardPage";
import PerformanceAnalyticsPage from "./features/analytics/pages/PerformanceAnalyticsPage";
import AdminAuthGate from "./features/auth/components/AdminAuthGate";
import AdminLoginPage from "./features/auth/pages/AdminLoginPage";
import HomePage from "./features/public/pages/HomePage";
import ManagedAccountsPage from "./features/public/pages/ManagedAccountsPage";
import PortfolioPage from "./features/public/pages/PortfolioPage";
import SiteWideGate from "./features/siteGate/SiteWideGate";

// Root route with public layout
const rootRoute = createRootRoute({
  component: () => (
    <PublicLayout>
      <Outlet />
    </PublicLayout>
  ),
});

// Public routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const portfolioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/portfolio",
  component: PortfolioPage,
});

const accountsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/accounts",
  component: ManagedAccountsPage,
});

const analyticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/analytics",
  component: PerformanceAnalyticsPage,
});

// Admin routes with separate layout
const adminRootRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  ),
});

const adminLoginRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: "/login",
  component: AdminLoginPage,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: "/dashboard",
  component: () => (
    <AdminAuthGate>
      <AdminDashboardPage />
    </AdminAuthGate>
  ),
});

// Create router
const routeTree = rootRoute.addChildren([
  indexRoute,
  portfolioRoute,
  accountsRoute,
  analyticsRoute,
  adminRootRoute.addChildren([adminLoginRoute, adminDashboardRoute]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <SiteWideGate>
        <RouterProvider router={router} />
        <Toaster />
      </SiteWideGate>
    </ThemeProvider>
  );
}
