import { Link } from "wouter";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, TrendingDown } from "lucide-react";

const markets = [
  {
    category: "Stocks",
    assets: [
      { name: "Apple Inc. (AAPL)", symbol: "AAPL", change: "+1.5%", positive: true },
      { name: "Microsoft Corp. (MSFT)", symbol: "MSFT", change: "+0.8%", positive: true },
      { name: "Amazon.com Inc. (AMZN)", symbol: "AMZN", change: "-0.3%", positive: false },
      { name: "Tesla Inc. (TSLA)", symbol: "TSLA", change: "+2.1%", positive: true },
    ],
  },
  {
    category: "Indices",
    assets: [
      { name: "S&P 500", symbol: "SPX", change: "+1.2%", positive: true },
      { name: "NASDAQ Composite", symbol: "IXIC", change: "+0.8%", positive: true },
      { name: "Dow Jones", symbol: "DJI", change: "+0.5%", positive: true },
    ],
  },
  {
    category: "Crypto",
    assets: [
      { name: "Bitcoin", symbol: "BTC/USD", change: "-2.4%", positive: false },
      { name: "Ethereum", symbol: "ETH/USD", change: "+1.8%", positive: true },
      { name: "Solana", symbol: "SOL/USD", change: "-0.9%", positive: false },
    ],
  },
  {
    category: "Commodities",
    assets: [
      { name: "Gold", symbol: "XAU/USD", change: "+0.5%", positive: true },
      { name: "Crude Oil", symbol: "WTI", change: "-1.1%", positive: false },
      { name: "Silver", symbol: "XAG/USD", change: "+0.2%", positive: true },
    ],
  },
  {
    category: "Forex",
    assets: [
      { name: "EUR/USD", symbol: "EURUSD", change: "+0.1%", positive: true },
      { name: "GBP/USD", symbol: "GBPUSD", change: "-0.2%", positive: false },
      { name: "USD/JPY", symbol: "USDJPY", change: "+0.3%", positive: true },
    ],
  },
];

export default function MarketSelection() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navigation />
      <main className="pt-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-medium tracking-tight mb-2">Market Selection</h1>
            <p className="text-muted-foreground">
              Choose from thousands of global instruments across multiple asset classes.
            </p>
          </div>

          {/* Markets by Category */}
          <div className="space-y-12">
            {markets.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-medium mb-2">{category.category}</h2>
                  <div className="w-16 h-[1px] bg-white/20" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.assets.map((asset, assetIndex) => (
                    <motion.div
                      key={asset.symbol}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: categoryIndex * 0.1 + assetIndex * 0.05 }}
                      whileHover={{ 
                        backgroundColor: "rgba(255,255,255,0.03)",
                        borderColor: "rgba(255,255,255,0.15)",
                        y: -4,
                      }}
                      className="border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm transition-all cursor-pointer group"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium mb-1">{asset.name}</h3>
                          <p className="text-xs text-muted-foreground font-mono">{asset.symbol}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">24h Change</span>
                        <span
                          className={`text-sm font-mono flex items-center gap-1 ${
                            asset.positive ? "text-emerald-500/80" : "text-rose-500/80"
                          }`}
                        >
                          {asset.positive ? (
                            <TrendingUp className="w-3 h-3" />
                          ) : (
                            <TrendingDown className="w-3 h-3" />
                          )}
                          {asset.change}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center border-t border-white/5 pt-12">
            <p className="text-muted-foreground mb-6">
              Ready to start allocating? Join a contest to begin.
            </p>
            <Link href="/contests">
              <Button className="bg-white text-black hover:bg-white/90 h-12 px-8 font-medium">
                View Contests <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
