'use client';

import React from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { useSourcingContext } from '@/context/SourcingContext';
import {
  CheckCircle2,
  PackageCheck,
  Ship,
  Anchor,
  ArrowRight,
  Printer,
  Download,
  FileJson,
  ShieldCheck,
  Building2
} from 'lucide-react';

export default function OrdersPage() {
  const { briefState } = useSourcingContext();

  const contractId = briefState.negotiation?.contractId || 'PO-2026-LK-882';
  const targetFob = briefState.negotiation?.targetFob || 3.85;
  const supplierName = briefState.matchedSupplier.name;

  const handlePrint = () => {
    window.print();
  };

  const handleExportJson = () => {
    const poPayload = {
      contract_id: contractId,
      project_name: briefState.projectName,
      category: briefState.category,
      fabric_type: briefState.fabricType,
      gsm: briefState.gsm,
      hs_code: briefState.hsCode,
      agreed_unit_fob_usd: targetFob,
      freight_mode: briefState.freightMode,
      total_units: 50000,
      total_contract_usd: targetFob * 50000 + (briefState.tariffResult?.totalLandedUsd || 38645.0),
      landed_cost_summary: briefState.tariffResult,
      supplier: briefState.matchedSupplier,
      signed_by_user: true,
      issued_at: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(poPayload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${contractId}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const steps = [
    { name: '1. Brief Parsed', status: 'COMPLETE', date: 'Parsed via Agent 01' },
    { name: '2. Tariff Calculated', status: 'COMPLETE', date: `HS ${briefState.hsCode} RAG` },
    { name: '3. AI Negotiated', status: 'COMPLETE', date: `FOB agreed at $${targetFob.toFixed(2)}` },
    { name: '4. Port Transit 🚚', status: 'ACTIVE', date: 'Ningbo ➔ Colombo' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex print:bg-white print:m-0">
      {/* Fixed 280px Left Sidebar */}
      <div className="print:hidden">
        <Sidebar />
      </div>

      {/* Main Canvas Area */}
      <div className="ml-[280px] print:ml-0 flex-1 flex flex-col min-w-0">
        <div className="print:hidden">
          <Header />
        </div>

        <main className="p-8 max-w-7xl w-full mx-auto space-y-8">
          {/* Top Green Success Banner */}
          <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0 shadow-md">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-black uppercase text-emerald-800 tracking-wider">
                  Purchase Order Confirmed & Authorized
                </span>
                <h2 className="text-lg font-extrabold text-emerald-950 mt-0.5">
                  ✓ Supplier Agreed to ${targetFob.toFixed(2)}/unit FOB ({supplierName})
                </h2>
                <p className="text-xs text-emerald-700 mt-1 font-medium">
                  {supplierName} accepted counter-offer. Digital Purchase Order #{contractId} generated.
                </p>
              </div>
            </div>

            {/* Functional Print & JSON Export Buttons */}
            <div className="flex items-center space-x-2 print:hidden shrink-0">
              <button
                onClick={handlePrint}
                className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center space-x-2 transition-all shadow-xs"
                title="Print official PO"
              >
                <Printer className="w-3.5 h-3.5 text-slate-600" />
                <span>Print PO</span>
              </button>

              <button
                onClick={handleExportJson}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center space-x-2 transition-all shadow-sm"
                title="Download JSON Spec Sheet"
              >
                <FileJson className="w-3.5 h-3.5" />
                <span>Export PO (JSON)</span>
              </button>
            </div>
          </div>

          {/* Header Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <PackageCheck className="w-6 h-6 text-indigo-600" />
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Final Quote #{contractId} — CONTRACT NEGOTIATED
                </h1>
              </div>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Contract ID: <span className="font-mono font-bold text-slate-900">{contractId}</span> | Total Quantity:{' '}
                <span className="font-bold text-slate-900">50,000 Units</span>
              </p>
            </div>
          </div>

          {/* 4-Step Sourcing Lifecycle Stepper */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">
              Sourcing Lifecycle Stepper
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
              {steps.map((step) => (
                <div
                  key={step.name}
                  className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                    step.status === 'COMPLETE'
                      ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                      : 'bg-indigo-50/80 border-indigo-300 text-indigo-950 ring-2 ring-indigo-500/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black uppercase tracking-wider">{step.name}</span>
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                        step.status === 'COMPLETE'
                          ? 'bg-emerald-200 text-emerald-900'
                          : 'bg-indigo-600 text-white'
                      }`}
                    >
                      {step.status}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-600 mt-1">{step.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Live Sea Freight Shipping Tracker Card */}
          <div className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400 font-bold">
                  <Ship className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                    <span>Live Freight Transit ({briefState.freightMode.toUpperCase()})</span>
                    <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 font-mono px-2 py-0.5 rounded">
                      VESSEL: EVER GIVEN V-102
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Ningbo Port (CN) ➔ Colombo International Container Terminal (LK)
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  Estimated Customs Arrival
                </span>
                <span className="text-base font-mono font-bold text-emerald-400">
                  {briefState.freightMode === 'air' ? 'Aug 06, 2026 (Air Express)' : 'Aug 18, 2026 (Sea Freight)'}
                </span>
              </div>
            </div>

            {/* Visual Route Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center text-slate-200">
                  <Anchor className="w-3.5 h-3.5 mr-1 text-indigo-400" /> Ningbo Port, CN (Departed)
                </span>
                <span className="text-indigo-300 font-bold">In Transit (62%)</span>
                <span className="flex items-center text-slate-200">
                  <Anchor className="w-3.5 h-3.5 mr-1 text-emerald-400" /> Colombo Port, LK (Dest)
                </span>
              </div>

              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 border border-slate-700">
                <div className="bg-gradient-to-r from-indigo-500 via-indigo-400 to-emerald-400 h-full rounded-full w-[62%] animate-pulse"></div>
              </div>
            </div>

            {/* PO Summary Table */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800 text-xs font-mono">
              <div>
                <span className="text-slate-400 block">Unit Cost (Agreed FOB)</span>
                <span className="text-white font-bold text-sm">${targetFob.toFixed(2)} USD</span>
              </div>
              <div>
                <span className="text-slate-400 block">Total Contract FOB</span>
                <span className="text-white font-bold text-sm">
                  ${(targetFob * 50000).toLocaleString('en-US')} USD
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">HS Code Tariff Category</span>
                <span className="text-emerald-400 font-bold text-sm">{briefState.hsCode}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Human Sign-off</span>
                <span className="text-indigo-300 font-bold text-sm">Verified ✓</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
