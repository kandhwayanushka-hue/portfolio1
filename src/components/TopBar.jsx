import React, { useEffect, useState } from 'react';
import { profile } from '../data/mock';

const TopBar = () => {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => {
      const d = new Date();
      setTime(`${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`);
    };
    update();
    const t = setInterval(update, 30000);
    return () => clearInterval(t);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black text-white border-b border-white/10">
      <div className="px-5 md:px-8 py-3 flex items-center justify-between text-[11px] md:text-xs tracking-[0.18em] font-bold uppercase">
        <a href={`mailto:${profile.email}`} className="underline underline-offset-4 decoration-2 hover:text-[#F8D766] transition-colors">{profile.email}</a>
        <div className="hidden md:flex items-center gap-6 opacity-80">
          <span>{profile.city}</span><span className="text-white/50">/</span>
          <span>{time}</span><span className="text-white/50">/</span>
          <span>LAST UPDATED · {profile.lastUpdated}</span>
        </div>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" className="underline underline-offset-4 decoration-2 hover:text-[#F8D766] transition-colors">LINKEDIN.COM/IN/ANUSHKA</a>
      </div>
    </header>
  );
};
export default TopBar;
