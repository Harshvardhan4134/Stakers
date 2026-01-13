import { Link } from "wouter";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, ArrowRight, Clock, Trophy, Bell } from "lucide-react";

// Mock data
const mockWallet = {
  balance: 1000000,
  allocated: 450000,
  available: 550000,
};

const mockActiveContests = [
  {
    id: 1,
    name: "Daily Challenge",
    endTime: "2h 34m",
    participants: 1247,
    rank: 42,
    totalParticipants: 1247,
  },
  {
    id: 2,
    name: "Weekly Crypto",
    endTime: "3d 12h",
    participants: 892,
    rank: 15,
    totalParticipants: 892,
  },
];

const mockMarketShortcuts = [
  { name: "S&P 500", change: "+1.2%", positive: true },
  { name: "BTC/USD", change: "-2.4%", positive: false },
  { name: "GOLD", change: "+0.5%", positive: true },
  { name: "NASDAQ", change: "+0.8%", positive: true },
];

const mockRankSummary = {
  global: 42,
  daily: 15,
  weekly: 28,
};

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navigation />
      <main className="pt-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-medium tracking-tight mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back. Here's your market overview.</p>
          </div>

          {/* Wallet Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-white/5 bg-white/[0.02] p-8 mb-8 backdrop-blur-sm"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-medium mb-2">Virtual Credit Wallet</h2>
                <p className="text-sm text-muted-foreground">Your simulation balance</p>
              </div>
              <Link href="/portfolio">
                <Button variant="outline" className="border-white/20 hover:bg-white/5">
                  Manage Portfolio
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-white/5 p-6">
                <div className="text-xs text-muted-foreground mb-2 font-mono uppercase tracking-wider">
                  Total Balance
                </div>
                <div className="text-3xl font-mono text-white">
                  ${mockWallet.balance.toLocaleString()}
                </div>
              </div>
              <div className="border border-white/5 p-6">
                <div className="text-xs text-muted-foreground mb-2 font-mono uppercase tracking-wider">
                  Allocated
                </div>
                <div className="text-3xl font-mono text-white">
                  ${mockWallet.allocated.toLocaleString()}
                </div>
              </div>
              <div className="border border-white/5 p-6">
                <div className="text-xs text-muted-foreground mb-2 font-mono uppercase tracking-wider">
                  Available
                </div>
                <div className="text-3xl font-mono text-emerald-500/80">
                  ${mockWallet.available.toLocaleString()}
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Active Contests */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-medium">Active Contests</h2>
                <Link href="/contests">
                  <Button variant="ghost" className="text-muted-foreground hover:text-white">
                    View all <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>

              <div className="space-y-4">
                {mockActiveContests.map((contest) => (
                  <motion.div
                    key={contest.id}
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                    className="border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm transition-colors cursor-pointer"
                  >
                    <Link href={`/contests/${contest.id}`}>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-medium mb-1">{contest.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {contest.endTime} left
                            </span>
                            <span>{contest.participants} participants</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-muted-foreground mb-1">Your Rank</div>
                          <div className="text-2xl font-mono text-indigo-400">
                            #{contest.rank}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-muted-foreground">
                          Top {Math.round((contest.rank / contest.totalParticipants) * 100)}%
                        </div>
                        <Button variant="ghost" size="sm">
                          View Details <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Rank Summary */}
              <div className="border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-6">
                  <Trophy className="w-5 h-5 text-indigo-400" />
                  <h3 className="text-lg font-medium">Rank Summary</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Global Rank</div>
                    <div className="text-2xl font-mono text-white">#{mockRankSummary.global}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Daily Rank</div>
                    <div className="text-2xl font-mono text-indigo-400">#{mockRankSummary.daily}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Weekly Rank</div>
                    <div className="text-2xl font-mono text-white">#{mockRankSummary.weekly}</div>
                  </div>
                </div>
                <Link href="/leaderboard">
                  <Button variant="ghost" className="w-full mt-6 text-muted-foreground hover:text-white">
                    View Leaderboard
                  </Button>
                </Link>
              </div>

              {/* Market Shortcuts */}
              <div className="border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm">
                <h3 className="text-lg font-medium mb-4">Quick Markets</h3>
                <div className="space-y-3">
                  {mockMarketShortcuts.map((market, i) => (
                    <Link key={i} href="/markets">
                      <motion.div
                        whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                        className="flex justify-between items-center p-3 border border-white/5 cursor-pointer transition-colors"
                      >
                        <span className="text-sm font-medium">{market.name}</span>
                        <span
                          className={`text-sm font-mono ${
                            market.positive ? "text-emerald-500/80" : "text-rose-500/80"
                          }`}
                        >
                          {market.change}
                        </span>
                      </motion.div>
                    </Link>
                  ))}
                </div>
                <Link href="/markets">
                  <Button variant="ghost" className="w-full mt-4 text-muted-foreground hover:text-white">
                    View All Markets
                  </Button>
                </Link>
              </div>

              {/* Notifications Preview */}
              <div className="border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-muted-foreground" />
                    <h3 className="text-lg font-medium">Notifications</h3>
                  </div>
                  <Link href="/notifications">
                    <Button variant="ghost" size="sm" className="text-xs">
                      View all
                    </Button>
                  </Link>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Rank changed: #45 → #42</p>
                  <p>New contest starting soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
