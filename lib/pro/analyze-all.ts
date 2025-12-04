// lib/pro/analyze-all.ts
import { Octokit } from "@octokit/rest";
import { analyzeReadmeQuality } from "./readme-quality";
import { analyzeRepositoryHealth } from "./repo-health";
import { analyzeDeveloperPatterns } from "./dev-patterns";

export interface CareerInsights {
  experienceLevel: 'Junior' | 'Mid-Level' | 'Senior' | 'Staff+';
  profileType: string;
  overallScore: number;
  growth: {
    commitTrend: 'improving' | 'stable' | 'declining';
    newLanguages: number;
    communityGrowth: 'improving' | 'stable' | 'declining';
  };
  skills: {
    technicalBreadth: number;
    documentation: number;
    collaboration: number;
    projectManagement: number;
  };
  recommendations: string[];
  portfolioStrength: number;
}

export async function analyzeAllPro(
  octokit: Octokit,
  username: string
) {
  const startTime = Date.now();
  console.log(`⏱️  [ANALYZE ALL] Starting comprehensive analysis for: ${username}`);

  try {
    // Run all analyses in parallel for max speed
    const [readmeQuality, repoHealth, devPatterns] = await Promise.all([
      analyzeReadmeQuality(octokit, username),
      analyzeRepositoryHealth(octokit, username),
      analyzeDeveloperPatterns(octokit, username),
    ]);

    // Calculate Career Insights from existing data (NO extra API calls!)
    const careerInsights = calculateCareerInsights({
      readmeQuality,
      repoHealth,
      devPatterns,
      username
    });

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`✅ [ANALYZE ALL] Complete in ${duration}s`);

    return {
      readmeQuality,
      repoHealth,
      devPatterns,
      careerInsights,
    };
  } catch (error) {
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.error(`❌ [ANALYZE ALL] Failed after ${duration}s:`, error);
    throw error;
  }
}

// ==========================================
// CAREER INSIGHTS CALCULATOR
// ==========================================

function calculateCareerInsights(data: {
  readmeQuality: any;
  repoHealth: any;
  devPatterns: any;
  username: string;
}): CareerInsights {
  const { readmeQuality, repoHealth, devPatterns } = data;

  // 1. EXPERIENCE LEVEL
  // devPatterns'den doğru field'leri alalım
  const totalCommits = devPatterns.totalCommits || 0;
  const totalRepos = devPatterns.totalRepos || 0;
  
  // Account age'i commit history'den tahmin edelim
  const accountAge = Math.floor(totalCommits / 500); // Rough estimate: 500 commits per year

  let experienceLevel: CareerInsights['experienceLevel'] = 'Junior';
  
  if (accountAge >= 10 || totalCommits > 5000 || totalRepos > 100) {
    experienceLevel = 'Staff+';
  } else if (accountAge >= 5 || totalCommits > 2000 || totalRepos > 50) {
    experienceLevel = 'Senior';
  } else if (accountAge >= 2 || totalCommits > 500 || totalRepos > 20) {
    experienceLevel = 'Mid-Level';
  }

  // 2. PROFILE TYPE
  const languages = devPatterns.metrics?.technology?.languages || {};
  const frameworks = devPatterns.metrics?.technology?.frameworks || [];
  
  let profileType = 'Full-Stack Developer';
  
  const hasBackend = languages['Python'] || languages['Java'] || languages['Go'] || languages['Ruby'];
  const hasFrontend = languages['JavaScript'] || languages['TypeScript'] || frameworks.includes('React');
  const hasMobile = frameworks.includes('React Native') || languages['Swift'] || languages['Kotlin'];
  const hasDevOps = frameworks.includes('Docker') || frameworks.includes('Kubernetes');
  
  if (hasMobile) profileType = 'Mobile Developer';
  else if (hasDevOps) profileType = 'DevOps Engineer';
  else if (hasBackend && !hasFrontend) profileType = 'Backend Engineer';
  else if (hasFrontend && !hasBackend) profileType = 'Frontend Developer';

  // 3. GROWTH TRAJECTORY
  const commitTrend = repoHealth.trend; // improving/stable/declining
  const newLanguages = Object.keys(languages).length;
  const collaborationScore = devPatterns.metrics?.collaboration?.score || 0;
  
  let communityGrowth: 'improving' | 'stable' | 'declining' = 'stable';
  if (collaborationScore >= 7) communityGrowth = 'improving';
  else if (collaborationScore < 4) communityGrowth = 'declining';

  // 4. SKILL SCORES
  const technicalBreadth = Math.min(newLanguages * 1.5, 10); // max 10
  const documentation = readmeQuality.overallScore; // 0-10
  const collaboration = devPatterns.metrics?.collaboration?.score || 0;
  const projectManagement = repoHealth.overallScore;

  // 5. OVERALL SCORE
  const overallScore = Math.round(
    (technicalBreadth * 0.25 + 
     documentation * 0.25 + 
     collaboration * 0.25 + 
     projectManagement * 0.25) * 10
  ) / 10;

  // 6. RECOMMENDATIONS
  const recommendations: string[] = [];
  
  if (documentation < 7) {
    recommendations.push('Improve documentation quality in your repositories');
  }
  if (collaboration < 5) {
    recommendations.push('Increase open source contributions and code reviews');
  }
  if (projectManagement < 5) {
    recommendations.push('Focus on better project maintenance and issue management');
  }
  if (newLanguages < 3) {
    recommendations.push('Expand your technical stack by learning new languages');
  }
  if (!languages['TypeScript'] && languages['JavaScript']) {
    recommendations.push('Consider learning TypeScript for better type safety');
  }
  if (devPatterns.metrics?.codeQuality?.testCoverage === 0) {
    recommendations.push('Add automated tests to your projects');
  }

  // 7. PORTFOLIO STRENGTH
  const diversityScore = Math.min(totalRepos / 20, 1) * 25; // max 25
  const consistencyScore = Math.min(totalCommits / 1000, 1) * 25; // max 25
  const impactScore = (collaboration / 10) * 25; // max 25
  const visibilityScore = (documentation / 10) * 25; // max 25
  
  const portfolioStrength = Math.round(
    diversityScore + consistencyScore + impactScore + visibilityScore
  );

  return {
    experienceLevel,
    profileType,
    overallScore,
    growth: {
      commitTrend,
      newLanguages,
      communityGrowth,
    },
    skills: {
      technicalBreadth: Math.round(technicalBreadth * 10) / 10,
      documentation: Math.round(documentation * 10) / 10,
      collaboration: Math.round(collaboration * 10) / 10,
      projectManagement: Math.round(projectManagement * 10) / 10,
    },
    recommendations,
    portfolioStrength,
  };
}