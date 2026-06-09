import { PixelArrow, PixelStar } from "./PixelSparkle";

export default function ContactSection({ onStartProject }) {
  return (
    <section id="contact" className="px-6 md:px-12 py-24 md:py-32 border-t-[3px] border-[var(--ink)] bg-[var(--bg)] relative overflow-hidden" data-testid="contact-section">
      <div className="absolute -top-6 left-1/2 -translate-x-1/2"><PixelStar size={36} color="#FF3B30" /></div>

      <div className="max-w-6xl mx-auto text-center">
        <p className="font-pixel uppercase text-sm text-[var(--text-muted)] mb-4">✦ Say hi</p>
        <h3 className="font-display font-black tracking-tighter leading-[0.85] text-[16vw] md:text-[10rem]" data-testid="contact-headline">
          Let&apos;s build
          <br />
          <span className="italic font-light text-[var(--primary)]">something.</span>
        </h3>

        <button
          onClick={onStartProject}
          data-testid="contact-start-project-btn"
          className="mt-10 brutal brutal-lift rounded-full px-8 py-5 bg-[var(--ink)] text-[var(--bg)] font-display font-bold text-xl uppercase tracking-wide inline-flex items-center gap-3"
        >
          Start a Project
          <PixelArrow size={22} color="#fff" />
        </button>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <a href="https://www.instagram.com/kandhwayanushka" target="_blank" rel="noreferrer" data-testid="contact-instagram-link" className="brutal brutal-lift rounded-2xl px-6 py-5 bg-[var(--pixel-pink)] text-left flex items-center justify-between gap-4">
            <div>
              <div className="font-pixel uppercase text-xs">Instagram</div>
              <div className="font-display font-bold text-lg md:text-xl mt-1">@kandhwayanushka</div>
            </div>
            <PixelArrow size={22} />
          </a>
          <a href="https://www.linkedin.com/in/anushka-kandhway-0b2463364/" target="_blank" rel="noreferrer" data-testid="contact-linkedin-link" className="brutal brutal-lift rounded-2xl px-6 py-5 bg-[var(--accent)] text-left flex items-center justify-between gap-4">
            <div>
              <div className="font-pixel uppercase text-xs">LinkedIn</div>
              <div className="font-display font-bold text-lg md:text-xl mt-1">/in/anushka-kandhway</div>
            </div>
            <PixelArrow size={22} />
          </a>
          <a href="https://x.com/KandhwayAn87764" target="_blank" rel="noreferrer" data-testid="contact-twitter-link" className="brutal brutal-lift rounded-2xl px-6 py-5 bg-[var(--secondary)] text-white text-left flex items-center justify-between gap-4">
            <div>
              <div className="font-pixel uppercase text-xs">Twitter / X</div>
              <div className="font-display font-bold text-lg md:text-xl mt-1">@KandhwayAn87764</div>
            </div>
            <PixelArrow size={22} color="#fff" />
          </a>
          <a href="https://www.youtube.com/@BelieveeToAchievee" target="_blank" rel="noreferrer" data-testid="contact-youtube-link" className="brutal brutal-lift rounded-2xl px-6 py-5 bg-white text-left flex items-center justify-between gap-4">
            <div>
              <div className="font-pixel uppercase text-xs text-[var(--text-muted)]">YouTube</div>
              <div className="font-display font-bold text-lg md:text-xl mt-1">@BelieveeToAchievee</div>
            </div>
            <PixelArrow size={22} />
          </a>
        </div>
      </div>
    </section>
  );
}
