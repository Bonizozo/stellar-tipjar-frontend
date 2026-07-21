import { Networks } from "@stellar/stellar-sdk";

export type StellarNetwork = "TESTNET" | "PUBLIC";

export interface NetworkConfig {
  readonly passphrase: string;
  readonly horizonUrl: string;
  readonly sorobanRpcUrl: string;
  readonly friendbotUrl: string | null;
}

export const NETWORKS: Record<StellarNetwork, NetworkConfig> = {
  TESTNET: {
    passphrase: Networks.TESTNET,
    horizonUrl: "https://horizon-testnet.stellar.org",
    sorobanRpcUrl: "https://soroban-testnet.stellar.org",
    friendbotUrl: "https://friendbot.stellar.org",
  },
  PUBLIC: {
    passphrase: Networks.PUBLIC,
    horizonUrl: "https://horizon.stellar.org",
    sorobanRpcUrl: "https://soroban.stellar.org",
    friendbotUrl: null,
  },
} as const;

export const DEFAULT_NETWORK: StellarNetwork =
  (process.env.NEXT_PUBLIC_STELLAR_NETWORK?.toUpperCase() as StellarNetwork) || "TESTNET";

export function networkPassphrase(network: StellarNetwork): string {
  return NETWORKS[network].passphrase;
}

export function horizonUrl(network: StellarNetwork): string {
  return NETWORKS[network].horizonUrl;
}

export function sorobanRpcUrl(network: StellarNetwork): string {
  return NETWORKS[network].sorobanRpcUrl;
}

export function hasFriendbot(network: StellarNetwork): boolean {
  return NETWORKS[network].friendbotUrl !== null;
}

export function normalizeNetwork(value: unknown): StellarNetwork {
  const text =
    typeof value === "string"
      ? value
      : typeof value === "object" && value !== null
        ? ((value as Record<string, unknown>).network as string | undefined) ??
          ((value as Record<string, unknown>).networkUrl as string | undefined) ??
          "TESTNET"
        : "TESTNET";

  const upper = text.toUpperCase();
  return upper === "PUBLIC" || upper.includes("PUBNET") ? "PUBLIC" : "TESTNET";
}
