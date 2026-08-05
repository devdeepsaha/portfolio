import { Helmet } from "react-helmet-async";
import { myLearning } from "../ts/learning";
import { canonical } from "../lib/slugs";
import { PageShell } from "./PageShell";

export function LearningPage() {
  const url = canonical("/learning");
  const description =
    "Topics and skills Devdeep Saha is currently studying — advanced UI/UX, After Effects motion graphics, sound design for video.";

  return (
    <PageShell>
      <Helmet>
        <title>Currently Learning — Devdeep Saha</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
      </Helmet>

      <article>
        <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-4">
          Currently <span className="text-[#22c55e]">Learning</span>
        </h1>
        <p className="text-lg text-muted-foreground font-medium mb-12">
          {description}
        </p>

        <div className="space-y-6">
          {myLearning.map((item) => (
            <section
              key={item.id}
              className="bg-secondary/30 border border-border rounded-3xl p-6 md:p-8"
            >
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                {item.category}
              </div>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-2">
                {item.title}
              </h2>
              <p className="text-sm text-muted-foreground italic mb-4">
                {item.subtitle}
              </p>
              <p className="text-base leading-relaxed mb-4">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full border border-border text-xs font-bold uppercase tracking-widest"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </PageShell>
  );
}
