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
];

// --- ADD THIS AT THE BOTTOM ---
export const heroSlides = [
  
  "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1000",
  "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000",
  
];