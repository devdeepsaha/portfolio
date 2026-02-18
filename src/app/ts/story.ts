import { Code, Globe, Zap, Cpu, Star } from 'lucide-react';

export interface Milestone {
  id: number;
  year: string;
  title: string;
  icon: any; // We'll handle the icon component in the tile
  color: string;
  bg: string;
  description: string;
  image?: string; // Optional image for the modal
}

export const myJourney: Milestone[] = [
  {
    id: 1,
    year: "2016",
    title: "Hello World",
    icon: Code, // Pass the component reference, not <Code />
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    description: "Wrote my first line of Python code. It was a simple calculator, but it felt like magic.",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1000&auto=format&fit=crop" // Placeholder
  },
  {
    id: 2,
    year: "2019",
    title: "Full Stack",
    icon: Globe,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    description: "Built my first MERN stack application. Learned about databases, APIs, and deployment.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 3,
    year: "2022",
    title: "UI/UX Pivot",
    icon: Zap,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    description: "Realized that functionality needs form. Started designing in Figma before coding.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 4,
    year: "2026",
    title: "AI Architect",
    icon: Cpu,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    description: "Integrating LLMs into production apps. Building agents that can see, hear, and act.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop"
  },
];