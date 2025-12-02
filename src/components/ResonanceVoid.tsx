import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, useAnimation } from 'framer-motion';
import * as THREE from 'three';
import { AgentsField } from './AgentsField';
import { ThreadRibbon } from './ThreadRibbon';
import { Ghost } from 'lucide-react';  // For ghost icon

// Types from memory service
type Emotion = 'NEUTRAL' | 'CURIOSITY' | 'SURPRISE' | 'CONTENTMENT' | 'EMPATHY' | 'ANALYTICAL';
interface Metrics { density: number; tValue: number; emotionalLandscape: Record<Emotion, number>; dissonanceScore: number; totalMemories: number; }
interface Memory { id: string; content: string; emotion: Emotion; type: string; weight: number; timestamp: number; }

export function ResonanceVoid() {
  const [dark, setDark] = useState(true);
  const [paused, setPaused] = useState(false);
  const [metrics, setMetrics] = useState<Metrics>({ density: 0.5, tValue: 0.5, emotionalLandscape: {}, dissonanceScore: 0, totalMemories: 0 });
  const [memories, setMemories] = useState<Memory[]>([]);  // Fetch via WS
  const [ghostVisible, setGhostVisible] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    window.haunt?.getTheme().then(setDark);
    window.haunt?.onToggle(() => controls.start('peek'));
    window.haunt?.onPause(() => setPaused(p => !p));

    // WS to memory service
    const ws = new WebSocket('ws://localhost:3001');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'metrics') setMetrics(data.payload);
      if (data.type === 'memories') setMemories(data.payload);
    };

    // Ghost interval
    const interval = setInterval(() => {
      if (!paused && (Math.random() > 0.7 || metrics.dissonanceScore > 0.5)) {
        setGhostVisible(true);
        setTimeout(() => setGhostVisible(false), 3000 + Math.random() * 5000);
      }
    }, 10000);

    return () => {
      ws.close();
      clearInterval(interval);
    };
  }, [paused, metrics]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(async () => {
      const heat = await window.haunt?.sampleScreen();
      if (heat) {
        const target = pickEdgeFromHeatmap(heat);
        controls.start({
          x: target.x,
          y: target.y,
          opacity: [0, 0.15, 0],
          transition: { duration: 4, ease: 'easeInOut' },
        });
      }
    }, 8000);
    return () => clearInterval(t);
  }, [paused, controls]);

  return (
    <div style={{ width: '100vw', height: '100vh', pointerEvents: 'none', background: 'black' }}>
      <Canvas>
        {/* Starfield, Core, Agents, Threads */}
        <AgentsField count={1500} center={[0, 0, 0]} />
        {memories.slice(0, 20).map((mem, i) => (
          <ThreadRibbon
            key={i}
            points={[[Math.random() - 0.5, -5, 0], [Math.random() - 0.5, 5, 0]]}  // Dynamic curve
            colorCore={[1, 1, 0.5]}
            pulse={mem.weight}
          />
        ))}
        {/* Add core sphere, dissonance particles */}
      </Canvas>

      {/* Adaptive Ghost */}
      <motion.div
        animate={controls}
        initial={{ opacity: 0, x: -50, y: 0 }}
        style={{
          position: 'fixed',
          width: 50, height: 50,
          filter: `blur(10px) ${dark ? 'brightness(1.1)' : 'brightness(0.9)'}`,
          background: dark
            ? 'radial-gradient(circle, rgba(255,255,255,0.1), transparent)'
            : 'radial-gradient(circle, rgba(0,0,0,0.2), transparent)',
          borderRadius: '50%',
          opacity: ghostVisible ? 0.15 : 0,
        }}
        transition={{ duration: 20 + Math.random() * 10, repeat: Infinity, repeatType: 'reverse' }}
      >
        <Ghost size={30} color={dark ? "white" : "black"} style={{ position: 'absolute', top: 10, left: 10, opacity: 0.5 }} />
      </motion.div>
    </div>
  );
}

function pickEdgeFromHeatmap({ grid }: { grid: number[][] }) {
  let minBright = Infinity, best = { x: 0, y: 0 };
  // Edge sampling logic from earlier
  for (let i = 0; i < grid.length; i++) {
    for (let side of [0, grid[i].length - 1]) {
      const b = grid[i][side];
      if (b < minBright) {
        minBright = b;
        best = { x: (side / (grid[i].length - 1)) * window.innerWidth, y: (i / (grid.length - 1)) * window.innerHeight };
      }
    }
  }
  // Similar for top/bottom
  return best;
}
