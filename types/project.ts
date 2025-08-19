// types/project.ts
export type Project = {
  slug: string;
  title: string;
  oneLiner: string;
  skills: string[];
  video: string;         // e.g. "/videos/cloud-harvester.mp4"
  poster?: string;       // e.g. "/videos/cloud-harvester.jpg"
  aspect?: "video" | "square";
  category: "AR/VR" | "Full Stack" | "AI" | "Modeling/Animation" | "GameDev" | "Backend";
  repo?: string;
  live?: string;
  content?: string;
};
