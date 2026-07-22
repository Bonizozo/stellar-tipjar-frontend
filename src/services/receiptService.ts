import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import { API_BASE_URL } from "@/config/env";

export interface TipReceipt {
  id: string;
  tipperName: string;
  creatorName: string;
  amount: string;
  asset: string;
  timestamp: Date;
  transactionHash: string;
  message?: string;
}

export const receiptService = {
  async generatePDF(receipt: TipReceipt): Promise<Blob> {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Header
    doc.setFontSize(20);
    doc.text('Tip Receipt', pageWidth / 2, 20, { align: 'center' });

    // Receipt details
    doc.setFontSize(11);
    let yPos = 40;
    const lineHeight = 8;

    const details = [
      [`Receipt ID: ${receipt.id}`],
      [`From: ${receipt.tipperName}`],
      [`To: ${receipt.creatorName}`],
      [`Amount: ${receipt.amount} ${receipt.asset}`],
      [`Date: ${receipt.timestamp.toLocaleString()}`],
      [`Transaction: ${receipt.transactionHash.slice(0, 16)}...`],
    ];

    details.forEach(([text]) => {
      doc.text(text, 20, yPos);
      yPos += lineHeight;
    });

    if (receipt.message) {
      yPos += 5;
      doc.setFontSize(10);
      doc.text('Message:', 20, yPos);
      yPos += lineHeight;
      const wrapped = doc.splitTextToSize(receipt.message, pageWidth - 40);
      doc.text(wrapped, 20, yPos);
      yPos += wrapped.length * lineHeight;
    }

    // QR Code
    yPos += 10;
    const qrDataUrl = await QRCode.toDataURL(receipt.transactionHash);
    doc.addImage(qrDataUrl, 'PNG', pageWidth / 2 - 25, yPos, 50, 50);

    // Footer
    doc.setFontSize(8);
    doc.text('Powered by Stellar Tip Jar', pageWidth / 2, pageHeight - 10, { align: 'center' });

    return doc.output('blob');
  },

  async sendEmail(receipt: TipReceipt, email: string): Promise<void> {
    const pdfBlob = await this.generatePDF(receipt);
    const formData = new FormData();
    formData.append('email', email);
    formData.append('receipt', pdfBlob, `receipt-${receipt.id}.pdf`);

    const res = await fetch(`${API_BASE_URL}/receipts/send`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) throw new Error('Failed to send receipt');
  },
};
