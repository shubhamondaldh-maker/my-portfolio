"use client";

import { motion, Variants } from "framer-motion";
import SectionTitle from "./SectionTitle";
import { portfolioData } from "@/data/portfolio";

export default function Skills() {
  const categories = [
    { name: "Frontend", skills: portfolioData.skills.frontend },
    { name: "Backend / APIs", skills: portfolioData.skills.backend },
    { name: "QA & Automation", skills: portfolioData.skills.qa },
    { name: "Tools", skills: portfolioData.skills.tools }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10, scale: 0.9 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 200 } }
  };

  return (
    <section id="skills" className="py-24 relative bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Skills" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-8 rounded-2xl"
            >
              <h3 className="text-xl font-medium text-white mb-6 flex items-center">
                <span className="w-8 h-px bg-purple-500 mr-4"></span>
                {category.name}
              </h3>
              
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex flex-wrap gap-3"
              >
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill}
                    variants={itemVariants}
                    whileHover={{ y: -5, scale: 1.1, backgroundColor: "rgba(168, 85, 247, 0.15)", borderColor: "rgba(168, 85, 247, 0.5)" }}
                    className="px-4 py-2 rounded-md bg-slate-800/50 text-slate-300 text-sm border border-slate-700/50 hover:text-purple-300 transition-colors cursor-default"
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
