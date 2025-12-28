import { gql } from '@apollo/client';

// ===================================
// QUERIES
// ===================================

// ✅ COMBINED: Homepage data in single query
export const GET_HOMEPAGE_DATA = gql`
  query GetHomepageData($leaderboardLimit: Int) {
    profileCount
    leaderboard(limit: $leaderboardLimit) {
      rank
      username
      avatarUrl
      score
      hasPro
    }
  }
`;

export const GET_PROFILE_COUNT = gql`
  query GetProfileCount {
    profileCount
  }
`;

export const GET_LEADERBOARD = gql`
  query GetLeaderboard($limit: Int) {
    leaderboard(limit: $limit) {
      rank
      username
      avatarUrl
      score
      hasPro
    }
  }
`;

export const GET_PROFILE = gql`
  query GetProfile($username: String!) {
    profile(username: $username) {
      id
      username
      avatarUrl
      bio
      location
      company
      blog
      
      score
      percentile
      
      totalCommits
      totalRepos
      totalStars
      totalForks
      
      currentStreak
      longestStreak
      averageCommitsPerDay
      
      followersCount
      followingCount
      
      languages {
        name
        percentage
        bytes
        color
      }
      
      topRepos {
        name
        description
        stars
        forks
        language
        url
        isArchived
        isFork
      }
      
      contributions {
        total
        byMonth {
          month
          count
        }
        byDay {
          date
          count
        }
      }
      
      hasPro
      proAnalysis {
        readmeScore
        repoHealthScore
        devPatternsScore
        careerScore
        totalScore
        strengths
        weaknesses
        aiRecommendations
        purchasedAt
        analyzedAt
      }
      
      lastAnalyzed
      isPublic
    }
  }
`;

// ===================================
// MUTATIONS
// ===================================

export const ANALYZE_PROFILE = gql`
  mutation AnalyzeProfile($username: String!) {
    analyzeProfile(username: $username) {
      success
      message
      error
      profile {
        id
        username
        score
      }
    }
  }
`;

export const PURCHASE_PRO = gql`
  mutation PurchaseProAnalysis($input: ProPurchaseInput!) {
    purchaseProAnalysis(input: $input) {
      success
      checkoutUrl
      message
      error
    }
  }
`;