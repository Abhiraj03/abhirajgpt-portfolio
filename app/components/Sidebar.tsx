// app/components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiMessageSquare, FiFolder, FiFileText, FiMail, FiUser } from "react-icons/fi";

const items = [
  { href: "/", label: "New Chat", icon: FiMessageSquare },
  { href: "/projects", label: "Projects", icon: FiFolder },
  { href: "/resume", label: "Resume", icon: FiFileText },
  { href: "/contact", label: "Contact", icon: FiMail },
  { href: "/about", label: "About Me", icon: FiUser },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
    
  useEffect(() => {
    setMounted(true);
  }, []);

  const reloadHome = () => {
    window.location.href = "/";
  };

  return (
    <aside className="w-64  p-4 flex flex-col" style={{ backgroundColor: "rgb(0,0,0)" }}>
      {/* Logo */}
      <button onClick={reloadHome} className="mb-6 cursor-pointer">
        <img src="/AbhirajGPT.png" alt="Logo" className="w-12 h-12" />
      </button>
      <nav className="flex flex-col gap-2">
        {items.map((item) => {
          const active = mounted && pathname === item.href;
          const Icon = item.icon;

          if (item.label === "New Chat") {
            return (
              <button
                key={item.label}
                onClick={reloadHome}
                className={`flex items-center gap-2 text-left px-3 py-2 rounded transition mb-3 cursor-pointer ${
                  active ? "bg-gray-800 text-white" : "hover:bg-gray-800 text-zinc-300"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 text-left px-3 py-2 rounded transition
                ${active ? "bg-gray-800 text-white" : "hover:bg-gray-800 text-zinc-300"} ${ item.label === "New Chat" ? "mb-3" : "" }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
