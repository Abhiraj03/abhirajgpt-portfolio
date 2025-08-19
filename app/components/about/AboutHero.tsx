// app/about/page.tsx
"use client";

import type { Metadata } from "next";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";

import { profileData } from "@/data/responses";

// Optional page metadata
export const metadata: Metadata = { title: "About — AbhirajGPT" };

/* ========================== HERO (unchanged) ========================== */
export function AboutHero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 15 });
  const sy = useSpring(my, { stiffness: 120, damping: 15 });

  return (
    <section
      onMouseMove={(e) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
        mx.set(x);
        my.set(y);
      }}
      className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/60 p-6 md:p-10"
    >
      {/* soft blobs */}
      <motion.div
        style={{ x: sx, y: sy }}
        className="pointer-events-none absolute -top-24 -right-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"
      />
      <motion.div
        style={{ x: sy, y: sx }}
        className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl"
      />

      <div className="flex flex-col md:flex-row items-center md:items-center gap-6 md:gap-10">
        {/* Profile image */}
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="relative"
        >
          <div className="relative h-28 w-28 md:h-36 md:w-36">
            <Image
              src={profileData.avatar}
              alt={`${profileData.name} headshot`}
              fill
              sizes="144px"
              className="rounded-3xl object-cover ring-2 ring-zinc-700 shadow-lg"
              priority
            />
          </div>
        </motion.div>

        {/* Name and headline */}
        <div className="text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.3 }}
            className="text-2xl md:text-3xl font-semibold tracking-tight"
          >
            {profileData.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.3 }}
            className="text-zinc-300 mt-1"
          >
            {profileData.headline}
          </motion.p>
        </div>
      </div>
    </section>
  );
}

/* ========================== NEW CONTENT ========================== */
type Book = { title: string; cover?: string };
type BooksByGenre = Record<string, Book[]>;
type Game = { src: string; alt?: string };
type Badge = { title: string; desc: string; color?: string };

/* Small section shell */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-6 md:p-8">
      <h2 className="text-xl md:text-2xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

/* Playing-card style fan of three covers */
function FannedCovers({ covers }: { covers: string[] }) {
  const cards = covers.slice(0, 3);
  const tilts = [-10, 0, 10];
  const offsets = ["left-0", "left-10", "left-20"];
  return (
    <div className="relative h-28 sm:h-32 w-64 mx-auto mb-3 ml-5">
      {cards.map((c, i) => (
        <div
          key={i}
          className={`absolute top-0 ${offsets[i]} w-20 h-28 sm:w-24 sm:h-32 rounded-lg overflow-hidden shadow-md`}
          style={{ transform: `rotate(${tilts[i]}deg)` }}
        >
          <Image src={c} alt={`book-${i}`} fill className="object-cover" />
        </div>
      ))}
    </div>
  );
}

/* Tight single-row games strip, no gaps */
function GamesStrip({ games }: { games: Game[] }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-2 overflow-x-auto">
      <div className="flex gap-0">
        {games.map((g, i) => (
          <div key={i} className="relative w-32 h-32 shrink-0">
            <Image src={g.src} alt={g.alt ?? `game-${i}`} fill className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* Hex badge + honeycomb layout */
function HexBadge({
  title,
  desc,
  colorFrom = "#60a5fa", // sky-400
  colorTo = "#3b82f6",   // blue-500
  stroke = "#93c5fd",    // sky-300
  id = "hexgrad",
}: {
  title: string;
  desc: string;
  colorFrom?: string;
  colorTo?: string;
  stroke?: string;
  id?: string; // unique per badge to avoid gradient ID clashes
}) {
  return (
    <div className="relative w-[150px] h-[165px]">
      <svg viewBox="0 0 100 112" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={colorFrom} />
            <stop offset="100%" stopColor={colorTo} />
          </linearGradient>
        </defs>

        {/* outer crisp hex */}
        <polygon
          points="50,2 92,24 92,88 50,110 8,88 8,24"
          fill={`url(#${id})`}
          stroke={stroke}
          strokeWidth="2.5"
        />
        {/* subtle inner inset for “badge” feel */}
        <polygon
          points="50,8 86,28 86,84 50,104 14,84 14,28"
          fill="rgba(255,255,255,.06)"
        />
      </svg>

      {/* text overlay */}
      <div className="absolute inset-0 flex items-center justify-center text-center px-3">
        <div className="leading-tight">
          <div className="text-[18px] font-semibold text-white">{title}</div>
          <div className="text-[12px] text-white/90 mt-1 mx-1">{desc}</div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Honeycomb layout (staggered rows like AWS) ---------- */
function Honeycomb({
  items,
}: {
  items: { title: string; desc: string; color?: string }[];
}) {
  // choose nice outline/gradient pairs per badge (falls back to blue)
  const palettes = [
    { from: "#22d3ee", to: "#0ea5e9", stroke: "#67e8f9" }, // cyan → blue
    { from: "#a78bfa", to: "#7c3aed", stroke: "#c4b5fd" }, // violet
    { from: "#34d399", to: "#059669", stroke: "#6ee7b7" }, // emerald
    { from: "#f59e0b", to: "#d97706", stroke: "#fbbf24" }, // amber
    { from: "#fb7185", to: "#e11d48", stroke: "#fda4af" }, // rose
  ];

  // Split into rows (pyramid style). Adjust counts as you like.
  const rows: typeof items[] = [
    items.slice(0, 3),
    items.slice(1, 3 + 2), // up to 5 total → second row has 4 if available
    items.slice(5),        // remaining go to row 3
  ];

  return (
    <div className="relative mb-5">
      {/* Row 1 (top center) */}
      <div className="flex justify-center">
        {rows[0].map((b, i) => {
          const p = palettes[(i + 0) % palettes.length];
          return (
            <HexBadge
              key={`r0-${i}`}
              title={b.title}
              desc={b.desc}
              colorFrom={p.from}
              colorTo={p.to}
              stroke={p.stroke}
              id={`hex-r0-${i}`}
            />
          );
        })}
      </div>

      {/* Row 2 (offset up to interlock with row 1) */}
      {rows[1].length > 0 && (
        <div className="flex justify-center gap-1 -mt-8">
          {rows[1].map((b, i) => {
            const p = palettes[(i + 1) % palettes.length];
            return (
              <div key={`r1-${i}`} className="translate-y-4">
                <HexBadge
                  title={b.title}
                  desc={b.desc}
                  colorFrom={p.from}
                  colorTo={p.to}
                  stroke={p.stroke}
                  id={`hex-r1-${i}`}
                />
              </div>
            );
          })}
        </div>
      )}

      {/* Row 3 (another offset) */}
      {rows[2].length > 0 && (
        <div className="flex justify-center gap-6 -mt-8">
          {rows[2].map((b, i) => {
            const p = palettes[(i + 2) % palettes.length];
            return (
              <div key={`r2-${i}`} className="-translate-y-2">
                <HexBadge
                  title={b.title}
                  desc={b.desc}
                  colorFrom={p.from}
                  colorTo={p.to}
                  stroke={p.stroke}
                  id={`hex-r2-${i}`}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* AboutMore composed with your choices */
export function AboutMore({
  bio,
  booksByGenre,
  bookCovers,
  games,
  badges,
}: {
  bio: string;
  booksByGenre: BooksByGenre; // three categories: Fantasy, Sci Fi, Self Help
  bookCovers: Record<string, string[]>; // three covers per category for the fan
  games: Game[]; // images only, will render in a tight strip
  badges: Badge[]; // hex badges
}) {
  return (
    <div className="mt-6 md:mt-10 space-y-6 md:space-y-8">
      {/* Bio */}
      <Section title="Bio">
        <p className="text-zinc-300 leading-7">{bio}</p>
      </Section>

      {/* Achievements as hex badges */}
      <section className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight">Achievements</h2>
        <div className="mt-4">
          <Honeycomb items={badges} />
        </div>
      </section>

      {/* Books */}
      <Section title="Books I Like">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(booksByGenre).map(([genre, list]) => (
            <div
              key={genre}
              className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4"
            >
              <FannedCovers covers={bookCovers[genre] ?? []} />
              <h3 className="text-base font-medium text-zinc-200 text-center">{genre}</h3>
              <ul className="mt-3 space-y-1">
                {list.map((b) => (
                  <li
                    key={`${genre}-${b.title}`}
                    className="text-sm text-zinc-300 text-center"
                  >
                    {b.title}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Games strip */}
      <Section title="Games">
        <GamesStrip games={games} />
      </Section>
    </div>
  );
}