import { Helmet } from "react-helmet-async";
import { myProjects } from "../ts/projects";
import { resumeData } from "../ts/resume-data";
import { myJourney } from "../ts/story";
import { myLearning } from "../ts/learning";
import { myHobbies } from "../ts/hobbies";

const SITE_URL = "https://devdeepsaha.in";

/**
 * SEOContentIndex renders every piece of portfolio data as
 * visually-hidden semantic HTML, so search engines, screen readers,
 * and AI agents can index everything on the first HTML paint —
 * without waiting for tile modals to be opened.
 *
 * Also emits per-project and per-experience JSON-LD via Helmet.
 */
export function SEOContentIndex() {
  const projectsLd = {
    "@context": "https://schema.org",
    "@graph": myProjects.map((p) => ({
      "@type": "CreativeWork",
      "@id": `${SITE_URL}/#projects/${p.id}`,
      name: p.title,
      genre: p.category,
      description: p.description.replace(/\s+/g, " ").trim(),
      keywords: (p.tech || []).join(", "),
      url: p.link || `${SITE_URL}/#projects/${p.id}`,
      image: p.image ? `${SITE_URL}${p.image.replace(/^\.\//, "/")}` : undefined,
      author: { "@id": `${SITE_URL}/#person` },
      creator: { "@id": `${SITE_URL}/#person` },
      isPartOf: { "@id": `${SITE_URL}/#projects` },
      ...(p.github ? { codeRepository: p.github } : {}),
      ...(p.pdf
        ? {
            associatedMedia: {
              "@type": "MediaObject",
              contentUrl: p.pdf.startsWith("http")
                ? p.pdf
                : `${SITE_URL}${p.pdf.replace(/^\.\//, "/")}`,
              encodingFormat: "application/pdf",
            },
          }
        : {}),
    })),
  };

  const experienceLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person-experience`,
    name: "Devdeep Saha",
    hasOccupation: resumeData.experience.map((job) => ({
      "@type": "Occupation",
      name: job.role,
      occupationLocation: { "@type": "Organization", name: job.company },
      description: job.description,
      skills: job.tags.join(", "),
      estimatedSalary: undefined,
    })),
    alumniOf: resumeData.education.map((edu) => ({
      "@type": "EducationalOrganization",
      name: edu.institution,
      description: `${edu.degree} — ${edu.year} — ${edu.score}`,
    })),
    hasCredential: [
      ...resumeData.certifications.professional,
      ...resumeData.certifications.extracurricular,
    ].map((c) => ({
      "@type": "EducationalOccupationalCredential",
      name: c.name,
      recognizedBy: { "@type": "Organization", name: c.issuer },
      dateCreated: c.year,
    })),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(projectsLd)}</script>
        <script type="application/ld+json">
          {JSON.stringify(experienceLd)}
        </script>
      </Helmet>

      <div className="sr-only" aria-hidden="false">
        <section aria-labelledby="seo-about-heading">
          <h2 id="seo-about-heading">About Devdeep Saha</h2>
          <p>
            Devdeep Saha is a designer and web developer based in Kolkata,
            India — a "designer who codes" building full-stack web applications,
            3D scenes in Blender, and graphic design work across posters,
            magazine covers, logos, tee-shirts, and animations. Currently a
            Bachelor of Technology (Computer Science and Engineering) student
            at Abacus Institute of Engineering and Management, graduating 2026,
            and available for immediate joining. Reach him at
            devdeep120205@gmail.com.
          </p>
        </section>

        <section aria-labelledby="seo-stack-heading">
          <h2 id="seo-stack-heading">Tech Stack and Tools</h2>
          <p>
            React, Next.js, Laravel, Flask, Tailwind CSS, TypeScript, MySQL,
            Android Studio, Flutter, HTML, CSS, JavaScript. Additional tools:
            Vite, shadcn/ui, Framer Motion (motion/react), Radix UI, Swiper,
            Supabase, PostgreSQL, Google Gemini API, Render, Vercel. Design
            tools: Figma, Blender, Microsoft PowerPoint, PicsArt, Canva, Adobe
            After Effects.
          </p>
        </section>

        <section aria-labelledby="seo-education-heading">
          <h2 id="seo-education-heading">Education</h2>
          <ul>
            {resumeData.education.map((e, i) => (
              <li key={i}>
                <strong>{e.degree}</strong> — {e.institution} — {e.year} —{" "}
                {e.score}
                {e.isCurrent ? " (currently enrolled)" : ""}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="seo-experience-heading">
          <h2 id="seo-experience-heading">Work Experience</h2>
          {resumeData.experience.map((job, i) => (
            <article key={i}>
              <h3>
                {job.role} — {job.company}
              </h3>
              <p>
                <em>{job.year}</em>
              </p>
              <p>{job.description}</p>
              <p>Tools: {job.tags.join(", ")}.</p>
            </article>
          ))}
        </section>

        <section aria-labelledby="seo-certs-heading">
          <h2 id="seo-certs-heading">Certifications</h2>
          <h3>Professional</h3>
          <ul>
            {resumeData.certifications.professional.map((c, i) => (
              <li key={i}>
                {c.name} — {c.issuer} — {c.year}
              </li>
            ))}
          </ul>
          <h3>Extracurricular</h3>
          <ul>
            {resumeData.certifications.extracurricular.map((c, i) => (
              <li key={i}>
                {c.name} — {c.issuer} — {c.year}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="seo-projects-heading">
          <h2 id="seo-projects-heading">Selected Projects</h2>
          <p>
            Full case-study index. Each project has a deep-linkable URL of the
            form <code>{SITE_URL}/#projects/&lt;id&gt;</code>.
          </p>
          {myProjects.map((p) => (
            <article
              key={p.id}
              id={`project-${p.id}`}
              itemScope
              itemType="https://schema.org/CreativeWork"
            >
              <h3 itemProp="name">{p.title}</h3>
              <p>
                <strong>Category:</strong>{" "}
                <span itemProp="genre">{p.category}</span>
              </p>
              <p itemProp="description">
                {p.description.replace(/\s+/g, " ").trim()}
              </p>
              {p.tech && p.tech.length > 0 && (
                <p>
                  <strong>Tech:</strong>{" "}
                  <span itemProp="keywords">{p.tech.join(", ")}</span>.
                </p>
              )}
              <p>
                <a
                  href={`${SITE_URL}/#projects/${p.id}`}
                  itemProp="url"
                >
                  Open project details
                </a>
                {p.link && (
                  <>
                    {" · "}
                    <a href={p.link} itemProp="mainEntityOfPage">
                      View live
                    </a>
                  </>
                )}
                {p.github && (
                  <>
                    {" · "}
                    <a href={p.github} itemProp="codeRepository">
                      Source code
                    </a>
                  </>
                )}
                {p.pdf && (
                  <>
                    {" · "}
                    <a href={p.pdf}>Case study PDF</a>
                  </>
                )}
              </p>
            </article>
          ))}
        </section>

        <section aria-labelledby="seo-evolution-heading">
          <h2 id="seo-evolution-heading">Evolution Timeline</h2>
          {myJourney.map((m) => (
            <article key={m.id}>
              <h3>
                {m.year} — {m.title}
              </h3>
              <p>{m.description.replace(/\s+/g, " ").trim()}</p>
            </article>
          ))}
        </section>

        <section aria-labelledby="seo-learning-heading">
          <h2 id="seo-learning-heading">Currently Learning</h2>
          {myLearning.map((l) => (
            <article key={l.id}>
              <h3>
                {l.title} — {l.subtitle}
              </h3>
              <p>
                <strong>Category:</strong> {l.category}.
              </p>
              <p>{l.description}</p>
              <p>Focus: {l.tags.join(", ")}.</p>
            </article>
          ))}
        </section>

        <section aria-labelledby="seo-playground-heading">
          <h2 id="seo-playground-heading">Playground</h2>
          <p>
            A cross-media gallery of hobbies and experiments. Items are
            deep-linkable via
            <code>{SITE_URL}/#playground/&lt;tab&gt;/&lt;item-id&gt;</code>.
          </p>
          {myHobbies.map((h) => (
            <article key={h.id}>
              <h3>{h.title}</h3>
              <p>{h.description}</p>
              <p>
                <strong>Items ({h.gallery.length}):</strong>{" "}
                {h.gallery
                  .map((it) => `${it.title} (${it.type})`)
                  .join("; ")}
                .
              </p>
            </article>
          ))}
        </section>

        <section aria-labelledby="seo-contact-heading">
          <h2 id="seo-contact-heading">Contact</h2>
          <ul>
            <li>
              Email:{" "}
              <a href="mailto:devdeep120205@gmail.com">
                devdeep120205@gmail.com
              </a>
            </li>
            <li>
              GitHub:{" "}
              <a href="https://github.com/devdeepsaha">
                github.com/devdeepsaha
              </a>
            </li>
            <li>
              LinkedIn:{" "}
              <a href="https://www.linkedin.com/in/devdeep-saha-3b4570260/">
                linkedin.com/in/devdeep-saha-3b4570260
              </a>
            </li>
            <li>
              Instagram:{" "}
              <a href="https://instagram.com/devdeepsaha">
                instagram.com/devdeepsaha
              </a>
            </li>
          </ul>
          <p>Location: Kolkata, India. Availability: immediate joining.</p>
        </section>
      </div>
    </>
  );
}
