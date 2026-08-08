"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Terminal, CheckCircle2, RefreshCw, Layers } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { portfolioData } from "@/data/portfolio";

export default function Hero() {
  const { personal } = portfolioData;
  const [roleIndex, setRoleIndex] = useState(0);

  // Rotate roles
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % personal.roles.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [personal.roles.length]);

  // E2E Test runner steps simulation
  const [testStep, setTestStep] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTestStep((prev) => (prev + 1) % 6);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center pt-24 pb-12 relative overflow-hidden bg-transparent">
      {/* Soft background glows */}
      <div 
        className="absolute top-1/4 left-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-[120px] -z-10 animate-pulse-slow" 
      />
      <div 
        className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[130px] -z-10 animate-pulse-slow" 
        style={{ animationDelay: "3s" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <p className="text-purple-400 font-mono text-sm tracking-wider mb-3">Hello, I&apos;m</p>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 text-white">
              {personal.name}
            </h1>
            
            {/* Rotating Title */}
            <div className="h-8 mb-6 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={roleIndex}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="text-lg md:text-xl text-slate-400 font-mono font-medium flex items-center gap-2"
                >
                  <span className="text-purple-500 font-bold">&gt;</span> {personal.roles[roleIndex]}
                </motion.div>
              </AnimatePresence>
            </div>

            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
              Code. <span className="text-gradient">Test.</span> Build.
            </h2>
            
            <p className="text-slate-400 text-lg mb-8 max-w-lg leading-relaxed">
              {personal.bio}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="group flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg font-medium shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] transition-all duration-300 transform hover:-translate-y-0.5"
              >
                View Projects
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              <a
                href="#contact"
                className="px-6 py-3.5 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg font-medium border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Contact Me
              </a>
              <div className="flex items-center gap-2.5 ml-2">
                <a 
                  href={personal.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-3 text-slate-400 hover:text-white bg-slate-900/60 rounded-lg hover:bg-purple-900/20 border border-purple-500/5 hover:border-purple-500/30 transition-all duration-300"
                  aria-label="GitHub Profile"
                >
                  <FaGithub size={20} />
                </a>
                <a 
                  href={personal.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-3 text-slate-400 hover:text-white bg-slate-900/60 rounded-lg hover:bg-purple-900/20 border border-purple-500/5 hover:border-purple-500/30 transition-all duration-300"
                  aria-label="LinkedIn Profile"
                >
                  <FaLinkedin size={20} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Visual Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative w-full h-[450px] sm:h-[540px] lg:h-[560px] mt-12 lg:mt-0"
          >
            {/* Soft backdrop glow panel */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 to-indigo-500/5 rounded-2xl filter blur-xl -z-10" />

            {/* Simulated Code Editor Window */}
            <div className="absolute top-4 right-0 sm:right-4 left-0 sm:left-auto mx-auto sm:mx-0 w-[92%] sm:w-[400px] md:w-[450px] glass-card rounded-xl overflow-hidden shadow-2xl border-purple-500/10">
              <div className="bg-slate-950/80 px-4 py-3 flex justify-between items-center border-b border-slate-900">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ef4444]/75"></div>
                  <div className="w-3 h-3 rounded-full bg-[#eab308]/75"></div>
                  <div className="w-3 h-3 rounded-full bg-[#22c55e]/75"></div>
                  <span className="ml-3 text-xs text-slate-500 font-mono">auth.spec.ts</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <Layers size={13} />
                  <span className="text-[10px] font-mono">Playwright</span>
                </div>
              </div>
              <div className="p-4 sm:p-5 font-mono text-[10px] sm:text-[11px] leading-relaxed text-slate-300 bg-slate-950/40">
                <p><span className="text-purple-400">import</span> {"{ test, expect }"} <span className="text-purple-400">from</span> <span className="text-emerald-400">&apos;@playwright/test&apos;</span>;</p>
                <p className="text-slate-600">{"// End-to-end automation login test"}</p>
                <p><span className="text-indigo-400">test</span>(<span className="text-emerald-400">&apos;user authentication flow&apos;</span>, <span className="text-purple-400">async</span> ({"{ page }"}) =&gt; {"{"}</p>
                <p className="pl-4"><span className="text-purple-400">await</span> page.<span className="text-blue-400">goto</span>(<span className="text-emerald-400">&apos;/login&apos;</span>);</p>
                <p className="pl-4"><span className="text-purple-400">await</span> page.<span className="text-blue-400">fill</span>(<span className="text-emerald-400">&apos;input[type=&quot;email&quot;]&apos;</span>, <span className="text-emerald-400">&apos;user@domain.com&apos;</span>);</p>
                <p className="pl-4"><span className="text-purple-400">await</span> page.<span className="text-blue-400">fill</span>(<span className="text-emerald-400">&apos;input[type=&quot;password&quot;]&apos;</span>, <span className="text-emerald-400">&apos;******&apos;</span>);</p>
                <p className="pl-4"><span className="text-purple-400">await</span> page.<span className="text-blue-400">click</span>(<span className="text-emerald-400">&apos;button[type=&quot;submit&quot;]&apos;</span>);</p>
                <br/>
                <p className="pl-4 text-slate-600">{"// Assert UI states are validated"}</p>
                <p className="pl-4"><span className="text-purple-400">const</span> dashboard = page.<span className="text-blue-400">locator</span>(<span className="text-emerald-400">&apos;.dashboard-main&apos;</span>);</p>
                <p className="pl-4"><span className="text-purple-400">await</span> <span className="text-blue-400">expect</span>(dashboard).<span className="text-blue-400">toBeVisible</span>();</p>
                <p>{"});"}</p>
              </div>
            </div>

            {/* Floating Live Terminal / E2E Automation Runner */}
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute bottom-4 sm:bottom-6 left-0 sm:left-2 mx-auto sm:mx-0 w-[84%] sm:w-[300px] md:w-[340px] glass-card rounded-xl overflow-hidden shadow-2xl border-purple-500/20 bg-slate-950/80"
            >
              <div className="bg-slate-900/90 px-4 py-2.5 flex justify-between items-center border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Terminal size={14} className="text-purple-400" />
                  <span className="text-[11px] text-slate-400 font-mono font-bold">QA Test Engine</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[9px] font-mono text-emerald-400">RUNNING</span>
                </div>
              </div>
              <div className="p-4 font-mono text-[10px] leading-relaxed space-y-2 bg-slate-950/70 min-h-[160px] flex flex-col justify-between">
                <div className="space-y-1.5 text-slate-300">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-1 mb-1">
                    <span className="text-purple-400">$ npx playwright test</span>
                    <span className="text-slate-500 text-[8px]">worker: #1</span>
                  </div>
                  
                  {testStep >= 1 && (
                    <p className="text-slate-400 flex items-center gap-1">
                      <RefreshCw size={10} className="animate-spin text-purple-400" />
                      Running E2E Suites (3 specs)...
                    </p>
                  )}
                  {testStep >= 2 && (
                    <div className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle2 size={11} className="shrink-0" />
                      <span>auth.spec.ts <span className="text-slate-500">✓ Auth Flow passed (420ms)</span></span>
                    </div>
                  )}
                  {testStep >= 3 && (
                    <div className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle2 size={11} className="shrink-0" />
                      <span>api-endpoints.spec.ts <span className="text-slate-500">✓ REST APIs passed (310ms)</span></span>
                    </div>
                  )}
                  {testStep >= 4 && (
                    <div className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle2 size={11} className="shrink-0" />
                      <span>regression-ui.spec.ts <span className="text-slate-500">✓ Viewport render passed (510ms)</span></span>
                    </div>
                  )}
                </div>

                <div className="border-t border-slate-900 pt-2 flex items-center justify-between">
                  {testStep >= 5 ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      ✓ All tests passed (1.24s)
                    </span>
                  ) : (
                    <span className="text-slate-500">Executing...</span>
                  )}
                  <span className="text-slate-600 text-[9px]">3/3 specs</span>
                </div>
              </div>
            </motion.div>

            {/* Decorative Developer symbols */}
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
              className="absolute top-10 left-12 text-purple-500/5 -z-10"
            >
              <span className="text-[120px] font-mono select-none">{"{}"}</span>
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
