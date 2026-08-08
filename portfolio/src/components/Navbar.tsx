"use client";

import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -79% 0px" }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    // Initial check
    setTimeout(() => {
      if (window.scrollY < 100) setActiveSection("home");
    }, 100);

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Certifications", href: "#certifications" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-slate-950/75 backdrop-blur-md border-b border-purple-500/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)]" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <a href="#home" className="text-xl font-bold tracking-wider flex items-center group">
              <span className="text-purple-400 font-mono transition-transform group-hover:-translate-x-1 duration-300">&lt;</span>
              <span className="text-white font-sans font-extrabold tracking-widest text-lg">SM</span>
              <span className="text-purple-400 font-mono transition-transform group-hover:translate-x-1 duration-300"> /&gt;</span>
            </a>
          </div>
          
          <div className="hidden md:flex items-center">
            <div className="flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                      isActive ? "text-purple-300" : "text-slate-300 hover:text-purple-400"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute inset-0 bg-purple-500/10 border border-purple-500/20 rounded-full -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {link.name}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-slate-950/95 backdrop-blur-lg border-b border-purple-500/10"
        >
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-md text-base font-medium transition-colors ${
                  activeSection === link.href.substring(1)
                    ? "text-purple-400 bg-purple-500/10 border-l-2 border-purple-500 pl-3"
                    : "text-slate-300 hover:text-purple-400 hover:bg-slate-900/50 pl-4"
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 to-indigo-500 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
    </motion.nav>
  );
}
