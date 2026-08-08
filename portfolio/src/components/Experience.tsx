"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, CheckSquare } from "lucide-react";
import SectionTitle from "./SectionTitle";
import { portfolioData } from "@/data/portfolio";

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative bg-transparent">
      {/* Background glow orb */}
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-violet-600/5 rounded-full blur-[100px] -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionTitle title="Experience" />
        
        <div className="relative border-l border-purple-500/20 ml-4 md:ml-8 pl-8 md:pl-12 py-4 space-y-12 mt-12">
          {portfolioData.experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.2, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Timeline Indicator Dot */}
              <div 
                className="absolute -left-[45px] md:-left-[61px] top-1 bg-slate-950 border-2 border-purple-500/40 p-2 rounded-full text-purple-400 group-hover:border-purple-400 group-hover:text-purple-300 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all duration-300 z-10"
              >
                <Briefcase size={16} />
              </div>
              
              <div className="glass-card p-6 md:p-8 rounded-2xl border border-purple-500/10 hover:border-purple-500/20 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-wide">{exp.role}</h3>
                    <h4 className="text-base text-purple-400/90 font-medium mt-1">{exp.company}</h4>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400 font-mono text-xs bg-slate-900 px-3 py-1.5 rounded-lg border border-purple-500/5 self-start md:self-auto">
                    <Calendar size={12} className="text-purple-400" />
                    <span>{exp.period}</span>
                  </div>
                </div>
                
                <ul className="space-y-3.5 mt-6 border-t border-slate-900 pt-5">
                  {exp.responsibilities.map((task, i) => (
                    <li key={i} className="flex items-start gap-3 group/item">
                      <CheckSquare size={14} className="text-purple-500 mt-1 shrink-0 group-hover/item:text-purple-400 transition-colors" />
                      <span className="text-slate-400 text-sm md:text-base leading-relaxed group-hover/item:text-slate-300 transition-colors">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
