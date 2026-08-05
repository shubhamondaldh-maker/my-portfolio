"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import SectionTitle from "./SectionTitle";
import { portfolioData } from "@/data/portfolio";

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Projects" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolioData.projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-card rounded-2xl overflow-hidden group flex flex-col h-full hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)] hover:border-purple-500/50 transition-all duration-300"
            >
              <div className="p-8 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
                    {project.name}
                  </h3>
                  <div className="flex gap-3 text-slate-400">
                    <a href={project.github} className="hover:text-white transition-colors">
                      <FaGithub size={20} />
                    </a>
                    {project.demo && project.demo !== "#" && (
                      <a href={project.demo} className="hover:text-white transition-colors">
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
                
                <p className="text-slate-400 leading-relaxed mb-8 flex-grow">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="text-xs font-mono text-purple-300 bg-purple-900/20 px-3 py-1 rounded-full border border-purple-500/20">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
