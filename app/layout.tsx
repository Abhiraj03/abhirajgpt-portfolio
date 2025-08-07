import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AbhirajGPT",
  description: "A personal AI-style portfolio for Abhiraj Chaudhary",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-gray-950 text-white`}>
        <div className="flex h-screen">
          {/* Sidebar */}
          <aside className="w-64 bg-gray-900 p-4 flex flex-col">
            <h1 className="text-2xl font-bold mb-6 ">AbhirajGPT</h1>
            <nav className="flex flex-col gap-2">
              <button className="text-left hover:bg-gray-800 px-3 py-2 rounded">About Me</button>
              <button className="text-left hover:bg-gray-800 px-3 py-2 rounded">Projects</button>
              <button className="text-left hover:bg-gray-800 px-3 py-2 rounded">Resume</button>
              <button className="text-left hover:bg-gray-800 px-3 py-2 rounded">Contact</button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
