"use client";

import { useWalletContext } from "@/contexts/WalletContext";
import { formatAddress } from "@/utils/stellar";

export function useWallet() {
  const context = useWalletContext();

  return {
    ...context,
    shortAddress: context.publicKey ? formatAddress(context.publicKey) : "",
  };
}
