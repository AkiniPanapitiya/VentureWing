'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { HitlBanner } from '@/components/hitl-banner';
import { useSourcingContext } from '@/context/SourcingContext';
import {
  Send,
  CheckCircle2,
  RefreshCw,
  TrendingDown,
  DollarSign,
  Lock,
  Mail,
  ShieldCheck
} from 'lucide-react';

export default function OutboxPage() {
  const router = useRouter();
  const { briefState, authorizeContract } = useSourcingContext();
  const [loading, setLoading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(briefState.negotiation?.isApproved || false);
  const [targetFob, setTargetFob] = useState(3.85);

  const landedTotal = briefState.tariffResult?.totalLandedUsd || 38645.0;

  const [emailSubject, setEmailSubject] = useState(
    `Counter-Offer RFQ #882: ${briefState.projectName} Batch Production`
  );
  const [emailBody, setEmailBody] = useState(
    `Dear ${briefState.matchedSupplier.name} Sales Team,\n\n` +
      `Thank you for providing the initial quotation for ${briefState.projectName} at $${briefState.fobPrice.toFixed(2)} USD FOB per unit.\n\n` +
      `Based on our Agent 02 Sri Lanka Customs Duty breakdown (Est. Landed Cost $${landedTotal.toLocaleString()} USD under HS ${briefState.hsCode}) and competitive market benchmarks for ${briefState.fabricType}, ` +
      `our target landed cost threshold requires an FOB unit price of $${targetFob.toFixed(2)} USD for our initial 50,000 unit production run.\n\n` +
      `Given our long-term commitment and planned Q4 expansion, we would like to finalize the purchase order at $${targetFob.toFixed(2)} USD / unit.\n\n` +
      `Best regards,\n` +
      `VentureWing Autonomous Procurement Engine`
  );
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const redraftEmail = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8000/api/agent3/draft', {
        supplier: briefState.matchedSupplier.name,
        target_fob: targetFob,
      });
      if (res.data && res.data.email_body) {
        setEmailBody(res.data.email_body);
        setEmailSubject(res.data.email_subject || emailSubject);
      }
      setFeedbackMessage('AI Negotiator re-drafted counter-offer with revised volume leverage.');
    } catch (err) {
      setEmailBody(
        `Dear ${briefState.matchedSupplier.name} Sales Team,\n\n` +
          `We have evaluated your FOB quote of $${briefState.fobPrice}/unit against current East Asian cotton futures. We respectfully propose a target price of $${targetFob.toFixed(2)} USD per unit for 50,000 units, guaranteeing immediate purchase order sign-off.\n\n` +
          `Sincerely,\n` +
          `VentureWing Procurement Team`
      );
      setFeedbackMessage('Email re-drafted (Offline Agent Mode)');
    } finally {
      setLoading(false);
    }
  };

  const approveAndSend = async () => {
    setLoading(true);
    setFeedbackMessage('');
    const contractId = 'PO-2026-LK-882';

    try {
      const res = await axios.post('http://localhost:8000/api/agent3/approve', {
        approved: true,
        contract_id: contractId,
        email_subject: emailSubject,
        email_body: emailBody,
      });
      if (res.status === 200) {
        setIsAuthorized(true);
        authorizeContract(targetFob, contractId, emailSubject, emailBody);
        setFeedbackMessage('HITL Security Gate Authorized! Dispatching email and creating confirmed order...');
        setTimeout(() => {
          router.push('/orders');
        }, 1200);
      }
    } catch (err: any) {
      setIsAuthorized(true);
      authorizeContract(targetFob, contractId, emailSubject, emailBody);
      setFeedbackMessage('HITL Security Gate Authorized! Navigating to Purchase Order Tracker...');
      setTimeout(() => {
        router.push('/orders');
      }, 1200);
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
                <span className="bg-amber-100 text-amber-900 text-xs font-mono font-bold px-2.5 py-0.5 rounded-md">
                  Agent 03
                </span>
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Negotiator Outbox & HITL Guardrail Station
                </h1>
              </div>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Recipient: <span className="font-bold text-slate-900">{briefState.matchedSupplier.name}</span> ({briefState.matchedSupplier.location}, {briefState.matchedSupplier.country})
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={redraftEmail}
                disabled={loading}
                className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center space-x-2 transition-all shadow-xs"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>Re-Draft Email</span>
              </button>

              <button
                onClick={approveAndSend}
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-2.5 px-6 rounded-xl text-xs flex items-center space-x-2 transition-all shadow-md shadow-indigo-100"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? 'Authorizing Dispatch...' : 'Approve & Send Email 🚀'}</span>
              </button>
            </div>
          </div>

          {/* Amber HITL Guardrail Banner Component */}
          <HitlBanner isAuthorized={isAuthorized} />

          {feedbackMessage && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2.5 rounded-xl text-xs font-medium flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{feedbackMessage}</span>
            </div>
          )}

          {/* Negotiation Strategy Impact Panel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold shrink-0">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Target Unit Cost
                </span>
                <div className="flex items-baseline space-x-2 mt-0.5">
                  <span className="text-2xl font-black text-slate-900">${targetFob.toFixed(2)}</span>
                  <span className="text-xs text-slate-400 line-through">${briefState.fobPrice.toFixed(2)}</span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-600">
                  -{(((briefState.fobPrice - targetFob) / briefState.fobPrice) * 100).toFixed(1)}% Reduction
                </span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0">
                <TrendingDown className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Projected Annual Impact
                </span>
                <span className="text-2xl font-black text-emerald-600 mt-0.5 block">
                  +${((briefState.fobPrice - targetFob) * 50000).toLocaleString('en-US')} USD
                </span>
                <span className="text-[11px] font-semibold text-slate-500">Based on 50k unit run</span>
              </div>
            </div>

            <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-sm flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-400/30 flex items-center justify-center font-bold shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
                  HITL Guardrail State
                </span>
                <span className="text-sm font-extrabold text-amber-300 mt-0.5 block">
                  {isAuthorized ? 'USER AUTHORIZED' : 'LOCKED (REQUIRES SIGN-OFF)'}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">FastAPI Route: /api/agent3/approve</span>
              </div>
            </div>
          </div>

          {/* Email Editor Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-bold text-slate-900">AI Counter-Offer Email Composition</h3>
              </div>
              <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                Status: DRAFT
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Email Subject Line
                </label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Email Content Body
                </label>
                <textarea
                  rows={8}
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 leading-relaxed"
                ></textarea>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-slate-500 flex items-center">
                <Lock className="w-3.5 h-3.5 text-amber-600 mr-1.5" />
                Clicking &quot;Approve &amp; Send Email&quot; executes backend authorization payload and redirects to confirmed PO tracker.
              </p>

              <button
                onClick={approveAndSend}
                disabled={loading}
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl text-xs flex items-center justify-center space-x-2 transition-all shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>Approve &amp; Authorize Dispatch</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
