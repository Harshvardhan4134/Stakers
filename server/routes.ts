import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

// Yahoo Finance symbol mapping
const SYMBOL_MAP: Record<string, string> = {
  'SPX': '^GSPC',
  'IXIC': '^IXIC',
  'DJI': '^DJI',
  'BTCUSD': 'BTC-USD',
  'ETHUSD': 'ETH-USD',
  'SOLUSD': 'SOL-USD',
  'XAUUSD': 'GC=F',
  'XAGUSD': 'SI=F',
  'WTI': 'CL=F',
  'EURUSD': 'EURUSD=X',
  'GBPUSD': 'GBPUSD=X',
  'USDJPY': 'JPY=X',
  'USDINR': 'INR=X',
  'AAPL': 'AAPL',
  'MSFT': 'MSFT',
  'AMZN': 'AMZN',
  'TSLA': 'TSLA',
};

const RANGE_TO_INTERVAL: Record<string, string> = {
  '7d': '1d',
  '1mo': '1d',
  '3mo': '1d',
  '6mo': '1wk',
  '1y': '1wk',
};

// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post(api.subscribers.create.path, async (req, res) => {
    try {
      const input = api.subscribers.create.input.parse(req.body);
      const subscriber = await storage.createSubscriber(input);
      res.status(201).json(subscriber);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Market data endpoint (for local development)
  app.get('/api/market', async (req, res) => {
    try {
      const { symbol, range = '7d' } = req.query;

      if (!symbol || typeof symbol !== 'string') {
        return res.status(400).json({ error: 'Symbol parameter is required' });
      }

      // Check cache
      const cacheKey = `${symbol}-${range}`;
      const cached = cache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return res.json(cached.data);
      }

      // Map symbol to Yahoo Finance symbol
      const yahooSymbol = SYMBOL_MAP[symbol.toUpperCase()] || symbol.toUpperCase();
      const interval = RANGE_TO_INTERVAL[range] || '1d';

      // Calculate period
      let period1 = Math.floor(Date.now() / 1000);
      let period2 = period1;
      
      if (range === '7d') {
        period1 = period2 - (7 * 24 * 60 * 60);
      } else if (range === '1mo') {
        period1 = period2 - (30 * 24 * 60 * 60);
      } else if (range === '3mo') {
        period1 = period2 - (90 * 24 * 60 * 60);
      }

      // Fetch from Yahoo Finance
      const url = `https://query1.finance.yahoo.com/v8/finance/chart/${yahooSymbol}?period1=${period1}&period2=${period2}&interval=${interval}`;
      
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      });

      if (!response.ok) {
        throw new Error(`Yahoo Finance API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.chart || !data.chart.result || data.chart.result.length === 0) {
        return res.status(404).json({ error: 'No data found for symbol' });
      }

      const result = data.chart.result[0];
      const timestamps = result.timestamp || [];
      const closes = result.indicators?.quote?.[0]?.close || [];

      // Filter out null values
      const dates: string[] = [];
      const prices: number[] = [];

      for (let i = 0; i < timestamps.length; i++) {
        if (closes[i] !== null && closes[i] !== undefined) {
          dates.push(new Date(timestamps[i] * 1000).toISOString());
          prices.push(closes[i]);
        }
      }

      const responseData = {
        symbol: yahooSymbol,
        dates,
        prices,
        currentPrice: prices[prices.length - 1],
        previousPrice: prices[0],
        change: prices[prices.length - 1] - prices[0],
        changePercent: ((prices[prices.length - 1] - prices[0]) / prices[0]) * 100,
      };

      // Cache the result
      cache.set(cacheKey, {
        data: responseData,
        timestamp: Date.now(),
      });

      return res.json(responseData);
    } catch (error: any) {
      console.error('Market data fetch error:', error);
      return res.status(500).json({ 
        error: 'Failed to fetch market data',
        message: error.message 
      });
    }
  });

  return httpServer;
}
