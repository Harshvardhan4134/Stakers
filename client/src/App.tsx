import { lazy, Suspense } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Lazy load pages for code splitting
const Home = lazy(() => import("@/pages/Home"));
const Auth = lazy(() => import("@/pages/Auth"));
const Onboarding = lazy(() => import("@/pages/Onboarding"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const MarketSelection = lazy(() => import("@/pages/MarketSelection"));
const ContestListing = lazy(() => import("@/pages/ContestListing"));
const ContestDetail = lazy(() => import("@/pages/ContestDetail"));
const Portfolio = lazy(() => import("@/pages/Portfolio"));
const SimulationStatus = lazy(() => import("@/pages/SimulationStatus"));
const Leaderboard = lazy(() => import("@/pages/Leaderboard"));
const Profile = lazy(() => import("@/pages/Profile"));
const Rewards = lazy(() => import("@/pages/Rewards"));
const Notifications = lazy(() => import("@/pages/Notifications"));
const Settings = lazy(() => import("@/pages/Settings"));
const Legal = lazy(() => import("@/pages/Legal"));
const NotFound = lazy(() => import("@/pages/not-found"));

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-muted-foreground">Loading...</div>
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/auth" component={Auth} />
        <Route path="/onboarding" component={Onboarding} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/markets" component={MarketSelection} />
        <Route path="/contests" component={ContestListing} />
        <Route path="/contests/:id" component={ContestDetail} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/simulation/:id" component={SimulationStatus} />
        <Route path="/leaderboard" component={Leaderboard} />
        <Route path="/profile" component={Profile} />
        <Route path="/rewards" component={Rewards} />
        <Route path="/notifications" component={Notifications} />
        <Route path="/settings" component={Settings} />
        <Route path="/legal" component={Legal} />
        {/* Fallback to 404 */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
