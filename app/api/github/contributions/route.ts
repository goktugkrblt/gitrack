import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { githubUsername: true, githubToken: true }
    });

    if (!user?.githubUsername || !user?.githubToken) {
      return NextResponse.json({ error: 'GitHub data not found' }, { status: 404 });
    }

    const query = `
      query($username: String!) {
        user(login: $username) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                  weekday
                }
              }
            }
          }
        }
      }
    `;

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${user.githubToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { username: user.githubUsername }
      })
    });

    const data = await response.json();
    
    if (data.errors) {
      console.error('GitHub API Error:', data.errors);
      return NextResponse.json({ error: 'GitHub API error' }, { status: 500 });
    }

    return NextResponse.json({
      contributions: data.data.user.contributionsCollection.contributionCalendar
    });

  } catch (error) {
    console.error('Contribution fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch contributions' }, { status: 500 });
  }
}
