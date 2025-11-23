import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        profiles: {
          orderBy: { scannedAt: "desc" },
          take: 1,
        },
      },
    });

    if (!user || !user.profiles[0]) {
      return NextResponse.json({ profile: null });
    }

    const profile = user.profiles[0];

    return NextResponse.json({
      profile: {
        score: profile.score,
        percentile: profile.percentile,
        totalRepos: profile.totalRepos,
        totalStars: profile.totalStars,
        totalForks: profile.totalForks,
        languages: profile.languages,
        topRepos: profile.topRepos,
      },
    });
  } catch (error) {
    console.error("Profile fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}