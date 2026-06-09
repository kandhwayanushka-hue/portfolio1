import React, { useEffect, useState } from 'react';
import { profile } from '../data/mock';
import { PixelCloud, PixelStar, PixelFlower, PixelSparkle, PixelHeart } from './PixelArt';

const Hero = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e) => {
      setMouse({ x: (e.clientX / window.innerWidth - 0.5) * 2, y: (e.clientY / window.innerHeight - 0.5) * 2 });
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  const parallax = (depth) => ({ transform: `translate3d(${mouse.x * depth}px, ${mouse.y * depth}px, 0)` });

  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden pt-16">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[15%] left-[8%] text-white/80 float-slow" style={parallax(20)}><PixelCloud size={110} /></div>
        <div className="absolute top-[22%] right-[10%] text-white/70 float-slower" style={parallax(14)}><PixelCloud size={140} /></div>
        <div className="absolute top-[12%] right-[28%]" style={parallax(30)}><PixelStar size={28} color="#FFD93D" className="twinkle" /></div>
        <div className="absolute top-[28%] left-[35%]" style={parallax(35)}><PixelSparkle size={20} color="#7DD3C0" className="twinkle" /></div>
        <div className="absolute bottom-[28%] left-[12%]" style={parallax(25)}><PixelFlower size={28} color="#F85D7F" /></div>
        <div className="absolute bottom-[32%] right-[18%]" style={parallax(28)}><PixelFlower size={24} color="#FDE68A" center="#F85D7F" /></div>
        <div className="absolute bottom-[18%] right-[40%]" style={parallax(40)}><PixelHeart size={22} color="#F85D7F" /></div>
        <div className="absolute top-[40%] left-[18%]" style={parallax(45)}><PixelStar size={16} color="#7DD3C0" className="twinkle" /></div>
      </div>

      <div className="relative px-5 md:px-12 lg:px-16 pt-10 md:pt-16">
        <div className="flex flex-wrap gap-2 text-[10px] md:text-xs tracking-[0.22em] font-bold uppercase mb-12 md:mb-20">
          <span className="border border-white/30 px-3 py-1.5 rounded-full">{profile.status}</span>
          <span className="border border-white/30 px-3 py-1.5 rounded-full text-white/70">{profile.yearsLearning}</span>
        </div>
        <div className="relative">
          <h1 className="display-font leading-[0.82] tracking-[-0.04em] font-black select-none" style={{ fontSize: 'clamp(64px, 17vw, 280px)' }}>
            <span className="block name-stroke">{profile.firstName}</span>
            <span className="block name-fill text-right md:text-right">{profile.lastName}</span>
          </h1>
        </div>
        <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 text-[11px] md:text-sm font-bold tracking-[0.18em] uppercase pb-16">
          <div><div className="text-white/40 mb-2">// ROLE</div><div>{profile.role}</div></div>
          <div><div className="text-white/40 mb-2">// LOCATION</div><div>{profile.location}</div></div>
          <div className="col-span-2 md:col-span-1">
            <div className="text-white/40 mb-2">// FOCUS</div>
            <div>{profile.disciplines}</div><div>{profile.disciplines2}</div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
