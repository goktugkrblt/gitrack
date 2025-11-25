"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, Code2, Sparkles, Zap, Crown } from "lucide-react";
import { motion } from "framer-motion";

export default function PricingPage() {
  const plans = [
    {
      name: "FREE",
      price: "0",
      description: "Perfect for trying out",
      features: [
        "1 GitHub analysis",
        "Basic developer score",
        "Public profile view",
        "Community support",
      ],
      cta: "GET STARTED",
      highlighted: false,
      icon: Sparkles,
    },
    {
      name: "PRO",
      price: "19",
      description: "For serious developers",
      features: [
        "Unlimited GitHub scans",
        "Advanced analytics",
        "Percentile ranking",
        "Private profile option",
        "PDF export",
        "Priority support",
      ],
      cta: "UPGRADE TO PRO",
      highlighted: true,
      icon: Zap,
      badge: "MOST POPULAR",
    },
    {
      name: "PREMIUM",
      price: "49",
      description: "Coming soon",
      features: [
        "Everything in Pro",
        "AI-powered insights",
        "Career roadmap generator",
        "Market value estimation",
        "Resume builder",
        "Interview prep tools",
      ],
      cta: "COMING SOON",
      highlighted: false,
      icon: Crown,
      badge: "COMING SOON",
      disabled: true,
    },
  ];

  return (
    <div className="min-h-screen bg-[#1f1f1f] relative overflow-hidden">
      {/* Fixed Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #919191 1px, transparent 1px),
              linear-gradient(to bottom, #919191 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,transparent_0%,#1f1f1f_100%)]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 border-b border-[#2a2a2a] bg-[#1f1f1f]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-[#252525] border border-[#2a2a2a] flex items-center justify-center group-hover:border-[#333] transition-colors duration-300">
                <Code2 className="h-5 w-5 text-[#919191] group-hover:text-[#b0b0b0] transition-colors duration-300" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-[#e0e0e0] tracking-tighter">GITTRACK</span>
                <span className="text-xl font-black text-[#666]">.ME</span>
              </div>
            </Link>

            <Link href="/login">
              <Button size="sm" className="bg-[#e0e0e0] text-[#1f1f1f] hover:bg-[#d0d0d0] px-6 py-5 text-sm font-bold rounded-xl transition-colors duration-300">
                SIGN IN
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#2a2a2a] bg-[#252525] text-xs text-[#666] font-mono tracking-wider mb-8">
            <Sparkles className="h-3 w-3" />
            TRANSPARENT PRICING
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-[#e0e0e0] tracking-tighter mb-6">
            CHOOSE YOUR PLAN
          </h1>
          <p className="text-xl text-[#919191] font-light max-w-2xl mx-auto">
            Start free, upgrade when you're ready. No hidden fees.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`relative group ${plan.highlighted ? 'md:-mt-4' : ''}`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <span className="inline-block px-4 py-1 text-xs font-bold font-mono bg-[#e0e0e0] text-[#1f1f1f] rounded-full">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className={`relative bg-[#252525] border rounded-3xl p-8 h-full transition-all duration-300 ${
                plan.highlighted 
                  ? 'border-[#e0e0e0] shadow-[0_0_50px_rgba(224,224,224,0.1)]' 
                  : 'border-[#2a2a2a] hover:border-[#333]'
              }`}>
                <div className="text-center mb-8">
                  <div className={`inline-flex w-16 h-16 rounded-2xl items-center justify-center mb-6 ${
                    plan.highlighted ? 'bg-[#e0e0e0]' : 'bg-[#2a2a2a]'
                  }`}>
                    <plan.icon className={`h-8 w-8 ${
                      plan.highlighted ? 'text-[#1f1f1f]' : 'text-[#919191]'
                    }`} />
                  </div>
                  <h3 className="text-2xl font-black text-[#e0e0e0] tracking-tighter mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-[#919191] font-light mb-6">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-black text-[#e0e0e0] tracking-tighter">
                      ${plan.price}
                    </span>
                    {plan.price !== "0" && (
                      <span className="text-[#666] font-mono text-sm">/month</span>
                    )}
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-[#919191] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-[#919191] font-light">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full py-6 text-base font-bold rounded-2xl transition-all duration-300 ${
                    plan.highlighted
                      ? 'bg-[#e0e0e0] text-[#1f1f1f] hover:bg-[#d0d0d0]'
                      : 'bg-[#2a2a2a] text-[#e0e0e0] hover:bg-[#333] border border-[#333]'
                  }`}
                  disabled={plan.disabled}
                >
                  {plan.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-black text-[#e0e0e0] tracking-tighter text-center mb-12">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Can I upgrade or downgrade my plan?",
                a: "Yes, you can change your plan at any time. Upgrades take effect immediately, and downgrades apply at the end of your billing cycle."
              },
              {
                q: "Is my GitHub data safe?",
                a: "Absolutely. We only read public repository data and never store your GitHub credentials. All data is encrypted and secure."
              },
              {
                q: "What's your refund policy?",
                a: "We offer a 14-day money-back guarantee on all paid plans. No questions asked."
              }
            ].map((faq, i) => (
              <div key={i} className="bg-[#252525] border border-[#2a2a2a] rounded-2xl p-6 hover:border-[#333] transition-colors duration-300">
                <h3 className="text-lg font-bold text-[#e0e0e0] mb-2">
                  {faq.q}
                </h3>
                <p className="text-[#919191] font-light">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}