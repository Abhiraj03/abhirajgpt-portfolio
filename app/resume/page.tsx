// app/about/page.tsx
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Resume — AbhirajGPT" };

export default function AboutPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Resume</h1>
      <p className="text-zinc-300">Coming soon.</p>
    </div>
  );
}