import infoData from '../lib/data/infoData.json';

// Info section component - personal information, work experience, and technical skills
function Info() {
  return (
    <div className="h-full flex flex-col z-10 relative overflow-hidden">
      <div className="max-w-3xl mx-auto w-full h-full flex flex-col">
        <h1 className="text-3xl md:text-5xl font-mono font-bold mb-8">Info</h1>
        <div className="flex-1 overflow-y-auto space-y-6 text-gray-300 font-mono pr-2">
          {/* About Section */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">About</h2>
            {infoData.about.description.map((text, idx) => (
              <p key={idx} className="mb-4">
                {text}
              </p>
            ))}
          </div>
          
          {/* Work Experience Section */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">Work Experience</h2>
            <div className="space-y-4">
              {infoData.workExperience.map((exp, idx) => (
                <div
                  key={idx}
                  className="bg-black bg-opacity-40 backdrop-blur-sm border border-gray-800 rounded p-4"
                >
                  <p className="text-sm text-gray-400 mb-1">{exp.period}</p>
                  <p className="text-lg font-bold text-white mb-1">{exp.company}</p>
                  <p className="text-gray-300">{exp.role}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Technical Skills Section */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">Technical Skills</h2>
            <div className="space-y-4">
              {Object.entries(infoData.technicalSkills).map(([category, skills]) => (
                <div key={category}>
                  <h3 className="text-lg font-bold mb-2 text-white">{category}</h3>
                  <p className="text-gray-300">{skills.join(', ')}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Location Section */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">Location</h2>
            <p>{infoData.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;
