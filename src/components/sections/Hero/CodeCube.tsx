"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ════════════════════════════════════════════════
   BUILD CANVAS TEXTURES  (called once client-side)
════════════════════════════════════════════════ */

/** Title bar with macOS dots + file tab */
function makeTitleBar(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 1024; c.height = 80;
  const g = c.getContext("2d")!;

  // bar background
  g.fillStyle = "#0D1117";
  g.fillRect(0, 0, 1024, 80);

  // bottom separator
  g.fillStyle = "rgba(99,102,241,0.25)";
  g.fillRect(0, 78, 1024, 2);

  // traffic-light dots
  [["#FF5F57", 36], ["#FEBC2E", 72], ["#28C840", 108]].forEach(([col, x]) => {
    g.beginPath();
    g.arc(x as number, 38, 13, 0, Math.PI * 2);
    g.fillStyle = col as string;
    g.fill();
  });

  // active tab pill
  const tabW = 220, tabH = 48, tabX = 148, tabY = 16;
  g.fillStyle = "#161B27";
  g.beginPath();
  g.roundRect(tabX, tabY, tabW, tabH, 8);
  g.fill();

  // tab label
  g.font = "600 22px 'SF Mono', Menlo, monospace";
  g.fillStyle = "#94A3B8";
  g.textBaseline = "middle";
  g.fillText("ai_engineer.py", tabX + 16, tabY + tabH / 2);

  // inactive tabs
  g.font = "500 20px 'SF Mono', Menlo, monospace";
  g.fillStyle = "rgba(100,116,139,0.5)";
  g.fillText("models.ts", tabX + tabW + 24, tabY + tabH / 2);
  g.fillText("agents.py", tabX + tabW + 160, tabY + tabH / 2);

  return new THREE.CanvasTexture(c);
}

/** Syntax-highlighted Python code body */
function makeCodeBody(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 1024; c.height = 768;
  const g = c.getContext("2d")!;

  // background
  g.fillStyle = "#0D1117";
  g.fillRect(0, 0, 1024, 768);

  // left gutter
  g.fillStyle = "#0A0E19";
  g.fillRect(0, 0, 64, 768);

  const lineH = 52;
  const codeX = 80;
  const fontSize = 22;

  type Segment = [string, string]; // [text, color]
  const lines: Segment[][] = [
    [["from", "#C678DD"], [" llm ", "white"], ["import", "#C678DD"], [" GPT4Turbo", "#E5C07B"]],
    [["from", "#C678DD"], [" agents ", "white"], ["import", "#C678DD"], [" AgentRunner", "#E5C07B"]],
    [["", ""]],
    [["class", "#C678DD"], [" AminaAI", "#E5C07B"], [":", "#ABB2BF"]],
    [['    """', "#5C6370"], ["AI Engineer & Builder", "#5C6370"], ['"""', "#5C6370"]],
    [["    model", "#ABB2BF"], [" = ", "#56B6C2"], ["GPT4Turbo", "#E5C07B"], ["()", "#ABB2BF"]],
    [["    agent", "#ABB2BF"], [" = ", "#56B6C2"], ["AgentRunner", "#E5C07B"], ["(model)", "#ABB2BF"]],
    [["", ""]],
    [["    def", "#C678DD"], [" build", "#61AFEF"], ["(self", "#ABB2BF"], [", task", "#D19A66"], ["):", "#ABB2BF"]],
    [["        return", "#C678DD"], [" self", "#ABB2BF"], [".agent", "#61AFEF"], [".run(task)", "#ABB2BF"]],
    [["", ""]],
    [["    def", "#C678DD"], [" skills", "#61AFEF"], ["(self):", "#ABB2BF"]],
    [["        return", "#C678DD"], [' ["Generative AI",', "#98C379"]],
    [['                 "ML Engineering",', "#98C379"]],
    [['                 "Full Stack Dev"]', "#98C379"]],
  ];

  g.font = `${fontSize}px 'SF Mono', 'JetBrains Mono', Menlo, monospace`;
  g.textBaseline = "middle";

  lines.forEach((segs, row) => {
    const y = 36 + row * lineH;

    // line number
    g.fillStyle = "#3D4451";
    g.textAlign = "right";
    g.fillText(String(row + 1), 52, y);
    g.textAlign = "left";

    // highlight current row (row 9 — the build method body)
    if (row === 9) {
      g.fillStyle = "rgba(99,102,241,0.07)";
      g.fillRect(64, y - lineH / 2, 960, lineH);
      // cursor
      g.fillStyle = "rgba(99,102,241,0.9)";
      let cursorX = codeX;
      segs.forEach(([t]) => {
        const m = g.measureText(t);
        cursorX += m.width;
      });
      g.fillRect(cursorX + 2, y - 13, 3, 26);
    }

    // render segments
    let x = codeX;
    segs.forEach(([text, color]) => {
      if (!text) return;
      g.fillStyle = color;
      g.fillText(text, x, y);
      x += g.measureText(text).width;
    });
  });

  // subtle bottom fade
  const fade = g.createLinearGradient(0, 580, 0, 768);
  fade.addColorStop(0, "rgba(13,17,23,0)");
  fade.addColorStop(1, "rgba(13,17,23,0.95)");
  g.fillStyle = fade;
  g.fillRect(0, 580, 1024, 188);

  return new THREE.CanvasTexture(c);
}

/** Left activity bar (VS Code sidebar icons) */
function makeSidebar(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 64; c.height = 768;
  const g = c.getContext("2d")!;

  g.fillStyle = "#010409";
  g.fillRect(0, 0, 64, 768);

  // right border
  g.fillStyle = "rgba(99,102,241,0.18)";
  g.fillRect(62, 0, 2, 768);

  // icon placeholders
  const icons = [
    { y: 40,  active: true  },
    { y: 110, active: false },
    { y: 180, active: false },
    { y: 250, active: false },
  ];
  icons.forEach(({ y, active }) => {
    g.fillStyle = active ? "rgba(99,102,241,0.8)" : "rgba(100,116,139,0.4)";
    g.beginPath();
    g.roundRect(14, y, 36, 36, 6);
    g.fill();
    if (active) {
      // active bar on left
      g.fillStyle = "#6366F1";
      g.fillRect(0, y - 4, 3, 44);
    }
  });

  return new THREE.CanvasTexture(c);
}

/* ════════════════════════════════════════════════
   EDITOR WINDOW MESH
════════════════════════════════════════════════ */
function EditorWindow({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const group = useRef<THREE.Group>(null!);

  const textures = useMemo(() => {
    const title   = makeTitleBar();
    const code    = makeCodeBody();
    const sidebar = makeSidebar();
    return { title, code, sidebar };
  }, []);

  /* ── Geometry: flat panel proportions 16:11 ── */
  const W = 4.2, H = 2.9, D = 0.09;
  const titleH = (80 / 768) * H;
  const sidebarW = (64 / 1024) * W;

  const panelGeo   = useMemo(() => new THREE.BoxGeometry(W, H, D), [W, H, D]);
  const titleGeo   = useMemo(() => new THREE.BoxGeometry(W, titleH, D + 0.001), [W, titleH, D]);
  const codeGeo    = useMemo(() => new THREE.BoxGeometry(W - sidebarW, H - titleH, D + 0.001), [W, H, D, titleH, sidebarW]);
  const sidebarGeo = useMemo(() => new THREE.BoxGeometry(sidebarW, H - titleH, D + 0.001), [H, D, titleH, sidebarW]);

  /* ── Materials ── */
  const bodyMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color("#0D1117"),
    emissive: new THREE.Color("#0A0E1A"),
    emissiveIntensity: 0.6,
    roughness: 0.05,
    metalness: 0.7,
    transparent: true,
    opacity: 0.96,
  }), []);

  const titleMat = useMemo(() => new THREE.MeshStandardMaterial({
    map: textures.title,
    transparent: true,
    opacity: 1,
    roughness: 0.1,
    metalness: 0.3,
  }), [textures.title]);

  const codeMat = useMemo(() => new THREE.MeshStandardMaterial({
    map: textures.code,
    transparent: true,
    opacity: 1,
    roughness: 0.1,
    metalness: 0.2,
    emissive: new THREE.Color("#0D1117"),
    emissiveIntensity: 0.4,
  }), [textures.code]);

  const sidebarMat = useMemo(() => new THREE.MeshStandardMaterial({
    map: textures.sidebar,
    transparent: true,
    opacity: 1,
    roughness: 0.1,
    metalness: 0.3,
  }), [textures.sidebar]);

  /* ── Edge glow ── */
  const edgeGeo = useMemo(() => new THREE.EdgesGeometry(
    new THREE.BoxGeometry(W + 0.01, H + 0.01, D + 0.01)
  ), [W, H, D]);

  const edgeMat = useMemo(() => new THREE.LineBasicMaterial({
    color: "#6366F1",
    transparent: true,
    opacity: 0.55,
  }), []);

  /* ── Animation ── */
  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;

    // Gentle float
    group.current.position.y = Math.sin(t * 0.55) * 0.1;

    // Mouse tilt — very subtle
    const tX = -mouseY * 0.12;
    const tY =  mouseX * 0.14;
    group.current.rotation.x += (tX - group.current.rotation.x) * 0.04;
    group.current.rotation.y += (tY - group.current.rotation.y) * 0.04;

    // Edge glow pulse
    edgeMat.opacity = 0.4 + Math.sin(t * 1.6) * 0.2;
  });

  return (
    <group ref={group} rotation={[0.04, -0.08, 0]}>
      {/* Main body panel */}
      <mesh geometry={panelGeo} material={bodyMat} />

      {/* Title bar — top strip */}
      <mesh
        geometry={titleGeo}
        material={titleMat}
        position={[0, H / 2 - titleH / 2, D / 2 + 0.001]}
      />

      {/* Sidebar — left strip */}
      <mesh
        geometry={sidebarGeo}
        material={sidebarMat}
        position={[
          -(W / 2) + sidebarW / 2,
          -(titleH / 2),
          D / 2 + 0.001,
        ]}
      />

      {/* Code area */}
      <mesh
        geometry={codeGeo}
        material={codeMat}
        position={[
          sidebarW / 2,
          -(titleH / 2),
          D / 2 + 0.001,
        ]}
      />

      {/* Edge glow outline */}
      <lineSegments geometry={edgeGeo} material={edgeMat} />

      {/* Bottom shadow caster */}
      <mesh position={[0, -H / 2 - 0.02, 0]} receiveShadow castShadow>
        <planeGeometry args={[W * 1.1, 0.6]} />
        <meshBasicMaterial color="#6366F1" transparent opacity={0.06} />
      </mesh>
    </group>
  );
}

/* ════════════════════════════════════════════════
   SCENE
════════════════════════════════════════════════ */
function Scene({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  return (
    <>
      <ambientLight intensity={0.2} />
      {/* Primary indigo key */}
      <pointLight position={[-4, 3, 4]}  color="#6366F1" intensity={4}   decay={2} />
      {/* Blue fill */}
      <pointLight position={[4, 1, 3]}   color="#3B82F6" intensity={3}   decay={2} />
      {/* Purple rim */}
      <pointLight position={[0, -2, 2]}  color="#8B5CF6" intensity={2}   decay={2} />
      {/* Top soft */}
      <pointLight position={[0, 5, 1]}   color="#1E40AF" intensity={1.5} decay={2} />

      <EditorWindow mouseX={mouseX} mouseY={mouseY} />
    </>
  );
}

/* ════════════════════════════════════════════════
   EXPORT
════════════════════════════════════════════════ */
export default function CodeCube() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth  - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      className="relative w-[380px] h-[300px] sm:w-[500px] sm:h-[380px] lg:w-[560px] lg:h-[420px]"
      aria-hidden="true"
    >
      {/* Soft CSS glow behind the panel */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 75% 60% at 50% 50%, rgba(99,102,241,0.14) 0%, rgba(59,130,246,0.06) 50%, transparent 75%)",
          filter: "blur(12px)",
        }}
      />
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
        style={{ background: "transparent" }}
      >
        <Scene mouseX={mouse.x} mouseY={mouse.y} />
      </Canvas>
    </div>
  );
}
