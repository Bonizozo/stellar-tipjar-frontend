"use client";

import { ReactNode } from "react";
import * as RadixDropdown from "@radix-ui/react-dropdown-menu";
import { DropdownMenu } from "./DropdownMenu";
import { useDropdown } from "@/hooks/useDropdown";
export type { DropdownItemDef } from "./types";

interface DropdownProps {
  trigger: ReactNode;
  items: import("./types").DropdownItemDef[];
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  triggerMode?: "click" | "hover";
}

export function Dropdown({
  trigger,
  items,
  side = "bottom",
  align = "start",
  triggerMode = "click",
}: DropdownProps) {
  const { isOpen, open, close, toggle } = useDropdown({ trigger: triggerMode });

  return (
    <RadixDropdown.Root open={isOpen} onOpenChange={(v) => (v ? open() : close())}>
      <div
        className="inline-flex"
        onMouseEnter={triggerMode === "hover" ? open : undefined}
        onMouseLeave={triggerMode === "hover" ? close : undefined}
      >
        <RadixDropdown.Trigger asChild>
          <span
            className="inline-flex"
            onClick={triggerMode === "click" ? toggle : undefined}
          >
            {trigger}
          </span>
        </RadixDropdown.Trigger>
        <DropdownMenu items={items} side={side} align={align} />
      </div>
    </RadixDropdown.Root>
  );
}
