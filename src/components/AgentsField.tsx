import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import vertexShader from '../shaders/agents.vert';
import fragmentShader from '../shaders/agents.frag';

export function AgentsField({ count = 1500, center = [0, 0, 0] as [number, number, number] }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const materialRef = useRef<THREE.ShaderMaterial>(null!);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uCenter: { value: new THREE.Vector3(...center) },
  }), [center]);

  const material = useMemo(() => new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms,
  }), [uniforms]);

  useFrame((_, delta) => {
    material.uniforms.uTime.value += delta;
    meshRef.current?.instanceMatrix.needsUpdate = true;
  });

  // Instance attrs (phase, radius, res, colorBias) as in draft
  return (
    <instancedMesh ref={meshRef} args={[new THREE.SphereGeometry(0.02), material, count]} />
  );
                           }
