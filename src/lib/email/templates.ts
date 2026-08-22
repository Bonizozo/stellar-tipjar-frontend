export interface TipReceivedData {
  creatorName: string;
  amount: string;
  assetCode: string;
  senderName: string;
  message?: string;
}

export interface MilestoneData {
  creatorName: string;
  milestone: string;
  totalAmount: string;
}

export interface WeeklySummaryData {
  creatorName: string;
  weeklyTotal: string;
  tipCount: number;
  topSupporters: string[];
}

export function tipReceivedTemplate(data: TipReceivedData): string {
  return `<!DOCTYPE html>
<html>
<body style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px">
  <h2 style="color:#4f46e5">You received a tip! 🎉</h2>
  <p>Hi ${data.creatorName},</p>
  <p><strong>${data.senderName}</strong> sent you <strong>${data.amount} ${data.assetCode}</strong>.</p>
  ${data.message ? `<blockquote style="border-left:3px solid #4f46e5;padding-left:12px;color:#555">"${data.message}"</blockquote>` : ""}
  <a href="${process.env.NEXT_PUBLIC_APP_URL ?? "https://tipjar.stellar"}/dashboard"
     style="display:inline-block;background:#4f46e5;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;margin-top:16px">
    View Dashboard
  </a>
  <p style="margin-top:24px;font-size:12px;color:#999">
    <a href="${process.env.NEXT_PUBLIC_APP_URL ?? "https://tipjar.stellar"}/settings/notifications?unsubscribe=tips">Unsubscribe</a>
  </p>
</body>
</html>`;
}

export function milestoneTemplate(data: MilestoneData): string {
  return `<!DOCTYPE html>
<html>
<body style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px">
  <h2 style="color:#4f46e5">Milestone reached! 🏆</h2>
  <p>Hi ${data.creatorName},</p>
  <p>You've reached <strong>${data.milestone}</strong> with a total of <strong>${data.totalAmount}</strong> in tips!</p>
  <a href="${process.env.NEXT_PUBLIC_APP_URL ?? "https://tipjar.stellar"}/dashboard"
     style="display:inline-block;background:#4f46e5;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;margin-top:16px">
    View Dashboard
  </a>
  <p style="margin-top:24px;font-size:12px;color:#999">
    <a href="${process.env.NEXT_PUBLIC_APP_URL ?? "https://tipjar.stellar"}/settings/notifications?unsubscribe=milestones">Unsubscribe</a>
  </p>
</body>
</html>`;
}

export function weeklySummaryTemplate(data: WeeklySummaryData): string {
  return `<!DOCTYPE html>
<html>
<body style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px">
  <h2 style="color:#4f46e5">Your weekly summary 📊</h2>
  <p>Hi ${data.creatorName},</p>
  <p>This week you received <strong>${data.tipCount} tips</strong> totalling <strong>${data.weeklyTotal}</strong>.</p>
  ${data.topSupporters.length > 0 ? `<p>Top supporters: ${data.topSupporters.join(", ")}</p>` : ""}
  <a href="${process.env.NEXT_PUBLIC_APP_URL ?? "https://tipjar.stellar"}/dashboard"
     style="display:inline-block;background:#4f46e5;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;margin-top:16px">
    View Dashboard
  </a>
  <p style="margin-top:24px;font-size:12px;color:#999">
    <a href="${process.env.NEXT_PUBLIC_APP_URL ?? "https://tipjar.stellar"}/settings/notifications?unsubscribe=weekly">Unsubscribe</a>
  </p>
</body>
</html>`;
}
