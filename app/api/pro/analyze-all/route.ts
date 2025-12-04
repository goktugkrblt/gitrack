import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Octokit } from "@octokit/rest";
import { CacheService, CacheKeys } from "@/lib/cache";
import { analyzeAllPro } from "@/lib/pro/analyze-all";

export async function GET() {
  try {
    const session = await auth();

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.plan !== "PRO") {
      return NextResponse.json({ error: "PRO plan required" }, { status: 403 });
    }

    if (!user.githubToken || !user.githubUsername) {
      return NextResponse.json({ error: "GitHub account not connected" }, { status: 404 });
    }

    const username = user.githubUsername;
    const cacheKey = CacheKeys.proAnalysis(username);

    // 🔥 CHECK CACHE
    const cached = CacheService.get(cacheKey);
    if (cached) {
      console.log(`✅ Cache HIT for PRO analysis: ${username}`);
      return NextResponse.json({
        success: true,
        data: cached,
      });
    }

    // Cache miss - analyze everything
    console.log(`🔍 Cache MISS, running full PRO analysis for: ${username}`);
    
    const octokit = new Octokit({
      auth: user.githubToken,
    });

    const analysis = await analyzeAllPro(octokit, username);

    // ✅ CACHE ALL RESULTS
    CacheService.set(cacheKey, analysis);
    console.log(`💾 Full PRO analysis cached for: ${username}`);

    return NextResponse.json({
      success: true,
      data: analysis,
    });
  } catch (error) {
    console.error("PRO analysis error:", error);
    return NextResponse.json({ 
      error: "Failed to complete PRO analysis",
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}