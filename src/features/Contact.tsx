// Contact section component - contact information and form
function Contact() {
  return (
    <div className="h-full flex flex-col z-10 relative overflow-hidden">
      <div className="max-w-3xl mx-auto w-full h-full flex flex-col">
        <h1 className="text-3xl md:text-5xl font-mono font-bold mb-8">Contact</h1>
        <div className="flex-1 overflow-y-auto space-y-6 text-gray-300 font-mono pr-2">
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">Get in Touch</h2>
            <p className="mb-6">
              Feel free to reach out via email, LinkedIn, or GitHub. I'm always open to discussing new projects and opportunities.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="bg-black bg-opacity-40 backdrop-blur-sm border border-gray-800 rounded p-4 hover:border-gray-500 transition-all 1s ease">
              <h3 className="text-lg font-bold mb-2 text-white">Email</h3>
              <a
                href="mailto:jovantancevski@gmail.com"
                className="text-gray-300"
              >
                jovantancevski@gmail.com
              </a>
            </div>
            
            <div className="bg-black bg-opacity-40 backdrop-blur-sm border border-gray-800 rounded p-4 hover:border-gray-500 transition-all 0.5s ease">
              <h3 className="text-lg font-bold mb-2 text-white">LinkedIn</h3>
              <a
                href="https://www.linkedin.com/in/jovantanchevski/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300"
              >
                linkedin.com/in/jovantanchevski/
              </a>
            </div>
            
            <div className="bg-black bg-opacity-40 backdrop-blur-sm border border-gray-800 rounded p-4 hover:border-gray-500 transition-all 0.5s ease">
              <h3 className="text-lg font-bold mb-2 text-white">GitHub</h3>
              <a
                href="https://github.com/jovantanchevski"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300"
              >
                github.com/jovantanchevski
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;

