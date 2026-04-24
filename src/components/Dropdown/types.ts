"use client";

import { ReactNode } from "react";
import * as RadixDropdown from "@radix-ui/react-dropdown-menu";

export interface DropdownItemDef {
  id: string;
  label: string;
  icon?: ReactNode;
  shortcut?: string;
  disabled?: boolean;
  dividerAfter?: boolean;
  sectionHeader?: string;
  onClick?: () => void;
  subItems?: DropdownItemDef[];
}
