// components/EndpointDisplay/CodeExamplesTabs.tsx
import React, { useEffect, useState } from 'react';
import CodeSnippet from './CodeSnippet';

export interface CodeExample {
  language: string;
  title?: string;
  code: string;
}

interface Props {
  examples: CodeExample[];
  storageKey?: string;
}

const CodeExamplesTabs: React.FC<Props> = ({ examples, storageKey = 'preferredLang' }) => {
  const [selectedLang, setSelectedLang] = useState<string>(examples[0].language);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved && examples.some(ex => ex.language === saved)) {
      setSelectedLang(saved);
    }
  }, [examples, storageKey]);

  const handleSelect = (lang: string) => {
    setSelectedLang(lang);
    localStorage.setItem(storageKey, lang);
  };

  const selectedExample = examples.find(ex => ex.language === selectedLang);

  return (
    <div>
      <div className="mb-3 flex gap-2 flex-wrap">
        {examples.map((ex) => (
          <button
            key={ex.language}
            onClick={() => handleSelect(ex.language)}
            className={`px-3 py-1 rounded border text-sm ${
              ex.language === selectedLang
                ? 'bg-slate-800 text-white'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            {ex.title || ex.language}
          </button>
        ))}
      </div>

      {selectedExample && (
        <CodeSnippet
          language={selectedExample.language}
          title={selectedExample.title}
          code={selectedExample.code}
        />
      )}
    </div>
  );
};

export default CodeExamplesTabs;
