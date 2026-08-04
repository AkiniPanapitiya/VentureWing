'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface SourcingBriefState {
  projectId: number;
  projectName: string;
  category: string;
  fabricType: string;
  gsm: number;
  zipper: string;
  stitchingTolerance: string;
  hsCode: string;
  hsDescription: string;
  fobPrice: number;
  quantity: number;
  freightMode: 'sea' | 'air';
  freightUsd: number;
  exchangeRate: number;
  parsedHsCode?: string;
  matchedSupplier: {
    id: string;
    name: string;
    country: string;
    location: string;
    matchScore: number;
    isZeroDuty?: boolean;
  };
  tariffResult?: {
    cifUsd: number;
    cidUsd: number;
    palUsd: number;
    cessUsd: number;
    vatUsd: number;
    totalLandedUsd: number;
    totalLandedLkr: number;
  };
  negotiation?: {
    targetFob: number;
    projectedSavingsUsd: number;
    emailSubject: string;
    emailBody: string;
    isApproved: boolean;
    userSignature: string;
    contractId: string;
  };
}

const defaultState: SourcingBriefState = {
  projectId: 1,
  projectName: 'Cotton Tee V2',
  category: 'Apparel / Essentials',
  fabricType: '220 GSM Organic Cotton Canvas',
  gsm: 220,
  zipper: 'YKK #5 Brass Antiqued',
  stitchingTolerance: '±0.1mm',
  hsCode: '5208.11.00',
  parsedHsCode: '5208.11.00',
  hsDescription: 'Woven fabrics of cotton, unbleached, weight <= 200g/m2',
  fobPrice: 4.25,
  quantity: 2000,
  freightMode: 'sea',
  freightUsd: 1200.0,
  exchangeRate: 310.45,
  matchedSupplier: {
    id: 'zhejiang',
    name: 'Zhejiang Apparel Tech Co.',
    country: 'China',
    location: 'Hangzhou',
    matchScore: 98,
  },
  tariffResult: {
    cifUsd: 26200.0,
    cidUsd: 0.0,
    palUsd: 2620.0,
    cessUsd: 3930.0,
    vatUsd: 5895.0,
    totalLandedUsd: 38645.0,
    totalLandedLkr: 11997340.25,
  },
  negotiation: {
    targetFob: 3.85,
    projectedSavingsUsd: 42500.0,
    emailSubject: 'Counter-Offer RFQ #882: Cotton Tee V2 Batch Production',
    emailBody:
      'Dear Zhejiang Apparel Tech Sales Team,\n\nWe propose a target FOB price of $3.85 USD for our initial 50,000 unit production run.',
    isApproved: false,
    userSignature: 'Kavindu Perera',
    contractId: 'PO-2026-LK-882',
  },
};

interface SourcingContextType {
  briefState: SourcingBriefState;
  updateIngestionSpecs: (specs: Partial<SourcingBriefState>) => void;
  updateParsedSpecs: (specs: any) => void;
  setSelectedSupplier: (supplier: any) => void;
  setLandedCostCalculation: (calc: any) => void;
  updateTariffCalculation: (
    hsCode: string,
    hsDescription: string,
    freightMode: 'sea' | 'air',
    freightUsd: number,
    tariffResult: SourcingBriefState['tariffResult']
  ) => void;
  authorizeContract: (
    targetFob: number,
    contractId: string,
    userSignature: string,
    emailSubject: string,
    emailBody: string
  ) => void;
  resetToDefaults: () => void;
}

const SourcingContext = createContext<SourcingContextType | undefined>(undefined);

export const SourcingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [briefState, setBriefState] = useState<SourcingBriefState>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('venturewing_sourcing_state');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          return defaultState;
        }
      }
    }
    return defaultState;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('venturewing_sourcing_state', JSON.stringify(briefState));
    }
  }, [briefState]);

  const updateIngestionSpecs = (specs: Partial<SourcingBriefState>) => {
    setBriefState((prev) => ({
      ...prev,
      ...specs,
    }));
  };

  const updateParsedSpecs = (specs: any) => {
    setBriefState((prev) => ({
      ...prev,
      fabricType: specs.fabricType || prev.fabricType,
      gsm: specs.gsm || prev.gsm,
      zipper: specs.zipper || prev.zipper,
      stitchingTolerance: specs.stitchingTolerance || prev.stitchingTolerance,
      hsCode: specs.parsedHsCode || specs.hsCode || prev.hsCode,
      parsedHsCode: specs.parsedHsCode || specs.hsCode || prev.hsCode,
    }));
  };

  const setSelectedSupplier = (supplier: any) => {
    setBriefState((prev) => ({
      ...prev,
      matchedSupplier: {
        id: String(supplier.id || 'supplier'),
        name: supplier.name || 'Supplier',
        country: supplier.country || 'China',
        location: supplier.location || 'Hangzhou',
        matchScore: supplier.matchScore || supplier.match_score || 90,
        isZeroDuty: supplier.isZeroDuty || supplier.is_zero_duty || false,
      },
      fobPrice: supplier.fobPrice || supplier.fob_price || prev.fobPrice,
    }));
  };

  const setLandedCostCalculation = (calc: any) => {
    setBriefState((prev) => ({
      ...prev,
      hsCode: calc.hs_code || calc.hsCode || prev.hsCode,
      parsedHsCode: calc.hs_code || calc.hsCode || prev.parsedHsCode,
      tariffResult: {
        cifUsd: calc.cif_usd || calc.cifUsd || 0,
        cidUsd: calc.cid_usd || calc.cidUsd || 0,
        palUsd: calc.pal_usd || calc.palUsd || 0,
        cessUsd: calc.cess_usd || calc.cessUsd || 0,
        vatUsd: calc.vat_usd || calc.vatUsd || 0,
        totalLandedUsd: calc.total_landed_usd || calc.totalLandedUsd || 0,
        totalLandedLkr: calc.total_landed_lkr || calc.totalLandedLkr || 0,
      },
    }));
  };

  const updateTariffCalculation = (
    hsCode: string,
    hsDescription: string,
    freightMode: 'sea' | 'air',
    freightUsd: number,
    tariffResult: SourcingBriefState['tariffResult']
  ) => {
    setBriefState((prev) => ({
      ...prev,
      hsCode,
      parsedHsCode: hsCode,
      hsDescription,
      freightMode,
      freightUsd,
      tariffResult,
    }));
  };

  const authorizeContract = (
    targetFob: number,
    contractId: string,
    userSignature: string,
    emailSubject: string,
    emailBody: string
  ) => {
    setBriefState((prev) => ({
      ...prev,
      negotiation: {
        targetFob,
        projectedSavingsUsd: (prev.fobPrice - targetFob) * 50000,
        emailSubject,
        emailBody,
        isApproved: true,
        userSignature,
        contractId,
      },
    }));
  };

  const resetToDefaults = () => {
    setBriefState(defaultState);
  };

  return (
    <SourcingContext.Provider
      value={{
        briefState,
        updateIngestionSpecs,
        updateParsedSpecs,
        setSelectedSupplier,
        setLandedCostCalculation,
        updateTariffCalculation,
        authorizeContract,
        resetToDefaults,
      }}
    >
      {children}
    </SourcingContext.Provider>
  );
};

export const useSourcingContext = () => {
  const context = useContext(SourcingContext);
  if (!context) {
    throw new Error('useSourcingContext must be used within a SourcingProvider');
  }
  return context;
};
