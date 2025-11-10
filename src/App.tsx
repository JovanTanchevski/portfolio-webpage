import { useState, useEffect } from 'react';
import Sidebar from './ui/Sidebar.tsx';
import Background from './ui/Background';
import Home from './features/Home.tsx';
import Projects from './features/Projects.tsx';
import Info from './features/Info.tsx';
import Contact from './features/Contact.tsx';
import FAQ from './features/FAQ';
import { Section } from './lib/types';

// Main app component - handles section switching and layout
function App() {
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
        return <Home />;
      case 'projects':
        return <Projects />;
      case 'info':
        return <Info />;
      case 'contact':
        return <Contact />;
      case 'faq':
        return <FAQ />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Three.js animated background */}
      <Background />
      
      {/* Sidebar navigation */}
      <Sidebar
        currentSection={currentSection}
        onSectionChange={handleSectionChange}
        isOpen={isSidebarOpen}
        onToggle={setIsSidebarOpen}
      />
      
      {/* Main content area */}
      <main className="absolute inset-0 pl-0 md:pl-64 transition-all duration-300 overflow-hidden">
        <div className="h-full w-full p-4 md:p-8 overflow-hidden">
          <div
            className={`h-full transition-opacity duration-300 ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {renderSection()}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

