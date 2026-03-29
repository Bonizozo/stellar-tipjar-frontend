"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { StepIndicator } from "./StepIndicator";
import { AmountStep, type AmountStepData } from "./AmountStep";
import { MessageStep, type MessageStepData } from "./MessageStep";
import { ConfirmStep } from "./ConfirmStep";
import { SuccessStep } from "./SuccessStep";

const STEPS = ["Amount", "Message", "Confirm", "Success"];

interface TipWizardProps {
  creatorUsername: string;
}

export function TipWizard({ creatorUsername }: TipWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [amountData, setAmountData] = useState<AmountStepData>({ amount: 5, asset: "XLM" });
  const [messageData, setMessageData] = useState<MessageStepData>({ message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    if (currentStep === 0) {
      if (!amountData.amount || amountData.amount <= 0) {
        setErrors({ amount: "Please enter a valid amount greater than 0." });
        return false;
      }
    }
    setErrors({});
    return true;
  };

  const next = () => {
    if (!validate()) return;
    setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const back = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const reset = () => {
    setCurrentStep(0);
    setAmountData({ amount: 5, asset: "XLM" });
    setMessageData({ message: "" });
    setErrors({});
  };

  const isSuccess = currentStep === 3;

  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-950 sm:p-8">
      <StepIndicator steps={STEPS} currentStep={currentStep} />

      <AnimatePresence mode="wait">
        {currentStep === 0 && (
          <AmountStep key="amount" data={amountData} onChange={setAmountData} error={errors.amount} />
        )}
        {currentStep === 1 && (
          <MessageStep key="message" data={messageData} onChange={setMessageData} error={errors.message} />
        )}
        {currentStep === 2 && (
          <ConfirmStep key="confirm" amount={amountData} message={messageData} creatorUsername={creatorUsername} />
        )}
        {currentStep === 3 && (
          <SuccessStep
            key="success"
            amount={amountData.amount}
            asset={amountData.asset}
            creatorUsername={creatorUsername}
            onReset={reset}
          />
        )}
      </AnimatePresence>

      {!isSuccess && (
        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={back}
            disabled={currentStep === 0}
            className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Back
          </button>
          <button
            type="button"
            onClick={next}
            className="rounded-xl bg-purple-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50"
          >
            {currentStep === 2 ? "Send Tip" : "Next"}
          </button>
        </div>
      )}
    </div>
  );
}
