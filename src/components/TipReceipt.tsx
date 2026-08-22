'use client';

import { useState } from 'react';
import { Download, Mail } from 'lucide-react';
import { receiptService, TipReceipt } from '@/services/receiptService';
import { Button } from './Button';

interface TipReceiptProps {
  receipt: TipReceipt;
  onEmailSent?: () => void;
}

export const TipReceiptComponent = ({ receipt, onEmailSent }: TipReceiptProps) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleDownload = async () => {
    setLoading(true);
    try {
      const blob = await receiptService.generatePDF(receipt);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `receipt-${receipt.id}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSend = async () => {
    if (!email) return;
    setLoading(true);
    try {
      await receiptService.sendEmail(receipt, email);
      setEmail('');
      onEmailSent?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-md">
      <h3 className="text-lg font-semibold mb-4">Tip Receipt</h3>

      <div className="space-y-2 mb-6 text-sm">
        <p>
          <span className="text-gray-600">From:</span> {receipt.tipperName}
        </p>
        <p>
          <span className="text-gray-600">To:</span> {receipt.creatorName}
        </p>
        <p>
          <span className="text-gray-600">Amount:</span> {receipt.amount} {receipt.asset}
        </p>
        <p>
          <span className="text-gray-600">Date:</span> {receipt.timestamp.toLocaleString()}
        </p>
      </div>

      <div className="space-y-3">
        <Button
          onClick={handleDownload}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </Button>

        <div className="flex gap-2">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
          />
          <Button
            onClick={handleEmailSend}
            disabled={loading || !email}
            className="flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};
