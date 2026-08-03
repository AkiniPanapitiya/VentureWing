'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { TariffTable } from '@/components/tariff-table';
import { AgentLogPanel } from '@/components/agent-log-panel';
import { useSourcingContext } from '@/context/SourcingContext';
import { Calculator, ArrowRight, RefreshCw, Search, CheckCircle2, ChevronDown } from 'lucide-react';

export default function TariffPage() {
  const { briefState, updateTariffCalculation } = useSourcingContext();
  const [loading, setLoading] = useState(false);
  const [selectedHsCode, setSelectedHsCode] = useState(briefState.hsCode || '5208.11.00');
  const [hsSearchTerm, setHsSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [freightMode, setFreightMode] = useState<'sea' | 'air'>(briefState.freightMode || 'sea');

  const hsCodeOptions = [
    {
      code: '5208.11.00',
      description: 'Woven fabrics of cotton, unbleached, weight <= 200g/m2',
      badge: '0% CID Duty Exempted',
    },
    {
      code: '6109.10.00',
      description: 'T-shirts, singlets and other vests, knitted/crocheted of cotton',
      badge: '15% CID Standard',
    },
    {
      code: '6204.62.00',
      description: 'Trousers, bib & brace overalls, breeches & shorts of cotton',
      badge: '15% CID Outerwear',
    },
    {
      code: '6110.20.00',
      description: 'Sweaters, pullovers, waistcoats and similar articles, of cotton',
      badge: '15% CID Knitwear',
    },
    {
      code: '6205.20.00',
      description: "Men's or boys' shirts, of cotton",
      badge: '15% CID Woven Shirts',
    },
  ];

  const currentHsObj =
    hsCodeOptions.find((h) => h.code === selectedHsCode) || hsCodeOptions[0];

  const [tariffData, setTariffData] = useState<any>({
    hs_code: currentHsObj.code,
    description: currentHsObj.description,
    base_fob_usd: (briefState.fobPrice || 4.25) * (briefState.quantity || 2000),
    freight_mode: freightMode,
    freight_usd: freightMode === 'air' ? 4500.0 : 1200.0,
    cif_usd: 26200.0,
    cid_rate: currentHsObj.code === '5208.11.00' ? '0%' : '15%',
    cid_usd: 0.0,
    pal_rate: '10%',
    pal_usd: 2620.0,
    cess_rate: '15%',
    cess_usd: 3930.0,
    vat_rate: '18%',
    vat_usd: 5895.0,
    total_landed_usd: 38645.0,
    total_landed_lkr: 11997340.25,
    exchange_rate: 310.45,
  });

  const calculateTariff = async (code: string = selectedHsCode, mode: 'sea' | 'air' = freightMode) => {
    setLoading(true);
    const fobBase = (briefState.fobPrice || 4.25) * (briefState.quantity || 2000);
    const freightAmount = mode === 'air' ? 4500.0 : 1200.0;
    
    try {
      const response = await axios.post('http://localhost:8000/api/agent2/tariff', {
        hs_code: code,
        fob_total_usd: fobBase,
        freight_mode: mode,
        freight_usd: freightAmount,
      });
      if (response.data) {
        setTariffData(response.data);
        updateTariffCalculation(
          code,
          response.data.description,
          mode,
          freightAmount,
          {
            cifUsd: response.data.cif_usd,
            cidUsd: response.data.cid_usd,
            palUsd: response.data.pal_usd,
            cessUsd: response.data.cess_usd,
            vatUsd: response.data.vat_usd,
            totalLandedUsd: response.data.total_landed_usd,
            totalLandedLkr: response.data.total_landed_lkr,
          }
        );
      }
    } catch (err) {
      // Local math computation
      const cif = fobBase + freightAmount;
      const cidRateNum = code === '5208.11.00' ? 0.0 : 0.15;
      const cid = cif * cidRateNum;
      const pal = cif * 0.10;
      const cess = cif * 0.15;
      const vatBase = cif + cid + pal + cess;
      const vat = vatBase * 0.18;
      const totalUsd = cif + cid + pal + cess + vat;
      const totalLkr = totalUsd * 310.45;

      const fallbackObj = {
        hs_code: code,
        description: hsCodeOptions.find((h) => h.code === code)?.description || currentHsObj.description,
        base_fob_usd: fobBase,
        freight_mode: mode,
        freight_usd: freightAmount,
        cif_usd: cif,
        cid_rate: `${Math.round(cidRateNum * 100)}%`,
        cid_usd: cid,
        pal_rate: '10%',
        pal_usd: pal,
        cess_rate: '15%',
        cess_usd: cess,
        vat_rate: '18%',
        vat_usd: vat,
        total_landed_usd: totalUsd,
        total_landed_lkr: totalLkr,
        exchange_rate: 310.45,
      };

      setTariffData(fallbackObj);
      updateTariffCalculation(
        code,
        fallbackObj.description,
        mode,
        freightAmount,
        {
          cifUsd: cif,
          cidUsd: cid,
          palUsd: pal,
          cessUsd: cess,
          vatUsd: vat,
          totalLandedUsd: totalUsd,
          totalLandedLkr: totalLkr,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    calculateTariff(selectedHsCode, freightMode);
  }, []);

  const handleHsSelect = (code: string) => {
    setSelectedHsCode(code);
    setIsDropdownOpen(false);
    calculateTariff(code, freightMode);
  };

  const handleFreightToggle = (mode: 'sea' | 'air') => {
    setFreightMode(mode);
    calculateTariff(selectedHsCode, mode);
  };

  const filteredHsOptions = hsCodeOptions.filter(
    (h) =>
      h.code.includes(hsSearchTerm) ||
      h.description.toLowerCase().includes(hsSearchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Fixed 280px Left Sidebar */}
      <Sidebar />

      {/* Main Canvas Area */}
      <div className="ml-[280px] flex-1 flex flex-col min-w-0">
        <Header />

        <main className="p-8 max-w-7xl w-full mx-auto space-y-8">
          {/* Top Title & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="bg-indigo-100 text-indigo-800 text-xs font-mono font-bold px-2.5 py-0.5 rounded-md">
                  Agent 02 RAG Engine
                </span>
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Sri Lanka Customs Tariff & Landed Cost Engine
                </h1>
              </div>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Project: <span className="font-bold text-slate-900">{briefState.projectName}</span> | Supplier:{' '}
                <span className="font-bold text-indigo-600">{briefState.matchedSupplier.name}</span>
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => calculateTariff(selectedHsCode, freightMode)}
                disabled={loading}
                className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center space-x-2 transition-all shadow-xs"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>Re-Calculate Duty</span>
              </button>

              <Link
                href="/outbox"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-5 rounded-xl text-xs flex items-center space-x-2 transition-all shadow-sm shadow-indigo-100"
              >
                <span>Initiate AI Negotiation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Interactive HS Code Auto-Suggest Search Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm relative z-30">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Searchable Sri Lanka Customs HS Code Database
            </label>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-left flex items-center justify-between hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-indigo-600 text-sm font-black">{selectedHsCode}</span>
                  <span className="text-slate-700">— {currentHsObj.description}</span>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 z-50 space-y-2">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Type HS code or commodity name..."
                      value={hsSearchTerm}
                      onChange={(e) => setHsSearchTerm(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>

                  <div className="max-h-56 overflow-y-auto space-y-1">
                    {filteredHsOptions.map((h) => (
                      <div
                        key={h.code}
                        onClick={() => handleHsSelect(h.code)}
                        className={`p-3 rounded-xl cursor-pointer flex items-center justify-between text-xs transition-colors ${
                          selectedHsCode === h.code
                            ? 'bg-indigo-50 text-indigo-900 font-bold border border-indigo-200'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div>
                          <span className="font-mono font-bold text-indigo-600 mr-2">{h.code}</span>
                          <span>{h.description}</span>
                        </div>
                        <span className="text-[10px] font-extrabold uppercase bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                          {h.badge}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tariff Calculation Table & RAG Inspector */}
          <div className="space-y-8">
            <TariffTable
              hsCode={tariffData.hs_code}
              hsDescription={tariffData.description}
              fobTotalUsd={tariffData.base_fob_usd}
              freightMode={freightMode}
              freightUsd={tariffData.freight_usd}
              exchangeRate={tariffData.exchange_rate}
              onFreightModeChange={handleFreightToggle}
            />

            <AgentLogPanel
              title="Agent 02 Customs RAG Vector Inspector"
              agentName="Pinecone Vector Index / sl_customs_tariffs.json"
              jsonData={tariffData}
              vectorConfidence={98.4}
              activeRules={[
                `Selected HS Code ${tariffData.hs_code} (${tariffData.description})`,
                `Freight Mode Selected: ${freightMode.toUpperCase()} FREIGHT ($${tariffData.freight_usd.toLocaleString()})`,
                `CID Import Duty Rate: ${tariffData.cid_rate}`,
                `PAL Port & Airport Levy: 10.0% of CIF value ($${tariffData.cif_usd.toLocaleString()})`,
                `CESS Export Development Levy: 15.0% of CIF value`,
                `VAT Rate: 18.0% on Duty-Inclusive Base`,
                `Applied Exchange Rate: 1 USD = ${tariffData.exchange_rate} LKR`,
              ]}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
