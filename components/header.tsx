'use client';

import React, { useState } from 'react';
import { Search, Bell, Moon, RefreshCw, Key, Check, FolderGit2, Database } from 'lucide-react';

export const Header: React.FC = () => {
  const [apiKeyActive, setApiKeyActive] = useState<boolean>(true);
  const [selectedProject, setSelectedProject] = useState<string>('Summer 24 Collection');

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 h-16 sticky top-0 z-20 flex items-center justify-between px-8 transition-all">
      {/* Left: Project Selector & Live Agents Pill */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="flex items-center space-x-2 bg-slate-100/80 border border-slate-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg cursor-pointer hover:bg-slate-200/60 transition-colors">
            <FolderGit2 className="w-3.5 h-3.5 text-indigo-600" />
            <span>{selectedProject}</span>
          </div>
        </div>

        <div className="hidden sm:flex items-center space-x-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 px-2.5 py-1 rounded-full text-[11px] font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>3 Agents Active</span>
        </div>

        {/* SQLite Database Connected Badge */}
        <div className="hidden lg:flex items-center space-x-1.5 bg-indigo-50 border border-indigo-200 text-indigo-800 px-2.5 py-1 rounded-full text-[11px] font-bold font-mono">
          <Database className="w-3 h-3 text-indigo-600" />
          <span>SQLite DB: Connected (venturewing.db)</span>
        </div>
      </div>

      {/* Right: Search, Key Toggle & User Quick Controls */}
      <div className="flex items-center space-x-3">
        {/* Search Bar */}
        <div className="relative hidden md:block w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search briefs, HS codes..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Live API Key Toggle Button */}
        <button
          onClick={() => setApiKeyActive(!apiKeyActive)}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
            apiKeyActive
              ? 'bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100'
              : 'bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100'
          }`}
          title="Toggle Gemini API Live / Sandbox mode"
        >
          <Key className="w-3.5 h-3.5" />
          <span>{apiKeyActive ? 'Gemini API: Live' : 'API: Sandbox'}</span>
          {apiKeyActive && <Check className="w-3 h-3 text-indigo-600" />}
        </button>

        {/* Action Icons */}
        <div className="flex items-center space-x-1 text-slate-500 border-l border-slate-200 pl-3">
          <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors" title="Notifications">
            <Bell className="w-4 h-4" />
          </button>
          <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors" title="Theme">
            <Moon className="w-4 h-4" />
          </button>
          <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors" title="Refresh Sync">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
