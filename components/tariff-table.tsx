'use client';

import React from 'react';
import { Calculator, HelpCircle, ShieldCheck, CheckCircle } from 'lucide-react';

export interface DutyItem {
  code: string;
  name: string;
  rate: string;
  usdAmount: number;
  lkrAmount: number;
  description: string;
}

export interface TariffTableProps {
  fobTotalUsd?: number;
  freightUsd?: number;
  exchangeRate?: number;
}

export const TariffTable: React.FC<TariffTableProps> = ({
  fobTotalUsd = 25000.0,
  freightUsd = 1200.0,
  exchangeRate = 310.45,
}) => {
  const cifUsd = fobTotalUsd + freightUsd;
  const cidUsd = 0.0;
  const palUsd = cifUsd * 0.1; // 10%
  const cessUsd = cifUsd * 0.15; // 15%
  const vatBaseUsd = cifUsd + cidUsd + palUsd + cessUsd;
  const vatUsd = vatBaseUsd * 0.18; // 18%
  const totalLandedUsd = cifUsd + cidUsd + palUsd + cessUsd + vatUsd;
  const totalLandedLkr = totalLandedUsd * exchangeRate;

  const duties: DutyItem[] = [
    {
      code: 'CIF',
      name: 'Cost, Insurance & Freight (Base Value)',
      rate: 'FOB + Sea Freight',
      usdAmount: cifUsd,
      lkrAmount: cifUsd * exchangeRate,
      description: 'Assessable Value for Sri Lanka Customs ($25,000.00 FOB + $1,200.00 Sea)',
    },
    {
      code: 'CID',
      name: 'Customs Import Duty',
      rate: '0%',
      usdAmount: cidUsd,
      lkrAmount: cidUsd * exchangeRate,
      description: 'Zero Duty Category under HS 5208.11.00 Raw Apparel Fabric Exception',
    },
    {
      code: 'PAL',
      name: 'Port & Airport Development Levy',
      rate: '10%',
      usdAmount: palUsd,
      lkrAmount: palUsd * exchangeRate,
      description: 'Applied directly on CIF Value (10% of $26,200.00)',
    },
    {
      code: 'CESS',
      name: 'Sri Lanka Export & Development CESS',
      rate: '15%',
      usdAmount: cessUsd,
      lkrAmount: cessUsd * exchangeRate,
      description: 'CESS Levy on Woven Cotton Fabric imports (15% of $26,200.00)',
    },
    {
      code: 'VAT',
      name: 'Value Added Tax',
      rate: '18%',
      usdAmount: vatUsd,
      lkrAmount: vatUsd * exchangeRate,
      description: '18% tax calculated on (CIF + CID + PAL + CESS) base = $32,750.00',
    },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Header Bar */}
      <div className="bg-slate-900 text-white p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Calculator className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-bold text-white">Itemized Sri Lanka Duty Breakdown</h3>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-medium">
            HS Code: <span className="text-indigo-300 font-mono font-bold">5208.11.00</span> | Target Quantity: 2,000 Units
          </p>
        </div>

        <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl px-4 py-2 text-right">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
            Anchor Exchange Rate
          </span>
          <span className="text-sm font-mono font-bold text-emerald-400">
            1 USD = {exchangeRate} LKR
          </span>
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
                      duty.code === 'CID'
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
              Final Landed Cost Calculation
            </span>
            <p className="text-xs text-indigo-700">
              Includes FOB + Sea Freight + PAL (10%) + CESS (15%) + VAT (18%)
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
