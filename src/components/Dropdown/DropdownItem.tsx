"use client";

import * as RadixDropdown from "@radix-ui/react-dropdown-menu";
import { ChevronRight } from "lucide-react";
import { DropdownItemDef } from "./types";

interface Props {
  item: DropdownItemDef;
}

export function DropdownItem({ item }: Props) {
  if (item.subItems?.length) {
    return (
      <RadixDropdown.Sub>
        <RadixDropdown.SubTrigger
          disabled={item.disabled}
          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 dark:text-gray-200 outline-none cursor-default select-none
            data-[highlighted]:bg-gray-100 dark:data-[highlighted]:bg-gray-700
            data-[disabled]:opacity-40 data-[disabled]:pointer-events-none"
        >
          {item.icon && <span className="w-4 h-4 shrink-0">{item.icon}</span>}
          <span className="flex-1">{item.label}</span>
          <ChevronRight className="w-4 h-4 ml-auto" />
        </RadixDropdown.SubTrigger>
        <RadixDropdown.Portal>
          <RadixDropdown.SubContent
            sideOffset={4}
            className="z-50 min-w-[10rem] rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg py-1
              data-[state=open]:animate-in data-[state=closed]:animate-out
              data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0
              data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95"
          >
            {item.subItems.map((sub) => (
              <DropdownItem key={sub.id} item={sub} />
            ))}
          </RadixDropdown.SubContent>
        </RadixDropdown.Portal>
      </RadixDropdown.Sub>
    );
  }

  return (
    <RadixDropdown.Item
      disabled={item.disabled}
      onSelect={item.onClick}
      className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 dark:text-gray-200 outline-none cursor-default select-none
        data-[highlighted]:bg-gray-100 dark:data-[highlighted]:bg-gray-700
        data-[disabled]:opacity-40 data-[disabled]:pointer-events-none"
    >
      {item.icon && <span className="w-4 h-4 shrink-0">{item.icon}</span>}
      <span className="flex-1">{item.label}</span>
      {item.shortcut && (
        <span className="ml-auto text-xs text-gray-400 dark:text-gray-500">{item.shortcut}</span>
      )}
    </RadixDropdown.Item>
  );
}
