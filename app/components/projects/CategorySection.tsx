// components/projects/CategorySection.tsx
import ProjectCard from "./ProjectCard";
import { Project } from "@/types/project";

export default function CategorySection({
  title,
  items,
}: {
  title: string;
  items: Project[];
}) {
  if (!items?.length) return null;

  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}
