import { Link } from "react-router";
import { Helmet } from "react-helmet-async";
import { allBlogs, canonical } from "../lib/slugs";
import { PageShell } from "./PageShell";

export function BlogIndex() {
  const url = canonical("/blog");
  const description =
    "Essays and blog posts by Devdeep Saha on music, filmmaking, reading, and creative process.";
  const blogs = allBlogs();

  return (
    <PageShell>
      <Helmet>
        <title>Blog — Devdeep Saha</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
      </Helmet>

      <div>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-4">
          Writing
        </h1>
        <p className="text-lg text-muted-foreground font-medium mb-12 max-w-2xl">
          {description}
        </p>

        <ul className="space-y-6">
          {blogs.map((b) => (
            <li key={b.slug}>
              <Link
                to={`/blog/${b.slug}`}
                className="group block bg-secondary/20 rounded-3xl p-6 md:p-8 border border-border hover:border-primary/50 transition-colors"
              >
                <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
                  <span className="px-3 py-1 rounded-full border border-border">
                    {b.hobbyTitle}
                  </span>
                  {b.blog.date && <span>{b.blog.date}</span>}
                </div>
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">
                  {b.blog.title}
                </h2>
                {b.item.shortDescription && (
                  <p className="text-muted-foreground">
                    {b.item.shortDescription}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </PageShell>
  );
}
