import React, { useState } from 'react';
import { projects } from '../data/mock';
import { PixelArrow, PixelStar, PixelFlower } from './PixelArt';

const ProjectCard = ({ p, idx }) => {
  const [hover, setHover] = useState(false);
  return (
    <a href={p.href} target="_blank" rel="noreferrer"
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      className="group relative block border-2 border-black bg-white overflow-hidden"
      style={{ transform: hover ? 'translateY(-6px)' : 'translateY(0)', transition: 'transform 350ms cubic-bezier(.2,.8,.2,1)' }}>
      <div className="relative aspect-[4/3] overflow-hidden flex items-center justify-center" style={{ background: p.color }}>
        <div className="absolute inset-0 transition-transform duration-500 ease-out" style={{ background: p.accent, transform: hover ? 'translateY(0)' : 'translateY(101%)' }} />
        <div className="relative z-10 w-3/4 aspect-[16/10] bg-black/85 border-2 border-black rounded-md shadow-[6px_6px_0_0_rgba(0,0,0,0.9)] overflow-hidden">
          <div className="flex gap-1.5 p-2 border-b border-white/20">
            <span className="w-2 h-2 rounded-full bg-[#F85D7F]" />
            <span className="w-2 h-2 rounded-full bg-[#FFD93D]" />
            <span className="w-2 h-2 rounded-full bg-[#7DD3C0]" />
          </div>
          <div className="p-3 space-y-1.5">
            <div className="h-2 w-3/4 bg-white/30" />
            <div className="h-2 w-1/2 bg-white/20" />
            <div className="h-2 w-2/3 bg-white/20" />
            <div className="mt-3 grid grid-cols-3 gap-1.5">
              <div className="h-6 bg-white/15" /><div className="h-6 bg-white/20" /><div className="h-6 bg-white/10" />
            </div>
          </div>
        </div>
        <div className="absolute top-4 left-4 z-20"><PixelStar size={22} color="#fff" /></div>
        <div className="absolute bottom-4 right-4 z-20"><PixelFlower size={22} color="#fff" center={p.accent} /></div>
        <div className="absolute top-3 right-4 z-20 display-font text-xs font-black text-black/70">0{idx + 1} / 0{projects.length}</div>
      </div>
      <div className="p-5 md:p-6 border-t-2 border-black bg-white">
        <div className="flex items-center justify-between text-[10px] tracking-[0.22em] font-bold uppercase text-black/60">
          <span>{p.tag}</span><span>{p.year}</span>
        </div>
        <h3 className="display-font font-black text-2xl md:text-3xl mt-2 tracking-tight flex items-center gap-3">
          {p.title}<PixelArrow size={18} className="transition-transform group-hover:translate-x-1" />
        </h3>
        <p className="mt-3 text-sm md:text-base text-black/70 leading-relaxed">{p.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {p.tech.map((t) => (
            <span key={t} className="text-[10px] font-bold uppercase tracking-wider border border-black/30 px-2 py-1">{t}</span>
          ))}
        </div>
      </div>
    </a>
  );
};

const Projects = () => (
  <section id="work" className="relative bg-black text-white py-24 md:py-32 px-5 md:px-12 lg:px-16">
    <div className="flex items-end justify-between mb-12 md:mb-16">
      <div>
        <div className="text-[11px] md:text-xs tracking-[0.22em] font-bold uppercase mb-4 flex items-center gap-3 text-white/60">
          <span className="inline-block w-8 h-[2px] bg-white/60" /><span>// FEATURED WORK</span>
        </div>
        <h2 className="display-font font-black tracking-[-0.03em]" style={{ fontSize: 'clamp(40px, 8vw, 120px)' }}>
          Selected<br /><span className="name-stroke">Builds.</span>
        </h2>
      </div>
      <a href="https://github.com/kandhwayanushka-hue" target="_blank" rel="noreferrer"
        className="hidden md:inline-flex items-center gap-2 text-xs font-bold tracking-[0.22em] uppercase border border-white/40 px-4 py-2.5 hover:bg-white hover:text-black transition-colors">
        ALL ON GITHUB <PixelArrow size={14} />
      </a>
    </div>
    <div className="grid md:grid-cols-2 gap-5 md:gap-8">
      {projects.map((p, i) => <ProjectCard key={p.id} p={p} idx={i} />)}
    </div>
  </section>
);
export default Projects;
