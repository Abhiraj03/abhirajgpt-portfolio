// app/hidden/page.tsx
"use client";

import { useEffect, useRef } from "react";

export default function HiddenPage() {
  return (
    <div className="relative h-dvh w-full overflow-hidden bg-black text-center flex flex-col items-center justify-center">
      {/* Centered text */}
      <div className="absolute top-1/3 z-10 text-white">
        <h1 className="text-5xl font-bold mb-4 mt-15">🎉 Congratulations!</h1>
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
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const fireflies = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2 + 1.5,
      dx: (Math.random() - 0.5) * 0.7,
      dy: (Math.random() - 0.5) * 0.7,
      phase: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      for (let f of fireflies) {
        f.x += f.dx;
        f.y += f.dy;

        // bounce at edges
        if (f.x < 0 || f.x > W) f.dx *= -1;
        if (f.y < 0 || f.y > H) f.dy *= -1;

        // twinkle (opacity)
        f.phase += 0.05;
        const alpha = 0.3 + 0.7 * Math.sin(f.phase);

        // glow effect
        const gradient = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r * 8);
        gradient.addColorStop(0, `rgba(255, 255, 180, ${alpha})`);
        gradient.addColorStop(1, "rgba(255, 255, 180, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r * 8, 0, Math.PI * 2);
        ctx.fill();

        // core
        ctx.fillStyle = `rgba(255, 255, 200, ${alpha})`;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [count]);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
}
