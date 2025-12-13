"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";

export default function HomePage() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";

  const [profileCount, setProfileCount] = useState(6);
  const [mounted, setMounted] = useState(false); // ✅ CLIENT-SIDE CHECK
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const headerY = useTransform(smoothProgress, [0, 0.3], [0, -100]);
  const headerOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const headerScale = useTransform(smoothProgress, [0, 0.2], [1, 0.95]);

  useEffect(() => {
    fetch('/api/profile-count')
      .then(res => res.json())
      .then(data => setProfileCount(data.count))
      .catch(() => setProfileCount(6));
  }, []);

  // ✅ CLIENT-SIDE MOUNT
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Advanced Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Main Grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        
        {/* Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(20,20,20,0.8),transparent)]" />
        
        {/* Noise Texture */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            left: '20%',
            top: '10%',
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full opacity-15 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
            right: '10%',
            bottom: '20%',
          }}
          animate={{
            x: [0, -80, 0],
            y: [0, -60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 5
          }}
        />
      </div>

      {/* Animated Vertical Lines */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px"
            style={{
              left: `${12 * (i + 1)}%`,
              height: "100%",
              background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, transparent)"
            }}
            animate={{
              y: ["-100%", "100%"],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 8 + (i % 3) * 2,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Floating Particles - OPTIMIZED ✅ */}
      {mounted && (
        <div className="fixed inset-0 pointer-events-none z-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full will-change-transform"
              initial={{
                width: Math.random() * 4 + 1,
                height: Math.random() * 4 + 1,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: 'rgba(255,255,255,0.2)',
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.1, 0.4, 0.1],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}

      {/* Scroll Progress Indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-white/20 via-white/40 to-white/20 origin-left z-50"
        style={{ scaleX: smoothProgress }}
      />

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        
        {/* Header */}
        <motion.header 
          className="min-h-[80vh] flex flex-col justify-center mb-20"
          style={{ 
            y: headerY,
            opacity: headerOpacity,
            scale: headerScale
          }}
        >
          {/* Logo with Monkey Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring" }}
          >
            <Link href="/" className="inline-flex items-center gap-2 group mb-12">
              <motion.div
                whileHover={{ 
                  rotate: [0, -10, 10, -10, 10, 0],
                  scale: 1.3,
                  y: [0, -5, 0, -3, 0]
                }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <svg fill="#ffffff" width={36} height={36} xmlns="http://www.w3.org/2000/svg" id="Layer_1" viewBox="0 0 245 245">
                  <motion.path
                    d="M185.8,232.75c9.45-10.21,14.43-20.71,10.61-35.01-3.06-11.43-16.92-24.07-17.7-32.75-.63-6.99,4.82-11.41,11.39-10.36,3.39.54,7.83,6.36,10.94,1.42,2.68-4.25-2.55-8.92-6.08-10.4-13.81-5.82-28.46,6.66-25.94,21.63,1.6,9.54,10.16,16.72,14.56,24.99,3.82,7.17,7.21,17.59.1,23.85l-.74-.57c-3.08-19.66-14.33-38.23-26.34-53.5-1.01-1.28-7.78-8.71-7.78-9.33,0-.46.35-.74.67-.99,1.18-.91,4.66-2.18,6.32-3.16,5.5-3.27,9.63-7.39,13.21-12.74,14.05,2.14,27.19-7.72,29.33-22.13,2.18-14.68-6.37-25.09-20.84-24.72-.71.02-1.89.65-2.27.03-4.48-29.93-33.71-44.47-61.11-38.79-17.89,3.71-32.53,17.11-37.76,35.12-1.66.48-3.3.38-5.04.82-5.22,1.33-9.45,6.28-10.86,11.48-2.74,10.11,1.79,21.25,11.35,25.29-.48,13.41,9.63,23,20.87,27.66.05.29.11.67-.03.91-.31.54-9.44,5.46-10.74,6.1-2.12,1.05-7.03,3.62-9.15,2.96-4.11-1.28-13.8-13.56-14.39-17.86-.35-2.55.49-5.15.62-7.63.17-3.33.54-12.69-4.38-12.16-2.65.28-2.93,3.72-3.57,5.68-.09.29-.12.93-.64.66-.43-.22-3.10-4.45-3.89-5.33-9.26-10.38-17.82-.52-16.66,10.78.72,6.98,6.47,13.72,12.06,17.24.79.5,2.74,1.1,3.15,1.51.69.68,3.03,6.49,3.82,7.97,3.61,6.79,10.03,15.86,17.07,19.08,5.63,2.58,11.55.6,17.02-1.51,1.22-.47,6.1-3.05,6.71-3.11.42-.04.49.17.75.45-6.25,17.06-10.31,35.22-8.09,53.58l2.76,14.82c-.36.56-.55.08-.96-.01-8.95-2.11-21.45-9.12-29.2-14.29C-4.7,190.53-17.92,106.22,25.83,48.42c49.53-65.43,145.86-64.24,194.47,1.67,42.04,57.01,29.09,139.38-28.69,179.14-.63.43-5.56,3.75-5.81,3.52Z"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                </svg>
                {/* Floating emoji on hover */}
                <motion.span
                  className="absolute -top-8 left-1/2 -translate-x-1/2 text-2xl opacity-0 group-hover:opacity-100"
                  initial={{ y: 0, opacity: 0 }}
                  whileHover={{ y: -10, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  🐵
                </motion.span>
              </motion.div>
            </Link>
          </motion.div>

          {/* Badge - NO ANIMATION */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8 backdrop-blur-sm w-fit"
          >
            <Sparkles className="h-3.5 w-3.5 text-white/60" />
            <span className="text-xs text-white/60 font-mono uppercase tracking-widest">
              Developer Analytics
            </span>
          </motion.div>

          {/* Title - NO LETTER ANIMATION */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold text-white mb-6"
          >
            GitHub
            <br />
            Checked
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-lg text-white/60 mb-10 max-w-xl leading-relaxed"
          >
            Quantifiable metrics from your GitHub activity. Advanced analysis for developers who care about data.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex items-center gap-6"
          >
            {isAuthenticated ? (
              <Link href="/dashboard">
                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="relative group"
                >
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded-lg blur-xl"
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <Button className="relative bg-white text-black hover:bg-white/90 text-sm px-6 py-6 overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: ["-200%", "200%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    <span className="relative z-10 flex items-center gap-2">
                      View Dashboard
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </span>
                  </Button>
                </motion.div>
              </Link>
            ) : (
              <Link href="/login">
                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="relative group"
                >
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded-lg blur-xl"
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <Button 
                    disabled={isLoading}
                    className="relative bg-white text-black hover:bg-white/90 text-sm px-6 py-6 disabled:opacity-50 overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: ["-200%", "200%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    <span className="relative z-10 flex items-center gap-2">
                      {isLoading ? "Loading..." : "Analyze Profile"}
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </span>
                  </Button>
                </motion.div>
              </Link>
            )}
            
            <motion.span 
              className="text-sm text-white/40 font-mono"
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {profileCount} analyzed
            </motion.span>
          </motion.div>
        </motion.header>

        {/* About Section */}
        <ScrollRevealSection>
          <h2 className="text-xs font-mono text-white/40 uppercase tracking-widest mb-8">
            About GitCheck
          </h2>

          <div className="space-y-4 text-white/60 leading-relaxed">
            <p>
              GitCheck transforms your GitHub profile into a comprehensive analytics dashboard. We analyze your repositories, contributions, and coding patterns to provide actionable insights that help you understand and improve your developer journey.
            </p>
            <p>
              Built with modern web technologies and powered by advanced algorithms, GitCheck processes millions of data points from your GitHub activity to generate detailed reports on code quality, collaboration patterns, and technical expertise.
            </p>
            <p>
              Our platform serves developers, technical recruiters, and engineering teams who need quantifiable metrics to make informed decisions. Whether you're tracking personal growth, evaluating candidates, or assessing team performance, GitCheck provides the data-driven insights you need.
            </p>
            <p className="text-white/80 font-medium">
              Join thousands of developers who trust GitCheck to measure what matters.
            </p>
          </div>
        </ScrollRevealSection>

        {/* Features Section */}
        <ScrollRevealSection>
          <h2 className="text-xs font-mono text-white/40 uppercase tracking-widest mb-10">
            Core Features
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Code Analysis", desc: "Repository quality assessment and documentation scoring" },
              { title: "Live Tracking", desc: "Real-time metrics with contribution pattern analysis" },
              { title: "Skill Mapping", desc: "Technical stack breakdown and expertise visualization" },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  delay: i * 0.15, 
                  duration: 0.6,
                  type: "spring"
                }}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className="p-6 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:border-white/15 transition-all duration-200"
              >
                <h3 className="text-base font-bold text-white/90 mb-3">{feature.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </ScrollRevealSection>

        {/* PRO Section */}
        <ScrollRevealSection delay={0.2}>
          <h2 className="text-xs font-mono text-white/40 uppercase tracking-widest mb-8">
            Premium Analytics
          </h2>

          <motion.div 
            className="flex items-baseline gap-4 mb-10"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <motion.span 
              className="text-6xl font-bold text-white"
              whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.4 }}
            >
              $2.99
            </motion.span>
            <span className="text-sm text-white/40 font-mono">ONE-TIME</span>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {[
              { name: "README Quality", weight: "20%" },
              { name: "Repository Health", weight: "25%" },
              { name: "Developer Patterns", weight: "30%" },
              { name: "Career Insights", weight: "25%" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="flex items-center justify-between p-4 border border-white/[0.08] rounded-xl bg-white/[0.02] transition-colors duration-200"
              >
                <span className="text-sm text-white/90">{item.name}</span>
                <span className="text-xs font-mono text-white/40">{item.weight}</span>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="md:col-span-2 flex items-center justify-between p-4 border-2 border-white/20 rounded-xl bg-white/[0.05]"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm text-white/90 font-bold">AI Career Analysis</span>
                <span className="text-xs font-mono text-white/50 bg-white/10 px-2 py-1 rounded">BONUS</span>
              </div>
            </motion.div>
          </div>

          {isAuthenticated ? (
            <Link href="/dashboard">
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="relative group w-fit"
              >
                <motion.div
                  className="absolute inset-0 bg-white/20 rounded-lg blur-xl"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <Button className="relative bg-white text-black hover:bg-white/90 text-sm px-6 py-6">
                  View Dashboard →
                </Button>
              </motion.div>
            </Link>
          ) : (
            <Link href="/login">
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="relative group w-fit"
              >
                <motion.div
                  className="absolute inset-0 bg-white/20 rounded-lg blur-xl"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <Button 
                  disabled={isLoading}
                  className="relative bg-white text-black hover:bg-white/90 text-sm px-6 py-6 disabled:opacity-50"
                >
                  {isLoading ? "Loading..." : "Unlock PRO for $2.99 →"}
                </Button>
              </motion.div>
            </Link>
          )}
        </ScrollRevealSection>

        {/* FAQ - NO ANIMATIONS */}
        <ScrollRevealSection delay={0.3}>
          <h2 className="text-xs font-mono text-white/40 uppercase tracking-widest mb-10">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              { 
                q: "Is my GitHub data secure?", 
                a: "Yes. We only access public repository data via GitHub OAuth. We never request write permissions or access to private repos. All data is transmitted over encrypted connections and we don't store your GitHub credentials." 
              },
              { 
                q: "What's included in the PRO plan?", 
                a: "PRO includes 5 advanced analytics modules: README Quality Analysis (20%), Repository Health (25%), Developer Patterns (30%), Career Insights (25%), and AI Career Analysis (bonus). You get comprehensive scoring, detailed breakdowns, and personalized AI-powered career recommendations." 
              },
              { 
                q: "How does the payment work?", 
                a: "It's a simple one-time payment of $2.99 to unlock your PRO analysis. No subscriptions, no recurring charges. After payment via Stripe, you'll have instant access to all advanced features and insights for your profile." 
              },
              { 
                q: "Can I request a refund?", 
                a: "Yes. If you're not satisfied with your PRO analysis, contact us within 7 days of purchase for a full refund, no questions asked." 
              },
              { 
                q: "How is my developer score calculated?", 
                a: "Your score is calculated from 4 weighted components analyzing different aspects of your GitHub presence: README Quality (20%), Repository Health (25%), Developer Patterns (30%), and Career Insights (25%). Each component uses multiple metrics and advanced algorithms." 
              },
              { 
                q: "Do I need to reconnect my GitHub account regularly?", 
                a: "No. Once you sign in with GitHub OAuth, you stay authenticated. You can revoke access anytime from your GitHub Settings under Applications if needed." 
              },
              { 
                q: "What programming languages are supported?", 
                a: "GitCheck analyzes all programming languages that GitHub recognizes. We track language usage across your repositories, detect your primary tech stack, and show language evolution over time with detailed statistics." 
              },
              { 
                q: "How often is my data updated?", 
                a: "FREE users can re-analyze their profile anytime by clicking the analyze button. PRO analysis results are cached for 1 hour for performance, then auto-refresh. You can manually refresh anytime via the dashboard." 
              },
              { 
                q: "Can I analyze other developers' profiles?", 
                a: "You can only analyze your own authenticated GitHub profile. This ensures privacy and prevents misuse of the platform." 
              },
              { 
                q: "What browsers are supported?", 
                a: "GitCheck works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version for the best experience." 
              },
              { 
                q: "Is there an API available?", 
                a: "Currently, GitCheck is only available through our web interface. We're considering API access for enterprise customers in the future." 
              },
              { 
                q: "How can I contact support?", 
                a: "You can reach our support team through the contact form on our website or email us directly. We typically respond within 24 hours on business days." 
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="border-l-2 border-white/10 pl-6"
              >
                <h3 className="text-sm font-bold text-white/90 mb-2">{faq.q}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </ScrollRevealSection>

        {/* Footer - ONLY HOVER COLOR */}
        <footer className="pt-20 border-t border-white/[0.06] mt-20">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
          >
            <div className="flex items-center gap-6 text-xs text-white/40">
              {[
                { label: "Privacy", href: "/privacy" },
                { label: "Terms", href: "/terms" },
                { label: "Data Usage", href: "/data-usage" },
              ].map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  className="hover:text-white/70 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="text-xs text-white/40 font-mono">
              © 2025 • Built for{" "}
              <a 
                href="https://goktug.info" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
              >
                developer
              </a>
              {" "}by developers
            </div>
          </motion.div>
        </footer>


      </main>
    </div>
  );
}

// Reusable Scroll Reveal Component
function ScrollRevealSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 0.8, delay, type: "spring", stiffness: 50 }}
      className="mb-20 pt-20 border-t border-white/[0.06]"
    >
      {children}
    </motion.section>
  );
}