import { PixelHeart } from "@/components/PixelSparkle";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[var(--ink)] text-[var(--bg)] px-6 md:px-12 py-16 border-t-[3px] border-[var(--ink)]" data-testid="site-footer">
      <div className="max-w-6xl mx-auto">
        <h4 className="font-display font-black tracking-tighter leading-[0.85] text-[14vw] md:text-[8rem]">
          ANUSHKA<span className="text-[var(--primary)]">.</span>
        </h4>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-white/20 pt-8">
          <div>
            <p className="font-pixel uppercase text-xs text-white/60 mb-2">Email</p>
            <a href="mailto:anushkakandhway@gmail.com" className="font-display text-lg underline underline-offset-4" data-testid="footer-email">anushkakandhway@gmail.com</a>
          </div>
          <div>
            <p className="font-pixel uppercase text-xs text-white/60 mb-2">Elsewhere</p>
            <div className="flex flex-wrap gap-4 font-display text-lg">
              <a href="https://github.com/kandhwayanushka-hue" target="_blank" rel="noreferrer" className="underline underline-offset-4" data-testid="footer-github">GitHub</a>
              <a href="https://www.linkedin.com/in/anushka-kandhway-0b2463364/" target="_blank" rel="noreferrer" className="underline underline-offset-4" data-testid="footer-linkedin">LinkedIn</a>
            </div>
          </div>
          <div className="md:text-right">
            <p className="font-pixel uppercase text-xs text-white/60 mb-2">Crafted</p>
            <p className="font-pixel uppercase text-sm flex md:justify-end items-center gap-2">made with <PixelHeart size={18} color="#FF66B2" /> in Delhi · {year}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
