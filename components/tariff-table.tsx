'use client';

import React from 'react';
import { Calculator, CheckCircle, Ship, Plane } from 'lucide-react';

export interface DutyItem {
  code: string;
  name: string;
  rate: string;
  usdAmount: number;
  lkrAmount: number;
  description: string;
}

export interface TariffTableProps {
  hsCode?: string;
  hsDescription?: string;
  fobTotalUsd?: number;
  freightMode?: 'sea' | 'air';
  freightUsd?: number;
  exchangeRate?: number;
  onFreightModeChange?: (mode: 'sea' | 'air') => void;
}

export const TariffTable: React.FC<TariffTableProps> = ({
  hsCode = '5208.11.00',
  hsDescription = 'Woven fabrics of cotton, unbleached, weight <= 200g/m2',
  fobTotalUsd = 25000.0,
  freightMode = 'sea',
  freightUsd = 1200.0,
  exchangeRate = 310.45,
  onFreightModeChange,
}) => {
  const isZeroDutyHs = hsCode === '5208.11.00';
  const cidRate = isZeroDutyHs ? 0.0 : 0.15;
  const palRate = 0.10;
  const cessRate = 0.15;
  const vatRate = 0.18;

  const cifUsd = fobTotalUsd + freightUsd;
  const cidUsd = cifUsd * cidRate;
  const palUsd = cifUsd * palRate;
  const cessUsd = cifUsd * cessRate;
  const vatBaseUsd = cifUsd + cidUsd + palUsd + cessUsd;
  const vatUsd = vatBaseUsd * vatRate;
  const totalLandedUsd = cifUsd + cidUsd + palUsd + cessUsd + vatUsd;
  const totalLandedLkr = totalLandedUsd * exchangeRate;

  const duties: DutyItem[] = [
    {
      code: 'CIF',
      name: 'Cost, Insurance & Freight (Base Value)',
      rate: `${freightMode.toUpperCase()} FREIGHT`,
      usdAmount: cifUsd,
      lkrAmount: cifUsd * exchangeRate,
      description: `Assessable Value for Sri Lanka Customs ($${fobTotalUsd.toLocaleString()} FOB + $${freightUsd.toLocaleString()} ${freightMode.toUpperCase()})`,
    },
    {
      code: 'CID',
      name: 'Customs Import Duty',
      rate: `${intRate(cidRate)}%`,
      usdAmount: cidUsd,
      lkrAmount: cidUsd * exchangeRate,
      description: isZeroDutyHs
        ? 'Zero Duty Category under HS 5208.11.00 Raw Apparel Fabric Exception'
        : 'Standard Sri Lanka Customs Import Duty Rate',
    },
    {
      code: 'PAL',
      name: 'Port & Airport Development Levy',
      rate: '10%',
      usdAmount: palUsd,
      lkrAmount: palUsd * exchangeRate,
      description: `Applied directly on CIF Value (10% of $${cifUsd.toLocaleString()})`,
    },
    {
      code: 'CESS',
      name: 'Sri Lanka Export & Development CESS',
      rate: '15%',
      usdAmount: cessUsd,
      lkrAmount: cessUsd * exchangeRate,
      description: `CESS Levy calculated at 15% of CIF Value ($${cifUsd.toLocaleString()})`,
    },
    {
      code: 'VAT',
      name: 'Value Added Tax',
      rate: '18%',
      usdAmount: vatUsd,
      lkrAmount: vatUsd * exchangeRate,
      description: `18% tax calculated on composite base (CIF + CID + PAL + CESS) = $${vatBaseUsd.toLocaleString()}`,
    },
  ];

  function intRate(val: number) {
    return Math.round(val * 100);
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Header Bar with Freight Mode Switcher */}
      <div className="bg-slate-900 text-white p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Calculator className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-bold text-white">Itemized Sri Lanka Duty Breakdown</h3>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-medium">
            HS Code: <span className="text-indigo-300 font-mono font-bold">{hsCode}</span> — {hsDescription}
          </p>
        </div>

        {/* Dynamic Freight Mode Switcher */}
        <div className="flex items-center space-x-3">
          <div className="bg-slate-800 p-1 rounded-xl flex items-center space-x-1 border border-slate-700 text-xs">
            <button
              onClick={() => onFreightModeChange && onFreightModeChange('sea')}
              className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 font-bold transition-all ${
                freightMode === 'sea'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Ship className="w-3.5 h-3.5" />
              <span>Sea ($1,200 / 14d)</span>
            </button>
            <button
              onClick={() => onFreightModeChange && onFreightModeChange('air')}
              className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 font-bold transition-all ${
                freightMode === 'air'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Plane className="w-3.5 h-3.5" />
              <span>Air ($4,500 / 3d)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Math Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
            <tr>
              <th className="py-3.5 px-6">Tax Code & Component</th>
              <th className="py-3.5 px-4 text-center">Tax Rate</th>
              <th className="py-3.5 px-6 text-right">Amount (USD)</th>
              <th className="py-3.5 px-6 text-right">Amount (LKR)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {duties.map((duty) => (
              <tr key={duty.code} className="hover:bg-slate-50/60 transition-colors">
                <td className="py-4 px-6">
                  <div className="font-bold text-slate-900 flex items-center space-x-2">
                    <span className="bg-slate-100 text-slate-700 font-mono text-[11px] px-2 py-0.5 rounded border border-slate-200">
                      {duty.code}
                    </span>
                    <span>{duty.name}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{duty.description}</p>
                </td>
                <td className="py-4 px-4 text-center">
                  <span
                    className={`font-mono font-bold px-2 py-1 rounded text-[11px] ${
                      duty.code === 'CID' && isZeroDutyHs
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-indigo-50 text-indigo-700'
                    }`}
                  >
                    {duty.rate}
                  </span>
                </td>
                <td className="py-4 px-6 text-right font-mono font-bold text-slate-900">
                  ${duty.usdAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </td>
                <td className="py-4 px-6 text-right font-mono font-medium text-slate-600">
                  Rs. {duty.lkrAmount.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Total Banner */}
      <div className="bg-indigo-50/80 border-t border-indigo-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-extrabold uppercase text-indigo-900 tracking-wider">
              Final Landed Cost Calculation ({freightMode.toUpperCase()} FREIGHT)
            </span>
            <p className="text-xs text-indigo-700">
              FOB (${fobTotalUsd.toLocaleString()}) + {freightMode.toUpperCase()} Freight + CID ({intRate(cidRate)}%) + PAL (10%) + CESS (15%) + VAT (18%)
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            ${totalLandedUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
          </div>
          <div className="text-sm font-extrabold text-indigo-700">
            ~ LKR {totalLandedLkr.toLocaleString('en-US', { maximumFractionDigits: 2 })}
          </div>
        </div>
      </div>
    </div>
  );
};
