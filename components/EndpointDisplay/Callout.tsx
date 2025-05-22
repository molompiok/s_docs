// s_docs/components/EndpointDisplay/Callout.tsx
import React, { ReactNode } from 'react';
import { AlertTriangle, Info, Lightbulb, Zap } from 'lucide-react'; // Différentes icônes selon le type de note

type CalloutType = 'info' | 'warning' | 'danger' | 'tip' | 'note';

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
  className?: string;
}

const Callout: React.FC<CalloutProps> = ({
  type = 'note',
  title,
  children,
  className = '',
}) => {
  const baseClasses = "p-4 rounded-lg border my-4 shadow-sm";
  const typeClasses: Record<CalloutType, string> = {
    info: 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-500/30 dark:text-blue-300',
    warning: 'bg-amber-50 border-amber-300 text-amber-700 dark:bg-amber-900/30 dark:border-amber-500/30 dark:text-amber-300',
    danger: 'bg-red-50 border-red-300 text-red-700 dark:bg-red-900/30 dark:border-red-500/30 dark:text-red-300',
    tip: 'bg-emerald-50 border-emerald-300 text-emerald-700 dark:bg-emerald-900/30 dark:border-emerald-500/30 dark:text-emerald-300',
    note: 'bg-slate-50 border-slate-200 text-slate-700 dark:bg-slate-800/50 dark:border-slate-700 dark:text-slate-300',
  };

  const icons: Record<CalloutType, ReactNode> = {
    info: <Info className="w-5 h-5 mr-2 flex-shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0" />,
    danger: <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0 text-red-500 dark:text-red-400" />, // Danger peut avoir une icône plus forte
    tip: <Lightbulb className="w-5 h-5 mr-2 flex-shrink-0" />,
    note: <Info className="w-5 h-5 mr-2 flex-shrink-0" />, // Même icône que info pour note par défaut
  };

  const IconComponent = icons[type];
  const currentTypeClasses = typeClasses[type] || typeClasses.note;

  return (
    <div className={`${baseClasses} ${currentTypeClasses} ${className}`}>
      {(title || IconComponent) && (
        <div className="flex items-center mb-2">
          {IconComponent}
          {title && <h5 className="font-semibold text-md">{title}</h5>}
        </div>
      )}
      <div className="text-sm prose prose-sm dark:prose-invert max-w-none">
        {children}
      </div>
    </div>
  );
};

export default Callout;