import {
  tipReceivedTemplate,
  milestoneTemplate,
  weeklySummaryTemplate,
  type TipReceivedData,
  type MilestoneData,
  type WeeklySummaryData,
} from "./templates";

interface SendEmailPayload {
  to: string;
  subject: string;
  html: string;
}

async function sendEmail(payload: SendEmailPayload): Promise<void> {
  const res = await fetch("/api/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Email send failed: ${res.status}`);
}

export async function sendTipNotification(to: string, data: TipReceivedData): Promise<void> {
  await sendEmail({
    to,
    subject: `You received ${data.amount} ${data.assetCode} from ${data.senderName}!`,
    html: tipReceivedTemplate(data),
  });
}

export async function sendMilestoneNotification(to: string, data: MilestoneData): Promise<void> {
  await sendEmail({
    to,
    subject: `Milestone reached: ${data.milestone}!`,
    html: milestoneTemplate(data),
  });
}

export async function sendWeeklySummary(to: string, data: WeeklySummaryData): Promise<void> {
  await sendEmail({
    to,
    subject: "Your weekly Stellar Tip Jar summary",
    html: weeklySummaryTemplate(data),
  });
}
