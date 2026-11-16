import { ReactNode } from 'react';
import { Section } from '../lib/types';

interface PageSectionProps {
  id: Section;
  title: string;
  children: ReactNode;
}

function PageSection({ id, title, children }: PageSectionProps) {
  return (
    <section id={id} className="min-h-[100dvh] px-4 md:px-8 py-24 md:py-28 relative z-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-10">{title}</h1>
        {children}
      </div>
    </section>
  );
}

export default PageSection;
