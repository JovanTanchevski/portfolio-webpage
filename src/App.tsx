import { lazy, Suspense, useState, useEffect } from 'react';
import Sidebar from './ui/Sidebar.tsx';
import Home from './features/Home.tsx';
import Info from './features/Info.tsx';
import Contact from './features/Contact.tsx';
import { Section } from './lib/types';
import { useTheme } from './lib/hooks/useTheme';

// Heavy parts are split into their own chunks and loaded on demand:
// Three.js background, Projects, and FAQ (which includes the chat)
const Background = lazy(() => import('./ui/Background'));
const Projects = lazy(() => import('./features/Projects.tsx'));
const FAQ = lazy(() => import('./features/FAQ'));


// Main app component - handles section switching and layout
function App() {
  const { theme, toggleTheme } = useTheme();
  const [currentSection, setCurrentSection] = useState<Section>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Handle section change with fade transition
  const handleSectionChange = (section: Section) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSection(section);
      setIsTransitioning(false);
    }, 150);
  };

  // Close sidebar on desktop when section changes
  useEffect(() => {
    if (window.innerWidth >= 768) {
      setIsSidebarOpen(false);
    }
  }, [currentSection]);

  // Render current section component
  const renderSection = () => {
    switch (currentSection) {
      case 'home':
        return <Home onNavigate={handleSectionChange} />;
      case 'projects':
        return <Projects />;
      case 'info':
        return <Info />;
      case 'contact':
        return <Contact />;
      case 'faq':
        return <FAQ />;
      default:
        return <Home onNavigate={handleSectionChange} />;
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Three.js animated background */}
      <Suspense fallback={null}>
        <Background />
      </Suspense>
      
      {/* Sidebar navigation */}
      <Sidebar
        currentSection={currentSection}
        onSectionChange={handleSectionChange}
        isOpen={isSidebarOpen}
        onToggle={setIsSidebarOpen}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      
      {/* Main content area */}
      <main className="absolute inset-0 pl-0 md:pl-64 transition-all duration-300 overflow-hidden">
        <div className="h-full w-full p-4 md:p-8 overflow-hidden">
          <div
            className={`h-full transition-opacity duration-300 ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <Suspense
              fallback={
                <div className="h-full flex items-center justify-center font-mono text-sm text-muted">
                  Loading...
                </div>
              }
            >
              {renderSection()}
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

