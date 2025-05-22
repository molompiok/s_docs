// s_docs/components/DocLayout/Sidebar.tsx
import React from 'react';
import SidebarItem from './SidebarItem';
import SidebarAccordion from './SidebarAccordion';
import { Search } from 'lucide-react'; // Icône pour la recherche
import { navigationStructure, NavItemType, SingleNavItem, AccordionNavItem, HeaderNavItem } from '../../json/navigationStructure'; // Importer la structure et les types
import { usePageContext } from '../../renderer/usePageContext';

const Sidebar = () => {
  const pageContext = usePageContext(); // Pour aider à déterminer l'état actif/ouvert

  return (
    <aside className="fixed inset-0 top-16 left-0 z-30 hidden w-72 px-4 sm:px-6 lg:px-8 overflow-y-auto border-r border-slate-900/10 lg:block dark:border-slate-50/[0.06] pb-8"> {/* Augmenté w- et pb */}
      <div className="py-6 sticky top-0 bg-slate-50 dark:bg-slate-900 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8"> {/* Rendre la recherche sticky */}
        {/* Champ de Recherche (non fonctionnel pour l'instant) */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="search"
            placeholder="Search docs..."
            className="block w-full pl-9 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-white dark:bg-slate-800 dark:border-slate-700 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
          />
        </div>
      </div>

      <nav className="space-y-1.5 mt-4"> {/* Ajouté mt-4 */}
        {navigationStructure.map((navItem, index) => {
          if (navItem.type === 'header') {
            const headerItem = navItem as HeaderNavItem;
            return (
              <h2
                key={`header-${index}`}
                className="mt-6 mb-2 px-2 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 tracking-wider"
              >
                {headerItem.label}
              </h2>
            );
          } else if (navItem.type === 'item') {
            const singleItem = navItem as SingleNavItem;
            return (
              <SidebarItem
                key={singleItem.href}
                href={/*singleItem.href*/'/docs/client/products/get-one'}
                label={singleItem.label}
                method={singleItem.method}
              />
            );
          } else if (navItem.type === 'accordion') {
            const accordionItem = navItem as AccordionNavItem;
            return (
              <SidebarAccordion
                key={`accordion-${index}`}
                title={accordionItem.label}
                items={accordionItem.items as any} // Le type peut devenir complexe avec l'imbrication
                basePath={accordionItem.basePath}
                // Ouvre l'accordéon si l'URL actuelle commence par le basePath de l'accordéon
                initialOpen={pageContext.urlPathname.startsWith(accordionItem.basePath)}
              />
            );
          }
          return null;
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;