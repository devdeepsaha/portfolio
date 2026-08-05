import { useParams, Link, Navigate } from "react-router";
import { Helmet } from "react-helmet-async";
import {
  allBlogs,
  findBlogBySlug,
  canonical,
  SITE_URL,
} from "../lib/slugs";
import { PageShell } from "./PageShell";

// --- Minimal, dependency-free markdown renderer for blog content ---
// Handles: # ## ### headings, --- hr, blank lines, **bold**, *italic*, [link](url), plain paragraphs.

function formatInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex =
    /\*\*([^*]+)\*\*|\*([^*]+)\*|\[([^\]]+)\]\(([^)]+)\)|([^*[\]]+)/g;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(text)) !== null) {
    if (m[1]) parts.push(<strong key={m.index}>{m[1]}</strong>);
    else if (m[2]) parts.push(<em key={m.index}>{m[2]}</em>);
    else if (m[3] && m[4])
      parts.push(
        <a
          key={m.index}
          href={m[4]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          {m[3]}
        </a>,
      );
    else if (m[5]) parts.push(m[5]);
  }
  return parts.length ? parts : text;
}

function renderMarkdown(md: string) {
  return md.split("\n").map((line, i) => {
    if (line.startsWith("# "))
      return (
        <h1
          key={i}
          className="text-4xl md:text-5xl font-black tracking-tight mt-8 mb-6"
        >
          {line.slice(2)}
        </h1>
      );
    if (line.startsWith("## "))
      return (
        <h2
          key={i}
          className="text-2xl md:text-3xl font-black tracking-tight mt-8 mb-4"
        >
          {line.slice(3)}
        </h2>
      );
    if (line.startsWith("### "))
      return (
        <h3 key={i} className="text-xl font-bold mt-6 mb-3">
          {line.slice(4)}
        </h3>
      );
    if (line.startsWith("- "))
      return (
        <li key={i} className="ml-6 list-disc mb-1">
          {formatInline(line.slice(2))}
        </li>
      );
    if (line.trim() === "---")
      return <hr key={i} className="my-8 border-border" />;
    if (line.trim() === "") return <div key={i} className="h-3" />;
    return (
      <p key={i} className="mb-4 leading-relaxed text-lg">
        {formatInline(line)}
      </p>
    );
  });
}

export function BlogPage() {
  const { slug } = useParams<{ slug: string }>();
  const entry = slug ? findBlogBySlug(slug) : undefined;

  if (!entry) {
    return <Navigate to="/blog" replace />;
  }

  const { blog, item, hobbyTitle } = entry;
  const url = canonical(`/blog/${entry.slug}`);
  const ogImage = item.cover
    ? `${SITE_URL}${item.cover.replace(/^\.\//, "/")}`
    : `${SITE_URL}/banner-v2.png`;

  // Strip markdown for a plain-text description
  const plainDescription = blog.content
    .replace(/[#*_>`]/g, "")
    .replace(/---/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 155);

  const others = allBlogs()
    .filter((b) => b.slug !== entry.slug)
    .slice(0, 3);

  return (
    <PageShell>
      <Helmet>
        <title>{`${blog.title} — Devdeep Saha`}</title>
        <meta name="description" content={plainDescription} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${blog.title} — Devdeep Saha`} />
        <meta property="og:description" content={plainDescription} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={ogImage} />
        <meta property="article:author" content="Devdeep Saha" />
        {blog.date && <meta property="article:published_time" content={blog.date} />}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={`${blog.title} — Devdeep Saha`} />
        <meta property="twitter:description" content={plainDescription} />
        <meta property="twitter:image" content={ogImage} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: blog.title,
            description: plainDescription,
            image: ogImage,
            url,
            author: {
              "@type": "Person",
              name: blog.author || "Devdeep Saha",
              url: SITE_URL,
            },
            datePublished: blog.date,
            articleSection: hobbyTitle,
            mainEntityOfPage: url,
          })}
        </script>
      </Helmet>

      <article className="max-w-2xl mx-auto">
        <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
          <span className="px-3 py-1 rounded-full border border-border">
            {hobbyTitle}
          </span>
          {blog.date && <span>{blog.date}</span>}
          {blog.author && <span>By {blog.author}</span>}
        </div>

        <div className="blog-body">{renderMarkdown(blog.content)}</div>

        {others.length > 0 && (
          <section className="mt-16 pt-10 border-t border-border">
            <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">
              More writing
            </h2>
            <ul className="space-y-4">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    to={`/blog/${o.slug}`}
                    className="group block bg-secondary/20 rounded-2xl p-5 border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                      {o.hobbyTitle}
                    </div>
                    <div className="font-bold text-lg group-hover:text-primary transition-colors">
                      {o.blog.title}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </PageShell>
  );
}
