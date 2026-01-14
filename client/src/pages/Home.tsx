import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronRight, TrendingUp, Sparkles } from "lucide-react";
import { useCreateSubscriber } from "@/hooks/use-subscribers";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { MarketTrends } from "@/components/MarketTrends";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// --- Components for sections ---

function HeroSection() {
  const [email, setEmail] = useState("");
  const createSubscriber = useCreateSubscriber();
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, prefersReducedMotion ? 0 : 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    createSubscriber.mutate({ email });
    setEmail("");
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-20 overflow-hidden subtle-grid">
      {/* Animated gradient background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-0"
        style={{ opacity }}
      />
      
      {/* Floating particles effect - reduced for performance */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => {
            const width = typeof window !== 'undefined' ? window.innerWidth : 1920;
            const height = typeof window !== 'undefined' ? window.innerHeight : 1080;
            return (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/10 rounded-full will-change-transform"
                style={{ transform: 'translateZ(0)' }}
                initial={{
                  x: Math.random() * width,
                  y: Math.random() * height,
                }}
                animate={{
                  y: [null, Math.random() * height],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: Math.random() * 4 + 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "linear",
                }}
              />
            );
          })}
        </div>
      )}
      
      <motion.div 
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ y: prefersReducedMotion ? undefined : y }}
        className="relative z-10 max-w-4xl mx-auto text-center space-y-8 will-change-transform"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs text-muted-foreground mb-4 hover:border-white/20 transition-all duration-300"
        >
          {!prefersReducedMotion && (
            <motion.span 
              className="w-1.5 h-1.5 rounded-full bg-indigo-500"
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          {prefersReducedMotion && (
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          )}
          <span>Risk-free simulation environment</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter text-balance text-foreground leading-[0.95]"
        >
          Understand Markets. <br />
          <motion.span 
            className="text-muted-foreground inline-block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Risk Nothing.
          </motion.span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="max-w-xl mx-auto text-lg md:text-xl text-muted-foreground/80 font-light leading-relaxed"
        >
          Explore global markets using free virtual credits. 
          No real money. No noise. Just pure market mechanics and learning.
        </motion.p>

        <motion.form 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          onSubmit={handleSubscribe} 
          className="max-w-sm mx-auto flex gap-2 pt-4"
        >
          <motion.div
            whileFocus={{ scale: 1.02 }}
            className="flex-1"
          >
            <Input 
              type="email" 
              placeholder="Enter email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-white/30 focus:ring-2 focus:ring-white/20 transition-all h-12 backdrop-blur-sm"
            />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              type="submit" 
              disabled={createSubscriber.isPending}
              className="h-12 px-6 bg-white text-black hover:bg-white/90 transition-all font-medium shadow-lg shadow-white/10 hover:shadow-white/20"
            >
              {createSubscriber.isPending ? "Joining..." : "Start Free"}
            </Button>
          </motion.div>
        </motion.form>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="pt-12 text-xs text-muted-foreground/40 font-mono"
        >
          NO CREDIT CARD REQUIRED · INSTANT ACCESS
        </motion.div>
      </motion.div>
    </section>
  );
}

function MarketCard({ title, value, change, index }: { title: string, value: string, change: string, index: number }) {
  const isPositive = change.startsWith("+");
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
      transition={{ delay: prefersReducedMotion ? 0 : index * 0.05, duration: prefersReducedMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={prefersReducedMotion ? {} : { 
        y: -4, 
        backgroundColor: "rgba(255,255,255,0.05)",
        borderColor: "rgba(255,255,255,0.15)",
        transition: { duration: 0.2 }
      }}
      className="p-6 border border-white/5 rounded-none group transition-all duration-200 relative overflow-hidden will-change-transform"
      style={{ transform: 'translateZ(0)' }}
    >
      {/* Hover glow effect - CSS only for performance */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-indigo-500/0 to-indigo-500/0 group-hover:from-indigo-500/5 group-hover:via-indigo-500/10 group-hover:to-indigo-500/5 transition-all duration-300 pointer-events-none" />
      
      <div className="relative z-10 flex justify-between items-start mb-8">
        <motion.span 
          className="text-sm font-medium text-muted-foreground group-hover:text-white transition-colors"
          whileHover={{ x: 2 }}
        >
          {title}
        </motion.span>
        <motion.div
          whileHover={{ rotate: 0, x: 2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <ArrowRight className="w-4 h-4 text-white/20 -rotate-45 group-hover:text-white group-hover:rotate-0 transition-all duration-300" />
        </motion.div>
      </div>
      <div className="relative z-10 flex flex-col gap-1">
        <motion.span 
          className="text-2xl font-mono text-white tracking-tight"
          initial={false}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: index * 0.1 + 0.2 }}
        >
          {value}
        </motion.span>
        <motion.span 
          className={`text-xs font-mono ${isPositive ? 'text-emerald-500/80' : 'text-rose-500/80'}`}
          initial={false}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          {change}
        </motion.span>
      </div>
    </motion.div>
  );
}

function MarketsSection() {
  const markets = [
    { title: "S&P 500", value: "4,783.45", change: "+1.2%" },
    { title: "NASDAQ", value: "15,124.20", change: "+0.8%" },
    { title: "BTC/USD", value: "42,156.00", change: "-2.4%" },
    { title: "EUR/USD", value: "1.0924", change: "+0.1%" },
    { title: "GOLD", value: "2,045.30", change: "+0.5%" },
    { title: "CRUDE OIL", value: "72.45", change: "-1.1%" },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="markets" className="py-32 border-t border-white/5 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent" />
      
      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
        >
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight">Global coverage</h2>
          <p className="text-muted-foreground max-w-sm text-sm">
            Access real-time data across every major asset class. Simulate trades without slippage or fees.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {markets.map((m, i) => (
            <MarketCard key={i} {...m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Step({ num, title, desc, index }: { num: string, title: string, desc: string, index: number }) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -10 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: prefersReducedMotion ? 0 : -10 }}
      transition={{ delay: prefersReducedMotion ? 0 : index * 0.1, duration: prefersReducedMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-4 group"
    >
      <div 
        className="w-full h-[1px] bg-white/10 group-hover:bg-indigo-500/50 transition-colors duration-300 mb-4 origin-left relative"
        style={{ 
          transform: isInView && !prefersReducedMotion ? 'scaleX(1)' : 'scaleX(0)',
          transition: `transform ${prefersReducedMotion ? '0s' : '0.5s'} ease-out ${index * 0.1 + 0.1}s`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/50 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <motion.span 
        className="font-mono text-xs text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: index * 0.15 + 0.3 }}
      >
        0{num}
      </motion.span>
        <motion.h3 
          className="text-xl font-medium text-white"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 5 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReducedMotion ? 0 : 5 }}
          transition={{ delay: prefersReducedMotion ? 0 : index * 0.1 + 0.2, duration: prefersReducedMotion ? 0 : 0.3 }}
          whileHover={prefersReducedMotion ? {} : { x: 2 }}
        >
          {title}
        </motion.h3>
      <motion.p 
        className="text-sm text-muted-foreground leading-relaxed max-w-xs"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: index * 0.15 + 0.5 }}
      >
        {desc}
      </motion.p>
    </motion.div>
  );
}

function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="py-32 bg-white/[0.02] relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)]" />
      </div>
      
      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-24"
        >
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight">Systematic learning</h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <Step num="1" title="Get credits" desc="Start with $100,000 in virtual capital. Reset anytime to try new strategies." index={0} />
          <Step num="2" title="Select asset" desc="Choose from thousands of global instruments across multiple asset classes." index={1} />
          <Step num="3" title="Simulate" desc="Execute long or short positions with advanced order types and stop losses." index={2} />
          <Step num="4" title="Analyze" desc="Review your performance metrics and compare against the global leaderboard." index={3} />
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    "Virtual capital only",
    "Zero financial risk",
    "Real-time market data",
    "Algorithm-driven engine",
    "Skill-based ranking",
    "Historical backtesting"
  ];

  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-24 border-y border-white/5 relative">
      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-1"
          >
             <h2 className="text-2xl font-medium tracking-tight mb-4">Why simulate?</h2>
             <p className="text-sm text-muted-foreground">Build confidence before capital.</p>
          </motion.div>
          <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
            {features.map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -5 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: prefersReducedMotion ? 0 : -5 }}
                transition={{ delay: prefersReducedMotion ? 0 : i * 0.05, duration: prefersReducedMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3 group cursor-default"
              >
                <div 
                  className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-indigo-500 transition-all duration-200 group-hover:scale-125"
                />
                <span 
                  className="text-muted-foreground group-hover:text-white transition-all duration-200 group-hover:translate-x-1"
                >
                  {f}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LeaderboardPreview() {
  const users = [
    { rank: 1, name: "alex_strategies", return: "+142.5%", score: 9820 },
    { rank: 2, name: "macro_king", return: "+89.2%", score: 9450 },
    { rank: 3, name: "quant_loop", return: "+64.8%", score: 8910 },
    { rank: 4, name: "fiat_zero", return: "+52.1%", score: 8740 },
    { rank: 5, name: "yield_hunter", return: "+41.3%", score: 8200 },
  ];

  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="leaderboard" className="py-32 relative">
      <div ref={ref} className="max-w-4xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">Top Performers</h2>
          <p className="text-muted-foreground text-sm">Ranked by risk-adjusted returns over the last 30 days.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="border border-white/5 rounded-none overflow-hidden backdrop-blur-sm bg-white/[0.01]"
        >
          <div className="grid grid-cols-12 px-6 py-4 border-b border-white/5 bg-white/[0.02] text-xs font-mono text-muted-foreground uppercase tracking-wider">
            <div className="col-span-2">Rank</div>
            <div className="col-span-6">Trader</div>
            <div className="col-span-2 text-right">Return</div>
            <div className="col-span-2 text-right">Score</div>
          </div>
          
          {users.map((user, i) => (
            <motion.div 
              key={user.rank}
              initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: prefersReducedMotion ? 0 : -10 }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.2 + i * 0.05, duration: prefersReducedMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
              whileHover={prefersReducedMotion ? {} : { 
                backgroundColor: "rgba(255,255,255,0.03)",
                x: 2,
                transition: { duration: 0.15 }
              }}
              className="grid grid-cols-12 px-6 py-5 border-b border-white/5 last:border-0 text-sm items-center transition-all duration-150 cursor-pointer group will-change-transform"
              style={{ transform: 'translateZ(0)' }}
            >
              <div className="col-span-2 font-mono text-muted-foreground group-hover:scale-105 transition-transform duration-150">
                {user.rank === 1 ? (
                  <span className="text-indigo-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    01
                  </span>
                ) : (
                  `0${user.rank}`
                )}
              </div>
              <div className="col-span-6 font-medium text-white group-hover:text-indigo-400 transition-colors">{user.name}</div>
              <div className="col-span-2 text-right font-mono text-emerald-500/80 group-hover:scale-105 transition-transform duration-150">
                {user.return}
              </div>
              <div className="col-span-2 text-right font-mono text-muted-foreground">{user.score}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="ghost" className="text-muted-foreground hover:text-white group">
              View full leaderboard 
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Disclaimer() {
  return (
    <div className="py-8 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-[10px] text-white/20 uppercase tracking-widest">
          This is a simulation. No real money is involved. Virtual credits have no cash value.
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navigation />
      <main>
        <HeroSection />
        <MarketsSection />
        <MarketTrends />
        <HowItWorks />
        <Features />
        <LeaderboardPreview />
        <Disclaimer />
      </main>
      <Footer />
    </div>
  );
}
