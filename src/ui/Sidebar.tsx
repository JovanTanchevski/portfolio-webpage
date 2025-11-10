import { Section } from '../lib/types';

interface SidebarProps {
  currentSection: Section;
  onSectionChange: (section: Section) => void;
  isOpen: boolean;
  onToggle: (open: boolean) => void;
}

// Sidebar navigation component with icons and links
function Sidebar({ currentSection, onSectionChange, isOpen, onToggle }: SidebarProps) {
  const sections: { id: Section; label: string; icon: string }[] = [
    { id: 'home', label: 'Home', icon: 'fa-home' },
    { id: 'projects', label: 'Projects', icon: 'fa-folder' },
    { id: 'info', label: 'Info', icon: 'fa-info-circle' },
    { id: 'contact', label: 'Contact', icon: 'fa-envelope' },
    { id: 'faq', label: 'FAQ', icon: 'fa-question-circle' },
  ];

  // Close sidebar when clicking outside (mobile)
  const handleOverlayClick = () => {
    if (isOpen) {
      onToggle(false);
    }
  };

  return (
    <>
      {/* Mobile overlay - glassy background when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 md:hidden"
          onClick={handleOverlayClick}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-black bg-opacity-80 backdrop-blur-md
          border-r border-gray-800 z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full p-6">
          {/* Mobile menu toggle button */}
          <button
            className="md:hidden self-end mb-6 text-white hover:text-gray-300 transition-colors"
            onClick={() => onToggle(!isOpen)}
          >
            <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
          </button>

          {/* Navigation items */}
          <nav className="flex flex-col space-y-4 flex-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  onSectionChange(section.id);
                  onToggle(false); // Close sidebar on mobile after selection
                }}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded
                  transition-all duration-200
                  ${
                    currentSection === section.id
                      ? 'bg-white bg-opacity-10 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white hover:bg-opacity-5'
                  }
                `}
              >
                <i className={`fas ${section.icon} text-lg`}></i>
                <span className="font-mono text-sm">{section.label}</span>
              </button>
            ))}
          </nav>

          {/* Social links and contact info */}
          <div className="mt-auto pt-6 border-t border-gray-800">
            <div className="flex flex-col space-y-4">
              {/* GitHub */}
              <a
                href="https://github.com/jovantanchevski"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors"
              >
                <i className="fab fa-github text-xl"></i>
                <span className="font-mono text-sm">GitHub</span>
              </a>

              {/* GitLab */}
              <a
                href="https://gitlab.com/jovantanchevski"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors"
              >
                <i className="fab fa-gitlab text-xl"></i>
                <span className="font-mono text-sm">GitLab</span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/jovantanchevski"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors"
              >
                <i className="fab fa-linkedin text-xl"></i>
                <span className="font-mono text-sm">LinkedIn</span>
              </a>

              {/* CV Download */}
              <a
                href="/cv.pdf"
                download
                className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors"
              >
                <i className="fas fa-download text-xl"></i>
                <span className="font-mono text-sm">Download CV</span>
              </a>

              {/* Phone */}
              <a
                href="tel:+38976555021"
                className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors"
              >
                <i className="fas fa-phone text-xl"></i>
                <span className="font-mono text-sm">Call</span>
              </a>

              {/* Email */}
              <a
                href="mailto:jovantancevski@gmail.com"
                className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors"
              >
                <i className="fas fa-envelope text-xl"></i>
                <span className="font-mono text-sm">Email</span>
              </a>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile menu button - fixed when sidebar is closed */}
      {!isOpen && (
        <button
          className="md:hidden fixed top-4 left-4 z-50 text-white bg-black bg-opacity-50 p-2 rounded"
          onClick={() => onToggle(true)}
        >
          <i className="fas fa-bars text-xl"></i>
        </button>
      )}
    </>
  );
}

export default Sidebar;

