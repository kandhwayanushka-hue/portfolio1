import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PixelStar, PixelArrow } from "./PixelSparkle";

const charVariants = {
  hidden: { y: 60, opacity: 0, rotateX: -30 },
  visible: { y: 0, opacity: 1, rotateX: 0, transition: { duration: 0.5, ease: [0.17, 0.67, 0.29, 1.0] } },
};

const fmt = (n) => n.toString().padStart(2, "0");

export default function Hero({ onStartProject }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const ist = new Date(time.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const clock = `${fmt(ist.getHours())}:${fmt(ist.getMinutes())} ${ist.getHours() >= 12 ? "PM" : "AM"}`;

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: [0.17, 0.67, 0.29, 1.0] }}
      className="relative px-6 md:px-12 pt-16 md:pt-24 pb-12 overflow-hidden"
      data-testid="hero-section"
    >
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 mb-12">
        <div className="flex items-center gap-3">
          <div className="brutal-sm rounded-full px-4 py-2 flex items-center gap-2" data-testid="hero-location">
            <span className="w-2 h-2 rounded-full bg-[var(--pixel-green)] animate-pulse" />
            <span className="font-pixel text-base">DELHI, INDIA</span>
          </div>
          <div className="brutal-sm rounded-full px-4 py-2 font-pixel text-base" data-testid="hero-clock">
            {clock} IST
          </div>
        </div>
        <div className="brutal-sm rounded-full px-4 py-2 font-pixel text-base" data-testid="hero-last-updated">
          LEARNING · BUILDING · GROWING
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.03, delayChildren: 0.2 } },
          }}
          className="font-display text-[12vw] md:text-[10vw] lg:text-[8rem] leading-[0.85] font-black tracking-tighter"
          data-testid="hero-headline"
        >
          {["L", "e", "t", "'", "s", " ", "b", "u", "i", "l", "d"].map((c, i) => (
            <motion.span
              key={i}
              variants={charVariants}
              aria-hidden="true"
            >{c === " " ? "\u00A0" : c}</motion.span>
          ))}
          <br />
          {["t", "o", "g", "e", "t", "h", "e", "r"].map((c, i) => (
            <motion.span
              key={`b-${i}`}
              variants={charVariants}
              className="italic font-light text-[var(--primary)]"
              aria-hidden="true"
            >{c}</motion.span>
          ))}
          <motion.span
            variants={charVariants}
            className="text-[var(--primary)]"
          >.</motion.span>
        </motion.h1>

        <motion.div className="absolute -top-6 right-6 md:right-20" animate={{ rotate: [0, 12, -8, 0] }} transition={{ duration: 4, repeat: Infinity }}>
          <PixelStar size={42} color="#FFCC00" />
        </motion.div>
        <motion.div className="absolute top-1/2 -right-2 md:right-12 hidden md:block" animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}>
          <PixelStar size={28} color="#007AFF" />
        </motion.div>
        <motion.div className="absolute -bottom-2 left-1/3 hidden md:block" animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 5, repeat: Infinity }}>
          <PixelStar size={20} color="#FF66B2" />
        </motion.div>

        <div className="mt-10 flex flex-wrap items-center gap-5">
          <button
            onClick={onStartProject}
            data-testid="hero-start-project-btn"
            className="brutal brutal-lift rounded-full px-7 py-4 bg-[var(--primary)] text-white font-display font-bold text-lg uppercase tracking-wide flex items-center gap-3"
          >
            Start a Project
            <PixelArrow size={22} color="#fff" />
          </button>
          <a href="#contact" data-testid="hero-say-hi-link" className="font-pixel text-xl underline underline-offset-4 decoration-2">
            ↳ or say hi
          </a>
        </div>
      </div>
    </motion.section>
  );
}
