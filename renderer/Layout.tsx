// renderer/Layout.tsx
export { Layout };

import React from 'react';
import { PageContextProvider } from './usePageContext';
import type { PageContext } from 'vike/types';
import { ApiLayout } from './ApiLayout';

function Layout({ children, pageContext }: { children: React.ReactNode; pageContext: PageContext }) {

  const { urlPathname } = pageContext;
  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <ApiLayout pageContext={pageContext} children={children} />
      </PageContextProvider>
    </React.StrictMode>
  );
}

