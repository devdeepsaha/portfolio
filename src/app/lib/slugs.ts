import { myProjects, Project } from "../ts/projects";
import { myHobbies, Hobby, HobbyItem, BlogContent } from "../ts/hobbies";

export const SITE_URL = "https://devdeepsaha.in";

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

// ---------- Projects ----------

export function projectSlug(p: Project): string {
  return slugify(p.title);
}

export function findProjectBySlug(slug: string): Project | undefined {
  const norm = slug.toLowerCase();
  return (
    myProjects.find((p) => projectSlug(p) === norm) ||
    // also allow /projects/<id> as a fallback for older links
    myProjects.find((p) => String(p.id) === norm)
  );
}

export function allProjectRoutes(): string[] {
  return myProjects.map((p) => `/projects/${projectSlug(p)}`);
}

// ---------- Blogs (nested inside hobbies) ----------

export interface BlogEntry {
  slug: string;
  hobbyId: string;
  hobbyTitle: string;
  item: HobbyItem;
  blog: BlogContent;
}

export function allBlogs(): BlogEntry[] {
  const out: BlogEntry[] = [];
  for (const hobby of myHobbies) {
    for (const item of hobby.gallery) {
      if (item.type === "blog" && item.blogContent) {
        out.push({
          slug: slugify(item.blogContent.title || item.title),
          hobbyId: hobby.id,
          hobbyTitle: hobby.title,
          item,
          blog: item.blogContent,
        });
      }
    }
  }
  return out;
}

export function findBlogBySlug(slug: string): BlogEntry | undefined {
  const norm = slug.toLowerCase();
  return allBlogs().find((b) => b.slug === norm);
}

export function allBlogRoutes(): string[] {
  return allBlogs().map((b) => `/blog/${b.slug}`);
}

// ---------- Playground items (any type) ----------

export interface PlaygroundEntry {
  hobby: Hobby;
  hobbySlug: string;
  item: HobbyItem;
  itemSlug: string;
}

export function allPlaygroundEntries(): PlaygroundEntry[] {
  const out: PlaygroundEntry[] = [];
  for (const hobby of myHobbies) {
    for (const item of hobby.gallery) {
      out.push({
        hobby,
        hobbySlug: hobby.id, // hobby.id is already url-safe
        item,
        itemSlug: slugify(item.title),
      });
    }
  }
  return out;
}

export function findPlaygroundEntry(
  hobbySlug: string,
  itemSlug: string,
): PlaygroundEntry | undefined {
  const hs = hobbySlug.toLowerCase();
  const is = itemSlug.toLowerCase();
  return allPlaygroundEntries().find(
    (e) => e.hobbySlug === hs && e.itemSlug === is,
  );
}

// ---------- Full canonical URL builder ----------

export function canonical(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${clean}`;
}
