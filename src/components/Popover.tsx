import { ReactNode } from "react";

interface PopoverProps {
  trigger: ReactNode;
  content: ReactNode;
  title?: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}

export function Popover({ trigger, content }: PopoverProps) {
  return (
    <div className="relative inline-block text-left">
      {trigger}
      <div className="hidden">
        {content}
      </div>
    </div>
  );
}
