import { motion } from "framer-motion";
import { PixelStar, PixelHeart } from "./PixelSparkle";

const STATS = [
  { value: "~1", label: "Year coding" },
  { value: "20+", label: "Repos on GitHub" },
  { value: "B.Tech", label: "CSE (Data Science)" },
  { value: "∞", label: "Curiosity" },
];

export default function StatsBlock() {
  return (
    <section className="px-6 md:px-12 py-20 md:py-28 border-t-[3px] border-[var(--ink)] bg-[var(--pixel-pink)] relative overflow-hidden" data-testid="stats-section">
      <div className="absolute top-8 right-10"><PixelStar size={40} color="#0A0A0A" /></div>
      <div className="absolute bottom-10 left-12"><PixelHeart size={32} color="#FFCC00" /></div>
      <div className="absolute top-1/3 left-1/4"><PixelStar size={20} color="#007AFF" /></div>

      <div className="max-w-6xl mx-auto">
        <p className="font-pixel uppercase text-sm mb-3">✦ The numbers</p>
        <h3 className="font-display font-black text-5xl md:text-7xl tracking-tighter leading-none">
          A small <span className="italic font-light">but loud</span> body of work.
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-12">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 260, damping: 20 }}
              className="brutal rounded-2xl p-5 bg-white"
              data-testid={`stat-${i}`}
            >
              <div className="font-display font-black text-5xl md:text-6xl leading-none">{s.value}</div>
              <div className="font-pixel uppercase text-sm mt-3 text-[var(--text-muted)]">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
