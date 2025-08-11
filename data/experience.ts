// data/experience.ts
export type Experience = {
  id: string;
  role: string;
  company: string;
  logo?: string;
  location?: string;
  start: string; // "2024-08"
  end?: string;  // "2025-05" or undefined for "Present"
  summary: string;
  bullets: string[];
  skills: string[];
  links?: { label: string; href: string }[];
};

export const experiences: Experience[] = [
  {
    id: "tweebaa",
    role: "Software Development Engineer Intern",
    company: "Tweebaa Inc",
    logo: "/logos/tweebaa.png",
    location: "Tempe, AZ",
    start: "2024-08",
    end: "2025-05",
    summary:
      "Built payments + microservices; shipped tracing and CI to speed releases.",
    bullets: [
      "Kotlin REST APIs for PayPal/Stripe (multi‑currency) → +20% success rate",
      "Deployed on AWS (EC2, S3, Lambda); reduced release cycle by ~30%",
      "JUnit + Postman coverage across 10+ features",
    ],
    skills: ["Kotlin", "AWS", "Microservices", "PayPal", "Stripe", "CI/CD"],
    links: [{ label: "Play Store", href: "#" }],
  },
  {
    id: "terrafresh",
    role: "Software Developer Analyst",
    company: "Terra‑Fresh",
    logo: "/logos/terrafresh.png",
    location: "Tempe, AZ",
    start: "2023-02",
    end: "2024-07",
    summary:
      "ML trend prediction pipelines and data APIs at scale.",
    bullets: [
      "Scraped +32M records (USDA, Google Trends) on AWS EC2",
      "Express.js + PostgreSQL + Kafka pipelines for low‑latency insights",
      "Managed RDS (PostgreSQL/MySQL) syncing >1M rows",
    ],
    skills: ["Node.js", "Express", "PostgreSQL", "Kafka", "AWS", "Python"],
  },
  {
    id: "asu-ra",
    role: "Undergraduate Research Assistant",
    company: "Arizona State University",
    logo: "/logos/asu.png",
    location: "Tempe, AZ",
    start: "2022-03",
    end: "2022-11",
    summary:
      "Built simulation tools with PyReason/NetworkX over large graphs.",
    bullets: [
      "Modeled supply‑chain disruption on 1.6M‑node Soc‑Pocket dataset",
      "Improved data quality by ~35% via profiling + feature engineering",
      "Spark batch jobs to clean/prep datasets for ML experiments",
    ],
    skills: ["Python", "NetworkX", "Spark", "Pandas", "ML"],
    links: [{ label: "PyReason paper", href: "http://arxiv.org/abs/2302.13482" }],
  },
];
