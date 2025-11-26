"use client";

import { Calendar, TrendingUp, Zap, BarChart3 } from "lucide-react";
import { ActivityHeatmap } from "./activity-heatmap";

interface ActivityTabProps {
  profileData: any;
}

export function ActivityTab({ profileData }: ActivityTabProps) {
  if (!profileData) {
    return (
      <div className="bg-[#252525] rounded-xl border border-[#2a2a2a] p-8 text-center">
        <BarChart3 className="w-12 h-12 text-[#666] mx-auto mb-4" />
        <h3 className="text-xl font-bold text-[#e0e0e0] mb-2">No Activity Data</h3>
        <p className="text-[#666] text-sm">Please analyze your profile first</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-black text-[#e0e0e0] tracking-tighter mb-2">
          Your Activity
        </h2>
        <p className="text-[#666]">
          Track your coding patterns and consistency
        </p>
      </div>

      {/* Activity Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-[#252525] border border-[#2a2a2a] rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-[#666] tracking-wider">MOST ACTIVE</h3>
              <Calendar className="h-4 w-4 text-[#666]" />
            </div>
            <p className="text-2xl font-black text-[#e0e0e0] mb-1">{profileData.mostActiveDay || "N/A"}</p>
            <p className="text-xs text-[#666]">Day of the week</p>
          </div>

          <div className="bg-[#252525] border border-[#2a2a2a] rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-[#666] tracking-wider">WEEKEND ACTIVITY</h3>
              <Calendar className="h-4 w-4 text-[#666]" />
            </div>
            <p className="text-2xl font-black text-[#e0e0e0] mb-1">{profileData.weekendActivity || 0}%</p>
            <p className="text-xs text-[#666]">Weekend commits</p>
          </div>

          <div className="bg-[#252525] border border-[#2a2a2a] rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-[#666] tracking-wider">DAILY AVERAGE</h3>
              <TrendingUp className="h-4 w-4 text-[#666]" />
            </div>
            <p className="text-2xl font-black text-[#e0e0e0] mb-1">{profileData.averageCommitsPerDay || 0}</p>
            <p className="text-xs text-[#666]">Commits per day</p>
          </div>

          <div className="bg-[#252525] border border-[#2a2a2a] rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-[#666] tracking-wider">CONSISTENCY</h3>
              <Zap className="h-4 w-4 text-[#666]" />
            </div>
            <p className="text-2xl font-black text-[#e0e0e0] mb-1">
              {profileData.currentStreak || 0}/{profileData.longestStreak || 0}
            </p>
            <p className="text-xs text-[#666]">Current/longest streak</p>
          </div>

          {/* YENİ KART 1: Total Contributions */}
          <div className="bg-[#252525] border border-[#2a2a2a] rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-[#666] tracking-wider">CONTRIBUTIONS</h3>
              <BarChart3 className="h-4 w-4 text-[#666]" />
            </div>
            <p className="text-2xl font-black text-[#e0e0e0] mb-1">{profileData.totalContributions || 0}</p>
            <p className="text-xs text-[#666]">This year</p>
          </div>

          {/* YENİ KART 2: Account Age */}
          <div className="bg-[#252525] border border-[#2a2a2a] rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-[#666] tracking-wider">ACCOUNT AGE</h3>
              <Calendar className="h-4 w-4 text-[#666]" />
            </div>
            <p className="text-2xl font-black text-[#e0e0e0] mb-1">{profileData.accountAge || 0} years</p>
            <p className="text-xs text-[#666]">On GitHub</p>
          </div>
        </div>

      {/* Heatmap */}
      <ActivityHeatmap />
    </div>
  );
}
