"use client";

import { useRef } from "react";
import { QRCodeDisplay } from "@/components/QRCodeDisplay";

interface TipCardProps {
  username: string;
  displayName: string;
  tipUrl: string;
  bio?: string;
}

export function TipCard({ username, displayName, tipUrl, bio }: TipCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  function handlePrint() {
    window.print();
  }

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Printable card */}
      <div
        ref={cardRef}
        id="tip-card-print"
        className="w-80 rounded-2xl border border-ink/10 bg-white p-6 shadow-lg text-center print:shadow-none print:border-black"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-wave mb-1">
          Tip with Stellar
        </p>
        <h2 className="text-xl font-bold text-ink">{displayName}</h2>
        {bio && (
          <p className="mt-1 text-sm text-ink/60 line-clamp-2">{bio}</p>
        )}
        <div className="my-4 flex justify-center">
          <QRCodeDisplay url={tipUrl} size="md" />
        </div>
        <p className="text-xs text-ink/50 break-all">{tipUrl}</p>
        <p className="mt-2 text-xs text-ink/40">Scan to send a tip · @{username}</p>
      </div>

      <button
        onClick={handlePrint}
        className="rounded-lg border border-ink/20 px-4 py-2 text-sm font-medium text-ink hover:bg-ink/5 transition-colors print:hidden"
      >
        🖨️ Print Card
      </button>

      <style>{`
        @media print {
          body > *:not(#tip-card-print) { display: none !important; }
          #tip-card-print { margin: auto; }
        }
      `}</style>
    </div>
  );
}
