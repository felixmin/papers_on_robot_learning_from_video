import { ViewportPortal } from '@xyflow/react';

interface TimelineOverlayProps {
  years: number[];
  minYear: number;
  yearStep: number;
}

export default function TimelineOverlay({ years, minYear, yearStep }: TimelineOverlayProps) {
  if (years.length === 0) return null;

  const maxYear = years[years.length - 1];
  const axisWidth = (maxYear - minYear) * yearStep;

  return (
    <ViewportPortal>
      <div style={{ pointerEvents: 'none' }}>
        {/* Horizontal axis line */}
        <div
          style={{
            position: 'absolute',
            left: -20,
            top: -55,
            width: axisWidth + 40,
            height: 1,
            background: 'rgba(148, 163, 184, 0.12)',
          }}
        />

        {/* Year columns */}
        {years.map((year) => {
          const x = (year - minYear) * yearStep;
          return (
            <div key={year}>
              {/* Year label */}
              <div
                style={{
                  position: 'absolute',
                  left: x,
                  top: -85,
                  transform: 'translateX(-50%)',
                  color: '#94a3b8',
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: 'ui-monospace, monospace',
                  userSelect: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                {year}
              </div>
              {/* Small tick mark */}
              <div
                style={{
                  position: 'absolute',
                  left: x,
                  top: -60,
                  width: 1,
                  height: 10,
                  background: 'rgba(148, 163, 184, 0.25)',
                }}
              />
              {/* Vertical gridline */}
              <div
                style={{
                  position: 'absolute',
                  left: x,
                  top: -50,
                  width: 1,
                  height: 5000,
                  background: 'rgba(148, 163, 184, 0.06)',
                }}
              />
            </div>
          );
        })}
      </div>
    </ViewportPortal>
  );
}
