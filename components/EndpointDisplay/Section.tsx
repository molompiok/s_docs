// s_docs/components/EndpointDisplay/Section.tsx
import React, { ReactNode } from 'react';

interface SectionProps {
  title: string;
  children: ReactNode;
  id?: string; // Pour les ancres de navigation interne
  className?: string;
}

const Section: React.FC<SectionProps> = ({ title, children, id, className = '' }) => {
  return (
    <section id={id} aria-labelledby={id ? `${id}-title` : undefined} className={`py-6 border-b border-slate-200 dark:border-slate-200/5 ${className}`}>
      <h2
        id={id ? `${id}-title` : undefined}
        className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4"
      >
        {title}
      </h2>
      <div className="prose prose-slate dark:prose-invert max-w-none prose-sm sm:prose-base">
        {/* Le 'prose' de Tailwind est utile pour styler le contenu généré par react-markdown
            ou pour du contenu textuel simple. Ajuste-le si tu n'utilises pas react-markdown
            et que tu veux un contrôle plus fin via des classes Tailwind. */}
        {children}
      </div>
    </section>
  );
};

export default Section;