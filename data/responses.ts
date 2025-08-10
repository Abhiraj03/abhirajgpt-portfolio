export const resumeData = {
    message: "You can download my resume or view the preview below.",
    image: "/resume-preview.jpg",
    download: "/resume.pdf",
}

export const projectsData = [
  {
    title: "Cloud Harvester",
    description: "A first-person simulator game where players collect water from clouds and sell it as premium bottled rainwater.",
    techStack: ["Unreal Engine", "C++", "Blueprints"],
    image: "/projects/image1.png",
    github: "https://github.com/abhirajc/cloud-harvester",
  },
  {
    title: "Chess vs AI",
    description: "A complete chess game with AI logic, built with Python and now being rebuilt in TypeScript + Canvas.",
    techStack: ["Python", "TypeScript", "Canvas API"],
    image: "/projects/image2.png",
    github: "https://github.com/abhirajc/chess-ai",
  },
]

export const contactData = {
    message: "Feel free to reach out to me or drop your contact details below.",
    links: {
        email: "mailto:rajabhirajusa@gmail.com",
        linkedin: "https://www.linkedin.com/in/abhiraj-chaudhary/",
        github: "https://github.com/Abhiraj03",
        portfolio: "https://abhirajc.com",
    },
}

export const techStackData = {
  "Full Stack": ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
  "AI / ML": ["OpenAI API", "LangChain", "TensorFlow", "Python"],
  "VR / 3D": ["Unity", "C#", "Unreal Engine", "OpenXR"],
}

export const profileData = {
  name: "Abhiraj Chaudhary",
  avatar: "/images/abhiraj.jpg", // put your image in public/images
  headline: "Software developer focused on AI, VR, and full stack",
  location: "Tempe, Arizona",
  bioBullets: [
    "B.S. Computer Science, Arizona State University, 2025",
    "Builds AI, VR, and full stack apps",
    "Comfortable with Unreal, Unity, Next.js, Node, AWS",
  ],
  funFacts: [
    "Daily gym and long walks enjoyer",
    "Sci fi and anime fan",
    "Dreams in almost every sleep cycle",
  ],
  // reuse your existing contactData.links if you want buttons here
};