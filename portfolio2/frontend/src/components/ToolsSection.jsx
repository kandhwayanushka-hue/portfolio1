import { motion } from "framer-motion";
import { PixelStar } from "./PixelSparkle";
import RevealText from "./RevealText";

const GROUPS = [
  {
    title: "Frontend",
    items: ["HTML", "CSS", "JavaScript", "React", "Tailwind", "Bootstrap"],
    color: "#FF3B30",
  },
  {
    title: "Backend",
    items: ["Python", "C++", "Java", "Spring Boot", "Node.js"],
    color: "#007AFF",
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "MySQL", "Vercel", "VS Code"],
    color: "#00CC66",
  },
  {
    title: "Curious",
    items: ["AI", "Data Science", "Open Source", "Design Systems"],
    color: "#FF66B2",
  },
];

export default function ToolsSection() {
  return (
    <section
      className="px-6 md:px-12 py-20 md:py-28 border-t-[3px] border-[var(--ink)] bg-[var(--ink)] text-[var(--bg)]"
      data-testid="tools-section"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-[3px] bg-[var(--accent)]" />
          <p className="font-pixel uppercase text-sm tracking-widest text-[var(--accent)]">
            // SKILLS & STACK
          </p>
        </div>

        <RevealText
          text="Tools of the trade."
          as="h3"
          className="font-display font-black tracking-tighter leading-[0.85] text-[14vw] md:text-[7rem] mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {GROUPS.map((g, gi) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: gi * 0.08, duration: 0.4 }}
              className="border-2 border-white/20 p-6 hover:border-white transition-colors"
            >
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-display font-black text-xl md:text-2xl">{g.title}</h4>
                <PixelStar size={18} color={g.color} />
              </div>
              <ul className="space-y-3">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center justify-between font-body text-sm md:text-base border-b border-white/10 pb-2"
                  >
                    <span>{item}</span>
                    <span
                      className="font-pixel text-[10px] tracking-widest uppercase"
                      style={{ color: g.color }}
                    >
                      •
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
