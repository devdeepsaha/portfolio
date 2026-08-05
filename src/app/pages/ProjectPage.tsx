import { useParams, Link, Navigate } from "react-router";
import { Helmet } from "react-helmet-async";
import { ExternalLink, Github, FileText } from "lucide-react";
import { findProjectBySlug, canonical, projectSlug, SITE_URL } from "../lib/slugs";
import { myProjects } from "../ts/projects";
import { PageShell } from "./PageShell";

const isVideo = (url: string) => /\.(mp4|webm|ogg)$/i.test(url);

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? findProjectBySlug(slug) : undefined;

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  // Redirect old numeric-id URLs to slug URLs for canonicalization.
  const canonicalSlug = projectSlug(project);
  if (slug !== canonicalSlug) {
    return <Navigate to={`/projects/${canonicalSlug}`} replace />;
  }

  const url = canonical(`/projects/${canonicalSlug}`);
  const image = project.image?.replace(/^\.\//, "/");
  const ogImage = image ? `${SITE_URL}${image}` : `${SITE_URL}/banner-v2.png`;
  const description = project.description.replace(/\s+/g, " ").trim();
  const shortDesc = description.slice(0, 155);

  const related = myProjects
    .filter((p) => p.id !== project.id && p.category === project.category)
    .slice(0, 3);

  return (
    <PageShell>
      <Helmet>
        <title>{`${project.title} — Devdeep Saha`}</title>
        <meta name="description" content={shortDesc} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${project.title} — Devdeep Saha`} />
        <meta property="og:description" content={shortDesc} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={ogImage} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={`${project.title} — Devdeep Saha`} />
        <meta property="twitter:description" content={shortDesc} />
        <meta property="twitter:image" content={ogImage} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.title,
            genre: project.category,
            description,
            keywords: (project.tech || []).join(", "),
            image: ogImage,
            url,
            author: {
              "@type": "Person",
              name: "Devdeep Saha",
              url: SITE_URL,
            },
            ...(project.github ? { codeRepository: project.github } : {}),
          })}
        </script>
      </Helmet>

      <article>
        <div className="mb-6">
          <span className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
            {project.category}
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
          {project.title}
        </h1>

        {project.image && (
          <div className="rounded-3xl overflow-hidden border border-border mb-10 aspect-video bg-secondary">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        )}

        <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
          <p className="text-lg md:text-xl leading-relaxed whitespace-pre-line text-muted-foreground font-medium">
            {project.description}
          </p>
        </div>

        {project.tech && project.tech.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
              Tech
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-lg bg-secondary/50 border border-border text-xs font-bold uppercase tracking-widest"
                >
                  {t}
                </span>
              ))}
            </div>
          </section>
        )}

        <section className="flex flex-wrap gap-4 mb-16">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-black text-sm uppercase tracking-widest hover:opacity-90 transition-opacity"
            >
              <ExternalLink size={16} /> View Live
            </a>
          )}
          {project.pdf && (
            <a
              href={project.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-full font-black text-sm uppercase tracking-widest hover:bg-red-700 transition-colors"
            >
              <FileText size={16} /> Case Study
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 border border-border text-foreground rounded-full font-black text-sm uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
            >
              <Github size={16} /> Source Code
            </a>
          )}
        </section>

        {project.gallery && project.gallery.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">
              Gallery
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.gallery.map((src, i) =>
                isVideo(src) ? (
                  <video
                    key={i}
                    src={src}
                    className="w-full rounded-2xl border border-border bg-black"
                    controls
                    playsInline
                  />
                ) : (
                  <img
                    key={i}
                    src={src}
                    alt={`${project.title} — screenshot ${i + 1}`}
                    className="w-full rounded-2xl border border-border object-cover"
                    loading="lazy"
                  />
                ),
              )}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="mt-16 pt-10 border-t border-border">
            <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">
              More {project.category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((p) => (
                <Link
                  key={p.id}
                  to={`/projects/${projectSlug(p)}`}
                  className="block group bg-secondary/20 rounded-2xl p-4 border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="aspect-video rounded-xl overflow-hidden mb-3 bg-secondary">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                    {p.title}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </PageShell>
  );
}
