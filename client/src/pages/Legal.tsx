import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AlertTriangle } from "lucide-react";

export default function Legal() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navigation />
      <main className="pt-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-medium tracking-tight mb-2">Legal & Disclaimer</h1>
            <p className="text-muted-foreground">Important information about our platform.</p>
          </div>

          {/* Disclaimer Alert */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-yellow-500/30 bg-yellow-500/10 p-6 mb-12 backdrop-blur-sm"
          >
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-yellow-500/80 flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="text-lg font-medium mb-2 text-yellow-500/80">Important Disclaimer</h2>
                <p className="text-sm leading-relaxed">
                  This platform is a financial market simulation using virtual credits only. 
                  No real money trading, deposits, or withdrawals are supported. 
                  All credits are virtual and have no monetary value.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Content Sections */}
          <div className="space-y-12">
            {/* Platform Description */}
            <section>
              <h2 className="text-2xl font-medium mb-4">Platform Description</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  MarketPlay (working name) is an educational fantasy/simulation platform designed 
                  to help users understand how global financial markets behave through risk-free, 
                  algorithm-driven simulation using free virtual credits.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  This platform is not a financial services provider, does not facilitate real money 
                  trading, and is not subject to financial regulations governing trading platforms.
                </p>
              </div>
            </section>

            {/* No Real Money Policy */}
            <section>
              <h2 className="text-2xl font-medium mb-4">No Real Money Policy</h2>
              <div className="space-y-3 text-muted-foreground">
                <p className="leading-relaxed">
                  <strong className="text-white">No Deposits:</strong> Users cannot deposit real money into the platform.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-white">No Withdrawals:</strong> Virtual credits cannot be converted to real money or withdrawn.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-white">No Purchases:</strong> Virtual credits cannot be purchased with real money.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-white">No Transfers:</strong> Virtual credits cannot be transferred between users.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-white">No Monetary Value:</strong> Virtual credits have no cash value and exist solely for simulation purposes.
                </p>
              </div>
            </section>

            {/* Virtual Credits System */}
            <section>
              <h2 className="text-2xl font-medium mb-4">Virtual Credits System</h2>
              <div className="space-y-3 text-muted-foreground">
                <p className="leading-relaxed">
                  Every user receives free virtual credits upon signup (e.g., 1,000,000 credits). 
                  These credits are reset per contest/session and serve only to track simulation allocations.
                </p>
                <p className="leading-relaxed">
                  The wallet system is a score container only, used to calculate performance rankings. 
                  It does not represent real money or financial instruments.
                </p>
              </div>
            </section>

            {/* Educational Purpose */}
            <section>
              <h2 className="text-2xl font-medium mb-4">Educational Purpose</h2>
              <p className="text-muted-foreground leading-relaxed">
                This platform is designed for educational purposes to help users:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4 ml-4">
                <li>Understand market mechanics and behavior</li>
                <li>Learn about different asset classes</li>
                <li>Practice decision-making in a risk-free environment</li>
                <li>Improve financial literacy</li>
              </ul>
            </section>

            {/* Rankings and Rewards */}
            <section>
              <h2 className="text-2xl font-medium mb-4">Rankings and Rewards</h2>
              <div className="space-y-3 text-muted-foreground">
                <p className="leading-relaxed">
                  Rankings are based on simulated performance metrics including price movement percentage, 
                  allocation weight, and accuracy over time. Rankings are skill-oriented and do not 
                  represent financial gains or losses.
                </p>
                <p className="leading-relaxed">
                  Rewards may include badges, titles, leaderboard highlights, and merchandise eligibility 
                  for top ranks. No cash prizes, giftable wallet value, or financial instruments are awarded.
                </p>
              </div>
            </section>

            {/* No Gambling */}
            <section>
              <h2 className="text-2xl font-medium mb-4">Not Gambling</h2>
              <p className="text-muted-foreground leading-relaxed">
                This platform is not a gambling service. No real money is wagered, no financial risk 
                is involved, and no monetary prizes are awarded. The platform is a learning tool 
                disguised as a game, designed to educate users about financial markets.
              </p>
            </section>

            {/* Privacy */}
            <section>
              <h2 className="text-2xl font-medium mb-4">Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We collect minimal user data necessary for platform functionality. No KYC (Know Your Customer) 
                verification is required. User data is used solely for platform operations and is not 
                sold to third parties.
              </p>
            </section>

            {/* Terms of Service */}
            <section>
              <h2 className="text-2xl font-medium mb-4">Terms of Service</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                By using this platform, you agree that:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>You understand this is a simulation platform with no real money involved</li>
                <li>Virtual credits have no monetary value</li>
                <li>You will not attempt to convert virtual credits to real money</li>
                <li>You will not use the platform for any illegal purposes</li>
                <li>You understand rankings are for educational purposes only</li>
              </ul>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-medium mb-4">Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about these terms or the platform, please contact support through 
                the platform's contact form.
              </p>
            </section>

            {/* Last Updated */}
            <section className="pt-8 border-t border-white/5">
              <p className="text-xs text-muted-foreground">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
