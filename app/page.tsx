'use client'
import { JSX, useState } from 'react'
import { resumeData, projectsData, contactData, techStackData } from "../data/responses"
import ProjectCard from './components/ProjectCard'

export default function Home() {
  const [activePrompt, setActivePrompt] = useState<string | null>(null);
  const [responsePrompt, setResponsePrompt] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState({name: '', email: '', message: ''});
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactForm({...contactForm, [e.target.name]: e.target.value });
  }

  const promptResponses: Record<string, JSX.Element> = {
    "Who are you?": <p>I'm Abhiraj, a software developer passionate about building AI, VR, and full-stack apps.</p>,
    "What's your resume?": (
      <div className="space-y-4">
        <p>{resumeData.message}</p>
        <a href={resumeData.download} download className="underline text-blue-400 hover:text-blue-300">
          Download Resume
        </a>
        <img
          src={resumeData.image}
          alt="Resume preview"
          className="rounded-lg border border-zinc-700 cursor-pointer hover:opacity-90"
        />
      </div>
    ),
    "Show me your projects": (
      <div className='space-y-6'>
        <p>Here are some of the projects I've worked on:</p>
        <div className='grid gap-6 sm:grid-cols-1 md:grid-cols-2'>
          {projectsData.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    ),
    "How to contact you?": (
      <div className="space-y-6">
      <p>{contactData.message}</p>

      {/* Social Links */}
      <div className="flex flex-wrap gap-4">
        {Object.entries(contactData.links).map(([label, url]) => (
          <a
            key={label}
            href={url}
            target="_blank"
            className="bg-zinc-800 px-4 py-2 rounded-lg shadow text-sm hover:bg-zinc-700 transition-all"
          >
            {label.charAt(0).toUpperCase() + label.slice(1)}
          </a>
        ))}
      </div>

      {/* Contact Form */}
      <form className="space-y-4 max-w-md">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={contactForm.name}
          onChange={handleInputChange}
          className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-2 text-white text-sm focus:outline-none"
        />
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={contactForm.email}
          onChange={handleInputChange}
          className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-2 text-white text-sm focus:outline-none"
        />
        <textarea
          name="message"
          placeholder="Your message"
          rows={4}
          value={contactForm.message}
          onChange={handleInputChange}
          className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-2 text-white text-sm focus:outline-none"
        />
        <button
          type="submit"
          disabled
          className="bg-blue-600 px-4 py-2 rounded text-white text-sm opacity-50 cursor-not-allowed"
        >
          Send (Coming soon)
        </button>
      </form>
    </div>
    ),
    "What's your tech stack?": (
      <div className="space-y-6">
        <p>Here&rsquo;s what I use across different domains of development:</p>

        {Object.entries(techStackData).map(([category, tools]) => (
          <div key={category}>
            <h3 className="text-base font-semibold mb-2">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool, index) => (
                <span
                  key={index}
                  className="bg-zinc-800 text-sm px-3 py-1 rounded-full text-white border border-zinc-700"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    ),
  }

  const prompts = Object.keys(promptResponses);

  return (
    <div className="flex flex-col h-screen w-full items-center justify-between px-4 py-8">

      {/* If no prompt selected → show centered heading + buttons */}
      {!activePrompt  ? (
        <div className="flex flex-col items-center justify-center flex-1 text-center gap-8">
          <h1 className="text-2xl md:text-3xl font-medium">Where should we begin?</h1>

          <div className="bg-zinc-800 rounded-full px-4 py-4 w-full max-w-4xl shadow-lg">
            <div className="flex flex-wrap gap-2 justify-center">
              {prompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={async () => {
                    setActivePrompt(prompt); // show user message immediately
                    setLoading(true);
                    setResponsePrompt(null); // clear old response while "typing"
                    await new Promise((res) => setTimeout(res, 800));
                    setResponsePrompt(prompt); // show new response after delay
                    setLoading(false);
                  }}
                  className="bg-zinc-700 text-sm text-white px-4 py-2 rounded-full hover:bg-zinc-600 transition-all"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
          <>
            {/* Chat Area */}
            <div className="flex-1 w-full overflow-y-auto custom-scroll px-4 pt-6">
              <div className="max-w-2xl mx-auto space-y-6">
                {/* User prompt bubble */}
                <div className="flex justify-end">
                  <div className="bg-gray-700 px-4 py-2 rounded-4xl text-white max-w-sm">
                    {activePrompt}
                  </div>
                </div>

                {/* GPT reply */}
                {loading ? (
                  <div className="text-sm text-zinc-400 font-mono animate-pulse">Typing...</div>
                  ) : responsePrompt ? (
                  <div className="text-sm whitespace-pre-wrap">
                    {promptResponses[responsePrompt]}
                  </div>
                ): null}
              </div>
            </div>

            {/* Bottom input bar with buttons */}
            <div className="mt-4 bg-zinc-800 rounded-full px-4 py-4 w-full max-w-4xl shadow-lg">
              <div className="flex flex-wrap gap-2 justify-center">
                {prompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={ async () => {
                      setActivePrompt(prompt); // show user message immediately
                      setLoading(true);
                      setResponsePrompt(null); // clear old response while "typing"
                      await new Promise((res) => setTimeout(res, 800));
                      setResponsePrompt(prompt); // show new response after delay
                      setLoading(false);
                    }}
                    className="bg-zinc-700 text-sm text-white px-5 py-2 rounded-full hover:bg-zinc-600 transition-all"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
    </div>
  )
}
