// Vercel serverless function for API routes
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // API routes will be handled here
  // For now, return a simple response
  res.json({ message: 'API endpoint', path: req.url });
}
