export type Category = 'All' |'Dev Picks'| 'Web' | '3D' | 'Graphics' | 'PPT';

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
  {
    id: 5,
    title: 'Donut',
    category: '3D',
    image: './projects/3d/donut/1.png',
    gallery: [
      './projects/3d/donut/1.png',

    ],
    description: `A donut and the starting point of my journey into 3D. 
      This was my first render created in Blender, where I explored procedural workflows with Geometry Nodes, realistic lighting using Cycles, and compositing for final polish. 
      The project represents experimentation, learning through iteration, and discovering the power of 3D storytelling.`,
    tech: ['Blender','Cycles','Geometry nodes','Compositor'],
  },
  {
    id: 6,
    title: 'NCERT',
    category: '3D',
    image: './projects/3d/book/3.jpg',
    gallery: [
      './projects/3d/book/1.jpg',
      './projects/3d/book/2.jpg',
      './projects/3d/book/3.jpg',

    ],
    description: `A stylized 3D interpretation of an NCERT book created as an exploration of minimal composition and storytelling through everyday objects. 
    The project emphasizes realistic materials, soft lighting, and balanced framing to evoke familiarity while maintaining a clean, modern aesthetic.
    `,
    tech: ['Blender','Cycles','Shader nodes','Compositor'],
  },

  {
    id: 7,
    title: 'World outside the window',
    category: '3D',
    image: './projects/3d/window/4.png',
    gallery: [
      './projects/3d/window/1.png',
      './projects/3d/window/2.png',
      './projects/3d/window/3.png',
      './projects/3d/window/4.png',
      './projects/3d/window/5.png',
      './projects/3d/window/6.png',
      './projects/3d/window/7.png',

    ],
    description: `A 3D scene created to capture the feeling of looking out a window and seeing a world beyond. 
    The project focuses on creating a cozy, intimate interior space contrasted with a vibrant, inviting exterior environment. 
    Through careful attention to lighting, materials, and composition, the scene aims to evoke a sense of wonder and possibility while maintaining a grounded, relatable atmosphere.
    `,
    tech: ['Blender','Cycles','Shader nodes','Compositor'],
  },
  {
    id: 8,
    title: 'jello dice',
    category: '3D',
    image: './projects/3d/dice/2.png',
    gallery: [
      './projects/3d/dice/1.mp4',
      './projects/3d/dice/2.png',

    ],
    description: `An early exploration into simulation-driven animation that helped shape my interest in procedural workflows. Explored soft-body simulations and stylized materials in Blender. 
    The dice was fully modeled from scratch, with a focus on understanding collision physics and dynamic motion behavior. 
    Using shader nodes and Cycles rendering, the project experiments with translucent materials, vibrant color, and exaggerated movement to create a visually engaging result.
    `,
    tech: ['Blender','Cycles','Shader nodes','Compositor'],
  },
  {
    id: 9,
    title: 'indoor scene',
    category: '3D',
    image: './projects/3d/indoor/1.jpg',
    gallery: [
      './projects/3d/indoor/1.jpg',
      './projects/3d/indoor/2.jpg',
      './projects/3d/indoor/3.jpg',

    ],
    description: `A 3D interior scene created to explore the interplay of light, materials, and composition in a confined space.
    The project focuses on creating a warm, inviting atmosphere through the use of soft lighting, realistic textures, and carefully arranged elements. 
    By experimenting with different light sources and material properties, the scene aims to evoke a sense of comfort while showcasing the potential of 3D storytelling in everyday environments.
    `,
    tech: ['Blender','Cycles','Shader nodes','Compositor'],
  },
  {
    id: 10,
    title: 'number animation ',
    category: '3D',
    image: './projects/3d/numbers/banner.png',
    gallery: [
      './projects/3d/numbers/1.mp4',
      './projects/3d/numbers/2.mp4',
      

    ],
    description: `A 3D animation project that explores the dynamic movement of numbers in a stylized, abstract environment.
    The project focuses on creating visually engaging motion through the use of procedural animation techniques, dynamic lighting, and vibrant materials. 
    By experimenting with different animation curves and shader effects, the scene aims to evoke a sense of energy and playfulness while showcasing the creative potential of 3D animation.
    `,
    tech: ['Blender','Cycles','Shader nodes','Compositor'],
  },
  {
    id: 11,
    title: 'cube animation',
    category: '3D',
    image: './projects/3d/cube/banner.png',
    gallery: [
      './projects/3d/cube/5.mp4',
      './projects/3d/cube/2.mp4',
      './projects/3d/cube/3.mp4',
      './projects/3d/cube/4.mp4',
      './projects/3d/cube/1.mp4',

    ],
    description: `A 3D animation project that explores the transformation and movement of a simple cube in a stylized, abstract environment.
    The project focuses on creating visually engaging motion through the use of procedural animation techniques, dynamic lighting, and vibrant materials. 
    By experimenting with different animation curves and shader effects, the scene aims to evoke a sense of energy and playfulness while showcasing the creative potential of 3D animation.
    `,
    tech: ['Blender','Cycles','Shader nodes','Compositor'],
  },
  {
    id: 12,
    title: 'Car rigging',
    category: '3D',
    image: './projects/3d/car/banner.png',
    gallery: [
      './projects/3d/car/1.mp4',
      

    ],
    description: `A cinematic 3D animation exploring vehicle rigging, dynamic camera movement, and procedural environment design. 
   The scene features a procedurally generated sea and road system, combined with night-time lighting using HDRI to create atmosphere and depth. 
   This project focused on experimenting with motion, composition, and environmental storytelling while refining technical workflows in Blender.`,
    tech: ['Blender','Cycles','Shader nodes','Compositor'],
  },
  
];

// --- ADD THIS AT THE BOTTOM ---
export const heroSlides = [
  
  "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1000",
  "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000",
  
];

export const devChoiceIds = [1, 2, 5, 7, 12];