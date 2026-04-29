"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

type QRSize = "sm" | "md" | "lg";

const SIZE_MAP: Record<QRSize, number> = { sm: 128, md: 256, lg: 512 };

interface QRCodeDisplayProps {
  url: string;
  size?: QRSize;
  onSizeChange?: (size: QRSize) => void;
  className?: string;
}

export function QRCodeDisplay({ url, size = "md", onSizeChange, className }: QRCodeDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentSize, setCurrentSize] = useState<QRSize>(size);

  useEffect(() => {
    if (!canvasRef.current) return;
    QRCode.toCanvas(canvasRef.current, url, {
      width: SIZE_MAP[currentSize],
      margin: 2,
      color: { dark: "#000000", light: "#ffffff" },
    });
  }, [url, currentSize]);

  function handleSizeChange(s: QRSize) {
    setCurrentSize(s);
    onSizeChange?.(s);
  }

  function handleDownload() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `tip-qr-${currentSize}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <div className={`flex flex-col items-center gap-4 ${className ?? ""}`}>
      <canvas ref={canvasRef} className="rounded-lg border border-ink/10" />

      <div className="flex gap-2">
        {(["sm", "md", "lg"] as QRSize[]).map((s) => (
          <button
            key={s}
            onClick={() => handleSizeChange(s)}
            className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
              currentSize === s
                ? "bg-wave text-white"
                : "bg-ink/10 text-ink hover:bg-ink/20"
            }`}
          >
            {s.toUpperCase()}
          </button>
        ))}
      </div>

      <button
        onClick={handleDownload}
        className="rounded-lg bg-wave px-4 py-2 text-sm font-semibold text-white hover:bg-wave/90 transition-colors"
      >
        Download PNG
      </button>
    </div>
  );
}
