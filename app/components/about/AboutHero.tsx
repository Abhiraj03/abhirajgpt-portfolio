// app/about/page.tsx
"use client";

import type { Metadata } from "next";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";

import { profileData } from "@/data/responses";
import AboutGallery from "./AboutGallery";

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
          <div key={i} className="relative w-24 h-24 shrink-0">
            <Image src={g.src} alt={g.alt ?? `game-${i}`} fill className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* Hex badge + honeycomb layout */
function HexBadge({ title, desc, color = "border-emerald-400" }: Badge) {
  return (
    <div className="relative w-44 h-40 flex items-center justify-center">
      <div
        className={`w-44 h-40 ${color} border-2 bg-zinc-900/50 text-zinc-100 p-3`}
        style={{
          clipPath:
            "polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)",
        }}
      >
        <div className="h-full flex flex-col items-center justify-center text-center px-2">
          <div className="text-sm font-semibold">{title}</div>
          <div className="text-xs text-zinc-300 mt-1">{desc}</div>
        </div>
      </div>
    </div>
  );
}

function Honeycomb({ items }: { items: Badge[] }) {
  return (
    <div className="flex flex-wrap gap-x-3 gap-y-0">
      {items.map((b, i) => (
        <div key={i} className={`${i % 2 ? "mt-6" : ""}`}>
          <HexBadge {...b} />
        </div>
      ))}
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
      <GamesStrip games={games} />

      {/* Achievements as hex badges */}
      <section className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight">Achievements</h2>
        <div className="mt-4">
          <Honeycomb items={badges} />
        </div>
      </section>
    </div>
  );
}

/* ========================== PAGE ========================== */
export default function AboutPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-10">
      <AboutHero />

      {/* Gallery stays as you already have it. Replace items with your actual images. */}
      <AboutGallery
        items={[
          { src: "/images/abhiraj.jpg", alt: "Square", size: "square" },
          { src: "/images/abhiraj.jpg", alt: "Wide", size: "horizontal" },
          { src: "/images/abhiraj.jpg", alt: "Square" },
          { src: "/images/abhiraj.jpg", alt: "Square" },
          { src: "/images/abhiraj.jpg", alt: "Tall", size: "vertical" },
          { src: "/images/abhiraj.jpg", alt: "Square" },
          { src: "/images/abhiraj.jpg", alt: "Square" },
          { src: "/images/abhiraj.jpg", alt: "Tall", size: "vertical" },
          { src: "/images/abhiraj.jpg", alt: "Wide", size: "horizontal" },
          { src: "/images/abhiraj.jpg", alt: "Square" },
          { src: "/images/abhiraj.jpg", alt: "Square" },
          { src: "/images/abhiraj.jpg", alt: "Square" },
        ]}
      />

      {/* New sections */}
      <AboutMore
        bio="I am a full stack developer who ships AI and VR experiences with a focus on fast feedback, clean architecture, and small touches that feel alive. I enjoy owning projects from idea to launch and iterating with real users."
        booksByGenre={{
          Fantasy: [
            { title: "Mistborn", cover: "/covers/mistborn.jpg" },
            { title: "The Name of the Wind", cover: "/covers/name-of-the-wind.jpeg" },
            { title: "The Way of Kings", cover: "/covers/way-of-the-kings.jpg" },
          ],
          "Sci Fi": [
            { title: "Project Hail Mary", cover: "/covers/project-hail-mary.jpg" },
            { title: "Dune", cover: "/covers/dune.jpg" },
            { title: "The Three Body Problem", cover: "/covers/three-body.jpg" },
          ],
          "Self Help": [
            { title: "Atomic Habits", cover: "/covers/atomic-habits.jpg" },
            { title: "Deep Work", cover: "/covers/deep-work.jpg" },
            { title: "Make Time", cover: "/covers/make-time.jpg" },
          ],
        }}
        bookCovers={{
          Fantasy: [
            "/covers/mistborn.jpg",
            "/covers/name-of-the-wind.jpeg",
            "/covers/way-of-the-kings.jpg",
          ],
          "Sci Fi": [
            "/covers/project-hail-mary.jpg",
            "/covers/dune.jpg",
            "/covers/three-body.jpg",
          ],
          "Self Help": [
            "/covers/atomic-habits.jpg",
            "/covers/deep-work.jpg",
            "/covers/make-time.jpg",
          ],
        }}
        games={[
          { src: "/games/elden-ring.jpg", alt: "Elden Ring" },
          { src: "/games/hades.jpg", alt: "Hades" },
          { src: "/games/portal2.jpg", alt: "Portal 2" },
          { src: "/games/zelda-totk.jpg", alt: "Zelda TOTK" },
          { src: "/games/factorio.jpg", alt: "Factorio" },
        ]}
        badges={[
          { title: "Quest Build Shipped", desc: "Used by one thousand students", color: "border-sky-400" },
          { title: "Realtime Comms", desc: "MQTT and calling module", color: "border-amber-400" },
          { title: "Scaled Next.js", desc: "AWS deploy with CI", color: "border-emerald-400" },
          { title: "Obs and Perf", desc: "Profiling and tracing", color: "border-rose-400" },
          { title: "AI Prototyper", desc: "RAG and assistants", color: "border-violet-400" },
        ]}
      />
    </div>
  );
}
