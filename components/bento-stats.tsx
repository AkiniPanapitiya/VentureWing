'use client';

import React from 'react';
import { Briefcase, MessageSquare, TrendingUp, DollarSign, ArrowUpRight } from 'lucide-react';

export const BentoStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Card 1: Active Briefs */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Projects</span>
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Briefcase className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-4xl font-black text-slate-900 tracking-tight">4</span>
          <span className="text-xs font-semibold text-emerald-600 flex items-center">
            <ArrowUpRight className="w-3 h-3 mr-0.5" /> +1 this month
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-2 font-medium">Cotton Tee V2, Denim XL & 2 active RFQs</p>
      </div>

      {/* Card 2: Supplier Replies */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Supplier Replies</span>
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <MessageSquare className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-4xl font-black text-slate-900 tracking-tight">12</span>
          <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
            3 urgent
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-2 font-medium">Zhejiang Apparel counter-offer pending</p>
      </div>

      {/* Card 3: Est. Tariff Savings (Highlighted) */}
      <div className="bg-gradient-to-br from-indigo-900 to-slate-900 p-6 rounded-2xl border border-indigo-950 text-white shadow-md relative overflow-hidden group">
        <div className="absolute right-0 top-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="flex items-center justify-between mb-4 relative z-10">
          <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Est. Duty/Tariff Savings</span>
          <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center backdrop-blur-sm border border-indigo-400/30">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline space-x-1 relative z-10">
          <span className="text-xs font-bold text-emerald-400 mr-1">LKR</span>
          <span className="text-3xl font-black text-white tracking-tight">450,000</span>
        </div>
        <p className="text-xs text-indigo-200/80 mt-2 font-medium flex items-center space-x-1 relative z-10">
          <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
          <span>Optimized via Sri Lanka Tariff Engine</span>
        </p>
      </div>
    </div>
  );
};
