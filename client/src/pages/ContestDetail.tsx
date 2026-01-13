import { useRoute } from "wouter";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Clock, Users, Trophy, ArrowRight, Check, Info } from "lucide-react";

// Mock data
const mockContest = {
  id: 1,
  name: "Daily Challenge",
  type: "Daily",
  description: "24-hour challenge across all markets. Allocate your virtual credits strategically to climb the leaderboard.",
  startTime: "2024-01-15T00:00:00Z",
  endTime: "2024-01-15T23:59:59Z",
  participants: 1247,
  userRank: 42,
  rules: [
    "Start with 1,000,000 virtual credits",
    "Allocate across any available markets",
    "No real money involved",
    "Ranking based on performance",
    "Top 10% earn badges",
  ],
  markets: ["Stocks", "Indices", "Crypto", "Commodities", "Forex"],
};

export default function ContestDetail() {
  const [, params] = useRoute("/contests/:id");
  const contestId = params?.id;

  const formatTimeRemaining = (endTime: string) => {
    const end = new Date(endTime);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navigation />
      <main className="pt-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Back button */}
          <Link href="/contests">
            <Button variant="ghost" className="mb-8 text-muted-foreground hover:text-white">
              ← Back to Contests
            </Button>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/10 bg-white/5 text-xs text-muted-foreground mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {mockContest.type} Contest
            </div>
            <h1 className="text-4xl font-medium tracking-tight mb-4">{mockContest.name}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {mockContest.description}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  Time Remaining
                </span>
              </div>
              <div className="text-2xl font-mono text-white">{formatTimeRemaining(mockContest.endTime)}</div>
            </div>
            <div className="border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  Participants
                </span>
              </div>
              <div className="text-2xl font-mono text-white">{mockContest.participants.toLocaleString()}</div>
            </div>
            <div className="border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-4 h-4 text-indigo-400" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  Your Rank
                </span>
              </div>
              <div className="text-2xl font-mono text-indigo-400">#{mockContest.userRank}</div>
            </div>
          </div>

          {/* Rules */}
          <div className="border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Info className="w-5 h-5 text-muted-foreground" />
              <h2 className="text-xl font-medium">Contest Rules</h2>
            </div>
            <ul className="space-y-3">
              {mockContest.rules.map((rule, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <Check className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Markets */}
          <div className="border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm mb-8">
            <h2 className="text-xl font-medium mb-4">Available Markets</h2>
            <div className="flex flex-wrap gap-2">
              {mockContest.markets.map((market, i) => (
                <span
                  key={i}
                  className="px-3 py-1 border border-white/10 bg-white/5 text-sm text-muted-foreground"
                >
                  {market}
                </span>
              ))}
            </div>
          </div>

          {/* Leaderboard Preview */}
          <div className="border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium">Top Performers</h2>
              <Link href="/leaderboard">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-white">
                  View Full Leaderboard <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((rank) => (
                <div
                  key={rank}
                  className="flex justify-between items-center py-2 px-3 border-b border-white/5 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono text-muted-foreground w-8">
                      #{rank}
                    </span>
                    <span className="text-sm">trader_{rank}</span>
                  </div>
                  <span className="text-sm font-mono text-emerald-500/80">
                    +{(150 - rank * 10).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-4">
            <Link href="/portfolio" className="flex-1">
              <Button className="w-full bg-white text-black hover:bg-white/90 h-12 font-medium">
                Allocate Credits
              </Button>
            </Link>
            <Link href={`/simulation/${contestId}`} className="flex-1">
              <Button
                variant="outline"
                className="w-full border-white/20 bg-transparent hover:bg-white/5 h-12"
              >
                View Status
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
