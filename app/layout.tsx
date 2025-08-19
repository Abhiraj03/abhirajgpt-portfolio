import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AbhirajGPT - Portfolio",
  description: "A personal AI-style portfolio for Abhiraj Chaudhary",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} text-white`}>
        {/* global background gradient */}
        <div className="fixed inset-0 -z-20 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950" />

        {/* soft blur bubbles like ChatGPT */}
        <DecorativeBG />

        <div className="flex h-screen relative z-0">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

/** Blurry color blobs – fixed behind everything, no scrollbars */
function DecorativeBG() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* left/top pink blob */}
      <div
        className="
          absolute -top-24 -left-24
          h-[520px] w-[520px]
          rounded-full bg-yellow-500/20
          blur-[120px]
        "
      />
      {/* right/bottom blue blob */}
      <div
        className="
          absolute -bottom-24 -right-20
          h-[560px] w-[560px]
          rounded-full bg-sky-500/20
          blur-[140px]
        "
      />
      {/* optional center/purple wash for depth */}
      <div
        className="
          absolute top-1/2 left-1/4 -translate-x-1/2
          h-[700px] w-[700px]
          rounded-full bg-violet-500/15
          blur-[140px]
        "
      />
      {/* optional center/purple wash for depth */}
      <div
        className="
          absolute bottom-1/2 left-1/3 translate-x-1/2
          h-[600px] w-[600px]
          rounded-full bg-green-500/15
          blur-[140px]
        "
      />
    </div>
  );
}
