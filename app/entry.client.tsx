import { RemixBrowser } from '@remix-run/react';
import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';

startTransition(() => {
  if (process.env.NODE_ENV === 'development') {
    require('react-dom').hydrate(<RemixBrowser />, document);
  } else {
    hydrateRoot(
      document,
      <StrictMode>
        <RemixBrowser />
      </StrictMode>
    );
  }
});
