"use client";

import React from "react";
import Link from "next/link";

type Props = {
  href?: string;
  label: string;
  icon?: React.ReactNode;
  isCurrent?: boolean;
  onClick?: () => void;
  separator?: React.ReactNode;
};

export default function BreadcrumbItem({
  href,
  label,
  icon,
  isCurrent,
  onClick,
  separator,
}: Props) {
  const baseLinkClasses =
    "flex items-center gap-2 text-sm transition-colors duration-150";

  const linkColor =
    "text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400";

  return (
    <li className="inline-flex items-center">
      {href && !isCurrent ? (
        <Link
          href={href as any}
          onClick={onClick}
          className={`${baseLinkClasses} ${linkColor}`}
        >
          {icon && <span className="w-4 h-4">{icon}</span>}
          <span className="truncate max-w-xs">{label}</span>
        </Link>
      ) : (
        <span
          className={`flex items-center gap-2 ${isCurrent ? "font-medium text-gray-900 dark:text-white" : "text-gray-600"}`}
          aria-current={isCurrent ? "page" : undefined}
        >
          {icon && <span className="w-4 h-4">{icon}</span>}
          <span className="truncate max-w-xs">{label}</span>
        </span>
      )}
      {separator && <span className="mx-2 text-gray-400">{separator}</span>}
    </li>
  );
}
