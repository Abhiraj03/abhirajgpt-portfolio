import { ins } from "framer-motion/client";

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
        instagram: "https://www.instagram.com/_abhiraj_chaudhary_/",
    },
}

export const techStackData = {
  "Languages": ["TypeScript", "JavaScript", "Python", "Java", "C++", "C#"],
  "Frontend": ["React", "Angular", "Next.js", "Vue 3", "Bootstrap", "Tailwind CSS", "HTML5", "CSS3"],
  "Backend & APIs": ["Node.js", "Express.js", "Django", "Flask", "Spring Boot", "REST", "GraphQL"],
  "Databases": ["PostgreSQL", "MySQL", "MongoDB", "DynamoDB"],
  "Cloud & Infrastructure": ["AWS (EC2, S3, Lambda, RDS)", "Docker", "Kubernetes", "Terraform", "Azure"],
  "DevOps & Tools": ["GitHub Actions", "Jenkins", "Git", "Jira"],
  "Data & ML": ["Airflow", "PyTorch", "TensorFlow", "Scikit-learn", "Pandas"],
  "XR & Graphics": ["Unity", "Unreal Engine 5", "OpenXR", "Oculus Quest", "VR Interactions", "Shader Graph"],
  "Security & Auth": ["JWT", "OAuth"]
}



export const profileData = {
  name: "Abhiraj Chaudhary",
  avatar: "/images/abhiraj.jpg", // put your image in public/images
  headline: "Software Engineer | AI, XR, and Full-Stack Development | Cloud & Scalable Systems",
  location: "Tempe, Arizona",
  bioBullets: [
  "B.S. Computer Science, Arizona State University (GPA 4.0), graduating 2025",
  "Skilled in Python, JavaScript, C++, C#, TypeScript, and Flutter",
  "Builds scalable full-stack apps with React, Angular, Node.js, Django, Flask, Spring Boot, and GraphQL",
  "Experienced with AWS, PostgreSQL, MongoDB, and cloud architectures for secure, high-performance applications",
  "Software Developer Intern @ Tweebaa – integrated PayPal & Stripe (20% more successful transactions) and built sharing features (25% more engagement)",
  "XR Developer @ Meteor Studio – created immersive AR/VR experiences in Unity, Unreal Engine, and OpenXR",
  "Optimized agricultural supply chain platform – reduced load times by 40% and increased user visits by 200%",
  "Passionate about bridging AI, XR, and scalable software engineering to deliver impactful solutions"
  ],
    funFacts: [
    "Currently learning Japanese",
    "Love making games in Unreal Engine and Quest 3",
    "Enjoy reading fantasy books — currently reading 'Name of the Wind'",
    "Big fan of horror movies",
    "Love traveling to new places"
  ],
  // reuse your existing contactData.links if you want buttons here
};