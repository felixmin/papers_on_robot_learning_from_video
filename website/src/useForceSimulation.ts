import { useRef, useEffect, useCallback } from 'react';
import { type Node } from '@xyflow/react';

/**
 * Directed edge for Y-ordering constraint.
 * The simulation enforces target.y > source.y by at least minGap.
 */
export interface DirectedEdge {
  source: string;
  target: string;
  minGap: number;
}

/**
 * Target position with per-node pull strength.
 * Optional separate X/Y strengths (e.g., timeline: strong X, weak Y).
 */
export interface Target {
  x: number;
  y: number;
  strength: number;
  strengthX?: number; // overrides strength for X axis
  strengthY?: number; // overrides strength for Y axis
}

/**
 * Live force simulation for the knowledge graph.
 *
 * Forces (strongest to weakest):
 *  1. Repulsion      — all node pairs push apart (collision avoidance)
 *  2. Y-ordering     — directed edges enforce ancestor above descendant
 *  3. Containment    — children pulled horizontally toward parent
 *  4. Influence attr. — influence-connected papers attracted horizontally
 *  5. Target pull    — weak pull toward view-mode-computed ideal positions
 *
 * Pinned nodes (after drag) stay put but still exert forces on others.
 */
export function useForceSimulation({
  directedEdges,
  influenceEdges,
  parentMap,
  setNodes,
}: {
  directedEdges: DirectedEdge[];
  influenceEdges: { source: string; target: string; weight: number }[];
  parentMap: Map<string, string>;
  setNodes: (updater: (nodes: Node[]) => Node[]) => void;
}) {
  const velsRef = useRef(new Map<string, { vx: number; vy: number }>());
  const alphaRef = useRef(1);
  const draggedRef = useRef<string | null>(null);
  const pinnedRef = useRef(new Set<string>());
  const targetsRef = useRef(new Map<string, Target>());

  // Keep latest edge data in refs
  const dirEdgesRef = useRef(directedEdges);
  dirEdgesRef.current = directedEdges;
  const parentRef = useRef(parentMap);
  parentRef.current = parentMap;

  // Pre-compute influence neighbor map
  const infNbrsRef = useRef(new Map<string, { other: string; weight: number }[]>());
  useEffect(() => {
    const map = new Map<string, { other: string; weight: number }[]>();
    for (const e of influenceEdges) {
      if (!map.has(e.source)) map.set(e.source, []);
      if (!map.has(e.target)) map.set(e.target, []);
      map.get(e.source)!.push({ other: e.target, weight: e.weight });
      map.get(e.target)!.push({ other: e.source, weight: e.weight });
    }
    infNbrsRef.current = map;
  }, [influenceEdges]);

  // Reheat on topology change
  useEffect(() => {
    alphaRef.current = 1;
    velsRef.current.clear();
  }, [directedEdges, influenceEdges]);

  // ---- Animation loop ----
  useEffect(() => {
    let active = true;
    let frameId: number;

    const tick = () => {
      if (!active) return;
      const alpha = alphaRef.current;
      if (alpha < 0.0005) {
        frameId = requestAnimationFrame(tick);
        return;
      }

      const vels = velsRef.current;
      const pinned = pinnedRef.current;
      const dragId = draggedRef.current;
      const targets = targetsRef.current;
      const dirEdges = dirEdgesRef.current;
      const pMap = parentRef.current;
      const infNbrs = infNbrsRef.current;

      setNodes((nodes) => {
        if (nodes.length === 0) return nodes;

        const nodeMap = new Map(nodes.map((n) => [n.id, n]));
        const canMove = (id: string) => id !== dragId && !pinned.has(id);

        // Accumulate forces per node
        const fx = new Map<string, number>();
        const fy = new Map<string, number>();
        for (const n of nodes) { fx.set(n.id, 0); fy.set(n.id, 0); }

        // --- Force 1: Target pull (supports separate X/Y strengths) ---
        for (const node of nodes) {
          if (!canMove(node.id)) continue;
          const t = targets.get(node.id);
          if (!t) continue;
          const sx = (t.strengthX ?? t.strength) * alpha;
          const sy = (t.strengthY ?? t.strength) * alpha;
          fx.set(node.id, fx.get(node.id)! + (t.x - node.position.x) * sx);
          fy.set(node.id, fy.get(node.id)! + (t.y - node.position.y) * sy);
        }

        // --- Force 2: Y-ordering for all directed edges ---
        for (const edge of dirEdges) {
          const sn = nodeMap.get(edge.source);
          const tn = nodeMap.get(edge.target);
          if (!sn || !tn) continue;
          const gap = tn.position.y - sn.position.y;
          if (gap < edge.minGap) {
            const corr = (edge.minGap - gap) * 0.12 * alpha;
            if (canMove(edge.source)) fy.set(edge.source, fy.get(edge.source)! - corr);
            if (canMove(edge.target)) fy.set(edge.target, fy.get(edge.target)! + corr);
          }
        }

        // --- Force 3: Repulsion (all pairs) ---
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const a = nodes[i];
            const b = nodes[j];
            const dx = a.position.x - b.position.x;
            const dy = a.position.y - b.position.y;
            const distSq = dx * dx + dy * dy;

            const aIsGroup = a.type !== 'paperNode';
            const bIsGroup = b.type !== 'paperNode';
            const sameParent = pMap.get(a.id) === pMap.get(b.id);

            let minDist: number;
            if (aIsGroup && bIsGroup) minDist = 150;
            else if (aIsGroup || bIsGroup) minDist = 100;
            else if (sameParent) minDist = 85;
            else minDist = 60;

            const range = minDist * minDist * 18;
            if (distSq >= range) continue;

            const dist = Math.sqrt(distSq) || 1;
            const strength = (aIsGroup || bIsGroup) ? 10 : sameParent ? 7 : 3;
            const force = (minDist * minDist * strength * alpha) / (distSq + 20);
            const forceX = (dx / dist) * force;
            const forceY = (dy / dist) * force;

            if (canMove(a.id)) {
              fx.set(a.id, fx.get(a.id)! + forceX);
              fy.set(a.id, fy.get(a.id)! + forceY);
            }
            if (canMove(b.id)) {
              fx.set(b.id, fx.get(b.id)! - forceX);
              fy.set(b.id, fy.get(b.id)! - forceY);
            }
          }
        }

        // --- Force 4: Containment horizontal pull (children → parent X) ---
        for (const node of nodes) {
          if (!canMove(node.id)) continue;
          const parentId = pMap.get(node.id);
          if (!parentId) continue;
          const parent = nodeMap.get(parentId);
          if (!parent) continue;
          fx.set(
            node.id,
            fx.get(node.id)! + (parent.position.x - node.position.x) * 0.01 * alpha
          );
        }

        // --- Force 5: Influence horizontal attraction ---
        for (const node of nodes) {
          if (node.type !== 'paperNode' || !canMove(node.id)) continue;
          const nbrs = infNbrs.get(node.id);
          if (!nbrs) continue;
          for (const { other, weight } of nbrs) {
            const on = nodeMap.get(other);
            if (!on) continue;
            const dx = on.position.x - node.position.x;
            fx.set(node.id, fx.get(node.id)! + dx * weight * 0.006 * alpha);
          }
        }

        // --- Apply forces → velocities → positions ---
        const newPos = new Map<string, { x: number; y: number }>();
        for (const node of nodes) {
          if (!canMove(node.id)) continue;
          let vel = vels.get(node.id);
          if (!vel) { vel = { vx: 0, vy: 0 }; vels.set(node.id, vel); }

          vel.vx = (vel.vx + fx.get(node.id)!) * 0.5;
          vel.vy = (vel.vy + fy.get(node.id)!) * 0.5;

          // Cap velocity
          const speed = Math.sqrt(vel.vx * vel.vx + vel.vy * vel.vy);
          if (speed > 15) {
            vel.vx = (vel.vx / speed) * 15;
            vel.vy = (vel.vy / speed) * 15;
          }

          newPos.set(node.id, {
            x: node.position.x + vel.vx,
            y: node.position.y + vel.vy,
          });
        }

        if (newPos.size === 0) return nodes;

        return nodes.map((node) => {
          const np = newPos.get(node.id);
          return np ? Object.assign({}, node, { position: np }) : node;
        });
      });

      alphaRef.current *= 0.997;
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => { active = false; cancelAnimationFrame(frameId); };
  }, [setNodes]);

  const setTargets = useCallback((t: Map<string, Target>) => {
    targetsRef.current = t;
  }, []);

  const reheat = useCallback((alpha = 1) => {
    alphaRef.current = Math.max(alphaRef.current, alpha);
    pinnedRef.current.clear();
    velsRef.current.clear();
  }, []);

  const onSimDragStart = useCallback((_: React.MouseEvent, node: Node) => {
    draggedRef.current = node.id;
    alphaRef.current = Math.max(alphaRef.current, 0.8);
  }, []);

  const onSimDrag = useCallback(() => {
    alphaRef.current = Math.max(alphaRef.current, 0.5);
  }, []);

  const onSimDragStop = useCallback(() => {
    // Don't pin — let the node float freely in its new area.
    // The weak target pull + repulsion will keep it roughly in place.
    draggedRef.current = null;
  }, []);

  return { setTargets, reheat, onSimDragStart, onSimDrag, onSimDragStop };
}
