'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import apiClient from '@/lib/api';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { TariffTable } from '@/components/tariff-table';
import { useSourcingContext } from '@/context/SourcingContext';
import {
  Calculator,
  Search,
  Plane,
  Ship,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';

function TariffContent() {
  const searchParams = useSearchParams();
  const supplierQuery = searchParams.get('supplier');

  const { briefState, setLandedCostCalculation } = useSourcingContext();
  const [selectedHsCode, setSelectedHsCode] = useState<string>(briefState.parsedHsCode || '5208.11.00');
  const [hsCodesList, setHsCodesList] = useState<any[]>([]);
  const [fobRate, setFobRate] = useState<number>(supplierQuery === 'ceylonhub' ? 5.10 : 4.25);
  const [units, setUnits] = useState<number>(2000);
  const [freightMode, setFreightMode] = useState<'sea' | 'air'>('sea');
  const [freightUsd, setFreightUsd] = useState<number>(1200.0);

  const [calculationResult, setCalculationResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Fetch HS Codes list
    const loadHsCodes = async () => {
      try {
        const res = await apiClient.get('/api/hs-codes');
        if (res.data) setHsCodesList(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    loadHsCodes();
  }, []);

  const runDutyCalculation = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.post('/api/agent2/tariff', {
        project_id: 1,
        hs_code: selectedHsCode,
        fob_unit_usd: fobRate,
        units: units,
        freight_mode: freightMode,
        freight_usd: freightMode === 'sea' ? 1200.0 : 4500.0
      });
      if (res.data) {
        setCalculationResult(res.data);
        setLandedCostCalculation(res.data);
      }
    } catch (err) {
      console.error('Tariff API calculation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    runDutyCalculation();
  }, [selectedHsCode, fobRate, units, freightMode]);

  return (
    <main className="p-8 max-w-7xl w-full mx-auto space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-indigo-100 text-indigo-800 text-xs font-mono font-bold px-2.5 py-0.5 rounded-md">
              AGENT 02 TARIFF ENGINE
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Sri Lanka Customs Landed Cost Calculator
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Vector RAG Customs Matcher (CID 0%, PAL 10%, CESS 15%, VAT 18%)
          </p>
        </div>

        <Link
          href="/outbox"
          className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-colors"
        >
          <span>Proceed to Agent 03 Outbox</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Control Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Mapped HS Tariff Code
          </label>
          <select
            value={selectedHsCode}
            onChange={(e) => setSelectedHsCode(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {hsCodesList.map((item) => (
              <option key={item.code} value={item.code}>
                {item.code} — {item.description.slice(0, 35)}...
              </option>
            ))}
            {!hsCodesList.length && (
              <option value="5208.11.00">5208.11.00 — Cotton Fabric (0% CID Exemption)</option>
            )}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Base Unit FOB Rate ($ USD)
          </label>
          <input
            type="number"
            step="0.05"
            value={fobRate}
            onChange={(e) => setFobRate(parseFloat(e.target.value) || 0)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Order Volume Units
          </label>
          <input
            type="number"
            value={units}
            onChange={(e) => setUnits(parseInt(e.target.value) || 0)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Logistics Freight Mode
          </label>
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => {
                setFreightMode('sea');
                setFreightUsd(1200.0);
              }}
              className={`flex-1 flex items-center justify-center space-x-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                freightMode === 'sea'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Ship className="w-3.5 h-3.5" />
              <span>Sea ($1.2k)</span>
            </button>

            <button
              onClick={() => {
                setFreightMode('air');
                setFreightUsd(4500.0);
              }}
              className={`flex-1 flex items-center justify-center space-x-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                freightMode === 'air'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Plane className="w-3.5 h-3.5" />
              <span>Air ($4.5k)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Math Breakdown Table Component */}
      <TariffTable
        calculation={
          calculationResult || {
            hsCode: selectedHsCode,
            cifUsd: fobRate * units + freightUsd,
            cidUsd: 0.0,
            palUsd: (fobRate * units + freightUsd) * 0.10,
            cessUsd: (fobRate * units + freightUsd) * 0.15,
            vatUsd: (fobRate * units + freightUsd) * 1.25 * 0.18,
            totalLandedUsd: (fobRate * units + freightUsd) * 1.40,
            totalLandedLkr: (fobRate * units + freightUsd) * 1.40 * 310.45,
            tariffNote: 'Zero Customs Duty raw fabric exception under Sri Lanka Apparel Export Act'
          }
        }
      />
    </main>
  );
}

export default function TariffPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />

      <div className="ml-[280px] flex-1 flex flex-col min-w-0">
        <Header />

        <Suspense fallback={<div className="p-8 text-xs font-bold text-slate-500">Loading Tariff Calculator...</div>}>
          <TariffContent />
        </Suspense>
      </div>
    </div>
  );
}
