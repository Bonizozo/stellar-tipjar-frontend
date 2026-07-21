export enum WalletErrorCode {
  NOT_INSTALLED = "NOT_INSTALLED",
  USER_DECLINED = "USER_DECLINED",
  NETWORK_MISMATCH = "NETWORK_MISMATCH",
  SESSION_STALE = "SESSION_STALE",
}

const ERROR_MESSAGES: Record<WalletErrorCode, string> = {
  [WalletErrorCode.NOT_INSTALLED]:
    "Freighter wallet is not installed. Please install it from https://freighter.app",
  [WalletErrorCode.USER_DECLINED]: "Wallet permission was declined.",
  [WalletErrorCode.NETWORK_MISMATCH]:
    "Freighter network does not match the app network. Please switch your network in Freighter.",
  [WalletErrorCode.SESSION_STALE]:
    "Persisted session is no longer valid. Please reconnect your wallet.",
};

export class WalletError extends Error {
  readonly code: WalletErrorCode;

  constructor(code: WalletErrorCode, message?: string) {
    super(message ?? ERROR_MESSAGES[code]);
    this.name = "WalletError";
    this.code = code;
  }
}
