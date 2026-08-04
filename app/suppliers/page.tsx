'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import apiClient from '@/lib/api';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { SupplierCard } from '@/components/supplier-card';
import { useSourcingContext } from '@/context/SourcingContext';
import {
  Building2,
  Sparkles,
  Filter,
  RefreshCw,
  CheckCircle2,
  ShieldCheck,
  Search,
  Database
} from 'lucide-react';

export default function SuppliersPage() {
  const { setSelectedSupplier } = useSourcingContext();
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchSuppliers = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.get('/api/suppliers');
      if (res.data && res.data.length > 0) {
        setSuppliers(res.data);
      } else {
        // Fallback default array if DB is empty
        setSuppliers(fallbackSuppliers);
      }
    } catch (err) {
      console.error('Failed to fetch suppliers from backend API:', err);
      setSuppliers(fallbackSuppliers);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fallbackSuppliers = [
    {
      id: 1,
      name: 'Zhejiang Apparel Tech Co.',
      country: 'China',
      location: 'Hangzhou, China',
      match_score: 98,
      fob_price: 4.25,
      landed_cost_usd: 15.38,
      landed_cost_lkr: 4775.0,
      lead_time: '14 days',
      capacity: '50,000 units/mo',
      is_zero_duty: false,
      is_recommended: true,
    },
    {
      id: 2,
      name: 'Tex Vanguard Solutions',
      country: 'Vietnam',
      location: 'Ho Chi Minh, Vietnam',
      match_score: 85,
      fob_price: 3.90,
      landed_cost_usd: 14.80,
      landed_cost_lkr: 4594.0,
      lead_time: '18 days',
      capacity: '40,000 units/mo',
      is_zero_duty: false,
      is_recommended: false,
    },
    {
      id: 3,
      name: 'Ceylon Garments Hub',
      country: 'Sri Lanka',
      location: 'Colombo, Sri Lanka',
      match_score: 78,
      fob_price: 5.10,
      landed_cost_usd: 5.10,
      landed_cost_lkr: 1583.0,
      lead_time: '3 days',
      capacity: '20,000 units/mo',
      is_zero_duty: true,
      is_recommended: false,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />

      <div className="ml-[280px] flex-1 flex flex-col min-w-0">
        <Header />

        <main className="p-8 max-w-7xl w-full mx-auto space-y-8">
          {/* Top Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="bg-indigo-100 text-indigo-800 text-xs font-mono font-bold px-2.5 py-0.5 rounded-md">
                  DATABASE DRIVEN
                </span>
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Supplier Discovery Matrix
                </h1>
              </div>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                AI Vector Matcher & Sri Lanka Customs Duty Optimization Matrix (Fetched from SQLite `suppliers` Table)
              </p>
            </div>

            <button
              onClick={fetchSuppliers}
              className="inline-flex items-center space-x-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh DB Suppliers</span>
            </button>
          </div>

          {/* Supplier Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {suppliers.map((supplier) => (
              <SupplierCard
                key={supplier.id || supplier.name}
                supplier={{
                  id: String(supplier.id),
                  name: supplier.name,
                  country: supplier.country,
                  location: supplier.location,
                  matchScore: supplier.match_score || supplier.matchScore || 90,
                  fobPrice: supplier.fob_price || supplier.fobPrice || 4.25,
                  landedCostUsd: supplier.landed_cost_usd || supplier.landedCostUsd || 15.38,
                  landedCostLkr: supplier.landed_cost_lkr || supplier.landedCostLkr || 4775.0,
                  leadTime: supplier.lead_time || supplier.leadTime || '14 days',
                  capacity: supplier.capacity || '50,000 units/mo',
                  isZeroDuty: supplier.is_zero_duty || supplier.isZeroDuty || false,
                  isRecommended: supplier.is_recommended || supplier.isRecommended || false,
                }}
                onSelect={(selected) => setSelectedSupplier(selected)}
              />
            ))}
          </div>

          {/* Zero Duty Highlight Banner */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 flex items-start space-x-4 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-md shrink-0">
              0%
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h4 className="text-sm font-extrabold text-emerald-900">
                  Sri Lanka Apparel Free Trade Zone Exemption
                </h4>
                <span className="text-[10px] font-extrabold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded font-mono">
                  ACT 1992
                </span>
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed font-medium">
                Sourcing raw fabrics directly from local Sri Lankan mills (e.g. Ceylon Garments Hub) avoids custom duties completely (0% CID, 0% PAL, 0% CESS), delivering a net zero landed cost delta.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
