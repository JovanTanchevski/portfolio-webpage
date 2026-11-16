import projectsData from '../lib/data/projectsData.json';
import { Project } from '../lib/types';
import PageSection from '../ui/PageSection';

function Projects() {
  const projects = projectsData as Project[];

  return (
    <PageSection id="projects" title="Projects">
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <a
            key={project.id}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col bg-surface/70 backdrop-blur-sm border border-line rounded-xl overflow-hidden hover:border-accent transition-colors duration-300"
          >
            {project.image && (
              <div className="aspect-video overflow-hidden border-b border-line bg-fg/5">
                <img
                  src={`${import.meta.env.BASE_URL}${project.image}`}
                  alt={`${project.title} preview`}
                  loading="lazy"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}
            <div className="p-5 flex flex-col flex-1">
              <h2 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                {project.title}
                <i className="fas fa-arrow-up-right-from-square text-xs ml-2 opacity-60"></i>
              </h2>
              <p className="text-sm text-muted mb-4 leading-relaxed flex-1">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 rounded-full bg-fg/5 border border-line text-xs font-mono text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </PageSection>
  );
}

export default Projects;
