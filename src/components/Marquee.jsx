import React from 'react';
import { marqueeWords } from '../data/mock';
import { PixelStar, PixelHeart, PixelFlower } from './PixelArt';

const icons = [
  <PixelStar size={20} color="#FFD93D" key="s" />,
  <PixelHeart size={20} color="#F85D7F" key="h" />,
  <PixelFlower size={20} key="f" />,
];

const Marquee = ({ reverse = false, bg = 'bg-[#F8D766]', text = 'text-black' }) => {
  const items = [...marqueeWords, ...marqueeWords];
  return (
    <div className={`${bg} ${text} border-y-2 border-black overflow-hidden py-4 md:py-5`}>
      <div className={`flex gap-8 whitespace-nowrap ${reverse ? 'marquee-rev' : 'marquee'}`}>
        {items.map((w, i) => (
          <div key={i} className="flex items-center gap-8 shrink-0">
            <span className="display-font font-black text-2xl md:text-4xl tracking-tight">{w}</span>
            <span className="shrink-0">{icons[i % icons.length]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Marquee;
