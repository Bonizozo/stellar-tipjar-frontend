import * as XLSX from "xlsx";
import type { Tip } from "@/hooks/queries/useTips";

export function exportToExcel(tips: Tip[], filename: string): void {
  const rows = tips.map((t) => ({
    Date: new Date(t.date).toLocaleString(),
    "Amount (XLM)": t.amount,
    Recipient: t.recipient,
    Sender: t.sender,
    Status: t.status,
    Memo: t.memo ?? "",
    "Transaction Hash": t.transactionHash ?? "",
  }));

  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Tips");
  XLSX.writeFile(wb, filename);
}
