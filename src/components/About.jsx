import React, { useEffect, useRef, useState } from 'react';
import { profile, philosophy } from '../data/mock';
import { PixelArrow, PixelSparkle } from './PixelArt';

const About = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const words = profile.intro.split(' ');

  return (
    <section ref={ref} id="about" className="relative bg-[#F5F1E8] text-black py-24 md:py-40 px-5 md:px-12 lg:px-16 overflow-hidden">
      <div className="absolute top-10 right-10 hidden md:block"><PixelSparkle size={32} color="#F85D7F" className="twinkle" /></div>
      <div className="text-[11px] md:text-xs tracking-[0.22em] font-bold uppercase mb-10 flex items-center gap-3">
        <span className="inline-block w-8 h-[2px] bg-black" /><span>// ABOUT</span>
      </div>
      <div className="max-w-6xl">
        <p className="display-font font-black leading-[1.05] tracking-[-0.02em]" style={{ fontSize: 'clamp(28px, 5.2vw, 84px)' }}>
          {words.map((w, i) => (
            <span key={i} className={`inline-block mr-[0.22em] transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: `${i * 30}ms` }}>{w}</span>
          ))}
        </p>
      </div>
      <div className="mt-20 md:mt-28 grid md:grid-cols-2 gap-4 md:gap-6 max-w-5xl">
        {philosophy.map((p, i) => (
          <div key={i} className="group relative border-2 border-black bg-white p-5 md:p-6 cursor-default hover:bg-black hover:text-white transition-colors duration-200">
            <div className="flex items-start gap-3">
              <span className="display-font text-xs font-black mt-1 opacity-60 group-hover:opacity-100">0{i + 1}</span>
              <p className="text-lg md:text-2xl font-bold tracking-tight">{p}</p>
              <PixelArrow size={16} className="ml-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default About;
