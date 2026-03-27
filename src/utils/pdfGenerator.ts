import { jsPDF } from "jspdf";
import QRCode from "qrcode";
import type { Tip } from "@/hooks/queries/useTips";
import { buildTaxSummary } from "./taxReport";

const STELLAR_EXPLORER_URL = "https://stellar.expert/explorer/public/tx";

export async function generateReceiptPDF(tip: Tip): Promise<void> {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("Tip Receipt", pageWidth / 2, 25, { align: "center" });

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100);
  doc.text("Stellar Tip Jar", pageWidth / 2, 32, { align: "center" });

  doc.setDrawColor(200);
  doc.line(20, 40, pageWidth - 20, 40);

  doc.setTextColor(0);
  doc.setFontSize(11);
  const startY = 55;
  const lineHeight = 10;
  const labelX = 25;
  const valueX = 70;

  const formattedDate = new Date(tip.date).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });

  const fields = [
    { label: "Receipt ID:", value: tip.id },
    { label: "Date:", value: formattedDate },
    { label: "Amount:", value: `${tip.amount} XLM` },
    { label: "Recipient:", value: `@${tip.recipient}` },
    { label: "Sender:", value: tip.sender },
    { label: "Status:", value: tip.status.charAt(0).toUpperCase() + tip.status.slice(1) },
    { label: "Memo:", value: tip.memo || "-" },
  ];

  fields.forEach((field, index) => {
    const y = startY + index * lineHeight;
    doc.setFont("helvetica", "bold");
    doc.text(field.label, labelX, y);
    doc.setFont("helvetica", "normal");
    doc.text(field.value, valueX, y);
  });

  if (tip.transactionHash) {
    const txY = startY + fields.length * lineHeight;
    doc.setFont("helvetica", "bold");
    doc.text("Transaction Hash:", labelX, txY);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(tip.transactionHash, labelX, txY + 6);

    const txUrl = `${STELLAR_EXPLORER_URL}/${tip.transactionHash}`;
    const qrDataUrl = await QRCode.toDataURL(txUrl, {
      width: 200,
      margin: 1,
    });

    const qrSize = 50;
    const qrX = (pageWidth - qrSize) / 2;
    const qrY = txY + 20;
    doc.addImage(qrDataUrl, "PNG", qrX, qrY, qrSize, qrSize);

    doc.setFontSize(8);
    doc.setTextColor(100);
    doc.text("Scan to verify on Stellar Explorer", pageWidth / 2, qrY + qrSize + 6, {
      align: "center",
    });
  }

  doc.setFontSize(8);
  doc.setTextColor(150);
  doc.text(
    `Generated on ${new Date().toLocaleString()}`,
    pageWidth / 2,
    doc.internal.pageSize.getHeight() - 15,
    { align: "center" }
  );

  const timestamp = new Date().toISOString().split("T")[0];
  doc.save(`tip-receipt-${tip.id}-${timestamp}.pdf`);
}

export function exportTipsPDF(tips: Tip[], filename: string): void {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const colWidths = [38, 22, 32, 22, 56];
  const headers = ["Date", "Amount", "Recipient", "Status", "Tx Hash"];
  let y = 30;

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Tip History Export", pageWidth / 2, y, { align: "center" });
  y += 8;
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(120);
  doc.text(`Generated ${new Date().toLocaleString()} · ${tips.length} transactions`, pageWidth / 2, y, { align: "center" });
  y += 10;

  // Table header
  doc.setFillColor(240, 240, 240);
  doc.rect(margin, y, pageWidth - margin * 2, 8, "F");
  doc.setTextColor(0);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  let x = margin + 2;
  headers.forEach((h, i) => { doc.text(h, x, y + 5.5); x += colWidths[i]; });
  y += 8;

  doc.setFont("helvetica", "normal");
  for (const tip of tips) {
    if (y > pageHeight - 20) { doc.addPage(); y = 20; }
    const cells = [
      new Date(tip.date).toLocaleDateString(),
      `${tip.amount} XLM`,
      tip.recipient,
      tip.status,
      tip.transactionHash ? tip.transactionHash.slice(0, 10) + "…" : "-",
    ];
    x = margin + 2;
    cells.forEach((c, i) => { doc.text(c, x, y + 5); x += colWidths[i]; });
    doc.setDrawColor(220);
    doc.line(margin, y + 8, pageWidth - margin, y + 8);
    y += 8;
  }

  doc.save(filename);
}

export function exportTaxReportPDF(tips: Tip[], year: number, filename: string): void {
  const summary = buildTaxSummary(tips, year);
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let y = 30;

  const section = (title: string) => {
    y += 4;
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0);
    doc.text(title, margin, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
  };

  const row = (label: string, value: string) => {
    doc.setFont("helvetica", "bold");
    doc.text(label, margin + 2, y);
    doc.setFont("helvetica", "normal");
    doc.text(value, margin + 70, y);
    y += 7;
  };

  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(`Tax Report — ${year}`, pageWidth / 2, y, { align: "center" });
  y += 8;
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(120);
  doc.text("Stellar Tip Jar · For informational purposes only", pageWidth / 2, y, { align: "center" });
  doc.setDrawColor(200);
  doc.line(margin, y + 4, pageWidth - margin, y + 4);
  y += 12;

  section("Summary");
  row("Total transactions:", String(summary.totalTips));
  row("Total amount (XLM):", summary.totalAmountXLM.toFixed(2));
  row("Completed transactions:", String(summary.completedTips));
  row("Completed amount (XLM):", summary.completedAmountXLM.toFixed(2));

  section("Monthly Breakdown (completed)");
  for (const m of summary.byMonth) {
    row(m.month + ":", `${m.count} tips · ${m.amountXLM.toFixed(2)} XLM`);
  }

  section("By Recipient (completed)");
  for (const r of summary.byRecipient) {
    row(`@${r.recipient}:`, `${r.count} tips · ${r.amountXLM.toFixed(2)} XLM`);
  }

  doc.setFontSize(8);
  doc.setTextColor(150);
  doc.text(
    `Generated on ${new Date().toLocaleString()}`,
    pageWidth / 2,
    doc.internal.pageSize.getHeight() - 12,
    { align: "center" }
  );

  doc.save(filename);
}
