import { NextResponse } from "next/server";
import { auth } from "@/auth"; // ✅ Doğru import
import { prisma } from "@/lib/prisma";
import { GitHubService } from "@/lib/github";
import { CacheService, CacheKeys } from "@/lib/cache";

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
    const cacheKey = CacheKeys.devPatterns(username); // ✅ Dev Patterns Key

    // 🔥 CHECK CACHE
    const cached = CacheService.get(cacheKey);
    if (cached) {
      console.log(`✅ Cache HIT for dev patterns: ${username}`);
      return NextResponse.json({
        success: true,
        data: { devPatterns: cached },
      });
    }

    // Cache miss - analyze
    console.log(`🔍 Cache MISS, analyzing dev patterns for: ${username}`);
    const githubService = new GitHubService(user.githubToken);
    const devPatterns = await githubService.analyzeDeveloperPatterns(username);

    // ✅ CACHE'E YAZ
    CacheService.set(cacheKey, devPatterns);
    console.log(`💾 Dev patterns cached for: ${username}`);

    return NextResponse.json({
      success: true,
      data: { devPatterns },
    });
  } catch (error) {
    console.error("Dev patterns analysis error:", error);
    return NextResponse.json({ error: "Failed to analyze developer patterns" }, { status: 500 });
  }
}