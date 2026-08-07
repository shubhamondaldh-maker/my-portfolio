"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
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
      // IMPORTANT: Replace this with your actual Web3Forms access key
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
      const errorMessage = error instanceof Error ? error.message : "Network Error: Blocked by browser or AdBlocker";
      setStatus("error");
      setErrorMessage(errorMessage);
      setTimeout(() => { setStatus("idle"); setErrorMessage(null); }, 8000);
    }
  };

  return (
    <section id="contact" className="py-24 relative bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          title="Let's Build Something Reliable." 
          subtitle="I'm open to opportunities in software development, frontend development and QA automation." 
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-8">
              <a href={`mailto:${personal.email}`} className="flex items-center group">
                <div className="w-12 h-12 bg-slate-900 border border-slate-800 group-hover:border-purple-500/50 rounded-lg flex items-center justify-center text-purple-400 mr-6 transition-colors">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-sm text-slate-400 mb-1">Email</h4>
                  <p className="text-white font-medium group-hover:text-purple-400 transition-colors">{personal.email}</p>
                </div>
              </a>
              
              <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center group">
                <div className="w-12 h-12 bg-slate-900 border border-slate-800 group-hover:border-purple-500/50 rounded-lg flex items-center justify-center text-purple-400 mr-6 transition-colors">
                  <FaLinkedin size={24} />
                </div>
                <div>
                  <h4 className="text-sm text-slate-400 mb-1">LinkedIn</h4>
                  <p className="text-white font-medium group-hover:text-purple-400 transition-colors">Connect with me</p>
                </div>
              </a>
              
              <a href={personal.github} target="_blank" rel="noopener noreferrer" className="flex items-center group">
                <div className="w-12 h-12 bg-slate-900 border border-slate-800 group-hover:border-purple-500/50 rounded-lg flex items-center justify-center text-purple-400 mr-6 transition-colors">
                  <FaGithub size={24} />
                </div>
                <div>
                  <h4 className="text-sm text-slate-400 mb-1">GitHub</h4>
                  <p className="text-white font-medium group-hover:text-purple-400 transition-colors">View my repositories</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all resize-none"
                  placeholder="How can we work together?"
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Send size={18} />
                {status === "submitting" ? "Sending..." : 
                 status === "success" ? "Message Sent!" : 
                 status === "error" ? "Failed to Send" : 
                 "Send Message"}
              </button>
              
              {status === "error" && errorMessage && (
                <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm text-center">
                  <p className="font-semibold mb-1">Error Details:</p>
                  <p>{errorMessage}</p>
                  <p className="text-xs mt-2 opacity-80">(If it says Network Error, try disabling your AdBlocker or Brave Shields)</p>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
