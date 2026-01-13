import { Link } from "wouter";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Trophy, Calendar, TrendingUp, Award } from "lucide-react";

// Mock data
const mockProfile = {
  username: "you",
  joinedDate: "2024-01-01",
  badges: [
    { name: "First Trade", icon: "🎯", earned: "2024-01-02" },
    { name: "Top 10%", icon: "⭐", earned: "2024-01-10" },
    { name: "Week Warrior", icon: "🔥", earned: "2024-01-15" },
  ],
  stats: {
    globalRank: 42,
    dailyRank: 15,
    weeklyRank: 28,
    monthlyRank: 56,
    totalContests: 12,
    bestRank: 8,
    avgReturn: "+12.5%",
  },
  performanceHistory: [
    { date: "2024-01-15", return: "+12.5%", rank: 42 },
    { date: "2024-01-14", return: "+8.3%", rank: 58 },
    { date: "2024-01-13", return: "+15.2%", rank: 35 },
    { date: "2024-01-12", return: "-2.1%", rank: 89 },
    { date: "2024-01-11", return: "+5.7%", rank: 67 },
  ],
};

export default function Profile() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navigation />
      <main className="pt-20 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-medium tracking-tight mb-2">Profile</h1>
            <p className="text-muted-foreground">Your performance and achievements.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Profile Card */}
              <div className="border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-20 h-20 border border-white/10 bg-white/5 flex items-center justify-center text-2xl">
                    👤
                  </div>
                  <div>
                    <h2 className="text-2xl font-medium mb-1">{mockProfile.username}</h2>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      Joined {new Date(mockProfile.joinedDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">
                      Global Rank
                    </div>
                    <div className="text-2xl font-mono text-indigo-400">#{mockProfile.stats.globalRank}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">
                      Best Rank
                    </div>
                    <div className="text-2xl font-mono text-white">#{mockProfile.stats.bestRank}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">
                      Avg Return
                    </div>
                    <div className="text-2xl font-mono text-emerald-500/80">{mockProfile.stats.avgReturn}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">
                      Contests
                    </div>
                    <div className="text-2xl font-mono text-white">{mockProfile.stats.totalContests}</div>
                  </div>
                </div>
              </div>

              {/* Performance History */}
              <div className="border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm">
                <h2 className="text-xl font-medium mb-6">Recent Performance</h2>
                <div className="space-y-3">
                  {mockProfile.performanceHistory.map((entry, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex justify-between items-center p-4 border border-white/5 bg-white/[0.01]"
                    >
                      <div>
                        <div className="font-medium mb-1">
                          {new Date(entry.date).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-muted-foreground">Rank #{entry.rank}</div>
                      </div>
                      <div className={`text-lg font-mono ${entry.return.startsWith("+") ? "text-emerald-500/80" : "text-rose-500/80"}`}>
                        {entry.return}
                      </div>
                    </motion.div>
                  ))}
                </div>
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
                    <div className="text-xs text-muted-foreground mb-1">Global</div>
                    <div className="text-xl font-mono text-white">#{mockProfile.stats.globalRank}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Daily</div>
                    <div className="text-xl font-mono text-indigo-400">#{mockProfile.stats.dailyRank}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Weekly</div>
                    <div className="text-xl font-mono text-white">#{mockProfile.stats.weeklyRank}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Monthly</div>
                    <div className="text-xl font-mono text-white">#{mockProfile.stats.monthlyRank}</div>
                  </div>
                </div>
                <Link href="/leaderboard">
                  <Button variant="ghost" className="w-full mt-6 text-muted-foreground hover:text-white">
                    View Leaderboard
                  </Button>
                </Link>
              </div>

              {/* Badges */}
              <div className="border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-6">
                  <Award className="w-5 h-5 text-muted-foreground" />
                  <h3 className="text-lg font-medium">Badges</h3>
                </div>
                <div className="space-y-3">
                  {mockProfile.badges.map((badge, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 border border-white/5 bg-white/[0.01]"
                    >
                      <span className="text-2xl">{badge.icon}</span>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{badge.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(badge.earned).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/rewards">
                  <Button variant="ghost" className="w-full mt-6 text-muted-foreground hover:text-white">
                    View All Badges
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
