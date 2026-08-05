import { Link } from "react-router";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { myProjects } from "../ts/projects";
import { canonical, projectSlug } from "../lib/slugs";
import { PageShell } from "./PageShell";

const categories = ["All", "Web", "3D", "Graphics"] as const;
type Cat = (typeof categories)[number];

export function ProjectsIndex() {
  const [active, setActive] = useState<Cat>("All");
  const url = canonical("/projects");
  const description =
    "Every project by Devdeep Saha — web applications, 3D scenes rendered in Blender, and graphic design across posters, magazine covers, logos, and animations.";

  const filtered =
    active === "All"
      ? myProjects
      : myProjects.filter((p) => p.category === active);

  return (
    <PageShell>
      <Helmet>
        <title>Projects — Devdeep Saha</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
      </Helmet>

      <div>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-4">
          Work <span className="text-green">Gallery</span>
        </h1>
        <p className="text-lg text-muted-foreground font-medium mb-8 max-w-2xl">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest border transition-all ${
                active === c
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-secondary text-muted-foreground border-transparent hover:border-border hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <Link
              key={p.id}
              to={`/projects/${projectSlug(p)}`}
              className="group block bg-secondary/20 rounded-3xl p-3 border border-border hover:border-primary/50 transition-colors"
            >
              <div className="aspect-video rounded-2xl overflow-hidden mb-4 bg-secondary">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h2 className="px-2 text-xl font-black uppercase mb-1">
                {p.title}
              </h2>
              <p className="px-2 text-xs text-muted-foreground uppercase tracking-widest">
                {p.category}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
