import projectsData from '../lib/data/projectsData.json';
import { Project } from '../lib/types';

// Projects section component - displays portfolio projects
function Projects() {
  const projects = projectsData as Project[];

  return (
    <div className="h-full flex flex-col z-10 relative overflow-hidden">
      <div className="max-w-4xl mx-auto w-full h-full flex flex-col">
        <h1 className="text-3xl md:text-5xl font-mono font-bold mb-8">Projects</h1>
        <div className="flex-1 overflow-y-auto space-y-6 pr-2">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-black bg-opacity-40 backdrop-blur-sm border border-gray-800 rounded p-6 hover:bg-opacity-60 transition-all duration-200"
            >
              <h2 className="text-xl md:text-2xl font-mono font-bold mb-2">
                {project.title}
              </h2>
              <p className="text-gray-300 font-mono mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-white bg-opacity-10 rounded text-sm font-mono"
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
                    className="text-gray-400 hover:text-white transition-colors font-mono text-sm"
                  >
                    View Project →
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors font-mono text-sm"
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
