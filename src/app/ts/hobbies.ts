import { Music, Film, BookOpen } from "lucide-react";

export type MediaType = "image" | "video" | "audio" | "pdf" | "blog";

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
  size?: "small" | "medium" | "large" | "long";
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
    description:
      "Huge fan of music and musical instruments. Recently started experimenting with sound design and music production as a creative outlet and way to understand audio technology. I share my experiments, techniques, and process in this section.",
    icon: Music,
    gallery: [
      {
        id: "1",
        title: "Growing Up Around Music",
        shortDescription: "My musical journey from childhood to now.",
        type: "blog",
        cover: "./playground/music/images/6.jpg",
        size: "medium",
        content: [{ type: "blog", src: "", caption: "Read Article" }],
        blogContent: {
          title: "Growing Up Around Music",
          author: "Devdeep Saha",
          date: "20/02/2026",
          content: `# Growing Up Around Music

## The Beginning

I had a Casio synthesiser when I was very small, probably around 3 years old when I had just learned to walk and talk. I remember seeing my dad play it sometimes, and naturally I wanted to try it too. He also had an electric guitar which always caught my attention.

I didn’t realise it back then, but I grew up surrounded by instruments.

---

## Music at Home

My taste in music mostly came from my mom. She used to hum songs in the kitchen while I studied or just sat around doing my own thing. Music was always present in small everyday moments.

---

## Singing Without Thinking Too Much

During school days I wasn’t shy about singing at all. I would randomly sing during train journeys without worrying about what others might think.

People actually appreciated it a lot. Some even asked my mom where I learned music or if I attended a music school. The funny part was that my mom herself was surprised and said she was hearing me sing like that properly for the first time too.

---

## Learning Harmonium

Seeing my interest, my parents admitted me to a music school. I learned harmonium there for around four years, which gave me a classical foundation.

Since we didn’t have a harmonium at home, I practiced on my Casio keyboard instead.

## College and Rediscovering Instruments

When I went to college, I took my synthesiser with me and later bought a ukulele. The ukulele felt very easy compared to guitar, which I had tried earlier but didn’t enjoy because the strings felt too difficult.

I started with basic chords like G, Am, F, and D, then slowly learned more. Playing ukulele helped me understand guitar better, and when I tried guitar again later, it suddenly felt much easier.

---

## Exploring New Instruments

After that I kept exploring different instruments.

I bought a flute, which turned out to be the hardest instrument I’ve tried so far. I can play basic sargam but I’m still learning.

I also bought a kalimba because of its soft and melodic sound, and I occasionally play my dad’s electric guitar again.

Now I feel like I’m surrounded by instruments again, just like childhood, but with more understanding.

---

## Where I Am Now

These days I’m learning how to layer sounds and build music piece by piece. Music is something I explore alongside everything else I do, and learning something new always makes me happy.

And honestly, someday I would really love to learn drums. They just look too cool.

---`,
        },
      },
      {
        id: "2",
        title: "Intro [Instrumental]",
        shortDescription: "Experimental guitar track",
        fullDescription: `This track started with the main score composed by Vaibhav Shanu my friend. He laid down the core melody and mood, and I built around it adding drums, bass, and extra layers to shape the final song.
        We never really named it. It was more about experimenting and seeing where the sound could go rather than forcing it into a structure.`,
        type: "audio",
        cover: "./playground/music/images/5.jpg",
        size: "small",
        content: [
          {
            type: "audio",
            src: "./playground/music/mp3/1.mp3",
            caption: "Main Track",
          },
        ],
      },
      {
        id: "3",
        title: "Dhoop",
        shortDescription:
          "Synth by Vaibhav, layers + lyrics experiments by me.",
        fullDescription: `The main synth idea for this track was played by Vaibhav Shanu that became the starting point. I built around it by adding layers, structure, and extra elements to shape the overall vibe.

        At that time I was literally sitting in the sun (dhoop), so I started playing with rhymes like dhoop, coupe, move, groove, prove. I even built a small lyrics-writing bot to help generate ideas, and from that I wrote the Hinglish rap lyrics you hear here.
        After that, I used Suno AI to generate the vocal performance and then merged everything together , the original synth foundation, my added layers, and the AI vocals.
        `,
        type: "audio",
        cover: "./playground/music/images/3.jpg",
        size: "large",
        content: [
          {
            type: "audio",
            src: "./playground/music/mp3/5.mp3",
            caption: "Dhoop",
          },
        ],
      },
      {
        id: "4",
        title: "Started With a Synth",
        shortDescription: "Synth by Vaibhav, layers and structure by me.",
        fullDescription: `This track began with Vaibhav playing around on the synth. Once we had that main idea, I started adding layers , rhythm, depth, small atmospheric elements , and we let it grow naturally. The process was very fluid. We didn't have a clear plan, just a vibe we wanted to capture. It was about exploring the sound and seeing where it took us rather than trying to fit it into a specific genre or structure.
        `,
        type: "audio",
        cover: "./playground/music/images/2.jpg",
        size: "small",
        content: [
          {
            type: "audio",
            src: "./playground/music/mp3/3.mp3",
            caption: "Session 01",
          },
        ],
      },
      {
        id: "5",
        title: "Intro Clean [Instrumental]",
        shortDescription: "Synth by Vaibhav, layers and structure by me.",
        fullDescription: `This track began with Vaibhav playing around on the synth. Once we had that main idea, I started adding layers , rhythm, depth, small atmospheric elements , and we let it grow naturally. The process was very fluid. We didn't have a clear plan, just a vibe we wanted to capture. It was about exploring the sound and seeing where it took us rather than trying to fit it into a specific genre or structure.
        `,
        type: "audio",
        cover: "./playground/music/images/1.jpg",
        size: "long",
        content: [
          {
            type: "audio",
            src: "./playground/music/mp3/4.mp3",
            caption: "Session 02",
          },
        ],
      },

      {
        id: "6",
        title: "Janam Janam Piano Cover",
        shortDescription:
          "Piano cover of the song Janam Janam from the movie Dilwale ",
        type: "video",
        cover: "./playground/music/images/4.jpg",
        size: "small",
        content: [
          {
            type: "video",
            src: "/playground/music/mp4/2.mp4",
            caption: "Piano Cover",
          },
        ],
      },
      {
        id: "7",
        title: "Mr Bean Piano Cover",
        shortDescription:
          "Piano cover of the iconic Mr Bean theme song, which is one of my all-time favorites. I wanted to see if I could capture the quirky and playful essence of the original while adding my own touch to it.",
        type: "video",
        cover: "./playground/music/images/7.jpg",
        size: "small",
        content: [
          {
            type: "video",
            src: "/playground/music/mp4/3.mp4",
            caption: "Piano Cover",
          },
        ],
      },
      {
        id: "8",
        title: "Wakt Ki Baatein Ukulele Cover",
        shortDescription:
          "Ukulele cover of the song 'Wakt ki baatein' by Dream Note. I wanted to experiment with how this emotional and melodic song would sound on the ukulele, which has a very different tone and vibe compared to the original.",
        type: "video",
        cover: "./playground/music/images/8.jpg",
        size: "small",
        content: [
          {
            type: "video",
            src: "/playground/music/mp4/4.mp4",
            caption: "Piano Cover",
          },
        ],
      },
    ],
  },
  {
    id: "filmography",
    title: "Filmography",
    description:
      "Filmography has been a long-running creative exploration for me, starting with photography and evolving into filmmaking through hands-on experimentation. Working mostly with limited gear, I focused on learning lighting, composition, sound, and editing through trial-and-error.",
    icon: Film,
    gallery: [
      {
        id: "1",
        title: "How Filmography found me",
        shortDescription: "",
        type: "blog",
        cover: "/playground/film/images/12.jpg",
        size: "long",
        content: [{ type: "blog", src: "", caption: "Read Deep Dive" }],
        blogContent: {
          title: "How I Fell Into Filmography",
          author: "Devdeep Saha",
          date: "21/02/2026",
          content: `# How I Fell Into Filmography

## The Starting

I was in class 6 or 7 when my cousin sister introduced me to photography. She had a Nikon point-and-shoot camera and used to click pictures of butterflies. Watching her focus on small details made me curious.

One day she showed me the **half-shutter technique** , press halfway, wait for focus, then press fully. That small technical trick felt magical to me.

I’ve always loved technology, so this immediately pulled me in.
---
## Lockdown

Fast forward to after my class 10 boards, lockdown started. Around that time we bought a new phone because I was planning to start my YouTube channel.

And like always, I didn’t just use it normally.

I opened every setting I could find.

I had already developed this mindset of *reverse engineering things*, because I knew most mistakes can be undone. That removed fear completely.

That’s when I discovered **Pro Mode**.

ISO, shutter speed, EV, focus distance, white balance, saturation, tint , suddenly photography became technical.

Instead of guessing, I started experimenting:

- Clicking the same subject with different settings.
- Changing ISO to understand noise.
- Adjusting shutter speed to see motion blur and light effects.
- Playing with focus and depth.

I learned by trial and error.

For example, I realised that in dark rooms, increasing shutter speed could capture light trails, and even the smallest light source could dramatically change the image if handled correctly.

Then I discovered *noise*. Photos looked grainy when ISO was too high, so I learned balancing ISO with shutter speed gives cleaner results.

That was probably my first real lesson in technical photography.
---
## Editing

Soon I realised photography isn’t just about clicking.

It’s **50% capturing and 50% editing**.

That’s when I started learning Adobe Lightroom.

And honestly, my learning method was simple , move every slider and observe.

Exposure, highlights, shadows, contrast, color grading , I wanted to understand how mood changes with small adjustments.

That curiosity slowly pulled me deeper into visual storytelling.
---
## From Photography to Filmography

Since I was already creating YouTube content, video editing became a natural extension.

I began learning:

- Seamless transitions
- Storytelling structure
- Timing and pacing
- How visuals guide emotion

But one major lesson changed everything for me:

**Sound matters more than visuals sometimes.**

A video without good sound feels empty. That realisation connected my interest in music with visual storytelling.
---
## Experimentation Phase

Because I was already exploring sound layering (from my music journey), I became interested in:

- Stop motion
- Animation
- Creative transitions
- Different video formats

My tools were limited , mostly a phone and a *potato PC*. But limitations actually forced me to think creatively.

I experimented constantly.

Sometimes things worked. Sometimes they didn’t. But every experiment taught me something.
---
## Learning Lighting and Noise Control

Over time I started studying lighting setups and noise reduction techniques.

YouTube tutorials helped a lot, but I always tested things myself instead of blindly following.

Some tutorials that helped me:

[Lighting Tutorial](https://youtu.be/J_R-KnO-7QY)  
[Noise & Video Basics](https://youtu.be/l1f09pNhH2I)
---
## Where I Am Now

Filmography for me isn’t just about cinematic visuals. It’s about understanding how **light, sound, movement, and editing** work together.

It started with curiosity, grew through experimentation, and continues to evolve.

And honestly, this blog is becoming my diary , a place where I share what I learn along the way.

More blogs coming soon.

*Peace out and bye bye.*`,
        },
      },
      {
        id: "2",
        title: "Revenge (Short Film)",
        shortDescription:
          "A short film I made after buying a double door fridge",
        type: "video",
        cover: "playground/film/images/revenge.jpg",
        size: "medium",
        content: [
          {
            type: "video",
            src: "playground/film/mp4/2.mp4",
            caption: "Revenge - Short Film",
          },
        ],
      },
      {
        id: "3",
        title: "Cloning Myself",
        shortDescription:
          "A fun experiment where I cloned myself using layers of footage stacked together.",
        type: "video",
        cover: "playground/film/images/13.png",
        size: "large",
        content: [
          {
            type: "video",
            src: "/playground/film/mp4/3.mp4",
            caption: "Cloning",
          },
        ],
      },
      {
        id: "4",
        title: "Camera Angles and Lighting BTS",
        shortDescription: "",
        type: "image",
        cover: "playground/film/images/11.jpg",
        size: "small",
        content: [
          {
            type: "image",
            src: "/playground/film/images/8.jpg",
            caption: `This scene is from the short film 'Revenge'. The camera is 
            positioned inside the fridge and in the foreground of the 
            camera is the ice cream tub and in the backgrounf I am looking into the fridge with 
            partial reveal of my face.It seems like I am searching something in the fridge 
            and the ice cream tub is blocking the object which I am looking for.
            The lighting is coming from the top of the fridge which is creating a dramatic effect and also highlighting the ice cream tub in the foreground. 
            I wanted to create a sense of mystery and tension in this shot, and I think the lighting and camera angle helped achieve that.
            `,
          },
          {
            type: "image",
            src: "/playground/film/images/7.jpg",
            caption: `In this shot I am taking something else from the fridge while the camera angle is focus towards the
            shelf on the side of the fridge. The object is partially visible because of the translucent plastic
            . It creates a sense of mystery about what I am taking from the fridge.
            Dramatic light and dark room also adds to the tension and suspense of the scene.
            `,
          },
          {
            type: "image",
            src: "/playground/film/images/6.jpg",
            caption: `This is a simple shot where we are opening the fridge to reveal its content inside.
            The colours are graded for the dark atmosphere vibe we are trying to achieve.
            `,
          },
          {
            type: "image",
            src: "/playground/film/images/5.jpg",
            caption: `In this shot, the camera is positioned behind me as I open the fridge, 
            making the viewer feel like they are standing just slightly outside the action.
            The dominant blue tone was a conscious creative choice. 
            Since the inside of a fridge represents coldness, I leaned into that idea visually 
            By pushing the color grading towards cooler tones, 
            the environment instantly feels colder and more isolated,
            even though it’s just a normal everyday action.

           I also added artificial glare on the glasses during post-production. 
           This wasn’t present in the original footage, but introducing that light 
           reflection added a subtle stylistic element and helped separate 
           the silhouette from the bright background. 
           It gives the shot a slightly surreal quality and enhances 
           the cinematic feel without changing the natural movement of the scene.
            `,
          },
          {
            type: "image",
            src: "/playground/film/images/4.jpg",
            caption: `In this shot, the camera is mounted directly on the fridge, 
            giving a top-down perspective. I chose this angle to break the normal 
            eye-level framing and create a slightly uncomfortable feeling. 
            When the perspective changes suddenly, the audience subconsciously feels 
            that something is different.
            The red lighting is intentional. 
            Red usually symbolizes warning, urgency, or something unusual 
            happening. Up until now, the fridge environment was cold and blue, 
            representing calm and stillness. But here, the color shifts dramatically. 
            This transition suggests that the situation is no longer normal.
            The character in the frame is not casually looking for ice cream. 
            His body language shows urgency , leaning forward, moving quickly, not relaxed. 
            The red light enhances that sense of rush and tension. It makes the viewer question: 
            why is he in such a hurry? What is actually happening?`,
          },
          {
            type: "image",
            src: "/playground/film/images/3.jpg",
            caption: `This frame looks simple at first glance , 
            just a hand reaching inside the fridge , but technically it was one of the more 
            complicated shots to achieve because everything was filmed using a mobile phone.
            To get this angle, I physically mounted my phone inside the fridge using double-sided
            tape. Since the camera was fixed inside, I couldn’t directly interact with the phone 
            while recording. So instead, I screen-shared the camera app to my laptop and remotely 
            controlled the phone from there. This allowed me to monitor framing and adjust settings
            like ISO, shutter speed, and exposure without removing the camera from position.
            The challenge here was balancing practicality with creativity. Working inside a 
            confined space meant limited control over lighting and movement, so careful planning
            was required before recording. The slight motion blur during the grab was intentional
            , I wanted the action to feel natural and slightly rushed rather than perfectly clean
            or staged.
            This shot represents my approach to filmmaking: using available tools
            creatively and solving technical limitations through experimentation 
            instead of expensive gear.
            
            `,
          },
          {
            type: "image",
            src: "/playground/film/images/1.jpg",
            caption: `For this shot, I placed the camera facing downward on the bottom shelf 
            of the fridge, using the same setup where the phone was fixed in place and controlled 
            remotely from my laptop. Since I couldn’t physically adjust the phone once it was inside,
            I monitored framing and settings like ISO, shutter speed, and exposure through 
            screen sharing.
            The interesting part of this shot comes from the material 
            of the shelf itself. The top shelf is made of translucent glass, 
            which allowed me to capture a bottom-up perspective without directly 
            showing everything clearly. This creates a layered visual , 
            the viewer sees shapes and movement through diffusion rather than sharp detail.
            I wanted the audience to feel like they were inside the fridge, 
            almost like an object being watched or taken. When the ice cream 
            tub moves across the frame, the perspective makes the action feel 
            slightly unusual and more cinematic than a normal eye-level shot.
            Technically, this was challenging because shooting through translucent 
            glass reduces clarity and light, so exposure needed careful adjustment 
            to avoid losing detail while still keeping the cold, moody atmosphere.
            `,
          },
          {
            type: "image",
            src: "/playground/film/images/2.jpg",
            caption: `This frame shows the comparison between the original 
            footage and the final graded version. The raw shot was bright, neutral,
            and closer to natural white light , which technically looked clean but didn’t 
            match the atmosphere I wanted for the story.
            During editing, I pushed the color palette toward 
            cooler blue tones to reinforce the idea of coldness and isolation 
            inside the fridge. Since cold is often visually associated with blue, 
            shifting the temperature helped the environment feel more intentional rather than 
            just realistic.
            I reduced warmth, adjusted shadows, and slightly controlled highlights 
            to avoid harsh brightness from the fridge light. The goal was not just to change 
            colors but to change the emotional response of the shot. The original version feels 
            like everyday reality, while the graded version creates a more moody, 
            cinematic atmosphere.
`,
          },
        ],
      },
      {
        id: "5",
        title: "Golden Hour ",
        shortDescription:
          "This is a video I shot of a tree during golden hour and then colour graded it to enhance the warm tones and mood. I wanted to capture the beauty of that moment and see how much I could enhance it through editing.",
        type: "video",
        cover: "/playground/film/images/10.jpg",
        size: "small",
        content: [
          {
            type: "video",
            src: "playground/film/mp4/1.mp4",
            caption: "Full Film",
          },
        ],
      },
    ],
  },
  {
    id: "fiction-experiments",
    title: "Fiction Experiments",
    description:
      "Short fictional ideas where I experiment with mood, storytelling, and visual style.",
    icon: BookOpen,
    gallery: [
      {
        id: "1",
        title: "Stories Within Stories",
        shortDescription: "How I got into reading",
        fullDescription:
          "This is a blog where I talk about how I got into reading, the books that shaped my thinking, and how reading influenced my creative journey. It’s a personal reflection on the role of stories in my life and how they continue to inspire me.",
        type: "blog",
        cover: "playground/fiction/images/1.jpg",
        size: "medium",
        content: [{ type: "blog", src: "", caption: "Read Full Story" }],
        blogContent: {
          title: "Stories Within Stories",
          author: "Devdeep Saha",
          date: "23/02/2026",
          content: `# Stories Within Stories

## Three chapters of the same book

If you look at my journey - sound design, filmmaking, and story writing , it might look like three completely different directions. But honestly, they never felt disconnected to me. They are like three chapters of the same book (lol I am proud of this pun).

Each one naturally blends into the other.

Filmmaking is storytelling in visual form.  
Story writing is basically scriptwriting at its core.  
Sound design is storytelling through audio , emotions without visuals.

All three mediums are just different languages for telling stories. They layer on top of each other the same way chapters layer inside a book, or the way sound layers inside a soundscape, or how shots stack inside a timeline.


## Growing up surrounded by stories

I’ve always been a reading person, and honestly, a lot of credit goes to my mother, my cousin sister, and my entire cousin group.
My mom is a huge literature lover and an avid reader, so stories were always part of the environment around me. Books weren’t something distant , they were just… normal life.
At some point I thought: why wait for someone else to narrate stories when I can explore them myself?

Fun fact , I’m Bengali, but I never officially had Bengali as a subject in school. So technically I wasn’t formally taught how to read or write it.
But my mom gave me a Bengali letter book.
And that changed everything.

I started slowly reading Bengali magazines filled with detective stories, ghost stories, short novels, and random fun pieces. At first I read painfully slowly , guessing words letter by letter, sometimes just trying to recognise patterns.
But it felt incredibly rewarding.
Little by little, I taught myself to read Bengali.
One day during a train journey, my mom noticed I was reading a Bengali book. She looked genuinely shocked.
"You can read this?"
And I was like… yeahhh 
The expression on her face was worth it.

## Books that shaped how I think

Over time I started reading more and more.

Some classics that stayed with me:

- *Heidi*
- *Black Beauty*
- *Sherlock Holmes*
- *The Adventures of Tom Sawyer*
- *The Invisible Man*

Book fairs became a regular thing. Every year meant discovering new authors, picking random titles based on instinct , it felt like exploring multiple worlds at once.

If I had to name a favourite English author, it would probably be **Ruskin Bond**.

His writing feels simple but deeply observant. He finds meaning in small moments and ordinary things. Stories like *A Face in the Dark* and especially the Rusty series stayed with me because they feel quiet yet powerful.

But honestly, I could list dozens more authors that deserves its own blog someday.

## When reading turned into writing

In my first year of college, a group of us planned to shoot a short film. We created a story together and had big plans.

But the film never got shot.

Instead of letting the idea disappear, I decided to write it as a novel.

Yes 

That story became something much bigger. The first part exists because of audience reactions and encouragement, and the second part is almost ready.
It taught me something important: stories don’t belong to one format. If one medium fails, the story finds another way to exist.
## Books taught me more than stories

Reading shaped not just how I think but also how I create.

And I didn’t only learn from what’s written inside them. I learned from their covers too.
People say don’t judge a book by its cover , but honestly, book covers taught me a lot.

When you walk through a crowded book fair, hundreds of books compete for attention. The cover needs to create curiosity instantly. It needs to communicate mood, tone, and personality without saying much.

So I started analysing both:

- what the cover communicates visually
- what the story communicates emotionally

I judge books by both their cover and their content.

Because sometimes the spark begins with the cover , and that spark makes someone discover the gold inside.

## The journey continues

This is just a small summary of my reading journey. There’s a lot more , and I’ll probably write another blog talking about specific books and experiences in detail.

Because honestly, this space has become my diary now , a place where I document how I learn, experiment, and grow.

See you soon!`,
        },
      },
      {
        id: "2",
        title: "The Hostel Door | Ongoing",
        shortDescription: "A fiction work written by me. ",
        type: "pdf",
        cover: "/playground/fiction/images/2.jpg",
        size: "long",
        content: [
          {
            type: "pdf",
            src: "/playground/fiction/pdf/1.pdf",
            caption: "The Hostel Door",
          },
        ],
      },
      {
        id: "3",
        title: "Reading Journey",
        shortDescription:
          "A blog where I talk about the books that shaped my thinking and how reading influenced my creative journey.",
        type: "blog",
        cover: "playground/fiction/images/3.jpg",
        size: "large",
        content: [{ type: "blog", src: "", caption: "Read Essay" }],
        blogContent: {
          title: "Reading Journey",
          author: "Devdeep Saha",
          date: "23/02/2026",
          content: `# Reading Journey
## Before we begin...

If you haven’t read my previous blog and somehow landed here directly (probably because *omggg big tileee* caught your attention ), then you should definitely go back and check out my BLOG POST (Stories Within Stories) , how it started and everything behind it.

And if you already came from there, welcome back. As promised, here’s the list of books and authors that shaped my journey so far. Some of my books are currently at my hostel, so this list isn’t complete yet. I’ll keep updating it as soon as I get back and rediscover more titles from my collection.

## Books that shaped my journey

Here are some of the books and authors that have stayed with me over time:

- *Black Beauty* — Anna Sewell  
- *The Jungle Book* — Rudyard Kipling  
- *The Adventures of Sherlock Holmes* — Arthur Conan Doyle  
- *The Invisible Man* — H.G. Wells  
- *Feluda series* (all volumes) — Satyajit Ray  
- *Kakababur Adventures* (all volumes) — Sunil Gangopadhyay  
- *Monojder Obdhut Bari* — Shirshendu Mukhopadhyay  
- *Heidi* — Johanna Spyri  
- *Chander Pahad* — Bibhutibhushan Bandyopadhyay  
- *Rusty series* — Ruskin Bond  
- *The Blue Umbrella* — Ruskin Bond  
- *Ghost Stories* — Ruskin Bond  
- *Alice in Wonderland* — Lewis Carroll  
- *The Adventures of Tom Sawyer* — Mark Twain  
- *The Time Machine* — H.G. Wells  
- *The Little Prince* — Antoine de Saint-Exupéry  
- *The Body in the Swimming Pool* — Shabnam Minwalla  
- *The Alchemist* — Paulo Coelho  
- *I Came Upon a Lighthouse* — Shantanu Naidu  

…and many more that I will keep adding as I continue remembering and revisiting them.

## For now…

For the time being, I’m uploading **two PDFs** for you all to enjoy.

###  The Complete Sherlock Holmes

One of my all-time favourites — sharp observation, clever deduction, and stories that make you think differently about small details around you.

###  Incognito — David Eagleman

A fascinating look into human psychology and the subconscious mind. This book made me realise how much of our decisions happen without us being fully aware of them.
Both are very different reads, but equally interesting in their own ways.

`,
        },
      },
      {
        id: "4",
        title: "Incognito",
        shortDescription: "David Eagleman",
        type: "pdf",
        cover: "/playground/fiction/images/4.jpg",
        size: "small",
        content: [
          {
            type: "pdf",
            src: "/playground/fiction/pdf/2.pdf",
            caption: "Incognito",
          },
        ],
      },
      {
        id: "5",
        title: "The complete Sherlock Holmes",
        shortDescription: "Arthur Conan Doyle",
        type: "pdf",
        cover: "/playground/fiction/images/5.jpg",
        size: "small",
        content: [
          {
            type: "pdf",
            src: "/playground/fiction/pdf/3.pdf",
            caption: "The Complete Sherlock Holmes",
          },
        ],
      },
    ],
  },
];
