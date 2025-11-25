"use client";

import { handleSignIn } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Github, Code2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#1f1f1f] relative overflow-hidden flex items-center justify-center">
      {/* Fixed Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #919191 1px, transparent 1px),
              linear-gradient(to bottom, #919191 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,transparent_0%,#1f1f1f_100%)]" />
      </div>

      {/* Logo - Top Left */}
      <Link href="/">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed top-8 left-8 z-50 flex items-center gap-3 cursor-pointer group"
          whileHover={{ scale: 1.03 }}
        >
          <div className="w-10 h-10 rounded-lg bg-[#252525] border border-[#2a2a2a] flex items-center justify-center group-hover:border-[#333] transition-colors duration-300">
            <Code2 className="h-5 w-5 text-[#919191] group-hover:text-[#b0b0b0] transition-colors duration-300" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black text-[#e0e0e0] tracking-tighter">GITTRACK</span>
            <span className="text-xl font-black text-[#666]">.ME</span>
          </div>
        </motion.div>
      </Link>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Card */}
          <div className="relative bg-[#252525] border border-[#2a2a2a] rounded-3xl p-12 overflow-hidden">
            {/* Inner Grid */}
            <div className="absolute inset-0 opacity-[0.02]">
              <div style={{
                backgroundImage: `linear-gradient(to right, #919191 1px, transparent 1px), linear-gradient(to bottom, #919191 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
              }} className="absolute inset-0" />
            </div>

            <div className="relative z-10 space-y-8 text-center">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#2a2a2a] bg-[#1f1f1f] text-xs text-[#666] font-mono tracking-wider"
              >
                <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
                  <Sparkles className="h-3 w-3" />
                </motion.div>
                SECURE LOGIN
              </motion.div>

              {/* Title */}
              <div className="space-y-3">
                <h1 className="text-4xl font-black text-[#e0e0e0] tracking-tighter">
                  WELCOME BACK
                </h1>
                <p className="text-[#919191] font-light">
                  Sign in to access your GitHub analytics dashboard and track your developer growth.
                </p>
              </div>

              {/* Sign In Button */}
              <form action={handleSignIn} className="space-y-6">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-[#e0e0e0] text-[#1f1f1f] hover:bg-[#d0d0d0] py-7 text-base font-bold rounded-2xl transition-colors duration-300"
                  >
                    <Github className="mr-3 h-5 w-5" />
                    SIGN IN WITH GITHUB
                  </Button>
                </motion.div>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#2a2a2a]"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-4 bg-[#252525] text-[#666] font-mono">
                      SECURE OAUTH 2.0
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  {[
                    { label: "FREE FOREVER", icon: "✓" },
                    { label: "NO CREDIT CARD", icon: "✓" },
                    { label: "2MIN SETUP", icon: "✓" },
                    { label: "INSTANT ACCESS", icon: "✓" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="flex items-center justify-center gap-2 text-xs font-mono text-[#666]"
                    >
                      <span className="text-[#919191]">{item.icon}</span>
                      {item.label}
                    </motion.div>
                  ))}
                </div>
              </form>

              {/* Footer Note */}
              <p className="text-xs text-[#666] font-mono pt-4">
                By signing in, you agree to our{" "}
                <a href="#" className="text-[#919191] hover:text-[#e0e0e0] transition-colors">
                  Terms
                </a>{" "}
                &{" "}
                <a href="#" className="text-[#919191] hover:text-[#e0e0e0] transition-colors">
                  Privacy
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}