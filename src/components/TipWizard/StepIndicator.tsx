"use client";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <nav aria-label="Tip wizard progress" className="mb-8">
      <ol className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          return (
            <li key={step} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-1">
                <div
                  aria-current={isCurrent ? "step" : undefined}
                  className={[
                    "flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-colors",
                    isCompleted
                      ? "bg-purple-600 text-white"
                      : isCurrent
                      ? "border-2 border-purple-600 text-purple-600"
                      : "border-2 border-gray-300 text-gray-400 dark:border-gray-600 dark:text-gray-500",
                  ].join(" ")}
                >
                  {isCompleted ? (
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={[
                    "hidden text-xs font-medium sm:block",
                    isCurrent ? "text-purple-600" : isCompleted ? "text-gray-700 dark:text-gray-300" : "text-gray-400",
                  ].join(" ")}
                >
                  {step}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={[
                    "mx-2 h-0.5 flex-1 transition-colors",
                    isCompleted ? "bg-purple-600" : "bg-gray-200 dark:bg-gray-700",
                  ].join(" ")}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
