// s_docs/components/EndpointDisplay/MethodBadge.tsx
import React from 'react';

interface MethodBadgeProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  small?: boolean;
}

const MethodBadge: React.FC<MethodBadgeProps> = ({ method, small }) => {
  const colors = {
    GET: 'bg-sky-100 text-sky-700 dark:bg-sky-700 dark:text-sky-200 ring-sky-600/20 dark:ring-sky-500/30',
    POST: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-700 dark:text-emerald-200 ring-emerald-600/20 dark:ring-emerald-500/30',
    PUT: 'bg-amber-100 text-amber-700 dark:bg-amber-600 dark:text-amber-100 ring-amber-600/20 dark:ring-amber-500/30',
    DELETE: 'bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-200 ring-red-600/20 dark:ring-red-500/30',
    PATCH: 'bg-violet-100 text-violet-700 dark:bg-violet-700 dark:text-violet-200 ring-violet-600/20 dark:ring-violet-500/30',
  };
  const padding = small ? 'px-1.5 py-0.5 text-xs' : 'px-2 py-1 text-sm';

  return (
    <span
      className={`
        inline-flex items-center rounded-md font-semibold ring-1 ring-inset
        ${padding}
        ${colors[method] || colors.GET}
      `}
    >
      {method}
    </span>
  );
};
export default MethodBadge;