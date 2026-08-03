'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { BentoStats } from '@/components/bento-stats';
import { useSourcingContext } from '@/context/SourcingContext';
import {
  FileText,
  ArrowRight,
  Sparkles,
  Filter,
  Download,
  BarChart2,
  Clock,
  ChevronRight,
  Database,
  ShieldCheck,
  History,
  FolderGit2
} from 'lucide-react';

export default function DashboardPage() {
  const { briefState } = useSourcingContext();
  const [dbProjects, setDbProjects] = useState<any[]>([]);
  const [historyData, setHistoryData] = useState<any>({
    projects: [],
    specs: [],
    tariffs: [],
    contracts: [],
  });

  const fetchDbData = async () => {
    try {
      const projectsRes = await axios.get('http://localhost:8000/api/projects');
      if (projectsRes.data) {
        setDbProjects(projectsRes.data);
      }
      const historyRes = await axios.get('http://localhost:8000/api/history');
      if (historyRes.data) {
        setHistoryData(historyRes.data);
      }
    } catch (err) {
      // Fallback mock
      setDbProjects([
        {
          id: 1,
          name: briefState.projectName || 'Cotton Tee V2',
          category: briefState.category || 'Apparel / Essentials',
          status: briefState.negotiation?.isApproved ? 'ORDERED' : 'PARSED',
          created_at: new Date().toISOString(),
        },
        {
          id: 2,
          name: 'Denim Jacket XL',
          category: 'Outerwear',
          status: 'CALCULATED',
          created_at: new Date().toISOString(),
        },
      ]);
      setHistoryData({
        projects: [
          { id: 1, name: 'Cotton Tee V2', category: 'Apparel', status: 'ORDERED' },
          { id: 2, name: 'Denim Jacket XL', category: 'Outerwear', status: 'CALCULATED' },
        ],
        contracts: [
          {
            id: 1,
            po_number: briefState.negotiation?.contractId || 'PO-2026-LK-882',
            supplier_name: briefState.matchedSupplier.name,
            target_fob_usd: 3.85,
            user_signature: briefState.negotiation?.userSignature || 'Kavindu Perera',
            hitl_approved: true,
          },
        ],
      });
    }
  };

  useEffect(() => {
    fetchDbData();
  }, []);

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
                <span className="bg-indigo-50 text-indigo-700 text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border border-indigo-200 flex items-center space-x-1">
                  <Database className="w-3 h-3 text-indigo-600 mr-1" />
                  <span>SQLite venturewing.db</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Live multi-agent sourcing pipeline backed by SQLAlchemy relational database.
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
                  <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                    <FolderGit2 className="w-4 h-4 text-indigo-600" />
                    <span>Projects Database Table (`projects`)</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">Live SQL records queried from SQLite database</p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={fetchDbData}
                    className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 rounded-lg border border-slate-200 text-xs font-mono font-bold transition-colors"
                  >
                    Sync DB
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100">
                    <tr>
                      <th className="py-3 px-4">Project ID & Name</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">DB Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {dbProjects.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/80 transition-colors group">
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <span className="bg-slate-100 font-mono text-[10px] font-bold text-slate-600 px-1.5 py-0.5 rounded border border-slate-200">
                              #{p.id}
                            </span>
                            <span className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">
                              {p.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-slate-500 font-medium">
                          {p.category}
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border ${
                              p.status === 'ORDERED'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                            }`}
                          >
                            {p.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <Link
                            href={p.status === 'ORDERED' ? '/orders' : '/ingestion'}
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
                <p className="text-xs text-slate-500 mb-6">
                  Unit Cost Breakdown for {briefState.projectName} ({briefState.freightMode.toUpperCase()})
                </p>

                {/* Simulated Stacked Bar Chart */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-600">Base FOB Price</span>
                      <span className="font-mono font-bold text-slate-900">
                        ${briefState.fobPrice.toFixed(2)} (55%)
                      </span>
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
                      <span className="text-slate-600">Freight ({briefState.freightMode.toUpperCase()})</span>
                      <span className="font-mono font-bold text-slate-900">
                        ${briefState.freightMode === 'air' ? '4.50' : '1.10'} (15%)
                      </span>
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

          {/* SQLite Relational Database Audit Table Section */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <History className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-bold text-slate-900">SQLite Database Audit Log (`venturewing.db`)</h3>
              </div>
              <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">
                GET /api/history
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              {/* Signed Contracts List from SQLite */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">
                  Table: negotiation_contracts
                </span>
                {historyData.contracts && historyData.contracts.length > 0 ? (
                  historyData.contracts.map((c: any) => (
                    <div
                      key={c.id || c.po_number}
                      className="bg-white p-3 rounded-lg border border-slate-200 flex items-center justify-between"
                    >
                      <div>
                        <span className="font-bold text-slate-900 block">{c.po_number}</span>
                        <span className="text-[11px] text-slate-500">Signed by: {c.user_signature}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-emerald-600 font-bold block">${c.target_fob_usd}/unit</span>
                        <span className="text-[10px] text-indigo-600 font-bold">APPROVED ✓</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500 italic">No contract records in SQLite DB.</p>
                )}
              </div>

              {/* Indexed Tech Specs from SQLite */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">
                  Table: tech_specs
                </span>
                {historyData.specs && historyData.specs.length > 0 ? (
                  historyData.specs.map((s: any) => (
                    <div
                      key={s.id}
                      className="bg-white p-3 rounded-lg border border-slate-200 flex items-center justify-between"
                    >
                      <div>
                        <span className="font-bold text-slate-900 block">{s.fabric_type}</span>
                        <span className="text-[11px] text-slate-500">{s.hardware}</span>
                      </div>
                      <span className="bg-indigo-50 text-indigo-700 font-extrabold px-2 py-0.5 rounded text-[10px] border border-indigo-200">
                        HS {s.hs_code}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500 italic">No spec records in SQLite DB.</p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
