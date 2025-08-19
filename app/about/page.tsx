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
        bio={`I grew up in India and came to the United States to study Computer Science at Arizona State University, searching for purpose and new opportunities. Along the way, I discovered my passion for building things that feel alive — from scalable software to immersive XR experiences.  

- I enjoy creating full stack applications with clean architecture and fast feedback.  
- I love experimenting with AI, VR, and games to push creative boundaries.  
- I thrive on taking projects from idea to launch, iterating with real users along the way.

My motivation is simple: keep learning, keep building, and keep turning ideas into experiences that inspire people.`}

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
          { title: "VR App Shipped", desc: "Built and deployed a Quest VR project used by 1,000+ students", color: "border-sky-400" },
          { title: "Payment Integration", desc: "Integrated PayPal & Stripe, improving success rate by 20%", color: "border-amber-400" },
          { title: "Web Platform Scaling", desc: "Optimized supply chain platform, cutting load times by 40% and doubling user visits", color: "border-emerald-400" },
          { title: "AI Prototypes", desc: "Developed RAG-based assistants and AI-driven tools for real-world use cases", color: "border-violet-400" },
          { title: "Cross-Platform Sharing", desc: "Led feature launch that boosted user engagement by 25% at Tweebaa", color: "border-indigo-400" },
          { title: "Cloud Deployments", desc: "Deployed full-stack Next.js apps on AWS with CI/CD pipelines", color: "border-teal-400" },
          { title: "Research & Analysis", desc: "Conducted network failure analysis to improve supply chain resilience", color: "border-rose-400" },
          { title: "Open Source & Games", desc: "Built and shared projects like Chess vs AI and Cloud Harvester on GitHub", color: "border-yellow-400" }
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
