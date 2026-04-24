"use client";

import * as RadixDropdown from "@radix-ui/react-dropdown-menu";
import { DropdownItem } from "./DropdownItem";
import { DropdownItemDef } from "./types";

interface Props {
  items: DropdownItemDef[];
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
}

export function DropdownMenu({ items, side = "bottom", align = "start" }: Props) {
  return (
    <RadixDropdown.Portal>
      <RadixDropdown.Content
        side={side}
        align={align}
        sideOffset={6}
        className="z-50 min-w-[14rem] rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg py-1
          data-[state=open]:animate-in data-[state=closed]:animate-out
          data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0
          data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95
          data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2
          data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2"
      >
        {items.map((item, i) => (
          <div key={item.id}>
            {item.sectionHeader && (
              <div className="px-3 pt-2 pb-1 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                {item.sectionHeader}
              </div>
            )}
            <DropdownItem item={item} />
            {item.dividerAfter && (
              <RadixDropdown.Separator className="my-1 h-px bg-gray-200 dark:bg-gray-700" />
            )}
          </div>
        ))}
      </RadixDropdown.Content>
    </RadixDropdown.Portal>
  );
}
