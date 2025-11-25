import { GitHubRepo } from "@/types";

export interface ScoringMetrics {
  totalCommits: number;
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  avgRepoQuality: number;
  languageCount: number;
}

export function calculateScore(metrics: ScoringMetrics): number {
  let score = 0;

  // 1. Repository Count (0-1.5 points)
  if (metrics.totalRepos >= 50) score += 1.5;
  else if (metrics.totalRepos >= 30) score += 1.2;
  else if (metrics.totalRepos >= 15) score += 0.9;
  else if (metrics.totalRepos >= 5) score += 0.5;
  else score += 0.2;

  // 2. Stars (0-2.5 points)
  if (metrics.totalStars >= 1000) score += 2.5;
  else if (metrics.totalStars >= 500) score += 2.0;
  else if (metrics.totalStars >= 100) score += 1.5;
  else if (metrics.totalStars >= 50) score += 1.0;
  else if (metrics.totalStars >= 10) score += 0.5;

  // 3. Forks (0-1.5 points)
  if (metrics.totalForks >= 200) score += 1.5;
  else if (metrics.totalForks >= 100) score += 1.2;
  else if (metrics.totalForks >= 50) score += 0.9;
  else if (metrics.totalForks >= 20) score += 0.6;
  else if (metrics.totalForks >= 5) score += 0.3;

  // 4. Repository Quality (0-2.5 points)
  score += metrics.avgRepoQuality * 2.5;

  // 5. Language Diversity (0-1.5 points)
  const diversityScore = Math.min(metrics.languageCount / 10, 1) * 1.5;
  score += diversityScore;

  // 6. Activity bonus (0-0.5 points)
  if (metrics.totalRepos > 0) {
    const avgStarsPerRepo = metrics.totalStars / metrics.totalRepos;
    if (avgStarsPerRepo >= 10) score += 0.5;
    else if (avgStarsPerRepo >= 5) score += 0.3;
    else if (avgStarsPerRepo >= 1) score += 0.1;
  }

  return Math.min(Math.round(score * 10) / 10, 10);
}

export function analyzeRepoQuality(repo: GitHubRepo): number {
  let quality = 0;

  // Has description
  if (repo.description && repo.description.length > 20) quality += 0.15;

  // Has topics/tags
  if (repo.topics && repo.topics.length > 0) quality += 0.15;

  // Has license
  if (repo.license) quality += 0.15;

  // Recent activity (updated in last 6 months)
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  if (new Date(repo.updated_at) > sixMonthsAgo) quality += 0.15;

  // Has meaningful size (not empty) - repo.size optional olduğu için kontrol eklendi
  if ((repo.size || 0) > 100) quality += 0.15;

  // Has stars (community validation) - stargazers_count optional olduğu için kontrol eklendi
  const stars = repo.stargazers_count || 0;
  if (stars >= 10) quality += 0.15;
  else if (stars >= 5) quality += 0.10;

  return Math.min(quality, 1);
}

export function calculateAverageQuality(repos: GitHubRepo[]): number {
  if (repos.length === 0) return 0;

  const totalQuality = repos.reduce((sum, repo) => {
    return sum + analyzeRepoQuality(repo);
  }, 0);

  return totalQuality / repos.length;
}

export function calculatePercentile(
  userScore: number,
  allScores: number[]
): number {
  if (allScores.length === 0) return 50;

  const sorted = [...allScores].sort((a, b) => a - b);
  const lowerCount = sorted.filter((s) => s < userScore).length;

  return Math.round((lowerCount / sorted.length) * 100);
}