import {
  Asset,
  Horizon,
  Memo,
  Networks,
  Operation,
  TransactionBuilder,
} from "@stellar/stellar-sdk";

import type { StellarNetwork } from "@/lib/stellar/types";

const HORIZON_URLS: Record<StellarNetwork, string> = {
  PUBLIC: "https://horizon.stellar.org",
  TESTNET: "https://horizon-testnet.stellar.org",
};

const NETWORK_PASSPHRASES: Record<StellarNetwork, string> = {
  PUBLIC: Networks.PUBLIC,
  TESTNET: Networks.TESTNET,
};

const BASE_FEE = "100";
const TX_TIMEOUT_SECONDS = 30;

export interface TipTransactionParams {
  sourcePublicKey: string;
  destinationPublicKey: string;
  amount: string;
  memo?: string;
  network: StellarNetwork;
}

/**
 * Builds an unsigned XDR-encoded payment transaction for tipping.
 */
export async function buildTipTransaction({
  sourcePublicKey,
  destinationPublicKey,
  amount,
  memo,
  network,
}: TipTransactionParams): Promise<string> {
  const server = new Horizon.Server(HORIZON_URLS[network]);
  const sourceAccount = await server.loadAccount(sourcePublicKey);

  const builder = new TransactionBuilder(sourceAccount, {
    fee: BASE_FEE,
    networkPassphrase: NETWORK_PASSPHRASES[network],
  })
    .addOperation(
      Operation.payment({
        destination: destinationPublicKey,
        asset: Asset.native(),
        amount,
      }),
    )
    .setTimeout(TX_TIMEOUT_SECONDS);

  if (memo) {
    builder.addMemo(Memo.text(memo));
  }

  return builder.build().toXDR();
}

/**
 * Submits a signed XDR transaction to the Stellar network.
 */
export async function submitTransaction(
  signedXdr: string,
  network: StellarNetwork,
): Promise<Horizon.HorizonApi.SubmitTransactionResponse> {
  const server = new Horizon.Server(HORIZON_URLS[network]);
  const { TransactionBuilder } = await import("@stellar/stellar-sdk");
  const tx = TransactionBuilder.fromXDR(signedXdr, NETWORK_PASSPHRASES[network]);
  return server.submitTransaction(tx);
}
