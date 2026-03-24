import { Horizon, Networks } from "@stellar/stellar-sdk";

export const STELLAR_NETWORK = (process.env.NEXT_PUBLIC_STELLAR_NETWORK ?? "TESTNET").toUpperCase();
export const STELLAR_HORIZON_URL = process.env.NEXT_PUBLIC_STELLAR_HORIZON_URL ?? 
  (STELLAR_NETWORK === "PUBLIC" 
    ? "https://horizon.stellar.org" 
    : "https://horizon-testnet.stellar.org");

export const stellarServer = new Horizon.Server(STELLAR_HORIZON_URL);

export const getNetworkPassphrase = () => {
  return STELLAR_NETWORK === "PUBLIC" ? Networks.PUBLIC : Networks.TESTNET;
};

export const formatAddress = (address: string) => {
  if (!address) return "";
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

export const getBalance = async (publicKey: string) => {
  try {
    const account = await stellarServer.loadAccount(publicKey);
    const balance = account.balances.find((b) => b.asset_type === "native");
    return balance ? balance.balance : "0.0";
  } catch (error) {
    console.error("Failed to fetch balance:", error);
    return "0.0";
  }
};
