import { Section } from '../lib/types';
import sidebarData from '../lib/data/sidebarData.json';

interface SidebarProps {
  currentSection: Section;
  onSectionChange: (section: Section) => void;
  isOpen: boolean;
  onToggle: (open: boolean) => void;
}

// Sidebar navigation component with icons and links
function Sidebar({ currentSection, onSectionChange, isOpen, onToggle }: SidebarProps) {
  const handleOverlayClick = () => {
    if (isOpen) {
      onToggle(false);
    }
  };

  // Get href for social links, handling environment variables
  const getSocialLinkHref = (link: (typeof sidebarData.socialLinks)[0]) => {
    if (link.href.startsWith('env:')) {
      const envKeyName = link.href.replace('env:', '') as 'VITE_EMAIL' | 'VITE_PHONE' | 'VITE_CV_URL';
      const envValue = import.meta.env[envKeyName] as string;
      const prefix = link.prefix || '';
      return envValue ? `${prefix}${envValue}` : (link.fallback || '');
    }
    return link.href;
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 md:hidden"
          onClick={handleOverlayClick}
        />
      )}

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

          <nav className="flex flex-col space-y-4 flex-1">
            {sidebarData.sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  onSectionChange(section.id as Section);
                  onToggle(false);
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

          <div className="mt-auto pt-6 border-t border-gray-800">
            <div className="flex flex-col space-y-4">
              {sidebarData.socialLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={getSocialLinkHref(link)}
                  target={link.target}
                  rel={link.target ? 'noopener noreferrer' : undefined}
                  download={link.download}
                  className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors"
                >
                  <i className={`${link.icon} text-xl`}></i>
                  <span className="font-mono text-sm">{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </aside>

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
