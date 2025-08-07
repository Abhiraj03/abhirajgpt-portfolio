type Project = {
  title: string
  description: string
  techStack: string[]
  image: string
  github: string
}

export default function ProjectCard({ project }: { project: Project }) {
    return (
        <div className="bg-zinc-800 rounded-lg p-4 flex flex-col space-y-3 shadow-md">
            <img src={project.image} alt={project.title} className="rounded-md h-40 object-cover" />
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <p className="text-sm text-zinc-300">{project.description}</p>
            <div className="flex flex-wrap gap-2 text-xs text-white">
                {project.techStack.map((tech, index) => (
                    <span key={index} className="bg-zinc-700 px-2 py-1 rounded-full text-xs">{tech}</span>    
                ))}
            </div>
            <a href={project.github} target="_blank" className="text-blue-400 hover:underline text-sm">View on Github →</a>
        </div>
    )
}