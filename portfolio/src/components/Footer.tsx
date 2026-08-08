import { FaGithub, FaLinkedin } from "react-icons/fa";
import { portfolioData } from "@/data/portfolio";

export default function Footer() {
  const { personal } = portfolioData;

  return (
    <footer className="py-12 border-t border-purple-500/10 bg-slate-950/20 backdrop-blur-sm relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-xs font-mono">
            Designed & Built by <span className="text-purple-400 font-sans font-semibold transition-all duration-300">{personal.name}</span>
          </p>
          
          <div className="flex items-center gap-4">
            <a 
              href={personal.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 bg-slate-950 border border-purple-500/10 rounded-lg text-slate-400 hover:text-purple-400 hover:border-purple-500/30 transition-all duration-300"
              aria-label="GitHub Profile"
            >
              <FaGithub size={16} />
            </a>
            <a 
              href={personal.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 bg-slate-950 border border-purple-500/10 rounded-lg text-slate-400 hover:text-purple-400 hover:border-purple-500/30 transition-all duration-300"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
