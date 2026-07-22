/**
 * Re-exports canonical Stellar types from the unified wallet module.
 *
 * @deprecated Import from "@/lib/wallet" directly instead.
 */
export type { StellarNetwork } from "@/lib/wallet";
export { WalletError, WalletErrorCode } from "@/lib/wallet";
export { NETWORKS, networkPassphrase, horizonUrl } from "@/lib/wallet";
