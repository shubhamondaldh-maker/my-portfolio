"use client";

import { motion } from "framer-motion";
import { Cloud, Code, ShieldCheck } from "lucide-react";
import SectionTitle from "./SectionTitle";

export default function About() {
  const highlights = [
    {
      title: "AWS Certified",
      icon: <Cloud className="text-purple-400 mb-4" size={32} />,
      description: "Cloud Practitioner"
    },
    {
      title: "Development",
      icon: <Code className="text-blue-400 mb-4" size={32} />,
      description: "React, Next.js, TS"
    },
    {
      title: "Quality Engineering",
      icon: <ShieldCheck className="text-green-400 mb-4" size={32} />,
      description: "Playwright, Jest, API"
    }
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="About Me" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="prose prose-invert max-w-none text-slate-300 text-lg leading-relaxed">
              <p className="mb-6">
                <span className="text-purple-400 font-semibold">AWS</span> Certified Cloud Practitioner and B.Tech Computer Science & Engineering graduate with hands-on experience in software development, frontend development, QA <span className="text-purple-400 font-semibold">testing</span>, and <span className="text-purple-400 font-semibold">automation</span>.
              </p>
              <p>
                Experience includes working with <span className="text-white font-medium">React.js, Next.js, JavaScript, TypeScript, </span><span className="text-purple-400 font-medium">Playwright</span><span className="text-white font-medium">, Jest, Supertest, k6, REST APIs, Git</span> and <span className="text-white font-medium">GitHub</span>. I bridge the gap between building intuitive user interfaces and ensuring robust, reliable software through comprehensive testing strategies.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {highlights.map((highlight, index) => (
              <div key={index} className="glass-card p-6 rounded-xl text-center flex flex-col items-center justify-center hover:-translate-y-2 transition-transform duration-300">
                {highlight.icon}
                <h3 className="text-white font-medium mb-1">{highlight.title}</h3>
                <p className="text-sm text-slate-400">{highlight.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
