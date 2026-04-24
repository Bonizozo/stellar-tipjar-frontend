"use client";

import React, { useState } from "react";
import { TabList } from "./TabList";
import { TabPanel } from "./TabPanel";
import { TabProps } from "./Tab";

export type TabStyle = "underline" | "pills" | "enclosed";
export type TabOrientation = "horizontal" | "vertical";

interface TabsProps {
  tabs: (TabProps & { content: React.ReactNode })[];
  defaultIndex?: number;
  activeIndex?: number;
  onChange?: (index: number) => void;
  style?: TabStyle;
  orientation?: TabOrientation;
  lazy?: boolean;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultIndex = 0,
  activeIndex: controlledIndex,
  onChange,
  style = "underline",
  orientation = "horizontal",
  lazy = true,
  className = "",
}) => {
  const [internalIndex, setInternalIndex] = useState(defaultIndex);
  const isControlled = controlledIndex !== undefined;
  const activeIndex = isControlled ? controlledIndex : internalIndex;

  const handleChange = (i: number) => {
    if (!isControlled) setInternalIndex(i);
    onChange?.(i);
  };

  const isVertical = orientation === "vertical";

  return (
    <div className={`${isVertical ? "flex gap-4" : "w-full"} ${className}`}>
      <TabList
        tabs={tabs}
        activeIndex={activeIndex}
        style={style}
        orientation={orientation}
        onChange={handleChange}
      />
      <div className={isVertical ? "flex-1" : ""}>
        {tabs.map((tab) => (
          <TabPanel
            key={tab.id}
            id={tab.id}
            activeId={tabs[activeIndex].id}
            lazy={lazy}
          >
            {tab.content}
          </TabPanel>
        ))}
      </div>
    </div>
  );
};

export { TabList } from "./TabList";
export { TabPanel } from "./TabPanel";
export type { TabProps } from "./Tab";
export { default as Tab } from "./Tab";
