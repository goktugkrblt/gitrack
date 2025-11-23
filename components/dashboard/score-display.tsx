"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getScoreColor, getScoreBadge } from "@/lib/utils/index";

interface ScoreDisplayProps {
  score: number;
  percentile?: number;
}

export function ScoreDisplay({ score, percentile }: ScoreDisplayProps) {
  const scoreColor = getScoreColor(score);
  const badge = getScoreBadge(score);

  return (
    <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-800/50">
      <CardHeader>
        <CardTitle className="text-white">Your GitHub Score</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center">
          <div className="relative">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-gray-800"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${(score / 10) * 351.86} 351.86`}
                className={scoreColor}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className={`text-4xl font-bold ${scoreColor}`}>
                  {score.toFixed(1)}
                </div>
                <div className="text-xs text-gray-400">out of 10</div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-2">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium">
            {badge}
          </div>
          {percentile !== undefined && (
            <p className="text-sm text-gray-400">
              Better than <span className="text-white font-semibold">{percentile}%</span> of developers
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}