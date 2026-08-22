"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import type { Tip } from "@/hooks/queries/useTips";

// ─── Layout helpers ──────────────────────────────────────────────────────────

const NODE_R = 28;
const TX_R = 14;
const W = 800;
const H = 500;

interface NodePos { id: string; x: number; y: number; label: string; type: "sender" | "recipient" | "tx"; tip?: Tip }

function buildGraph(tips: Tip[]): { nodes: NodePos[]; edges: { from: string; to: string; tip: Tip }[] } {
  const senders = [...new Set(tips.map((t) => t.sender))];
  const recipients = [...new Set(tips.map((t) => t.recipient))];

  const nodes: NodePos[] = [];
  const edges: { from: string; to: string; tip: Tip }[] = [];

  // Senders on the left
  senders.forEach((s, i) => {
    nodes.push({ id: `s:${s}`, x: 120, y: 60 + i * (H - 80) / Math.max(senders.length - 1, 1), label: s, type: "sender" });
  });

  // Recipients on the right
  recipients.forEach((r, i) => {
    nodes.push({ id: `r:${r}`, x: W - 120, y: 60 + i * (H - 80) / Math.max(recipients.length - 1, 1), label: r, type: "recipient" });
  });

  // Transaction nodes in the middle
  tips.forEach((tip, i) => {
    const txId = `tx:${tip.id}`;
    const col = i % 3;
    const row = Math.floor(i / 3);
    nodes.push({
      id: txId,
      x: W / 2 - 60 + col * 60,
      y: 60 + row * 80,
      label: `${tip.amount} XLM`,
      type: "tx",
      tip,
    });
    edges.push({ from: `s:${tip.sender}`, to: txId, tip });
    edges.push({ from: txId, to: `r:${tip.recipient}`, tip });
  });

  return { nodes, edges };
}

// ─── Status colours ──────────────────────────────────────────────────────────

const STATUS_COLOR: Record<string, string> = {
  completed: "#10b981",
  pending: "#f59e0b",
  failed: "#ef4444",
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function AnimatedEdge({ x1, y1, x2, y2, status, active }: {
  x1: number; y1: number; x2: number; y2: number; status: string; active: boolean;
}) {
  const color = STATUS_COLOR[status] ?? "#8b5cf6";
  const id = `dash-${x1}-${y1}-${x2}-${y2}`;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={active ? 2.5 : 1.5}
        strokeOpacity={active ? 1 : 0.35} strokeDasharray="6 4">
        <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="1s" repeatCount="indefinite" />
      </line>
      {active && (
        <circle r="4" fill={color}>
          <animateMotion dur="1.2s" repeatCount="indefinite">
            <mpath href={`#path-${id}`} />
          </animateMotion>
        </circle>
      )}
      <path id={`path-${id}`} d={`M${x1},${y1} L${x2},${y2}`} fill="none" stroke="none" />
    </g>
  );
}

function GraphNode({ node, selected, highlighted, onClick }: {
  node: NodePos; selected: boolean; highlighted: boolean; onClick: () => void;
}) {
  const r = node.type === "tx" ? TX_R : NODE_R;
  const fill = node.type === "sender" ? "var(--wave)" : node.type === "recipient" ? "#8b5cf6" : (STATUS_COLOR[node.tip?.status ?? ""] ?? "#8b5cf6");
  const opacity = highlighted ? 1 : 0.55;

  return (
    <g
      transform={`translate(${node.x},${node.y})`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
      role="button"
      aria-label={`${node.type} node: ${node.label}`}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      {selected && <circle r={r + 6} fill="none" stroke={fill} strokeWidth={2} strokeOpacity={0.5}>
        <animate attributeName="r" values={`${r + 4};${r + 8};${r + 4}`} dur="1.5s" repeatCount="indefinite" />
      </circle>}
      <circle r={r} fill={fill} fillOpacity={opacity} stroke={selected ? "#fff" : fill}
        strokeWidth={selected ? 2.5 : 1} />
      <text textAnchor="middle" dominantBaseline="middle" fontSize={node.type === "tx" ? 9 : 11}
        fill="#fff" fontWeight="600" style={{ pointerEvents: "none", userSelect: "none" }}>
        {node.label.length > 10 ? node.label.slice(0, 9) + "…" : node.label}
      </text>
    </g>
  );
}

// ─── Detail panel ─────────────────────────────────────────────────────────────

function DetailPanel({ tip, onClose }: { tip: Tip; onClose: () => void }) {
  return (
    <div className="absolute right-4 top-4 w-64 rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-4 shadow-lg space-y-2 text-sm">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-ink">Transaction</span>
        <button onClick={onClose} aria-label="Close detail panel"
          className="text-ink/40 hover:text-ink transition-colors">✕</button>
      </div>
      {[
        ["ID", tip.id],
        ["Amount", `${tip.amount} XLM`],
        ["Sender", tip.sender],
        ["Recipient", tip.recipient],
        ["Status", tip.status],
        ["Date", new Date(tip.date).toLocaleDateString()],
        ...(tip.memo ? [["Memo", tip.memo]] : []),
        ...(tip.transactionHash ? [["Hash", tip.transactionHash.slice(0, 12) + "…"]] : []),
      ].map(([k, v]) => (
        <div key={k} className="flex justify-between gap-2">
          <span className="text-ink/50">{k}</span>
          <span className="font-mono text-ink text-right break-all"
            style={{ color: k === "Status" ? STATUS_COLOR[v] ?? undefined : undefined }}>{v}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface Props {
  tips: Tip[];
}

export function TransactionGraph({ tips }: Props) {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [selectedNode, setSelectedNode] = useState<NodePos | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const filtered = useMemo(() => tips.filter((t) => {
    const matchStatus = statusFilter === "all" || t.status === statusFilter;
    const q = search.toLowerCase();
    const matchSearch = !q || t.sender.toLowerCase().includes(q) || t.recipient.toLowerCase().includes(q) || t.id.includes(q);
    return matchStatus && matchSearch;
  }), [tips, statusFilter, search]);

  const { nodes, edges } = useMemo(() => buildGraph(filtered), [filtered]);

  const highlightedIds = useMemo(() => {
    if (!selectedNode) return new Set<string>();
    const ids = new Set<string>([selectedNode.id]);
    edges.forEach(({ from, to }) => {
      if (from === selectedNode.id || to === selectedNode.id) { ids.add(from); ids.add(to); }
    });
    return ids;
  }, [selectedNode, edges]);

  const handleNodeClick = useCallback((node: NodePos) => {
    setSelectedNode((prev) => prev?.id === node.id ? null : node);
  }, []);

  // Deselect on outside click
  const handleSvgClick = useCallback((e: React.MouseEvent) => {
    if (e.target === svgRef.current) setSelectedNode(null);
  }, []);

  const selectedTip = selectedNode?.tip ?? (selectedNode?.type !== "tx"
    ? filtered.find((t) => `s:${t.sender}` === selectedNode?.id || `r:${t.recipient}` === selectedNode?.id)
    : undefined);

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="Search sender or recipient…"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setSelectedNode(null); }}
          className="flex-1 min-w-48 rounded-xl border border-ink/20 bg-[color:var(--surface)] px-3 py-2 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          aria-label="Search transactions"
        />
        <div className="flex gap-2" role="group" aria-label="Filter by status">
          {(["all", "completed", "pending", "failed"] as const).map((s) => (
            <button
              key={s}
              onClick={() => { setStatusFilter(s); setSelectedNode(null); }}
              className={[
                "rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors",
                statusFilter === s
                  ? "bg-purple-600 text-white"
                  : "border border-ink/20 text-ink/60 hover:bg-ink/5",
              ].join(" ")}
              aria-pressed={statusFilter === s}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 text-xs text-ink/60">
        {[["Sender", "var(--wave)"], ["Recipient", "#8b5cf6"], ["Completed", "#10b981"], ["Pending", "#f59e0b"], ["Failed", "#ef4444"]].map(([label, color]) => (
          <span key={label} className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: color }} />
            {label}
          </span>
        ))}
      </div>

      {/* Graph */}
      <div className="relative rounded-2xl border border-ink/10 bg-[color:var(--surface)] overflow-hidden">
        {filtered.length === 0 ? (
          <div className="flex h-64 items-center justify-center text-ink/40 text-sm">
            No transactions match the current filter.
          </div>
        ) : (
          <svg
            ref={svgRef}
            viewBox={`0 0 ${W} ${H}`}
            className="w-full"
            style={{ minHeight: 320 }}
            onClick={handleSvgClick}
            aria-label="Transaction graph"
            role="img"
          >
            {/* Edges */}
            {edges.map(({ from, to, tip }, i) => {
              const a = nodes.find((n) => n.id === from);
              const b = nodes.find((n) => n.id === to);
              if (!a || !b) return null;
              const active = !selectedNode || highlightedIds.has(from) && highlightedIds.has(to);
              return (
                <AnimatedEdge key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  status={tip.status} active={active} />
              );
            })}

            {/* Nodes */}
            {nodes.map((node) => (
              <GraphNode
                key={node.id}
                node={node}
                selected={selectedNode?.id === node.id}
                highlighted={!selectedNode || highlightedIds.has(node.id)}
                onClick={() => handleNodeClick(node)}
              />
            ))}
          </svg>
        )}

        {/* Detail panel */}
        {selectedNode && selectedTip && (
          <DetailPanel tip={selectedTip} onClose={() => setSelectedNode(null)} />
        )}
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-3 text-center text-sm">
        {[
          ["Total", filtered.length],
          ["Completed", filtered.filter((t) => t.status === "completed").length],
          ["Volume", filtered.reduce((s, t) => s + t.amount, 0) + " XLM"],
        ].map(([label, val]) => (
          <div key={label as string} className="rounded-xl border border-ink/10 bg-[color:var(--surface)] py-3">
            <p className="text-ink/50 text-xs">{label}</p>
            <p className="font-bold text-ink mt-0.5">{val}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
