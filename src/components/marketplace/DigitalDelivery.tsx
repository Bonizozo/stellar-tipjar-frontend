"use client";

import { useState } from "react";
import { Download, FileText, Lock, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/Button";
import { DigitalDownload } from "@/types/marketplace";

interface DigitalDeliveryProps {
  orderId: string;
  downloads: DigitalDownload[];
  onDownload: (productId: string) => Promise<void>;
}

export function DigitalDelivery({ orderId, downloads, onDownload }: DigitalDeliveryProps) {
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownload = async (productId: string) => {
    setDownloading(productId);
    try {
      await onDownload(productId);
    } finally {
      setDownloading(null);
    }
  };

  const isExpired = (expiresAt: Date) => new Date() > new Date(expiresAt);
  const canDownload = (download: DigitalDownload) => 
    download.downloadCount < download.maxDownloads && !isExpired(download.expiresAt);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-wave" />
        <h3 className="text-lg font-bold text-ink">Digital Downloads</h3>
      </div>

      {downloads.length === 0 ? (
        <div className="rounded-xl border border-ink/10 bg-[color:var(--surface)] p-8 text-center">
          <FileText className="w-12 h-12 text-ink/20 mx-auto mb-3" />
          <p className="text-ink/50">No digital products in this order</p>
        </div>
      ) : (
        <div className="space-y-3">
          {downloads.map((download) => {
            const expired = isExpired(download.expiresAt);
            const limitReached = download.downloadCount >= download.maxDownloads;
            const available = canDownload(download);

            return (
              <div
                key={download.productId}
                className="rounded-xl border border-ink/10 bg-[color:var(--surface)] p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4 text-ink/60" />
                      <h4 className="font-semibold text-ink">Product #{download.productId}</h4>
                    </div>

                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2 text-ink/60">
                        <Download className="w-3.5 h-3.5" />
                        <span>
                          Downloads: {download.downloadCount} / {download.maxDownloads}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-ink/60">
                        {expired ? (
                          <>
                            <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                            <span className="text-red-600 dark:text-red-400">
                              Expired on {new Date(download.expiresAt).toLocaleDateString()}
                            </span>
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                            <span>
                              Expires {new Date(download.expiresAt).toLocaleDateString()}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0">
                    {available ? (
                      <Button
                        onClick={() => handleDownload(download.productId)}
                        disabled={downloading === download.productId}
                        className="gap-2"
                      >
                        <Download className="w-4 h-4" />
                        {downloading === download.productId ? "Downloading..." : "Download"}
                      </Button>
                    ) : (
                      <div className="flex items-center gap-2 text-sm text-ink/40">
                        <Lock className="w-4 h-4" />
                        <span>{limitReached ? "Limit reached" : "Expired"}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress bar for download limit */}
                <div className="mt-3">
                  <div className="h-1.5 bg-ink/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        limitReached ? "bg-red-500" : "bg-wave"
                      }`}
                      style={{
                        width: `${(download.downloadCount / download.maxDownloads) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Help text */}
      <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 text-sm text-blue-800 dark:text-blue-300">
        <p className="font-medium mb-1">Download Instructions</p>
        <ul className="list-disc list-inside space-y-1 text-blue-700 dark:text-blue-400">
          <li>Downloads are limited to prevent unauthorized sharing</li>
          <li>Links expire after the specified date for security</li>
          <li>Contact support if you need additional downloads</li>
        </ul>
      </div>
    </div>
  );
}
