import { Link } from "wouter";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Clock, Users, Trophy, ArrowRight, Calendar } from "lucide-react";

const contests = [
  {
    id: 1,
    name: "Daily Challenge",
    type: "Daily",
    startTime: "2024-01-15T00:00:00Z",
    endTime: "2024-01-15T23:59:59Z",
    participants: 1247,
    status: "active",
    description: "24-hour challenge across all markets. Top performers win badges.",
  },
  {
    id: 2,
    name: "Weekly Crypto",
    type: "Weekly",
    startTime: "2024-01-15T00:00:00Z",
    endTime: "2024-01-22T23:59:59Z",
    participants: 892,
    status: "active",
    description: "Focus on cryptocurrency markets. 7-day simulation period.",
  },
  {
    id: 3,
    name: "Monthly Master",
    type: "Monthly",
    startTime: "2024-01-01T00:00:00Z",
    endTime: "2024-01-31T23:59:59Z",
    participants: 2156,
    status: "active",
    description: "Month-long challenge with comprehensive market coverage.",
  },
  {
    id: 4,
    name: "Stock Market Sprint",
    type: "Daily",
    startTime: "2024-01-16T00:00:00Z",
    endTime: "2024-01-16T23:59:59Z",
    participants: 0,
    status: "upcoming",
    description: "Stocks-only challenge starting tomorrow.",
  },
];

export default function ContestListing() {
  const activeContests = contests.filter((c) => c.status === "active");
  const upcomingContests = contests.filter((c) => c.status === "upcoming");

  const formatTimeRemaining = (endTime: string) => {
    const end = new Date(endTime);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navigation />
      <main className="pt-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-medium tracking-tight mb-2">Contests</h1>
            <p className="text-muted-foreground">
              Join free contests and compete for rankings. No entry fees, no risk.
            </p>
          </div>

          {/* Active Contests */}
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <Trophy className="w-5 h-5 text-indigo-400" />
              <h2 className="text-2xl font-medium">Active Contests</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeContests.map((contest, i) => (
                <motion.div
                  key={contest.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ 
                    backgroundColor: "rgba(255,255,255,0.03)",
                    borderColor: "rgba(255,255,255,0.15)",
                    y: -4,
                  }}
                  className="border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="inline-flex items-center gap-2 px-2 py-1 border border-white/10 bg-white/5 text-xs text-muted-foreground mb-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {contest.type}
                      </div>
                      <h3 className="text-2xl font-medium mb-2">{contest.name}</h3>
                      <p className="text-sm text-muted-foreground">{contest.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mb-6 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {formatTimeRemaining(contest.endTime)} left
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {contest.participants} participants
                    </span>
                  </div>

                  <Link href={`/contests/${contest.id}`}>
                    <Button className="w-full bg-white text-black hover:bg-white/90 h-12 font-medium">
                      Join Contest <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Upcoming Contests */}
          {upcomingContests.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <h2 className="text-2xl font-medium">Upcoming Contests</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingContests.map((contest, i) => (
                  <motion.div
                    key={contest.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm opacity-60"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="inline-flex items-center gap-2 px-2 py-1 border border-white/10 bg-white/5 text-xs text-muted-foreground mb-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                          {contest.type}
                        </div>
                        <h3 className="text-2xl font-medium mb-2">{contest.name}</h3>
                        <p className="text-sm text-muted-foreground">{contest.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 mb-6 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Starts {new Date(contest.startTime).toLocaleDateString()}
                      </span>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full border-white/20 bg-transparent h-12"
                      disabled
                    >
                      Starting Soon
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
