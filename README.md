# 🧠 AbhirajGPT – ChatGPT-style Developer Portfolio

AbhirajGPT is my **AI-style interactive portfolio**, designed to look and feel like ChatGPT — but instead of using an actual LLM, it responds with curated content about me: my projects, skills, resume, and more.

It's powered by **Next.js**, **Tailwind CSS**, and a touch of creative flair.

---

## 📸 Preview

![AbhirajGPT Screenshot](public/preview.png)

---

## 🚀 Features

- 🧑‍💻 Who am I? — Short intro message
- 🗂 Projects — Card-style project showcase with images, tech stack, and GitHub links
- 📄 Resume — Clickable preview + download link
- 🔗 Contact — Social links + message form
- 🧠 Tech Stack — Categorized skills in AI, Full Stack, VR
- ✨ Typing animation — ChatGPT-like letter-by-letter effect
- 💬 Multiple Q&A entries — Persistent chat history per session

---

## 🛠 Tech Stack

| Frontend       | State & Logic     | Styling        |
|----------------|-------------------|----------------|
| Next.js 14     | React `useState`  | Tailwind CSS   |
| TypeScript     | Custom JSON Data  | Responsive UI  |

---

## 📁 Folder Structure

abhirajgpt/
├── app/ # App Router pages

│ └── page.tsx # Main chat interface

├── components/
│ └── ProjectCard.tsx # Reusable project card

├── data/
│ └── responses.ts # Predefined data (projects, resume, contact)

├── public/
│ ├── resume.pdf # Resume file

│ └── projects/ # Project images

├── styles/

│ └── globals.css # Tailwind custom styles

├── tailwind.config.ts

└── README.md


---

## 🧪 Running Locally

```bash
git clone https://github.com/Abhiraj03/abhirajgpt-portfolio.git 
cd abhirajgpt
npm install
npm run dev

Visit http://localhost:3000 to explore!

📬 Contact
Made by Abhiraj Chaudhary
Find me on GitHub • LinkedIn
Feel free to fork, clone, or connect!

🧠 Inspiration
This project was inspired by:

ChatGPT’s interface

The need to create a more engaging portfolio than the standard resume site

My love for interactive UI/UX and developer storytelling

📜 License
MIT License. Use it, remix it, and make it your own.
---
