// components/projects/ProjectCard.tsx
"use client";

import Link from "next/link";
import { Project } from "@/types/project";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function ProjectCard({ project }: { project: Project }) {
  const aspect = project.aspect === "square" ? "aspect-square" : "aspect-video";
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) el.play().catch(() => {});
          else el.pause();
        });
      },
      { rootMargin: "200px 0px", threshold: 0.1 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Link href={`/projects/${project.slug}`} className="block group">
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        className={`relative overflow-hidden rounded-2xl ${aspect} bg-zinc-900 border border-zinc-800 shadow`}
      >
        {/* MP4 loop */}
        <video
          ref={videoRef}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={project.video}
          poster={project.poster}
          muted
          loop
          playsInline
          preload="metadata"   // small head request
        />

        {/* Top gradient */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/70 to-transparent opacity-0 group-hover:opacity-90 transition-opacity" />

        {/* Bottom gradient + details */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 backdrop-blur-0 group-hover:backdrop-blur-sm transition-all duration-300">
          <div className="translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <h3 className="text-white text-lg font-semibold leading-tight">{project.title}</h3>
            <p className="text-zinc-300 text-sm mt-1 line-clamp-2">{project.oneLiner}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.skills.slice(0, 3).map((s) => (
                <span key={s} className="bg-zinc-800/80 border border-zinc-700 text-xs text-white px-2 py-1 rounded-full">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute inset-0 ring-1 ring-inset ring-transparent group-hover:ring-zinc-500/30 transition" />
      </motion.div>
    </Link>
  );
}
