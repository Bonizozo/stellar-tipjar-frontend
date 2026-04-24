"use client";

import { ReactNode } from "react";
import * as RadixPopover from "@radix-ui/react-popover";
import { X } from "lucide-react";

interface PopoverProps {
  trigger: ReactNode;
  content: ReactNode;
  title?: string;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
}

export function Popover({ trigger, content, title, side = "bottom", align = "start" }: PopoverProps) {
  return (
    <RadixPopover.Root>
      <RadixPopover.Trigger asChild>{trigger}</RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content
          side={side}
          align={align}
          sideOffset={8}
          className="z-50 w-72 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-lg
            data-[state=open]:animate-in data-[state=closed]:animate-out
            data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0
            data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95
            data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2
            data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2"
        >
          {title && (
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{title}</p>
              <RadixPopover.Close className="rounded p-0.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400">
                <X className="h-4 w-4" />
              </RadixPopover.Close>
            </div>
          )}
          <div className="text-sm text-gray-700 dark:text-gray-300">{content}</div>
          <RadixPopover.Arrow className="fill-white dark:fill-gray-800" />
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
}
