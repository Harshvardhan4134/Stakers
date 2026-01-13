import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const steps = [
  {
    title: "Virtual Credits Explained",
    content: "You'll receive 1,000,000 free virtual credits to start. These credits have no monetary value and cannot be purchased, transferred, or withdrawn.",
  },
  {
    title: "No Real Money",
    content: "This is a pure simulation. No deposits, no withdrawals, no financial risk. Everything is virtual and educational.",
  },
  {
    title: "How Ranking Works",
    content: "Your performance is measured by how well you allocate credits across markets. Better decisions = higher rank. No money is won or lost.",
  },
  {
    title: "Markets Overview",
    content: "Trade stocks, indices, crypto, commodities, and forex. All with real-time data but zero financial risk.",
  },
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [, setLocation] = useLocation();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setLocation("/dashboard");
    }
  };

  const handleSkip = () => {
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-2xl">
          {/* Progress bar */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs text-muted-foreground font-mono">
                Step {currentStep + 1} of {steps.length}
              </span>
              <button
                onClick={handleSkip}
                className="text-xs text-muted-foreground hover:text-white transition-colors"
              >
                Skip
              </button>
            </div>
            <div className="h-[1px] bg-white/10 relative">
              <motion.div
                className="absolute top-0 left-0 h-full bg-white"
                initial={{ width: "0%" }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Content */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="border border-white/5 bg-white/[0.02] p-12 backdrop-blur-sm"
          >
            <div className="mb-8">
              <h1 className="text-4xl font-medium tracking-tight mb-4">
                {steps[currentStep].title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {steps[currentStep].content}
              </p>
            </div>

            {/* Step indicators */}
            <div className="flex gap-2 mb-8">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 transition-colors ${
                    i <= currentStep ? "bg-white" : "bg-white/10"
                  }`}
                />
              ))}
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center">
              <Button
                variant="ghost"
                onClick={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
                disabled={currentStep === 0}
                className="text-muted-foreground"
              >
                Back
              </Button>
              
              <Button
                onClick={handleNext}
                className="bg-white text-black hover:bg-white/90 h-12 px-8 font-medium"
              >
                {currentStep < steps.length - 1 ? (
                  <>
                    Next <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  <>
                    Get Started <Check className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </motion.div>

          {/* Disclaimer */}
          <p className="mt-8 text-[10px] text-white/20 text-center uppercase tracking-widest">
            This is a simulation. No real money is involved. Virtual credits have no cash value.
          </p>
        </div>
      </main>
    </div>
  );
}
