"use client";

import { 
  Code, TrendingUp, Target, Clock, GitBranch, FileCode, 
  Lock, Sparkles, ArrowRight, Activity, Shield, BarChart3,
  GitCommit, FolderGit, CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProTabProps {
  isPro?: boolean;
}

export function ProTab({ isPro = false }: ProTabProps) {
  // Free user görünümü (teaser)
  if (!isPro) {
    return (
      <div className="space-y-8">
        {/* Hero */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-bold text-purple-400">UNLOCK PREMIUM</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-[#e0e0e0] tracking-tighter">
            Deep Insights From
            <br />
            Your GitHub Data
          </h2>
          
          <p className="text-lg text-[#919191] max-w-2xl mx-auto">
            Advanced analytics, code quality metrics, and career insights powered by your GitHub activity
          </p>
        </div>

        {/* Locked Features Preview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Code,
              title: "Code Quality Score",
              description: "README quality, test coverage, CI/CD usage, documentation depth",
              color: "from-blue-500 to-cyan-500",
              badge: "GitHub API"
            },
            {
              icon: Shield,
              title: "Repository Health",
              description: "Maintenance score, issue response time, PR merge rate, security",
              color: "from-green-500 to-emerald-500",
              badge: "GitHub API"
            },
            {
              icon: Activity,
              title: "Developer Patterns",
              description: "Commit patterns by hour, language evolution, productivity peaks",
              color: "from-purple-500 to-pink-500",
              badge: "GitHub API"
            },
            {
              icon: Target,
              title: "Career Insights",
              description: "Experience level, specialization score, consistency rating",
              color: "from-yellow-500 to-orange-500",
              badge: "Analytics"
            },
            {
              icon: GitBranch,
              title: "Advanced Statistics",
              description: "Code churn, commit size analysis, contributor insights",
              color: "from-red-500 to-rose-500",
              badge: "GitHub API"
            },
            {
              icon: TrendingUp,
              title: "Technology Timeline",
              description: "Framework adoption over time, skill progression tracking",
              color: "from-cyan-500 to-blue-500",
              badge: "Analytics"
            }
          ].map((feature, i) => (
            <div
              key={i}
              className="relative bg-[#252525] border border-[#2a2a2a] rounded-xl p-6 overflow-hidden group hover:border-[#3a3a3a] transition-all"
            >
              {/* Blur overlay on hover */}
              <div className="absolute inset-0 backdrop-blur-[2px] bg-[#1f1f1f]/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <div className="text-center space-y-2">
                  <Lock className="w-8 h-8 text-purple-400 mx-auto" />
                  <p className="text-sm font-bold text-purple-400">PRO FEATURE</p>
                </div>
              </div>

              {/* Badge */}
              <div className="absolute top-4 right-4 z-20">
                <span className="text-[10px] font-bold text-purple-400 bg-purple-500/10 px-2 py-1 rounded">
                  {feature.badge}
                </span>
              </div>

              {/* Content */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="font-bold text-[#e0e0e0] mb-2">{feature.title}</h3>
              <p className="text-sm text-[#666] leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Feature Details */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Code Quality Breakdown */}
          <div className="bg-[#252525] border border-[#2a2a2a] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Code className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="font-bold text-[#e0e0e0]">Code Quality Metrics</h3>
            </div>
            <div className="space-y-3">
              {[
                { icon: FileCode, label: "README Quality Score", value: "Based on length, sections, badges" },
                { icon: CheckCircle, label: "Test Coverage Detection", value: "Test files & frameworks" },
                { icon: GitCommit, label: "CI/CD Integration", value: "GitHub Actions analysis" },
                { icon: FolderGit, label: "Documentation Depth", value: "Docs folder, wiki, comments" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-sm">
                  <item.icon className="w-4 h-4 text-[#666] mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="text-[#e0e0e0] font-medium">{item.label}</div>
                    <div className="text-[#666] text-xs">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Repository Health */}
          <div className="bg-[#252525] border border-[#2a2a2a] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="font-bold text-[#e0e0e0]">Repository Health</h3>
            </div>
            <div className="space-y-3">
              {[
                { icon: Activity, label: "Maintenance Score", value: "Commit frequency & recency" },
                { icon: Clock, label: "Issue Response Time", value: "Average time to first response" },
                { icon: GitBranch, label: "PR Merge Rate", value: "Percentage of PRs merged" },
                { icon: Shield, label: "Security Checks", value: "Dependabot, advisories" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-sm">
                  <item.icon className="w-4 h-4 text-[#666] mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="text-[#e0e0e0] font-medium">{item.label}</div>
                    <div className="text-[#666] text-xs">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-[#252525] border border-[#2a2a2a] rounded-xl p-8">
          <h3 className="text-xl font-bold text-[#e0e0e0] mb-6 text-center">
            What You'll Get
          </h3>
          
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 max-w-3xl mx-auto">
            {[
              "Detailed code quality analysis",
              "Repository health monitoring",
              "Developer pattern insights",
              "Career readiness assessment",
              "Commit-by-hour heatmap",
              "Technology evolution timeline",
              "Contribution analytics",
              "Advanced statistics dashboard"
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex-shrink-0" />
                <span className="text-[#919191]">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing CTA */}
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-2 border-purple-500/30 rounded-2xl p-12 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="space-y-2">
              <p className="text-sm text-purple-400 font-bold">EARLY ACCESS PRICING</p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-6xl font-black text-[#e0e0e0]">$9</span>
                <div className="text-left">
                  <div className="text-[#919191]">per month</div>
                  <div className="text-[#666] text-sm">billed monthly</div>
                </div>
              </div>
            </div>

            <p className="text-[#666]">
              🎁 7-day free trial • 💳 No credit card required • ❌ Cancel anytime
            </p>

            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-12 py-6 text-lg font-bold rounded-xl transition-all shadow-lg hover:shadow-xl"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <p className="text-xs text-[#666]">
              All features included • Unlimited analysis • Priority support
            </p>
          </div>
        </div>

        {/* Social Proof */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { metric: "Coming", label: "Soon" },
            { metric: "Beta", label: "Phase" },
            { metric: "Early", label: "Access" }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-black text-[#e0e0e0] mb-1">{stat.metric}</div>
              <div className="text-sm text-[#666]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Pro user görünümü (gerçek içerik)
  return (
    <div className="space-y-8">
      {/* Pro Badge */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-[#e0e0e0] tracking-tighter">
            Premium Analytics
          </h2>
          <p className="text-[#666] mt-1">Deep insights from your GitHub data</p>
        </div>
        <div className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/40">
          <span className="text-sm font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            PRO MEMBER
          </span>
        </div>
      </div>

      {/* Real Pro Content - Code Quality */}
      <div className="bg-[#252525] border border-[#2a2a2a] rounded-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
            <Code className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#e0e0e0]">Code Quality Analysis</h3>
            <p className="text-sm text-[#666]">Based on your repository metrics</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-[#1f1f1f] rounded-lg p-6">
            <div className="text-4xl font-black text-blue-400 mb-2">8.5</div>
            <div className="text-sm text-[#e0e0e0] font-medium mb-1">Overall Score</div>
            <div className="text-xs text-[#666]">Excellent code practices</div>
          </div>
          
          <div className="bg-[#1f1f1f] rounded-lg p-6">
            <div className="text-4xl font-black text-green-400 mb-2">92%</div>
            <div className="text-sm text-[#e0e0e0] font-medium mb-1">Documentation</div>
            <div className="text-xs text-[#666]">Well documented repos</div>
          </div>
          
          <div className="bg-[#1f1f1f] rounded-lg p-6">
            <div className="text-4xl font-black text-purple-400 mb-2">75%</div>
            <div className="text-sm text-[#e0e0e0] font-medium mb-1">Test Coverage</div>
            <div className="text-xs text-[#666]">Good testing habits</div>
          </div>
        </div>
      </div>

      {/* Repository Health */}
      <div className="bg-[#252525] border border-[#2a2a2a] rounded-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#e0e0e0]">Repository Health</h3>
            <p className="text-sm text-[#666]">Maintenance & community metrics</p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-[#666] text-center py-8">
            Detailed health metrics coming soon...
          </p>
        </div>
      </div>

      {/* More sections */}
      <div className="bg-[#252525] border border-[#2a2a2a] rounded-xl p-8 text-center">
        <BarChart3 className="w-12 h-12 text-[#666] mx-auto mb-4" />
        <h3 className="text-lg font-bold text-[#e0e0e0] mb-2">More Features Coming</h3>
        <p className="text-[#666]">Developer patterns, career insights, and advanced analytics</p>
      </div>
    </div>
  );
}