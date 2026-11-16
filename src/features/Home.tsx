import { Section } from '../lib/types';

interface HomeProps {
  onNavigate: (section: Section) => void;
}

function Home({ onNavigate }: HomeProps) {
  return (
    <section
      id="home"
      className="min-h-[100dvh] px-4 md:px-8 flex flex-col justify-center items-start z-10 relative"
    >
      <div className="max-w-3xl mx-auto w-full rise-in pt-12 md:pt-0">
        <p className="font-mono text-sm text-accent mb-4">Hey! Nice to meet you.</p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
          I'm Jovan, a front-end developer building for the web.
        </h1>
        <p className="text-base md:text-lg text-muted max-w-2xl leading-relaxed">
          Born in 1999 in Bitola, Macedonia. I believe web design can be more diverse and inspiring.
          With a mission to present the possibilities of web design, I'm pursuing new expressions
          through experiments and thoughts.
        </p>

        <div className="flex flex-wrap gap-3 mt-10">
          <button
            onClick={() => onNavigate('projects')}
            className="px-6 py-3 rounded-lg bg-accent text-canvas font-medium hover:opacity-90 transition-opacity"
          >
            View projects
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 rounded-lg border border-line text-fg font-medium hover:border-accent hover:text-accent transition-colors"
          >
            Get in touch
          </button>
        </div>
      </div>

      <button
        onClick={() => onNavigate('projects')}
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted hover:text-accent transition-colors animate-bounce w-11 h-11 flex items-center justify-center"
      >
        <i className="fas fa-chevron-down"></i>
      </button>
    </section>
  );
}

export default Home;
