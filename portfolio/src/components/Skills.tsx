"use client";

import { motion, Variants } from "framer-motion";
import { Monitor, Server, ShieldCheck, Settings } from "lucide-react";
import SectionTitle from "./SectionTitle";
import { portfolioData } from "@/data/portfolio";

export default function Skills() {
  const categories = [
    { 
      name: "Frontend", 
      skills: portfolioData.skills.frontend,
      icon: <Monitor className="text-purple-400" size={24} />
    },
    { 
      name: "Backend / APIs", 
      skills: portfolioData.skills.backend,
      icon: <Server className="text-indigo-400" size={24} />
    },
    { 
      name: "QA & Automation", 
      skills: portfolioData.skills.qa,
      icon: <ShieldCheck className="text-violet-400" size={24} />
    },
    { 
      name: "Tools & Deployments", 
      skills: portfolioData.skills.tools,
      icon: <Settings className="text-purple-400" size={24} />
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 5 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 220, damping: 15 } }
  };

  return (
    <section id="skills" className="py-24 relative bg-transparent">
      {/* Glow highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Skills" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-8 rounded-2xl border border-purple-500/10 hover:border-purple-500/20 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] transition-all duration-500"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-slate-900 rounded-lg border border-purple-500/10 shadow-inner">
                  {category.icon}
                </div>
                <h3 className="text-lg font-bold text-white tracking-wide">
                  {category.name}
                </h3>
              </div>
              
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex flex-wrap gap-2.5"
              >
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill}
                    variants={itemVariants}
                    whileHover={{ 
                      y: -3, 
                      scale: 1.05, 
                      backgroundColor: "rgba(139, 92, 246, 0.15)", 
                      borderColor: "rgba(167, 139, 250, 0.4)",
                      color: "#fff"
                    }}
                    className="px-3.5 py-2 rounded-lg bg-slate-900/60 text-slate-300 font-mono text-xs border border-purple-500/5 hover:shadow-[0_4px_12px_rgba(139,92,246,0.15)] transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
