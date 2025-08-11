"use client";

import { profileData } from "@/data/responses";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

/* ------------------------ Updated compact hero ------------------------ */
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

        {/* Name and headline only */}
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

/* ------------------------ Detailed sections below ------------------------ */

type Book = { title: string; author?: string; year?: number };
type BooksByGenre = Record<string, Book[]>;

const sampleBio =
  "I am a full stack developer who ships AI and VR experiences with a focus on fast feedback, clean architecture, and small touches that feel alive. I enjoy owning projects from idea to launch and iterating with real users.";

const sampleAchievements = [
  "Shipped a Quest build used by one thousand students in a semester",
  "Built a realtime chat and calling module with MQTT and Tencent SDK",
  "Scaled a Next.js app on AWS with CI and automated preview environments",
];

const sampleBooks: BooksByGenre = {
  Fantasy: [
    { title: "Mistborn" },
    { title: "The Name of the Wind" },
    { title: "The Way of Kings" },
  ],
  "Sci Fi": [
    { title: "Project Hail Mary" },
    { title: "Dune" },
    { title: "The Three Body Problem" },
  ],
  "Self Help": [
    { title: "Atomic Habits" },
    { title: "Deep Work" },
    { title: "Make Time" },
  ],
};

const sampleSkills = [
  "Systems design",
  "Perf profiling",
  "3D level design",
  "CI with GitHub Actions",
  "API design",
  "Observability",
];

const sampleGames = [
  "Elden Ring",
  "Hades",
  "Portal 2",
  "Zelda Tears of the Kingdom",
  "Factorio",
  "Celeste",
];

const sampleTech = [
  { group: "Frontend", items: ["Next.js", "React", "Framer Motion", "Tailwind"] },
  { group: "Backend", items: ["Go", "Node", "Kotlin", "gRPC", "PostgreSQL"] },
  { group: "AI", items: ["OpenAI", "LangChain", "RAG", "Embeddings"] },
  { group: "VR", items: ["Unreal", "Unity", "OpenXR", "Quest"] },
  { group: "Cloud", items: ["AWS", "Vercel", "Docker", "Terraform"] },
];

function SectionShell({
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

export function AboutMore({
  bio = sampleBio,
  achievements = sampleAchievements,
  booksByGenre = sampleBooks,
  skills = sampleSkills,
  games = sampleGames,
  tech = sampleTech,
}: {
  bio?: string;
  achievements?: string[];
  booksByGenre?: BooksByGenre;
  skills?: string[];
  games?: string[];
  tech?: { group: string; items: string[] }[];
}) {
  return (
    <div className="mt-6 md:mt-10 space-y-6 md:space-y-8">
      {/* Bio */}
      <SectionShell title="Bio">
        <p className="text-zinc-300 leading-7">{bio}</p>
      </SectionShell>

      {/* Achievements */}
      <SectionShell title="Achievements">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {achievements.map((a) => (
            <li
              key={a}
              className="flex items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-900/40 p-3"
            >
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
              <span className="text-zinc-200">{a}</span>
            </li>
          ))}
        </ul>
      </SectionShell>

      {/* Books by Genre */}
      <SectionShell title="Books I Like">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(booksByGenre).map(([genre, list]) => (
            <div
              key={genre}
              className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4"
            >
              <h3 className="text-sm font-medium text-zinc-200">{genre}</h3>
              <ul className="mt-3 space-y-2">
                {list.map((b) => (
                  <li key={`${genre}-${b.title}`} className="text-zinc-300 text-sm">
                    {b.title}
                    {b.author ? <span className="text-zinc-500"> by {b.author}</span> : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SectionShell>

      {/* Additional Skills */}
      <SectionShell title="Additional Skills">
        <div className="flex flex-wrap gap-2">
          {skills.map((s) => (
            <span
              key={s}
              className="text-xs bg-zinc-900 border border-zinc-700 text-white px-2.5 py-1 rounded-full"
            >
              {s}
            </span>
          ))}
        </div>
      </SectionShell>

      {/* Games */}
      <SectionShell title="Games I Enjoy">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {games.map((g) => (
            <div
              key={g}
              className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-3 text-center text-sm text-zinc-200"
            >
              {g}
            </div>
          ))}
        </div>
      </SectionShell>

      {/* Tech I Like */}
      <SectionShell title="Tech I Like Using">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tech.map(({ group, items }) => (
            <div key={group} className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
              <h3 className="text-sm font-medium text-zinc-200">{group}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {items.map((t) => (
                  <span
                    key={`${group}-${t}`}
                    className="text-xs bg-zinc-950 border border-zinc-700 text-white px-2.5 py-1 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionShell>
    </div>
  );
}

/* ------------------------ Example page wrapper ------------------------ */

export default function AboutPage() {
  return (
    <div className="space-y-6 md:space-y-8">
      <AboutHero />
      <AboutMore />
    </div>
  );
}
