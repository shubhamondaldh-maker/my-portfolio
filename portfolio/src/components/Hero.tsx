"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code2, Terminal, CheckCircle2 } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { portfolioData } from "@/data/portfolio";

export default function Hero() {
  const { personal } = portfolioData;



  return (
    <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden bg-dot-pattern">
      {/* Abstract background glows (Static for better performance) */}
      <div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[128px] -z-10 opacity-40" 
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600 rounded-full blur-[128px] -z-10 opacity-30" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-purple-400 font-medium mb-4 tracking-wide">Hello, I&apos;m</p>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 flex flex-wrap gap-x-3 md:gap-x-5">
              {personal.name.split(" ").map((word, wordIndex, array) => {
                const previousLettersCount = array.slice(0, wordIndex).join("").length;
                return (
                  <span key={wordIndex} className="flex">
                    {word.split("").map((letter, letterIndex) => {
                      const i = previousLettersCount + letterIndex;
                      return (
                        <motion.span
                          key={letterIndex}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.3 + i * 0.05, type: "spring" }}
                        >
                          {letter}
                        </motion.span>
                      );
                    })}
                  </span>
                );
              })}
            </h1>
            
            <div className="h-10 mb-6 overflow-hidden">
              <motion.div
                animate={{ y: [0, -40, -80, -120, -160, 0] }}
                transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
                className="text-xl md:text-2xl text-slate-400 font-medium space-y-4"
              >
                {personal.roles.map((role, i) => (
                  <div key={i} className="h-10">{role}</div>
                ))}
                {/* Duplicate first for smooth loop */}
                <div className="h-10">{personal.roles[0]}</div>
                <div className="h-10">{personal.roles[1]}</div>
              </motion.div>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Code. <span className="text-gradient">Test.</span> Build.
            </h2>
            
            <p className="text-slate-400 text-lg mb-8 max-w-lg leading-relaxed">
              {personal.bio}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="group flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all"
              >
                View Projects
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-all border border-slate-700"
              >
                Contact Me
              </a>
              <div className="flex items-center gap-3 ml-2">
                <a href={personal.github} target="_blank" rel="noopener noreferrer" className="p-3 text-slate-400 hover:text-white bg-slate-900/50 rounded-lg hover:bg-purple-900/20 border border-transparent hover:border-purple-500/30 transition-all">
                  <FaGithub size={20} />
                </a>
                <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 text-slate-400 hover:text-white bg-slate-900/50 rounded-lg hover:bg-purple-900/20 border border-transparent hover:border-purple-500/30 transition-all">
                  <FaLinkedin size={20} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block h-[500px]"
          >
            {/* Main Code Editor Window */}
            <div className="absolute top-10 right-0 w-[450px] glass-card rounded-xl overflow-hidden shadow-2xl">
              <div className="bg-slate-900/80 px-4 py-3 flex items-center gap-2 border-b border-slate-800">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <span className="ml-2 text-xs text-slate-500 font-mono">App.tsx</span>
              </div>
              <div className="p-6 font-mono text-sm">
                <p className="text-slate-400"><span className="text-purple-400">import</span> React <span className="text-purple-400">from</span> <span className="text-green-400">&apos;react&apos;</span>;</p>
                <br/>
                <p className="text-slate-400"><span className="text-purple-400">const</span> <span className="text-blue-400">Developer</span> = () <span className="text-purple-400">=&gt;</span> {"{"}</p>
                <p className="text-slate-400 pl-4"><span className="text-purple-400">return</span> (</p>
                <p className="text-slate-400 pl-8">&lt;<span className="text-blue-400">div</span>&gt;</p>
                <p className="text-slate-400 pl-12">&lt;<span className="text-blue-400">h1</span>&gt;Building the future&lt;/<span className="text-blue-400">h1</span>&gt;</p>
                <p className="text-slate-400 pl-8">&lt;/<span className="text-blue-400">div</span>&gt;</p>
                <p className="text-slate-400 pl-4">);</p>
                <p className="text-slate-400">{"}"};</p>
              </div>
            </div>

            {/* Floating Terminal/Test Window */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute bottom-20 left-0 w-[300px] glass-card rounded-xl overflow-hidden shadow-2xl border-purple-500/20"
            >
              <div className="bg-slate-900/80 px-4 py-2 flex items-center gap-2 border-b border-slate-800">
                <Terminal size={14} className="text-slate-400" />
                <span className="text-xs text-slate-500 font-mono">test-runner.js</span>
              </div>
              <div className="p-4 font-mono text-xs space-y-2">
                <p className="text-slate-300">$ npm run test:e2e</p>
                <p className="text-slate-400">Running 3 test suites...</p>
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle2 size={12} /> <span className="text-slate-300">Auth Flow verified</span>
                </div>
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle2 size={12} /> <span className="text-slate-300">API endpoints passed</span>
                </div>
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle2 size={12} /> <span className="text-slate-300">UI Regression clear</span>
                </div>
                <p className="text-purple-400 mt-2">✓ All tests passed (2.4s)</p>
              </div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="absolute top-0 right-20 text-purple-500/20"
            >
              <Code2 size={100} />
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
