"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function BackgroundGrid() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const floatingSnippets = [
    { text: "const build = () => test(code);", top: "15%", left: "8%", delay: 0 },
    { text: "expect(status).toBe(200);", top: "45%", left: "82%", delay: 2 },
    { text: "await page.goto('/');", top: "72%", left: "10%", delay: 4 },
    { text: "npm run test:e2e", top: "60%", left: "78%", delay: 1.5 },
    { text: "const api = Supertest(app);", top: "28%", left: "75%", delay: 3 },
    { text: "</>", top: "22%", left: "88%", delay: 0.5 },
    { text: "{}", top: "85%", left: "45%", delay: 5 },
    { text: "AWS Certified", top: "8%", left: "60%", delay: 2.5 },
  ];

  return (
    <div className="fixed inset-0 w-full h-full -z-20 overflow-hidden pointer-events-none bg-slate-950">
      {/* Premium Navy Background lighting gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-dot-pattern opacity-60" />

      {/* Large Soft Glow Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-900/10 rounded-full blur-[128px] animate-pulse-slow" />
      <div className="absolute top-2/3 -right-20 w-96 h-96 bg-violet-900/10 rounded-full blur-[128px] animate-pulse-slow" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-indigo-900/5 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: "4s" }} />

      {/* Abstract Flowing Vector Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d="M-100 300 C 200 400, 400 200, 800 500 C 1200 800, 1400 400, 2000 600"
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
        <motion.path
          d="M-50 700 C 300 600, 600 800, 1000 500 C 1400 200, 1600 600, 2100 400"
          fill="none"
          stroke="#a78bfa"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 2 }}
        />
      </svg>

      {/* Floating Developer Snippets */}
      {floatingSnippets.map((snippet, idx) => (
        <motion.div
          key={idx}
          style={{ top: snippet.top, left: snippet.left }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: [0.03, 0.12, 0.03],
            y: [-15, 15, -15],
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            delay: snippet.delay,
            ease: "easeInOut"
          }}
          className="absolute font-mono text-[10px] sm:text-xs text-purple-400 select-none hidden md:block"
        >
          {snippet.text}
        </motion.div>
      ))}
    </div>
  );
}
