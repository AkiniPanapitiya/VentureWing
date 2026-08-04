'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import {
  Bell,
  Database,
  Search,
  ShieldCheck,
  User,
  LogOut,
  LogIn,
  ChevronDown,
  Building
} from 'lucide-react';

export function Header() {
  const pathname = usePathname();
  const router = Router();
  const { user, isAuthenticated, logout } = useAuthContext();

  const getBreadcrumb = () => {
    switch (pathname) {
      case '/dashboard':
        return 'Workspace Command Center';
      case '/ingestion':
        return 'Agent 01 CAD Vision Ingestion';
      case '/suppliers':
        return 'Supplier Matching Matrix';
      case '/tariff':
        return 'Agent 02 Sri Lanka Customs Tax Engine';
      case '/outbox':
        return 'Agent 03 HITL Negotiation Station';
      case '/orders':
        return 'Confirmed PO #882 Lifecyle Tracker';
      case '/team':
        return 'Technical Architecture & Team Aviate';
      case '/login':
        return 'User Authentication Login';
      case '/signup':
        return 'Enterprise Signup';
      default:
        return 'Overview';
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      {/* Route Title & Breadcrumb */}
      <div className="flex items-center space-x-3">
        <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
          {getBreadcrumb()}
        </h2>
        <span className="bg-slate-100 text-slate-600 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-slate-200">
          PROD v3.1.0
        </span>
      </div>

      {/* Right Controls & User Info */}
      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <div className="relative hidden md:block w-56">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search HS codes or suppliers..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Live SQLite DB Status Badge */}
        <div className="flex items-center space-x-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-lg text-xs font-semibold">
          <Database className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
          <span>SQLite DB: Connected</span>
        </div>

        {/* User Profile dropdown */}
        {isAuthenticated && user ? (
          <div className="flex items-center space-x-3 pl-2 border-l border-slate-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-sm">
                {user.full_name[0]}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-slate-900 leading-tight">{user.full_name}</p>
                <p className="text-[10px] text-slate-500 font-medium">{user.company_name}</p>
              </div>
            </div>

            <button
              onClick={() => {
                logout();
                router.push('/login');
              }}
              title="Logout session"
              className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
            <Link
              href="/login"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 px-3 py-1.5 rounded-lg border border-indigo-200 hover:bg-indigo-50 transition-colors"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

function Router() {
  return useRouter();
}
