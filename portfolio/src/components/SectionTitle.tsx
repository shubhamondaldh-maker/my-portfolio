"use client";

import { motion } from "framer-motion";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center">
          <span className="text-slate-100">{title}</span>
          <span className="ml-4 h-px bg-purple-500/30 flex-grow max-w-xs"></span>
        </h2>
        {subtitle && (
          <p className="text-slate-400 text-lg max-w-2xl">
            {subtitle}
          </p>
        )}
      </motion.div>
    </div>
  );
}
