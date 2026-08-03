'use client';

import React from 'react';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import {
  Users,
  Cpu,
  Layers,
  Sparkles,
  Award,
  CheckCircle2,
  Code2,
  Database,
  Globe2,
  Terminal,
  ShieldCheck
} from 'lucide-react';

export default function TeamPage() {
  const teamMembers = [
    {
      name: 'Panapitiya P.D.A.S.',
      institution: 'SLIIT',
      role: 'System Architect',
      focus: 'Distributed Systems & FastAPI Agent Infrastructure',
      avatarColor: 'bg-indigo-600',
    },
    {
      name: 'Sammandapperuma S.M.A.D.V.',
      institution: 'NIBM',
      role: 'Full-Stack Engineer',
      focus: 'Next.js 14 App Router & Figma Design System Implementation',
      avatarColor: 'bg-emerald-600',
    },
    {
      name: 'Obeysekara R.A.T.P.',
      institution: 'SLIIT',
      role: 'AI Lead',
      focus: 'Gemini Multimodal Vision Engine & Customs Tariff Vector RAG',
      avatarColor: 'bg-amber-600',
    },
    {
      name: 'Silva K.D.R.',
      institution: 'NIBM',
      role: 'UI/UX Specialist',
      focus: 'B2B SaaS Aesthetic Systems & Human-In-The-Loop Security Workflows',
      avatarColor: 'bg-rose-600',
    },
  ];

  const techStack = [
    {
      layer: 'Frontend Web App',
      tech: 'Next.js 14 (App Router), TypeScript, Tailwind CSS, Lucide React, Axios',
      purpose: 'Multi-page responsive B2B SaaS dashboard with 280px sidebar layout',
    },
    {
      layer: 'Backend Application Server',
      tech: 'Python 3.10+, FastAPI, Uvicorn, Pydantic',
      purpose: 'REST API endpoints for Agent 01, Agent 02, and Agent 03 workflows',
    },
    {
      layer: 'Multimodal AI Models',
      tech: 'Google Generative AI (Gemini 1.5 Pro / Flash)',
      purpose: 'Tech pack CAD drawing spec parsing & counter-offer email drafting',
    },
    {
      layer: 'Customs Tax Vector Index',
      tech: 'Local JSON Vector Store (sl_customs_tariffs.json) / Pinecone',
      purpose: 'Sri Lanka Customs HS Code 5208.11.00 tariff retrieval (CID, PAL, CESS, VAT)',
    },
    {
      layer: 'Human-In-The-Loop Safety Gate',
      tech: 'Strict FastAPI Authorization Middleware (/api/agent3/approve)',
      purpose: 'Prevents unauthorized outbound dispatches to suppliers',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Fixed 280px Left Sidebar */}
      <Sidebar />

      {/* Main Canvas Area */}
      <div className="ml-[280px] flex-1 flex flex-col min-w-0">
        <Header />

        <main className="p-8 max-w-7xl w-full mx-auto space-y-8">
          {/* Top Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="bg-indigo-100 text-indigo-800 text-xs font-mono font-bold px-2.5 py-0.5 rounded-md">
                  IDEALIZE 2026
                </span>
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Technical Architecture & Team Aviate
                </h1>
              </div>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Submission for IDEALIZE 2026 Hackathon Open Category — Autonomous Procurement Engine
              </p>
            </div>
          </div>

          {/* Team Aviate Profiles Grid */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <Users className="w-4 h-4 text-indigo-600" />
              <span>Team Aviate Members</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl ${member.avatarColor} text-white font-black flex items-center justify-center text-sm shadow-md`}
                    >
                      {member.name.split(' ')[0][0]}
                      {member.name.split(' ')[1]?.[0] || ''}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{member.name}</h4>
                      <span className="text-[10px] font-extrabold font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                        {member.institution}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-extrabold text-indigo-600 block">{member.role}</span>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">{member.focus}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Architecture Table */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Code2 className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-bold text-slate-900">System Architecture Breakdown</h3>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                100% Production Ready
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-4">Architecture Layer</th>
                    <th className="py-3 px-4">Technology Stack</th>
                    <th className="py-3 px-4">Core Functionality</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {techStack.map((item) => (
                    <tr key={item.layer} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-4 px-4 font-bold text-slate-900">{item.layer}</td>
                      <td className="py-4 px-4 font-mono text-indigo-700 font-semibold">{item.tech}</td>
                      <td className="py-4 px-4 text-slate-600 font-medium">{item.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
