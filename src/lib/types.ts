// Type definitions for the application
export type Section = 'home' | 'projects' | 'info' | 'contact' | 'faq';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
}

