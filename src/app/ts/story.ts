import { Wrench, Video, Brain, Box, Cpu, MonitorSmartphone } from 'lucide-react';

export interface Milestone {
  id: number;
  year: string;
  title: string;
  icon: any; 
  color: string;
  bg: string;
  description: string;
  image?: string; 
}

export const myJourney: Milestone[] = [
  {
    id: 1,
    year: "2018",
    title: "Breaking Things to Understand Them",
    icon: Wrench,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    description: `I was always a creative kid—into painting, photos, and stop-motion. But in 8th grade, I got a tablet, and that changed everything.
    
I used to "eat" the settings, breaking things just to figure out how to reverse engineer them. I realized that in software, mistakes can be undone. That erased my fear of exploring. I got deeply familiar with APKs, modding, and rebuilding apps using Lucky Patcher.`,
    image: "https://images.unsplash.com/photo-1551703599-6b3e8379aa8c?q=80&w=1000&auto=format&fit=crop" 
  },
  {
    id: 2,
    year: "2020",
    title: "Lockdown & Experiments",
    icon: Video,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    description: `When boards ended and COVID hit, I had absolute free time. I started editing and selling shirts online and learned pro photography (mastering ISO and shutter speeds). 

I also hijacked my dad's laptop, created Discord servers, programmed bots, and learned what it takes to lead a digital community. Around this time, I started my YouTube channel, 'Dhanbad Tech'. If you look at my early videos, the edits are choppy, but I obsessively practiced to make them smoother and smoother.`,
    image: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1000&auto=format&fit=crop" 
  },
  {
    id: 3,
    year: "2023",
    title: "Talking to Machines Until They Talked Back",
    icon: Brain,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    description: `Entering college, I already had a head start with HTML/CSS/JS from 6th grade, but now I was learning advanced coding alongside filmography.

Then the AI wave hit. I spent hours talking to it, learning the deep mechanics of prompt engineering. I figured out exactly how to communicate to make it do my heavy lifting. By using it for all kinds of tasks, I essentially trained my own highly intelligent creative assistant.`,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop" 
  },
  {
    id: 4,
    year: "2024",
    title: "Ambition vs Hardware Reality",
    icon: Box,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    description: `I got heavily interested in Blender and started learning 3D modeling. I wanted to build massive, immersive environments.

However, reality hit when my "potato PC" started getting fried by the renders. Instead of getting discouraged, I realized my hardware had limits, so I safely reserved 3D design as a hobby for the future when I have the right gear.`,
    image: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=1000&auto=format&fit=crop" 
  },
  {
    id: 5,
    year: "2025 - Present",
    title: "Turning Limits Into Design Choices",
    icon: Cpu,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    description: `In my 3rd year, I dove into building advanced websites. I wanted to integrate my love for 3D using Three.js, but once again, my laptop couldn't support it.

So, I stuck to 2D web development and found clever workarounds. Having severe constraints taught me the most valuable skills of all: how to ruthlessly optimize code, and that patience is key when your laptop hangs. This very portfolio is the culmination of working flawlessly within constraints.`,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop" 
  },
];