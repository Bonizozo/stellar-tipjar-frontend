"use client";

import { useWalletContext } from "@/contexts/WalletContext";

export function useWallet() {
  return useWalletContext();
}
