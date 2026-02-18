export type Category = 'All' | 'Web' | '3D' | 'Graphics' | 'PPT';

export interface Project {
  id: number;
  title: string;
  category: Category;
  image: string;
  gallery?: string[];
  pdf?: string;
  description: string;
  tech?: string[];
  link?: string;
  github?: string;
}

export const myProjects: Project[] = [
  
  {
    id: 1,
    title: 'Potho Prodorshok',
    category: 'Web',
    image: './projects/web/pothoprodorshok/banner.jpg',
    gallery: [
      './projects/web/pothoprodorshok/1.jpg',
      './projects/web/pothoprodorshok/2.jpg',
      './projects/web/pothoprodorshok/3.jpg',
      './projects/web/pothoprodorshok/4.jpg',
      './projects/web/pothoprodorshok/5.jpg',
      
    ],
    description: 'A full-stack, multilingual web application to provide students with AI-generated career roadmaps, exam preparation tools, and scholarship information.',
    tech: ['React', 'Python', 'Tailwind', 'Supabase','Google Gemini API','PostgreSQL','Render'],
    link: 'https://pothoprodorshok.onrender.com/',
    github: 'https://github.com/devdeepsaha/career-web',
    pdf: './projects/web/pothoprodorshok/report.pdf' 
  },
  {
    id: 2,
    title: 'Bharat Coking Coal Ltd.',
    category: 'Web',
    image: './projects/web/bccl/banner.jpg',
    gallery: [
      './projects/web/bccl/1.jpg',
      './projects/web/bccl/2.jpg',
      './projects/web/bccl/3.jpg',
      './projects/web/bccl/4.jpg',
      './projects/web/bccl/5.jpg',
      './projects/web/bccl/6.jpg',
      './projects/web/bccl/7.jpg',
      './projects/web/bccl/8.jpg',
      './projects/web/bccl/9.jpg',
      './projects/web/bccl/10.jpg',
      './projects/web/bccl/11.jpg',
      './projects/web/bccl/12.jpg',  
    ],
    description: `Currently in active development, with the final production version yet to be released. A live development build is available in the view live button. 
    
    Developed a dynamic public website paired with a secure multi-role Content Management System that allows different departments to independently manage and update their own sections. Designed to simplify content workflows for non-technical users while maintaining flexibility and scalability.`,
    tech: ['Laravel', 'Python', 'MySql', 'React','Google Gemini API','Custom CSS'],
    link: 'https://pothoprodorshok.onrender.com/',
    pdf: './projects/web/bccl/report.pdf' 
  },
  {
    id: 3,
    title: 'Old Portfolio Website',
    category: 'Web',
    image: './projects/web/old-portfolio/banner.jpg',
    gallery: [
      './projects/web/old-portfolio/banner.jpg',
      './projects/web/old-portfolio/1.jpg',
      './projects/web/old-portfolio/2.jpg',
      './projects/web/old-portfolio/3.jpg',
        
    ],
    description: `This was my earlier portfolio mainly focused on graphic design and visual experimentation. I explored motion, typography, and interactive elements like a custom particle-based hero section to build a strong visual identity and creative experience.

    As my interests grew beyond design into full-stack development and other creative areas like music and interactive projects, I moved toward a more structured portfolio that better represents my technical work and multidisciplinary skills.`,
    tech: ['Next.js', 'React', 'TypeScript', 'Framer Motion','HTML5 Canvas','Custom CSS'],
    link: 'https://portfolio-old-drab.vercel.app/',
    github: 'https://github.com/devdeepsaha/portfolio-old'
  },
  {
    id: 4,
    title: 'Tools By Deep',
    category: 'Web',
    image: './projects/web/toolsbydeep/banner.jpg',
    gallery: [
      './projects/web/toolsbydeep/banner.jpg',
      './projects/web/toolsbydeep/1.jpg',
      
    ],
    description: `Built because I couldn’t find one place that collected all the useful tools I personally rely on , like designing resources coolors, colorhunt. 
    What started as a personal curated toolkit grew into an interactive, AI-assisted directory of interesting corners of the internet. Designed as a lightweight single-file experiment and shared openly for anyone who wants to explore or use it.`,
    tech: ['HTML5', 'Tailwind CSS', 'JavaScript (Vanilla JS)', 'DOM Manipulation'],
    link: 'https://toolsbydeep.vercel.app/',
    github: 'https://github.com/devdeepsaha/toolsbydev'
  },
];

// --- ADD THIS AT THE BOTTOM ---
export const heroSlides = [
  
  "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1000",
  "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000",
  
];