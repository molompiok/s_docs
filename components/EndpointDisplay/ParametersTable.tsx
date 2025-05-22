import React, { ReactNode } from 'react';

export interface ParameterDefinition {
  name: string;
  type: string; // ex: "string", "number", "boolean", "string (UUID)", "array<string>"
  required?: boolean;
  description: React.ReactNode; // Peut déjà être ReactNode, c'est bien
  example?: string;             // Ou ReactNode si tu veux des exemples plus riches
  defaultValue?: any;         // Utile pour les query params optionnels
  enum?: (string | number)[];   // Si le paramètre a des valeurs fixes
}
interface ParametersTableProps {
  parameters: ParameterDefinition[];
}
const ParametersTable: React.FC<ParametersTableProps> = ({ parameters }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
      <thead className="bg-slate-50 dark:bg-slate-800">
        <tr>
          <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Name</th>
          <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Type</th>
          <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Description</th>
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-slate-800/30 divide-y divide-slate-200 dark:divide-slate-700">
        {parameters.map(param => (
          <tr key={param.name}>
            <td className="px-4 py-3 whitespace-nowrap text-sm">
              <code className="font-semibold text-slate-700 dark:text-slate-200">{param.name}</code>
              {param.required && <span className="ml-1 text-xs text-red-500 dark:text-red-400">(Required)</span>}
            </td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400"><code>{param.type}</code></td>
            <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                {param.description}
                {param.example && <div className="mt-1 text-xs text-slate-400 dark:text-slate-500">Example: <code>{param.example}</code></div>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
export default ParametersTable;