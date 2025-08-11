// app/about/page.tsx
import type { Metadata } from "next";
import AboutGallery from "../components/about/AboutGallery";
import AboutHero from "../components/about/AboutHero";
import { gallery } from "@/data/about";

export const metadata: Metadata = { title: "About — AbhirajGPT" };



export default function AboutPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-10">
      <AboutHero />
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