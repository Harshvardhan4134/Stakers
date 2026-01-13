import { Link } from "wouter";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(9, 9, 11, 0.8)", "rgba(9, 9, 11, 0.95)"]
  );
  const borderOpacity = useTransform(
    scrollY,
    [0, 100],
    [0.05, 0.15]
  );

  return (
    <motion.nav 
      style={{ backgroundColor, borderBottomColor: `rgba(255, 255, 255, ${borderOpacity})` }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div>
          <Link href="/" className="text-lg font-medium tracking-tight hover:text-white/80 transition-colors inline-block hover:scale-105 active:scale-95 transition-transform duration-150">
            MARKET_SIM
          </Link>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {[
            { href: "#markets", label: "Markets" },
            { href: "#how-it-works", label: "How it works" },
            { href: "#leaderboard", label: "Leaderboard" },
          ].map((item, i) => (
            <a
              key={i}
              href={item.href}
              className="hover:text-foreground transition-all duration-200 relative hover:-translate-y-0.5 group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-200" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link href="/auth" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block hover:scale-105 active:scale-95 transition-transform duration-150">
            Log in
          </Link>
          <Link href="/auth">
            <Button 
              variant="outline" 
              className="h-9 px-4 text-xs uppercase tracking-wider bg-transparent border-white/20 hover:bg-white hover:text-black transition-all duration-200 hover:border-white hover:scale-105 active:scale-95"
            >
              Start Free
            </Button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
