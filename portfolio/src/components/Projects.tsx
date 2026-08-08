"use client";

import { motion } from "framer-motion";
import { ExternalLink, Folder } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import SectionTitle from "./SectionTitle";
import { portfolioData } from "@/data/portfolio";

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative bg-transparent">
      {/* Background soft glow orbs */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-purple-600/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/3 left-10 w-96 h-96 bg-indigo-600/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Projects" subtitle="A selection of software platforms and test engineering suites I have architected." />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {portfolioData.projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="glass-card rounded-2xl overflow-hidden group flex flex-col h-full hover:shadow-[0_0_40px_-5px_rgba(139,92,246,0.2)] hover:border-purple-500/40 transition-all duration-300 bg-slate-950/40"
            >
              <div className="p-6 md:p-8 flex flex-col h-full">
                {/* Top folder / links bar */}
                <div className="flex justify-between items-center mb-6">
                  <div className="p-2.5 bg-slate-900 rounded-lg border border-purple-500/10 text-purple-400 group-hover:text-purple-300 transition-colors">
                    <Folder size={20} />
                  </div>
                  <div className="flex gap-4 items-center">
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-slate-400 hover:text-white transition-colors p-1"
                        aria-label={`View GitHub repository for ${project.name}`}
                      >
                        <FaGithub size={20} />
                      </a>
                    )}
                    {project.demo && project.demo !== "#" && (
                      <a 
                        href={project.demo} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-slate-400 hover:text-white transition-colors p-1"
                        aria-label={`View live demo for ${project.name}`}
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
                
                {/* Title and Description */}
                <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors mb-3 tracking-wide">
                  {project.name}
                </h3>
                
                <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>
                
                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-900/60">
                  {project.tech.map((tech, i) => (
                    <span 
                      key={i} 
                      className="text-[10px] md:text-xs font-mono text-purple-300 bg-purple-950/30 px-3 py-1.5 rounded-md border border-purple-500/10 hover:border-purple-500/30 transition-colors cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Footer Action buttons */}
                <div className="flex items-center gap-4 mt-6">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider uppercase text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      Code <FaGithub size={13} />
                    </a>
                  )}
                  {project.demo && project.demo !== "#" && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider uppercase text-slate-300 hover:text-white transition-colors"
                    >
                      Live Demo <ExternalLink size={13} />
                    </a>
                  )}
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
