import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import { Bloom, EffectComposer, Noise, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useMemo, useRef } from 'react';

function NeuralCloud() {
  const points = useRef();
  const lines = useRef();
  const { positions, linePositions } = useMemo(() => {
    const count = 72;
    const pts = [];
    for (let i = 0; i < count; i += 1) {
      const r = 1.8 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pts.push(new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi) * 0.72,
        r * Math.sin(phi) * Math.sin(theta),
      ));
    }
    const segments = [];
    for (let i = 0; i < pts.length; i += 1) {
      let nearest = null;
      let distance = 99;
      for (let j = i + 1; j < pts.length; j += 1) {
        const d = pts[i].distanceTo(pts[j]);
        if (d < distance) {
          distance = d;
          nearest = pts[j];
        }
      }
      if (nearest && distance < 1.35) segments.push(...pts[i].toArray(), ...nearest.toArray());
    }
    return {
      positions: new Float32Array(pts.flatMap((p) => p.toArray())),
      linePositions: new Float32Array(segments),
    };
  }, []);

  useFrame((state, delta) => {
    if (points.current) {
      points.current.rotation.y += delta * 0.035;
      points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.11) * 0.18;
    }
    if (lines.current) lines.current.rotation.copy(points.current.rotation);
  });

  return (
    <group>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.032} color="#caff3d" transparent opacity={0.85} sizeAttenuation />
      </points>
      <lineSegments ref={lines}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#37ffe4" transparent opacity={0.13} />
      </lineSegments>
    </group>
  );
}

function OrbitRing({ rotation, scale = 1, color = '#37ffe4', speed = 0.12 }) {
  const ring = useRef();
  useFrame((_, delta) => {
    if (ring.current) ring.current.rotation.z += delta * speed;
  });
  return (
    <mesh ref={ring} rotation={rotation} scale={scale}>
      <torusGeometry args={[1.48, 0.008, 8, 160]} />
      <meshBasicMaterial color={color} transparent opacity={0.46} toneMapped={false} />
    </mesh>
  );
}

function CoreAssembly() {
  const group = useRef();
  const inner = useRef();
  const { size } = useThree();

  useFrame((state, delta) => {
    const mobile = size.width < 860;
    const scroll = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 6);
    const targetX = mobile ? 0 : 2.7;
    const targetY = mobile ? 1.75 - scroll * 0.15 : 0.15 - scroll * 0.22;
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, targetX, delta * 2.5);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetY, delta * 2.5);
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      state.pointer.x * 0.22 + scroll * 0.28,
      delta * 1.8,
    );
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -state.pointer.y * 0.12, delta * 1.8);
    if (inner.current) {
      inner.current.rotation.x += delta * 0.08;
      inner.current.rotation.y -= delta * 0.13;
    }
  });

  return (
    <group ref={group} scale={size.width < 860 ? 0.57 : 0.83}>
      <Float speed={1.6} rotationIntensity={0.15} floatIntensity={0.25}>
        <group>
          <mesh>
            <icosahedronGeometry args={[1.08, 5]} />
            <meshPhysicalMaterial
              color="#071013"
              emissive="#0a302e"
              emissiveIntensity={0.5}
              metalness={0.72}
              roughness={0.18}
              clearcoat={1}
              clearcoatRoughness={0.12}
            />
          </mesh>
          <mesh ref={inner} scale={1.025}>
            <icosahedronGeometry args={[1.08, 2]} />
            <meshBasicMaterial color="#41ffe8" wireframe transparent opacity={0.26} toneMapped={false} />
          </mesh>
          <mesh scale={0.72}>
            <icosahedronGeometry args={[1, 1]} />
            <meshBasicMaterial color="#caff3d" wireframe transparent opacity={0.28} toneMapped={false} />
          </mesh>
          <mesh scale={0.22}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshBasicMaterial color="#efffc0" toneMapped={false} />
          </mesh>
          <pointLight color="#37ffe4" intensity={8} distance={7} />
        </group>
        <OrbitRing rotation={[1.05, 0.2, 0]} />
        <OrbitRing rotation={[0.2, 1.3, 0.4]} scale={1.12} color="#caff3d" speed={-0.09} />
        <OrbitRing rotation={[1.8, 0.1, 0.8]} scale={1.32} color="#ff4ea7" speed={0.05} />
        <NeuralCloud />
      </Float>
    </group>
  );
}

function GroundGrid() {
  const grid = useRef();
  useFrame((state) => {
    if (grid.current) grid.current.position.z = (state.clock.elapsedTime * 0.08) % 1;
  });
  return (
    <gridHelper
      ref={grid}
      args={[34, 34, '#215b57', '#122523']}
      position={[0, -3.6, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

export default function CyberScene({ enabled = true }) {
  if (!enabled) return null;
  return (
    <div className="scene-wrap" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.1, 8.2], fov: 43 }}
        dpr={[1, 1.55]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <fog attach="fog" args={['#06080b', 8, 18]} />
        <ambientLight intensity={0.34} />
        <directionalLight position={[3, 5, 4]} color="#bdfcff" intensity={2.4} />
        <directionalLight position={[-4, -2, 2]} color="#ff318d" intensity={1.15} />
        <CoreAssembly />
        <GroundGrid />
        <Sparkles count={90} scale={[15, 8, 9]} size={1.05} speed={0.14} color="#8fffee" opacity={0.38} />
        <EffectComposer multisampling={0}>
          <Bloom intensity={0.72} luminanceThreshold={0.28} luminanceSmoothing={0.7} mipmapBlur />
          <Noise opacity={0.025} />
          <Vignette eskil={false} offset={0.2} darkness={0.56} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
