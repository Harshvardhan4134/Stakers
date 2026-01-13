import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function Auth() {
  const [, setLocation] = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication - redirect to dashboard
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navigation />
      <main className="pt-20 min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-medium tracking-tight mb-2">
                {isLogin ? "Welcome back" : "Get started"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {isLogin 
                  ? "Sign in to continue your market journey" 
                  : "Create your account and start simulating"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-white/30 h-12"
                  required
                />
              </div>
              
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-white/30 h-12"
                  required
                />
              </div>

              {!isLogin && (
                <div>
                  <Input
                    type="text"
                    placeholder="Username"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-white/30 h-12"
                  />
                </div>
              )}

              {isLogin && (
                <div className="flex justify-end">
                  <Link href="/forgot-password" className="text-xs text-muted-foreground hover:text-white transition-colors">
                    Forgot password?
                  </Link>
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-12 bg-white text-black hover:bg-white/90 transition-all font-medium"
              >
                {isLogin ? "Sign in" : "Create account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-muted-foreground hover:text-white transition-colors"
              >
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <span className="text-white font-medium">
                  {isLogin ? "Sign up" : "Sign in"}
                </span>
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-white/5">
              <Button
                variant="outline"
                className="w-full h-12 bg-transparent border-white/10 hover:bg-white/5"
                onClick={() => setLocation("/dashboard")}
              >
                Continue with Google
              </Button>
            </div>

            <p className="mt-6 text-[10px] text-white/20 text-center">
              By continuing, you agree to our Terms and Privacy Policy. No real money involved.
            </p>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
