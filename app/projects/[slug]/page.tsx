// app/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "@/data/projects";
import Link from "next/link";

type Params = { slug: string };

// Next.js 15 style: params is a Promise
export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params;
  const proj = projects.find((p) => p.slug === slug);
  return { title: proj ? `${proj.title} — Projects` : "Project — AbhirajGPT" };
}

export default async function ProjectDetail(
  props: { params: Promise<Params> }
) {
  const { slug } = await props.params;
  const proj = projects.find((p) => p.slug === slug);
  if (!proj) return notFound();

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <Link href="/projects" className="text-sm text-zinc-400 hover:text-white">
        ← Back to Projects
      </Link>

      <h1 className="text-3xl font-semibold">{proj.title}</h1>
      <p className="text-zinc-300">{proj.oneLiner}</p>

      <div
        className={`relative overflow-hidden rounded-2xl border border-zinc-800 ${
          proj.aspect === "square" ? "aspect-square" : "aspect-video"
        }`}
      >
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
          <span
            key={s}
            className="bg-zinc-800 border border-zinc-700 text-xs text-white px-2 py-1 rounded-full"
          >
            {s}
          </span>
        ))}
      </div>

      {proj.content && <p className="text-zinc-300 leading-7">{proj.content}</p>}

      <div className="flex gap-3">
        {proj.live && (
          <Link
            href={proj.live}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-400 hover:text-blue-300"
          >
            Live
          </Link>
        )}
        {proj.repo && (
          <Link
            href={proj.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-400 hover:text-blue-300"
          >
            GitHub
          </Link>
        )}
      </div>
    </div>
  );
}
