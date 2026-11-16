import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import Sidebar from './ui/Sidebar.tsx';
import ChatButton from './ui/ChatButton';
import Home from './features/Home.tsx';
import Info from './features/Info.tsx';
import Contact from './features/Contact.tsx';
import { Section } from './lib/types';
import { useTheme } from './lib/hooks/useTheme';
import { useLocalStorage } from './lib/hooks/useLocalStorage';

const Background = lazy(() => import('./ui/Background'));
const Projects = lazy(() => import('./features/Projects.tsx'));
const FAQChat = lazy(() => import('./ui/FAQChat'));

const SECTION_ORDER: Section[] = ['home', 'projects', 'info', 'contact'];

const isSection = (value: string): value is Section =>
  (SECTION_ORDER as string[]).includes(value);

function App() {
  const { theme, toggleTheme } = useTheme();
  const [currentSection, setCurrentSection] = useState<Section>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useLocalStorage('faq-chat-open', false);
  const scrollRef = useRef<HTMLElement>(null);

  const scrollToSection = useCallback((section: Section, instant = false) => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(section)?.scrollIntoView({
      behavior: instant || reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  }, []);

  // Highlight the section that is currently crossing the upper part of the viewport
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const line = container.getBoundingClientRect().top + container.clientHeight * 0.4;
      let active: Section = 'home';
      for (const id of SECTION_ORDER) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) active = id;
      }
      setCurrentSection(active);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    container.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      container.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Keep the URL hash in sync so a section can be linked directly
  useEffect(() => {
    const hash = currentSection === 'home' ? '' : `#${currentSection}`;
    if (window.location.hash !== hash) {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}${hash}`);
    }
  }, [currentSection]);

  // Jump to the section named in the URL on first load
  useEffect(() => {
    const target = window.location.hash.replace('#', '');
    if (isSection(target)) scrollToSection(target, true);
  }, [scrollToSection]);

  return (
    <div className="relative w-screen h-[100dvh] overflow-hidden">
      <Suspense fallback={null}>
        <Background />
      </Suspense>

      <Sidebar
        currentSection={currentSection}
        onSectionChange={scrollToSection}
        isOpen={isSidebarOpen}
        onToggle={setIsSidebarOpen}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenChat={() => setIsChatOpen(true)}
      />

      <main ref={scrollRef} className="absolute inset-0 md:pl-64 overflow-y-auto overflow-x-hidden">
        <Home onNavigate={scrollToSection} />
        <Suspense fallback={<section id="projects" className="min-h-[100dvh]" />}>
          <Projects />
        </Suspense>
        <Info />
        <Contact />
      </main>

      {isChatOpen ? (
        <Suspense fallback={null}>
          <FAQChat onClose={() => setIsChatOpen(false)} />
        </Suspense>
      ) : (
        <ChatButton onClick={() => setIsChatOpen(true)} />
      )}
    </div>
  );
}

export default App;
