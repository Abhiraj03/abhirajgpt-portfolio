// app/components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FiMessageSquare, FiFolder, FiFileText, FiMail, FiUser } from "react-icons/fi";
import Image from "next/image";

const items = [
  { href: "/", label: "New Chat", icon: FiMessageSquare },
  { href: "/projects", label: "Projects", icon: FiFolder },
  { href: "/resume", label: "Experience & Skills", icon: FiFileText },
  { href: "/contact", label: "Contact", icon: FiMail },
  { href: "/about", label: "About Me", icon: FiUser },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // layout refs (to keep firefly away from logo + nav)
  const boxRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLButtonElement | null>(null);
  const navRef  = useRef<HTMLElement | null>(null);

  // Firefly state
  const [fly, setFly] = useState<{ top: number; left: number; key: number; show: boolean }>({
    top: 90,
    left: 90,
    key: 0,
    show: false,
  });

  // timer type (browser): number | null
  const timerRef = useRef<number | null>(null);

  useEffect(() => setMounted(true), []);

  // Spawn a firefly at random intervals (and keep it off the interactive areas)
  useEffect(() => {
    const spawn = () => {
      if (!boxRef.current) return;

      const box = boxRef.current.getBoundingClientRect();

      // Measure “unsafe” zone at top (logo + nav)
      const logoH = logoRef.current?.getBoundingClientRect().height ?? 0;

      // Reserve a top zone = logo + part of the nav
      // (we don't need to block the whole nav; ~140px is plenty in most cases)
      const safeTopStart = Math.min(logoH + 20, box.height - 80);
      const safeTopEnd   = box.height - 40; // bottom padding

      // X padding so it stays inside comfortably
      const padX = 16;

      const randTop =
        safeTopStart + Math.random() * Math.max(40, safeTopEnd - safeTopStart);
      const randLeft =
        padX + Math.random() * Math.max(20, box.width - padX * 2);

      setFly((f) => ({ ...f, top: randTop, left: randLeft, key: f.key + 1, show: true }));

      // hide after 6–9s
      const visibleFor = 6000 + Math.random() * 3000;
      window.setTimeout(() => setFly((f) => ({ ...f, show: false })), visibleFor);

      // next spawn in 20–40s
      const nextIn = 20000 + Math.random() * 20000;
      timerRef.current = window.setTimeout(spawn, nextIn) as unknown as number;
    };

    // first spawn in 5–12s
    const firstIn = 5000 + Math.random() * 7000;
    timerRef.current = window.setTimeout(spawn, firstIn) as unknown as number;

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const reloadHome = () => {
    window.location.href = "/";
  };

  return (
    <aside
      ref={boxRef}
      className="relative w-64 p-4 flex flex-col overflow-hidden"
      style={{ backgroundColor: "rgb(0,0,0)" }}
    >
      {/* Watermark hint (ghost text in the center) */}
      <div className="absolute inset-0 flex items-end mb-2 justify-center pointer-events-none z-0">
        <span className="tracking-widest text-zinc-700 text-center select-none">
          Find the firefly, unlock the hidden path.
        </span>
      </div>

      {/* Clickable firefly */}
      <button
        aria-label="sparkle"
        title="catch me"
        onClick={() => router.push("/hidden")}
        key={fly.key}
        className={`pointer-events-auto absolute z-20 transition-opacity duration-500 ${
          fly.show ? "opacity-100" : "opacity-0"
        }`}
        style={{ top: fly.top, left: fly.left }}
      >
        <span className="relative inline-block h-4 w-4">
          {/* glow */}
          <span className="absolute inset-0 rounded-full blur-[6px] bg-yellow-300/60 animate-fireflyPulse" />
          {/* core */}
          <span className="relative block h-2.5 w-2.5 rounded-full bg-yellow-200 ring-2 ring-yellow-400/50 animate-fireflyDrift" />
          {/* twinkle */}
          <svg
            className="absolute -top-3 -left-2 h-4 w-4 opacity-70 animate-fireflyTwinkle"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 3l2 4 4 2-4 2-2 4-2-4-4-2 4-2 2-4z"
              fill="currentColor"
              className="text-yellow-300"
            />
          </svg>
        </span>
      </button>

      {/* Logo */}
      <button ref={logoRef} onClick={reloadHome} className="mb-6 cursor-pointer relative z-10">
        <Image src="/AbhirajGPT.png" alt="Logo" width={48} height={48} className="w-12 h-12" />
      </button>

      {/* Nav */}
      <nav ref={navRef} className="flex flex-col gap-2 relative z-10">
        {items.map((item) => {
          const active = mounted && pathname === item.href;
          const Icon = item.icon;

          if (item.label === "New Chat") {
            return (
              <button
                key={item.label}
                onClick={reloadHome}
                className={`flex items-center gap-2 text-left px-3 py-2 rounded transition mb-3 cursor-pointer ${
                  active ? "bg-gray-800 text-white" : "hover:bg-gray-800 text-zinc-300"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 text-left px-3 py-2 rounded transition ${
                active ? "bg-gray-800 text-white" : "hover:bg-gray-800 text-zinc-300"
              } ${item.label === "New Chat" ? "mb-3" : ""}`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Firefly animations */}
      <style jsx>{`
        @keyframes fireflyPulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.25); }
        }
        @keyframes fireflyDrift {
          0%   { transform: translate(0, 0); }
          25%  { transform: translate(2px, -3px); }
          50%  { transform: translate(-1px, 2px); }
          75%  { transform: translate(3px, 1px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes fireflyTwinkle {
          0%, 100% { opacity: 0.35; transform: scale(0.9) rotate(0deg); }
          50%      { opacity: 0.9;  transform: scale(1.05) rotate(12deg); }
        }
        .animate-fireflyPulse   { animation: fireflyPulse 1.6s ease-in-out infinite; }
        .animate-fireflyDrift   { animation: fireflyDrift 3.6s ease-in-out infinite; }
        .animate-fireflyTwinkle { animation: fireflyTwinkle 2.2s ease-in-out infinite; }
      `}</style>
    </aside>
  );
}
