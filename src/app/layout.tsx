import * as React from 'react';
import type { Viewport } from 'next';

import '@/styles/global.css';

import { UserProvider } from '@/contexts/user-context';
import { LocalizationProvider } from '@/components/core/localization-provider';
import { ThemeProvider } from '@/components/core/theme-provider/theme-provider';
import Head from 'next/head';

export const viewport = { width: 'device-width', initialScale: 1 } satisfies Viewport;

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <html lang="en">
      <Head>
        <title>Account | Dashboard</title>
        <meta name="description" content="Your site description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <LocalizationProvider>
          <UserProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </UserProvider>
        </LocalizationProvider>
        <LiveContactButton />
      </body>
    </html>
  );
}

function LiveContactButton() {
  return (
    <div className="live-contact-button">
      <a href="https://zalo.me/0834170617" target="_blank" rel="noopener noreferrer">
        <img src="/assets/zalo.png" alt="Live Contact" />
      </a>
    </div>
  );
}
