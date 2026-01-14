import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { TrendingUp, TrendingDown, Loader2 } from "lucide-react";

const MARKET_OPTIONS = [
  { label: "S&P 500", symbol: "SPX", yahooSymbol: "^GSPC" },
  { label: "NASDAQ", symbol: "IXIC", yahooSymbol: "^IXIC" },
  { label: "Bitcoin", symbol: "BTCUSD", yahooSymbol: "BTC-USD" },
  { label: "Gold", symbol: "XAUUSD", yahooSymbol: "GC=F" },
  { label: "USD/INR", symbol: "USDINR", yahooSymbol: "INR=X" },
];

const RANGE_OPTIONS = [
  { label: "7D", value: "7d" },
  { label: "1M", value: "1mo" },
  { label: "3M", value: "3mo" },
];

interface MarketData {
  dates: string[];
  prices: number[];
  currentPrice: number;
  previousPrice: number;
  change: number;
  changePercent: number;
}

export function MarketTrends() {
  const prefersReducedMotion = useReducedMotion();
  const [selectedMarket, setSelectedMarket] = useState(MARKET_OPTIONS[0]);
  const [selectedRange, setSelectedRange] = useState("7d");
  const [data, setData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          `/api/market?symbol=${selectedMarket.symbol}&range=${selectedRange}`
        );
        
        if (!response.ok) {
          const errorText = await response.text();
          // Check if response is HTML (error page)
          if (errorText.trim().startsWith('<!DOCTYPE') || errorText.trim().startsWith('<html')) {
            throw new Error("API endpoint not found. Please check server configuration.");
          }
          throw new Error(`Failed to fetch market data: ${response.status}`);
        }
        
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid response format from server");
        }
        
        const marketData = await response.json();
        setData(marketData);
      } catch (err: any) {
        setError(err.message || "Failed to load market data");
        console.error("Market data error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedMarket.symbol, selectedRange]);

  // Format data for chart
  const chartData = data
    ? data.dates.map((date, i) => ({
        date: new Date(date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        price: data.prices[i],
      }))
    : [];

  const isPositive = data ? data.change >= 0 : false;

  return (
    <section className="py-32 border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
            Market Trends
          </h2>
          <p className="text-muted-foreground max-w-sm text-sm">
            Real delayed market data for educational simulation purposes only.
          </p>
        </motion.div>

        {/* Market and Range Selectors */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex gap-2 border border-white/5 bg-white/[0.02] p-1">
            {MARKET_OPTIONS.map((market) => (
              <button
                key={market.symbol}
                onClick={() => setSelectedMarket(market)}
                className={`px-4 py-2 text-sm transition-all ${
                  selectedMarket.symbol === market.symbol
                    ? "bg-white text-black"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                {market.label}
              </button>
            ))}
          </div>

          <div className="flex gap-2 border border-white/5 bg-white/[0.02] p-1">
            {RANGE_OPTIONS.map((range) => (
              <button
                key={range.value}
                onClick={() => setSelectedRange(range.value)}
                className={`px-4 py-2 text-sm transition-all ${
                  selectedRange === range.value
                    ? "bg-white text-black"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Chart Container */}
        <div className="border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-6 h-6 text-muted-foreground animate-spin" />
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-muted-foreground">{error}</p>
            </div>
          ) : data && chartData.length > 0 ? (
            <>
              {/* Price Info */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-3xl font-mono text-white">
                    {data.currentPrice.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                  <span
                    className={`text-sm font-mono flex items-center gap-1 ${
                      isPositive ? "text-emerald-500/80" : "text-rose-500/80"
                    }`}
                  >
                    {isPositive ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    {isPositive ? "+" : ""}
                    {data.changePercent.toFixed(2)}%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {selectedMarket.label} • {selectedRange.toUpperCase()}
                </p>
              </div>

              {/* Chart */}
              <ChartContainer
                config={{
                  price: {
                    label: "Price",
                    color: isPositive ? "hsl(142, 71%, 45%)" : "hsl(0, 72%, 51%)",
                  },
                }}
                className="h-64 w-full"
              >
                <LineChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255, 255, 255, 0.05)"
                  />
                  <XAxis
                    dataKey="date"
                    stroke="rgba(255, 255, 255, 0.3)"
                    tick={{ fill: "rgba(255, 255, 255, 0.5)", fontSize: 12 }}
                    tickLine={{ stroke: "rgba(255, 255, 255, 0.1)" }}
                  />
                  <YAxis
                    stroke="rgba(255, 255, 255, 0.3)"
                    tick={{ fill: "rgba(255, 255, 255, 0.5)", fontSize: 12 }}
                    tickLine={{ stroke: "rgba(255, 255, 255, 0.1)" }}
                    tickFormatter={(value) => value.toLocaleString()}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value: any) => [
                          value.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }),
                          "Price",
                        ]}
                      />
                    }
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke={
                      isPositive
                        ? "hsl(142, 71%, 45%)"
                        : "hsl(0, 72%, 51%)"
                    }
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                </LineChart>
              </ChartContainer>
            </>
          ) : null}
        </div>

        {/* Legal Disclaimer */}
        <p className="mt-6 text-[10px] text-white/20 text-center uppercase tracking-widest">
          Market data shown is delayed and for educational simulation purposes only. No real money trading.
        </p>
      </div>
    </section>
  );
}
