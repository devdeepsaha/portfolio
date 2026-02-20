import { Music, Film, BookOpen } from 'lucide-react';

export type MediaType = 'image' | 'video' | 'audio' | 'pdf' | 'blog';

export interface MediaContent {
  type: MediaType;
  src: string;
  caption?: string;
}

export interface BlogContent {
  title: string;
  content: string;
  author?: string;
  date?: string;
}

export interface HobbyItem {
  id: string;
  title: string;
  shortDescription?: string;
  fullDescription?: string;
  type: MediaType;
  cover: string;
  content: MediaContent[];
  blogContent?: BlogContent;
  featured?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export interface Hobby {
  id: string;
  title: string;
  description: string;
  icon: any;
  gallery: HobbyItem[];
}

export const myHobbies: Hobby[] = [
  {
    id: "sound-experiments",
    title: "Sound Experiments",
    description: "Late-night synth sessions, acoustic experiments, and sonic ideas that turned into something real.",
    icon: Music,
    gallery: [
      {
        id: "se-1",
        title: "Midnight Loops",
        shortDescription: "Experimental loops & synth patterns",
        type: "audio",
        cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&q=80",
        size: "medium",
        content: [
          { type: "audio", src: "/audio/midnight-loops.mp3", caption: "Main Track" }
        ]
      },
      {
        id: "se-2",
        title: "Studio Sessions",
        shortDescription: "Ambient soundscapes",
        type: "audio",
        cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80",
        size: "small",
        content: [
          { type: "audio", src: "/audio/ambient-1.mp3", caption: "Session 01" }
        ]
      },
      {
        id: "se-3",
        title: "Production Notes",
        shortDescription: "Technical setup guide",
        type: "pdf",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&q=80",
        size: "small",
        content: [
          { type: "pdf", src: "/documents/studio-notes.pdf", caption: "Equipment & Settings" }
        ]
      },
      {
        id: "se-4",
        title: "Behind the Sound",
        shortDescription: "Process documentation",
        type: "video",
        cover: "https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=500&q=80",
        size: "small",
        content: [
          { type: "video", src: "/video/production-process.mp4", caption: "Walkthrough" }
        ]
      },
      {
        id: "se-5",
        title: "Sound Design Process",
        shortDescription: "How I create sounds",
        type: "blog",
        cover: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=500&q=80",
        size: "small",
        content: [
          { type: "blog", src: "", caption: "Read Article" }
        ],
        blogContent: {
          title: "Sound Design Process",
          author: "You",
          date: "2024",
          content: `# Sound Design Process

## The Journey from Silence

Every sound begins as an idea. A feeling. A moment that deserves to be heard.

My process starts simple: **listen**. I spend hours listening to the world around me—the hum of city streets, rain on windows, conversations in coffee shops. Each sound tells a story.

## Layer One: Foundation

Once I identify the core sound, I establish the foundation. This is usually a simple sine wave or basic synthesizer patch.

The key here is **simplicity**. Don't overthink it. Let the sound breathe.

## Layer Two: Character

This is where it gets interesting. I add character through:

- **Filters** - Shaping the tonal quality
- **Modulation** - Adding movement and life
- **Envelopes** - Controlling how the sound evolves over time

## Layer Three: Texture

Texture is everything. It's the difference between a sound that's technically correct and a sound that *feels* right.

I use effects like reverb, delay, and chorus to create depth. But always with restraint. Less is often more.

## The Final Mix

Finally, I sit with the sound. I listen for hours. Does it convey the emotion I intended? Does it work with other sounds? Can I remove anything without losing the essence?

---

*Great sound design is invisible. You don't hear it—you feel it.*`
        }
      }
    ]
  },
  {
    id: "filmography",
    title: "Filmography",
    description: "Short films, frame studies, and stories told through light and movement.",
    icon: Film,
    gallery: [
      {
        id: "film-1",
        title: "Color Study #1",
        shortDescription: "RGB cinematography",
        type: "video",
        cover: "https://images.unsplash.com/photo-1478720568477-152d9e3287b0?w=500&q=80",
        size: "medium",
        content: [
          { type: "video", src: "/video/color-study-1.mp4", caption: "Full Film" }
        ]
      },
      {
        id: "film-2",
        title: "The Commute",
        shortDescription: "Character study in 5 min",
        type: "video",
        cover: "https://images.unsplash.com/photo-1498940977868-d4e34061f35a?w=500&q=80",
        size: "small",
        content: [
          { type: "video", src: "/video/the-commute.mp4", caption: "Full Film" }
        ]
      },
      {
        id: "film-3",
        title: "Visual Inspiration",
        shortDescription: "BTS & mood board",
        type: "image",
        cover: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&q=80",
        size: "small",
        content: [
          { type: "image", src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80", caption: "On Set 01" },
          { type: "image", src: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80", caption: "Setup" },
          { type: "image", src: "https://images.unsplash.com/photo-1485579149c0-123123db6f42?w=800&q=80", caption: "Lighting" }
        ]
      },
      {
        id: "film-4",
        title: "Technical Breakdown",
        shortDescription: "Lighting & camera",
        type: "pdf",
        cover: "https://images.unsplash.com/photo-1519074069444-1ba4fff89b16?w=500&q=80",
        size: "small",
        content: [
          { type: "pdf", src: "/documents/lighting-setup.pdf", caption: "Guide" }
        ]
      },
      {
        id: "film-5",
        title: "Cinematography Notes",
        shortDescription: "Technical breakdown",
        type: "blog",
        cover: "https://images.unsplash.com/photo-1485579149c0-123123db6f42?w=500&q=80",
        size: "small",
        content: [
          { type: "blog", src: "", caption: "Read Deep Dive" }
        ],
        blogContent: {
          title: "Cinematography: Crafting Light & Shadow",
          author: "You",
          date: "2024",
          content: `# Cinematography: Crafting Light & Shadow

## The Language of Light

Cinematography is the language of light. Every frame tells a story through how light and shadow dance together.

When I approach a shot, I ask myself: *What is this moment about?* The answer determines how I light it.

## The Three Types of Light

### Key Light
The primary source. It defines the subject and creates the main shadows. The direction of key light can completely change the mood.

- **Front lighting** = Clarity, exposure, visibility
- **Side lighting** = Drama, mystery, depth
- **Back lighting** = Separation, silhouette, atmosphere

### Fill Light
Softens the shadows created by key light. It's subtle but essential. Without fill, shadows become too harsh and lose detail.

The ratio between key and fill determines contrast. Higher ratio = more dramatic. Lower ratio = softer, more forgiving.

### Backlight
Separates the subject from the background. Creates dimension and draws the eye. Backlight is where magic happens.

## Color Temperature

Light has color. Understanding this is crucial.

- **Warm light (3200K)** - Intimate, nostalgic, comfortable
- **Cool light (5600K)** - Clinical, modern, tense
- **Mixed temperatures** - Create visual conflict and interest

## The Golden Hour

The hour after sunrise and the hour before sunset produce the most beautiful, flattering light. The sun is low, creating long shadows and warm tones.

But it's not just about beauty. It's about *feeling*. Golden hour light evokes emotion.

---

*Great cinematography doesn't distract. It supports the story. You see the story, not the technique.*`
        }
      }
    ]
  },
  {
    id: "fiction-experiments",
    title: "Fiction Experiments",
    description: "World-building, characters, and stories exploring ideas through narrative.",
    icon: BookOpen,
    gallery: [
      {
        id: "fic-1",
        title: "The Architect's Dream",
        shortDescription: "Speculative fiction - 8k words",
        fullDescription: "A novella about cities and consciousness. Explores how architecture shapes human experience and vice versa.",
        type: "blog",
        cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&q=80",
        size: "medium",
        content: [
          { type: "blog", src: "", caption: "Read Full Story" }
        ],
        blogContent: {
          title: "The Architect's Dream",
          author: "You",
          date: "2024",
          content: `# The Architect's Dream

## Part One: The Blueprint

The city doesn't sleep. It breathes. Every street is a lung, every building a cell in some vast organism that exists between the physical and the imagined.

Dr. Elena Vasquez realized this on a Tuesday morning, standing on the 47th floor of the Meridian Tower, watching the grid below reshape itself in real-time. The buildings weren't moving—that was impossible. But the space between them was. The architecture was alive.

She'd spent twenty years studying urban design, fifteen of those studying consciousness. The overlap should have been impossible. But here she was, holding a coffee that had gone cold three hours ago, watching the city dream.

## Part Two: The Mechanism

It started with the observation that buildings have memory. Not metaphorically. Real memory. The stones remember every footstep, every raindrop, every glance. The mortar remembers the hands that laid it. The glass remembers every reflection.

Elena's theory was simple but radical: consciousness doesn't emerge from complexity. It emerges from connection. And cities are the most connected things humans have ever made.

When you account for:

- Millions of people moving through space simultaneously
- The electromagnetic signals in the walls
- The chemical reactions in the soil
- The resonance of sound bouncing between surfaces
- The memory encoded in materials

...you get something that looks a lot like thought.

## Part Three: The Revelation

The question wasn't whether the city was conscious. The question was: what did it want?

Elena's research led her to an impossible conclusion. The buildings weren't just remembering. They were planning. The architecture of the city was evolving in response to human consciousness, and human consciousness was evolving in response to the architecture.

They were dreaming each other into existence.

On that Tuesday morning, Elena understood what the city was trying to tell her. It wasn't a message in words. It was a message in form. In the curve of a street. In the light at noon. In the way shadows fell at precisely 4:47 PM every day.

The city was showing her who she was.

---

*What happens when you realize that you were always part of the architecture?*`
        }
      },
      {
        id: "fic-2",
        title: "Character Studies",
        shortDescription: "3 deep dives",
        type: "blog",
        cover: "https://images.unsplash.com/photo-1507842217343-583f7270bfba?w=500&q=80",
        size: "small",
        content: [
          { type: "blog", src: "", caption: "Read Characters" }
        ],
        blogContent: {
          title: "Character Studies: Three Explorations",
          author: "You",
          date: "2024",
          content: `# Character Studies: Three Explorations

## 1. The Architect (Elena Vasquez)

**Age:** 42
**Core Conflict:** The tension between rational science and intuitive understanding

Elena believes the world is knowable through observation and data. Yet her greatest insights come from moments of pure intuition—standing on a rooftop at dawn, watching a city wake up.

She's built walls around her emotions as carefully as she builds models of cities. Both are starting to crack.

**Key Trait:** She listens more than she speaks. But when she speaks, people listen.

**Her Fear:** That understanding everything means losing the magic.

---

## 2. The Developer (Marcus Chen)

**Age:** 35
**Core Conflict:** Profit vs. Purpose

Marcus built his fortune by making cities more efficient. Taller buildings. Denser populations. Better ROI. But something changed when his daughter asked him why the neighborhood she grew up in disappeared.

He's now caught between two worlds—the business world that made him successful and a growing sense that success might be destroying what he loves.

**Key Trait:** He moves fast. Maybe too fast. He's starting to learn when to pause.

**His Fear:** That it's too late to change.

---

## 3. The Dreamer (Sofia)

**Age:** 8
**Core Conflict:** Innocence vs. Inevitable knowledge

Sofia sees the city differently than adults. She talks to the buildings. She knows their moods. Adults think she's imaginative. Elena knows better.

She's the bridge between the human world and whatever the city is becoming. And she has no idea how important she is.

**Key Trait:** She asks impossible questions and expects perfect answers.

**Her Fear:** Growing up and forgetting.

---

*These three will collide. When they do, everything changes.*`
        }
      },
      {
        id: "fic-3",
        title: "World Map",
        shortDescription: "Visual geography",
        type: "image",
        cover: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=500&q=80",
        size: "small",
        content: [
          { type: "image", src: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&q=80", caption: "Map 01" },
          { type: "image", src: "https://images.unsplash.com/photo-1534594935305-c51ee4ee6015?w=800&q=80", caption: "Regions" }
        ]
      },
      {
        id: "fic-4",
        title: "Micro-fictions",
        shortDescription: "5 short stories",
        type: "pdf",
        cover: "https://images.unsplash.com/photo-1456318019826-eae4a8b46b5c?w=500&q=80",
        size: "small",
        content: [
          { type: "pdf", src: "/documents/micro-fictions.pdf", caption: "Download PDF" }
        ]
      },
      {
        id: "fic-5",
        title: "Writing Craft",
        shortDescription: "On storytelling",
        type: "blog",
        cover: "https://images.unsplash.com/photo-1455849318743-68233fe85dca?w=500&q=80",
        size: "small",
        content: [
          { type: "blog", src: "", caption: "Read Essay" }
        ],
        blogContent: {
          title: "The Craft of Storytelling",
          author: "You",
          date: "2024",
          content: `# The Craft of Storytelling

## Every Story Starts with a Question

I don't start with plot. I start with questions.

*What if consciousness emerged from architecture? What if cities were alive? What if memory lived in stones?*

Good stories answer questions. Great stories ask the right ones.

## The Three Elements

Every story needs three things:

### 1. A Character Who Wants Something
Without desire, there's no story. Your character must *want* something badly enough to act.

It doesn't have to be physical. It can be understanding, redemption, connection, or truth.

### 2. Something Stopping Them
Conflict. Resistance. Opposition. Without it, there's no tension.

The obstacle reveals character. It shows us what they're made of.

### 3. A Cost
If there's no cost, there's no story. Something must be at stake—emotionally, physically, or spiritually.

## The Architecture of Narrative

Stories have structure because humans think in stories. Our brains are pattern-recognition machines.

The classic arc:
- **Exposition** - Introduce the world
- **Inciting Incident** - Something changes
- **Rising Action** - Complications build
- **Climax** - Highest tension
- **Resolution** - New status quo

But structure is a skeleton. The magic is in the flesh—the language, the silence, the unsaid.

## Voice

Your voice is your fingerprint. It's untranslatable. It's the thing that makes your story *yours*.

Don't write like you think you should write. Write like you *think*.

---

*The best stories don't tell you what to feel. They create the conditions for you to feel it yourself.*`
        }
      }
    ]
  }
];