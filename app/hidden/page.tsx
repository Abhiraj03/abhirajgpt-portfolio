// app/hidden/page.tsx
"use client";

import { useEffect, useRef } from "react";

export default function HiddenPage() {
  return (
    <div className="relative h-dvh w-full overflow-hidden bg-black text-center flex flex-col items-center justify-center">
      {/* Centered text */}
      <div className="absolute top-1/3 z-10 text-white">
        <h1 className="text-5xl font-bold mb-4 mt-16">🎉 Congratulations!</h1>
        <p className="text-xl text-zinc-300">You found 100 fireflies ✨</p>
      </div>

      {/* Fireflies animation */}
      <Fireflies count={100} />
    </div>
  );
}

function Fireflies({ count }: { count: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.max(1, window.devicePixelRatio || 1);

    const resize = () => {
      const { innerWidth: w, innerHeight: h } = window;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // draw in CSS pixels
    };
    resize();
    window.addEventListener("resize", resize);

    const W = () => window.innerWidth;
    const H = () => window.innerHeight;

    const fireflies = Array.from({ length: count }, () => ({
      x: Math.random() * W(),
      y: Math.random() * H(),
      r: Math.random() * 2 + 1.5,
      dx: (Math.random() - 0.5) * 0.7,
      dy: (Math.random() - 0.5) * 0.7,
      phase: Math.random() * Math.PI * 2,
    }));

    let rafId = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W(), H());

      for (const f of fireflies) {            // ← prefer-const fix
        f.x += f.dx;
        f.y += f.dy;

        // bounce at edges (with tiny padding)
        const pad = 4;
        if (f.x < pad || f.x > W() - pad) f.dx *= -1;
        if (f.y < pad || f.y > H() - pad) f.dy *= -1;

        // twinkle
        f.phase += 0.05;
        const alpha = 0.3 + 0.7 * Math.sin(f.phase);

        // soft glow
        const glowRadius = f.r * 8;
        const gradient = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, glowRadius);
        gradient.addColorStop(0, `rgba(255, 255, 180, ${alpha})`);
        gradient.addColorStop(1, "rgba(255, 255, 180, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(f.x, f.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // bright core
        ctx.fillStyle = `rgba(255, 255, 200, ${alpha})`;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
}
