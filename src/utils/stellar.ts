import { Horizon } from "@stellar/stellar-sdk";

import {
  type StellarNetwork,
  DEFAULT_NETWORK,
  NETWORKS,
} from "@/lib/wallet";

export type { StellarNetwork };

export const STELLAR_NETWORK = DEFAULT_NETWORK;
export const STELLAR_HORIZON_URL = NETWORKS[STELLAR_NETWORK].horizonUrl;

export const stellarServer = new Horizon.Server(STELLAR_HORIZON_URL);

export const getNetworkPassphrase = (
  network: StellarNetwork = STELLAR_NETWORK
) => NETWORKS[network].passphrase;

export const formatAddress = (address: string) => {
  if (!address) return "";
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

export const getBalance = async (
  publicKey: string,
  network: StellarNetwork = STELLAR_NETWORK
) => {
  try {
    const horizonUrl = NETWORKS[network].horizonUrl;
    const server =
      network === STELLAR_NETWORK
        ? stellarServer
        : new Horizon.Server(horizonUrl);
    const account = await server.loadAccount(publicKey);
    const balance = account.balances.find((b) => b.asset_type === "native");
    return balance ? balance.balance : "0.0";
  } catch (error) {
    console.error("Failed to fetch balance:", error);
    return "0.0";
  }
};

