"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence, easeOut } from "framer-motion";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/types/project";
import { projectsByCategory, type ProjectCategory } from "@/data/projects";
import Link from "next/link";

const fade = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: easeOut } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: easeOut } },
};

export default function ChatProjectPicker() {
  const categories = useMemo<ProjectCategory[]>(
    () => Object.keys(projectsByCategory) as ProjectCategory[],
    []
  );

  const [selected, setSelected] = useState<ProjectCategory | null>(null);

  // selected is now a union of the exact keys, so indexing is safe
  const items: Project[] = selected ? projectsByCategory[selected] : [];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => {
          const active = c === selected;
          return (
            <button
              key={c}
              onClick={() => setSelected(active ? null : c)}
              className={`px-3 py-1.5 text-sm rounded-full border transition cursor-pointer
                ${active
                  ? "bg-zinc-200 text-black border-zinc-300"
                  : "bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-700"}`}
            >
              {c}
            </button>
          );
        })}
        <Link
          href="/projects"
          className="px-3 py-1.5 text-sm rounded-full border bg-transparent text-zinc-300 border-zinc-700 hover:bg-zinc-800 transition"
        >
          View all
        </Link>
      </div>

      <AnimatePresence mode="wait">
        {selected && (
            <motion.div key={selected} {...fade} className="space-y-4">
            <div className="flex items-center justify-between">
                <h4 className="text-base font-semibold">{selected}</h4>
                <button
                onClick={() => setSelected(null)}
                className="text-xs text-zinc-400 hover:text-white"
                >
                Clear
                </button>
            </div>

            {items.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2">
                {items.map((p) => (
                    <ProjectCard key={p.slug} project={p} />
                ))}
                </div>
            ) : (
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 text-sm text-zinc-400">
                Work in progress. Check back soon.
                </div>
            )}

            <div className="flex">
                <Link
                href="/projects"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm px-4 py-2 rounded-lg transition"
                >
                {/* arrow icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" className="fill-current">
                    <path d="M13 5l7 7-7 7v-4H4v-6h9V5z" />
                </svg>
                Open full projects page
                </Link>
            </div>
            </motion.div>
        )}
        </AnimatePresence>


      {!selected && (
        <p className="text-sm text-zinc-400">
          Pick a category to preview projects here, or open the full page.
        </p>
      )}
    </div>
  );
}
