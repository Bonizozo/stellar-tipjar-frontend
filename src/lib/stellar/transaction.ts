import {
  Asset,
  Horizon,
  Memo,
  Operation,
  TransactionBuilder,
} from "@stellar/stellar-sdk";

import { type StellarNetwork, NETWORKS } from "@/lib/wallet";

const BASE_FEE = "100";
const TX_TIMEOUT_SECONDS = 30;

export interface TipTransactionParams {
  sourcePublicKey: string;
  destinationPublicKey: string;
  amount: string;
  memo?: string;
  network: StellarNetwork;
}

export async function buildTipTransaction({
  sourcePublicKey,
  destinationPublicKey,
  amount,
  memo,
  network,
}: TipTransactionParams): Promise<string> {
  const config = NETWORKS[network];
  const server = new Horizon.Server(config.horizonUrl);
  const sourceAccount = await server.loadAccount(sourcePublicKey);

  const builder = new TransactionBuilder(sourceAccount, {
    fee: BASE_FEE,
    networkPassphrase: config.passphrase,
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

export async function submitTransaction(
  signedXdr: string,
  network: StellarNetwork,
): Promise<Horizon.HorizonApi.SubmitTransactionResponse> {
  const config = NETWORKS[network];
  const server = new Horizon.Server(config.horizonUrl);
  const tx = TransactionBuilder.fromXDR(signedXdr, config.passphrase);
  return server.submitTransaction(tx);
}
