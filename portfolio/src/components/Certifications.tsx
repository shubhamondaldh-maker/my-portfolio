"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink, CloudLightning, ShieldCheck } from "lucide-react";
import SectionTitle from "./SectionTitle";
import { portfolioData } from "@/data/portfolio";

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 relative bg-transparent">
      {/* Background glow highlight */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-purple-500/5 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Certifications" subtitle="Professional credentials verifying my capabilities in cloud architecture and technical QA." />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {portfolioData.certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1, type: "spring" }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass-card p-8 rounded-2xl relative overflow-hidden group hover:shadow-[0_0_35px_-5px_rgba(139,92,246,0.25)] hover:border-purple-500/40 transition-all duration-300 bg-slate-950/40"
            >
              {/* Decorative cloud background shape */}
              <div className="absolute -right-10 -top-10 w-28 h-28 bg-purple-600/5 rounded-full blur-2xl group-hover:bg-purple-600/10 transition-all duration-500"></div>

              {/* AWS / Cloud Premium Icon Group */}
              <div className="relative w-16 h-16 mb-6 flex items-center justify-center">
                <div className="absolute inset-0 bg-purple-900/20 rounded-xl border border-purple-500/10 group-hover:border-purple-500/30 group-hover:scale-105 transition-all duration-300" />
                <div className="relative flex items-center justify-center">
                  <CloudLightning className="text-purple-400 absolute opacity-30 scale-125" size={28} />
                  <Award className="text-purple-300 relative" size={32} />
                  <ShieldCheck className="text-indigo-400 absolute -bottom-1 -right-1 bg-slate-950 rounded-full border border-purple-500/20" size={14} />
                </div>
              </div>
              
              {/* Name and Issuer */}
              <h3 className="text-xl font-bold text-white mb-2 leading-snug group-hover:text-purple-300 transition-colors">
                {cert.name}
              </h3>
              
              <p className="text-slate-400 text-sm font-medium mb-6 font-mono">
                {cert.issuer}
              </p>
              
              {/* View Credential Button */}
              {cert.link && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs font-mono font-bold tracking-wider uppercase text-purple-400 hover:text-purple-300 transition-colors group/btn"
                >
                  View Credential 
                  <ExternalLink size={13} className="ml-2 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
