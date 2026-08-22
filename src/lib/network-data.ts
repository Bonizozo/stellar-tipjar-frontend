export interface NetworkNode {
  id: string;
  name: string;
  avatar: string;
  type: 'creator' | 'foundation' | 'developer';
  x: number;
  y: number;
}

export interface NetworkLink {
  source: string;
  target: string;
  type: 'collab' | 'grant' | 'mentorship';
  strength: number;
}

export const NETWORK_NODES: NetworkNode[] = [
  { id: '1', name: 'Stellar Foundation', avatar: 'https://i.pravatar.cc/150?u=sdf', type: 'foundation', x: 500, y: 400 },
  { id: '2', name: 'Alice (Creator)', avatar: 'https://i.pravatar.cc/150?u=alice', type: 'creator', x: 300, y: 250 },
  { id: '3', name: 'Bob (Developer)', avatar: 'https://i.pravatar.cc/150?u=bob', type: 'developer', x: 700, y: 250 },
  { id: '4', name: 'Charlie (Creator)', avatar: 'https://i.pravatar.cc/150?u=charlie', type: 'creator', x: 250, y: 550 },
  { id: '5', name: 'Diana (Developer)', avatar: 'https://i.pravatar.cc/150?u=diana', type: 'developer', x: 750, y: 550 },
  { id: '6', name: 'Eve (Creator)', avatar: 'https://i.pravatar.cc/150?u=eve', type: 'creator', x: 500, y: 150 },
  { id: '7', name: 'Frank (Mentor)', avatar: 'https://i.pravatar.cc/150?u=frank', type: 'creator', x: 100, y: 400 },
  { id: '8', name: 'Grace (Dev Rel)', avatar: 'https://i.pravatar.cc/150?u=grace', type: 'developer', x: 900, y: 400 },
];

export const NETWORK_LINKS: NetworkLink[] = [
  { source: '1', target: '2', type: 'grant', strength: 2 },
  { source: '1', target: '3', type: 'grant', strength: 2 },
  { source: '2', target: '3', type: 'collab', strength: 1 },
  { source: '2', target: '4', type: 'mentorship', strength: 3 },
  { source: '3', target: '5', type: 'collab', strength: 1 },
  { source: '1', target: '6', type: 'grant', strength: 2 },
  { source: '4', target: '7', type: 'collab', strength: 1 },
  { source: '5', target: '8', type: 'collab', strength: 1 },
  { source: '6', target: '2', type: 'collab', strength: 1 },
  { source: '7', target: '1', type: 'grant', strength: 2 },
];
