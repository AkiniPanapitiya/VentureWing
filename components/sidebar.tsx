'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileSearch,
  Layers,
  Calculator,
  Send,
  PackageCheck,
  Users,
  Plus,
  HelpCircle,
  FileText,
  User,
  Sparkles
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Workspace', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Brief Ingestion', href: '/ingestion', icon: FileSearch },
    { name: 'Supplier Discovery', href: '/suppliers', icon: Layers },
    { name: 'Tariff Engine', href: '/tariff', icon: Calculator },
    { name: 'Negotiator Outbox', href: '/outbox', icon: Send },
    { name: 'Confirmed Orders', href: '/orders', icon: PackageCheck },
    { name: 'Team & Architecture', href: '/team', icon: Users },
  ];

  return (
    <aside className="w-[280px] bg-white border-r border-slate-200 h-screen fixed left-0 top-0 flex flex-col justify-between z-30 font-sans shadow-sm">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-950 to-indigo-700 tracking-tight">
                VentureWing
              </span>
              <p className="text-[11px] font-semibold text-slate-400 tracking-wide uppercase">
                Autonomous Sourcing
              </p>
            </div>
          </Link>
        </div>

        {/* CTA Button */}
        <div className="px-5 pt-5 pb-2">
          <Link
            href="/ingestion"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-sm shadow-indigo-100 group"
          >
            <Plus className="w-4 h-4 stroke-[2.5] group-hover:rotate-90 transition-transform" />
            <span className="text-sm font-semibold">New Brief</span>
          </Link>
        </div>

        {/* Main Navigation Links */}
        <nav className="px-3 py-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Info & User Profile */}
      <div className="p-4 border-t border-slate-100 space-y-3">
        <div className="space-y-1">
          <Link
            href="#"
            className="flex items-center space-x-3 px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
            <span>Help Center</span>
          </Link>
          <Link
            href="/team"
            className="flex items-center space-x-3 px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            <span>Documentation</span>
          </Link>
        </div>

        {/* User Card */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
            <User className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-900 truncate">User Workspace</p>
            <p className="text-[10px] text-slate-500 font-medium">Admin Level</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
