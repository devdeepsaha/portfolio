import { Music, BookOpen, Box, Clapperboard } from 'lucide-react';

export type MediaType = 'image' | 'video' | 'audio' | 'pdf';

export interface MediaContent {
  type: MediaType;
  src: string;
  caption?: string;
}

export interface HobbyItem {
  id: string;
  title: string;
  description: string;
  type: MediaType;
  cover: string;
  content: MediaContent[];
  pdf?: string;
}

export interface Hobby {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: any;
  colorVar: 'b' | 'v' | 'r' | 'o'; // Explicitly define the allowed keys
  gallery: HobbyItem[];
}

export const myHobbies: Hobby[] = [
  {
    id: "music",
    title: "MUSIC",
    subtitle: "Sound Experiments",
    description: "I don’t just listen to music — I mess with it. Sometimes it’s synth sounds, sometimes acoustic vibes. Mostly it’s late-night experiments until something clicks.",
    icon: Music,
    colorVar: "b",
    gallery: [
      {
        id: "m1",
        title: "Late Night Loops",
        description: "Random ideas that turned into full tracks.",
        type: "audio",
        cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&q=80",
        content: [{ type: "audio", src: "/audio/demo1.mp3", caption: "An idea that stayed" }]
      }
    ]
  },
  {
    id: "visuals",
    title: "3D",
    subtitle: "Blender & Motion",
    description: "I got obsessed with 3D for a while. Built things my laptop could barely handle. Still worth it.",
    icon: Box,
    colorVar: "v",
    gallery: [
      {
        id: "v1",
        title: "Render Practice",
        description: "Testing ideas and lights.",
        type: "video",
        cover: "https://images.unsplash.com/photo-1625845233649-2f22b826b010?w=500&q=80",
        content: [{ type: "video", src: "/video/render1.mp4", caption: "Satisfaction in 3D" }]
      }
    ]
  },
  {
    id: "film",
    title: "FILM",
    subtitle: "Cinema Phase",
    description: "Framing, lighting, movement — it changed how I see everything.",
    icon: Clapperboard,
    colorVar: "r",
    gallery: [
      {
        id: "f1",
        title: "Short Film",
        description: "Trying to turn ideas into visuals.",
        type: "video",
        cover: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=500&q=80",
        content: [{ type: "video", src: "/video/film.mp4", caption: "A small story" }]
      }
    ]
  },
  {
    id: "writing",
    title: "AUTHOR",
    subtitle: "Story Mode",
    description: "Sometimes code isn’t enough. So I build worlds with words instead — characters, maps, and drafts.",
    icon: BookOpen,
    colorVar: "o",
    gallery: [
      {
        id: "w1",
        title: "Drafts",
        description: "Exploring character arcs.",
        type: "image",
        cover: "https://images.unsplash.com/photo-1474932430478-367dbb6832c1?w=500&q=80",
        pdf: "/documents/draft_ch1.pdf",
        content: [{ type: "image", src: "https://images.unsplash.com/photo-1512446816042-444d641267d4?w=800&q=80", caption: "Concept" }]
      }
    ]
  }
];