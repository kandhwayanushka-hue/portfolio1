import { PixelArrow, PixelStar } from "./PixelSparkle";

const SKILLS = [
  "React", "JavaScript", "Tailwind CSS", "HTML / CSS", "Bootstrap",
  "Spring Boot", "Java", "Python", "C++", "Node.js", "MySQL",
  "Git / GitHub", "Data Science", "Vercel",
];

export default function SkillsMarquee() {
  const items = [...SKILLS, ...SKILLS];
  return (
    <section className="border-y-[3px] border-[var(--ink)] bg-[var(--ink)] text-[var(--bg)] py-6 overflow-hidden" data-testid="skills-marquee">
      <div className="marquee-track">
        {items.map((s, i) => (
          <div key={i} className="flex items-center gap-6 px-6 shrink-0">
            <span className="font-display font-black text-3xl md:text-5xl uppercase whitespace-nowrap">{s}</span>
            <PixelStar size={20} color={i % 3 === 0 ? "#FFCC00" : i % 3 === 1 ? "#FF66B2" : "#00CC66"} />
          </div>
        ))}
      </div>
    </section>
  );
}

export function PixelMarquee() {
  const items = ["★ AVAILABLE FOR PROJECTS", "★ OPEN TO INTERNSHIPS", "★ BASED IN DELHI, INDIA", "★ LEARN IN PUBLIC, BUILD IN SILENCE"];
  const loop = [...items, ...items, ...items];
  return (
    <section className="bg-[var(--accent)] border-y-[3px] border-[var(--ink)] py-3 overflow-hidden" data-testid="pixel-marquee">
      <div className="marquee-track fast reverse">
        {loop.map((s, i) => (
          <span key={i} className="font-pixel text-xl uppercase tracking-widest px-6 whitespace-nowrap shrink-0">{s}</span>
        ))}
      </div>
    </section>
  );
}
