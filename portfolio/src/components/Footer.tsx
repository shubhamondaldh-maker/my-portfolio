import { FaGithub, FaLinkedin } from "react-icons/fa";
import { portfolioData } from "@/data/portfolio";

export default function Footer() {
  const { personal } = portfolioData;

  return (
    <footer className="py-8 border-t border-slate-800 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            Designed & Built by <span className="text-slate-300 font-medium">{personal.name}</span>
          </p>
          
          <div className="flex items-center gap-4">
            <a href={personal.github} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">
              <FaGithub size={18} />
            </a>
            <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">
              <FaLinkedin size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
