"use client";

import { useState } from "react";
import type { Tip } from "@/hooks/queries/useTips";
import { exportToCSV } from "@/utils/exportCSV";
import { exportToExcel } from "@/utils/exportExcel";
import { exportTipsPDF, exportTaxReportPDF } from "@/utils/pdfGenerator";
import { buildTaxSummary } from "@/utils/taxReport";

type Format = "csv" | "excel" | "pdf" | "tax-pdf" | "tax-csv";
type Preset = "all" | "this-year" | "last-year" | "custom";

interface Props {
  tips: Tip[];
  onClose: () => void;
}

const PRESETS: { value: Preset; label: string }[] = [
  { value: "all", label: "All time" },
  { value: "this-year", label: "This year" },
  { value: "last-year", label: "Last year" },
  { value: "custom", label: "Custom range" },
];

const FORMATS: { value: Format; label: string; desc: string }[] = [
  { value: "csv", label: "CSV", desc: "Spreadsheet-compatible" },
  { value: "excel", label: "Excel (.xlsx)", desc: "Microsoft Excel" },
  { value: "pdf", label: "PDF — Transaction list", desc: "Printable table" },
  { value: "tax-pdf", label: "PDF — Tax report", desc: "Annual summary" },
  { value: "tax-csv", label: "CSV — Tax report", desc: "Annual summary" },
];

function presetDates(preset: Preset): { from: string; to: string } {
  const now = new Date();
  const y = now.getFullYear();
  if (preset === "this-year") return { from: `${y}-01-01`, to: `${y}-12-31` };
  if (preset === "last-year") return { from: `${y - 1}-01-01`, to: `${y - 1}-12-31` };
  return { from: "", to: "" };
}

function filterByRange(tips: Tip[], from: string, to: string): Tip[] {
  return tips.filter((t) => {
    const d = new Date(t.date);
    if (from && d < new Date(from)) return false;
    if (to && d > new Date(to + "T23:59:59Z")) return false;
    return true;
  });
}

export function ExportModal({ tips, onClose }: Props) {
  const [format, setFormat] = useState<Format>("csv");
  const [preset, setPreset] = useState<Preset>("all");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");

  const { from, to } = preset === "custom" ? { from: customFrom, to: customTo } : presetDates(preset);
  const filtered = preset === "all" ? tips : filterByRange(tips, from, to);

  const taxYear = (() => {
    if (preset === "last-year") return new Date().getFullYear() - 1;
    if (preset === "this-year") return new Date().getFullYear();
    if (from) return new Date(from).getFullYear();
    return new Date().getFullYear();
  })();

  const stamp = new Date().toISOString().split("T")[0];

  const handleExport = () => {
    if (filtered.length === 0) return;

    if (format === "csv") {
      const cols = [
        { key: "date", label: "Date" },
        { key: "amount", label: "Amount (XLM)" },
        { key: "recipient", label: "Recipient" },
        { key: "sender", label: "Sender" },
        { key: "status", label: "Status" },
        { key: "memo", label: "Memo" },
        { key: "transactionHash", label: "Transaction Hash" },
      ];
      exportToCSV(
        filtered.map((t) => ({ ...t, date: new Date(t.date).toLocaleString(), memo: t.memo ?? "", transactionHash: t.transactionHash ?? "" })),
        cols,
        `tips-${stamp}.csv`
      );
    } else if (format === "excel") {
      exportToExcel(filtered, `tips-${stamp}.xlsx`);
    } else if (format === "pdf") {
      exportTipsPDF(filtered, `tips-${stamp}.pdf`);
    } else if (format === "tax-pdf") {
      exportTaxReportPDF(filtered, taxYear, `tax-report-${taxYear}.pdf`);
    } else if (format === "tax-csv") {
      const s = buildTaxSummary(filtered, taxYear);
      const monthCols = [{ key: "month", label: "Month" }, { key: "count", label: "Tips" }, { key: "amountXLM", label: "Amount (XLM)" }];
      exportToCSV(s.byMonth, monthCols, `tax-report-${taxYear}-monthly.csv`);
    }

    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="export-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-md rounded-2xl bg-[color:var(--surface)] p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 id="export-modal-title" className="text-lg font-bold text-ink">Export Transactions</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="text-ink/50 hover:text-ink">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Format */}
        <fieldset className="mb-5">
          <legend className="mb-2 text-sm font-semibold text-ink">Format</legend>
          <div className="grid grid-cols-1 gap-2">
            {FORMATS.map((f) => (
              <label key={f.value} className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2 text-sm transition-colors ${format === f.value ? "border-wave bg-wave/10 text-ink" : "border-ink/10 text-ink/70 hover:border-wave/50"}`}>
                <input type="radio" name="format" value={f.value} checked={format === f.value} onChange={() => setFormat(f.value)} className="accent-wave" />
                <span className="font-medium">{f.label}</span>
                <span className="ml-auto text-xs text-ink/50">{f.desc}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Date range */}
        <fieldset className="mb-5">
          <legend className="mb-2 text-sm font-semibold text-ink">Date Range</legend>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => setPreset(p.value)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${preset === p.value ? "bg-wave text-white" : "bg-ink/10 text-ink/70 hover:bg-ink/20"}`}
              >
                {p.label}
              </button>
            ))}
          </div>
          {preset === "custom" && (
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="export-from" className="mb-1 block text-xs text-ink/60">From</label>
                <input id="export-from" type="date" value={customFrom} onChange={(e) => setCustomFrom(e.target.value)} className="w-full rounded-lg border border-ink/10 bg-white px-2 py-1.5 text-sm text-ink focus:border-wave focus:outline-none focus:ring-2 focus:ring-wave/20" />
              </div>
              <div>
                <label htmlFor="export-to" className="mb-1 block text-xs text-ink/60">To</label>
                <input id="export-to" type="date" value={customTo} onChange={(e) => setCustomTo(e.target.value)} className="w-full rounded-lg border border-ink/10 bg-white px-2 py-1.5 text-sm text-ink focus:border-wave focus:outline-none focus:ring-2 focus:ring-wave/20" />
              </div>
            </div>
          )}
        </fieldset>

        <p className="mb-4 text-xs text-ink/50">
          {filtered.length} transaction{filtered.length !== 1 ? "s" : ""} will be exported
        </p>

        <div className="flex gap-3">
          <button type="button" onClick={onClose} className="flex-1 rounded-lg border border-ink/10 px-4 py-2 text-sm font-medium text-ink hover:bg-ink/5">
            Cancel
          </button>
          <button
            type="button"
            onClick={handleExport}
            disabled={filtered.length === 0}
            className="flex-1 rounded-lg bg-wave px-4 py-2 text-sm font-medium text-white hover:bg-wave/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Export
          </button>
        </div>
      </div>
    </div>
  );
}
