import infoData from '../lib/data/infoData.json';
import PageSection from '../ui/PageSection';

// Info section component - personal information, work experience, and technical skills
function Info() {
  return (
    <PageSection id="info" title="Info">
      <div className="space-y-10 text-muted">
        {/* About Section */}
        <section>
          <h2 className="font-mono text-sm uppercase tracking-widest text-accent mb-4">About</h2>
          {infoData.about.description.map((text, idx) => (
            <p key={idx} className="mb-3 text-fg/90 leading-relaxed">
              {text}
            </p>
          ))}
          <p className="text-sm mt-2">
            <i className="fas fa-location-dot mr-2 text-accent"></i>
            {infoData.location}
          </p>
        </section>

        {/* Work Experience Section */}
        <section>
          <h2 className="font-mono text-sm uppercase tracking-widest text-accent mb-4">
            Work Experience
          </h2>
          <ol className="relative border-l border-line ml-1 space-y-6">
            {infoData.workExperience.map((exp, idx) => (
              <li key={idx} className="pl-6 relative">
                <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-accent ring-4 ring-canvas" />
                <p className="font-mono text-xs text-muted mb-1">{exp.period}</p>
                <p className="text-lg font-semibold text-fg">{exp.company}</p>
                <p className="text-muted">{exp.role}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Technical Skills Section */}
        <section>
          <h2 className="font-mono text-sm uppercase tracking-widest text-accent mb-4">
            Technical Skills
          </h2>
          <div className="space-y-5">
            {Object.entries(infoData.technicalSkills).map(([category, skills]) => (
              <div key={category}>
                <h3 className="text-sm font-medium text-fg mb-2">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full bg-surface/70 border border-line text-xs font-mono text-muted"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageSection>
  );
}

export default Info;
