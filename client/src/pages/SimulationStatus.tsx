import { useRoute } from "wouter";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Clock, Trophy, ArrowRight } from "lucide-react";

// Mock data
const mockStatus = {
  contestId: 1,
  contestName: "Daily Challenge",
  timeRemaining: "2h 34m",
  currentRank: 42,
  previousRank: 45,
  totalParticipants: 1247,
  performance: "+12.5%",
  allocations: [
    { asset: "S&P 500", allocated: 300000, current: 318000, change: "+6.0%", positive: true },
    { asset: "BTC/USD", allocated: 200000, current: 186000, change: "-7.0%", positive: false },
    { asset: "GOLD", allocated: 150000, current: 153750, change: "+2.5%", positive: true },
    { asset: "Apple Inc.", allocated: 200000, current: 212000, change: "+6.0%", positive: true },
    { asset: "EUR/USD", allocated: 150000, current: 150150, change: "+0.1%", positive: true },
  ],
};

export default function SimulationStatus() {
  const [, params] = useRoute("/simulation/:id");
  const simulationId = params?.id;

  const totalAllocated = mockStatus.allocations.reduce((sum, a) => sum + a.allocated, 0);
  const totalCurrent = mockStatus.allocations.reduce((sum, a) => sum + a.current, 0);
  const totalChange = ((totalCurrent - totalAllocated) / totalAllocated) * 100;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navigation />
      <main className="pt-20 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="mb-8">
            <Link href="/dashboard">
              <Button variant="ghost" className="mb-6 text-muted-foreground hover:text-white">
                ← Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-4xl font-medium tracking-tight mb-2">Simulation Status</h1>
            <p className="text-muted-foreground">{mockStatus.contestName}</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            <div className="border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  Time Left
                </span>
              </div>
              <div className="text-2xl font-mono text-white">{mockStatus.timeRemaining}</div>
            </div>
            <div className="border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-4 h-4 text-indigo-400" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  Current Rank
                </span>
              </div>
              <div className="text-2xl font-mono text-indigo-400">#{mockStatus.currentRank}</div>
            </div>
            <div className="border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm">
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                Performance
              </div>
              <div className={`text-2xl font-mono flex items-center gap-1 ${totalChange >= 0 ? "text-emerald-500/80" : "text-rose-500/80"}`}>
                {totalChange >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                {totalChange >= 0 ? "+" : ""}{totalChange.toFixed(2)}%
              </div>
            </div>
            <div className="border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm">
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                Rank Change
              </div>
              <div className={`text-2xl font-mono ${mockStatus.currentRank < mockStatus.previousRank ? "text-emerald-500/80" : "text-rose-500/80"}`}>
                {mockStatus.currentRank < mockStatus.previousRank ? "↑" : "↓"} {Math.abs(mockStatus.currentRank - mockStatus.previousRank)}
              </div>
            </div>
          </div>

          {/* Portfolio Breakdown */}
          <div className="border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm mb-8">
            <h2 className="text-xl font-medium mb-6">Portfolio Breakdown</h2>
            <div className="space-y-4">
              {mockStatus.allocations.map((allocation, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex justify-between items-center p-4 border border-white/5 bg-white/[0.01]"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{allocation.asset}</span>
                      <span className={`text-sm font-mono flex items-center gap-1 ${allocation.positive ? "text-emerald-500/80" : "text-rose-500/80"}`}>
                        {allocation.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {allocation.change}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Allocated: ${allocation.allocated.toLocaleString()}</span>
                      <span>Current: ${allocation.current.toLocaleString()}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Total Summary */}
            <div className="mt-6 pt-6 border-t border-white/5">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Portfolio Value</span>
                <div className="text-right">
                  <div className="text-2xl font-mono text-white">${totalCurrent.toLocaleString()}</div>
                  <div className={`text-sm font-mono ${totalChange >= 0 ? "text-emerald-500/80" : "text-rose-500/80"}`}>
                    {totalChange >= 0 ? "+" : ""}{totalChange.toFixed(2)}% from allocation
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Link href="/leaderboard" className="flex-1">
              <Button variant="outline" className="w-full border-white/20 bg-transparent hover:bg-white/5 h-12">
                View Leaderboard <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/portfolio" className="flex-1">
              <Button className="w-full bg-white text-black hover:bg-white/90 h-12 font-medium">
                Adjust Allocation
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
