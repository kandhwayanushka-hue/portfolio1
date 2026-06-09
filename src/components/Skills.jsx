import React from 'react';
import { skills } from '../data/mock';
import { PixelSparkle } from './PixelArt';

const Skills = () => {
  const groups = [
    { title: 'Frontend', items: skills.frontend, color: '#FFD93D' },
    { title: 'Backend', items: skills.backend, color: '#7DD3C0' },
    { title: 'Tools', items: skills.tools, color: '#F85D7F' },
    { title: 'Curious', items: skills.curious, color: '#A5B4FC' },
  ];

  return (
    <section id="skills" className="bg-black text-white py-24 md:py-32 px-5 md:px-12 lg:px-16">
      <div className="text-[11px] md:text-xs tracking-[0.22em] font-bold uppercase mb-10 flex items-center gap-3 text-white/60">
        <span className="inline-block w-8 h-[2px] bg-white/60" /><span>// SKILLS & STACK</span>
      </div>
      <h2 className="display-font font-black tracking-[-0.03em] mb-16" style={{ fontSize: 'clamp(40px, 7vw, 100px)' }}>
        Tools of<br /><span className="name-stroke">the trade.</span>
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {groups.map((g) => (
          <div key={g.title} className="border-2 border-white/20 p-5 md:p-6 hover:border-white transition-colors group">
            <div className="flex items-center justify-between mb-5">
              <h3 className="display-font font-black text-xl md:text-2xl">{g.title}</h3>
              <PixelSparkle size={18} color={g.color} className="twinkle" />
            </div>
            <ul className="space-y-2">
              {g.items.map((it) => (
                <li key={it} className="flex items-center justify-between text-sm md:text-base font-bold tracking-tight border-b border-white/10 pb-2">
                  <span>{it}</span>
                  <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: g.color }}>•</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Skills;
