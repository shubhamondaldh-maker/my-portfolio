"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import SectionTitle from "./SectionTitle";
import { portfolioData } from "@/data/portfolio";

export default function Contact() {
  const { personal } = portfolioData;
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const data = {
      ...formData,
      // Default Web3Forms Access Key
      access_key: "7f8ab664-cb8c-4bef-a25f-ef3be8b61070", 
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      if (result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        console.error("Web3Forms API Error:", result);
        setStatus("error");
        setErrorMessage(result.message || "API returned an error");
        setTimeout(() => { setStatus("idle"); setErrorMessage(null); }, 8000);
      }
    } catch (error) {
      console.error("Web3Forms Fetch Error:", error);
      const msg = error instanceof Error ? error.message : "Network Error: Blocked by browser or AdBlocker";
      setStatus("error");
      setErrorMessage(msg);
      setTimeout(() => { setStatus("idle"); setErrorMessage(null); }, 8000);
    }
  };

  return (
    <section id="contact" className="py-24 relative bg-transparent">
      {/* Background Glow Orb */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-purple-600/5 rounded-full blur-[120px] -z-10 animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionTitle 
          title="Let's Build Something Reliable." 
          subtitle="I'm open to opportunities in software development, frontend development and QA automation." 
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mt-12 items-start">
          {/* Contact Details Links */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            <p className="text-slate-400 leading-relaxed text-sm md:text-base mb-8">
              Feel free to reach out directly via email, connect with me on LinkedIn, or inspect my repositories on GitHub. Let&apos;s talk about clean code, test plans, or full-stack architectures.
            </p>

            <div className="space-y-4">
              <a href={`mailto:${personal.email}`} className="flex items-center group p-4 rounded-xl border border-purple-500/5 hover:border-purple-500/20 bg-slate-950/40 hover:bg-slate-950/70 transition-all duration-300">
                <div className="w-10 h-10 bg-slate-900 border border-purple-500/10 group-hover:border-purple-500/40 rounded-lg flex items-center justify-center text-purple-400 group-hover:text-purple-300 transition-colors">
                  <Mail size={18} />
                </div>
                <div className="ml-5">
                  <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-0.5">Email Address</h4>
                  <p className="text-slate-200 text-sm font-semibold group-hover:text-purple-300 transition-colors">{personal.email}</p>
                </div>
              </a>
              
              <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center group p-4 rounded-xl border border-purple-500/5 hover:border-purple-500/20 bg-slate-950/40 hover:bg-slate-950/70 transition-all duration-300">
                <div className="w-10 h-10 bg-slate-900 border border-purple-500/10 group-hover:border-purple-500/40 rounded-lg flex items-center justify-center text-purple-400 group-hover:text-purple-300 transition-colors">
                  <FaLinkedin size={18} />
                </div>
                <div className="ml-5">
                  <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-0.5">LinkedIn Profile</h4>
                  <p className="text-slate-200 text-sm font-semibold group-hover:text-purple-300 transition-colors">linkedin.com/in/shubhadeepa-mondal</p>
                </div>
              </a>
              
              <a href={personal.github} target="_blank" rel="noopener noreferrer" className="flex items-center group p-4 rounded-xl border border-purple-500/5 hover:border-purple-500/20 bg-slate-950/40 hover:bg-slate-950/70 transition-all duration-300">
                <div className="w-10 h-10 bg-slate-900 border border-purple-500/10 group-hover:border-purple-500/40 rounded-lg flex items-center justify-center text-purple-400 group-hover:text-purple-300 transition-colors">
                  <FaGithub size={18} />
                </div>
                <div className="ml-5">
                  <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-0.5">GitHub Repositories</h4>
                  <p className="text-slate-200 text-sm font-semibold group-hover:text-purple-300 transition-colors">github.com/shubhamondaldh-maker</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Contact Input Form */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-7 w-full"
          >
            <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 rounded-2xl space-y-5 bg-slate-950/40 border border-purple-500/10">
              <div>
                <label htmlFor="name" className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-950/60 border border-purple-500/10 focus:border-purple-500/40 focus:ring-1 focus:ring-purple-500/30 rounded-lg px-4 py-3 text-white text-sm focus:outline-none transition-all duration-300"
                  placeholder="Your Name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-950/60 border border-purple-500/10 focus:border-purple-500/40 focus:ring-1 focus:ring-purple-500/30 rounded-lg px-4 py-3 text-white text-sm focus:outline-none transition-all duration-300"
                  placeholder="yourname@domain.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">Message</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-950/60 border border-purple-500/10 focus:border-purple-500/40 focus:ring-1 focus:ring-purple-500/30 rounded-lg px-4 py-3 text-white text-sm focus:outline-none transition-all duration-300 resize-none"
                  placeholder="Hello Shubhadeepa, let's collaborate on..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={status === "submitting" || status === "success"}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-mono text-xs font-bold tracking-wider uppercase py-3.5 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_15px_rgba(139,92,246,0.2)] hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]"
              >
                {status === "submitting" ? (
                  <>Running Delivery Network...</>
                ) : status === "success" ? (
                  <>
                    <CheckCircle2 size={14} className="text-emerald-400" />
                    Sent Successfully
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    Send Message
                  </>
                )}
              </button>
              
              {status === "success" && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-200 text-xs flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span>Your message has been processed successfully. I will get back to you shortly!</span>
                </div>
              )}

              {status === "error" && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg text-rose-200 text-xs flex items-center gap-2">
                  <AlertCircle size={16} className="text-rose-400 shrink-0" />
                  <span>
                    <strong>Failed to dispatch:</strong> {errorMessage || "Network error. Please try again."}
                  </span>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
