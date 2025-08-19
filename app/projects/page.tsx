// app/projects/page.tsx
import type { Metadata } from "next";
import { projectsByCategory } from "@/data/projects";
import CategorySection from "../components/projects/CategorySection";

export const metadata: Metadata = { title: "Projects — AbhirajGPT" };

export default function ProjectsPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold mb-2">Projects</h1>
      <p className="text-zinc-400 mb-6">
        A few things I have built across AR/VR, full stack, AI, and games.
      </p>

      <CategorySection title="Backend" items={projectsByCategory["Backend"]} />
      <CategorySection title="Full Stack" items={projectsByCategory["Full Stack"]} />
      <CategorySection title="AI" items={projectsByCategory["AI"]} />
      <CategorySection title="AR/VR" items={projectsByCategory["AR/VR"]} />
      <CategorySection title="GameDev" items={projectsByCategory["GameDev"]} />
      <CategorySection title="Modeling/Animation" items={projectsByCategory["Modeling/Animation"]} />
    </div>
  );
}
