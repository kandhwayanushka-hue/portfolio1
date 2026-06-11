import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { PixelStar } from "./PixelSparkle";
import RevealText from "./RevealText";

const ROLE_TAGS = [
  { label: "REACT", bg: "#FF3B30", fg: "#fff" },
  { label: "SPRING BOOT", bg: "#007AFF", fg: "#fff" },
  { label: "PYTHON", bg: "#FFCC00", fg: "#0A0A0A" },
  { label: "DATA SCIENCE", bg: "#FF66B2", fg: "#0A0A0A" },
  { label: "C++", bg: "#00CC66", fg: "#0A0A0A" },
  { label: "BOOTSTRAP", bg: "#8B5CF6", fg: "#fff" },
];

export default function IntroSection() {
  const wrapRef = useRef(null);
  const [pos, setPos] = useState({ x: 50, y: 50, active: false });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      setPos({ x, y, active: true });
    };
    const onLeave = () => setPos((p) => ({ ...p, active: false }));
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section className="px-6 md:px-12 py-20 md:py-28 border-t-[3px] border-[var(--ink)] relative" data-testid="intro-section">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-7 relative">
          <p className="font-pixel text-sm md:text-base mb-4 text-[var(--text-muted)]">✦ HELLO, I AM</p>

          <div ref={wrapRef} className="relative isolate overflow-hidden rounded-2xl" data-testid="intro-name-wrap">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-500" style={{ opacity: pos.active ? 1 : 0.55 }}>
              <div className="absolute rounded-full" style={{
                width: "60%", height: "120%",
                left: `${pos.x}%`, top: `${pos.y}%`,
                transform: "translate(-50%, -50%)",
                background: "radial-gradient(closest-side, #FFCC00 0%, #FF66B2 35%, #FF3B30 65%, transparent 75%)",
                filter: "blur(46px)",
                transition: "left 220ms cubic-bezier(.2,.8,.2,1), top 220ms cubic-bezier(.2,.8,.2,1)",
              }} />
              <div className="absolute rounded-full" style={{
                width: "32%", height: "80%",
                left: `${100 - pos.x}%`, top: `${100 - pos.y}%`,
                transform: "translate(-50%, -50%)",
                background: "radial-gradient(closest-side, #007AFF 0%, #00CC66 50%, transparent 75%)",
                filter: "blur(48px)", opacity: 0.85,
                transition: "left 320ms cubic-bezier(.2,.8,.2,1), top 320ms cubic-bezier(.2,.8,.2,1)",
              }} />
              <div className="absolute inset-0 opacity-[0.12] mix-blend-multiply" style={{
                backgroundImage: "radial-gradient(rgba(10,10,10,1) 1px, transparent 1px)",
                backgroundSize: "8px 8px",
              }} />
            </div>

            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
              }}
              className="relative font-display font-black tracking-tighter leading-[0.85] text-[14vw] lg:text-[8rem] py-2"
              data-testid="intro-name"
            >
              <motion.span variants={{ hidden: { y: 40, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.17, 0.67, 0.29, 1.0] } } }} className="block">
                ANUSHKA
              </motion.span>
              <motion.span variants={{ hidden: { y: 40, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.17, 0.67, 0.29, 1.0] } } }} className="block text-[var(--primary)] text-[10vw] lg:text-[6rem]">
                KANDHWAY
              </motion.span>
              <span className="inline-block ml-2 align-top">
                <PixelStar size={48} color="#FFCC00" className="animate-spin-slow inline-block" />
              </span>
            </motion.h2>
          </div>

          <p className="font-pixel text-xl md:text-2xl mt-6 uppercase">Aspiring AI Research Scientist</p>
          <p className="font-pixel text-base md:text-lg text-[var(--text-muted)] uppercase mt-1">Based in Delhi, India · B.Tech CSE (Data Science)</p>

          <div className="flex flex-wrap gap-3 mt-8">
            {ROLE_TAGS.map((tag, i) => (
              <motion.span
                key={tag.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 280, damping: 18 }}
                className="brutal-sm rounded-full px-4 py-2 font-pixel uppercase text-sm md:text-base"
                style={{ background: tag.bg, color: tag.fg }}
                data-testid={`intro-role-${tag.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {tag.label}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 lg:pt-32">
          <div className="brutal rounded-2xl p-7 bg-[var(--accent)]">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.17, 0.67, 0.29, 1.0] }}
              className="font-display text-2xl md:text-3xl leading-snug font-medium" data-testid="intro-mission"
            >
              Exploring the {" "}
              <em className="italic text-[var(--primary)]">frontiers</em>
              {" "}of AI — turning curiosity into research, one model at a time. Learning every day and building toward something meaningful.
            </motion.p>
          </div>
          <div className="mt-6 flex items-center gap-3 font-pixel uppercase text-sm">
            <span className="w-8 h-[3px] bg-[var(--ink)]" />
            <span>Learning. Building. Shipping.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
