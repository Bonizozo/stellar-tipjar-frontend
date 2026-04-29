'use client';
import React, { useState, useMemo } from 'react';
import { NETWORK_NODES, NETWORK_LINKS, NetworkNode } from '@/lib/network-data';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, ZoomOut, Maximize2, Filter, Info, X } from 'lucide-react';
import '@/styles/network.css';

export default function CreatorNetworkGraph() {
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [filter, setFilter] = useState<'all' | 'creator' | 'developer' | 'foundation'>('all');
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const filteredNodes = useMemo(() => 
    filter === 'all' ? NETWORK_NODES : NETWORK_NODES.filter(n => n.type === filter),
    [filter]
  );

  const filteredLinks = useMemo(() => {
    const nodeIds = new Set(filteredNodes.map(n => n.id));
    return NETWORK_LINKS.filter(l => nodeIds.has(l.source) && nodeIds.has(l.target));
  }, [filteredNodes]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleZoom = (delta: number) => {
    setZoom(prev => Math.min(Math.max(prev + delta, 0.5), 3));
  };

  const resetView = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div className="network-container">
      {/* Top Filter Bar */}
      <div className="filter-bar">
        {['all', 'creator', 'developer', 'foundation'].map((type) => (
          <button 
            key={type}
            className={`filter-btn ${filter === type ? 'active' : ''}`}
            onClick={() => setFilter(type as any)}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="graph-legend">
        <h4 style={{ margin: '0 0 1rem' }}>Relationship Types</h4>
        <div className="legend-item">
          <div className="legend-color" style={{ background: 'var(--net-accent)' }} />
          <span>Grant (SDF)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ background: 'var(--net-secondary)' }} />
          <span>Mentorship</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ background: 'var(--net-primary)' }} />
          <span>Collaboration</span>
        </div>
      </div>

      {/* Controls */}
      <div className="graph-controls">
        <button className="control-btn" onClick={() => handleZoom(0.2)}><ZoomIn size={20} /></button>
        <button className="control-btn" onClick={() => handleZoom(-0.2)}><ZoomOut size={20} /></button>
        <button className="control-btn" onClick={resetView}><Maximize2 size={20} /></button>
      </div>

      {/* Node Detail Panel */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div 
            className="node-detail-panel"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <button 
              onClick={() => setSelectedNode(null)}
              style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
            <img src={selectedNode.avatar} alt={selectedNode.name} style={{ width: '80px', height: '80px', borderRadius: '20px', marginBottom: '1.5rem', border: '2px solid var(--net-primary)' }} />
            <h3 style={{ margin: '0 0 0.5rem' }}>{selectedNode.name}</h3>
            <p style={{ color: 'var(--net-primary)', fontSize: '0.9rem', textTransform: 'uppercase', fontWeight: 'bold' }}>{selectedNode.type}</p>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.6', marginTop: '1rem' }}>
              Active contributor in the Stellar ecosystem. Involved in multiple collaborations and grant programs.
            </p>
            <button className="control-btn" style={{ width: '100%', marginTop: '1.5rem', background: 'var(--net-primary)', color: 'black', fontWeight: 'bold' }}>
              View Profile
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Graph Area */}
      <svg 
        className="graph-svg"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <g transform={`translate(${offset.x}, ${offset.y}) scale(${zoom})`}>
          {/* Edges */}
          {filteredLinks.map((link, i) => {
            const sourceNode = NETWORK_NODES.find(n => n.id === link.source)!;
            const targetNode = NETWORK_NODES.find(n => n.id === link.target)!;
            return (
              <line
                key={`${link.source}-${link.target}`}
                className={`edge ${link.type}`}
                x1={sourceNode.x}
                y1={sourceNode.y}
                x2={targetNode.x}
                y2={targetNode.y}
              />
            );
          })}

          {/* Nodes */}
          {filteredNodes.map((node) => (
            <g 
              key={node.id} 
              className={`node ${node.type}`}
              transform={`translate(${node.x}, ${node.y})`}
              onClick={() => setSelectedNode(node)}
            >
              <circle className="node-circle" r={node.type === 'foundation' ? 40 : 30} />
              <clipPath id={`clip-${node.id}`}>
                <circle r={node.type === 'foundation' ? 38 : 28} />
              </clipPath>
              <image 
                href={node.avatar} 
                x={node.type === 'foundation' ? -38 : -28} 
                y={node.type === 'foundation' ? -38 : -28} 
                width={node.type === 'foundation' ? 76 : 56} 
                height={node.type === 'foundation' ? 76 : 56} 
                clipPath={`url(#clip-${node.id})`}
              />
              <text className="node-label" y={node.type === 'foundation' ? 55 : 45} textAnchor="middle">
                {node.name}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
