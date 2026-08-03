import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'VentureWing | Autonomous Global Sourcing & Sri Lanka Customs Intelligence',
  description: 'AI-powered B2B procurement platform for boutique brands, calculating real-time Sri Lanka tariffs and negotiating directly with suppliers.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="bg-slate-50 text-slate-900 min-h-screen font-sans flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
