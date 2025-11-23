import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, GitFork, Code } from "lucide-react";

interface TopRepo {
  name: string;
  stars: number;
  forks: number;
  language: string | null;
  description: string | null;
}

interface TopReposProps {
  repos: TopRepo[];
}

export function TopRepos({ repos }: TopReposProps) {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Top Repositories</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {repos.map((repo, index) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-blue-500/50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-1">{repo.name}</h3>
                <p className="text-sm text-gray-400 line-clamp-2">
                  {repo.description || "No description"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
              {repo.language && (
                <div className="flex items-center gap-1">
                  <Code className="h-4 w-4" />
                  <span>{repo.language}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>{repo.stars}</span>
              </div>
              <div className="flex items-center gap-1">
                <GitFork className="h-4 w-4 text-blue-500" />
                <span>{repo.forks}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}