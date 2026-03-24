import {
  isConnected,
  getAddress,
  signTransaction,
  isAllowed,
  setAllowed,
} from "@stellar/freighter-api";

export interface WalletInfo {
  publicKey: string | null;
  network: string;
}

function readBooleanProp(value: unknown, key: string): boolean {
  if (typeof value === "object" && value !== null && key in value) {
    const propValue = (value as Record<string, unknown>)[key];
    return propValue === true;
  }

  return value === true;
}

function readStringProp(value: unknown, key: string): string | null {
  if (typeof value === "object" && value !== null && key in value) {
    const propValue = (value as Record<string, unknown>)[key];
    return typeof propValue === "string" ? propValue : null;
  }

  return null;
}

export const walletService = {
  isAvailable: async () => {
    try {
      const result = await isConnected();
      return readBooleanProp(result, "isConnected");
    } catch (e) {
      console.warn("Freighter connection check failed", e);
      return false;
    }
  },

  isAllowed: async () => {
    try {
      const result = await isAllowed();
      return readBooleanProp(result, "isAllowed");
    } catch (e) {
      console.warn("Freighter permission check failed", e);
      return false;
    }
  },

  connect: async (): Promise<string | null> => {
    try {
      const connection = await isConnected();
      const isConnectedBool = readBooleanProp(connection, "isConnected");
      if (!isConnectedBool) {
        throw new Error("FREIGHTER_NOT_INSTALLED");
      }

      // Check if already allowed, if not setAllowed
      const allowed = await isAllowed();
      const isAllowedBool = readBooleanProp(allowed, "isAllowed");
      if (!isAllowedBool) {
        const setAllowedResult = await setAllowed();
        const isSetAllowedBool = readBooleanProp(setAllowedResult, "isAllowed");
        if (!isSetAllowedBool) {
          throw new Error("USER_DECLINED");
        }
      }

      const result = await getAddress();
      if (typeof result === "string") {
        return result;
      }
      const address = readStringProp(result, "address");
      if (address) {
        return address;
      }
      const errorMessage = readStringProp(result, "error");
      if (errorMessage) {
        throw new Error(errorMessage);
      }
      return null;
    } catch (error: unknown) {
      console.error("Failed to connect wallet:", error);
      if (
        error instanceof Error &&
        (error.message === "User declined access" || error.message === "USER_DECLINED")
      ) {
        throw new Error("USER_DECLINED");
      }
      throw error;
    }
  },

  sign: async (xdr: string, network: string) => {
    try {
      const result = await signTransaction(xdr, {
        networkPassphrase: network,
      });
      if (typeof result === "string") {
        return result;
      }
      const signedTxXdr = readStringProp(result, "signedTxXdr");
      if (signedTxXdr) {
        return signedTxXdr;
      }
      const errorMessage = readStringProp(result, "error");
      if (errorMessage) {
        throw new Error(errorMessage);
      }
      throw new Error("Signing failed");
    } catch (error) {
      console.error("Signing failed:", error);
      throw error;
    }
  },
};
