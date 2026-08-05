"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import SectionTitle from "./SectionTitle";
import { portfolioData } from "@/data/portfolio";

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Experience" />
        
        <div className="relative border-l border-purple-500/20 ml-6 md:ml-0 md:pl-8 space-y-12">
          {portfolioData.experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.4, delay: index * 0.1 }}
              whileHover={{ x: 10 }}
              className="relative group"
            >
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", delay: 0.2 + index * 0.1 }}
                className="absolute -left-[45px] md:-left-[53px] bg-slate-900 border border-purple-500/50 p-2 rounded-full text-purple-400 group-hover:bg-purple-900/50 group-hover:text-purple-300 transition-colors z-10"
              >
                <Briefcase size={20} />
              </motion.div>
              
              <div className="glass-card p-6 md:p-8 rounded-2xl group-hover:border-purple-500/30 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                  <span className="text-purple-400 font-mono text-sm mt-2 md:mt-0">{exp.period}</span>
                </div>
                
                <h4 className="text-lg text-slate-300 mb-6 font-medium">{exp.company}</h4>
                
                <ul className="space-y-3">
                  {exp.responsibilities.map((task, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-purple-500 mr-3 mt-1.5 leading-none">•</span>
                      <span className="text-slate-400 leading-relaxed">{task}</span>
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
