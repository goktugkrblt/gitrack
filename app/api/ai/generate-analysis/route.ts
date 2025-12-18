import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { generateAIAnalysis } from "@/lib/pro/generate-ai-analysis";

export async function GET(req: Request) {
  try {
    console.log('🤖 AI Analysis API called');
    
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        profiles: {
          orderBy: { scannedAt: 'desc' },
          take: 1,
        }
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // ✅ DEV MODE: Allow in development, require PRO in production
    const isDev = process.env.NODE_ENV === 'development';
    const hasPRO = user.plan === 'PRO' || isDev;
    
    if (!hasPRO) {
      console.log('❌ PRO plan required (user plan:', user.plan, ')');
      return NextResponse.json({ error: 'PRO plan required' }, { status: 403 });
    }

    console.log('✅ Access granted:', isDev ? 'DEV MODE' : 'PRO USER');

    const profile = user.profiles[0];
    
    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    // Check if PRO analysis cache exists
    if (!profile.codeQualityCache) {
      return NextResponse.json({ 
        error: 'PRO analysis required. Please run PRO analysis first.' 
      }, { status: 400 });
    }

    // Parse PRO analysis data
    const proData = typeof profile.codeQualityCache === 'string'
      ? JSON.parse(profile.codeQualityCache)
      : profile.codeQualityCache;

    console.log('🎯 Generating AI analysis for:', user.githubUsername);

    // Generate AI analysis
    const analysis = await generateAIAnalysis(user.githubUsername, proData);

    console.log('✅ AI analysis generated successfully');

    return NextResponse.json({
      success: true,
      data: {
        analysis,
        generatedAt: Date.now(),
        cached: false,
      }
    });

  } catch (error: any) {
    console.error('❌ AI Analysis API error:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Failed to generate analysis',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}