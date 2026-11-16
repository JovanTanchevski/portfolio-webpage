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
          className="fixed inset-0 bg-canvas/60 backdrop-blur-sm z-40 md:hidden"
          onClick={handleOverlayClick}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-surface/80 backdrop-blur-xl
          border-r border-line z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full p-6">
          {/* Brand + mobile close button */}
          <div className="flex items-start justify-between mb-10">
            <div>
              <p className="font-semibold text-fg leading-tight">Jovan Tanchevski</p>
              <p className="font-mono text-xs text-muted mt-1">Front-end Developer</p>
            </div>
            <button
              className="md:hidden text-muted hover:text-fg transition-colors"
              onClick={() => onToggle(false)}
              aria-label="Close menu"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          <nav className="flex flex-col space-y-1 flex-1" aria-label="Main">
            {sidebarData.sections.map((section) => {
              const isActive = currentSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => {
                    onSectionChange(section.id as Section);
                    onToggle(false);
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={`
                    relative flex items-center gap-3 px-4 py-3 rounded-lg text-left
                    transition-all duration-200
                    ${
                      isActive
                        ? 'bg-accent/10 text-fg'
                        : 'text-muted hover:text-fg hover:bg-fg/5'
                    }
                  `}
                >
                  {isActive && (
                    <span className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full bg-accent" />
                  )}
                  <i className={`fas ${section.icon} w-5 text-center ${isActive ? 'text-accent' : ''}`}></i>
                  <span className="text-sm font-medium">{section.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="mt-auto pt-6 border-t border-line">
            <div className="grid grid-cols-6 gap-1">
              {sidebarData.socialLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={getSocialLinkHref(link)}
                  target={link.target}
                  rel={link.target ? 'noopener noreferrer' : undefined}
                  download={link.download}
                  aria-label={link.label}
                  title={link.label}
                  className="flex items-center justify-center h-10 rounded-lg text-muted hover:text-accent hover:bg-fg/5 transition-colors"
                >
                  <i className={`${link.icon} text-base`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {!isOpen && (
        <button
          className="md:hidden fixed top-4 left-4 z-50 text-fg bg-surface/80 backdrop-blur-md border border-line w-11 h-11 rounded-lg flex items-center justify-center"
          onClick={() => onToggle(true)}
          aria-label="Open menu"
        >
          <i className="fas fa-bars text-lg"></i>
        </button>
      )}
    </>
  );
}

export default Sidebar;
