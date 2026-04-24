"use client";

import { useState } from "react";

export interface TipButtonConfig {
  username: string;
  label?: string;
  color?: string;
  textColor?: string;
  borderRadius?: string;
  size?: "sm" | "md" | "lg";
}

const sizeStyles = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export function TipButton({
  username,
  label = "Send a Tip ⭐",
  color = "#ff785a",
  textColor = "#ffffff",
  borderRadius = "12px",
  size = "md",
}: TipButtonConfig) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    const baseUrl =
      typeof window !== "undefined"
        ? `${window.location.protocol}//${window.location.host}`
        : "";
    window.open(`${baseUrl}/creator/${username}`, "_blank", "noopener,noreferrer");
    setTimeout(() => setClicked(false), 1000);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={`Tip ${username} on Stellar Tip Jar`}
      style={{
        backgroundColor: color,
        color: textColor,
        borderRadius,
        border: "none",
        cursor: "pointer",
        fontFamily: "inherit",
        fontWeight: 600,
        transition: "opacity 0.15s, transform 0.15s",
        opacity: clicked ? 0.8 : 1,
        transform: clicked ? "scale(0.97)" : "scale(1)",
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
      }}
      className={sizeStyles[size]}
    >
      {label}
    </button>
  );
}
