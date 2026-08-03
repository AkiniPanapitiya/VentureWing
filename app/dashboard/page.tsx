'use client';

import React from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { BentoStats } from '@/components/bento-stats';
import {
  FileText,
  ArrowRight,
  Sparkles,
  Filter,
  Download,
  Plus,
  BarChart2,
  Clock,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export default function DashboardPage() {
  const recentBriefs = [
    {
      id: 'brief-01',
      name: 'Cotton Tee V2',
      category: 'Apparel / Essentials',
      date: '2 hours ago',
      status: 'SPECS PARSED',
      statusColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      actionUrl: '/ingestion',
    },
    {
      id: 'brief-02',
      name: 'Denim Jacket XL',
      category: 'Outerwear',
      date: '6 hours ago',
      status: 'TARIFF ESTIMATED',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      actionUrl: '/tariff',
    },
    {
      id: 'brief-03',
      name: 'Linen Shirt Summer',
      category: 'Essentials',
      date: 'Yesterday',
      status: 'AWAITING EMAIL APPROVAL',
      statusColor: 'bg-amber-50 text-amber-800 border-amber-300',
      actionUrl: '/outbox',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Fixed 280px Left Sidebar */}
      <Sidebar />

      {/* Main Canvas Area */}
      <div className="ml-[280px] flex-1 flex flex-col min-w-0">
        <Header />

        <main className="p-8 max-w-7xl w-full mx-auto space-y-8">
          {/* Top Title Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Workspace Command Center</h1>
                <span className="bg-indigo-50 text-indigo-700 text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border border-indigo-200">
                  Live Dashboard
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Monitor multi-agent ingestion, tariff calculations, and pending supplier dispatches.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <Link
                href="/ingestion"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center space-x-2 transition-all shadow-sm shadow-indigo-100"
              >
                <Sparkles className="w-4 h-4 text-indigo-200" />
                <span>Run Agent 01 Ingestion</span>
              </Link>
            </div>
          </div>

          {/* Bento Stats Metric Grid Component */}
          <BentoStats />

          {/* Table & Landed Cost Visualizer Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Briefs Table (2 Columns wide) */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Recent Sourcing Briefs</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Active tech pack processing pipeline</p>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors">
                    <Filter className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors">
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100">
                    <tr>
                      <th className="py-3 px-4">Project Name</th>
                      <th className="py-3 px-4">Last Activity</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {recentBriefs.map((brief) => (
                      <tr key={brief.id} className="hover:bg-slate-50/80 transition-colors group">
                        <td className="py-4 px-4">
                          <div className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">
                            {brief.name}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5 font-medium">
                            {brief.category}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-slate-500 font-medium">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span>{brief.date}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border ${brief.statusColor}`}
                          >
                            {brief.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <Link
                            href={brief.actionUrl}
                            className="inline-flex items-center space-x-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors"
                          >
                            <span>Inspect</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Landed Cost Breakdown Card (1 Column wide) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-slate-900">Landed Cost Visualizer</h3>
                  <BarChart2 className="w-5 h-5 text-indigo-600" />
                </div>
                <p className="text-xs text-slate-500 mb-6">Unit Cost Breakdown for Cotton Tee V2</p>

                {/* Simulated Stacked Bar Chart */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-600">Base FOB Price</span>
                      <span className="font-mono font-bold text-slate-900">$4.25 (55%)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-indigo-600 h-full rounded-full w-[55%]"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-600">Customs Duty & Levies (PAL, CESS, VAT)</span>
                      <span className="font-mono font-bold text-slate-900">$7.47 (30%)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full w-[30%]"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-600">Sea Freight</span>
                      <span className="font-mono font-bold text-slate-900">$1.10 (15%)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full w-[15%]"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100">
                <Link
                  href="/tariff"
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center space-x-2 transition-colors"
                >
                  <span>Full Tariff Breakdown</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
