import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    console.log('🔍 Profile API called');
    
    const session = await auth();
    
    if (!session?.user?.email) {
      console.log('❌ No session found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        profiles: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const profile = user.profiles[0];

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    // ✅ Score DB'den gelir, hesaplama YOK!
    console.log('📊 Score from DB:', profile.score);

    // Parse cached PRO data
    const analysisData = profile.codeQualityCache 
      ? (typeof profile.codeQualityCache === 'string' 
          ? JSON.parse(profile.codeQualityCache) 
          : profile.codeQualityCache)
      : null;

    const response = {
      user: {
        id: user.id,
        email: user.email,
        plan: user.plan,
      },
      profile: {
        ...profile,
        codeQualityCache: analysisData,
        scoringMethod: analysisData ? 'pro' : 'fallback',
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('❌ Profile API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}