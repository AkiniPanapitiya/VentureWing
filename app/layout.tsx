import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SourcingProvider } from '@/context/SourcingContext';
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VentureWing — Autonomous B2B Sourcing & Sri Lanka Customs Intelligence',
  description: 'Team Aviate submission for IDEALIZE 2026 Hackathon Open Category',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-slate-50">
      <body className={`${inter.className} min-h-screen antialiased text-slate-900 bg-slate-50`}>
        <AuthProvider>
          <SourcingProvider>
            {children}
          </SourcingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
