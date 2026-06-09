import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { api } from "@/lib/api";
import { PixelArrow, PixelStar } from "@/components/PixelSparkle";

export default function FeaturedWork() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/projects")
      .then((r) => setProjects(r.data || []))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="work" className="px-6 md:px-12 py-20 md:py-28 border-t-[3px] border-[var(--ink)] bg-[var(--bg)]" data-testid="featured-work-section">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="font-pixel uppercase text-sm text-[var(--text-muted)] mb-2">✦ Selected projects</p>
            <h3 className="font-display font-black text-5xl md:text-7xl tracking-tighter leading-none" data-testid="featured-work-title">
              Featured <span className="italic font-light">work</span>
            </h3>
          </div>
          <PixelStar size={36} color="#FF3B30" className="animate-wobble" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {loading && (
            <div className="md:col-span-12 font-pixel text-xl uppercase text-[var(--text-muted)]" data-testid="featured-work-loading">
              Loading projects…
            </div>
          )}
          {!loading && projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={i === 0 ? "md:col-span-7" : i === 1 ? "md:col-span-5" : "md:col-span-12"}
            >
              <Link
                to={`/case-studies/${p.slug}`}
                data-testid={`project-card-${p.slug}`}
                className="block brutal brutal-lift rounded-2xl overflow-hidden bg-white"
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b-[3px] border-[var(--ink)]">
                  <img src={p.cover_image} alt={p.title} className="w-full h-full object-cover" />
                  <div
                    className="absolute top-4 left-4 brutal-sm rounded-full px-3 py-1 font-pixel uppercase text-sm"
                    style={{ background: p.accent_color, color: "#0A0A0A" }}
                  >
                    {p.year}
                  </div>
                </div>
                <div className="p-6 flex items-end justify-between gap-4 flex-wrap">
                  <div>
                    <h4 className="font-display font-black text-3xl md:text-4xl tracking-tight">{p.title}</h4>
                    <p className="font-body text-[var(--text-muted)] mt-1">{p.tagline}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {p.tags.map((t) => (
                        <span key={t} className="font-pixel uppercase text-xs border-2 border-[var(--ink)] rounded-full px-2 py-0.5">{t}</span>
                      ))}
                    </div>
                  </div>
                  <span className="brutal-sm rounded-full w-12 h-12 grid place-items-center bg-[var(--accent)]" aria-hidden="true">
                    <PixelArrow size={20} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
