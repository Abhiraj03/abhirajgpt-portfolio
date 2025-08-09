'use client'
import { JSX, useState, useEffect, useRef } from 'react'
import { resumeData, projectsData, contactData, techStackData } from "../data/responses"
import { motion, AnimatePresence, easeOut } from 'framer-motion';
import ProjectCard from './components/ProjectCard';

export default function Home() {
  type Msg = { id: string; role: 'user' | 'assistant'; content: JSX.Element | string };
  const [messages, setMessages] = useState<Msg[]>([]);
  const [loadingPrompt, setLoadingPrompt] = useState<string | null>(null);

  const sendPrompt = async (prompt: string) => {
    if(loadingPrompt) return; // prevent multiple clicks

    // add user message
    setMessages(prev => [...prev, {id: crypto.randomUUID(), role: 'user', content: prompt}]);

    // show typing indicator tied to this prompt
    setLoadingPrompt(prompt);

    // fake latency
    await new Promise(res => setTimeout(res, 800));

    // add assistant reply based on prompt
    const reply = promptResponses[prompt] ?? <p>Sorry, I do not have an answer for that yet.</p>;
    setMessages(prev => [...prev, {id: crypto.randomUUID(), role: 'assistant', content: reply}]);
    setLoadingPrompt(null); // clear loading state
  }

  const [contactForm, setContactForm] = useState({name: '', email: '', message: ''});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactForm({...contactForm, [e.target.name]: e.target.value });
  }

  const promptResponses: Record<string, JSX.Element> = {
    "Who are you?": <p>I&rsquo;m Abhiraj, a software developer passionate about building AI, VR, and full-stack apps.</p>,
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
    "Show me your projects.": (
      <div className='space-y-6'>
        <p>Here are some of the projects I&rsquo;ve worked on:</p>
        <div className='grid gap-6 sm:grid-cols-1 md:grid-cols-2'>
          {projectsData.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
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
    
  }

  const prompts = Object.keys(promptResponses);
  
  const listRef = useRef<HTMLDivElement>(null);

  const fadeSlide = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit:    { opacity: 0, y: -12 },
    transition: { duration: 0.4, ease: easeOut }
  }

  const listVariants = {
    animate: {
      transition: {
        staggerChildren: 0.05, // tiny rhythm between bubbles
      },
    },
  };

  const msgVariants = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    // scroll to bottom on mount
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loadingPrompt]);

  return (
    <div className="flex flex-col h-screen w-full items-center justify-between px-4 py-8">
      <AnimatePresence mode="wait">
        {/* If no prompt selected → show centered heading + buttons */}
        {messages.length === 0  ? (
          <motion.div key='landing' {...fadeSlide} className="flex flex-col items-center justify-center flex-1 text-center gap-8">
            <h1 className="text-2xl md:text-3xl font-medium">Where should we begin?</h1>

            <div className="bg-zinc-800 rounded-full px-4 py-4 w-full max-w-4xl shadow-lg">
              <div className="flex flex-wrap gap-2 justify-center">
                {prompts.map((prompt, index) => (
                  <motion.button
                    key={index}
                    whileTap={{ scale: 0.97 }}
                    disabled={!!loadingPrompt}
                    onClick={() => sendPrompt(prompt)}
                    className="bg-zinc-700 text-sm text-white px-4 py-2 rounded-full hover:bg-zinc-600 transition-all"
                  >
                    {prompt}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
          ) : (
          <motion.div key="chat" {...fadeSlide} ref={listRef} className="flex-1 w-full overflow-y-auto custom-scroll px-4 pt-6">
            <motion.div variants={listVariants} initial={false} animate="animate" className="max-w-4xl mx-auto">
              {messages.map(m => (
                <motion.div key={m.id} layout variants={listVariants} initial={false} animate="animate" transition={{ duration: 0.18, ease: easeOut }} className={m.role === 'user' ? "flex justify-end mb-6" : "flex justify-start mb-10"}>
                  <div className={m.role === 'user' ? "bg-gray-700 px-4 py-2 rounded-4xl text-white max-w-sm" 
                      : ""}>
                    {typeof m.content === 'string' ? <span>{m.content}</span> : m.content}
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {loadingPrompt && (
                <motion.div key="typing" layout initial={{ opacity:0 }} animate={{ opacity: 1 }} transition={{ duration:0.15 }} className='flex justify-start'>
                  <div className="text-sm text-zinc-400 font-mono animate-pulse">Typing...</div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Bottom input bar with buttons */}
      {messages.length > 0 && (
        <motion.div layout className="mt-4 bg-zinc-800 rounded-full px-4 py-4 w-full max-w-4xl shadow-lg">
          <div className="flex flex-wrap gap-2 justify-center">
            {prompts.map((prompt, index) => (
              <motion.button
                key={index}
                whileTap={{ scale: 0.97 }}
                disabled={!!loadingPrompt}
                onClick={ () => sendPrompt(prompt) }
                className={`bg-zinc-700 text-sm text-white px-5 py-2 rounded-full hover:bg-zinc-600 transition-all
                  ${loadingPrompt ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {prompt}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
