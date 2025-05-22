// s_docs/components/DocLayout/SidebarItem.tsx
import React from 'react';
import MethodBadge from '../EndpointDisplay/MethodBadge'; // On créera ce composant
import { usePageContext } from '../../renderer/usePageContext';
import { Link } from '../../renderer/Link';

interface SidebarItemProps {
  href: string;
  label: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'; // Pour les endpoints
  level?: number; // Pour l'indentation
  isActiveOverride?: boolean; // Pour forcer l'état actif (ex: pour un parent d'accordéon)
}

const SidebarItem: React.FC<SidebarItemProps> = ({ href, label, method, level = 0, isActiveOverride }) => {
  const pageContext = usePageContext();
  // Un item est actif si l'URL actuelle correspond exactement ou si c'est un parent actif
  const isActive = isActiveOverride || pageContext.urlPathname === href;
  const indentClass = `pl-${4 + level * 2}`; // Tailwind: pl-4, pl-6, pl-8...

  return (
    <Link
      href={href}
      className={`
        flex items-center border-l px-2! justify-between group rounded-l-none py-1.5 text-sm transition-colors duration-150
        ${indentClass}
        ${isActive
          ? 'font-semibold bg-teal-50 text-teal-600 dark:bg-teal-500/10 dark:text-teal-400'
          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800'
        }
      `}
    >
      <span className="truncate flex-grow mr-2">{label}</span>
      {method && <MethodBadge method={method} small />}
    </Link>
  );
};
export default SidebarItem;