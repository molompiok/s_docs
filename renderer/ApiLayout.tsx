// /renderer/ApiLayout.tsx
import React, { useState, useEffect } from 'react';
import type { PageContext } from 'vike/types';
import Header from '../components/DocLayout/Header';
import Sidebar from '../components/DocLayout/Sidebar';
import { Menu as MenuIcon, X as XIcon } from 'lucide-react'; // Pour le bouton de menu mobile
import { usePageContext } from './usePageContext';

// Exporter avec un nom plus spécifique

export function ApiLayout({ children }: { children: React.ReactNode; pageContext: PageContext }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const ctx = usePageContext(); // Hook Vike pour le contexte de la page

  // Fermer la sidebar mobile lors du changement de route
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [ctx.urlPathname]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <Header />

      {/* Bouton pour ouvrir la sidebar sur mobile (flotte au-dessus du contenu) */}
      <div className="lg:hidden fixed top-4 left-4 z-50 mt-12"> {/* Ajusté top pour être sous le header */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 rounded-md bg-white dark:bg-slate-800 shadow-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
          aria-label="Open sidebar"
        >
          <MenuIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-grow max-w-8xl mx-auto w-full">
        <div className="lg:flex">
          {/* Sidebar pour desktop (fixe) */}
          <div className="hidden lg:block">
            <Sidebar />
          </div>

          {/* Sidebar pour mobile (superposition) */}
          {isSidebarOpen && (
            <div className="lg:hidden fixed inset-0 z-40 flex">
              {/* Backdrop */}
              <div
                className="fixed inset-0 bg-black/30 backdrop-blur-sm"
                onClick={() => setIsSidebarOpen(false)}
                aria-hidden="true"
              />
              {/* Contenu de la Sidebar Mobile */}
              <div className="relative flex w-72 max-w-[calc(100%-3rem)] flex-col bg-slate-50 dark:bg-slate-900 shadow-xl">
                <div className="flex items-center justify-between p-4 border-b dark:border-slate-700">
                  <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Navigation</h2>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-1 rounded-md text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                    aria-label="Close sidebar"
                  >
                    <XIcon className="w-5 h-5" />
                  </button>
                </div>
                <div className="overflow-y-auto flex-1">
                  <Sidebar /> {/* Réutiliser le même composant Sidebar */}
                </div>
              </div>
            </div>
          )}

          {/* Contenu Principal */}
          <main className={`w-full transition-all duration-300 ease-in-out ${isSidebarOpen && 'lg:ml-0' // Pour desktop, si sidebar mobile ouverte, ne pas appliquer de marge
            } lg:ml-72`}>  {/* Marge à gauche pour la sidebar desktop */}
            <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
              {/* Ici, on pourrait ajouter une TopBar spécifique au contenu si besoin */}
              {/* Par exemple: Breadcrumbs, titre de la page actuelle, sélecteur de SDK */}
              {children}
            </div>
          </main>
        </div>
      </div>
      {/* Footer optionnel pour la documentation */}
      {/* <Footer /> */}
    </div>
  );
}