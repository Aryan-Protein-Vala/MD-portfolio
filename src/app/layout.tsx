import type { Metadata } from 'next';
import '@/styles/spatial.css';
import '@/styles/typography.css';
import '@/styles/textures.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aryan Sharma — Spatial Portfolio Exhibition',
  description:
    'Systems engineer. Creative technologist. Builder of intelligent infrastructure and unconventional digital experiences.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      style={
        {
          '--font-display':
            '"Helvetica Neue", "Arial Narrow", "Impact", "Futura", -apple-system, BlinkMacSystemFont, sans-serif',
          '--font-sans':
            '"Plus Jakarta Sans", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          '--font-mono':
            '"JetBrains Mono", "SF Mono", "Menlo", "Monaco", "Consolas", monospace',
          '--font-editorial':
            '"Cormorant Garamond", "Iowan Old Style", "Baskerville", "Georgia", serif',
        } as React.CSSProperties
      }
    >
      <body>{children}</body>
    </html>
  );
}
