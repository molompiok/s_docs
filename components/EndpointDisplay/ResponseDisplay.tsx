// s_docs/components/EndpointDisplay/ResponseDisplay.tsx
import React, { ReactNode } from 'react';
import CodeSnippet from './CodeSnippet';
import ParametersTable, { ParameterDefinition } from './ParametersTable'; // Importer ParametersTable

export interface ResponseDefinition {
  statusCode: number;
  description: ReactNode;
  contentType?: string;
  schema?: object; // Pour affichage détaillé du schéma (futur)
  exampleJson?: string;
  headers?: ParameterDefinition[]; // NOUVEAU
}

const ResponseDisplay: React.FC<ResponseDefinition> = ({
  statusCode,
  description,
  contentType,
  exampleJson,
  schema, // Gardé pour futur usage
  headers, // NOUVEAU
}) => { const statusColors: Record<number, string> = {
    200: 'text-emerald-600 dark:text-emerald-400', 201: 'text-emerald-600 dark:text-emerald-400',
    204: 'text-sky-600 dark:text-sky-400',
    400: 'text-amber-600 dark:text-amber-400', 401: 'text-red-600 dark:text-red-400',
    403: 'text-red-600 dark:text-red-400', 404: 'text-violet-600 dark:text-violet-400',
    500: 'text-rose-600 dark:text-rose-400',
  };
  return (
    <div className="py-4 my-3 border-t border-slate-200 dark:border-slate-700 first-of-type:border-t-0 first-of-type:pt-0">
      <h4 className={`text-md font-semibold ${statusColors[statusCode] || 'text-slate-700 dark:text-slate-200'}`}>
        {statusCode} <span className="text-slate-500 dark:text-slate-400 font-normal">- {description}</span>
      </h4>
      
      {contentType && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-2">
          Content-Type: <code>{contentType}</code>
        </p>
      )}

      {/* NOUVEAU: Affichage des Headers de Réponse */}
      {headers && headers.length > 0 && (
        <div className="my-3">
          <h5 className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Response Headers:</h5>
          <ParametersTable parameters={headers} />
        </div>
      )}

      {exampleJson && (
        <div className="my-3">
          <h5 className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Example Response Body:</h5>
          <CodeSnippet language="json" code={exampleJson} />
        </div>
      )}
      {/* TODO: Ajouter affichage du schéma JSON détaillé si `schema` est fourni */}
    </div>
  );
};
export default ResponseDisplay;