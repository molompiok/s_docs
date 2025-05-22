// s_docs/components/EndpointDisplay/CodeSnippet.tsx
import React from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { Copy, Check } from 'lucide-react'; // Pour un bouton de copie

interface CodeSnippetProps {
  code: string;
  language: string; // ex: 'json', 'javascript', 'bash', 'typescript'
  title?: string;
  showLineNumbers?: boolean;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({
  code,
  language,
  title,
  showLineNumbers = false,
}) => {
  const [isCopied, setIsCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2s
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  // Choisir un thème pour le mode clair et un pour le mode sombre
  // `themes` de prism-react-renderer contient plusieurs options (ex: themes.github, themes.vsDark)
  // Ici, on utilise un exemple simple. Tu peux le rendre dynamique avec ton toggle de mode sombre.
  const lightTheme = themes.github; // ou themes.oneLight
  const darkTheme = themes.vsDark; // ou themes.dracula

  // Pour cet exemple, on va juste utiliser le thème clair.
  // Tu adapteras cela avec ton contexte de mode sombre plus tard.
  const currentTheme = lightTheme; // Remplacer par une logique de détection du mode sombre

  return (
    <div className="my-6 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 shadow">
      {(title || language) && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 dark:border-slate-700">
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            {title || language}
          </span>
          <button
            onClick={handleCopy}
            className="text-xs text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center"
            title="Copy code"
          >
            {isCopied ? (
              <>
                <Check className="w-3.5 h-3.5 mr-1 text-emerald-500" /> Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 mr-1" /> Copy
              </>
            )}
          </button>
        </div>
      )}
      <Highlight
        theme={currentTheme}
        code={code.trim()}
        language={language as any} // prism-react-renderer attend un type plus spécifique, mais string fonctionne
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} p-4 text-sm leading-relaxed overflow-x-auto focus:outline-none`}
            style={style}
            // Permettre la sélection et la copie
            onMouseDown={(e) => e.stopPropagation()} // Pour éviter que le clic ne ferme un modal parent par exemple
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {showLineNumbers && (
                  <span className="text-slate-500 dark:text-slate-600 mr-4 select-none">
                    {i + 1}
                  </span>
                )}
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default CodeSnippet;


// pour chaque  href genere la page de documentation ( react) (le reste sera fait apres le mvp)
// j'ai modifier les href /api/server/auth/register-owner =>  /api/server/auth/register-owner-react

// ca serra long et methodique mais on va y arriver.. pour chaque fichier un contenu claire et complet est requis.

// nous ferons le tout de tous les namespaces (l'api acepte l'autentification par sessions ou token )