import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, TrendingUp, Star, Award, BarChart3 } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Turn Your GitHub into
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                Career Intelligence
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Analyze your GitHub profile, get a developer score, and unlock
              insights to accelerate your career growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                >
                  <Github className="mr-2 h-5 w-5" />
                  Get Started Free
                </Button>
              </Link>
              <Link href="/pricing">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-700 text-black hover:bg-gray-800"
                >
                  View Pricing
                </Button>
              </Link>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              ✨ Free forever • No credit card required
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why GitTrack?
          </h2>
          <p className="text-gray-400 text-lg">
            Everything you need to understand and improve your developer profile
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
            <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Developer Score
            </h3>
            <p className="text-gray-400">
              Get a comprehensive score (1-10) based on your GitHub activity,
              code quality, and contributions.
            </p>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
            <div className="bg-purple-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="h-6 w-6 text-purple-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Percentile Ranking
            </h3>
            <p className="text-gray-400">
              See how you compare to thousands of other developers. Know where
              you stand.
            </p>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
            <div className="bg-green-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Award className="h-6 w-6 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Growth Insights
            </h3>
            <p className="text-gray-400">
              Track your progress over time and get actionable recommendations
              to improve.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-800/30 border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-500 mb-2">10K+</div>
              <div className="text-gray-400">Developers Analyzed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-500 mb-2">
                50M+
              </div>
              <div className="text-gray-400">Repositories Scanned</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-500 mb-2">95%</div>
              <div className="text-gray-400">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-500 mb-2">
                24/7
              </div>
              <div className="text-gray-400">Real-time Updates</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Level Up?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are already using GitTrack to
            improve their profiles and accelerate their careers.
          </p>
          <Link href="/login">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8"
            >
              <Github className="mr-2 h-5 w-5" />
              Start Analyzing Now
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              © 2024 GitTrack.me. All rights reserved.
            </div>
            <div className="flex gap-6">
              <Link
                href="/pricing"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}