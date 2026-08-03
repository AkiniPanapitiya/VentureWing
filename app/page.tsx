import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe2,
  TrendingUp,
  Cpu,
  CheckCircle2,
  Layers,
  Award,
  Lock,
  Building2,
  BarChart3,
  Factory
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Header Navigation */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-200">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-extrabold text-slate-900 tracking-tight">VentureWing</span>
              <span className="ml-2 text-xs font-mono bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded border border-indigo-200">
                IDEALIZE 2026
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-600">
            <a href="#features" className="hover:text-indigo-600 transition-colors">
              Platform
            </a>
            <a href="#sdgs" className="hover:text-indigo-600 transition-colors">
              UN Impact
            </a>
            <a href="#pricing" className="hover:text-indigo-600 transition-colors">
              SaaS Tiers
            </a>
            <Link href="/team" className="hover:text-indigo-600 transition-colors">
              Team Aviate
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link
              href="/dashboard"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-6 rounded-xl flex items-center space-x-2 transition-all shadow-md shadow-indigo-200 hover:shadow-lg"
            >
              <span>Launch Platform</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden bg-gradient-to-b from-white via-indigo-50/20 to-slate-50">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-200 px-4 py-1.5 rounded-full text-xs font-extrabold text-indigo-700 mb-8 shadow-xs">
            <Zap className="w-3.5 h-3.5 fill-indigo-600" />
            <span>Autonomous Global Procurement & Sri Lanka Customs RAG Engine</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-950 tracking-tight leading-[1.1] max-w-4xl mx-auto">
            Autonomous Global Sourcing &{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-800">
              Sri Lanka Customs Intelligence
            </span>{' '}
            for Boutique Brands
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 mt-6 max-w-2xl mx-auto font-medium leading-relaxed">
            Upload Tech Pack CAD drawings, parse specs automatically, run real-time Sri Lanka tariff calculations,
            and execute AI-driven supplier negotiations with Human-In-The-Loop safety guardrails.
          </p>

          {/* Primary CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white text-base font-bold py-4 px-8 rounded-xl flex items-center justify-center space-x-3 transition-all shadow-lg shadow-indigo-200 hover:scale-105"
            >
              <span>Launch Autonomous Workspace</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#sdgs"
              className="w-full sm:w-auto bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-base font-bold py-4 px-8 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-xs"
            >
              <Globe2 className="w-5 h-5 text-indigo-600" />
              <span>Explore UN SDG Impact</span>
            </a>
          </div>

          {/* Interactive Feature Preview Cards */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Agent 01: Vision Ingestion</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Multimodal CAD blueprint parser extracting GSM, hardware specs, and mapping HS 5208.11.00 automatically.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-4">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Agent 02: Customs Tariff RAG</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Calculates itemized CID (0%), PAL (10%), CESS (15%), and VAT (18%) landed costs anchored to live LKR exchange rates.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Agent 03: HITL Negotiator</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Autonomous supplier RFQ counter-offer generator with explicit amber Human-In-The-Loop safety dispatches.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* UN Sustainable Development Goals (SDG 8 & 9) Section */}
      <section id="sdgs" className="py-20 bg-slate-900 text-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase font-bold text-indigo-400 tracking-widest">
              ESG & Global Impact Framework
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-3 tracking-tight">
              Aligned with United Nations Sustainable Development Goals
            </h2>
            <p className="text-slate-400 mt-4 text-base leading-relaxed">
              VentureWing empowers emerging boutique fashion & textile brands in Sri Lanka by democratizing complex global supply chains and customs compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* SDG 8 Card */}
            <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-8 hover:border-indigo-500/50 transition-all relative overflow-hidden group">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-600 to-rose-500 text-white flex items-center justify-center text-xl font-black shadow-lg">
                  SDG 8
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Decent Work & Economic Growth</h3>
                  <p className="text-xs text-rose-400 font-mono font-semibold">Promote inclusive sustainable growth</p>
                </div>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                By automating landed cost calculations and providing direct matching with ethical Sri Lankan manufacturers (like Ceylon Garments Hub), VentureWing ensures fair margin allocation and local economic empowerment.
              </p>
              <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 bg-emerald-950/60 p-3 rounded-xl border border-emerald-800/40">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Supports Zero-Duty Local Garment Sourcing in Colombo</span>
              </div>
            </div>

            {/* SDG 9 Card */}
            <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-8 hover:border-indigo-500/50 transition-all relative overflow-hidden group">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-500 text-white flex items-center justify-center text-xl font-black shadow-lg">
                  SDG 9
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Industry, Innovation & Infrastructure</h3>
                  <p className="text-xs text-amber-400 font-mono font-semibold">Build resilient AI infrastructure</p>
                </div>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Replacing manual freight forwarding spreadsheets with vector database RAG tax indexing (sl_customs_tariffs.json) and computer vision tech pack parsing modernizes global cross-border trade.
              </p>
              <div className="flex items-center space-x-2 text-xs font-mono text-indigo-300 bg-indigo-950/60 p-3 rounded-xl border border-indigo-800/40">
                <Cpu className="w-4 h-4 shrink-0 text-indigo-400" />
                <span>Next-Gen Autonomous Agent Procurement Stack</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SaaS Pricing Tiers Section */}
      <section id="pricing" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase font-bold text-indigo-600 tracking-widest">
              Flexible SaaS Subscriptions
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">
              Simple Tiers for Brands of Every Scale
            </h2>
            <p className="text-slate-600 mt-4 text-base">
              Start free during hackathon evaluation or scale up to full autonomous supplier agent dispatches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter Tier */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 flex flex-col justify-between hover:shadow-lg transition-shadow">
              <div>
                <span className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">Starter</span>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-black text-slate-900">$0</span>
                  <span className="text-slate-500 font-medium text-sm ml-2">/ month</span>
                </div>
                <p className="text-xs text-slate-500 mt-2">Ideal for independent designers & evaluation</p>

                <ul className="mt-8 space-y-3 text-xs text-slate-700 font-medium">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Up to 3 CAD Brief Ingestions / month</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Basic Sri Lanka Tariff Calculator</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Community Support</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/dashboard"
                className="mt-8 w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 px-4 rounded-xl text-xs text-center transition-colors block"
              >
                Get Started Free
              </Link>
            </div>

            {/* Growth Tier (Featured) */}
            <div className="bg-indigo-900 text-white rounded-3xl border-2 border-indigo-500 p-8 flex flex-col justify-between shadow-xl relative overflow-hidden transform md:-translate-y-4">
              <div className="absolute top-4 right-4 bg-indigo-500 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
                Most Popular
              </div>

              <div>
                <span className="text-xs font-extrabold uppercase text-indigo-300 tracking-wider">Growth</span>
                <div className="mt-4 flex items-baseline">
                  <span className="text-5xl font-black text-white">$249</span>
                  <span className="text-indigo-200 font-medium text-sm ml-2">/ month</span>
                </div>
                <p className="text-xs text-indigo-200 mt-2">For growing apparel brands & sourcing agencies</p>

                <ul className="mt-8 space-y-3 text-xs text-indigo-100 font-medium">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Unlimited CAD & Spec Ingestion</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Real-Time RAG Customs Duty Engine</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Agent 03 Negotiator with HITL Safety</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Direct WhatsApp & Email Dispatch</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/dashboard"
                className="mt-8 w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3.5 px-4 rounded-xl text-xs text-center transition-colors shadow-md block"
              >
                Launch Growth Trial
              </Link>
            </div>

            {/* Enterprise Tier */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 flex flex-col justify-between hover:shadow-lg transition-shadow">
              <div>
                <span className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">Custom Enterprise</span>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-black text-slate-900">Custom</span>
                </div>
                <p className="text-xs text-slate-500 mt-2">Tailored for large garment export houses</p>

                <ul className="mt-8 space-y-3 text-xs text-slate-700 font-medium">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Custom Vector Database Integration</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Dedicated SLA & On-Premises API</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Multi-User HITL Approval Workflows</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/team"
                className="mt-8 w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 px-4 rounded-xl text-xs text-center transition-colors block"
              >
                Contact Team Aviate
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-10 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-semibold text-slate-700">
            VentureWing Procurement AI — Built for IDEALIZE 2026 Hackathon Open Category
          </p>
          <p className="font-mono text-slate-400">Developed by Team Aviate (SLIIT & NIBM)</p>
        </div>
      </footer>
    </div>
  );
}
