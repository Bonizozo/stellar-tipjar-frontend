"use client";

import { ReactNode } from "react";
import { Card, CardProps } from "./index";
import { CardHeader } from "./CardHeader";
import { CardBody } from "./CardBody";
import { CardFooter } from "./CardFooter";
import { OptimizedImage } from "@/components/OptimizedImage";

export interface ImageCardProps extends Omit<CardProps, "children"> {
  imageUrl: string;
  imageAlt: string;
  title?: string;
  subtitle?: string;
  description?: string;
  actions?: ReactNode;
  imageHeight?: "sm" | "md" | "lg" | "xl";
  imagePosition?: "top" | "left" | "right";
  overlay?: boolean;
  overlayContent?: ReactNode;
}

const imageHeights = {
  sm: "h-32",
  md: "h-48",
  lg: "h-64",
  xl: "h-80",
};

export function ImageCard({
  imageUrl,
  imageAlt,
  title,
  subtitle,
  description,
  actions,
  imageHeight = "md",
  imagePosition = "top",
  overlay = false,
  overlayContent,
  variant = "default",
  hoverEffect = "lift",
  size = "md",
  className = "",
  ...props
}: ImageCardProps) {
  const imageElement = (
    <div className={`relative overflow-hidden ${imagePosition === "top" ? "rounded-t-2xl" : "rounded-l-2xl"} ${imageHeights[imageHeight]}`}>
      <OptimizedImage
        src={imageUrl}
        alt={imageAlt}
        fill
        className="object-cover transition-transform duration-300 hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      {overlay && overlayContent && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
          <div className="text-white">
            {overlayContent}
          </div>
        </div>
      )}
    </div>
  );

  if (imagePosition === "top") {
    return (
      <Card
        variant={variant}
        hoverEffect={hoverEffect}
        size="sm"
        className={`overflow-hidden ${className}`}
        {...props}
      >
        {imageElement}
        <div className="p-4">
          {(title || subtitle) && (
            <CardHeader
              title={title}
              subtitle={subtitle}
              className="mb-3"
            />
          )}
          {description && (
            <CardBody padding="none">
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {description}
              </p>
            </CardBody>
          )}
          {actions && (
            <CardFooter bordered={false} padding="sm">
              {actions}
            </CardFooter>
          )}
        </div>
      </Card>
    );
  }

  // Side layout (left/right)
  return (
    <Card
      variant={variant}
      hoverEffect={hoverEffect}
      size="sm"
      className={`overflow-hidden ${className}`}
      {...props}
    >
      <div className={`flex ${imagePosition === "right" ? "flex-row-reverse" : ""}`}>
        <div className="flex-shrink-0 w-1/3">
          {imageElement}
        </div>
        <div className="flex-1 p-4">
          {(title || subtitle) && (
            <CardHeader
              title={title}
              subtitle={subtitle}
              className="mb-3"
            />
          )}
          {description && (
            <CardBody padding="none">
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {description}
              </p>
            </CardBody>
          )}
          {actions && (
            <CardFooter bordered={false} padding="sm">
              {actions}
            </CardFooter>
          )}
        </div>
      </div>
    </Card>
  );
}