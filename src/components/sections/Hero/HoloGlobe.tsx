"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ═══════════════════════════════════════════════
   CORE GLOBE — solid with emissive depth shading
═══════════════════════════════════════════════ */
function CoreGlobe() {
  const mesh = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    const s = 1 + Math.sin(clock.elapsedTime * 0.9) * 0.015;
    mesh.current.scale.setScalar(s);
  });
  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[2.0, 128, 128]} />
      <meshStandardMaterial
        color="#030A1A"
        emissive="#0628A0"
        emissiveIntensity={0.45}
        roughness={0.15}
        metalness={0.9}
        transparent
        opacity={0.97}
      />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════
   ATMOSPHERE — soft outer glow halo
═══════════════════════════════════════════════ */
function Atmosphere() {
  return (
    <>
      {/* outer halo */}
      <mesh>
        <sphereGeometry args={[2.32, 64, 64]} />
        <meshBasicMaterial
          color="#1060FF"
          transparent
          opacity={0.055}
          side={THREE.BackSide}
        />
      </mesh>
      {/* inner rim glow */}
      <mesh>
        <sphereGeometry args={[2.08, 64, 64]} />
        <meshBasicMaterial
          color="#00AAFF"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </mesh>
    </>
  );
}

/* ═══════════════════════════════════════════════
   WIREFRAME GRID — lat/lon lines
═══════════════════════════════════════════════ */
function GlobeGrid() {
  const ref = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.elapsedTime * 0.15;
  });

  const lineObjects = useMemo(() => {
    const items: THREE.Line[] = [];
    const R = 2.02;
    const mat = new THREE.LineBasicMaterial({ color: "#1E6AFF", transparent: true, opacity: 0.22 });

    // latitude rings
    for (let lat = -75; lat <= 75; lat += 25) {
      const phi = (lat * Math.PI) / 180;
      const r   = R * Math.cos(phi);
      const y   = R * Math.sin(phi);
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 128; i++) {
        const t = (i / 128) * Math.PI * 2;
        pts.push(new THREE.Vector3(r * Math.cos(t), y, r * Math.sin(t)));
      }
      items.push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat));
    }

    // longitude arcs
    for (let lon = 0; lon < 360; lon += 30) {
      const theta = (lon * Math.PI) / 180;
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 128; i++) {
        const phi = (i / 128) * Math.PI - Math.PI / 2;
        pts.push(new THREE.Vector3(
          R * Math.cos(phi) * Math.cos(theta),
          R * Math.sin(phi),
          R * Math.cos(phi) * Math.sin(theta),
        ));
      }
      items.push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat));
    }

    return items;
  }, []);

  return (
    <group ref={ref}>
      {lineObjects.map((obj, i) => (
        <primitive key={i} object={obj} />
      ))}
    </group>
  );
}

/* ═══════════════════════════════════════════════
   NODE DOTS — cities/data points on surface
═══════════════════════════════════════════════ */
function NodeDots() {
  const ref  = useRef<THREE.Points>(null!);

  const { geo } = useMemo(() => {
    const count = 320;
    const pos   = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const phi   = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 2.03;
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return { geo: g };
  }, []);

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.elapsedTime * 0.15;
    const mat = ref.current.material as THREE.PointsMaterial;
    mat.opacity = 0.6 + Math.sin(clock.elapsedTime * 1.8) * 0.3;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        size={0.04}
        color="#00D4FF"
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ═══════════════════════════════════════════════
   ARC CONNECTIONS — animated data arcs
═══════════════════════════════════════════════ */
function DataArc({ start, end, color, speed, offset }: {
  start: THREE.Vector3; end: THREE.Vector3;
  color: string; speed: number; offset: number;
}) {
  const lineObj = useMemo(() => {
    const mid = start.clone().add(end).multiplyScalar(0.5);
    mid.normalize().multiplyScalar(3.0);
    const pts: THREE.Vector3[] = [];
    const n = 60;
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      const p = new THREE.Vector3()
        .addScaledVector(start, (1 - t) * (1 - t))
        .addScaledVector(mid,   2 * t * (1 - t))
        .addScaledVector(end,   t * t);
      pts.push(p);
    }
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.7 });
    return new THREE.Line(geo, mat);
  }, [start, end, color]);

  const totalPts = 61;

  useFrame(({ clock }) => {
    const t   = ((clock.elapsedTime * speed + offset) % 1);
    const vis = Math.max(2, Math.floor(t * totalPts));
    const all = lineObj.geometry.attributes.position?.array as Float32Array | undefined;
    if (!all) return;
    const drawn = new Float32Array(vis * 3);
    drawn.set(all.subarray(0, vis * 3));
    lineObj.geometry.setAttribute("position", new THREE.BufferAttribute(drawn, 3));
  });

  return <primitive object={lineObj} />;
}

function DataArcs() {
  const arcs = useMemo(() => {
    const R = 2.03;
    const randomPt = () => {
      const phi   = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      return new THREE.Vector3(
        R * Math.sin(phi) * Math.cos(theta),
        R * Math.sin(phi) * Math.sin(theta),
        R * Math.cos(phi),
      );
    };
    return Array.from({ length: 8 }, (_, i) => ({
      start:  randomPt(),
      end:    randomPt(),
      color:  i % 3 === 0 ? "#00FFFF" : i % 3 === 1 ? "#4466FF" : "#AA88FF",
      speed:  0.18 + Math.random() * 0.18,
      offset: Math.random(),
    }));
  }, []);

  return (
    <>
      {arcs.map((a, i) => <DataArc key={i} {...a} />)}
    </>
  );
}

/* ═══════════════════════════════════════════════
   ORBITAL RINGS — 3 rings at different tilts
═══════════════════════════════════════════════ */
function OrbitalRing({ r, tX, tZ, spd, col, op }: {
  r: number; tX: number; tZ: number;
  spd: number; col: string; op: number;
}) {
  const grp = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => { grp.current.rotation.z = clock.elapsedTime * spd; });
  return (
    <group ref={grp} rotation={[tX, 0, tZ]}>
      <mesh>
        <torusGeometry args={[r, 0.009, 16, 200]} />
        <meshBasicMaterial color={col} transparent opacity={op} />
      </mesh>
      {/* bright travelling dot */}
      <mesh position={[r, 0, 0]}>
        <sphereGeometry args={[0.065, 8, 8]} />
        <meshBasicMaterial color={col} />
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════
   HOLOGRAPHIC PLATFORM BASE
═══════════════════════════════════════════════ */
function Platform() {
  const r1 = useRef<THREE.Mesh>(null!);
  const r2 = useRef<THREE.Mesh>(null!);
  const glow = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    r1.current.rotation.z =  clock.elapsedTime * 0.55;
    r2.current.rotation.z = -clock.elapsedTime * 0.35;
    const g = glow.current.material as THREE.MeshBasicMaterial;
    g.opacity = 0.08 + Math.sin(clock.elapsedTime * 1.2) * 0.04;
  });

  return (
    <group position={[0, -2.55, 0]}>
      {/* Solid pedestal */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2.5, 2.7, 0.14, 80]} />
        <meshStandardMaterial
          color="#040C20"
          emissive="#0824A0"
          emissiveIntensity={0.6}
          metalness={0.95}
          roughness={0.1}
        />
      </mesh>
      {/* Glow disc */}
      <mesh ref={glow} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.08, 0]}>
        <circleGeometry args={[2.0, 80]} />
        <meshBasicMaterial color="#0066FF" transparent opacity={0.1} />
      </mesh>
      {/* Spin ring 1 */}
      <mesh ref={r1} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.09, 0]}>
        <ringGeometry args={[1.75, 1.95, 100]} />
        <meshBasicMaterial color="#00BBFF" transparent opacity={0.65} side={THREE.DoubleSide} />
      </mesh>
      {/* Spin ring 2 */}
      <mesh ref={r2} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
        <ringGeometry args={[2.1, 2.22, 100]} />
        <meshBasicMaterial color="#8855FF" transparent opacity={0.45} side={THREE.DoubleSide} />
      </mesh>
      {/* Outer edge ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.07, 0]}>
        <ringGeometry args={[2.42, 2.52, 100]} />
        <meshBasicMaterial color="#0044CC" transparent opacity={0.25} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════
   FLOATING SCAN LINE — hologram effect
═══════════════════════════════════════════════ */
function ScanLine() {
  const mesh = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    const t = (clock.elapsedTime * 0.5) % 1;
    mesh.current.position.y = -2.0 + t * 4.5;
    const mat = mesh.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.08 * (1 - Math.abs(t - 0.5) * 2);
  });
  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[5, 0.04]} />
      <meshBasicMaterial color="#00CCFF" transparent opacity={0.1} side={THREE.DoubleSide} />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════
   AMBIENT SPARKLES
═══════════════════════════════════════════════ */
function Sparkles() {
  const pts = useRef<THREE.Points>(null!);
  const geo = useMemo(() => {
    const n   = 160;
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);

  useFrame(({ clock }) => {
    pts.current.rotation.y = clock.elapsedTime * 0.025;
  });

  return (
    <points ref={pts} geometry={geo}>
      <pointsMaterial size={0.035} color="#3366FF" transparent opacity={0.55} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/* ═══════════════════════════════════════════════
   FULL SCENE
═══════════════════════════════════════════════ */
function Scene() {
  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.15} />
      <pointLight position={[4,  3, 4]}  color="#1E90FF" intensity={4}   decay={2} />
      <pointLight position={[-3, 2, 3]}  color="#00CFFF" intensity={2.5} decay={2} />
      <pointLight position={[0, -3, 2]}  color="#6633FF" intensity={2}   decay={2} />
      <pointLight position={[0,  4, -2]} color="#0055FF" intensity={1.5} decay={2} />

      <CoreGlobe />
      <Atmosphere />
      <GlobeGrid />
      <NodeDots />
      <DataArcs />

      <OrbitalRing r={2.85} tX={Math.PI / 2}    tZ={0}             spd={0.45}  col="#00DDFF" op={0.75} />
      <OrbitalRing r={3.25} tX={Math.PI / 5.5}  tZ={Math.PI / 4}  spd={-0.3}  col="#9966FF" op={0.55} />
      <OrbitalRing r={3.65} tX={Math.PI / 3.5}  tZ={-Math.PI / 6} spd={0.2}   col="#3366FF" op={0.35} />

      <Platform />
      <ScanLine />
      <Sparkles />
    </>
  );
}

/* ═══════════════════════════════════════════════
   EXPORTED COMPONENT
═══════════════════════════════════════════════ */
export default function HoloGlobe() {
  return (
    <div
      className="relative w-[320px] h-[400px] sm:w-[420px] sm:h-[490px]"
      aria-hidden="true"
    >
      {/* CSS ambient halo behind canvas */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 60% at 50% 44%, rgba(20,100,255,0.18) 0%, rgba(0,180,255,0.08) 40%, transparent 70%)",
          filter: "blur(8px)",
        }}
      />

      <Canvas
        camera={{ position: [0, 0.5, 7.8], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
        style={{ background: "transparent", position: "relative", zIndex: 1 }}
      >
        <Scene />
      </Canvas>

      {/* "AL" holographic text — positioned over globe centre */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ paddingBottom: "13%" }}
      >
        <span
          style={{
            fontSize: "clamp(2.4rem, 8vw, 3.8rem)",
            fontWeight: 900,
            fontFamily: "var(--font-inter), sans-serif",
            letterSpacing: "-0.02em",
            background:
              "linear-gradient(140deg, #60A5FA 0%, #00DDFF 45%, #ffffff 80%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter:
              "drop-shadow(0 0 14px rgba(0,200,255,0.8)) drop-shadow(0 0 40px rgba(30,100,255,0.5))",
          }}
        >
          AL
        </span>
      </div>
    </div>
  );
}
