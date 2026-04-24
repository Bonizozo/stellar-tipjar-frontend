"use client";

import { ReactNode } from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  delayDuration?: number;
}

export function Tooltip({ content, children, side = "top", delayDuration = 400 }: TooltipProps) {
  return (
    <RadixTooltip.Provider delayDuration={delayDuration}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            side={side}
            sideOffset={6}
            className="z-50 max-w-xs rounded-lg bg-gray-900 dark:bg-gray-700 px-3 py-1.5 text-sm text-white shadow-md
              data-[state=delayed-open]:animate-in data-[state=closed]:animate-out
              data-[state=delayed-open]:fade-in-0 data-[state=closed]:fade-out-0
              data-[state=delayed-open]:zoom-in-95 data-[state=closed]:zoom-out-95
              data-[side=bottom]:slide-in-from-top-1 data-[side=top]:slide-in-from-bottom-1
              data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1"
          >
            {content}
            <RadixTooltip.Arrow className="fill-gray-900 dark:fill-gray-700" />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}
