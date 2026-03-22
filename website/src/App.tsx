import { useState, useCallback, useMemo, useEffect } from 'react';
import {
  ReactFlow,
  Controls as FlowControls,
  MiniMap,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  type NodeMouseHandler,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import {
  nodes as rawNodes,
  edges as rawEdges,
  topics,
  influenceEdges as rawInfluenceEdges,
  nodeMeta,
  type GraphNode,
} from './data/graphData';
import { computeLayout, TIMELINE_YEAR_STEP, type ViewMode } from './layout';
import { useForceSimulation, type DirectedEdge } from './useForceSimulation';
import { RootNode, TopicNode, PaperNode } from './components/CustomNodes';
import Controls from './components/Controls';
import Sidebar from './components/Sidebar';
import TimelineOverlay from './components/TimelineOverlay';

const nodeTypes = {
  rootNode: RootNode,
  topicNode: TopicNode,
  paperNode: PaperNode,
};

function buildFlowNodes(
  graphNodes: GraphNode[],
  yearFilter: number,
  searchQuery: string,
  selectedTopics: Set<string>,
  collapsedTopics: Set<string>,
): Node[] {
  const query = searchQuery.toLowerCase().trim();
  const maxYear = 2026;

  return graphNodes
    .filter((gn) => {
      if (gn.type === 'root') return true;
      if (gn.type === 'topic') return selectedTopics.has(gn.id);
      if (gn.type === 'paper') {
        if (gn.topic && !selectedTopics.has(gn.topic)) return false;
        if (gn.topic && collapsedTopics.has(gn.topic)) return false;
        if (query && !gn.label.toLowerCase().includes(query)) return false;
        return true;
      }
      return true;
    })
    .map((gn) => {
      const dimmed =
        gn.type === 'paper' && yearFilter < maxYear && gn.year !== undefined && gn.year > yearFilter;
      const meta = nodeMeta.get(gn.id);
      const topicId = gn.type === 'paper' ? gn.topic : gn.type === 'topic' ? gn.id : undefined;
      const paperCount = gn.type === 'topic'
        ? graphNodes.filter((n) => n.type === 'paper' && n.topic === gn.id).length
        : undefined;
      const collapsed = gn.type === 'topic' && collapsedTopics.has(gn.id);

      return {
        id: gn.id,
        type:
          gn.type === 'root' ? 'rootNode'
          : gn.type === 'topic' ? 'topicNode'
          : 'paperNode',
        position: { x: 0, y: 0 },
        data: {
          label: gn.label,
          year: gn.year,
          topic: topicId,
          nodeId: gn.id,
          dimmed,
          count: paperCount,
          collapsed,
          color: meta?.color || '#94a3b8',
          depth: meta?.depth ?? 0,
        },
      };
    });
}

function buildHierarchyEdges(visibleIds: Set<string>): Edge[] {
  return rawEdges
    .filter((e) => visibleIds.has(e.source) && visibleIds.has(e.target))
    .map((e) => ({
      id: e.id,
      source: e.source,
      target: e.target,
      style: { stroke: '#475569', strokeWidth: 1.5 },
      animated: false,
    }));
}

function buildInfluenceFlowEdges(visibleIds: Set<string>): Edge[] {
  return rawInfluenceEdges
    .filter((e) => visibleIds.has(e.source) && visibleIds.has(e.target))
    .map((e) => ({
      id: e.id,
      source: e.source,
      target: e.target,
      type: 'default',
      style: {
        stroke: '#f59e0b',
        strokeWidth: Math.max(0.5, e.weight * 2.5),
        opacity: 0.15 + e.weight * 0.45,
        strokeDasharray: e.weight < 0.5 ? '4 4' : undefined,
      },
      animated: false,
    }));
}

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('cluster');
  const [showInfluence, setShowInfluence] = useState(false);
  const [yearFilter, setYearFilter] = useState(2026);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<Set<string>>(
    new Set(topics.map((t) => t.id))
  );
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [collapsedTopics, setCollapsedTopics] = useState<Set<string>>(new Set());

  const handleViewModeChange = useCallback((mode: ViewMode) => setViewMode(mode), []);

  const toggleTopic = useCallback((topicId: string) => {
    setSelectedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(topicId)) next.delete(topicId);
      else next.add(topicId);
      return next;
    });
  }, []);

  const toggleCollapse = useCallback((nodeId: string) => {
    setCollapsedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) next.delete(nodeId);
      else next.add(nodeId);
      return next;
    });
  }, []);

  // Compute layout
  const { initialNodes, allEdges, targets, directedEdges, activeInfluences, visibleParentMap, timelineYears } =
    useMemo(() => {
      const flowNodes = buildFlowNodes(rawNodes, yearFilter, searchQuery, selectedTopics, collapsedTopics);
      const visibleIds = new Set(flowNodes.map((n) => n.id));
      const hierarchyEdges = buildHierarchyEdges(visibleIds);

      const { nodes: layoutNodes, edges: layoutEdges, targets } =
        computeLayout(flowNodes, hierarchyEdges, viewMode);

      const influenceFlowEdges = showInfluence ? buildInfluenceFlowEdges(visibleIds) : [];
      const allEdges = [...layoutEdges, ...influenceFlowEdges];

      // Build directed edges for Y-ordering
      // Timeline: no Y-ordering (year axis handles temporal order, Y is free)
      const containmentGap = viewMode === 'timeline' ? 0 : viewMode === 'cluster' ? 130 : 100;
      const influenceGap = viewMode === 'timeline' ? 0 : viewMode === 'cluster' ? 80 : 70;

      const directedEdges: DirectedEdge[] = [
        ...rawEdges
          .filter((e) => visibleIds.has(e.source) && visibleIds.has(e.target))
          .map((e) => ({ source: e.source, target: e.target, minGap: containmentGap })),
        ...rawInfluenceEdges
          .filter((e) => visibleIds.has(e.source) && visibleIds.has(e.target))
          .map((e) => ({ source: e.source, target: e.target, minGap: influenceGap })),
      ];

      const activeInfluences = rawInfluenceEdges.filter(
        (e) => visibleIds.has(e.source) && visibleIds.has(e.target)
      );

      // Parent map for visible nodes
      const visibleParentMap = new Map<string, string>();
      for (const e of rawEdges) {
        if (visibleIds.has(e.source) && visibleIds.has(e.target)) {
          visibleParentMap.set(e.target, e.source);
        }
      }

      // Timeline year data for gridlines
      const timelineYears = viewMode === 'timeline'
        ? (() => {
            const years = rawNodes
              .filter((n) => n.type === 'paper' && visibleIds.has(n.id) && n.year != null)
              .map((n) => n.year!);
            return [...new Set(years)].sort((a, b) => a - b);
          })()
        : null;

      return { initialNodes: layoutNodes, allEdges, targets, directedEdges, activeInfluences, visibleParentMap, timelineYears };
    }, [viewMode, showInfluence, yearFilter, searchQuery, selectedTopics, collapsedTopics]);

  // Edge highlighting: brighten connected edges, dim others
  const displayedEdges = useMemo(() => {
    if (!selectedNode) return allEdges;
    return allEdges.map((e) => {
      const connected = e.source === selectedNode.id || e.target === selectedNode.id;
      if (connected) {
        return Object.assign({}, e, {
          style: Object.assign({}, e.style, {
            opacity: 1,
            strokeWidth: Math.max(((e.style?.strokeWidth as number) || 1.5), 2.5),
          }),
        });
      }
      return Object.assign({}, e, {
        style: Object.assign({}, e.style, { opacity: 0.06 }),
      });
    });
  }, [allEdges, selectedNode]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(displayedEdges);

  // Sync layout → node state, preserving existing positions
  useEffect(() => {
    setNodes((prev) => {
      const prevMap = new Map(prev.map((n) => [n.id, n]));
      return initialNodes.map((n) => {
        const existing = prevMap.get(n.id);
        if (existing && existing.type === n.type) {
          return Object.assign({}, n, { position: existing.position });
        }
        return n;
      });
    });
  }, [initialNodes, setNodes]);

  // Sync edges (includes selection highlighting)
  useEffect(() => {
    setEdges(displayedEdges);
  }, [displayedEdges, setEdges]);

  // Force simulation
  const { setTargets, reheat, onSimDragStart, onSimDrag, onSimDragStop } = useForceSimulation({
    directedEdges,
    influenceEdges: activeInfluences,
    parentMap: visibleParentMap,
    setNodes,
  });

  // Push targets to simulation whenever they change
  useEffect(() => {
    setTargets(targets);
    reheat(1);
  }, [targets, setTargets, reheat]);

  const resetLayout = useCallback(() => reheat(1), [reheat]);

  const onNodeClick: NodeMouseHandler = useCallback((_event, node) => {
    const graphNode = rawNodes.find((n) => n.id === node.id);
    if (graphNode) setSelectedNode(graphNode);
  }, []);

  const onNodeDoubleClick: NodeMouseHandler = useCallback(
    (_event, node) => {
      const graphNode = rawNodes.find((n) => n.id === node.id);
      if (graphNode && graphNode.type === 'topic') {
        toggleCollapse(graphNode.id);
      }
      if (graphNode && graphNode.type === 'root') {
        setCollapsedTopics((prev) => {
          const allTopicIds = topics.map((t) => t.id);
          const allCollapsed = allTopicIds.every((id) => prev.has(id));
          return allCollapsed ? new Set() : new Set(allTopicIds);
        });
      }
    },
    [toggleCollapse]
  );

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const timelineMinYear = timelineYears && timelineYears.length > 0 ? timelineYears[0] : 2000;

  const minimapNodeColor = useCallback((node: Node) => {
    return (node.data?.color as string) || '#475569';
  }, []);

  return (
    <div className="w-full h-full relative">
      <Controls
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
        yearRange={[1997, 2026]}
        onYearChange={setYearFilter}
        currentYear={yearFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedTopics={selectedTopics}
        onToggleTopic={toggleTopic}
        onResetLayout={resetLayout}
        showInfluence={showInfluence}
        onToggleInfluence={() => setShowInfluence((v) => !v)}
      />

      <div className="w-full h-full pt-[88px]" data-testid="graph-container">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onNodeDoubleClick={onNodeDoubleClick}
          onNodeDragStart={onSimDragStart}
          onNodeDrag={onSimDrag}
          onNodeDragStop={onSimDragStop}
          onPaneClick={onPaneClick}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.1}
          maxZoom={2}
          proOptions={{ hideAttribution: true }}
        >
          <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#1e293b" />
          {viewMode === 'timeline' && timelineYears && timelineYears.length > 0 && (
            <TimelineOverlay
              years={timelineYears}
              minYear={timelineMinYear}
              yearStep={TIMELINE_YEAR_STEP}
            />
          )}
          <FlowControls position="bottom-left" />
          <MiniMap
            position="bottom-right"
            nodeColor={minimapNodeColor}
            maskColor="rgba(15, 23, 42, 0.8)"
            pannable
            zoomable
          />
        </ReactFlow>
      </div>

      <Sidebar node={selectedNode} onClose={() => setSelectedNode(null)} onSelectNode={setSelectedNode} />
    </div>
  );
}

export default App;
