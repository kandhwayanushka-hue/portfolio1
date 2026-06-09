import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "@/lib/api";
import { PixelArrow, PixelStar } from "@/components/PixelSparkle";
import Footer from "@/components/Footer";

export default function CaseStudy() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    api.get(`/projects/${slug}`)
      .then((r) => setProject(r.data))
      .catch(() => setError(true));
  }, [slug]);

  if (error) {
    return (
      <div className="min-h-screen grid place-items-center px-6 text-center" data-testid="case-study-not-found">
        <div>
          <h1 className="font-display font-black text-6xl mb-4">404</h1>
          <p className="font-pixel uppercase mb-6">Project not found</p>
          <Link to="/" className="brutal brutal-lift rounded-full px-6 py-3 bg-[var(--ink)] text-white font-display font-bold uppercase inline-block">← Back home</Link>
        </div>
      </div>
    );
  }

  if (!project) {
    return <div className="min-h-screen grid place-items-center font-pixel uppercase text-xl" data-testid="case-study-loading">Loading…</div>;
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]" data-testid={`case-study-${project.slug}`}>
      <nav className="px-6 md:px-12 py-6 flex items-center justify-between border-b-[3px] border-[var(--ink)]">
        <Link to="/" className="font-display font-black text-2xl tracking-tight" data-testid="nav-home">ANUSHKA<span className="text-[var(--primary)]">.</span></Link>
        <Link to="/" className="font-pixel uppercase text-sm flex items-center gap-2 underline underline-offset-4" data-testid="back-to-home">← All work</Link>
      </nav>

      <header className="px-6 md:px-12 py-16 md:py-24 border-b-[3px] border-[var(--ink)]" style={{ background: project.accent_color }}>
        <div className="max-w-6xl mx-auto">
          <p className="font-pixel uppercase text-sm mb-4">✦ {project.role} · {project.year}</p>
          <h1 className="font-display font-black text-7xl md:text-[9rem] leading-[0.85] tracking-tighter" data-testid="case-study-title">
            {project.title}
            <span className="inline-block ml-3 align-middle"><PixelStar size={48} color="#0A0A0A" className="animate-spin-slow inline-block" /></span>
          </h1>
          <p className="font-display text-2xl md:text-3xl mt-6 max-w-3xl">{project.tagline}</p>
          <div className="flex flex-wrap gap-2 mt-6">
            {project.tags.map((t) => (
              <span key={t} className="brutal-sm rounded-full px-3 py-1 font-pixel uppercase text-xs bg-white">{t}</span>
            ))}
          </div>
        </div>
      </header>

      <section className="px-6 md:px-12 py-16">
        <div className="max-w-5xl mx-auto">
          <img src={project.cover_image} alt={project.title} className="w-full aspect-[16/10] object-cover brutal rounded-2xl" />
        </div>
      </section>

      <section className="px-6 md:px-12 py-16 border-t-[3px] border-[var(--ink)]">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <p className="font-pixel uppercase text-xs text-[var(--text-muted)] mb-2">Overview</p>
            <p className="font-body text-lg leading-relaxed">{project.overview}</p>
          </div>
          <div>
            <p className="font-pixel uppercase text-xs text-[var(--text-muted)] mb-2">Challenge</p>
            <p className="font-body text-lg leading-relaxed">{project.challenge}</p>
          </div>
          <div>
            <p className="font-pixel uppercase text-xs text-[var(--text-muted)] mb-2">Solution</p>
            <p className="font-body text-lg leading-relaxed">{project.solution}</p>
          </div>
        </div>
      </section>

      {project.external_url && (
        <section className="px-6 md:px-12 pb-8 text-center">
          <a
            href={project.external_url}
            target="_blank"
            rel="noreferrer"
            className="brutal brutal-lift rounded-full px-6 py-3 bg-[var(--ink)] text-white font-pixel uppercase text-sm inline-flex items-center gap-2"
            data-testid="case-study-source-link"
          >
            View source on GitHub
            <PixelArrow size={16} color="#fff" />
          </a>
        </section>
      )}

      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {project.gallery.map((src, i) => (
            <img key={i} src={src} alt={`${project.title} ${i + 1}`} className="w-full aspect-[4/3] object-cover brutal rounded-2xl" />
          ))}
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 border-t-[3px] border-[var(--ink)] bg-[var(--accent)] text-center">
        <p className="font-pixel uppercase text-sm mb-4">✦ Next</p>
        <Link to="/" data-testid="next-back-home" className="brutal brutal-lift rounded-full px-7 py-4 bg-[var(--ink)] text-white font-display font-bold text-lg uppercase inline-flex items-center gap-3">
          See more work
          <PixelArrow size={20} color="#fff" />
        </Link>
      </section>

      <Footer />
    </div>
  );
}
