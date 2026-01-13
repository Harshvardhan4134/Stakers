import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Auth from "@/pages/Auth";
import Onboarding from "@/pages/Onboarding";
import Dashboard from "@/pages/Dashboard";
import MarketSelection from "@/pages/MarketSelection";
import ContestListing from "@/pages/ContestListing";
import ContestDetail from "@/pages/ContestDetail";
import Portfolio from "@/pages/Portfolio";
import SimulationStatus from "@/pages/SimulationStatus";
import Leaderboard from "@/pages/Leaderboard";
import Profile from "@/pages/Profile";
import Rewards from "@/pages/Rewards";
import Notifications from "@/pages/Notifications";
import Settings from "@/pages/Settings";
import Legal from "@/pages/Legal";
import NotFound from "@/pages/not-found";

function Router() {
  return (
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
