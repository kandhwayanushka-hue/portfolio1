import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x, ty = y;
    let raf;

    const move = (e) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const over = (e) => {
      const t = e.target;
      if (t.closest && t.closest("a, button, [role='button'], input, textarea, select")) {
        el.classList.add("hover");
      } else {
        el.classList.remove("hover");
      }
    };
    const loop = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    loop();
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="cursor-blob" data-testid="custom-cursor" />;
}
