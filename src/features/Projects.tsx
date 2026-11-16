import projectsData from '../lib/data/projectsData.json';
import { Project } from '../lib/types';

// Projects section component - displays portfolio projects
function Projects() {
  const projects = projectsData as Project[];

  return (
    <div className="h-full flex flex-col z-10 relative overflow-hidden pt-12 md:pt-0 rise-in">
      <div className="max-w-4xl mx-auto w-full h-full flex flex-col">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">Projects</h1>
        <div className="flex-1 overflow-y-auto space-y-6 pr-2 pb-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-surface/70 backdrop-blur-sm border border-line rounded-xl p-6 hover:border-accent transition-colors duration-300"
            >
              <h2 className="text-xl md:text-2xl font-semibold mb-2">
                {project.title}
              </h2>
              <p className="text-muted mb-4 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-fg/5 border border-line text-xs font-mono text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex space-x-4">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-accent transition-colors font-mono text-sm"
                  >
                    View Project →
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-accent transition-colors font-mono text-sm"
                  >
                    GitHub →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;
