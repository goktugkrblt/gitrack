import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const allProfiles = await prisma.profile.findMany({
      select: {
        totalRepos: true,
        totalStars: true,
        totalCommits: true,
        totalPRs: true,
        followersCount: true,
        currentStreak: true,
      },
    });

    if (allProfiles.length === 0) {
      return NextResponse.json({ error: "No profiles found" }, { status: 404 });
    }

    const totalUsers = allProfiles.length;
    
    const averages = {
      repositories: Math.round(allProfiles.reduce((sum, p) => sum + (p.totalRepos || 0), 0) / totalUsers),
      stars: Math.round(allProfiles.reduce((sum, p) => sum + (p.totalStars || 0), 0) / totalUsers),
      commits: Math.round(allProfiles.reduce((sum, p) => sum + (p.totalCommits || 0), 0) / totalUsers),
      pullRequests: Math.round(allProfiles.reduce((sum, p) => sum + (p.totalPRs || 0), 0) / totalUsers),
      followers: Math.round(allProfiles.reduce((sum, p) => sum + (p.followersCount || 0), 0) / totalUsers),
      streak: Math.round(allProfiles.reduce((sum, p) => sum + (p.currentStreak || 0), 0) / totalUsers),
    };

    const top10Count = Math.max(1, Math.ceil(totalUsers * 0.1));
    
    const top10Averages = {
      repositories: Math.round([...allProfiles].sort((a, b) => (b.totalRepos || 0) - (a.totalRepos || 0)).slice(0, top10Count).reduce((sum, p) => sum + (p.totalRepos || 0), 0) / top10Count),
      stars: Math.round([...allProfiles].sort((a, b) => (b.totalStars || 0) - (a.totalStars || 0)).slice(0, top10Count).reduce((sum, p) => sum + (p.totalStars || 0), 0) / top10Count),
      commits: Math.round([...allProfiles].sort((a, b) => (b.totalCommits || 0) - (a.totalCommits || 0)).slice(0, top10Count).reduce((sum, p) => sum + (p.totalCommits || 0), 0) / top10Count),
      pullRequests: Math.round([...allProfiles].sort((a, b) => (b.totalPRs || 0) - (a.totalPRs || 0)).slice(0, top10Count).reduce((sum, p) => sum + (p.totalPRs || 0), 0) / top10Count),
      followers: Math.round([...allProfiles].sort((a, b) => (b.followersCount || 0) - (a.followersCount || 0)).slice(0, top10Count).reduce((sum, p) => sum + (p.followersCount || 0), 0) / top10Count),
      streak: Math.round([...allProfiles].sort((a, b) => (b.currentStreak || 0) - (a.currentStreak || 0)).slice(0, top10Count).reduce((sum, p) => sum + (p.currentStreak || 0), 0) / top10Count),
    };

    const maxValues = {
      repositories: Math.max(...allProfiles.map(p => p.totalRepos || 0), 1),
      stars: Math.max(...allProfiles.map(p => p.totalStars || 0), 1),
      commits: Math.max(...allProfiles.map(p => p.totalCommits || 0), 1),
      pullRequests: Math.max(...allProfiles.map(p => p.totalPRs || 0), 1),
      followers: Math.max(...allProfiles.map(p => p.followersCount || 0), 1),
      streak: Math.max(...allProfiles.map(p => p.currentStreak || 0), 1),
    };

    return NextResponse.json({
      average: averages,
      top10: top10Averages,
      maxValues,
      totalUsers,
      normalized: {
        average: {
          repositories: Math.min(100, Math.round((averages.repositories / maxValues.repositories) * 100)),
          stars: Math.min(100, Math.round((averages.stars / maxValues.stars) * 100)),
          commits: Math.min(100, Math.round((averages.commits / maxValues.commits) * 100)),
          pullRequests: Math.min(100, Math.round((averages.pullRequests / maxValues.pullRequests) * 100)),
          followers: Math.min(100, Math.round((averages.followers / maxValues.followers) * 100)),
          streak: Math.min(100, Math.round((averages.streak / maxValues.streak) * 100)),
        },
        top10: {
          repositories: Math.min(100, Math.round((top10Averages.repositories / maxValues.repositories) * 100)),
          stars: Math.min(100, Math.round((top10Averages.stars / maxValues.stars) * 100)),
          commits: Math.min(100, Math.round((top10Averages.commits / maxValues.commits) * 100)),
          pullRequests: Math.min(100, Math.round((top10Averages.pullRequests / maxValues.pullRequests) * 100)),
          followers: Math.min(100, Math.round((top10Averages.followers / maxValues.followers) * 100)),
          streak: Math.min(100, Math.round((top10Averages.streak / maxValues.streak) * 100)),
        },
      },
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json({ error: "Failed to get stats" }, { status: 500 });
  }
}
