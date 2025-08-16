"use client";
import { motion } from "framer-motion";
import { JSX, useMemo, useState } from "react";
import {
  SiNextdotjs, SiReact, SiNodedotjs, SiTypescript, SiJavascript, SiPython,
  SiTensorflow, SiPytorch, SiAmazon, SiPostgresql, SiMysql, SiMongodb,
  SiUnity, SiUnrealengine, SiDocker, SiKubernetes, SiVercel, SiPrisma,
  SiGit, SiGithub, SiRedis, SiGooglecloud, SiTailwindcss, SiOpenai
} from "react-icons/si";
import { TbTool, TbCpu, TbDatabase, TbServer, TbCloud } from "react-icons/tb";

type TechStackData = Record<string, string[]>;

export default function TechStack({ data }: { data: TechStackData }) {
  const categories = useMemo(() => Object.keys(data), [data]);
  const [active, setActive] = useState<string>("All");

  const iconFor = (name: string): JSX.Element => {
    const k = name.toLowerCase();
    if (k.includes("openai")) return <SiOpenai />;
    if (k.includes("next")) return <SiNextdotjs />;
    if (k.includes("react")) return <SiReact />;
    if (k.includes("tailwind")) return <SiTailwindcss />;
    if (k.includes("node")) return <SiNodedotjs />;
    if (k.includes("typescript")) return <SiTypescript />;
    if (k.includes("javascript")) return <SiJavascript />;
    if (k.includes("python")) return <SiPython />;
    if (k.includes("pytorch")) return <SiPytorch />;
    if (k.includes("tensor")) return <SiTensorflow />;
    if (k.includes("aws")) return <SiAmazon />;
    if (k.includes("gcp")) return <SiGooglecloud />;
    if (k.includes("postgres")) return <SiPostgresql />;
    if (k.includes("mysql")) return <SiMysql />;
    if (k.includes("mongo")) return <SiMongodb />;
    if (k.includes("redis")) return <SiRedis />;
    if (k.includes("docker")) return <SiDocker />;
    if (k.includes("kubernetes") || k === "k8s") return <SiKubernetes />;
    if (k.includes("vercel")) return <SiVercel />;
    if (k.includes("prisma")) return <SiPrisma />;
    if (k.includes("git") && !k.includes("github")) return <SiGit />;
    if (k.includes("github")) return <SiGithub />;
    if (k.includes("unity")) return <SiUnity />;
    if (k.includes("unreal")) return <SiUnrealengine />;
    if (k.match(/db|sql|database|postgres|mysql|mongo/)) return <TbDatabase />;
    if (k.match(/backend|api|server|go|java/)) return <TbServer />;
    if (k.match(/cloud|devops|infra/)) return <TbCloud />;
    if (k.match(/ai|ml|llm|cv|nlp/)) return <TbCpu />;
    return <TbTool />;
  };

  const headerIconFor = (category: string) => {
    const k = category.toLowerCase();
    if (k.match(/db|data/)) return <TbDatabase className="opacity-80" />;
    if (k.match(/backend|server/)) return <TbServer className="opacity-80" />;
    if (k.match(/cloud|devops|infra/)) return <TbCloud className="opacity-80" />;
    if (k.match(/ai|ml/)) return <TbCpu className="opacity-80" />;
    if (k.match(/frontend|ui|web|full/)) return <SiReact className="opacity-80" />;
    return <TbTool className="opacity-80" />;
  };

  // Split a list into rows like 2,3,2,3...
  const chunkByPattern = (items: string[], pattern = [2, 3]) => {
    const out: string[][] = [];
    let i = 0, p = 0;
    while (i < items.length) {
      const take = Math.min(pattern[p % pattern.length], items.length - i);
      out.push(items.slice(i, i + take));
      i += take; p++;
    }
    return out;
  };

  const isVisible = (cat: string) => active === "All" || active === cat;

  return (
    <div className="space-y-6">
      {/* filter chips */}
      <div className="flex flex-wrap gap-2">
        {["All", ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-3 py-1.5 rounded-full text-sm border transition cursor-pointer
              ${active === cat ? "bg-blue-600 text-white border-blue-500" : "bg-zinc-800 border-zinc-700 hover:bg-zinc-700"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* categories besides each other */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {categories.filter(isVisible).map((cat, idx) => (
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, delay: idx * 0.04 }}
            className="rounded-2xl border border-zinc-700 bg-zinc-900/70 p-4 shadow"
          >
            {/* header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">{headerIconFor(cat)}</span>
                <h3 className="text-sm font-semibold tracking-tight">{cat}</h3>
              </div>
              <span className="text-[10px] uppercase tracking-wider text-zinc-400">Layer</span>
            </div>

            {/* brick-style stacked rows */}
            <div className="mt-3 flex flex-col gap-2">
            {data[cat].map((tool) => (
                <span
                key={tool}
                className="inline-flex items-center gap-2 bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-1.5 text-sm shadow-sm justify-start"
                title={tool}
                >
                <span className="text-base">{iconFor(tool)}</span>
                <span className="leading-none">{tool}</span>
                </span>
            ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
