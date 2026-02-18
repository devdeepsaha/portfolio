import { Box, Brain, Cpu, Layers, Globe, Database } from 'lucide-react';

export interface LearningItem {
  id: number;
  title: string;
  subtitle: string;
  category: '3D' | 'AI' | 'Backend' | 'Frontend'; // Helps pick colors/icons
  description: string;
  tags: string[];
}

export const myLearning: LearningItem[] = [
  {
    id: 1,
    title: 'Three.js',
    subtitle: 'WebGL & Shaders',
    category: '3D',
    description: 'Diving deep into 3D graphics for the web, custom shaders (GLSL), and React Three Fiber to build immersive portfolio experiences.',
    tags: ['GLSL', 'R3F', 'Blender']
  },
  {
    id: 2,
    title: 'AI Engineering',
    subtitle: 'LLMs & Agents',
    category: 'AI',
    description: 'Exploring Large Language Models (LLMs), building agentic workflows, and integrating OpenAI APIs into production applications.',
    tags: ['OpenAI', 'Python', 'LangChain']
  },
  {
    id: 3,
    title: 'System Design',
    subtitle: 'Scalability',
    category: 'Backend',
    description: 'Learning how to architect scalable systems, handle high traffic, and design efficient databases.',
    tags: ['Microservices', 'Redis', 'Docker']
  }
];