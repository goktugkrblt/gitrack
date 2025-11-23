"use client";

import { useState, useEffect } from "react";
import { StatsCard } from "@/components/dashboard/stats-card";
import { ScoreDisplay } from "@/components/dashboard/score-display";
import { Star, GitFork, Package, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageChart } from "@/components/dashboard/language-chart";
import { TopRepos } from "@/components/dashboard/top-repos";

export default function DashboardPage() {
  const [hasProfile, setHasProfile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/profile");
      const data = await res.json();
      if (data.profile) {
        setProfileData(data.profile);
        setHasProfile(true);
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    } finally {
      setInitialLoading(false);
    }
  };

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/github/analyze", {
        method: "POST",
      });
      const data = await res.json();
      
      if (data.success) {
        await fetchProfile();
      } else {
        alert(data.error || "Analysis failed");
      }
    } catch (error) {
      console.error("Analysis failed:", error);
      alert("Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  const displayData = profileData || {
    score: 0,
    percentile: 0,
    totalRepos: 0,
    totalStars: 0,
    totalForks: 0,
    languages: {},
    topRepos: [],
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">
            Welcome back! Here's your GitHub profile overview.
          </p>
        </div>
      </div>

      {!hasProfile ? (
        <div className="bg-gray-900 rounded-lg p-12 border border-gray-800 text-center">
          <div className="max-w-md mx-auto space-y-4">
            <TrendingUp className="h-16 w-16 text-blue-500 mx-auto" />
            <h2 className="text-2xl font-bold text-white">
              Analyze Your GitHub Profile
            </h2>
            <p className="text-gray-400">
              Get insights into your coding activity, discover your strengths,
              and see how you compare to other developers.
            </p>
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleAnalyze}
              disabled={loading}
            >
              {loading ? "Analyzing..." : "Start Analysis"}
            </Button>
            <p className="text-xs text-gray-500">
              ✨ Free analysis • No credit card required
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <ScoreDisplay
                score={displayData.score}
                percentile={displayData.percentile}
              />
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <StatsCard
                title="Total Repositories"
                value={displayData.totalRepos}
                icon={Package}
                description="Public repositories"
              />
              <StatsCard
                title="Total Stars"
                value={displayData.totalStars}
                icon={Star}
                description="Stars received"
              />
              <StatsCard
                title="Total Forks"
                value={displayData.totalForks}
                icon={GitFork}
                description="Repository forks"
              />
              <StatsCard
                title="Profile Score"
                value={displayData.score.toFixed(1)}
                icon={TrendingUp}
                description="Out of 10.0"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LanguageChart languages={displayData.languages} />
            <TopRepos repos={displayData.topRepos} />
          </div>
        </>
      )}
    </div>
  );
}