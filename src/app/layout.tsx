// Toutes les pages de l'app dépendent de la session auth → rendu dynamique
export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Navbar } from '@/components/ui/Navbar';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Otaku Shop',
  description: 'Mangas, webtoons et BD — en ligne et en streaming',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable}`}>
      {/* Script anti-flash : appliqué avant le premier paint */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){var t=localStorage.getItem('otaku_theme')||'dark';document.documentElement.setAttribute('data-theme',t);})();` }} />
      </head>
      <body className="min-h-screen antialiased">
        <Navbar />
        <main>{children}</main>
        <ThemeToggle />
      </body>
    </html>
  );
}
