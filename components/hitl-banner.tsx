'use client';

import React from 'react';
import { AlertTriangle, ShieldAlert, Lock } from 'lucide-react';

export interface HitlBannerProps {
  status?: string;
  isAuthorized?: boolean;
}

export const HitlBanner: React.FC<HitlBannerProps> = ({
  status = 'PENDING_AUTHORIZATION',
  isAuthorized = false,
}) => {
  return (
    <div
      className={`rounded-2xl p-4 mb-6 border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs ${
        isAuthorized
          ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
          : 'bg-amber-50 border-amber-300 text-amber-950'
      }`}
    >
      <div className="flex items-center space-x-3">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0 ${
            isAuthorized
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-amber-100 text-amber-800 animate-pulse'
          }`}
        >
          {isAuthorized ? <Lock className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
        </div>

        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-black uppercase tracking-wider">
              {isAuthorized ? '✓ Human-In-The-Loop Authorized' : '⚠️ Human-In-The-Loop Safety Gate Active'}
            </span>
            <span
              className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border ${
                isAuthorized
                  ? 'bg-emerald-200 text-emerald-900 border-emerald-300'
                  : 'bg-amber-200 text-amber-900 border-amber-400'
              }`}
            >
              {isAuthorized ? 'DISPATCH READY' : 'OUTBOUND BLOCKED'}
            </span>
          </div>
          <p className="text-xs mt-0.5 font-medium leading-relaxed">
            {isAuthorized
              ? 'AI outbound email dispatch authorization verified by user token. Ready for purchase order creation.'
              : 'AI outbound action blocked until explicit user authorization. No emails will be dispatched to suppliers without sign-off.'}
          </p>
        </div>
      </div>
    </div>
  );
};
