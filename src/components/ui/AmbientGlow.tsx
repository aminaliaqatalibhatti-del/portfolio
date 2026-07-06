"use client";

export default function AmbientGlow() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Top-left blue blob */}
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.07]"
        style={{
          background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      {/* Top-right purple blob */}
      <div
        className="absolute -top-20 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.06]"
        style={{
          background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      {/* Mid cyan blob */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[800px] h-[400px] rounded-full opacity-[0.04]"
        style={{
          background: "radial-gradient(ellipse, #06B6D4 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      {/* Bottom-right blue blob */}
      <div
        className="absolute -bottom-40 -right-20 w-[500px] h-[500px] rounded-full opacity-[0.05]"
        style={{
          background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
    </div>
  );
}
