"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/Button";
import { useContractInteraction, type ContractParam } from "@/hooks/useContractInteraction";
import { useWalletContext } from "@/contexts/WalletContext";

const PARAM_TYPES = ["string", "number", "address", "boolean"] as const;

const STATUS_LABELS: Record<string, string> = {
  idle: "",
  estimating: "Simulating transaction…",
  signing: "Waiting for wallet signature…",
  submitting: "Submitting to network…",
  success: "Transaction confirmed!",
  error: "Transaction failed.",
};

function ParamRow({
  param,
  index,
  onChange,
  onRemove,
}: {
  param: ContractParam;
  index: number;
  onChange: (index: number, field: keyof ContractParam, value: string) => void;
  onRemove: (index: number) => void;
}) {
  return (
    <div className="flex gap-2 items-start">
      <input
        aria-label={`Parameter ${index + 1} name`}
        className="w-32 rounded-lg border border-ink/20 bg-[color:var(--surface)] px-3 py-2 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
        placeholder="name"
        value={param.name}
        onChange={(e) => onChange(index, "name", e.target.value)}
      />
      <select
        aria-label={`Parameter ${index + 1} type`}
        className="rounded-lg border border-ink/20 bg-[color:var(--surface)] px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-purple-500/50"
        value={param.type}
        onChange={(e) => onChange(index, "type", e.target.value)}
      >
        {PARAM_TYPES.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      {param.type === "boolean" ? (
        <select
          aria-label={`Parameter ${index + 1} value`}
          className="flex-1 rounded-lg border border-ink/20 bg-[color:var(--surface)] px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          value={param.value}
          onChange={(e) => onChange(index, "value", e.target.value)}
        >
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
      ) : (
        <input
          aria-label={`Parameter ${index + 1} value`}
          className="flex-1 rounded-lg border border-ink/20 bg-[color:var(--surface)] px-3 py-2 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          placeholder="value"
          value={param.value}
          onChange={(e) => onChange(index, "value", e.target.value)}
        />
      )}
      <button
        type="button"
        aria-label={`Remove parameter ${index + 1}`}
        onClick={() => onRemove(index)}
        className="rounded-lg p-2 text-ink/40 hover:text-red-500 transition-colors"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

export function ContractInteraction() {
  const { isConnected, connect, isConnecting } = useWalletContext();
  const { status, txHash, result, estimatedFee, error, isLoading, callContract, estimateFee, reset } =
    useContractInteraction();

  const [contractId, setContractId] = useState("");
  const [functionName, setFunctionName] = useState("");
  const [params, setParams] = useState<ContractParam[]>([]);

  const addParam = useCallback(() => {
    setParams((prev) => [...prev, { name: "", type: "string", value: "" }]);
  }, []);

  const removeParam = useCallback((index: number) => {
    setParams((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const updateParam = useCallback((index: number, field: keyof ContractParam, value: string) => {
    setParams((prev) => prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)));
  }, []);

  const handleEstimate = async () => {
    if (!contractId.trim() || !functionName.trim()) return;
    await estimateFee(contractId.trim(), functionName.trim(), params);
  };

  const handleCall = async () => {
    if (!contractId.trim() || !functionName.trim()) return;
    await callContract(contractId.trim(), functionName.trim(), params);
  };

  const isFormValid = contractId.trim().length > 0 && functionName.trim().length > 0;

  return (
    <div className="space-y-6">
      {/* Contract ID */}
      <div className="space-y-1.5">
        <label htmlFor="contract-id" className="block text-sm font-medium text-ink">
          Contract ID
        </label>
        <input
          id="contract-id"
          type="text"
          className="w-full rounded-xl border border-ink/20 bg-[color:var(--surface)] px-4 py-2.5 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          placeholder="C... (Soroban contract address)"
          value={contractId}
          onChange={(e) => { setContractId(e.target.value); reset(); }}
          aria-describedby="contract-id-hint"
        />
        <p id="contract-id-hint" className="text-xs text-ink/50">
          Soroban contract address starting with C
        </p>
      </div>

      {/* Function Name */}
      <div className="space-y-1.5">
        <label htmlFor="function-name" className="block text-sm font-medium text-ink">
          Function Name
        </label>
        <input
          id="function-name"
          type="text"
          className="w-full rounded-xl border border-ink/20 bg-[color:var(--surface)] px-4 py-2.5 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          placeholder="e.g. transfer, balance, mint"
          value={functionName}
          onChange={(e) => { setFunctionName(e.target.value); reset(); }}
        />
      </div>

      {/* Parameters */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-ink">Parameters</span>
          <button
            type="button"
            onClick={addParam}
            className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950 transition-colors"
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add parameter
          </button>
        </div>

        {params.length === 0 && (
          <p className="text-xs text-ink/40 italic">No parameters — add one if the function requires arguments.</p>
        )}

        <div className="space-y-2">
          {params.map((param, i) => (
            <ParamRow key={i} param={param} index={i} onChange={updateParam} onRemove={removeParam} />
          ))}
        </div>
      </div>

      {/* Fee Estimate */}
      {estimatedFee && (
        <div className="rounded-xl border border-ink/10 bg-[color:var(--surface)] px-4 py-3 flex items-center justify-between">
          <span className="text-sm text-ink/60">Estimated fee</span>
          <span className="text-sm font-semibold text-ink">{estimatedFee} XLM</span>
        </div>
      )}

      {/* Status */}
      {status !== "idle" && (
        <div
          role="status"
          aria-live="polite"
          className={[
            "rounded-xl border px-4 py-3 text-sm",
            status === "success"
              ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
              : status === "error"
                ? "border-red-300 bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400"
                : "border-purple-300 bg-purple-50 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400",
          ].join(" ")}
        >
          <div className="flex items-center gap-2">
            {isLoading && (
              <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            )}
            <span>{STATUS_LABELS[status]}</span>
          </div>

          {error && <p className="mt-1 text-xs opacity-80">{error}</p>}

          {txHash && (
            <p className="mt-1 text-xs opacity-80 break-all">
              Tx:{" "}
              <a
                href={`https://stellar.expert/explorer/testnet/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {txHash}
              </a>
            </p>
          )}

          {result && status === "success" && (
            <p className="mt-1 text-xs opacity-80 break-all">Result: {result}</p>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        {!isConnected ? (
          <Button onClick={connect} loading={isConnecting} variant="primary">
            Connect Wallet
          </Button>
        ) : (
          <>
            <Button
              variant="outline"
              onClick={handleEstimate}
              disabled={!isFormValid || isLoading}
              loading={status === "estimating"}
            >
              Estimate Fee
            </Button>
            <Button
              variant="primary"
              onClick={handleCall}
              disabled={!isFormValid || isLoading}
              loading={isLoading && status !== "estimating"}
            >
              Call Contract
            </Button>
          </>
        )}

        {(status === "success" || status === "error") && (
          <Button variant="ghost" onClick={reset}>
            Reset
          </Button>
        )}
      </div>
    </div>
  );
}
