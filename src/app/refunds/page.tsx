"use client";

import { RefundRequestComponent } from "@/components/RefundRequest";
import { RefundStatusList } from "@/components/RefundStatus";
import { useRefunds } from "@/hooks/useRefunds";

export default function RefundsPage() {
  const { refunds, requestRefund, isInGracePeriod, approveRefund, denyRefund, processRefund } = useRefunds();

  return (
    <div className="space-y-8 px-4 py-8 sm:px-8">
      <h1 className="text-3xl font-bold text-ink">Tip Refunds</h1>
      <p className="text-sm text-ink/70">Request a refund, wait for creator approval, and track status.</p>

      <RefundRequestComponent requestRefund={requestRefund} isInGracePeriod={isInGracePeriod} onSuccess={() => {}} />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-ink">Refund Requests</h2>
        <RefundStatusList
          requests={refunds}
          onApprove={approveRefund}
          onDeny={denyRefund}
          onProcess={processRefund}
        />
      </section>
    </div>
  );
}
