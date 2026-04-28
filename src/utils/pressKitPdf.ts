import { jsPDF } from "jspdf";
import type { PressKit } from "@/services/pressKitService";

export async function generatePressKitPDF(kit: PressKit): Promise<void> {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let y = 30;

  // Header
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text(kit.displayName, pageWidth / 2, y, { align: "center" });
  y += 8;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100);
  doc.text("Press Kit · Stellar Tip Jar", pageWidth / 2, y, { align: "center" });
  y += 4;
  doc.setDrawColor(200);
  doc.line(margin, y, pageWidth - margin, y);
  y += 10;

  // Bio
  doc.setTextColor(0);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("About", margin, y);
  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const bioLines = doc.splitTextToSize(kit.bio, pageWidth - margin * 2);
  doc.text(bioLines, margin, y);
  y += bioLines.length * 5 + 8;

  // Stats
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Statistics", margin, y);
  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  const stats = [
    ["Total Tips Received", String(kit.stats.totalTips)],
    ["Total Earnings (XLM)", kit.stats.totalEarningsXLM.toFixed(2)],
    ["Supporters", String(kit.stats.supporterCount)],
    ["Member Since", new Date(kit.stats.joinedAt).toLocaleDateString()],
  ];

  stats.forEach(([label, value]) => {
    doc.setFont("helvetica", "bold");
    doc.text(label + ":", margin + 2, y);
    doc.setFont("helvetica", "normal");
    doc.text(value, margin + 70, y);
    y += 7;
  });
  y += 4;

  // Categories & Tags
  if (kit.categories.length || kit.tags.length) {
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Categories & Tags", margin, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    if (kit.categories.length) {
      doc.text("Categories: " + kit.categories.join(", "), margin + 2, y);
      y += 7;
    }
    if (kit.tags.length) {
      const tagLine = doc.splitTextToSize("Tags: " + kit.tags.join(", "), pageWidth - margin * 2 - 2);
      doc.text(tagLine, margin + 2, y);
      y += tagLine.length * 5 + 4;
    }
    y += 4;
  }

  // Social Links
  if (kit.socialLinks.length) {
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Social Links", margin, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    kit.socialLinks.forEach(({ platform, url }) => {
      doc.setFont("helvetica", "bold");
      doc.text(platform + ":", margin + 2, y);
      doc.setFont("helvetica", "normal");
      doc.text(url, margin + 35, y);
      y += 7;
    });
    y += 4;
  }

  // Custom message
  if (kit.customMessage) {
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Message to Press", margin, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const msgLines = doc.splitTextToSize(kit.customMessage, pageWidth - margin * 2);
    doc.text(msgLines, margin, y);
    y += msgLines.length * 5 + 8;
  }

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(150);
  doc.text(
    `Generated on ${new Date().toLocaleString()} · stellar-tipjar.app/@${kit.username}`,
    pageWidth / 2,
    doc.internal.pageSize.getHeight() - 12,
    { align: "center" }
  );

  doc.save(`press-kit-${kit.username}.pdf`);
}
