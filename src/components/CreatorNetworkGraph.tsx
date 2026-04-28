"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { ZoomIn, ZoomOut, Maximize2, Filter } from "lucide-react";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full text-ink/40 dark:text-white/40">
      Loading graph…
    </div>
  ),
});

// ── Types ──────────────────────────────────────────────────────────────────────

export type RelationshipType = "collaboration" | "supporter" | "mention";

interface GraphNode {
  id: string;
  name: string;
  category: string;
  followers: number;
  color?: string;
}

interface GraphLink {
  source: string;
  target: string;
  type: RelationshipType;
}

interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

// ── Mock data ──────────────────────────────────────────────────────────────────

const MOCK_DATA: GraphData = {
  nodes: [
    { id: "alice", name: "Alice", category: "music", followers: 4200 },
    { id: "bob", name: "Bob", category: "art", followers: 1800 },
    { id: "carol", name: "Carol", category: "music", followers: 3100 },
    { id: "dave", name: "Dave", category: "gaming", followers: 9500 },
    { id: "eve", name: "Eve", category: "art", followers: 2700 },
    { id: "frank", name: "Frank", category: "gaming", followers: 6200 },
    { id: "grace", name: "Grace", category: "music", followers: 1500 },
    { id: "henry", name: "Henry", category: "art", followers: 3800 },
  ],
  links: [
    { source: "alice", target: "carol", type: "collaboration" },
    { source: "alice", target: "bob", type: "mention" },
    { source: "bob", target: "eve", type: "collaboration" },
    { source: "carol", target: "grace", type: "collaboration" },
    { source: "dave", target: "frank", type: "collaboration" },
    { source: "dave", target: "alice", type: "supporter" },
    { source: "eve", target: "henry", type: "collaboration" },
    { source: "frank", target: "carol", type: "mention" },
    { source: "henry", target: "bob", type: "supporter" },
    { source: "grace", target: "dave", type: "supporter" },
  ],
};

// ── Constants ──────────────────────────────────────────────────────────────────

const RELATIONSHIP_COLORS: Record<RelationshipType, string> = {
  collaboration: "#6366f1",
  supporter: "#22c55e",
  mention: "#f59e0b",
};

const CATEGORY_COLORS: Record<string, string> = {
  music: "#ec4899",
  art: "#8b5cf6",
  gaming: "#06b6d4",
};

const ALL_TYPES: RelationshipType[] = ["collaboration", "supporter", "mention"];

// ── Component ──────────────────────────────────────────────────────────────────

export default function CreatorNetworkGraph() {
  const graphRef = useRef<{ zoom: (k: number, ms?: number) => void; zoomToFit: (ms?: number) => void } | null>(null);
  const [activeFilters, setActiveFilters] = useState<Set<RelationshipType>>(
    new Set(ALL_TYPES)
  );
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive sizing
  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const filteredData: GraphData = {
    nodes: MOCK_DATA.nodes,
    links: MOCK_DATA.links.filter((l) => activeFilters.has(l.type)),
  };

  const toggleFilter = (type: RelationshipType) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      next.has(type) ? next.delete(type) : next.add(type);
      return next;
    });
  };

  const handleNodeClick = useCallback((node: object) => {
    setSelectedNode(node as GraphNode);
  }, []);

  const nodeCanvasObject = useCallback(
    (node: object, ctx: CanvasRenderingContext2D, globalScale: number) => {
      const n = node as GraphNode & { x?: number; y?: number };
      if (n.x === undefined || n.y === undefined) return;

      const radius = Math.max(4, Math.sqrt(n.followers / 500));
      const color = CATEGORY_COLORS[n.category] ?? "#94a3b8";

      // Node circle
      ctx.beginPath();
      ctx.arc(n.x, n.y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();

      // Label (only when zoomed in enough)
      if (globalScale >= 1.2) {
        const label = n.name;
        const fontSize = 12 / globalScale;
        ctx.font = `${fontSize}px sans-serif`;
        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(label, n.x, n.y + radius + fontSize);
      }
    },
    []
  );

  const linkColor = useCallback(
    (link: object) => RELATIONSHIP_COLORS[(link as GraphLink).type] ?? "#94a3b8",
    []
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-xl font-semibold text-ink dark:text-white">
          Creator Network
        </h2>

        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <button
            aria-label="Zoom in"
            onClick={() => graphRef.current?.zoom(1.5, 300)}
            className="p-2 rounded-lg bg-surface dark:bg-white/10 hover:bg-surface/80 dark:hover:bg-white/20 transition-colors"
          >
            <ZoomIn size={16} />
          </button>
          <button
            aria-label="Zoom out"
            onClick={() => graphRef.current?.zoom(0.67, 300)}
            className="p-2 rounded-lg bg-surface dark:bg-white/10 hover:bg-surface/80 dark:hover:bg-white/20 transition-colors"
          >
            <ZoomOut size={16} />
          </button>
          <button
            aria-label="Fit to view"
            onClick={() => graphRef.current?.zoomToFit(400)}
            className="p-2 rounded-lg bg-surface dark:bg-white/10 hover:bg-surface/80 dark:hover:bg-white/20 transition-colors"
          >
            <Maximize2 size={16} />
          </button>

          {/* Filter toggle */}
          <button
            aria-label="Toggle filters"
            onClick={() => setShowFilters((v) => !v)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              showFilters
                ? "bg-indigo-500 text-white"
                : "bg-surface dark:bg-white/10 hover:bg-surface/80 dark:hover:bg-white/20"
            }`}
          >
            <Filter size={14} />
            Filters
          </button>
        </div>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="flex flex-wrap gap-2 p-3 rounded-xl bg-surface dark:bg-white/5 border border-ink/10 dark:border-white/10">
          <span className="text-sm font-medium text-ink/60 dark:text-white/60 self-center mr-1">
            Relationship:
          </span>
          {ALL_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => toggleFilter(type)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border transition-colors ${
                activeFilters.has(type)
                  ? "text-white border-transparent"
                  : "bg-transparent border-ink/20 dark:border-white/20 text-ink/50 dark:text-white/50"
              }`}
              style={
                activeFilters.has(type)
                  ? { backgroundColor: RELATIONSHIP_COLORS[type] }
                  : {}
              }
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: RELATIONSHIP_COLORS[type] }}
              />
              {type}
            </button>
          ))}

          {/* Category legend */}
          <span className="text-sm font-medium text-ink/60 dark:text-white/60 self-center ml-4 mr-1">
            Category:
          </span>
          {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
            <span
              key={cat}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-sm"
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: color }}
              />
              {cat}
            </span>
          ))}
        </div>
      )}

      {/* Graph canvas */}
      <div
        ref={containerRef}
        className="relative rounded-2xl overflow-hidden bg-surface dark:bg-white/5 border border-ink/10 dark:border-white/10"
        style={{ height: 500 }}
      >
        <ForceGraph2D
          ref={graphRef as React.MutableRefObject<null>}
          graphData={filteredData}
          width={dimensions.width}
          height={dimensions.height}
          nodeCanvasObject={nodeCanvasObject}
          nodeCanvasObjectMode={() => "replace"}
          linkColor={linkColor}
          linkWidth={1.5}
          linkDirectionalArrowLength={4}
          linkDirectionalArrowRelPos={1}
          onNodeClick={handleNodeClick}
          enableZoomInteraction
          enablePanInteraction
          backgroundColor="transparent"
        />

        {/* Node tooltip */}
        {selectedNode && (
          <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-3 text-sm max-w-xs border border-ink/10 dark:border-white/10">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-ink dark:text-white">
                  {selectedNode.name}
                </p>
                <p className="text-ink/60 dark:text-white/60 capitalize">
                  {selectedNode.category} ·{" "}
                  {selectedNode.followers.toLocaleString()} followers
                </p>
              </div>
              <button
                aria-label="Close"
                onClick={() => setSelectedNode(null)}
                className="text-ink/40 dark:text-white/40 hover:text-ink dark:hover:text-white text-lg leading-none"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Stats row */}
      <div className="flex flex-wrap gap-4 text-sm text-ink/60 dark:text-white/60">
        <span>{filteredData.nodes.length} creators</span>
        <span>{filteredData.links.length} connections</span>
        <span>
          {activeFilters.size === ALL_TYPES.length
            ? "All relationship types"
            : `${activeFilters.size} of ${ALL_TYPES.length} types shown`}
        </span>
      </div>
    </div>
  );
}
