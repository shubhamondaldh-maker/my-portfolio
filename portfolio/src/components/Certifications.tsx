"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import SectionTitle from "./SectionTitle";
import { portfolioData } from "@/data/portfolio";

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Certifications" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioData.certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1, type: "spring" }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="glass-card p-8 rounded-2xl relative overflow-hidden group hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)] hover:border-purple-500/50 transition-all duration-300"
            >
              {/* Decorative background glow */}
              <div className="absolute -right-12 -top-12 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-colors duration-500"></div>
              
              <Award className="text-purple-400 mb-6" size={40} />
              
              <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                {cert.name}
              </h3>
              
              <p className="text-slate-400 font-medium mb-8">
                {cert.issuer}
              </p>
              
              {cert.link && cert.link !== "#" && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors"
                >
                  View Credential <ExternalLink size={14} className="ml-2" />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
