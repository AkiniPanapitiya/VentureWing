'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { SupplierCard } from '@/components/supplier-card';
import { Layers, Sparkles, Filter, Search, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function SuppliersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('ALL');

  const suppliers = [
    {
      id: 'zhejiang',
      name: 'Zhejiang Apparel Tech Co.',
      country: 'China',
      location: 'Hangzhou',
      matchScore: 98,
      fobPrice: 4.25,
      landedCostUsd: 15.38,
      landedCostLkr: 4774,
      leadTime: '14 Days (Sea)',
      capacity: '500k units/mo',
      recommended: true,
    },
    {
      id: 'texvanguard',
      name: 'Tex Vanguard Solutions',
      country: 'Vietnam',
      location: 'Ho Chi Minh',
      matchScore: 85,
      fobPrice: 3.90,
      landedCostUsd: 14.80,
      landedCostLkr: 4595,
      leadTime: '21 Days (Sea)',
      capacity: '250k units/mo',
    },
    {
      id: 'ceylonhub',
      name: 'Ceylon Garments Hub',
      country: 'Sri Lanka',
      location: 'Colombo',
      matchScore: 78,
      fobPrice: 5.10,
      landedCostUsd: 5.10,
      landedCostLkr: 1583,
      leadTime: '4 Days (Express Domestic)',
      capacity: '50k units/mo',
      isZeroDuty: true,
    },
  ];

  const filteredSuppliers = suppliers.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.country.toLowerCase().includes(searchTerm.toLowerCase());
    if (selectedFilter === 'ZERO_DUTY') return matchesSearch && s.isZeroDuty;
    if (selectedFilter === 'HIGH_MATCH') return matchesSearch && s.matchScore >= 90;
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Fixed 280px Left Sidebar */}
      <Sidebar />

      {/* Main Canvas Area */}
      <div className="ml-[280px] flex-1 flex flex-col min-w-0">
        <Header />

        <main className="p-8 max-w-7xl w-full mx-auto space-y-8">
          {/* Top Title & Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="bg-indigo-100 text-indigo-800 text-xs font-mono font-bold px-2.5 py-0.5 rounded-md">
                  Agent 01 Matrix
                </span>
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Supplier Discovery & Matching Matrix
                </h1>
              </div>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Target Project: <span className="font-bold text-slate-900">Cotton Tee V2</span> (220 GSM Cotton Canvas)
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <Link
                href="/tariff"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-5 rounded-xl text-xs flex items-center space-x-2 transition-all shadow-sm shadow-indigo-100"
              >
                <span>Calculate Sri Lanka Tariff</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter suppliers by name or country..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center space-x-2 w-full md:w-auto">
              <button
                onClick={() => setSelectedFilter('ALL')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedFilter === 'ALL'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Suppliers ({suppliers.length})
              </button>
              <button
                onClick={() => setSelectedFilter('HIGH_MATCH')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedFilter === 'HIGH_MATCH'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Match &gt; 90%
              </button>
              <button
                onClick={() => setSelectedFilter('ZERO_DUTY')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedFilter === 'ZERO_DUTY'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Zero Duty Local
              </button>
            </div>
          </div>

          {/* 3-Column Supplier Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredSuppliers.map((supplier) => (
              <SupplierCard key={supplier.id} {...supplier} />
            ))}
          </div>

          {/* AI Insights Bar */}
          <div className="bg-indigo-900 text-white rounded-2xl p-6 border border-indigo-950 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-md">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300 font-bold shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Agent 01 Strategic Recommendation</h4>
                <p className="text-xs text-indigo-200 mt-0.5 font-medium">
                  Zhejiang Apparel Tech Co. offers the highest spec match (98%) for 220 GSM Organic Cotton. Proceed to Agent 02 Tariff Engine for itemized CID, PAL, CESS, and VAT taxation.
                </p>
              </div>
            </div>

            <Link
              href="/tariff?supplier=zhejiang"
              className="bg-white text-indigo-900 hover:bg-indigo-50 font-bold py-2.5 px-5 rounded-xl text-xs shrink-0 transition-colors shadow-sm"
            >
              Analyze Zhejiang Tariffs
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
