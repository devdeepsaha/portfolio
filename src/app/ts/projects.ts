export type Category = 'Dev Picks'|'All'| 'Web' | '3D' | 'Graphics' | 'PPT';

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
    id: 13,
    title: 'Modular Portfolio System',
    category: 'Web',
    image: './projects/web/new-portfolio/banner.jpg',
    gallery: [
      './projects/web/new-portfolio/banner.jpg',
      './projects/web/new-portfolio/1.jpg',
      

    ],
    description: `A modular bento-grid portfolio designed to present projects, skills, and personal evolution through a structured yet playful interface. 
The layout emphasizes clarity, hierarchy, and micro-interactions while maintaining a clean visual rhythm across tiles. 
Built with performance and responsiveness in mind, the system balances design aesthetics with engineering precision.
`,
    tech: [
  'React',
  'TypeScript',
  'Vite',
  'TailwindCSS',
  'shadcn/ui',
  'Framer Motion'
]

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
  {
    id: 14,
    title: 'Winter scene',
    category: '3D',
    image: './projects/3d/winter/10.png',
    gallery: [
      './projects/3d/winter/1.png',
      './projects/3d/winter/2.jpg',
      './projects/3d/winter/3.png',
      './projects/3d/winter/4.jpg',
      './projects/3d/winter/5.png',
      './projects/3d/winter/6.jpg',
      './projects/3d/winter/7.png',
      './projects/3d/winter/8.png',
      './projects/3d/winter/9.jpg',
      './projects/3d/winter/10.png',
      

    ],
    description: `A 3D scene created to capture the serene beauty of a winter landscape.
    The project focuses on creating a tranquil atmosphere through the use of soft lighting, realistic snow materials, and carefully arranged elements. 
    By experimenting with different light sources and shader effects, the scene aims to evoke a sense of calm and wonder while showcasing the potential of 3D storytelling in natural environments.
    `,
    tech: ['Blender','Cycles','Shader nodes','Compositor'],
  },
  {
    id: 15,
    title: 'Pokeball modelling',
    category: '3D',
    image: './projects/3d/pokeball/1.png',
    gallery: [
      './projects/3d/pokeball/1.png',
      './projects/3d/pokeball/2.png',
      './projects/3d/pokeball/3.png',
      

    ],
    description: `A 3D modeling project focused on creating a stylized pokeball using Blender. 
    Also explored camera aperture and depth of field to create a visually engaging composition. 
    The project emphasizes clean geometry, realistic materials, and dynamic lighting to bring the iconic object to life while showcasing fundamental 3D modeling techniques.
    `,
    tech: ['Blender','Cycles','Shader nodes','Compositor'],
  },
  {
    id: 16,
    title: 'Water physics simulation',
    category: '3D',
    image: './projects/3d/water/banner.png',
    gallery: [
      './projects/3d/water/1.mp4',
      
      

    ],
    description: `One of my earliest experiments with physics simulations in Blender, focused on creating a realistic water simulation using the built-in fluid physics engine. 
    The project explores the behavior of water as it interacts with different objects and forces, showcasing the potential of physics-based animation to create dynamic, visually engaging scenes. 
    Through careful tuning of simulation parameters and shader settings, the project aims to capture the fluidity and complexity of water in a stylized yet believable way.
    `,
    tech: ['Blender','Cycles','Shader nodes','Compositor'],
  },
  {
    id: 17,
    title: 'Product animation (Gun)',
    category: '3D',
    image: './projects/3d/gun/banner.png',
    gallery: [
      './projects/3d/gun/1.mp4',
      

    ],
    description: `A 3D product animation focused on showcasing a stylized gun model through dynamic camera movement, dramatic lighting, and detailed materials. 
The project emphasizes the importance of composition, timing, and visual storytelling in product animation, using Blender's powerful tools to create a visually engaging and technically polished result. 
Through experimentation with different animation techniques and shader effects, the scene aims to evoke a sense of excitement and intrigue while highlighting the potential of 3D animation for product visualization.
    `,
    tech: ['Blender','Cycles','Shader nodes','Compositor'],
  },
  {
    id: 18,
    title: 'Lamp modeling and lighting',
    category: '3D',
    image: './projects/3d/lamp/banner.png',
    gallery: [
      './projects/3d/lamp/1.mp4',
      
      

    ],
    description: `A 3D modeling and lighting experiment focused on creating a stylized lamp model and exploring different lighting setups using Blender's compositor. 
The project emphasizes the importance of lighting in 3D scenes, using a simple object to experiment with various light sources, intensities, and colors to create different moods and atmospheres. 
Through careful tuning of shader settings and compositing techniques, the project aims to showcase the transformative power of lighting in 3D visualization while honing fundamental modeling and rendering skills.
    `,
    tech: ['Blender','Cycles','Shader nodes','Compositor'],
  },
  {
    id: 19,
    title: 'animation using powerpoint (notemation)',
    category: 'Graphics',
    image: './projects/graphics/animation/banner.png',
    gallery: [
      './projects/graphics/animation/1.mp4',
      
    ],
    description: `A logo animation created entirely using PowerPoint, showcasing the potential of presentation software for creative expression beyond traditional slides.
The project emphasizes the use of shape layers, keyframe animation, and easing techniques to create a dynamic and visually engaging logo reveal. 
Through experimentation with PowerPoint's animation features and creative use of its tools, the project aims to demonstrate that compelling motion graphics can be achieved even with unconventional software, highlighting the importance of creativity and resourcefulness in design.
    `,
    tech: ['Microsoft PowerPoint','Shape layers','Keyframe animation','Easing techniques'],
  },
  {
    id: 20,
    title: 'Poster series (APL)',
    category: 'Graphics',
    image: './projects/graphics/Digital/banner.jpg',
    gallery: [
      
      './projects/graphics/Digital/1.jpg',
      './projects/graphics/Digital/2.png',
      './projects/graphics/Digital/4.jpg',
      './projects/graphics/Digital/banner.jpg',
      
      
    ],
    description: `A series of simple posters created for the Abacus Premier League, a college cricket tournament, using Microsoft PowerPoint. 
The project focuses on leveraging PowerPoint's design tools to create visually appealing and informative posters that capture the spirit of the tournament. 
Through creative use of shapes, text, and images, the posters aim to generate excitement and engagement among participants and spectators while demonstrating that effective graphic design can be achieved with accessible software.
    `,
    tech: ['Microsoft PowerPoint','Shape layers','Typography','Image manipulation'],
  },
  {
    id: 21,
    title: 'Magazine cover (Machinage)',
    category: 'Graphics',
    image: './projects/graphics/Books/magazine/banner.jpg',
    gallery: [
      './projects/graphics/Books/magazine/1.png',
      './projects/graphics/Books/magazine/2.png',
      
    ],
    description: `The official magazine of our college, Machinage 2025, was entirely designed and edited using Microsoft PowerPoint. 
The project involved leveraging PowerPoint's layout and design capabilities to create a polished, professional-looking magazine that includes articles, images, and advertisements. 
Through creative use of PowerPoint's features, the magazine aims to engage readers and showcase the talents of our college community while demonstrating that powerful design can be achieved with accessible tools.
The full magazine is attached below for reference, highlighting the versatility and potential of PowerPoint as a design platform.
    `,
    tech: ['Microsoft PowerPoint','Layout design','Typography','Image manipulation'],
    pdf: './projects/graphics/Books/magazine/magazine.pdf'
  },
  {
    id: 22,
    title: 'Book cover (The hostel door) ',
    category: 'Graphics',
    image: './projects/graphics/Books/book/banner.jpg',
    gallery: [
      './projects/graphics/Books/book/1.jpg',
      
      
    ],
    description: `A book cover designed for my novel "The Hostel Door," created using PicsArt, with prompt engineering to generate creative elements. 
The project involved using Picsart's layout and design tools such as text effects, image manipulation, and composition techniques to create a visually striking cover that captures the essence of the story.
Through creative use of typography, imagery, and composition, the book cover aims to intrigue potential readers and convey the mood of the novel, demonstrating that effective design can be achieved with a combination of accessible software and creative thinking.

The full book is available in the playground section of my portfolio, showcasing the multidisciplinary nature of my creative work and the potential for storytelling across different mediums.
    `,
    tech: ['PicsArt','Typography','Image manipulation','Prompt engineering'],
  },
  {
    id: 23,
    title: 'Profile picture design',
    category: 'Graphics',
    image: './projects/graphics/pfp/1.jpg',
    gallery: [
      './projects/graphics/pfp/5.jpg',
      './projects/graphics/pfp/1.jpg',
      './projects/graphics/pfp/2.jpg',
      './projects/graphics/pfp/3.jpg',

    ],
    description: `A profile picture designed for my previous portfolio, created using PicsArt with a combination of shape layers, text effects, and image manipulation techniques. 
The project involved experimenting with different design elements to create a visually engaging and unique profile picture that represents my personal brand and creative style. 
Through creative use of PicsArt's features, the profile picture aims to capture attention and convey a sense of personality and creativity, demonstrating that effective design can be achieved with accessible tools and a willingness to experiment.
    `,
    tech: ['PicsArt','Shape layers','Text effects','Image manipulation'],
  },
  {
    id: 24,
    title: 'Logo collection',
    category: 'Graphics',
    image: './projects/graphics/Logos/2.jpg',
    gallery: [
      './projects/graphics/Logos/1.jpg',
      './projects/graphics/Logos/2.jpg',
      './projects/graphics/Logos/3.jpg',
      './projects/graphics/Logos/4.jpg',
      './projects/graphics/Logos/5.jpg',
      './projects/graphics/Logos/6.jpg',
      './projects/graphics/Logos/7.jpg',
      './projects/graphics/Logos/8.jpg',
      
      
    ],
    description: `A collection of logos designed for various college events ( fest, farewell, tournament) and personal use, created using a combination of Microsoft PowerPoint, PicsArt and Canva. 
The project involved leveraging the design tools of both software to create a diverse range of logos that capture the essence of different events and personal branding needs. 
Through creative use of shape layers, typography, and image manipulation techniques, the logos aim to generate excitement and engagement while demonstrating that effective graphic design can be achieved with accessible tools and a willingness to experiment.
    `,
    tech: ['Microsoft PowerPoint','Canva','PicsArt','Shape layers','Typography','Image manipulation'],
  },
  {
    id: 25,
    title: 'Poster collection ',
    category: 'Graphics',
    image: './projects/graphics/posters/4.jpg',
    gallery: [
      './projects/graphics/posters/2.jpg',
      './projects/graphics/posters/1.jpg',
      './projects/graphics/posters/3.jpg',
      './projects/graphics/posters/4.jpg',
      './projects/graphics/posters/5.jpg',

    ],
    description: `A collection of posters designed for various college events such as tech fest, cultural fest, and Holi celebrations, created entirely using Microsoft PowerPoint. 
The project involved leveraging PowerPoint's design tools to create visually appealing and informative posters that capture the spirit of each event. 
Through creative use of shapes, text, and images, the posters aim to generate excitement and engagement among participants and spectators while demonstrating that effective graphic design can be achieved with accessible software and a willingness to experiment.
    `,
    tech: ['Microsoft PowerPoint','Shape layers','Typography','Image manipulation'],
  },
  {
    id: 26,
    title: 'Tee-shirt design',
    category: 'Graphics',
    image: './projects/graphics/Tshirts/4.jpg',
    gallery: [
      './projects/graphics/Tshirts/1.jpg',
      './projects/graphics/Tshirts/2.jpg',
      './projects/graphics/Tshirts/3.jpg',
      './projects/graphics/Tshirts/4.jpg',
      './projects/graphics/Tshirts/5.jpg',
      './projects/graphics/Tshirts/6.jpg',
      
      
    ],
    description: `A collection of tee-shirt designs created for various college events and personal use, designed using a combination of Microsoft PowerPoint and PicsArt.
The project involved leveraging the design tools of both software to create a diverse range of tee-shirt designs that capture the essence of different events and personal branding needs. 
Through creative use of shape layers, typography, and image manipulation techniques, the tee-shirt designs aim to generate excitement and engagement while demonstrating that effective graphic design can be achieved with accessible tools and a willingness to experiment. 

    `,
    tech: ['Microsoft PowerPoint','PicsArt','Shape layers','Typography','Image manipulation'],
  },
];

// --- ADD THIS AT THE BOTTOM ---
export const heroSlides = [
  
  "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1000",
  "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000",
  
];

export const devChoiceIds = [1,2];