'use client';

import React, { useState } from 'react';
import { Terminal, Database, Cpu, Check, Copy, ChevronRight, Activity } from 'lucide-react';

export interface AgentLogPanelProps {
  title?: string;
  agentName?: string;
  jsonData?: Record<string, any>;
  vectorConfidence?: number;
  activeRules?: string[];
}

export const AgentLogPanel: React.FC<AgentLogPanelProps> = ({
  title = 'Agent Execution & Vector RAG Inspector',
  agentName = 'Agent 01: Multimodal Vision Parser',
  jsonData = {
    fabric_type: 'Cotton Canvas',
    gsm: 220,
    zipper: 'YKK #5 Brass',
    tolerance: '±0.1mm',
    hs_code: '5208.11.00',
    vector_confidence: '98.4%',
    tariff_status: 'ACTIVE_ZERO_DUTY',
  },
  vectorConfidence = 98.4,
  activeRules = [
    'HS 5208.11.00 - Woven fabrics of cotton, unbleached, weight <= 200g/m2',
    'Customs Duty (CID): 0% under Sri Lanka Apparel Raw Material Exemption',
    'PAL Levy: 10% calculated on CIF value',
    'CESS Levy: 15% standard rate under SCLI Act 2023',
    'VAT Rate: 18% applied on total duty-inclusive base value',
  ],
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'json' | 'rules'>('json');

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(jsonData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center space-x-2">
              <span>{title}</span>
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 px-2 py-0.5 rounded font-mono">
                {agentName}
              </span>
            </h4>
            <p className="text-xs text-slate-400 mt-0.5 font-mono">
              Vector Match Confidence:{' '}
              <span className="text-emerald-400 font-bold">{vectorConfidence}%</span>
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center space-x-2 bg-slate-800 p-1 rounded-xl text-xs font-mono">
          <button
            onClick={() => setActiveTab('json')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center space-x-1.5 ${
              activeTab === 'json'
                ? 'bg-indigo-600 text-white font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Extracted JSON</span>
          </button>
          <button
            onClick={() => setActiveTab('rules')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center space-x-1.5 ${
              activeTab === 'rules'
                ? 'bg-indigo-600 text-white font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>RAG Tariff Rules</span>
          </button>
        </div>
      </div>

      {/* Panel Content */}
      <div className="mt-4">
        {activeTab === 'json' ? (
          <div className="relative bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs overflow-x-auto">
            <button
              onClick={handleCopy}
              className="absolute right-3 top-3 p-1.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition-colors"
              title="Copy JSON"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <pre className="text-emerald-400 leading-relaxed">
              {JSON.stringify(jsonData, null, 2)}
            </pre>
          </div>
        ) : (
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2.5 font-mono text-xs">
            {activeRules.map((rule, idx) => (
              <div key={idx} className="flex items-start space-x-2 text-slate-300">
                <ChevronRight className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{rule}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Execution Status */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
        <span className="flex items-center space-x-1.5">
          <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>Status: 200 OK — Execution Latency 142ms</span>
        </span>
        <span>Vector Store: sl_customs_tariffs.json</span>
      </div>
    </div>
  );
};
