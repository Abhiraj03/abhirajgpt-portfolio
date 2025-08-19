// app/resume/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Experience — AbhirajGPT" };

type Experience = {
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
};

const EXPERIENCE: Experience[] = [
  // NEW — Mesh Labs (formerly Meteor)
  {
    role: "OPT Volunteer Software Engineer",
    company: "Mesh Labs (formerly Meteor)",
    location: "Remote",
    start: "Aug 2025",
    end: "Present",
    bullets: [
      "Contributor on the Engine Guild; support coordination, triage, and contributor onboarding.",
      "NextGen Badge: shipped fixes & small features across the stack (React/Node/Postgres).",
      "Improved build/deploy ergonomics with CI checks and lightweight docs for new volunteers.",
    ],
  },
  // NEW — Next Lab
  {
    role: "Software Developer",
    company: "Next Lab",
    location: "Tempe, AZ",
    start: "Jan 2024",
    end: "Aug 2025",
    bullets: [
      "Built and iterated on prototypes with rapid user feedback (Next.js/React + Node).",
      "Added telemetry and simple tracing to speed up debugging and reliability work.",
      "Partnered with a small team to scope, ship, and polish multiple features per sprint.",
    ],
  },

  {
    role: "Software Developer Intern",
    company: "Tweebaa Inc.",
    location: "Tempe, AZ",
    start: "Aug 2024",
    end: "May 2025",
    bullets: [
      "Built full-stack features across Next.js + Node services; shipped fast, UI-polished flows.",
      "Prototyped AI assistants for internal tooling (chat workflows, content drafting).",
      "Owned small tasks end-to-end: tickets → design → PR → deploy; kept cycle times low.",
    ],
  },
  {
    role: "Developer Analyst",
    company: "Terra-Fresh",
    location: "Tempe, AZ",
    start: "Feb 2023",
    end: "Jul 2024",
    bullets: [
      "Analyzed product + ops data and turned insights into dashboards and simple tools.",
      "Automated repetitive data handling with Python scripts and serverless jobs.",
      "Partnered with non-tech stakeholders; translated problems into shippable features.",
    ],
  },
  {
    role: "Undergraduate Research Assistant",
    company: "Arizona State University",
    location: "Tempe, AZ",
    start: "Mar 2022",
    end: "Nov 2022",
    bullets: [
      "Supported applied research projects; cleaned datasets and built quick visualization tools.",
      "Wrote reproducible Python notebooks; documented steps for other students.",
      "Presented intermediate findings and iterated quickly on feedback.",
    ],
  },
  {
    role: "Software Developer",
    company: "Bridge-2-Africa • E-Learning Lab",
    location: "Tempe, AZ",
    start: "Jan 2022",
    end: "May 2022",
    bullets: [
      "Helped deliver a Django + PostgreSQL e-learning app tuned for low-bandwidth use.",
      "Implemented modular UI components and offline-friendly data flows.",
      "Collaborated async with a small team; shipped weekly improvements.",
    ],
  },
];

type Skill = { name: string; level?: number; note?: string };
type SkillGroup = { title: string; items: Skill[] };

/**
 * Levels are just visual hints. If a year count wasn't explicit in your PDFs,
 * I set note to "1y" to satisfy your “at least 1 year” rule.
 */
const SKILLS: SkillGroup[] = [
  {
    title: "Languages",
    items: [
      { name: "JavaScript", level: 90, note: "4–5y" },
      { name: "TypeScript", level: 88, note: "3–4y" },
      { name: "Python", level: 85, note: "3–4y" },
      { name: "Java", level: 70, note: "1–2y" },
      { name: "C/C++", level: 60, note: "1y" },
      { name: "Go", level: 55, note: "1y" },
      { name: "SQL", level: 80, note: "3y" },
    ],
  },
  {
    title: "Frontend",
    items: [
      { name: "React", level: 88, note: "3–4y" },
      { name: "Next.js", level: 86, note: "3y" },
      { name: "Vue / Uni-app", level: 60, note: "1y" },
      { name: "Tailwind CSS", level: 82, note: "2–3y" },
      { name: "Framer Motion", level: 74, note: "1–2y" },
      { name: "WebSockets / WebRTC", level: 60, note: "1y" },
    ],
  },
  {
    title: "Backend & APIs",
    items: [
      { name: "Node.js (Express/Fastify)", level: 82, note: "2–3y" },
      { name: "Django / FastAPI", level: 70, note: "1–2y" },
      { name: "Spring Boot", level: 60, note: "1y" },
      { name: "REST / GraphQL / gRPC", level: 72, note: "2–3y" },
      { name: "PostgreSQL / MySQL", level: 78, note: "2–3y" },
      { name: "MongoDB / Redis", level: 65, note: "1–2y" },
      { name: "Kafka / MQTT (realtime)", level: 58, note: "1y" },
    ],
  },
  {
    title: "AI / Data",
    items: [
      { name: "OpenAI APIs", level: 80, note: "2y" },
      { name: "RAG / Embeddings", level: 76, note: "2y" },
      { name: "LangChain", level: 68, note: "1–2y" },
      { name: "PyTorch / TensorFlow (foundations)", level: 55, note: "1y" },
      { name: "Telemetry / Observability", level: 60, note: "1–2y" },
    ],
  },
  {
    title: "Cloud / DevOps",
    items: [
      { name: "AWS (EC2, S3, Lambda, RDS)", level: 78, note: "2–3y" },
      { name: "Azure (fundamentals)", level: 55, note: "1y" },
      { name: "Docker / Kubernetes*", level: 70, note: "2y" },
      { name: "CI/CD (GitHub Actions/Jenkins)", level: 72, note: "2y" },
      { name: "IaC (Terraform/CloudFormation*)", level: 58, note: "1y" },
    ],
  },
  {
    title: "XR / 3D",
    items: [
      { name: "Unity / Unreal", level: 60, note: "1–2y" },
      { name: "OpenXR", level: 55, note: "1y" },
    ],
  },
];

export default function ResumePage() {
  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-10">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Experience</h1>
          <p className="text-zinc-400">A concise snapshot of what I’ve built and shipped.</p>
        </div>
        <a
          href="/resume.pdf"
          className="hidden sm:inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-xl transition"
          download
        >
          <span className="inline-block h-2 w-2 rounded-full bg-white/90" />
          Download Resume
        </a>
      </header>

      {/* Experience list */}
      <section className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 md:p-6">
        <ol className="space-y-6">
          {EXPERIENCE.map((item, idx) => (
            <li
              key={idx}
              className="rounded-xl border border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 transition"
            >
              <div className="p-4 md:p-5">
                {/* Top row: company + dates */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="text-base md:text-lg font-semibold">
                    <span className="bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                      {item.company}
                    </span>
                  </div>
                  <div className="text-xs md:text-sm text-zinc-300 bg-zinc-800/60 border border-zinc-700 rounded-full px-3 py-1">
                    {item.start} — {item.end}
                  </div>
                </div>

                {/* Role + location */}
                <div className="mt-1 text-sm md:text-base">
                  <span className="font-medium text-zinc-100">{item.role}</span>
                  <span className="text-zinc-400"> • {item.location}</span>
                </div>

                {/* Bullets */}
                <ul className="mt-3 space-y-2 text-sm text-zinc-300 leading-6">
                  {item.bullets.map((b, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-400/90 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Skills */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Skills</h2>
          <p className="text-zinc-400">Grouped by domain. Bars hint at relative proficiency.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {SKILLS.map((group) => (
            <div
              key={group.title}
              className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 md:p-5"
            >
              <h3 className="text-sm font-medium text-zinc-200 mb-3">{group.title}</h3>

              <ul className="space-y-3">
                {group.items.map((s) => (
                  <li key={s.name}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-100">{s.name}</span>
                      {s.note ? (
                        <span className="text-zinc-400">{s.note}</span>
                      ) : (
                        <span className="text-zinc-500" />
                      )}
                    </div>

                    {"level" in s && typeof s.level === "number" ? (
                      <div className="mt-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${Math.min(Math.max(s.level!, 5), 100)}%` }}
                        />
                      </div>
                    ) : (
                      <div className="mt-1" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
