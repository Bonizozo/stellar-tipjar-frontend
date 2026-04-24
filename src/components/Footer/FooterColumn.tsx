import { ReactNode } from "react";

type FooterColumnProps = {
  title: string;
  children: ReactNode;
};

export function FooterColumn({ title, children }: FooterColumnProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-100 dark:text-white mb-4">{title}</h3>
      <div className="space-y-2 text-sm text-gray-300 dark:text-gray-400">{children}</div>
    </div>
  );
}
