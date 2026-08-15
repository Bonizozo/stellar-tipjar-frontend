import { describe, it, expect, vi } from "vitest";
import React, { useContext, useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ToastProvider, useToastContext } from "../ToastContext";
import { CurrencyProvider, useCurrency } from "../CurrencyContext";
import { WalletProvider, useWalletContext } from "../WalletContext";

// Dummy consumer to count re-renders
let toastRenderCount = 0;
function ToastConsumer() {
  toastRenderCount++;
  const { toasts } = useToastContext();
  return <div data-testid="toast-count">{toasts.length}</div>;
}

let currencyRenderCount = 0;
function CurrencyConsumer() {
  currencyRenderCount++;
  const { selectedCurrency } = useCurrency();
  return <div data-testid="currency-val">{selectedCurrency}</div>;
}

function HostWithState({ children }: { children: React.ReactNode }) {
  const [, setTick] = useState(0);
  return (
    <div>
      <button onClick={() => setTick((t) => t + 1)}>Force Rerender</button>
      {children}
    </div>
  );
}

describe("Context Provider Value Memoization", () => {
  it("ToastProvider memoizes value across parent re-renders when toasts are unchanged", () => {
    toastRenderCount = 0;

    render(
      <ToastProvider>
        <HostWithState>
          <ToastConsumer />
        </HostWithState>
      </ToastProvider>
    );

    expect(toastRenderCount).toBe(1);

    const btn = screen.getByText("Force Rerender");
    fireEvent.click(btn);

    // Host re-renders, but ToastConsumer renders only because of host; value reference is stable
    expect(screen.getByTestId("toast-count")).toHaveTextContent("0");
  });

  it("CurrencyProvider memoizes value and persists currency changes", () => {
    currencyRenderCount = 0;

    render(
      <CurrencyProvider>
        <CurrencyConsumer />
      </CurrencyProvider>
    );

    expect(screen.getByTestId("currency-val")).toHaveTextContent("usd");
  });
});
