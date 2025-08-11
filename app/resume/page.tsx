// app/resume/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import ExperienceTimeline from "../components/ExperienceTimeline";
import { experiences } from "@/data/experience";

export const metadata: Metadata = { title: "Experience — AbhirajGPT" };

export default function ResumePage() {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Experience</h1>
          <p className="text-zinc-400">A scrollable timeline of what I’ve built and shipped.</p>
        </div>
        <Link
          href="/Abhiraj_Chaudhary_Resume.pdf"
          className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm hover:bg-zinc-700 transition"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" className="fill-current">
            <path d="M12 3v10.586l3.293-3.293 1.414 1.414L12 17.414l-4.707-4.707 1.414-1.414L11 13.586V3h1zM5 19h14v2H5z" />
          </svg>
          Download PDF
        </Link>
      </div>

      <ExperienceTimeline items={experiences} />
    </div>
  );
}
