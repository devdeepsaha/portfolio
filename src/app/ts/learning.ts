// src/ts/learning.ts

export type LearningCategory = "3D" | "AI" | "Backend" | "Frontend" | "Design" | "Video";

export interface LearningItem {
  id: number;
  title: string;
  subtitle: string;
  category: LearningCategory;
  description: string;
  tags: string[];
}

export const myLearning: LearningItem[] = [
  {
    id: 1,
    title: "Advanced UI/UX",
    subtitle: "Functional & Minimal Design",
    category: "Frontend",
    description: "Building this new portfolio by applying advanced design concepts. Focusing on bento-box layouts, typography, and ensuring the design is not just aesthetic but highly functional.",
    tags: ["Figma", "Tailwind", "Motion Design"],
  },
  {
    id: 2,
    title: "After Effects",
    subtitle: "Motion Graphics & VFX",
    category: "Video",
    description: "Diving deep into Adobe After Effects to create complex motion graphics, seamless transitions, and visual effects to elevate my digital storytelling.",
    tags: ["Keyframing", "Compositing", "Adobe Suite"],
  },
  {
    id: 3,
    title: "Sound Design",
    subtitle: "Audio Layering for Video",
    category: "Design",
    description: "Learning the art of sound layering in videography. Understanding how to use foley, ambient noise, and music to create immersive auditory experiences that match visual pacing.",
    tags: [ "Audio Mixing", "Sound Libraries"],
  },
]