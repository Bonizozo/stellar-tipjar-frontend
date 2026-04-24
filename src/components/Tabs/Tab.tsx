"use client";

import React from "react";

export interface TabProps {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: number | string;
  disabled?: boolean;
}

// This is a data-only descriptor — rendering is handled by TabList
const Tab: React.FC<TabProps> = () => null;
Tab.displayName = "Tab";

export default Tab;
