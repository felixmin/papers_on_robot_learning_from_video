import { useState } from 'react';
import { nodes as allNodes, nodeMeta } from '../data/graphData';
import type { ViewMode } from '../layout';

interface ControlsProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  yearRange: [number, number];
  onYearChange: (year: number) => void;
  currentYear: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedTopics: Set<string>;
  onToggleTopic: (topicId: string) => void;
  onResetLayout: () => void;
  showInfluence: boolean;
  onToggleInfluence: () => void;
}

const yearMin = 1997;
const yearMax = 2026;

const viewModes: { mode: ViewMode; label: string; title: string }[] = [
  { mode: 'cluster', label: 'Cluster', title: 'Organic cluster layout' },
  { mode: 'tree', label: 'Tree', title: 'Structured tree layout' },
  { mode: 'timeline', label: 'Timeline', title: 'Papers by year' },
];

// Derive group nodes from graph data (not hardcoded)
const groupNodes = allNodes
  .filter((n) => n.type === 'topic' || n.type === 'root')
  .filter((n) => n.type !== 'root') // exclude root from filter
  .map((n) => {
    const meta = nodeMeta.get(n.id);
    const childCount = meta?.childIds.length ?? 0;
    return { id: n.id, label: n.label, color: meta?.color || '#6366f1', depth: meta?.depth ?? 1, childCount };
  });

export default function Controls({
  viewMode,
  onViewModeChange,
  currentYear,
  onYearChange,
  searchQuery,
  onSearchChange,
  selectedTopics,
  onToggleTopic,
  onResetLayout,
  showInfluence,
  onToggleInfluence,
}: ControlsProps) {
  const [topicOpen, setTopicOpen] = useState(false);
  const papers = allNodes.filter((n) => n.type === 'paper');
  const activeCount = groupNodes.filter((g) => selectedTopics.has(g.id)).length;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-700"
      data-testid="controls"
    >
      <div className="flex items-center gap-3 px-4 py-2.5">
        {/* Title */}
        <div className="flex items-center gap-2 mr-1">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-sm font-semibold text-slate-200 whitespace-nowrap">
            Paper Explorer
          </span>
          <span className="text-xs text-slate-500">{papers.length} papers</span>
        </div>

        {/* View mode buttons */}
        <div className="flex items-center gap-1" data-testid="view-modes">
          {viewModes.map(({ mode, label, title }) => (
            <button
              key={mode}
              onClick={() => onViewModeChange(mode)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all border ${
                viewMode === mode
                  ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                  : 'bg-slate-800 text-slate-500 border-slate-700 hover:text-slate-300'
              }`}
              data-testid={`view-${mode}`}
              title={title}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Influence toggle */}
        <button
          onClick={onToggleInfluence}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all border ${
            showInfluence
              ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
              : 'bg-slate-800 text-slate-500 border-slate-700'
          }`}
          data-testid="influence-toggle"
          title="Toggle paper-to-paper influence edges"
        >
          Influences
        </button>

        {/* Re-layout */}
        <button
          onClick={onResetLayout}
          className="px-3 py-1.5 text-xs font-medium rounded-md transition-all border border-slate-700 text-slate-400 bg-slate-800 hover:bg-slate-700 hover:text-slate-200"
          title="Reset all nodes to auto-layout positions (unpins dragged nodes)"
          data-testid="reset-layout"
        >
          Re-layout
        </button>

        {/* Topic filter dropdown */}
        <div className="relative">
          <button
            onClick={() => setTopicOpen((v) => !v)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all border ${
              activeCount < groupNodes.length
                ? 'bg-violet-500/15 text-violet-400 border-violet-500/30'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-300'
            }`}
            data-testid="topic-dropdown"
          >
            Topics ({activeCount}/{groupNodes.length})
          </button>
          {topicOpen && (
            <div
              className="absolute top-full left-0 mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-xl py-1 z-50 min-w-[260px] max-h-[320px] overflow-y-auto"
              data-testid="topic-filters"
            >
              {/* Select all / none */}
              <div className="flex gap-2 px-3 py-1.5 border-b border-slate-700">
                <button
                  onClick={() => groupNodes.forEach((g) => { if (!selectedTopics.has(g.id)) onToggleTopic(g.id); })}
                  className="text-[10px] text-slate-400 hover:text-slate-200"
                >
                  All
                </button>
                <button
                  onClick={() => groupNodes.forEach((g) => { if (selectedTopics.has(g.id)) onToggleTopic(g.id); })}
                  className="text-[10px] text-slate-400 hover:text-slate-200"
                >
                  None
                </button>
              </div>
              {groupNodes.map((g) => {
                const active = selectedTopics.has(g.id);
                return (
                  <button
                    key={g.id}
                    onClick={() => onToggleTopic(g.id)}
                    className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs text-left hover:bg-slate-700/50 transition-colors ${
                      active ? 'opacity-100' : 'opacity-40'
                    }`}
                    style={{ paddingLeft: `${12 + (g.depth - 1) * 16}px` }}
                    data-testid={`topic-filter-${g.id}`}
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ background: g.color }}
                    />
                    <span className="flex-1 truncate" style={{ color: g.color }}>
                      {g.label}
                    </span>
                    <span className="text-slate-500 flex-shrink-0">({g.childCount})</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Search */}
        <div className="flex-1 max-w-xs">
          <input
            type="text"
            placeholder="Search papers..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-3 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-500 transition-colors"
            data-testid="search-input"
          />
        </div>

        {/* Year slider */}
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-xs text-slate-400">Year:</span>
          <span className="text-xs text-slate-200 font-mono w-10">
            {currentYear === yearMax ? 'All' : `<=${currentYear}`}
          </span>
          <input
            type="range"
            min={yearMin}
            max={yearMax}
            value={currentYear}
            onChange={(e) => onYearChange(Number(e.target.value))}
            className="w-32 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            data-testid="year-slider"
          />
          <span className="text-xs text-slate-500 font-mono">{yearMin}-{yearMax}</span>
        </div>
      </div>
    </div>
  );
}
