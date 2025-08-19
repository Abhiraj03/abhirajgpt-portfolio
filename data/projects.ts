// data/projects.ts
import { Project } from "@/types/project";

export const projects: Project[] = [
  // New items to add to data/projects.ts

{
  slug: "abhirajgpt",
  title: "AbhirajGPT",
  oneLiner: "Chat-style portfolio that serves projects, resume, and contact data.",
  skills: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  video: "/videos/abhirajgpt.mp4",
  poster: "/videos/abhirajgpt.jpg",
  aspect: "video",
  category: "Full Stack",
  repo: "", // add if public
  content:
    "A conversational portfolio app that centralizes my data — projects, resume, and tech stack — with a typewriter UI, prompt-driven sections, and a lightweight contact flow."
},

{
  slug: "mern-ai-chatbot",
  title: "MERN ChatBot",
  oneLiner: "ChatGPT-style MERN chatbot with auth and OpenAI integration.",
  skills: ["MongoDB", "Express.js", "React", "Node.js", "TypeScript", "JWT"],
  video: "/videos/aichatbot.mp4",
  poster: "/videos/aichatbot.jpg",
  aspect: "video",
  category: "AI",
  repo: "", // add if public
  content:
    "Built a ChatGPT-inspired chatbot on the MERN stack with JWT sessions, scalable REST APIs, and OpenAI integration. Designed a responsive React UI and deployed with cloud-backed persistence." 
}, // :contentReference[oaicite:0]{index=0}

{
  slug: "patient-management-microservices",
  title: "Patient Management System",
  oneLiner: "Spring Boot microservices for registration, billing, and analytics.",
  skills: ["Spring Boot", "Kafka", "gRPC", "Docker", "JWT"],
  video: "/videos/patientman.mp4",
  poster: "/videos/patientman.png",
  aspect: "video",
  category: "Backend",
  repo: "",
  content:
    "Designed a microservices system with Spring Boot, Kafka, and gRPC, modeling real clinic flows. Implemented JWT auth, containerized services with Docker, and automated infra to enable fast local CI/CD." 
}, // :contentReference[oaicite:1]{index=1}

{
  slug: "product-inventory-catalog",
  title: "Product Inventory Catalog",
  oneLiner: "GraphQL catalog with type-safe schemas and React UI.",
  skills: ["Express.js", "GraphQL", "PostgreSQL", "React", "Apollo Client"],
  video: "/videos/prodinv.mp4",
  poster: "/videos/prodinv.png",
  aspect: "video",
  category: "Full Stack",
  repo: "",
  content:
    "Architected an Express + PostGraphile backend with GraphQL APIs and a React/Apollo frontend. Supported many-to-many supplier relationships and type-safe contracts across the stack." 
}, // :contentReference[oaicite:2]{index=2}

{
  slug: "order-management-go-grpc",
  title: "Order Management with Go & gRPC",
  oneLiner: "Distributed Go services communicating over Protocol Buffers.",
  skills: ["Go", "gRPC", "Protobuf", "Docker"],
  video: "/videos/orderman.mp4",
  poster: "/videos/orderman.png",
  aspect: "video",
  category: "Backend",
  repo: "",
  content:
    "Built distributed Go microservices with gRPC and Protocol Buffers. Load-tested inter-service calls and improved async testability and resilience." 
}, // :contentReference[oaicite:3]{index=3}

{
  slug: "ai-npc-dialog-unity",
  title: "AI-Powered NPC Dialog (Unity)",
  oneLiner: "Natural NPC conversations in VR using GPT-based prompts.",
  skills: ["Unity", "C#", "OpenXR", "GPT APIs", "TTS/ASR"],
  video: "/videos/npcai.mp4",
  poster: "/videos/npcai.png",
  aspect: "video",
  category: "AR/VR",
  repo: "",
  content:
    "Implemented GPT-driven dialog with VR embodiment: voice input, TTS, gesture triggers, and real-time response formatting. Optimized shaders and rendering for smooth Quest 3 playback." 
}, // :contentReference[oaicite:4]{index=4}

{
  slug: "nextgen-badge",
  title: "NextGen Badge",
  oneLiner: "UE5 VR scenarios for empathy & conflict training on Quest 3.",
  skills: ["Unreal Engine 5", "Blueprints", "C++", "MetaHumans", "OpenXR"],
  video: "/videos/nextgen.mp4",
  poster: "/videos/nextgen.jpg",
  aspect: "video",
  category: "AR/VR",
  repo: "", // add if public
  content:
    "Built two immersive scenarios (Traffic Stop, Domestic Call) and deployed to Quest 3. Optimized rendering (Forward/Deferred, Vulkan) cutting GPU use ~25%, and implemented full-body MetaHuman sync for first-person and multiplayer—raising training scenario retention scores by ~10%."
},

{
  slug: "water-treatment-vr",
  title: "Water Treatment VR",
  oneLiner: "Unity Quest simulation used by 1,000+ students in Dreamscape pods.",
  skills: ["Unity", "C#", "OpenXR", "Timeline", "Performance Profiling"],
  video: "/videos/watertreat.mp4",
  poster: "/videos/watertreat.jpg",
  aspect: "video",
  category: "AR/VR",
  repo: "",
  content:
    "Led a 6-member team to build a Unity VR sim of the Scottsdale Water Treatment Plant for Quest/Dreamscape. Built intro/outro, meeting room, and four interactive games; added hand tracking & accessibility; profiled with Unity Profiler/RenderDoc to sustain 72 FPS in live pods for 1,000+ learners."
},

{
  slug: "career-xrcade",
  title: "Career XRcade",
  oneLiner: "Verizon-sponsored Quest VR career explorer (150+ headset deployments).",
  skills: ["Unity", "C#", "OpenXR", "Timeline", "OpenGL ES"],
  video: "/videos/careerxr.mp4",
  poster: "/videos/careerxr.jpg",
  aspect: "video",
  category: "AR/VR",
  repo: "",
  content:
    "Built interactive Unity VR scenarios (e.g., streaming, game design, esports marketing) for high-school students. Maintained stable 72 FPS on Quest and optimized shading/lighting for mobile VR across 150+ deployed headsets."
},

{
  slug: "ai-mock-interview",
  title: "AI Powered Mock Interview",
  oneLiner: "Practice live interviews with real time AI questions and speech to text.",
  skills: ["Next.js", "TypeScript", "Drizzle ORM", "PostgreSQL", "Clerk", "Google Gemini API", "Vercel"],
  video: "/videos/aimockint.mp4",
  poster: "/videos/aimockint.jpg",
  aspect: "video",
  category: "AI",
  repo: "", // add if public
  content:
    "A full stack mock interview platform that generates questions in real time using Gemini. Includes Clerk authentication, Drizzle ORM, and PostgreSQL. Supports speech to text for answers and instant analysis. Deployed on Vercel with a scalable setup and CI CD."
},
{
  slug: "saas-branding-generator",
  title: "AI Driven SaaS Branding Generator",
  oneLiner: "Generate brand copy and keywords using AI with a simple web UI.",
  skills: ["Next.js", "FastAPI", "OpenAI API", "AWS Lambda", "Vercel"],
  video: "/videos/template.mp4",
  poster: "/videos/saas.png",
  aspect: "video",
  category: "AI",
  repo: "", // add if public
  content:
    "An AI powered SaaS that creates branding text and keyword sets for users. Next.js frontend on Vercel and a FastAPI service on AWS Lambda for scale and cost efficiency. Designed for fast responses and easy iteration."
}

  // add more...
];

// Grouped for sections
export const projectsByCategory = {
  "AR/VR": projects.filter(p => p.category === "AR/VR"),
  "Full Stack": projects.filter(p => p.category === "Full Stack"),
  "AI": projects.filter(p => p.category === "AI"),
  "Modeling/Animation": projects.filter(p => p.category === "Modeling/Animation"),
  "GameDev": projects.filter(p => p.category === "GameDev"),
  "Backend": projects.filter(p => p.category === "Backend"),
} as const;

export type ProjectCategory = keyof typeof projectsByCategory;
