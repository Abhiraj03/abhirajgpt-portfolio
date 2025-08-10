// data/projects.ts
import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "cloud-harvester",
    title: "Cloud Harvester",
    oneLiner: "First-person sim harvesting water from clouds.",
    skills: ["Unreal Engine", "C++", "Blueprints"],
    video: "/videos/cloud-harvester.mp4",
    poster: "/videos/cloud-harvester.jpg",
    aspect: "video",
    category: "GameDev",
    repo: "https://github.com/abhirajc/cloud-harvester",
    content:
      "A first-person simulator where you collect water from clouds and sell it as premium rainwater. Features upgrades, weather systems, and progression.",
  },
  {
    slug: "cloud-harvester1",
    title: "Cloud Harvester",
    oneLiner: "First-person sim harvesting water from clouds.",
    skills: ["Unreal Engine", "C++", "Blueprints"],
    video: "/videos/cloud-harvester.mp4",
    poster: "/videos/cloud-harvester.jpg",
    aspect: "video",
    category: "GameDev",
    repo: "https://github.com/abhirajc/cloud-harvester",
    content:
      "A first-person simulator where you collect water from clouds and sell it as premium rainwater. Features upgrades, weather systems, and progression.",
  },
  {
    slug: "cloud-harvester1111",
    title: "Cloud Harvester",
    oneLiner: "First-person sim harvesting water from clouds.",
    skills: ["Unreal Engine", "C++", "Blueprints"],
    video: "/videos/cloud-harvester.mp4",
    poster: "/videos/cloud-harvester.jpg",
    aspect: "video",
    category: "GameDev",
    repo: "https://github.com/abhirajc/cloud-harvester",
    content:
      "A first-person simulator where you collect water from clouds and sell it as premium rainwater. Features upgrades, weather systems, and progression.",
  },
  {
    slug: "cloud-harvester111",
    title: "Cloud Harvester",
    oneLiner: "First-person sim harvesting water from clouds.",
    skills: ["Unreal Engine", "C++", "Blueprints"],
    video: "/videos/cloud-harvester.mp4",
    poster: "/videos/cloud-harvester.jpg",
    aspect: "video",
    category: "GameDev",
    repo: "https://github.com/abhirajc/cloud-harvester",
    content:
      "A first-person simulator where you collect water from clouds and sell it as premium rainwater. Features upgrades, weather systems, and progression.",
  },
  {
    slug: "chess-vs-ai",
    title: "Chess vs AI",
    oneLiner: "Complete chess with AI, now porting to TS Canvas.",
    skills: ["TypeScript", "Canvas", "Python"],
    video: "/videos/cloud-harvester.mp4",
    poster: "/videos/cloud-harvester.jpg",
    aspect: "video",
    category: "Full Stack",
    repo: "https://github.com/abhirajc/chess-ai",
    content:
      "Rebuilt the Python chess engine in TypeScript + Canvas with drag-and-drop, theming, and sounds.",
  },
  {
    slug: "water-treatment-vr",
    title: "Water Treatment VR",
    oneLiner: "Unity Quest experience used by 1000+ students.",
    skills: ["Unity", "C#", "XR Interaction"],
    video: "/videos/cloud-harvester.mp4",
    poster: "/videos/cloud-harvester.jpg",
    category: "AR/VR",
    content:
      "A Quest-based VR simulation of a real water treatment plant, deployed to Dreamscape pods for biomedical education.",
  },
  // add more...
];

// Grouped for sections
export const projectsByCategory = {
  "AR/VR": projects.filter(p => p.category === "AR/VR"),
  "Full Stack": projects.filter(p => p.category === "Full Stack"),
  "AI": projects.filter(p => p.category === "AI"),
  "Modeling/Animation": projects.filter(p => p.category === "Modeling/Animation"),
  "GameDev": projects.filter(p => p.category === "GameDev"),
} as const;

export type ProjectCategory = keyof typeof projectsByCategory;
