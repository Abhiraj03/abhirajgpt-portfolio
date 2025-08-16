// app/about/page.tsx
import type { Metadata } from "next";
import AboutGallery from "../components/about/AboutGallery";
import { AboutHero, AboutMore } from "../components/about/AboutHero";

export const metadata: Metadata = { title: "About — AbhirajGPT" };

export default function AboutPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-10">
      <AboutHero />

      {/* new content below */}
      <AboutMore
        bio="I am a full stack developer who ships AI and VR experiences with a focus on fast feedback, clean architecture, and small touches that feel alive. I enjoy owning projects from idea to launch and iterating with real users."
        booksByGenre={{
          Fantasy: [{ title: "Mistborn" }, { title: "The Name of the Wind" }, { title: "The Way of Kings" }],
          "Sci Fi": [{ title: "Project Hail Mary" }, { title: "Dune" }, { title: "The Three Body Problem" }],
          "Self Help": [{ title: "Atomic Habits" }, { title: "Deep Work" }, { title: "Make Time" }],
        }}
        bookCovers={{
          Fantasy: ["/covers/mistborn.jpg", "/covers/name-of-the-wind.jpg", "/covers/way-of-kings.jpg"],
          "Sci Fi": ["/covers/project-hail-mary.jpg", "/covers/dune.jpg", "/covers/three-body.jpg"],
          "Self Help": ["/covers/atomic-habits.jpg", "/covers/deep-work.jpg", "/covers/make-time.jpg"],
        }}
        games={[
          { src: "/games/elden-ring.jpg", alt: "Elden Ring" },
          { src: "/games/hades.jpg", alt: "Hades" },
          { src: "/games/portal2.jpg", alt: "Portal 2" },
          { src: "/games/zelda-totk.jpg", alt: "Zelda TOTK" },
          { src: "/games/factorio.jpg", alt: "Factorio" },
          { src: "/games/celeste.jpg", alt: "Celeste" },
        ]}
        badges={[
          { title: "Quest Build Shipped", desc: "Used by one thousand students", color: "border-sky-400" },
          { title: "Realtime Comms", desc: "MQTT plus calling module", color: "border-amber-400" },
          { title: "Scaled Next.js", desc: "AWS deploy with CI", color: "border-emerald-400" },
          { title: "Obs & Perf", desc: "Profiling and tracing", color: "border-rose-400" },
          { title: "AI Prototyper", desc: "RAG and assistants", color: "border-violet-400" },
        ]}
      />

            <AboutGallery
        items={[
          { src: "/images/abhiraj.jpg", alt: "Square", size: "square" },
          { src: "/images/abhiraj.jpg", alt: "Wide", size: "horizontal" },
          { src: "/images/abhiraj.jpg", alt: "Square" },
          { src: "/images/abhiraj.jpg", alt: "Square" },
          { src: "/images/abhiraj.jpg", alt: "Tall", size: "vertical" },
          { src: "/images/abhiraj.jpg", alt: "Square" },
          { src: "/images/abhiraj.jpg", alt: "Square" },
          { src: "/images/abhiraj.jpg", alt: "Tall", size: "vertical" },
          { src: "/images/abhiraj.jpg", alt: "Wide", size: "horizontal" },
          { src: "/images/abhiraj.jpg", alt: "Square" },
          { src: "/images/abhiraj.jpg", alt: "Square" },
          { src: "/images/abhiraj.jpg", alt: "Square" },
        ]}
      />

    </div>
  );
}
