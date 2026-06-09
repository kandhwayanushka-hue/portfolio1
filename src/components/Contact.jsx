import React, { useState } from 'react';
import { profile } from '../data/mock';
import { PixelArrow, PixelHeart, PixelStar, PixelFlower } from './PixelArt';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    const all = JSON.parse(localStorage.getItem('contact_msgs') || '[]');
    all.push({ ...form, ts: Date.now() });
    localStorage.setItem('contact_msgs', JSON.stringify(all));
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="relative bg-[#F8D766] text-black py-24 md:py-32 px-5 md:px-12 lg:px-16 overflow-hidden">
      <div className="absolute top-10 left-10 opacity-80"><PixelStar size={28} color="#F85D7F" className="twinkle" /></div>
      <div className="absolute bottom-20 right-16 opacity-90"><PixelFlower size={32} color="#F85D7F" center="#000" /></div>
      <div className="absolute top-1/2 right-1/4 hidden md:block"><PixelHeart size={24} color="#000" /></div>

      <div className="text-[11px] md:text-xs tracking-[0.22em] font-bold uppercase mb-10 flex items-center gap-3">
        <span className="inline-block w-8 h-[2px] bg-black" /><span>// CONTACT</span>
      </div>
      <h2 className="display-font font-black leading-[0.85] tracking-[-0.04em]" style={{ fontSize: 'clamp(56px, 13vw, 220px)' }}>
        Let's build<br /><span className="italic">something</span><br />together.
      </h2>

      <div className="mt-16 grid md:grid-cols-2 gap-10 md:gap-16">
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-[10px] font-bold tracking-[0.2em] uppercase">Your Name*</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full mt-2 bg-transparent border-b-2 border-black py-3 text-xl md:text-2xl font-bold focus:outline-none placeholder-black/40"
              placeholder="Anushka" required />
          </div>
          <div>
            <label className="text-[10px] font-bold tracking-[0.2em] uppercase">Email*</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full mt-2 bg-transparent border-b-2 border-black py-3 text-xl md:text-2xl font-bold focus:outline-none placeholder-black/40"
              placeholder="you@hello.com" required />
          </div>
          <div>
            <label className="text-[10px] font-bold tracking-[0.2em] uppercase">Message</label>
            <textarea rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full mt-2 bg-transparent border-b-2 border-black py-3 text-lg font-medium focus:outline-none placeholder-black/40 resize-none"
              placeholder="Tell me about your idea..." />
          </div>
          <button type="submit" className="mt-4 inline-flex items-center gap-3 bg-black text-[#F8D766] px-7 py-4 font-black tracking-[0.22em] uppercase text-sm hover:bg-[#F85D7F] hover:text-black transition-colors">
            {sent ? 'Message Saved!' : 'Send Message'} <PixelArrow size={16} />
          </button>
        </form>

        <div className="flex flex-col justify-between">
          <div className="space-y-2">
            <p className="text-xs font-bold tracking-[0.22em] uppercase opacity-70">Or reach out directly</p>
            <a href={`mailto:${profile.email}`} className="block display-font font-black text-2xl md:text-4xl underline underline-offset-8 decoration-2 hover:decoration-[6px] transition-all break-all">{profile.email}</a>
          </div>
          <div className="mt-10 space-y-3">
            {[
              { l: 'GITHUB', h: profile.github },
              { l: 'LINKEDIN', h: profile.linkedin },
              { l: 'INSTAGRAM', h: profile.instagram },
              { l: 'YOUTUBE', h: profile.youtube },
              { l: 'X / TWITTER', h: profile.x },
            ].map((s) => (
              <a key={s.l} href={s.h} target="_blank" rel="noreferrer"
                className="group flex items-center justify-between border-b-2 border-black py-3 hover:translate-x-2 transition-transform">
                <span className="font-black tracking-[0.18em] uppercase">{s.l}</span>
                <PixelArrow size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-24 pt-8 border-t-2 border-black flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs font-bold tracking-[0.22em] uppercase">
        <span>© {new Date().getFullYear()} Anushka Kandhway</span>
        <span className="flex items-center gap-2">Built with <PixelHeart size={14} color="#000" /> in Delhi</span>
        <span>v1.0 · {profile.lastUpdated}</span>
      </div>
    </section>
  );
};
export default Contact;
