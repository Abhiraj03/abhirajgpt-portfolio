// app/components/ExperienceTimeline.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, easeOut } from "framer-motion";
import Image from "next/image";
import type { Experience } from "@/data/experience";

function formatRange(start: string, end?: string) {
  const fmt = (s: string) =>
    new Date(s + "-01").toLocaleString(undefined, { year: "numeric", month: "short" });
  return `${fmt(start)} – ${end ? fmt(end) : "Present"}`;
}

function uniqueSkills(items: Experience[]) {
  const set = new Set<string>();
  items.forEach(e => e.skills.forEach(s => set.add(s)));
  return Array.from(set).sort();
}

export default function ExperienceTimeline({ items }: { items: Experience[] }) {
  // newest first
  const data = useMemo(
    () => [...items].sort((a, b) => (b.end ?? "9999-12").localeCompare(a.end ?? "9999-12") || b.start.localeCompare(a.start)),
    [items]
  );

  const [active, setActive] = useState<string | null>(data[0]?.id ?? null);
  const [skillFilter, setSkillFilter] = useState<string | null>(null);

  const filtered = useMemo(
    () => (skillFilter ? data.filter(d => d.skills.includes(skillFilter)) : data),
    [data, skillFilter]
  );

  // scroll‑spy
  const refs = useRef<Record<string, HTMLElement | null>>({});
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(e.target.getAttribute("data-id"));
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0.1 }
    );
    Object.values(refs.current).forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, [filtered]);

  const skills = useMemo(() => uniqueSkills(data), [data]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[220px,1fr] gap-8">
      {/* Left rail: filters & progress */}
      <aside className="lg:sticky lg:top-6 space-y-4">
        <div className="text-sm text-zinc-400">Filter by skill</div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSkillFilter(null)}
            className={`px-3 py-1.5 rounded-full border text-sm ${
              !skillFilter
                ? "bg-zinc-200 text-black border-zinc-300"
                : "bg-zinc-900 border-zinc-700 hover:bg-zinc-800"
            }`}
          >
            All
          </button>
          {skills.map(s => (
            <button
              key={s}
              onClick={() => setSkillFilter(prev => (prev === s ? null : s))}
              className={`px-3 py-1.5 rounded-full border text-sm ${
                skillFilter === s
                  ? "bg-zinc-200 text-black border-zinc-300"
                  : "bg-zinc-900 border-zinc-700 hover:bg-zinc-800"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </aside>

      {/* Timeline */}
      <section className="relative">
        {/* vertical line */}
        <div className="absolute left-3 top-0 bottom-0 w-px bg-zinc-800" aria-hidden />
        <div className="space-y-8">
          {filtered.map((exp) => {
            const isActive = active === exp.id;
            return (
              <motion.article
                key={exp.id}
                data-id={exp.id}
                ref={el => (refs.current[exp.id] = el)}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.25, ease: easeOut }}
                className="relative pl-10"
              >
                {/* node */}
                <span
                  className={`absolute left-0 top-2 h-2.5 w-2.5 rounded-full ring-2 ${
                    isActive ? "bg-white ring-white/30" : "bg-zinc-500 ring-zinc-700"
                  }`}
                />
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 md:p-5 shadow">
                  <div className="flex items-center gap-3">
                    {exp.logo && (
                      <Image
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        width={28}
                        height={28}
                        className="rounded-md"
                      />
                    )}
                    <div className="flex-1">
                      <div className="text-base font-semibold leading-snug">
                        {exp.role} — {exp.company}
                      </div>
                      <div className="text-xs text-zinc-400">
                        {formatRange(exp.start, exp.end)}
                        {exp.location ? ` • ${exp.location}` : ""}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-zinc-300 mt-3">{exp.summary}</p>

                  <ul className="mt-3 space-y-2 text-sm">
                    {exp.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="mt-[6px] inline-block w-1.5 h-1.5 rounded-full bg-zinc-500" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {exp.skills.map((s) => (
                      <span
                        key={s}
                        className="text-xs bg-zinc-900 border border-zinc-700 text-white px-2 py-1 rounded-full"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {!!exp.links?.length && (
                    <div className="mt-3 flex gap-3">
                      {exp.links.map((l) => (
                        <a
                          key={l.href}
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm underline text-blue-400 hover:text-blue-300"
                        >
                          {l.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })}

          {filtered.length === 0 && (
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 text-sm text-zinc-400">
              No items match this filter.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
