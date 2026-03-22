import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

export const RootNode = memo(({ data }: { data: Record<string, unknown> }) => (
  <div
    className="px-5 py-3 rounded-xl font-semibold text-lg shadow-lg border-2 border-slate-500/40 cursor-pointer select-none transition-all duration-200 hover:shadow-xl hover:border-slate-400/50"
    style={{ background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)', color: '#f1f5f9' }}
    data-testid="root-node"
    title="Double-click to collapse/expand all topics"
  >
    <Handle type="source" position={Position.Bottom} className="!bg-slate-400 !w-2 !h-2" />
    {data.label as string}
    <div className="text-[10px] font-normal opacity-50 mt-0.5">double-click: collapse/expand all</div>
  </div>
));
RootNode.displayName = 'RootNode';

export const TopicNode = memo(({ data }: { data: Record<string, unknown> }) => {
  const color = (data.color as string) || '#6366f1';
  const collapsed = data.collapsed as boolean;
  return (
    <div
      className="px-4 py-2.5 rounded-lg font-medium text-sm shadow-md cursor-pointer select-none border transition-all duration-200 hover:shadow-lg hover:ring-1 hover:ring-white/10"
      style={{
        background: `${color}18`,
        borderColor: `${color}60`,
        color: color,
      }}
      data-testid="topic-node"
    >
      <Handle type="target" position={Position.Top} className="!bg-slate-500 !w-2 !h-2" />
      <Handle type="source" position={Position.Bottom} className="!bg-slate-500 !w-2 !h-2" />
      <div className="flex items-center gap-2">
        <div
          className="w-0 h-0 flex-shrink-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent transition-transform duration-200"
          style={{
            borderTop: collapsed ? 'none' : `6px solid ${color}`,
            borderBottom: collapsed ? `6px solid ${color}` : 'none',
            transform: collapsed ? 'rotate(-90deg)' : 'rotate(0deg)',
          }}
          title={collapsed ? 'Double-click to expand' : 'Double-click to collapse'}
        />
        <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
        {data.label as string}
      </div>
      {data.count !== undefined && (
        <div className="text-xs mt-1 opacity-70">
          {collapsed
            ? `${String(data.count)} papers (collapsed)`
            : `${String(data.count)} papers`}
        </div>
      )}
    </div>
  );
});
TopicNode.displayName = 'TopicNode';

export const PaperNode = memo(({ data }: { data: Record<string, unknown> }) => {
  const color = (data.color as string) || '#94a3b8';
  const dimmed = data.dimmed as boolean;
  return (
    <div
      className="px-3 py-2 rounded-md text-xs shadow-sm cursor-pointer select-none border transition-all duration-200 hover:shadow-md hover:ring-1 hover:ring-white/10"
      style={{
        background: dimmed ? '#1e293b40' : '#1e293b',
        borderColor: dimmed ? '#33415540' : `${color}40`,
        color: dimmed ? '#64748b' : '#cbd5e1',
        opacity: dimmed ? 0.3 : 1,
        maxWidth: 200,
      }}
      data-testid="paper-node"
    >
      <Handle type="target" position={Position.Top} className="!bg-transparent !w-0 !h-0 !min-w-0 !min-h-0 !border-0" />
      <Handle type="source" position={Position.Bottom} className="!bg-transparent !w-0 !h-0 !min-w-0 !min-h-0 !border-0" />
      <div>
        <div className="leading-tight line-clamp-2">{data.label as string}</div>
        {data.year != null ? (
          <div className="mt-0.5 opacity-60 text-[10px]">{String(data.year)}</div>
        ) : null}
      </div>
    </div>
  );
});
PaperNode.displayName = 'PaperNode';
