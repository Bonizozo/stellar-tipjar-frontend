"use client";

import { useState, useMemo } from "react";
import { generateReceipt, type Transaction } from "@/lib/pdf/receipt";
import { Button } from "@/components/Button";

function exportCSV(transactions: Transaction[]): void {
  const headers = ["ID", "Date", "Amount", "Asset", "Creator", "Sender", "Tx Hash"];
  const rows = transactions.map((tx) => [
    tx.id,
    new Date(tx.createdAt).toLocaleDateString(),
    tx.amount,
    tx.assetCode,
    tx.creatorUsername,
    tx.senderUsername ?? "",
    tx.transactionHash ?? "",
  ]);
  const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "transactions.csv";
  a.click();
  URL.revokeObjectURL(url);
}

interface Props {
  transactions: Transaction[];
}

const PAGE_SIZE = 10;

export function TransactionList({ transactions }: Props) {
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Transaction | null>(null);

  const filtered = useMemo(() => {
    let list = transactions.filter((tx) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        tx.creatorUsername.toLowerCase().includes(q) ||
        tx.id.toLowerCase().includes(q) ||
        (tx.senderUsername ?? "").toLowerCase().includes(q);
      const txDate = new Date(tx.createdAt);
      const matchStart = !startDate || txDate >= new Date(startDate);
      const matchEnd = !endDate || txDate <= new Date(endDate);
      return matchSearch && matchStart && matchEnd;
    });

    list = [...list].sort((a, b) =>
      sortBy === "amount"
        ? parseFloat(b.amount) - parseFloat(a.amount)
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
    return list;
  }, [transactions, search, startDate, endDate, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search creator, sender, ID…"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="flex-1 min-w-48 rounded-xl border border-ink/20 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-wave/30"
        />
        <input type="date" value={startDate} onChange={(e) => { setStartDate(e.target.value); setPage(1); }}
          className="rounded-xl border border-ink/20 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-wave/30" />
        <input type="date" value={endDate} onChange={(e) => { setEndDate(e.target.value); setPage(1); }}
          className="rounded-xl border border-ink/20 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-wave/30" />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as "date" | "amount")}
          className="rounded-xl border border-ink/20 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-wave/30">
          <option value="date">Sort: Date</option>
          <option value="amount">Sort: Amount</option>
        </select>
        <Button type="button" variant="ghost" onClick={() => exportCSV(filtered)}>
          Export CSV
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-ink/10">
        <table className="w-full text-sm">
          <thead className="bg-ink/5 text-ink/60">
            <tr>
              {["Date", "Creator", "Amount", "Tx Hash", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-ink/40">No transactions found.</td></tr>
            ) : paginated.map((tx) => (
              <tr key={tx.id} className="border-t border-ink/10 hover:bg-ink/5">
                <td className="px-4 py-3 whitespace-nowrap">{new Date(tx.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3">@{tx.creatorUsername}</td>
                <td className="px-4 py-3 font-mono font-semibold">{tx.amount} {tx.assetCode}</td>
                <td className="px-4 py-3 font-mono text-xs text-ink/50 max-w-32 truncate">
                  {tx.transactionHash ?? "—"}
                </td>
                <td className="px-4 py-3 flex gap-2">
                  <button onClick={() => setSelected(tx)}
                    className="text-wave underline text-xs hover:no-underline">Details</button>
                  <button onClick={() => generateReceipt(tx)}
                    className="text-wave underline text-xs hover:no-underline">Receipt</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-ink/60">
        <span>{filtered.length} transaction{filtered.length !== 1 ? "s" : ""}</span>
        <div className="flex gap-2">
          <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 rounded-lg border border-ink/20 disabled:opacity-40">←</button>
          <span className="px-3 py-1">{page} / {totalPages}</span>
          <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 rounded-lg border border-ink/20 disabled:opacity-40">→</button>
        </div>
      </div>

      {/* Details modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelected(null)}>
          <div className="w-full max-w-md rounded-2xl bg-surface p-6 shadow-xl space-y-3"
            onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-ink">Transaction Details</h3>
            {[
              ["ID", selected.id],
              ["Date", new Date(selected.createdAt).toLocaleString()],
              ["Amount", `${selected.amount} ${selected.assetCode}`],
              ["Creator", `@${selected.creatorUsername}`],
              ...(selected.senderUsername ? [["Sender", `@${selected.senderUsername}`]] : []),
              ...(selected.transactionHash ? [["Tx Hash", selected.transactionHash]] : []),
              ...(selected.message ? [["Message", selected.message]] : []),
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 text-sm">
                <span className="text-ink/50">{k}</span>
                <span className="font-mono text-ink break-all text-right">{v}</span>
              </div>
            ))}
            <div className="flex gap-3 pt-2">
              <Button onClick={() => generateReceipt(selected)} className="flex-1">Download Receipt</Button>
              <Button variant="ghost" onClick={() => setSelected(null)} className="flex-1">Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
