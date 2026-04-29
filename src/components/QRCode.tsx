"use client";

import { useEffect, useRef, useState } from "react";
import QRCodeLib from "qrcode";

export type QRSize = "sm" | "md" | "lg" | "xl";

const SIZE_MAP: Record<QRSize, number> = {
  sm: 128,
  md: 200,
  lg: 256,
  xl: 320,
};

interface QRCodeProps {
  url: string;
  size?: QRSize;
  className?: string;
  /** Called with the canvas element after render, for download use */
  canvasRef?: React.RefObject<HTMLCanvasElement | null>;
}

export function QRCode({ url, size = "md", className = "", canvasRef }: QRCodeProps) {
  const internalRef = useRef<HTMLCanvasElement>(null);
  const ref = canvasRef ?? internalRef;
  const [error, setError] = useState(false);
  const px = SIZE_MAP[size];

  useEffect(() => {
    if (!ref.current) return;
    setError(false);
    QRCodeLib.toCanvas(ref.current, url, { width: px, margin: 2 }).catch(() =>
      setError(true)
    );
  }, [url, px, ref]);

  if (error) return <p className="text-sm text-red-500">Failed to generate QR code.</p>;

  return (
    <canvas
      ref={ref}
      width={px}
      height={px}
      className={className}
      aria-label={`QR code for ${url}`}
    />
  );
}

export function downloadQRCode(canvas: HTMLCanvasElement, filename = "tip-qr.png") {
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png");
  link.click();
}
