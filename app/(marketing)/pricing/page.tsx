import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for trying out GitTrack",
      features: [
        "1 profile analysis",
        "Basic score (1-10)",
        "Top 3 repo breakdown",
        "Language distribution",
        "Public profile link",
      ],
      disabled: [
        "Percentile ranking",
        "Growth roadmap",
        "Re-scan",
        "Weekly reports",
        "Private profile",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$19",
      period: "per month",
      description: "For serious developers",
      features: [
        "Everything in Free",
        "Unlimited re-scans",
        "Percentile ranking",
        "Detailed metrics",
        "Weekly progress tracking",
        "Private profile option",
        "Export to PDF",
        "Priority support",
      ],
      disabled: [],
      cta: "Start Pro Trial",
      popular: true,
    },
    {
      name: "Premium",
      price: "$49",
      period: "per month",
      description: "For career acceleration",
      features: [
        "Everything in Pro",
        "AI Career Coach",
        "Project suggestions",
        "Resume generator",
        "Interview preparation",
        "LinkedIn optimization",
        "Networking insights",
        "Early access to features",
      ],
      disabled: [],
      cta: "Coming Soon",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <Link
            href="/"
            className="text-gray-400 hover:text-white mb-8 inline-block"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-400">
            Choose the plan that fits your needs. Upgrade or downgrade anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border ${
                plan.popular
                  ? "border-blue-500 bg-gray-800/50"
                  : "border-gray-800 bg-gray-900/50"
              } p-8`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-400 ml-2">/{plan.period}</span>
                </div>
                <p className="text-gray-400">{plan.description}</p>
              </div>

              <Link href="/login" className="block mb-6">
                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                  disabled={plan.cta === "Coming Soon"}
                >
                  {plan.cta}
                </Button>
              </Link>

              <div className="space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
                {plan.disabled.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 opacity-40">
                    <Check className="h-5 w-5 text-gray-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-500 line-through">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-24 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-2">
                Can I upgrade or downgrade anytime?
              </h3>
              <p className="text-gray-400">
                Yes! You can change your plan at any time. Changes take effect
                immediately.
              </p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-2">
                Is my GitHub data safe?
              </h3>
              <p className="text-gray-400">
                Absolutely. We only access public repository data and never
                store sensitive information.
              </p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-2">
                Do you offer refunds?
              </h3>
              <p className="text-gray-400">
                Yes, we offer a 14-day money-back guarantee for all paid plans.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}