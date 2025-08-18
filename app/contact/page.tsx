// app/contact/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import { FaEnvelope, FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";
import { profileData, contactData } from "@/data/responses";

export const metadata: Metadata = { title: "Contact — AbhirajGPT" };

// ---- Swap this when you give me the new banner ----
const BANNER_SRC = "/images/contact-banner.png"; // put your new banner image in /public/images

export default function ContactPage() {
  return (
    <div className="px-6 md:px-10 max-w-5xl mx-auto mb-10">
      {/* HEADER */}
      <header className="pt-8">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Contact Me</h1>
        <p className="mt-2 text-zinc-400">
          Want to collaborate, hire me, or just say hi? I read every message. 👋
        </p>
      </header>

      {/* LINKEDIN-LIKE BANNER */}
      <section className="mt-6 rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-950">
        <div className="relative h-[300px] md:h-[380px]">
          <Image
            src={BANNER_SRC}
            alt="Contact banner"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 960px"
            className="object-cover"
          />
          {/* soft bottom gradient for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        </div>

        {/* PROFILE STRIP (overlaps the banner bottom-left) */}
        <div className="relative px-4 sm:px-6 pb-5">
          {/* avatar */}
          <div className="-mt-5 sm:-mt-50 flex items-center gap-3">
          <div className="relative h-32 w-32 sm:h-40 sm:w-40">
            <Image
              src={profileData.avatar}
              alt={`${profileData.name} headshot`}
              fill
              className="rounded-2xl object-cover ring-2 ring-white/80"
            />
          </div>

            {/* name + socials */}
            <div className="flex-1">
              <div className="text-lg sm:text-xl font-semibold text-white">
                {profileData.name}
              </div>
              <div className="text-sm text-zinc-300">{profileData.location}</div>

              <div className="mt-3 flex flex-wrap gap-2">
                <SocialButton
                  href={contactData.links.email}
                  label="Email"
                  className="bg-sky-600 hover:bg-sky-500 focus:ring-sky-300 text-white"
                >
                  <FaEnvelope />
                </SocialButton>
                <SocialButton
                  href={contactData.links.linkedin}
                  label="LinkedIn"
                  className="bg-[#0A66C2] hover:bg-[#0b5bb0] focus:ring-[#5aa6ff] text-white"
                >
                  <FaLinkedin />
                </SocialButton>
                <SocialButton
                  href={contactData.links.github}
                  label="GitHub"
                  className="bg-zinc-900 hover:bg-black focus:ring-zinc-500 text-white"
                >
                  <FaGithub />
                </SocialButton>
                <SocialButton
                  href={contactData.links.portfolio}
                  label="Portfolio"
                  className="bg-orange-700 hover:bg-orange-600 focus:ring-violet-300 text-white"
                >
                  <FaGlobe />
                </SocialButton>
                <SocialButton
                  href={contactData.links.instagram}
                  label="Instagram"
                  className="bg-violet-600 hover:bg-violet-500 focus:ring-violet-300 text-white"
                >
                  <FaGlobe />
                </SocialButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-950/60 p-6 md:p-8">
        <h2 className="text-lg font-medium mb-4">Send a message</h2>

        <form
          action="https://formspree.io/f/mnnzllra"
          method="POST"
          className="space-y-4"
        >
          <label className="block">
            <span className="text-sm text-zinc-300">Your name</span>
            <input
              type="text"
              name="name"
              required
              placeholder="Jane Doe"
              className="mt-1 w-full bg-zinc-900 border border-zinc-700 rounded-xl px-5 py-3 text-base text-white outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-600/40 transition"
            />
          </label>

          <label className="block">
            <span className="text-sm text-zinc-300">Your email</span>
            <input
              type="email"
              name="email"
              required
              placeholder="jane@example.com"
              className="mt-1 w-full bg-zinc-900 border border-zinc-700 rounded-xl px-5 py-3 text-base text-white outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-600/40 transition"
            />
          </label>

          <label className="block">
            <span className="text-sm text-zinc-300">Message</span>
            <textarea
              name="message"
              rows={6}
              required
              placeholder="Tell me a bit about your idea or question…"
              className="mt-1 w-full bg-zinc-900 border border-zinc-700 rounded-xl px-5 py-3 text-base text-white outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-600/40 transition resize-y"
            />
          </label>

          {/* keep a hidden reason to tag submissions */}
          <input type="hidden" name="reason" value="Contact Page" />
          {/* Formspree helpers */}
          <input type="text" name="_gotcha" className="hidden" />
          <input type="hidden" name="_subject" value="New message via AbhirajGPT Contact" />

          <button
            type="submit"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white text-base font-medium px-6 py-3 rounded-xl shadow transition"
          >
            Send message
          </button>
        </form>

        <p className="text-xs text-zinc-500 mt-3">
          This form uses Formspree. You’ll get replies at the email you enter above.
        </p>
      </section>
    </div>
  );
}

/* ---------- small helper for the colored social buttons ---------- */
function SocialButton({
  href,
  label,
  className = "",
  children,
}: {
  href: string;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium
                  shadow-md focus:outline-none focus:ring-2 transition ${className}`}
    >
      <span className="text-[15px]">{children}</span>
      <span>{label}</span>
    </a>
  );
}
