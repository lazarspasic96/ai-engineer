import { Geist, Geist_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';

import { ThemeProvider } from '@/components/theme/theme-provider';

import type { Metadata } from 'next';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ai-engineer.sh'),
  title: {
    default: 'ai-engineer.sh',
    template: '%s | ai-engineer.sh',
  },
  description: 'Learn AI engineering from the ground up',
  openGraph: {
    type: 'website',
    siteName: 'ai-engineer.sh',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <NextIntlClientProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
