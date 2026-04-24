export type WalletProviderType = "freighter";

export type StellarNetwork = "PUBLIC" | "TESTNET";

export interface WalletProvider {
  readonly provider: WalletProviderType;
  isInstalled: () => Promise<boolean>;
  connect: () => Promise<string>;
  disconnect: () => Promise<void>;
  getNetwork: () => Promise<StellarNetwork>;
  signTransaction: (xdr: string, network: StellarNetwork) => Promise<string>;
  getBalance: (publicKey: string, network: StellarNetwork) => Promise<string>;
}

export interface WalletConnection {
  provider: WalletProviderType;
  publicKey: string;
  network: StellarNetwork;
}
