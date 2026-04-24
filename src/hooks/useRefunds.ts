"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

export type RefundStatus = "pending" | "approved" | "denied" | "processed";

export interface RefundRequest {
  id: string;
  tipId: string;
  amount: number;
  memo?: string;
  requestedAt: string;
  tipDate: string;
  status: RefundStatus;
  creatorNote?: string;
  decisionAt?: string;
  processedAt?: string;
}

const STORAGE_KEY = "stellar_tipjar_refunds";
const GRACE_PERIOD_DAYS = 14;

const parseRequests = (value: string | null): RefundRequest[] => {
  if (!value) return [];
  try {
    return JSON.parse(value) as RefundRequest[];
  } catch {
    return [];
  }
};

const formatIso = (date = new Date()) => new Date(date).toISOString();

export function useRefunds() {
  const [refunds, setRefunds] = useState<RefundRequest[]>([]);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    setRefunds(parseRequests(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(refunds));
  }, [refunds]);

  const isInGracePeriod = useCallback((tipDate: string) => {
    const then = new Date(tipDate).getTime();
    const now = Date.now();
    const diffDays = (now - then) / (1000 * 60 * 60 * 24);
    return diffDays <= GRACE_PERIOD_DAYS;
  }, []);

  const requestRefund = useCallback(
    ({ tipId, amount, memo, tipDate }: { tipId: string; amount: number; memo?: string; tipDate: string }) => {
      if (!isInGracePeriod(tipDate)) {
        throw new Error(`Tip is outside the ${GRACE_PERIOD_DAYS}-day grace period`);
      }
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const newRequest: RefundRequest = {
        id,
        tipId,
        amount,
        memo,
        requestedAt: formatIso(),
        tipDate,
        status: "pending",
      };
      setRefunds((prev: RefundRequest[]) => [newRequest, ...prev]);
      return newRequest;
    },
    [isInGracePeriod]
  );

  const approveRefund = useCallback((id: string, creatorNote?: string) => {
    setRefunds((prev: RefundRequest[]) =>
      prev.map((r: RefundRequest) => (r.id === id ? { ...r, status: "approved", creatorNote, decisionAt: formatIso() } : r))
    );
  }, []);

  const denyRefund = useCallback((id: string, creatorNote?: string) => {
    setRefunds((prev: RefundRequest[]) =>
      prev.map((r: RefundRequest) => (r.id === id ? { ...r, status: "denied", creatorNote, decisionAt: formatIso() } : r))
    );
  }, []);

  const processRefund = useCallback((id: string) => {
    setRefunds((prev: RefundRequest[]) =>
      prev.map((r: RefundRequest) =>
        r.id === id
          ? {
              ...r,
              status: "processed",
              processedAt: formatIso(),
            }
          : r
      )
    );
  }, []);

  const pendingRequests = useMemo(() => refunds.filter((r: RefundRequest) => r.status === "pending"), [refunds]);
  const approvedRequests = useMemo(() => refunds.filter((r: RefundRequest) => r.status === "approved"), [refunds]);

  return {
    refunds,
    pendingRequests,
    approvedRequests,
    requestRefund,
    approveRefund,
    denyRefund,
    processRefund,
    isInGracePeriod,
  };
}
