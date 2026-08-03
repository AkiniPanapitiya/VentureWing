'use client';

import React, { useState } from 'react';
import { Eye, Layers, ZoomIn, ZoomOut, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface Hotspot {
  id: string;
  label: string;
  category: string;
  top: string;
  left: string;
  width: string;
  height: string;
  value: string;
  confidence: string;
  details: string;
}

export const CadViewer: React.FC = () => {
  const [selectedHotspot, setSelectedHotspot] = useState<string>('h1');
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  const hotspots: Hotspot[] = [
    {
      id: 'h1',
      label: 'Fabric Spec',
      category: 'Material',
      top: '25%',
      left: '38%',
      width: '24%',
      height: '18%',
      value: '220 GSM Organic Cotton Canvas',
      confidence: '99.4%',
      details: 'Unbleached 100% Organic Weave. Complies with HS 5208.11.00 Zero-Duty Customs Category.',
    },
    {
      id: 'h2',
      label: 'Hardware Spec',
      category: 'Zipper & Fastener',
      top: '48%',
      left: '46%',
      width: '8%',
      height: '32%',
      value: 'YKK #5 Brass Antiqued Zipper',
      confidence: '98.1%',
      details: 'Heavy-duty antiqued brass finish with auto-lock slider. Tensile strength verified.',
    },
    {
      id: 'h3',
      label: 'Stitching Tolerance',
      category: 'Quality Control',
      top: '15%',
      left: '30%',
      width: '14%',
      height: '12%',
      value: 'Tolerance: ±0.1mm Double Stitch',
      confidence: '97.8%',
      details: 'Double needle reinforcement seam with high-density polyester core thread.',
    },
  ];

  const currentHotspot = hotspots.find((h) => h.id === selectedHotspot) || hotspots[0];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-base font-bold text-slate-900">Tech Pack CAD Canvas</h3>
            <span className="bg-indigo-50 text-indigo-700 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border border-indigo-200">
              tech_pack_cotton_v2.dwg
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Click hotspot pins on the CAD drawing to inspect parsed component specifications.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-slate-100 rounded-lg p-1 text-slate-600 text-xs">
            <button
              onClick={() => setZoomLevel((z) => Math.max(75, z - 10))}
              className="p-1 hover:bg-white rounded transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 font-mono text-[11px] font-semibold">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(150, z + 10))}
              className="p-1 hover:bg-white rounded transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Blueprint Visual Canvas */}
      <div className="relative mt-6 rounded-xl bg-slate-900 border border-slate-800 p-8 min-h-[380px] flex items-center justify-center overflow-hidden group">
        {/* Blueprint Grid Lines Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-40"></div>

        {/* Vector SVG Blueprint Representation */}
        <div
          className="relative transition-transform duration-300 flex flex-col items-center"
          style={{ transform: `scale(${zoomLevel / 100})` }}
        >
          <svg className="w-72 h-80 text-indigo-400/80 stroke-current fill-none stroke-[1.5]" viewBox="0 0 200 220">
            {/* T-Shirt Line Art */}
            <path d="M 60,30 L 80,45 L 120,45 L 140,30 L 180,60 L 160,90 L 145,75 L 145,190 L 55,190 L 55,75 L 40,90 L 20,60 Z" />
            {/* Collar & Pocket Detail */}
            <path d="M 80,45 C 90,60 110,60 120,45" strokeDasharray="3 3" />
            <rect x="125" y="85" width="25" height="30" strokeDasharray="2 2" />
            {/* Seams */}
            <line x1="55" y1="75" x2="145" y2="75" strokeDasharray="3 3" />
            <line x1="100" y1="45" x2="100" y2="190" strokeDasharray="1 3" className="text-indigo-500/40" />
          </svg>

          {/* Hotspot Bounding Boxes Overlay */}
          {hotspots.map((hs) => {
            const isSelected = selectedHotspot === hs.id;
            return (
              <div
                key={hs.id}
                onClick={() => setSelectedHotspot(hs.id)}
                style={{
                  top: hs.top,
                  left: hs.left,
                  width: hs.width,
                  height: hs.height,
                }}
                className={`absolute cursor-pointer border-2 transition-all rounded ${
                  isSelected
                    ? 'border-indigo-400 bg-indigo-500/30 ring-4 ring-indigo-500/30 shadow-xl scale-105 z-10'
                    : 'border-amber-400/80 bg-amber-400/10 hover:border-indigo-300 hover:bg-indigo-400/20'
                }`}
              >
                <div
                  className={`absolute -top-3 -left-3 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white ${
                    isSelected ? 'bg-indigo-600 shadow-md scale-125' : 'bg-amber-500'
                  }`}
                >
                  {hs.id.replace('h', '')}
                </div>
                <div className="absolute top-1 left-2 text-[10px] font-mono font-bold text-white tracking-tight drop-shadow-md">
                  {hs.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Hotspot Inspector Card with Smooth Transition */}
      <div className="mt-6 bg-gradient-to-r from-indigo-900 via-slate-900 to-slate-900 text-white p-5 rounded-2xl border border-indigo-950 shadow-md transition-all">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono font-bold text-indigo-300 uppercase tracking-widest flex items-center">
            <Sparkles className="w-3.5 h-3.5 mr-1 text-indigo-400" />
            Inspecting Hotspot #{currentHotspot.id.replace('h', '')}: {currentHotspot.category}
          </span>
          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-700/60 px-2 py-0.5 rounded font-mono">
            Vision Confidence {currentHotspot.confidence}
          </span>
        </div>
        <h4 className="text-sm font-extrabold text-white">{currentHotspot.value}</h4>
        <p className="text-xs text-slate-300 mt-1 leading-relaxed font-medium">
          {currentHotspot.details}
        </p>
      </div>

      {/* Hotspots Breakdown Grid */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        {hotspots.map((hs) => {
          const isSelected = selectedHotspot === hs.id;
          return (
            <div
              key={hs.id}
              onClick={() => setSelectedHotspot(hs.id)}
              className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                isSelected
                  ? 'bg-indigo-50/90 border-indigo-400 shadow-sm ring-2 ring-indigo-200'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                  {hs.category}
                </span>
                <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 flex items-center space-x-0.5">
                  <ShieldCheck className="w-3 h-3 mr-0.5" /> {hs.confidence}
                </span>
              </div>
              <p className="text-xs font-bold text-slate-900">{hs.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
