'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, Globe2, ShieldCheck, ArrowRight, Zap, Award } from 'lucide-react';

export interface SupplierItem {
  id: string;
  name: string;
  country: string;
  location: string;
  matchScore: number;
  fobPrice: number;
  landedCostUsd: number;
  landedCostLkr: number;
  leadTime: string;
  capacity: string;
  isZeroDuty?: boolean;
  isRecommended?: boolean;
  recommended?: boolean;
}

export interface SupplierProps {
  supplier?: SupplierItem;
  id?: string;
  name?: string;
  country?: string;
  location?: string;
  matchScore?: number;
  fobPrice?: number;
  landedCostUsd?: number;
  landedCostLkr?: number;
  leadTime?: string;
  capacity?: string;
  isZeroDuty?: boolean;
  recommended?: boolean;
  onSelect?: (supplier: SupplierItem) => void;
}

export const SupplierCard: React.FC<SupplierProps> = (props) => {
  const data: SupplierItem = props.supplier || {
    id: props.id || '1',
    name: props.name || 'Supplier',
    country: props.country || 'China',
    location: props.location || 'Hangzhou',
    matchScore: props.matchScore || 90,
    fobPrice: props.fobPrice || 4.25,
    landedCostUsd: props.landedCostUsd || 15.38,
    landedCostLkr: props.landedCostLkr || 4775.0,
    leadTime: props.leadTime || '14 days',
    capacity: props.capacity || '50,000 units/mo',
    isZeroDuty: props.isZeroDuty || false,
    recommended: props.recommended || false,
  };

  const isRecommended = data.recommended || data.isRecommended || false;

  return (
    <div
      onClick={() => props.onSelect && props.onSelect(data)}
      className={`bg-white rounded-2xl border p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-lg relative group cursor-pointer ${
        isRecommended
          ? 'border-indigo-500 ring-2 ring-indigo-500/10 shadow-md'
          : 'border-slate-200 hover:border-indigo-300'
      }`}
    >
      {/* Top Badges */}
      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-bold group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {data.name}
              </h4>
              <p className="text-xs text-slate-500 font-medium flex items-center mt-0.5">
                <Globe2 className="w-3.5 h-3.5 mr-1 text-slate-400" />
                {data.location}, {data.country}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end space-y-1">
            <span
              className={`text-xs font-black px-2.5 py-1 rounded-full border ${
                data.matchScore >= 90
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : data.matchScore >= 80
                  ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                  : 'bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              {data.matchScore}% MATCH
            </span>
            {data.isZeroDuty && (
              <span className="text-[10px] font-extrabold uppercase bg-amber-50 text-amber-800 border border-amber-300 px-2 py-0.5 rounded flex items-center">
                <Zap className="w-3 h-3 mr-0.5 fill-amber-500 text-amber-500" /> ZERO IMPORT DUTY
              </span>
            )}
          </div>
        </div>

        {/* Price Box */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 mb-5">
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-xs font-semibold text-slate-500">Unit Price (FOB)</span>
            <span className="text-lg font-black text-slate-900">${data.fobPrice.toFixed(2)} USD</span>
          </div>
          <div className="flex justify-between items-baseline pt-2 border-t border-slate-200/60">
            <span className="text-xs font-bold text-indigo-900">Est. Landed Cost</span>
            <div className="text-right">
              <span className="text-sm font-extrabold text-indigo-600">${data.landedCostUsd.toFixed(2)} USD</span>
              <p className="text-[11px] font-semibold text-slate-500">
                (~LKR {data.landedCostLkr.toLocaleString()})
              </p>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs mb-6">
          <div className="bg-white p-2.5 rounded-lg border border-slate-100">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide block">
              Lead Time
            </span>
            <span className="font-bold text-slate-800 mt-0.5 block">{data.leadTime}</span>
          </div>
          <div className="bg-white p-2.5 rounded-lg border border-slate-100">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide block">
              Capacity
            </span>
            <span className="font-bold text-slate-800 mt-0.5 block">{data.capacity}</span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <Link
        href={`/tariff?supplier=${data.id}`}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center space-x-2 transition-colors shadow-sm shadow-indigo-100"
      >
        <span className="text-xs">Calculate Sri Lanka Tariff</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
};
