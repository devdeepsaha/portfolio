import { Music, BookOpen, Box, Clapperboard } from 'lucide-react';

export type MediaType = 'image' | 'video' | 'audio';

// 1. FIXED: Added 'type' here so every slide knows what it is
export interface MediaContent {
  type: MediaType; 
  src: string;
  caption?: string;
}

export interface HobbyItem {
  id: string;
  title: string;
  description: string;
  type: MediaType; // Main type for filtering
  cover: string; 
  content: MediaContent[];
}

export interface Hobby {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: any;
  color: string;
  gallery: HobbyItem[];
}

export const myHobbies: Hobby[] = [
  {
    id: "music",
    title: "MUSIC",
    subtitle: "Music & Instruments",
    description: "Creating soundscapes. From synthesizer waves to acoustic folk.",
    icon: Music,
    color: "text-pink-500",
    gallery: [
      { 
        id: "m1", 
        title: "Synthwave EP", 
        description: "A collection of retro-style tracks.",
        type: "audio",
        cover: "https://images.unsplash.com/photo-1558548760-7538d61749ee?w=500&q=80",
        content: [
           { type: "audio", src: "/audio/demo1.mp3", caption: "Track 1: Neon Nights" },
           { type: "audio", src: "/audio/demo2.mp3", caption: "Track 2: Cyber Chase" }
        ]
      },
      { 
        id: "m2", 
        title: "Studio Photos", 
        description: "My gear collection.",
        type: "image",
        cover: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500&q=80",
        content: [
            { type: "image", src: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80", caption: "Main Desk" },
            { type: "image", src: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&q=80", caption: "Synthesizer" }
        ]
      },
    ]
  },
  {
    id: "visuals",
    title: "3D",
    subtitle: "3D & Motion",
    description: "Blending geometry with imagination.",
    icon: Box,
    color: "text-orange-500",
    gallery: [
      { 
        id: "v1", 
        title: "Daily Renders", 
        description: "Motion graphics loops.",
        type: "video",
        cover: "https://images.unsplash.com/photo-1625845233649-2f22b826b010?w=500&q=80",
        content: [
            { type: "video", src: "/video/render1.mp4", caption: "Loop 01: Cubes" },
            { type: "video", src: "/video/render2.mp4", caption: "Loop 02: Spheres" }
        ]
      },
      { 
        id: "v2", 
        title: "Texture Art", 
        description: "Procedural textures.",
        type: "image",
        cover: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=80", 
        content: [
            { type: "image", src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80", caption: "Node Setup" }
        ]
      },
    ]
  },
  {
    id: "film",
    title: "Filmmaker",
    subtitle: "Cinema",
    description: "Capturing life at 24fps.",
    icon: Clapperboard,
    color: "text-purple-500",
    gallery: [
       { 
           id: "f1", 
           title: "Short Films", 
           description: "A collection of shorts.",
           type: "video",
           cover: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=500&q=80", 
           content: [
               { type: "video", src: "/video/film.mp4", caption: "Echoes (2025)" },
               { type: "video", src: "/video/film2.mp4", caption: "Lights (2024)" }
           ]
        },
    ]
  },
  {
    id: "writing",
    title: "The Author",
    subtitle: "Literature",
    description: "Building worlds with words.",
    icon: BookOpen,
    color: "text-blue-500",
    gallery: [
      { 
          id: "w1", 
          title: "Novel Sketches", 
          description: "Handwritten notes.",
          type: "image",
          cover: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&q=80", 
          content: [
              { type: "image", src: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80", caption: "Chapter 1 Notes" },
              { type: "image", src: "https://images.unsplash.com/photo-1519681393798-2f92f8a39c05?w=800&q=80", caption: "Map Draft" }
          ]
      },
    ]
  }
   
];