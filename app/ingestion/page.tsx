'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { CadViewer } from '@/components/cad-viewer';
import { AgentLogPanel } from '@/components/agent-log-panel';
import { Sparkles, ArrowRight, Upload, Play, CheckCircle2, AlertCircle, FileCode } from 'lucide-react';

export default function IngestionPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [parsedData, setParsedData] = useState<Record<string, any>>({
    file_name: 'tech_pack_cotton_v2.dwg',
    fabric_type: 'Cotton Canvas',
    gsm: 220,
    zipper: 'YKK #5 Brass Antiqued',
    tolerance: '±0.1mm',
    mapped_hs_code: '5208.11.00',
    vector_confidence: '99.4%',
    parsed_at: '2026-08-03T21:30:00Z',
    status: 'SPECS_VALIDATED',
  });
  const [message, setMessage] = useState<string>('');

  const runVisionParser = async () => {
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.post('http://localhost:8000/api/agent1/parse', {
        file_name: 'tech_pack_cotton_v2.dwg',
      });
      if (response.data) {
        setParsedData(response.data);
        setMessage('Successfully executed Agent 01 Multimodal Vision Parser via FastAPI!');
      }
    } catch (err) {
      // Fallback mock response for offline/preview mode
      setParsedData({
        file_name: 'tech_pack_cotton_v2.dwg',
        fabric_type: '220 GSM Organic Cotton Canvas',
        gsm: 220,
        zipper: 'YKK #5 Brass Antiqued',
        stitching_tolerance: '±0.1mm',
        hs_code: '5208.11.00',
        vector_confidence: '99.4%',
        parsed_at: new Date().toISOString(),
        status: 'SPECS_VALIDATED',
      });
      setMessage('Vision Parser completed (FastAPI Offline Fallback Mode Active)');
    } finally {
      setLoading(false);
    }
  };

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
                  Agent 01
                </span>
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Vision Ingestion & CAD Specs Parser
                </h1>
              </div>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Upload technical pack drawings and extract fabrication parameters automatically using AI.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={runVisionParser}
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-2.5 px-5 rounded-xl text-xs flex items-center space-x-2 transition-all shadow-sm shadow-indigo-100"
              >
                {loading ? (
                  <Sparkles className="w-4 h-4 animate-spin text-white" />
                ) : (
                  <Play className="w-4 h-4 fill-white" />
                )}
                <span>{loading ? 'Parsing CAD Specs...' : 'Run Live Vision Parsing'}</span>
              </button>

              <Link
                href="/suppliers"
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-5 rounded-xl text-xs flex items-center space-x-2 transition-all shadow-sm"
              >
                <span>Proceed to Supplier Matching</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {message && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2.5 rounded-xl text-xs font-medium flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{message}</span>
            </div>
          )}

          {/* Main Grid: CAD Canvas & Agent Execution Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left 7 Columns: Interactive CAD Canvas */}
            <div className="lg:col-span-7">
              <CadViewer />
            </div>

            {/* Right 5 Columns: On-Screen JSON Log & RAG Inspector */}
            <div className="lg:col-span-5 space-y-6">
              <AgentLogPanel
                title="Agent 01 Vision Parser Output"
                agentName="Gemini 1.5 Pro / CAD Extractor"
                jsonData={parsedData}
                vectorConfidence={99.4}
                activeRules={[
                  'Identified primary fabric weave as 220 GSM Cotton Canvas',
                  'Detected YKK #5 Brass Hardware fastener specification',
                  'Mapped HS Code 5208.11.00 (Unbleached Woven Cotton Fabric)',
                  'Extracted seam stitching tolerance limit of +-0.1mm',
                ]}
              />

              {/* Upload Box */}
              <div className="bg-white border-2 border-dashed border-slate-300 hover:border-indigo-400 rounded-2xl p-6 text-center transition-colors group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-800">Upload New DWG / PDF Tech Pack</h4>
                <p className="text-xs text-slate-500 mt-1">Drag and drop AutoCAD .DWG or Adobe PDF files here</p>
                <span className="inline-block mt-3 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                  Supports up to 50MB per Tech Pack
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
