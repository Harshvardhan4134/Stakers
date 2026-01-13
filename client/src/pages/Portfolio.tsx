import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, X, TrendingUp } from "lucide-react";

const availableAssets = [
  { id: 1, name: "S&P 500", symbol: "SPX", price: 4783.45, change: "+1.2%" },
  { id: 2, name: "BTC/USD", symbol: "BTCUSD", price: 42156.00, change: "-2.4%" },
  { id: 3, name: "GOLD", symbol: "XAUUSD", price: 2045.30, change: "+0.5%" },
  { id: 4, name: "Apple Inc.", symbol: "AAPL", price: 185.20, change: "+1.5%" },
  { id: 5, name: "EUR/USD", symbol: "EURUSD", price: 1.0924, change: "+0.1%" },
];

export default function Portfolio() {
  const [allocations, setAllocations] = useState<Record<number, number>>({});
  const totalAllocated = Object.values(allocations).reduce((sum, val) => sum + val, 0);
  const available = 1000000 - totalAllocated;

  const handleAllocate = (assetId: number, amount: number) => {
    if (amount < 0) return;
    if (totalAllocated - (allocations[assetId] || 0) + amount > 1000000) {
      return; // Exceeds total
    }
    setAllocations({ ...allocations, [assetId]: amount });
  };

  const handleRemove = (assetId: number) => {
    const newAllocations = { ...allocations };
    delete newAllocations[assetId];
    setAllocations(newAllocations);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navigation />
      <main className="pt-20 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-medium tracking-tight mb-2">Portfolio Allocation</h1>
            <p className="text-muted-foreground">
              Allocate your virtual credits across available markets.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Allocation Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Wallet Summary */}
              <div className="border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-muted-foreground">Total Credits</span>
                  <span className="text-2xl font-mono text-white">$1,000,000</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-muted-foreground">Allocated</span>
                  <span className="text-xl font-mono text-white">${totalAllocated.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Available</span>
                  <span className={`text-xl font-mono ${available >= 0 ? "text-emerald-500/80" : "text-rose-500/80"}`}>
                    ${available.toLocaleString()}
                  </span>
                </div>
                <div className="mt-4 h-2 bg-white/5 relative">
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-white"
                    initial={{ width: "0%" }}
                    animate={{ width: `${(totalAllocated / 1000000) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Available Assets */}
              <div>
                <h2 className="text-xl font-medium mb-4">Available Assets</h2>
                <div className="space-y-3">
                  {availableAssets.map((asset) => (
                    <motion.div
                      key={asset.id}
                      whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                      className="border border-white/5 bg-white/[0.02] p-4 backdrop-blur-sm"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium mb-1">{asset.name}</h3>
                          <p className="text-xs text-muted-foreground font-mono">{asset.symbol}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-mono text-white">${asset.price.toLocaleString()}</div>
                          <div className={`text-xs font-mono ${asset.change.startsWith("+") ? "text-emerald-500/80" : "text-rose-500/80"}`}>
                            {asset.change}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          placeholder="Amount"
                          value={allocations[asset.id] || ""}
                          onChange={(e) => handleAllocate(asset.id, parseFloat(e.target.value) || 0)}
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-white/30 flex-1"
                        />
                        <Button
                          variant="outline"
                          onClick={() => handleAllocate(asset.id, available)}
                          className="border-white/20 bg-transparent"
                          disabled={available <= 0}
                        >
                          Max
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Current Allocations */}
            <div>
              <h2 className="text-xl font-medium mb-4">Current Allocations</h2>
              <div className="border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm space-y-4">
                {Object.keys(allocations).length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No allocations yet. Select assets above to allocate credits.
                  </p>
                ) : (
                  <>
                    {Object.entries(allocations)
                      .filter(([_, amount]) => amount > 0)
                      .map(([assetId, amount]) => {
                        const asset = availableAssets.find((a) => a.id === parseInt(assetId));
                        if (!asset) return null;
                        return (
                          <div
                            key={assetId}
                            className="flex justify-between items-center p-3 border border-white/5 bg-white/[0.01]"
                          >
                            <div className="flex-1">
                              <div className="text-sm font-medium">{asset.name}</div>
                              <div className="text-xs text-muted-foreground font-mono">
                                ${amount.toLocaleString()}
                              </div>
                            </div>
                            <button
                              onClick={() => handleRemove(parseInt(assetId))}
                              className="text-muted-foreground hover:text-white transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      })}
                  </>
                )}

                <div className="pt-4 border-t border-white/5">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-muted-foreground">Total Allocated</span>
                    <span className="text-lg font-mono text-white">${totalAllocated.toLocaleString()}</span>
                  </div>
                  <Button
                    className="w-full bg-white text-black hover:bg-white/90 h-12 font-medium"
                    disabled={totalAllocated === 0 || available < 0}
                  >
                    Confirm Allocation
                  </Button>
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
