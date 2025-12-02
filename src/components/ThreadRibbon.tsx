import { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';
import vertexShader from '../shaders/memoryThread.vert';
import fragmentShader from '../shaders/memoryThread.frag';

extend({ ShaderMaterial: THREE.ShaderMaterial });

type ThreadProps = {
  points: Array<[number, number, number]>;
  colorCore?: [number, number, number];
  colorEdge?: [number, number, number];
  baseWidth?: number;
  flow?: number;
  noiseAmp?: number;
  noiseFreq?: number;
  pulse?: number;
};

export function ThreadRibbon({
  points,
  colorCore = [0.8, 0.95, 1.0],
  colorEdge = [0.2, 0.5, 0.9],
  baseWidth = 0.006,
  flow = 0.12,
  noiseAmp = 0.004,
  noiseFreq = 0.9,
  pulse = 0.7,
}: ThreadProps) {
  const materialRef = useMemo(() => new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uBaseWidth: { value: baseWidth },
      uFlow: { value: flow },
      uNoiseAmp: { value: noiseAmp },
      uNoiseFreq: { value: noiseFreq },
      uPulse: { value: pulse },
      uColorCore: { value: new THREE.Color(...colorCore) },
      uColorEdge: { value: new THREE.Color(...colorEdge) },
    },
  }), [points, baseWidth, flow, noiseAmp, noiseFreq, pulse, colorCore, colorEdge]);

  useFrame((_, delta) => {
    materialRef.uniforms.uTime.value += delta;
  });

  // Geometry build (simplified points; production: triangle strip)
  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const positions = new Float32Array(points.flat() as number[]);
    g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    // Add tangent, uOffset, uWidth attrs as in draft
    return g;
  }, [points]);

  return <primitive object={geom} attach="geometry" material={materialRef} />;
  }
