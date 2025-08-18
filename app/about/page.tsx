// app/about/page.tsx
import type { Metadata } from "next";
import AboutGallery from "../components/about/AboutGallery";
import { AboutHero, AboutMore } from "../components/about/AboutHero";

export const metadata: Metadata = { title: "About — AbhirajGPT" };

export default function AboutPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-10">
      <AboutHero />

      <AboutMore
        bio="I am a full stack developer who ships AI and VR experiences with a focus on fast feedback, clean architecture, and small touches that feel alive. I enjoy owning projects from idea to launch and iterating with real users."
        booksByGenre={{
          Fantasy: [
            { title: "Mistborn" },
            { title: "The Name of the Wind" },
            { title: "The Way of Kings" },
          ],
          "Sci Fi": [
            { title: "Project Hail Mary" },
            { title: "Dune" },
            { title: "The Three Body Problem" },
          ],
          "Self Help": [
            { title: "Atomic Habits" },
            { title: "Deep Work" },
            { title: "Make Time" },
          ],
        }}
        bookCovers={{
          Fantasy: [
            "/covers/mistborn.jpg",
            "/covers/name-of-the-wind.jpg",
            "/covers/way-of-kings.jpg", // must match your file exactly
          ],
          "Sci Fi": [
            "/covers/project-hail-mary.jpg",
            "/covers/dune.jpg",
            "/covers/three-body.jpg",
          ],
          "Self Help": [
            "/covers/atomic-habits.jpg",
            "/covers/deep-work.jpg",
            "/covers/make-time.jpg",
          ],
        }}
        games={[
          // ensure these files exist or swap to your /images/* for now
          { src: "/games/elden-ring.jpg", alt: "Elden Ring" },
          { src: "/games/hades.jpg", alt: "Hades" },
          { src: "/games/portal2.jpg", alt: "Portal 2" },
          { src: "/games/zelda-totk.jpg", alt: "Zelda TOTK" },
          { src: "/games/factorio.jpg", alt: "Factorio" },
          { src: "/games/Witcher3.jpg", alt: "Witcher3" },
        ]}
        badges={[
          { title: "Quest Build Shipped", desc: "Used by one thousand students", color: "border-sky-400" },
          { title: "Realtime Comms", desc: "MQTT and calling module", color: "border-amber-400" },
          { title: "Scaled Next.js", desc: "AWS deploy with CI", color: "border-emerald-400" },
          { title: "Obs and Perf", desc: "Profiling and tracing", color: "border-rose-400" },
          { title: "AI Prototyper", desc: "RAG and assistants", color: "border-violet-400" },
        ]}
      />

      <AboutGallery
        items={[
          { src: "/images/abhiraj.jpg", alt: "Square", size: "square" },
          { src: "/images/image2.png", alt: "Wide", size: "square" },
          { src: "/images/image3.png", alt: "Square" },
          { src: "/images/image8.jpg", alt: "Tall", size: "vertical" },
          { src: "/images/image4.png", alt: "Square" },
          { src: "/images/image5.jpg", alt: "Tall", size: "vertical" },
          { src: "/images/image6.jpg", alt: "Square" },
          { src: "/images/image7.JPG", alt: "Tall", size: "vertical" },
          { src: "/images/image9.jpg", alt: "Wide", size: "horizontal" },
          { src: "/images/image10.png", alt: "Square" },
        ]}
      />
    </div>
  );
}
