"use client";

import { useState, useCallback } from "react";
import { Contract, Networks, TransactionBuilder, BASE_FEE, rpc as StellarRpc } from "@stellar/stellar-sdk";
import { useWalletContext } from "@/contexts/WalletContext";

export type TxStatus = "idle" | "estimating" | "signing" | "submitting" | "success" | "error";

export interface ContractParam {
  name: string;
  type: "string" | "number" | "address" | "boolean";
  value: string;
}

export interface ContractCallResult {
  txHash: string | null;
  result: string | null;
  fee: string | null;
  status: TxStatus;
  error: string | null;
}

const SOROBAN_RPC_URLS: Record<string, string> = {
  TESTNET: "https://soroban-testnet.stellar.org",
  PUBLIC: "https://soroban.stellar.org",
};

const NETWORK_PASSPHRASES: Record<string, string> = {
  TESTNET: Networks.TESTNET,
  PUBLIC: Networks.PUBLIC,
};

function buildScVal(param: ContractParam) {
  const { xdr } = require("@stellar/stellar-sdk");
  switch (param.type) {
    case "number":
      return xdr.ScVal.scvI128(
        new xdr.Int128Parts({ hi: xdr.Int64.fromString("0"), lo: xdr.Uint64.fromString(param.value || "0") })
      );
    case "boolean":
      return xdr.ScVal.scvBool(param.value === "true");
    case "address": {
      const { Address } = require("@stellar/stellar-sdk");
      return new Address(param.value).toScVal();
    }
    default:
      return xdr.ScVal.scvString(param.value);
  }
}

export function useContractInteraction() {
  const { publicKey, network, signStellarTransaction, isConnected } = useWalletContext();

  const [status, setStatus] = useState<TxStatus>("idle");
  const [txHash, setTxHash] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [estimatedFee, setEstimatedFee] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setStatus("idle");
    setTxHash(null);
    setResult(null);
    setEstimatedFee(null);
    setError(null);
  }, []);

  const estimateFee = useCallback(
    async (contractId: string, functionName: string, params: ContractParam[]): Promise<string | null> => {
      if (!publicKey || !isConnected) {
        setError("Wallet not connected.");
        return null;
      }

      setStatus("estimating");
      setError(null);

      try {
        const rpcUrl = SOROBAN_RPC_URLS[network] ?? SOROBAN_RPC_URLS.TESTNET;
        const server = new StellarRpc.Server(rpcUrl);
        const account = await server.getAccount(publicKey);

        const contract = new Contract(contractId);
        const scArgs = params.map(buildScVal);

        const tx = new TransactionBuilder(account, {
          fee: BASE_FEE,
          networkPassphrase: NETWORK_PASSPHRASES[network] ?? NETWORK_PASSPHRASES.TESTNET,
        })
          .addOperation(contract.call(functionName, ...scArgs))
          .setTimeout(30)
          .build();

        const simResult = await server.simulateTransaction(tx);

        if (StellarRpc.Api.isSimulationError(simResult)) {
          throw new Error(simResult.error);
        }

        const fee = StellarRpc.Api.isSimulationSuccess(simResult)
          ? String(simResult.minResourceFee ?? BASE_FEE)
          : BASE_FEE;

        const feeXlm = (parseInt(fee, 10) / 1e7).toFixed(7);
        setEstimatedFee(feeXlm);
        setStatus("idle");
        return feeXlm;
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Fee estimation failed.";
        setError(msg);
        setStatus("error");
        return null;
      }
    },
    [publicKey, network, isConnected],
  );

  const callContract = useCallback(
    async (contractId: string, functionName: string, params: ContractParam[]): Promise<ContractCallResult> => {
      if (!publicKey || !isConnected) {
        const errMsg = "Wallet not connected.";
        setError(errMsg);
        setStatus("error");
        return { txHash: null, result: null, fee: null, status: "error", error: errMsg };
      }

      setStatus("estimating");
      setError(null);
      setTxHash(null);
      setResult(null);

      try {
        const rpcUrl = SOROBAN_RPC_URLS[network] ?? SOROBAN_RPC_URLS.TESTNET;
        const server = new StellarRpc.Server(rpcUrl);
        const account = await server.getAccount(publicKey);

        const contract = new Contract(contractId);
        const scArgs = params.map(buildScVal);

        const tx = new TransactionBuilder(account, {
          fee: BASE_FEE,
          networkPassphrase: NETWORK_PASSPHRASES[network] ?? NETWORK_PASSPHRASES.TESTNET,
        })
          .addOperation(contract.call(functionName, ...scArgs))
          .setTimeout(30)
          .build();

        const simResult = await server.simulateTransaction(tx);

        if (StellarRpc.Api.isSimulationError(simResult)) {
          throw new Error(simResult.error);
        }

        const fee = StellarRpc.Api.isSimulationSuccess(simResult)
          ? String(simResult.minResourceFee ?? BASE_FEE)
          : BASE_FEE;
        const feeXlm = (parseInt(fee, 10) / 1e7).toFixed(7);
        setEstimatedFee(feeXlm);

        const preparedTx = StellarRpc.assembleTransaction(tx, simResult).build();

        setStatus("signing");
        const signedXdr = await signStellarTransaction(preparedTx.toXDR());

        setStatus("submitting");
        const { TransactionBuilder: TB } = require("@stellar/stellar-sdk");
        const signedTx = TB.fromXDR(signedXdr, NETWORK_PASSPHRASES[network] ?? NETWORK_PASSPHRASES.TESTNET);
        const sendResult = await server.sendTransaction(signedTx);

        if (sendResult.status === "ERROR") {
          throw new Error(sendResult.errorResult?.result().toString() ?? "Transaction failed.");
        }

        const hash = sendResult.hash;
        setTxHash(hash);

        // Poll for result
        let getResult = await server.getTransaction(hash);
        let attempts = 0;
        while (getResult.status === "NOT_FOUND" && attempts < 20) {
          await new Promise((r) => setTimeout(r, 1500));
          getResult = await server.getTransaction(hash);
          attempts++;
        }

        if (getResult.status === "SUCCESS") {
          const returnVal = getResult.returnValue;
          const resultStr = returnVal ? JSON.stringify(returnVal) : "success";
          setResult(resultStr);
          setStatus("success");
          return { txHash: hash, result: resultStr, fee: feeXlm, status: "success", error: null };
        } else if (getResult.status === "FAILED") {
          throw new Error("Transaction failed on-chain.");
        } else {
          throw new Error("Transaction confirmation timed out.");
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Contract call failed.";
        setError(msg);
        setStatus("error");
        return { txHash: null, result: null, fee: null, status: "error", error: msg };
      }
    },
    [publicKey, network, isConnected, signStellarTransaction],
  );

  return {
    status,
    txHash,
    result,
    estimatedFee,
    error,
    isLoading: status === "estimating" || status === "signing" || status === "submitting",
    callContract,
    estimateFee,
    reset,
  };
}
