// s_docs/components/DocLayout/SidebarAccordion.tsx
import React, { useState, ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import SidebarItem from './SidebarItem'; // Pour le titre de l'accordéon
import { usePageContext } from '../../renderer/usePageContext';

interface SidebarAccordionProps {
  title: string;
  initialOpen?: boolean;
  items: { href: string; label: string; method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' }[];
  basePath: string; // Ex: "/api/auth-server" pour vérifier si un enfant est actif
  level?: number;
}

const SidebarAccordion: React.FC<SidebarAccordionProps> = ({ title, initialOpen = false, items, basePath, level = 0 }) => {
  const pageContext = usePageContext();
  const isChildActive = items.some(item => pageContext.urlPathname === item.href) || pageContext.urlPathname.startsWith(basePath + "/");
  const [isOpen, setIsOpen] = useState(initialOpen || isChildActive);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-between w-full group rounded-md px-2 py-2 text-sm transition-colors duration-150
          pl-${4 + level * 2}
          ${(isOpen || isChildActive)
            ? 'font-semibold text-teal-600 dark:text-teal-400'
            : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-800'
          }
        `}
      >
        <span className="truncate">{title}</span>
        <ChevronRight className={`w-4 h-4 text-slate-500 dark:text-slate-400 transform transition-transform duration-150 ${isOpen ? 'rotate-90' : ''}`} />
      </button>
      {isOpen && (
        <div className="mt-1 space-y-1">
          {items.map(item => (
            <SidebarItem
              key={item.href}
              href={/*item.href*/'/docs/client/products/get-one'}
              label={item.label}
              method={item.method}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default SidebarAccordion; 
