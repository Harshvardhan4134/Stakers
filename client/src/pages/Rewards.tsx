import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Trophy, Award, Lock } from "lucide-react";

const mockBadges = [
  { id: 1, name: "First Trade", icon: "🎯", description: "Complete your first allocation", earned: true, earnedDate: "2024-01-02" },
  { id: 2, name: "Top 10%", icon: "⭐", description: "Finish in top 10% of a contest", earned: true, earnedDate: "2024-01-10" },
  { id: 3, name: "Week Warrior", icon: "🔥", description: "Participate in 7 consecutive contests", earned: true, earnedDate: "2024-01-15" },
  { id: 4, name: "Market Master", icon: "👑", description: "Win a monthly contest", earned: false },
  { id: 5, name: "Perfect Week", icon: "💎", description: "Finish in top 10 every day for a week", earned: false },
  { id: 6, name: "Diversifier", icon: "🌐", description: "Allocate across 5+ asset classes", earned: false },
  { id: 7, name: "Rising Star", icon: "🚀", description: "Climb 50+ ranks in a single contest", earned: false },
  { id: 8, name: "Consistent", icon: "📈", description: "Positive returns for 10 consecutive days", earned: false },
];

const mockMilestones = [
  { name: "First Contest", progress: 100, target: 1, achieved: true },
  { name: "Top 100", progress: 100, target: 100, achieved: true },
  { name: "Top 50", progress: 84, target: 50, achieved: false },
  { name: "Top 10", progress: 0, target: 10, achieved: false },
];

export default function Rewards() {
  const earnedBadges = mockBadges.filter((b) => b.earned);
  const lockedBadges = mockBadges.filter((b) => !b.earned);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navigation />
      <main className="pt-20 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-8 h-8 text-indigo-400" />
              <h1 className="text-4xl font-medium tracking-tight">Rewards & Badges</h1>
            </div>
            <p className="text-muted-foreground">
              Track your achievements and milestones. Earn badges by participating in contests.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm">
              <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">
                Badges Earned
              </div>
              <div className="text-3xl font-mono text-white">
                {earnedBadges.length} / {mockBadges.length}
              </div>
            </div>
            <div className="border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm">
              <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">
                Milestones
              </div>
              <div className="text-3xl font-mono text-white">
                {mockMilestones.filter((m) => m.achieved).length} / {mockMilestones.length}
              </div>
            </div>
            <div className="border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm">
              <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">
                Completion
              </div>
              <div className="text-3xl font-mono text-indigo-400">
                {Math.round((earnedBadges.length / mockBadges.length) * 100)}%
              </div>
            </div>
          </div>

          {/* Earned Badges */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Award className="w-5 h-5 text-emerald-500/80" />
              <h2 className="text-2xl font-medium">Earned Badges</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {earnedBadges.map((badge, i) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm text-center"
                >
                  <div className="text-4xl mb-3">{badge.icon}</div>
                  <h3 className="font-medium mb-1">{badge.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{badge.description}</p>
                  <div className="text-xs text-muted-foreground">
                    Earned {new Date(badge.earnedDate!).toLocaleDateString()}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Locked Badges */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Lock className="w-5 h-5 text-muted-foreground" />
              <h2 className="text-2xl font-medium">Locked Badges</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {lockedBadges.map((badge, i) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm text-center opacity-50"
                >
                  <div className="text-4xl mb-3 grayscale">{badge.icon}</div>
                  <h3 className="font-medium mb-1">{badge.name}</h3>
                  <p className="text-xs text-muted-foreground">{badge.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Milestones */}
          <div>
            <h2 className="text-2xl font-medium mb-6">Milestones</h2>
            <div className="space-y-4">
              {mockMilestones.map((milestone, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{milestone.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {milestone.achieved ? "✓ Achieved" : `${milestone.progress}%`}
                    </span>
                  </div>
                  <div className="h-2 bg-white/5 relative">
                    <motion.div
                      className={`absolute top-0 left-0 h-full ${
                        milestone.achieved ? "bg-emerald-500/80" : "bg-white/20"
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${milestone.progress}%` }}
                      transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
