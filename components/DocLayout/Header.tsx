// s_docs/components/DocLayout/Header.tsx
import React from 'react';
import { BookCopy, Github, Settings } from 'lucide-react'; // Exemple d'icônes
import DarkModeToggle from '../UI/DarkModeToggle';
import { Link } from '../../renderer/Link';

const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-transparent">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/api/" className="flex items-center font-semibold text-lg text-slate-900 dark:text-white">
              {/* <img src="/logo-sdocs.svg" alt="Sublymus Docs" className="h-7 w-auto mr-2" /> */}
              <Settings className=" inline h-6 w-6 mr-4 text-teal-500" />
              Sublymus API
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {/* Liens externes (optionnel) */}
            {/* <a href="https://github.com/molompiok/sublymus" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300">
              <Github className="w-5 h-5" />
            </a> */}
            <DarkModeToggle />
            {/* Sélecteur de version API (futur) */}
            {/* Sélecteur de langue (futur) */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;