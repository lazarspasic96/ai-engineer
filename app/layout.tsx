import { Geist, Geist_Mono } from 'next/font/google';

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
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
