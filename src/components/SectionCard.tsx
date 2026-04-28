"use client";

import { ReactNode } from "react";
import { Card } from "@/components/Card";
import { CardHeader } from "@/components/Card/CardHeader";
import { CardBody } from "@/components/Card/CardBody";
import { OptimizedImage } from "@/components/OptimizedImage";

interface SectionCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  imageUrl?: string;
  variant?: "default" | "elevated" | "outlined" | "glass";
  hoverEffect?: "none" | "lift" | "glow" | "border";
  hoverable?: boolean;
  onClick?: () => void;
  className?: string;
}

export function SectionCard({ 
  title, 
  description, 
  icon, 
  imageUrl, 
  variant = "default",
  hoverEffect = "lift",
  hoverable = true,
  onClick,
  className = "",
}: SectionCardProps) {
  const iconElement = imageUrl ? (
    <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-wave/20">
      <OptimizedImage
        src={imageUrl}
        alt={title}
        fill
        sizes="48px"
      />
    </div>
  ) : icon ? (
    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-wave/10 text-wave dark:bg-wave/20 dark:text-wave">
      {icon}
    </div>
  ) : undefined;

  return (
    <Card
      variant={variant}
      hoverEffect={hoverEffect}
      hoverable={hoverable}
      interactive={!!onClick}
      onClick={onClick}
      className={`bg-[color:var(--surface)] border-ink/10 shadow-card dark:bg-[color:var(--surface)] dark:border-ink/10 dark:shadow-card ${className}`}
      role="article"
    >
      {iconElement && (
        <div className="mb-4">
          {iconElement}
        </div>
      )}
      <CardBody padding="none">
        <h3 className="text-lg font-semibold text-ink dark:text-ink mb-2">{title}</h3>
        <p className="text-sm text-ink/70 dark:text-ink/70">{description}</p>
      </CardBody>
    </Card>
  );
}
