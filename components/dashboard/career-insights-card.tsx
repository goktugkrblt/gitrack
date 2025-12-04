"use client";

import { motion } from "framer-motion";
import { 
  Target, 
  TrendingUp, 
  Code, 
  Users, 
  Zap,
  BookOpen,
  Briefcase,
  Award
} from "lucide-react";

interface CareerInsightsCardProps {
  data: {
    experienceLevel: 'Junior' | 'Mid-Level' | 'Senior' | 'Staff+';
    profileType: string;
    overallScore: number;
    growth: {
      commitTrend: 'improving' | 'stable' | 'declining';
      newLanguages: number;
      communityGrowth: 'improving' | 'stable' | 'declining';
    };
    skills: {
      technicalBreadth: number;
      documentation: number;
      collaboration: number;
      projectManagement: number;
    };
    recommendations: string[];
    portfolioStrength: number;
  };
}

export function CareerInsightsCard({ data }: CareerInsightsCardProps) {
  const getLevelColor = (level: string) => {
    if (level === 'Staff+') return 'from-purple-500 to-pink-500';
    if (level === 'Senior') return 'from-blue-500 to-cyan-500';
    if (level === 'Mid-Level') return 'from-green-500 to-emerald-500';
    return 'from-yellow-500 to-orange-500';
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'improving') return { icon: TrendingUp, color: 'text-green-400' };
    if (trend === 'declining') return { icon: TrendingUp, color: 'text-red-400', rotate: 'rotate-180' };
    return { icon: TrendingUp, color: 'text-yellow-400', rotate: 'rotate-90' };
  };

  const commitTrendIcon = getTrendIcon(data.growth.commitTrend);
  const communityTrendIcon = getTrendIcon(data.growth.communityGrowth);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header Card */}
      <div className="relative overflow-hidden bg-[#252525] border border-[#2a2a2a] rounded-2xl p-8">
        <div className={`absolute inset-0 bg-gradient-to-br ${getLevelColor(data.experienceLevel)} opacity-5`} />
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${getLevelColor(data.experienceLevel)} flex items-center justify-center shadow-lg`}>
                <Target className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl text-left font-black text-[#e0e0e0] mb-1">
                  Career Insights
                </h3>
                <p className="text-sm text-[#666]">
                  Your developer profile and growth trajectory
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="text-4xl font-black text-[#e0e0e0] mb-1">
                {data.overallScore.toFixed(1)}
              </div>
              <div className="text-xs text-[#666]">Career Score</div>
            </div>
          </div>

          {/* Level & Profile */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-[#1f1f1f] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-5 h-5 text-[#666]" />
                <h4 className="font-bold text-[#e0e0e0]">Experience Level</h4>
              </div>
              <div className={`inline-flex px-6 py-3 rounded-full bg-gradient-to-r ${getLevelColor(data.experienceLevel)}`}>
                <span className="text-xl font-black text-white">
                  {data.experienceLevel}
                </span>
              </div>
            </div>

            <div className="bg-[#1f1f1f] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Briefcase className="w-5 h-5 text-[#666]" />
                <h4 className="font-bold text-[#e0e0e0]">Profile Type</h4>
              </div>
              <div className="text-xl font-black text-[#e0e0e0]">
                {data.profileType}
              </div>
            </div>
          </div>

          {/* Growth Metrics */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-[#1f1f1f] rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#666]">Commit Activity</span>
                <commitTrendIcon.icon className={`w-4 h-4 ${commitTrendIcon.color} ${commitTrendIcon.rotate || ''}`} />
              </div>
              <div className={`text-lg font-bold ${commitTrendIcon.color}`}>
                {data.growth.commitTrend.charAt(0).toUpperCase() + data.growth.commitTrend.slice(1)}
              </div>
            </div>

            <div className="bg-[#1f1f1f] rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#666]">New Languages</span>
                <Code className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-lg font-bold text-blue-400">
                +{data.growth.newLanguages} learned
              </div>
            </div>

            <div className="bg-[#1f1f1f] rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#666]">Community</span>
                <communityTrendIcon.icon className={`w-4 h-4 ${communityTrendIcon.color} ${communityTrendIcon.rotate || ''}`} />
              </div>
              <div className={`text-lg font-bold ${communityTrendIcon.color}`}>
                {data.growth.communityGrowth.charAt(0).toUpperCase() + data.growth.communityGrowth.slice(1)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Breakdown */}
      <div className="bg-[#252525] border border-[#2a2a2a] rounded-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <Zap className="w-6 h-6 text-yellow-400" />
          <h3 className="text-2xl font-black text-[#e0e0e0]">Skill Assessment</h3>
        </div>

        <div className="space-y-6">
          {/* Technical Breadth */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-[#666]" />
                <span className="text-sm font-medium text-[#919191]">Technical Breadth</span>
              </div>
              <span className="text-lg font-bold text-[#e0e0e0]">
                {data.skills.technicalBreadth.toFixed(1)}/10
              </span>
            </div>
            <div className="h-3 bg-[#1f1f1f] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-1000"
                style={{ width: `${(data.skills.technicalBreadth / 10) * 100}%` }}
              />
            </div>
          </div>

          {/* Documentation */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#666]" />
                <span className="text-sm font-medium text-[#919191]">Documentation</span>
              </div>
              <span className="text-lg font-bold text-[#e0e0e0]">
                {data.skills.documentation.toFixed(1)}/10
              </span>
            </div>
            <div className="h-3 bg-[#1f1f1f] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-1000"
                style={{ width: `${(data.skills.documentation / 10) * 100}%` }}
              />
            </div>
          </div>

          {/* Collaboration */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#666]" />
                <span className="text-sm font-medium text-[#919191]">Collaboration</span>
              </div>
              <span className="text-lg font-bold text-[#e0e0e0]">
                {data.skills.collaboration.toFixed(1)}/10
              </span>
            </div>
            <div className="h-3 bg-[#1f1f1f] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-1000"
                style={{ width: `${(data.skills.collaboration / 10) * 100}%` }}
              />
            </div>
          </div>

          {/* Project Management */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-[#666]" />
                <span className="text-sm font-medium text-[#919191]">Project Management</span>
              </div>
              <span className="text-lg font-bold text-[#e0e0e0]">
                {data.skills.projectManagement.toFixed(1)}/10
              </span>
            </div>
            <div className="h-3 bg-[#1f1f1f] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-1000"
                style={{ width: `${(data.skills.projectManagement / 10) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Strength & Recommendations */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Portfolio Strength */}
        <div className="bg-[#252525] border border-[#2a2a2a] rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-6 h-6 text-purple-400" />
            <h3 className="text-xl font-black text-[#e0e0e0]">Portfolio Strength</h3>
          </div>

          <div className="text-center mb-6">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="transform -rotate-90 w-32 h-32">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-[#1f1f1f]"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="url(#gradient-portfolio)"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${data.portfolioStrength * 3.51} 351`}
                  className="transition-all duration-1000 ease-out"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="gradient-portfolio" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" className="text-purple-500" stopColor="currentColor" />
                    <stop offset="100%" className="text-pink-500" stopColor="currentColor" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-black text-[#e0e0e0]">{data.portfolioStrength}</span>
              </div>
            </div>
            <p className="text-sm text-[#666]">out of 100</p>
          </div>

          <div className="space-y-2 text-sm text-[#919191]">
            <div className="flex justify-between">
              <span>Diversity</span>
              <span className="text-[#e0e0e0] font-bold">25%</span>
            </div>
            <div className="flex justify-between">
              <span>Consistency</span>
              <span className="text-[#e0e0e0] font-bold">25%</span>
            </div>
            <div className="flex justify-between">
              <span>Impact</span>
              <span className="text-[#e0e0e0] font-bold">25%</span>
            </div>
            <div className="flex justify-between">
              <span>Visibility</span>
              <span className="text-[#e0e0e0] font-bold">25%</span>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-[#252525] border border-[#2a2a2a] rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-black text-[#e0e0e0]">Recommendations</h3>
          </div>

          {data.recommendations.length > 0 ? (
            <ul className="space-y-3">
              {data.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-blue-400">{index + 1}</span>
                  </div>
                  <span className="text-sm text-[#919191] leading-relaxed">{rec}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8 text-[#666]">
              <Award className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">No recommendations - you're doing great!</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}