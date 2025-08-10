// app/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "@/data/projects";
import Link from "next/link";

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const proj = projects.find((p) => p.slug === params.slug);
  return { title: proj ? `${proj.title} — Projects` : "Project — AbhirajGPT" };
}

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const proj = projects.find((p) => p.slug === params.slug);
  if (!proj) return notFound();

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <Link href="/projects" className="text-sm text-zinc-400 hover:text-white">
        ← Back to Projects
      </Link>

      <h1 className="text-3xl font-semibold">{proj.title}</h1>
      <p className="text-zinc-300">{proj.oneLiner}</p>

      <div className={`relative overflow-hidden rounded-2xl border border-zinc-800 ${proj.aspect === "square" ? "aspect-square" : "aspect-video"}`}>
        <video
            className="h-full w-full object-cover"
            src={proj.video}
            poster={proj.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
        />
        </div>

      <div className="flex flex-wrap gap-2">
        {proj.skills.map((s) => (
          <span key={s} className="bg-zinc-800 border border-zinc-700 text-xs text-white px-2 py-1 rounded-full">
            {s}
          </span>
        ))}
      </div>

      {proj.content && <p className="text-zinc-300 leading-7">{proj.content}</p>}

      <div className="flex gap-3">
        {proj.live && (
          <a href={proj.live} target="_blank" className="underline text-blue-400 hover:text-blue-300">
            Live
          </a>
        )}
        {proj.repo && (
          <a href={proj.repo} target="_blank" className="underline text-blue-400 hover:text-blue-300">
            GitHub
          </a>
        )}
      </div>
    </div>
  );
}
