import type { Metadata } from "next";
import { ContractInteraction } from "@/components/ContractInteraction";

export const metadata: Metadata = {
  title: "Contract Interaction | Stellar Tip Jar",
  description: "Interact directly with Soroban smart contracts on the Stellar network.",
};

export default function ContractPage() {
  return (
    <section className="mx-auto max-w-2xl space-y-8 py-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-ink">Contract Interaction</h1>
        <p className="mt-2 text-ink/60">
          Call Soroban smart contract functions directly. Estimate fees before submitting.
        </p>
      </div>

      <div className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-6">
        <ContractInteraction />
      </div>

      <div className="rounded-xl border border-ink/10 bg-[color:var(--surface)] p-4 text-sm text-ink/60 space-y-1">
        <p className="font-medium text-ink/80">How it works</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Enter the Soroban contract address (starts with C).</li>
          <li>Enter the function name you want to call.</li>
          <li>Add any required parameters with their types and values.</li>
          <li>Click <strong>Estimate Fee</strong> to simulate the transaction first.</li>
          <li>Click <strong>Call Contract</strong> to sign and submit.</li>
        </ol>
      </div>
    </section>
  );
}
