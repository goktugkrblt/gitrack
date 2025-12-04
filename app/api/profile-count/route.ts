import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const count = await prisma.profile.count();
    return NextResponse.json({ count });
  } catch (error) {
    console.error('Error fetching profile count:', error);
    return NextResponse.json({ count: 6 });
  }
}