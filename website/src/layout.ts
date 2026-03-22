import Dagre from '@dagrejs/dagre';
import { type Node, type Edge } from '@xyflow/react';
import type { Target } from './useForceSimulation';

export type ViewMode = 'cluster' | 'tree' | 'timeline';

export const TIMELINE_YEAR_STEP = 280;

/**
 * Compute initial node positions + per-node targets for the force simulation.
 * The simulation uses targets as weak/strong gravity depending on mode.
 */
export function computeLayout(
  nodes: Node[],
  hierarchyEdges: Edge[],
  viewMode: ViewMode,
): {
  nodes: Node[];
  edges: Edge[];
  targets: Map<string, Target>;
} {
  switch (viewMode) {
    case 'timeline':
      return computeTimelineLayout(nodes, hierarchyEdges);
    case 'tree':
      return computeTreeLayout(nodes, hierarchyEdges);
    case 'cluster':
    default:
      return computeClusterLayout(nodes, hierarchyEdges);
  }
}

// ---------------------------------------------------------------------------
// Dagre helper — used by cluster and tree
// ---------------------------------------------------------------------------

function runDagre(
  nodes: Node[],
  edges: Edge[],
  opts: { ranksep: number; nodesep: number },
): Map<string, { x: number; y: number }> {
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: 'TB', ranksep: opts.ranksep, nodesep: opts.nodesep });

  for (const node of nodes) {
    const w = node.type === 'paperNode' ? 200 : node.type === 'topicNode' ? 240 : 260;
    const h = node.type === 'paperNode' ? 40 : node.type === 'topicNode' ? 50 : 60;
    g.setNode(node.id, { width: w, height: h });
  }
  for (const edge of edges) {
    g.setEdge(edge.source, edge.target);
  }
  Dagre.layout(g);

  const positions = new Map<string, { x: number; y: number }>();
  for (const node of nodes) {
    const pos = g.node(node.id);
    const w = node.type === 'paperNode' ? 200 : node.type === 'topicNode' ? 240 : 260;
    const h = node.type === 'paperNode' ? 40 : node.type === 'topicNode' ? 50 : 60;
    positions.set(node.id, { x: pos.x - w / 2, y: pos.y - h / 2 });
  }
  return positions;
}

// ---------------------------------------------------------------------------
// Cluster: dagre initial + very weak targets (fully organic)
// ---------------------------------------------------------------------------

function computeClusterLayout(
  nodes: Node[],
  hierarchyEdges: Edge[],
) {
  // Use dagre for initial positions of ALL nodes
  const dagrePos = runDagre(nodes, hierarchyEdges, { ranksep: 140, nodesep: 60 });

  const targets = new Map<string, Target>();
  const layoutNodes = nodes.map((node) => {
    const pos = dagrePos.get(node.id) || { x: 0, y: 0 };
    const isGroup = node.type !== 'paperNode';
    // Groups get moderate target pull to keep the tree top stable
    // Papers get very weak pull — they're positioned by forces
    targets.set(node.id, {
      x: pos.x,
      y: pos.y,
      strength: isGroup ? 0.02 : 0.003,
    });
    return Object.assign({}, node, { position: pos });
  });

  return { nodes: layoutNodes, edges: hierarchyEdges, targets };
}

// ---------------------------------------------------------------------------
// Tree: dagre with stronger targets (structured)
// ---------------------------------------------------------------------------

function computeTreeLayout(
  nodes: Node[],
  edges: Edge[],
) {
  const dagrePos = runDagre(nodes, edges, { ranksep: 90, nodesep: 30 });

  const targets = new Map<string, Target>();
  const layoutNodes = nodes.map((node) => {
    const pos = dagrePos.get(node.id) || { x: 0, y: 0 };
    targets.set(node.id, { x: pos.x, y: pos.y, strength: 0.04 });
    return Object.assign({}, node, { position: pos });
  });

  return { nodes: layoutNodes, edges, targets };
}

// ---------------------------------------------------------------------------
// Timeline: horizontal, X = year (strongly constrained), Y = free (force sim)
// ---------------------------------------------------------------------------

function computeTimelineLayout(
  nodes: Node[],
  edges: Edge[],
) {
  const papers: Node[] = [];
  const topicNodes: Node[] = [];
  let rootNode: Node | undefined;

  for (const node of nodes) {
    if (node.type === 'rootNode') rootNode = node;
    else if (node.type === 'topicNode') topicNodes.push(node);
    else papers.push(node);
  }

  const topicIds = topicNodes.map((n) => n.id);
  const topicIndex = new Map(topicIds.map((id, i) => [id, i]));
  const topicCount = topicIds.length || 1;

  // Year range from visible papers
  const years = papers
    .map((p) => p.data?.year as number | undefined)
    .filter((y): y is number => y != null);
  const minYear = years.length > 0 ? Math.min(...years) : 2000;
  const maxYear = years.length > 0 ? Math.max(...years) : 2025;
  const yearSpan = Math.max(maxYear - minYear, 1);

  // Collect unique years for year markers
  const uniqueYears = [...new Set(years)].sort((a, b) => a - b);

  const yearStep = TIMELINE_YEAR_STEP;
  const xStart = 0;
  const totalHeight = topicCount * 80; // rough height spread for Y grouping

  const targets = new Map<string, Target>();
  const layoutNodes: Node[] = [];

  // Root: top-left corner, out of the way
  if (rootNode) {
    const pos = { x: -300, y: -80 };
    targets.set(rootNode.id, { x: pos.x, y: pos.y, strength: 0.05 });
    layoutNodes.push(Object.assign({}, rootNode, { position: pos }));
  }

  // Topic labels: placed at left margin, spread vertically
  for (const tNode of topicNodes) {
    const idx = topicIndex.get(tNode.id) ?? 0;
    const yCenter = (idx / topicCount) * totalHeight;
    const pos = { x: -300, y: yCenter };
    // Topics get moderate Y target but weak X (they stay at left edge)
    targets.set(tNode.id, { x: pos.x, y: pos.y, strength: 0.03 });
    layoutNodes.push(Object.assign({}, tNode, { position: pos }));
  }

  // Papers: X = year (STRONG pull), Y = topic-grouped (WEAK pull, sim handles it)
  // Count papers per year for initial Y scatter
  const yearCounts = new Map<number, number>();

  for (const paper of papers) {
    const year = (paper.data?.year as number) ?? minYear;
    const topicId = paper.data?.topic as string;
    const topicIdx = topicIndex.get(topicId) ?? 0;

    const yearIdx = yearCounts.get(year) ?? 0;
    yearCounts.set(year, yearIdx + 1);

    const posX = xStart + (year - minYear) * yearStep;
    // Initial Y: spread by topic group, with scatter within group
    const topicYCenter = (topicIdx / topicCount) * totalHeight;
    const posY = topicYCenter + yearIdx * 55;

    const pos = { x: posX, y: posY };
    // Strong X pull (year axis), weak Y pull (topic grouping hint)
    targets.set(paper.id, { x: posX, y: topicYCenter, strength: 0.06, strengthX: 0.08, strengthY: 0.005 });
    layoutNodes.push(Object.assign({}, paper, { position: pos }));
  }

  return { nodes: layoutNodes, edges, targets };
}
