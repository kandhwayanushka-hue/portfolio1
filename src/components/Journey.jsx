import React from 'react';
import { journey, hobbies } from '../data/mock';
import { PixelStar, PixelFlower } from './PixelArt';

const Journey = () => (
  <section className="bg-[#F5F1E8] text-black py-24 md:py-32 px-5 md:px-12 lg:px-16">
    <div className="text-[11px] md:text-xs tracking-[0.22em] font-bold uppercase mb-12 flex items-center gap-3">
      <span className="inline-block w-8 h-[2px] bg-black" /><span>// JOURNEY</span>
    </div>
    <div className="grid md:grid-cols-4 gap-4 md:gap-6">
      {journey.map((j, i) => (
        <div key={i} className="group border-2 border-black bg-white p-5 md:p-6 relative hover:bg-black hover:text-white transition-colors duration-200">
          <div className="display-font font-black text-3xl md:text-4xl tracking-tight">{j.year}</div>
          <div className="mt-1 h-[2px] w-10 bg-black group-hover:bg-white" />
          <h3 className="mt-4 text-lg md:text-xl font-black">{j.title}</h3>
          <p className="mt-2 text-sm text-black/70 group-hover:text-white/70 leading-relaxed">{j.desc}</p>
          <div className="absolute top-3 right-3 opacity-60">
            {i % 2 === 0 ? <PixelStar size={14} color="#F85D7F" /> : <PixelFlower size={14} />}
          </div>
        </div>
      ))}
    </div>
    <div className="mt-24 md:mt-32">
      <div className="text-[11px] md:text-xs tracking-[0.22em] font-bold uppercase mb-8 flex items-center gap-3">
        <span className="inline-block w-8 h-[2px] bg-black" /><span>// WHEN I'M NOT CODING</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {hobbies.map((h, i) => (
          <div key={i} className="border-2 border-black p-4 md:p-5 hover:translate-y-[-4px] transition-transform duration-300 bg-white">
            <div className="display-font font-black text-xl md:text-2xl tracking-tight">{h.label}</div>
            <div className="text-xs md:text-sm text-black/60 mt-1">{h.sub}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
export default Journey;
