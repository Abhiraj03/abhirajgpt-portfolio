'use client'
import { JSX, useState, useEffect, useRef } from 'react'
import { resumeData, contactData, techStackData, profileData } from "../data/responses"
import { motion, AnimatePresence, easeOut } from 'framer-motion';
import Resume from './components/Resume';
import ChatProjectPicker from './components/projects/ChatProjectPicker';
import Image from 'next/image';


function Typewriter({
  text,
  speed = 18,
  onDone,
}: {
  text: string;
  speed?: number;
  onDone?: () => void;
}) {
  const [shown, setShown] = useState("");

  // Keep latest onDone without retriggering the typing effect
  const onDoneRef = useRef<(() => void) | null>(null); // <-- give an initial value
  useEffect(() => {
    onDoneRef.current = onDone ?? null;
  }, [onDone]);

  useEffect(() => {
    setShown("");
    let i = 0;
    let id: number;

    const tick = () => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) {
        onDoneRef.current?.();
        return;
      }
      id = window.setTimeout(tick, speed);
    };

    id = window.setTimeout(tick, speed);
    return () => clearTimeout(id);
  }, [text, speed]); // note: no onDone here

  return (
    <span className="whitespace-pre-wrap">
      {shown}
      <span className="inline-block w-[1px] h-[1em] align-[-0.15em] bg-zinc-300 ml-0.5 animate-pulse" />
    </span>
  );
}

function AssistantReply({
  lead,
  body,
  onDone,
}: {
  lead: string;
  body?: JSX.Element;
  onDone?: () => void;
}) {
  const [typed, setTyped] = useState(false);
  return (
    <div className="space-y-4">
      <p className="text-sm">
        <Typewriter
          text={lead}
          onDone={() => {
            setTyped(true);
            onDone?.();
          }}
        />
      </p>
      {typed && body}
    </div>
  );
}


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
    const data = promptResponses[prompt];
    if (!data) {
      setMessages(prev => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: "Sorry, I do not have an answer for that yet." },
      ]);
      setLoadingPrompt(null);
      return;
    }

    // Push assistant message that uses the Typewriter for lead, then shows body
    const replyEl = (
      <AssistantReply
        lead={data.lead}
        body={data.body}
        onDone={() => {
          // unlock buttons only after typing completes
          setLoadingPrompt(null);
        }}
      />
    );

    setMessages(prev => [...prev, {id: crypto.randomUUID(), role: 'assistant', content: replyEl }]);
    // setLoadingPrompt(null); // clear loading state
  }

  const [contactForm, setContactForm] = useState({name: '', email: '', message: ''});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactForm({...contactForm, [e.target.name]: e.target.value });
  }

  const promptResponses: Record<string, { lead: string; body?: JSX.Element }> = {
    "Who are you?": {
      lead:
        "Hi, my name is Abhiraj. Here is my proof of existence so you know I am not a robot.",
      body: (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="space-y-6"
        >
          {/* Proof of existence */}
          <div className="flex items-center gap-5">
            <div className="relative w-24 h-24 shrink-0"> {/* Increased size from w-16/h-16 */}
              <Image
                src={profileData.avatar}
                alt={`${profileData.name} headshot`}
                width={96} height={96}
                className="w-24 h-24 rounded-3xl object-cover ring-2 ring-zinc-700 shadow-lg"
              />
            </div>
            <div>
              <div className="text-lg font-semibold">{profileData.name}</div>
              <div className="text-sm text-zinc-300">{profileData.location}</div>
            </div>
          </div>

          {/* Headline card */}
          <div className="rounded-2xl border border-zinc-700 bg-zinc-900/60 p-4 shadow">
            <div className="text-sm text-zinc-300">Headline</div>
            <div className="mt-1 text-base">{profileData.headline}</div>

            {/* quick chips */}
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="text-xs bg-zinc-800 border border-zinc-700 rounded-full px-3 py-1">
                AI
              </span>
              <span className="text-xs bg-zinc-800 border border-zinc-700 rounded-full px-3 py-1">
                VR
              </span>
              <span className="text-xs bg-zinc-800 border border-zinc-700 rounded-full px-3 py-1">
                Full stack
              </span>
            </div>
          </div>

          {/* Bio bullets */}
          <div className="rounded-2xl border border-zinc-700 bg-zinc-900/60 p-4 shadow">
            <div className="text-sm text-zinc-300 mb-2">Bio</div>
            <ul className="space-y-2 text-sm">
              {profileData.bioBullets.map((b, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-[6px] inline-block w-1.5 h-1.5 rounded-full bg-zinc-400" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Fun facts */}
          <div className="rounded-2xl border border-zinc-700 bg-zinc-900/60 p-4 shadow">
            <div className="text-sm text-zinc-300 mb-2">Fun facts</div>
            <ul className="space-y-2 text-sm">
              {profileData.funFacts.map((f, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-[6px] inline-block w-1.5 h-1.5 rounded-full bg-zinc-400" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Optional social buttons */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(contactData.links).map(([label, url]) => (
              <a
                key={label}
                href={url}
                target="_blank"
                className="text-xs bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1.5 hover:bg-zinc-700 transition"
              >
                {label}
              </a>
            ))}
          </div>
        </motion.div>
      ),
    },

    "What's your resume?": {
      lead: "Here’s a clean, readable version of my resume.",
      body: (
        <div className="space-y-4">
          <Resume />
          <div className="flex justify-center">
            <a
              href={resumeData.download}
              download
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm px-4 py-2 rounded-lg transition"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" className="fill-current">
                <path d="M12 3v10.586l3.293-3.293 1.414 1.414L12 17.414l-4.707-4.707 1.414-1.414L11 13.586V3h1zM5 19h14v2H5z"/>
              </svg>
              Download Resume
            </a>
          </div>
        </div>
      ),
    },
    "Show me your projects.": {
      lead: "Sure — which category would you like to see?",
      body: <ChatProjectPicker />,
    },
    "What's your tech stack?": {
      lead: "Here’s what I use across different domains of development:",
      body: (
        <div className="space-y-6">
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
      )
    },
    "How to contact you?": {
      lead: contactData.message,
      body: (
        <div className="space-y-6">
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
      )
    },
    
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
          <motion.div
            key="landing"
            {...fadeSlide}
            className="flex flex-col items-center justify-center flex-1 text-center gap-8"
          >
            {/* Logo + Title */}
            <div className="flex flex-col items-center gap-3">
              <Image
                src="/AbhirajGPT.png"       // or "/favicon.ico"
                alt="AbhirajGPT logo"
                width={56} height={56}
                className="w-14 h-14 rounded-xl shadow"
              />
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
                AbhirajGPT
              </h1>
              <p className="max-w-2xl text-sm text-zinc-300">
                A conversational portfolio that lets you explore my work, resume, tech stack, and contact details in chat form.
                Tap a prompt below to get started.
              </p>
            </div>

            {/* Feature chips */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs bg-zinc-800 border border-zinc-700 rounded-full px-3 py-1">Projects</span>
              <span className="text-xs bg-zinc-800 border border-zinc-700 rounded-full px-3 py-1">Resume</span>
              <span className="text-xs bg-zinc-800 border border-zinc-700 rounded-full px-3 py-1">Tech stack</span>
              <span className="text-xs bg-zinc-800 border border-zinc-700 rounded-full px-3 py-1">Contact</span>
              <span className="text-xs bg-zinc-800 border border-zinc-700 rounded-full px-3 py-1">About me</span>
            </div>

            {/* Prompt buttons you already render */}
            <div className="bg-zinc-800 rounded-full px-4 py-4 w-full max-w-4xl shadow-lg">
              <div className="flex flex-wrap gap-2 justify-center">
                {prompts.map((prompt, index) => (
                  <motion.button
                    key={index}
                    whileTap={{ scale: 0.97 }}
                    disabled={!!loadingPrompt}
                    onClick={() => sendPrompt(prompt)}
                    className="bg-zinc-700 text-sm text-white px-4 py-2 rounded-full hover:bg-zinc-600 transition-all hover:cursor-pointer"
                  >
                    {prompt}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Small footer hint */}
            <p className="text-xs text-zinc-500">
              Tip: Start with “Who are you?” to see a quick intro
            </p>
          </motion.div>
          ) : (
          <motion.div key="chat" {...fadeSlide} ref={listRef} className="flex-1 w-full overflow-y-auto custom-scroll px-4 pt-6">
            <motion.div variants={listVariants} initial={false} animate="animate" className="max-w-4xl mx-auto">
              {messages.map(m => (
                <motion.div key={m.id} layout variants={msgVariants} initial={false} animate="animate" transition={{ duration: 0.18, ease: easeOut }} className={m.role === 'user' ? "flex justify-end mb-6" : "flex justify-start mb-10"}>
                  <div className={m.role === 'user' ? "bg-gray-700 px-4 py-2 rounded-4xl text-white max-w-sm" 
                      : ""}>
                    {typeof m.content === 'string' ? <span>{m.content}</span> : m.content}
                  </div>
                </motion.div>
              ))}
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
