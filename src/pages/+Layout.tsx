import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import React, { type ReactNode } from 'react';
// eslint-disable-next-line import/no-unassigned-import
import './Layout.css';

export const Layout = ({ children }: { readonly children: ReactNode }) => {
  return (
    <React.StrictMode>
      <meta charSet="utf8" />
      <link
        href="/images/logos/the-finals-logo-symbol.crop.png"
        rel="icon"
        type="image/svg+xml"
      />
      <meta
        content="width=device-width, initial-scale=1.0"
        name="viewport"
      />
      <link
        href="https://fonts.googleapis.com"
        rel="preconnect"
      />
      <link
        href="https://fonts.gstatic.com"
        rel="preconnect"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@100;200;300;400;500;600;700;800;900&family=Saira+Extra+Condensed:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      <main className="w-screen min-h-screen relative">
        <Header />
        {children}
        <Footer />
      </main>
    </React.StrictMode>
  );
};
