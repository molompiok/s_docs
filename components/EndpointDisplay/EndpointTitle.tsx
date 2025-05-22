import React from 'react';
import MethodBadge from './MethodBadge'; // Assure-toi qu'il est créé

interface EndpointTitleProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  title: string;
  description: string;
}
const EndpointTitle: React.FC<EndpointTitleProps> = ({ method, path, title, description }) => (
  <div className="mb-8 border  p-2 border-slate-200 dark:border-slate-200/5">
    <div className="flex items-center space-x-3 mb-2">
      <MethodBadge method={method} />
      <code className="text-sm sm:text-base font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">{path}</code>
    </div>
    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-1">{title}</h1>
    <p className="text-slate-600 dark:text-slate-400">{description}</p>
  </div>
);
export default EndpointTitle;