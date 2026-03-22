import { topics, nodes as allNodes, influenceEdges, type GraphNode } from '../data/graphData';

const topicColorMap = new Map(topics.map((t) => [t.id, t.color]));
const nodeMap = new Map(allNodes.map((n) => [n.id, n]));

interface SidebarProps {
  node: GraphNode | null;
  onClose: () => void;
  onSelectNode?: (node: GraphNode) => void;
}

function getAncestors(paperId: string): { node: GraphNode; weight: number }[] {
  return influenceEdges
    .filter((e) => e.target === paperId)
    .map((e) => ({ node: nodeMap.get(e.source)!, weight: e.weight }))
    .filter((e) => e.node)
    .sort((a, b) => b.weight - a.weight);
}

function getDescendants(paperId: string): { node: GraphNode; weight: number }[] {
  return influenceEdges
    .filter((e) => e.source === paperId)
    .map((e) => ({ node: nodeMap.get(e.target)!, weight: e.weight }))
    .filter((e) => e.node)
    .sort((a, b) => b.weight - a.weight);
}

function WeightBar({ weight }: { weight: number }) {
  return (
    <div className="w-12 h-1.5 bg-slate-700 rounded-full overflow-hidden flex-shrink-0">
      <div
        className="h-full rounded-full"
        style={{
          width: `${weight * 100}%`,
          background: `linear-gradient(90deg, #f59e0b, #ef4444)`,
          opacity: 0.4 + weight * 0.6,
        }}
      />
    </div>
  );
}

function RelatedPaperList({ items, label, onSelect }: { items: { node: GraphNode; weight: number }[]; label: string; onSelect?: (node: GraphNode) => void }) {
  if (items.length === 0) return null;
  return (
    <div>
      <span className="text-xs text-slate-400 uppercase tracking-wide">{label}</span>
      <div className="mt-1.5 space-y-1">
        {items.map(({ node, weight }) => {
          const color = node.topic ? topicColorMap.get(node.topic) || '#94a3b8' : '#94a3b8';
          return (
            <button
              key={node.id}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded bg-slate-800/60 border border-slate-700/50 text-left transition-colors hover:bg-slate-700/60 hover:border-slate-600/50"
              onClick={() => onSelect?.(node)}
            >
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
              <span className="text-xs text-slate-300 flex-1 leading-tight line-clamp-1">
                {node.label}
              </span>
              <WeightBar weight={weight} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Sidebar({ node, onClose, onSelectNode }: SidebarProps) {
  if (!node) return null;

  const color = node.topic ? topicColorMap.get(node.topic) || '#94a3b8' : '#6366f1';
  const topicLabel = node.topic
    ? topics.find((t) => t.id === node.topic)?.label || ''
    : '';

  const ancestors = node.type === 'paper' ? getAncestors(node.id) : [];
  const descendants = node.type === 'paper' ? getDescendants(node.id) : [];

  return (
    <div
      className="fixed right-0 top-0 h-full w-96 bg-slate-900 border-l border-slate-700 shadow-2xl z-50 overflow-y-auto"
      data-testid="sidebar"
    >
      {/* Header */}
      <div className="sticky top-0 bg-slate-900/95 backdrop-blur border-b border-slate-700 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            {node.type === 'paper' && (
              <div
                className="text-xs font-medium px-2 py-0.5 rounded-full inline-block mb-2"
                style={{ background: `${color}25`, color }}
              >
                {topicLabel}
              </div>
            )}
            <h2 className="text-base font-semibold text-slate-100 leading-snug">
              {node.label}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-1 rounded hover:bg-slate-800 transition-colors flex-shrink-0"
            data-testid="sidebar-close"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {node.type === 'paper' && (
          <>
            {node.year && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-400">Year:</span>
                <span className="text-slate-200 font-medium">{node.year}</span>
              </div>
            )}

            {node.repo_url && (
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wide">
                  Code Repository
                </span>
                <a
                  href={node.repo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 bg-slate-800 rounded-lg p-3 border border-slate-700 hover:border-slate-600 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  {node.repo_url.replace('https://github.com/', '')}
                </a>
              </div>
            )}

            <RelatedPaperList items={ancestors} label="Influenced by" onSelect={onSelectNode} />
            <RelatedPaperList items={descendants} label="Influenced" onSelect={onSelectNode} />

            {ancestors.length === 0 && descendants.length === 0 && (
              <div className="pt-2 border-t border-slate-800">
                <span className="text-xs text-slate-400 uppercase tracking-wide">Type</span>
                <div className="mt-1 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                  <span className="text-sm text-slate-300">Research Paper</span>
                </div>
              </div>
            )}
          </>
        )}

        {node.type === 'topic' && (
          <div>
            <span className="text-xs text-slate-400 uppercase tracking-wide">
              Research Area
            </span>
            <div className="mt-2 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: color }} />
              <span className="text-sm text-slate-300">{node.label}</span>
            </div>
          </div>
        )}

        {node.type === 'root' && (
          <div className="text-sm text-slate-400">
            This is the root topic encompassing all research areas in robot learning from video.
          </div>
        )}
      </div>
    </div>
  );
}
