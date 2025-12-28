import { prisma } from '@/lib/prisma';

export const resolvers = {
  Query: {
    /**
     * Get profile by username
     */
    profile: async (_: any, { username }: { username: string }) => {
      try {
        // Check cache first
        const cached = await prisma.profile.findFirst({
          where: { 
            username: username.toLowerCase(),
          },
        });

        // If cached and fresh (< 1 hour), return
        if (cached && isFresh(cached.scannedAt)) {
          return formatProfile(cached);
        }

        // For now, if not cached, return error
        // We'll implement fresh analysis later
        if (!cached) {
          throw new Error('Profile not found. Please analyze first.');
        }

        return formatProfile(cached);
      } catch (error: any) {
        console.error('Profile query error:', error);
        throw new Error(`Failed to fetch profile: ${error.message}`);
      }
    },

    /**
     * Get leaderboard
     */
    leaderboard: async (_: any, { limit = 10 }: { limit?: number }) => {
      try {
        const profiles = await prisma.profile.findMany({
          where: { isPublic: true },
          orderBy: { score: 'desc' },
          take: Math.min(limit, 100), // Max 100
          select: {
            username: true,
            avatarUrl: true,
            score: true,
          },
        });

        return profiles.map((p, index) => ({
          rank: index + 1,
          username: p.username || 'unknown',
          avatarUrl: p.avatarUrl || '',
          score: p.score,
          hasPro: false, // TODO: Check PRO status
        }));
      } catch (error) {
        console.error('Leaderboard query error:', error);
        return [];
      }
    },

    /**
     * Get total profile count
     */
    profileCount: async () => {
      try {
        return await prisma.profile.count();
      } catch (error) {
        console.error('Profile count error:', error);
        return 0;
      }
    },
  },

  Mutation: {
    /**
     * Analyze profile (force refresh)
     */
    analyzeProfile: async (_: any, { username }: { username: string }) => {
      try {
        // TODO: Implement fresh analysis
        // For now, just return error
        throw new Error('Analysis not implemented yet');
      } catch (error: any) {
        console.error('Analyze mutation error:', error);
        return {
          success: false,
          error: error.message,
        };
      }
    },

    /**
     * Purchase PRO analysis
     */
    purchaseProAnalysis: async (
      _: any,
      { input }: { input: { username: string; email?: string; returnUrl?: string } }
    ) => {
      try {
        // TODO: Create Stripe checkout session
        // For now, simulate
        return {
          success: true,
          checkoutUrl: `/checkout?username=${input.username}`,
          message: 'Checkout session created',
        };
      } catch (error: any) {
        console.error('Purchase mutation error:', error);
        return {
          success: false,
          error: error.message,
        };
      }
    },
  },
};

// ===================================
// HELPER FUNCTIONS
// ===================================

/**
 * Check if cached data is fresh (< 1 hour)
 */
function isFresh(date: Date): boolean {
  const oneHour = 60 * 60 * 1000;
  return Date.now() - date.getTime() < oneHour;
}

/**
 * Format profile for GraphQL response
 */
function formatProfile(profile: any) {
  return {
    id: profile.id,
    username: profile.username || 'unknown',
    avatarUrl: profile.avatarUrl || '',
    bio: profile.bio || '',
    location: profile.location || '',
    company: profile.company || '',
    blog: profile.blog || '',
    
    score: profile.score || 0,
    percentile: profile.percentile || 0,
    
    totalCommits: profile.totalCommits || 0,
    totalRepos: profile.totalRepos || 0,
    totalStars: profile.totalStars || 0,
    totalForks: profile.totalForks || 0,
    
    currentStreak: profile.currentStreak || 0,
    longestStreak: profile.longestStreak || 0,
    averageCommitsPerDay: profile.averageCommitsPerDay || 0,
    
    followersCount: profile.followersCount || 0,
    followingCount: profile.followingCount || 0,
    
    languages: formatLanguages(profile.languages),
    topRepos: formatRepos(profile.topRepos),
    contributions: formatContributions(profile.contributions),
    
    hasPro: false, // TODO: Check PRO purchase
    proAnalysis: null, // TODO: Get PRO data if purchased
    
    lastAnalyzed: profile.scannedAt.toISOString(),
    isPublic: profile.isPublic,
  };
}

function formatLanguages(data: any): any[] {
  if (!data || typeof data !== 'object') return [];
  
  const entries = Array.isArray(data) ? data : Object.entries(data);
  const total = entries.reduce((sum: number, item: any) => {
    const bytes = Array.isArray(data) ? item.bytes || item[1] : item[1];
    return sum + (bytes || 0);
  }, 0);
  
  return entries.map((item: any) => {
    const [name, bytes] = Array.isArray(data) 
      ? [item.name || item[0], item.bytes || item[1]]
      : item;
    
    return {
      name: name || 'Unknown',
      bytes: bytes || 0,
      percentage: total > 0 ? ((bytes || 0) / total) * 100 : 0,
      color: getLanguageColor(name || 'Unknown'),
    };
  });
}

function formatRepos(data: any): any[] {
  if (!Array.isArray(data)) return [];
  
  return data.map(repo => ({
    name: repo.name || 'Unknown',
    description: repo.description || '',
    stars: repo.stargazers_count || repo.stars || 0,
    forks: repo.forks_count || repo.forks || 0,
    language: repo.language || 'Unknown',
    url: repo.html_url || repo.url || '',
    isArchived: repo.archived || false,
    isFork: repo.fork || false,
  }));
}

function formatContributions(data: any): any {
  if (!data || typeof data !== 'object') {
    return {
      total: 0,
      byMonth: [],
      byDay: [],
    };
  }
  
  return {
    total: data.total || 0,
    byMonth: data.byMonth || [],
    byDay: data.byDay || [],
  };
}

function getLanguageColor(name: string): string {
  const colors: Record<string, string> = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    Java: '#b07219',
    Go: '#00ADD8',
    Rust: '#dea584',
    Ruby: '#701516',
    PHP: '#4F5D95',
    'C++': '#f34b7d',
    C: '#555555',
    'C#': '#178600',
    Swift: '#ffac45',
    Kotlin: '#A97BFF',
    Dart: '#00B4AB',
    Scala: '#c22d40',
    Shell: '#89e051',
    HTML: '#e34c26',
    CSS: '#563d7c',
  };
  return colors[name] || '#858585';
}