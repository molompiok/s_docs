// s_docs/components/EndpointDisplay/SecurityInfo.tsx
import React, { ReactNode } from 'react';
import { KeyRound, Lock } from 'lucide-react'; // Ajout de Lock pour les permissions

interface SecurityInfoProps {
  type: string;
  description?: ReactNode;
  permissionsRequired?: string[]; // Liste des permissions (clés de TypeJsonRole)
  abilitiesRequired?: string[]; // Liste des abilities Bouncer
}

const SecurityInfo: React.FC<SecurityInfoProps> = ({
  type,
  description,
  permissionsRequired,
  abilitiesRequired,
}) => {
  const hasPermissions = permissionsRequired && permissionsRequired.length > 0;
  const hasAbilities = abilitiesRequired && abilitiesRequired.length > 0;

  return (
    <div className="my-6 p-4 bg-sky-50 dark:bg-sky-900/50 rounded-lg border border-sky-200 dark:border-sky-500/30 shadow-sm">
      <div className="flex items-center text-sky-700 dark:text-sky-300 mb-2">
        <KeyRound className="w-5 h-5 mr-2 flex-shrink-0" />
        <h3 className="text-md font-semibold">Authentication: {type}</h3>
      </div>
      {description && (
        <div className="text-sm text-sky-600 dark:text-sky-400 prose prose-sm dark:prose-invert max-w-none mb-3">
          {description}
        </div>
      )}

      {(hasPermissions || hasAbilities) && (
        <div className="mt-3 pt-3 border-t border-sky-200 dark:border-sky-700">
          <div className="flex items-center text-amber-700 dark:text-amber-400 mb-1">
            <Lock className="w-4 h-4 mr-2 flex-shrink-0" />
            <h4 className="text-sm font-semibold">Required Permissions/Abilities:</h4>
          </div>
          <ul className="list-disc list-inside pl-1 text-sm text-amber-600 dark:text-amber-500 space-y-0.5">
            {permissionsRequired?.map((perm) => (
              <li key={perm}>
                Permission: <code>{perm}</code>
              </li>
            ))}
            {abilitiesRequired?.map((ability) => (
              <li key={ability}>
                Ability: <code>{ability}</code>
              </li>
            ))}
          </ul>
           <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            These are checked using the Bouncer authorization service. Ensure the authenticated user/collaborator has the necessary roles.
          </p>
        </div>
      )}
    </div>
  );
};

export default SecurityInfo;