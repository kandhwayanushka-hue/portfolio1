import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { api } from "../lib/api";
import { PixelArrow, PixelStar } from "./PixelSparkle";
import RevealText from "./RevealText";

export default function FeaturedWork() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const [hoveredId, setHoveredId] = useState(null);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const amt = scrollRef.current.clientWidth * 0.7;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amt : amt, behavior: "smooth" });
  };

  useEffect(() => {
    api.get("/projects")
      .then((r) => setProjects(r.data || []))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  if (loading) {
    return (
      <section className="px-6 md:px-12 py-20 md:py-28 border-t-[3px] border-[var(--ink)] bg-[var(--bg)]">
        <div className="max-w-6xl mx-auto font-pixel text-xl uppercase text-[var(--text-muted)]">
          Loading projects…
        </div>
      </section>
    );
  }

  return (
    <section
      id="work"
      className="px-6 md:px-12 py-20 md:py-28 border-t-[3px] border-[var(--ink)] bg-[var(--bg)]"
      data-testid="featured-work-section"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="font-pixel uppercase text-sm text-[var(--text-muted)] mb-2">✦ Selected projects</p>
            <RevealText
              text="Featured work"
              as="h3"
              className="font-display font-black text-5xl md:text-7xl tracking-tighter leading-none"
            />
          </div>
          <PixelStar size={36} color="#FF3B30" className="animate-wobble hidden md:block" />
        </div>

        {/* Featured Project — Hero Card */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <Link
              to={`/case-studies/${featured.slug}`}
              className="group block brutal brutal-lift rounded-2xl overflow-hidden bg-white"
            >
              <div className="relative aspect-[21/9] md:aspect-[3/1] overflow-hidden">
                <img
                  src={featured.cover_image}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="brutal-sm rounded-full px-3 py-1 font-pixel uppercase text-sm"
                      style={{ background: featured.accent_color, color: "#0A0A0A" }}
                    >
                      {featured.year}
                    </span>
                    <span className="font-pixel uppercase text-xs tracking-wider text-white/70">
                      Featured Project
                    </span>
                  </div>
                  <h4 className="font-display font-black text-3xl md:text-5xl tracking-tight text-white">
                    {featured.title}
                  </h4>
                  <p className="font-body text-white/70 mt-1 max-w-xl">{featured.tagline}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {featured.tags.map((t) => (
                      <span key={t} className="font-pixel uppercase text-xs border border-white/40 text-white/80 rounded-full px-2 py-0.5">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="absolute top-6 right-6 brutal-sm rounded-full w-14 h-14 grid place-items-center bg-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity">
                  <PixelArrow size={24} />
                </span>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Remaining Projects — Smooth Slider */}
        {rest.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="font-pixel uppercase text-xs tracking-widest text-[var(--text-muted)]">
                More projects &rarr;
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => scroll("left")}
                  className="brutal-sm rounded-full w-10 h-10 grid place-items-center bg-white hover:bg-[var(--accent)] transition-colors cursor-pointer"
                  aria-label="Scroll left"
                >
                  <PixelArrow size={16} className="rotate-180" />
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="brutal-sm rounded-full w-10 h-10 grid place-items-center bg-white hover:bg-[var(--accent)] transition-colors cursor-pointer"
                  aria-label="Scroll right"
                >
                  <PixelArrow size={16} />
                </button>
              </div>
            </div>

            <div
              ref={scrollRef}
              className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-6 md:-mx-12 px-6 md:px-12"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {rest.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="min-w-[80vw] md:min-w-[360px] lg:min-w-[400px] snap-start"
                  onMouseEnter={() => setHoveredId(p.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <Link
                    to={`/case-studies/${p.slug}`}
                    className="group block brutal brutal-lift rounded-2xl overflow-hidden bg-white"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden border-b-[3px] border-[var(--ink)]">
                      <img
                        src={p.cover_image}
                        alt={p.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div
                        className="absolute top-3 left-3 brutal-sm rounded-full px-3 py-1 font-pixel uppercase text-xs"
                        style={{ background: p.accent_color, color: "#0A0A0A" }}
                      >
                        {p.year}
                      </div>
                      {hoveredId === p.id && (
                        <div className="absolute inset-0 bg-[var(--ink)]/10 transition-all duration-300" />
                      )}
                    </div>
                    <div className="p-5 flex items-end justify-between gap-3 flex-wrap">
                      <div>
                        <h4 className="font-display font-black text-2xl md:text-3xl tracking-tight">{p.title}</h4>
                        <p className="font-body text-sm text-[var(--text-muted)] mt-0.5">{p.tagline}</p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {p.tags.map((t) => (
                            <span key={t} className="font-pixel uppercase text-[10px] border-2 border-[var(--ink)] rounded-full px-2 py-0.5">{t}</span>
                          ))}
                        </div>
                      </div>
                      <span className="brutal-sm rounded-full w-10 h-10 grid place-items-center bg-[var(--accent)] shrink-0 group-hover:rotate-[-12deg] transition-transform">
                        <PixelArrow size={16} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
