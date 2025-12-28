import { gql } from 'graphql-tag';

export const typeDefs = gql`
  # ===================================
  # QUERIES
  # ===================================
  type Query {
    """
    Get public profile analysis by GitHub username
    """
    profile(username: String!): Profile
    
    """
    Get top profiles from leaderboard
    """
    leaderboard(limit: Int = 10): [LeaderboardEntry!]!
    
    """
    Get total profile count
    """
    profileCount: Int!
  }

  # ===================================
  # MUTATIONS
  # ===================================
  type Mutation {
    """
    Analyze a GitHub profile (creates or updates)
    """
    analyzeProfile(username: String!): AnalysisResult!
    
    """
    Purchase PRO analysis for a username
    """
    purchaseProAnalysis(input: ProPurchaseInput!): ProPurchaseResult!
  }

  # ===================================
  # TYPES
  # ===================================
  
  """
  Main profile type with all analysis data
  """
  type Profile {
    id: ID!
    username: String!
    avatarUrl: String
    bio: String
    location: String
    company: String
    blog: String
    
    # Core metrics (FREE)
    score: Float!
    percentile: Float
    
    # GitHub stats (FREE)
    totalCommits: Int!
    totalRepos: Int!
    totalStars: Int!
    totalForks: Int!
    totalPRs: Int!
    mergedPRs: Int!
    
    # Activity (FREE)
    currentStreak: Int!
    longestStreak: Int!
    averageCommitsPerDay: Float!
    mostActiveDay: String!
    weekendActivity: Int!
    
    # Community (FREE)
    followersCount: Int!
    followingCount: Int!
    organizationsCount: Int!
    gistsCount: Int!
    
    # Extended Metrics (FREE)
    totalIssuesOpened: Int!
    totalReviews: Int!
    totalContributions: Int!
    totalWatchers: Int!
    totalOpenIssues: Int!
    averageRepoSize: Float!
    accountAge: Int!
    
    # Languages and repos (FREE)
    languages: [Language!]!
    topRepos: [Repository!]!
    contributions: ContributionData!
    
    # PRO status
    hasPro: Boolean!
    proAnalysis: ProAnalysis
    
    # Metadata
    lastAnalyzed: String!
    isPublic: Boolean!
  }

  """
  PRO analysis data (only if purchased)
  """
  type ProAnalysis {
    # Scores
    readmeScore: Float!
    repoHealthScore: Float!
    devPatternsScore: Float!
    careerScore: Float!
    totalScore: Float!
    
    # Detailed analysis
    strengths: [String!]!
    weaknesses: [String!]!
    roadmap: [RoadmapItem!]!
    
    # AI insights
    aiRecommendations: String
    marketValue: MarketValue
    
    # Metadata
    purchasedAt: String!
    analyzedAt: String!
  }

  """
  Language usage
  """
  type Language {
    name: String!
    percentage: Float!
    bytes: Int!
    color: String
  }

  """
  Repository data
  """
  type Repository {
    name: String!
    description: String
    stars: Int!
    forks: Int!
    language: String
    url: String!
    isArchived: Boolean!
    isFork: Boolean!
  }

  """
  Contribution activity data
  """
  type ContributionData {
    total: Int!
    byMonth: [MonthlyContribution!]!
    byDay: [DailyContribution!]!
  }

  type MonthlyContribution {
    month: String!
    count: Int!
  }

  type DailyContribution {
    date: String!
    count: Int!
  }

  """
  Roadmap item for career growth
  """
  type RoadmapItem {
    title: String!
    description: String!
    priority: String!
    timeframe: String!
    category: String!
  }

  """
  Market value estimation
  """
  type MarketValue {
    estimatedSalary: SalaryRange!
    level: String!
    insights: [String!]!
  }

  type SalaryRange {
    min: Int!
    max: Int!
    currency: String!
  }

  """
  Leaderboard entry
  """
  type LeaderboardEntry {
    rank: Int!
    username: String!
    avatarUrl: String!
    score: Float!
    hasPro: Boolean!
  }

  """
  Analysis result
  """
  type AnalysisResult {
    success: Boolean!
    profile: Profile
    message: String
    error: String
  }

  """
  PRO purchase result
  """
  type ProPurchaseResult {
    success: Boolean!
    checkoutUrl: String
    message: String
    error: String
  }

  # ===================================
  # INPUTS
  # ===================================
  
  input ProPurchaseInput {
    username: String!
    email: String
    returnUrl: String
  }
`;