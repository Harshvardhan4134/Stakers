import { useState } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Trophy, Sparkles, Filter } from "lucide-react";

const mockLeaderboard = [
  { rank: 1, name: "alex_strategies", return: "+142.5%", score: 9820, badge: "🥇" },
  { rank: 2, name: "macro_king", return: "+89.2%", score: 9450, badge: "🥈" },
  { rank: 3, name: "quant_loop", return: "+64.8%", score: 8910, badge: "🥉" },
  { rank: 4, name: "fiat_zero", return: "+52.1%", score: 8740 },
  { rank: 5, name: "yield_hunter", return: "+41.3%", score: 8200 },
  { rank: 6, name: "crypto_wizard", return: "+38.7%", score: 8150 },
  { rank: 7, name: "market_maven", return: "+35.2%", score: 7980 },
  { rank: 8, name: "bull_runner", return: "+32.1%", score: 7850 },
  { rank: 9, name: "bear_tamer", return: "+29.8%", score: 7720 },
  { rank: 10, name: "trend_follower", return: "+27.5%", score: 7600 },
  { rank: 42, name: "you", return: "+12.5%", score: 6500, isCurrentUser: true },
];

const filterOptions = ["All", "Daily", "Weekly", "Monthly"];

export default function Leaderboard() {
  const [selectedFilter, setSelectedFilter] = useState("All");

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navigation />
      <main className="pt-20 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-8 h-8 text-indigo-400" />
              <h1 className="text-4xl font-medium tracking-tight">Leaderboard</h1>
            </div>
            <p className="text-muted-foreground">
              Top performers ranked by risk-adjusted returns.
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4 mb-8">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <div className="flex gap-2">
              {filterOptions.map((option) => (
                <Button
                  key={option}
                  variant={selectedFilter === option ? "default" : "ghost"}
                  onClick={() => setSelectedFilter(option)}
                  className={
                    selectedFilter === option
                      ? "bg-white text-black hover:bg-white/90"
                      : "text-muted-foreground hover:text-white"
                  }
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>

          {/* Leaderboard Table */}
          <div className="border border-white/5 rounded-none overflow-hidden backdrop-blur-sm bg-white/[0.01]">
            {/* Header */}
            <div className="grid grid-cols-12 px-6 py-4 border-b border-white/5 bg-white/[0.02] text-xs font-mono text-muted-foreground uppercase tracking-wider">
              <div className="col-span-1">Rank</div>
              <div className="col-span-5">Trader</div>
              <div className="col-span-3 text-right">Return</div>
              <div className="col-span-3 text-right">Score</div>
            </div>

            {/* Rows */}
            <div>
              {mockLeaderboard.map((user, i) => (
                <motion.div
                  key={user.rank}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                  className={`grid grid-cols-12 px-6 py-5 border-b border-white/5 last:border-0 text-sm items-center transition-colors ${
                    user.isCurrentUser ? "bg-indigo-500/10 border-l-2 border-l-indigo-500" : ""
                  }`}
                >
                  <div className="col-span-1 font-mono text-muted-foreground flex items-center gap-2">
                    {user.rank <= 3 ? (
                      <span className="text-indigo-400 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        {user.badge || `0${user.rank}`}
                      </span>
                    ) : (
                      `0${user.rank}`
                    )}
                  </div>
                  <div className={`col-span-5 font-medium ${user.isCurrentUser ? "text-indigo-400" : "text-white"}`}>
                    {user.name}
                    {user.isCurrentUser && (
                      <span className="ml-2 text-xs text-muted-foreground">(You)</span>
                    )}
                  </div>
                  <div className="col-span-3 text-right font-mono text-emerald-500/80">
                    {user.return}
                  </div>
                  <div className="col-span-3 text-right font-mono text-muted-foreground">
                    {user.score.toLocaleString()}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center gap-2">
            <Button variant="ghost" className="text-muted-foreground" disabled>
              Previous
            </Button>
            <Button variant="ghost" className="bg-white/5 text-white">
              1
            </Button>
            <Button variant="ghost" className="text-muted-foreground">
              2
            </Button>
            <Button variant="ghost" className="text-muted-foreground">
              3
            </Button>
            <Button variant="ghost" className="text-muted-foreground">
              Next
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
