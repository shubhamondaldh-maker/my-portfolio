"use client";

import { motion } from "framer-motion";
import { Cloud, Code2, ShieldAlert } from "lucide-react";
import SectionTitle from "./SectionTitle";

export default function About() {
  const highlights = [
    {
      title: "AWS Certified",
      icon: <Cloud className="text-purple-400 mb-4" size={36} />,
      description: "Cloud Practitioner"
    },
    {
      title: "Development",
      icon: <Code2 className="text-indigo-400 mb-4" size={36} />,
      description: "React, Next.js, TS"
    },
    {
      title: "Quality Engineering",
      icon: <ShieldAlert className="text-violet-400 mb-4" size={36} />,
      description: "Playwright, Jest, API"
    }
  ];

  return (
    <section id="about" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionTitle title="About Me" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-8">
          {/* Text Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="prose prose-invert max-w-none text-slate-300 text-base md:text-lg leading-relaxed space-y-6">
              <p>
                I am an{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 font-bold">
                  AWS
                </span>{" "}
                Certified Cloud Practitioner and B.Tech Computer Science & Engineering graduate with hands-on experience in software development, frontend development, QA{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 font-bold">
                  testing
                </span>
                , and{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 font-bold">
                  automation
                </span>
                .
              </p>
              <p>
                My technical experience includes working with{" "}
                <span className="text-white font-semibold">React.js</span>,{" "}
                <span className="text-white font-semibold">Next.js</span>,{" "}
                <span className="text-white font-semibold">JavaScript</span>,{" "}
                <span className="text-white font-semibold">TypeScript</span>, and engineering reusable test suites using{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 font-bold">
                  Playwright
                </span>
                , Jest, Supertest, and k6.
              </p>
              <p className="text-slate-400">
                I focus on bridging the gap between building highly responsive, intuitive user interfaces and ensuring robust, production-ready software systems through rigorous automated testing strategies and cloud-architected reliability.
              </p>
            </div>
          </motion.div>

          {/* Cards Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-5">
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15, type: "spring" }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="glass-card p-6 rounded-xl flex flex-row lg:flex-row items-center gap-5 border border-purple-500/10 hover:border-purple-500/30 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] transition-all duration-300"
              >
                <div className="shrink-0">
                  {highlight.icon}
                </div>
                <div>
                  <h3 className="text-white font-bold tracking-wide text-sm md:text-base">{highlight.title}</h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{highlight.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
