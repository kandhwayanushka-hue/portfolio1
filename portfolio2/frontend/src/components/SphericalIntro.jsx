import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";

const RING_COUNT = 23;
const TORUS_RADIUS = 5.5;
const TUBE_THICKNESS = 0.055;
const CYCLE_DURATION = 5;
const STAGGER_MS = 200;

const letters = ["H", "i", "!"];

const letterVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.5, rotate: -10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: [0.17, 0.67, 0.29, 1.0],
    },
  }),
};

export default function SphericalIntro() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const stateRef = useRef(null);
  const rafRef = useRef(null);
  const [greetingVisible, setGreetingVisible] = useState(false);
  const [greetingDone, setGreetingDone] = useState(false);

  const getScrollProgress = useCallback(() => {
    const el = containerRef.current;
    if (!el) return 1;
    const rect = el.getBoundingClientRect();
    const viewH = window.innerHeight;
    const total = rect.height - viewH;
    if (total <= 0) return 1;
    return Math.max(0, Math.min(1, -rect.top / total));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1, 9);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0a0a0a, 1);

    const hemiLight = new THREE.HemisphereLight(0xca8a00, 0x007aff, 1.2);
    scene.add(hemiLight);
    const ambient = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambient);

    const ringMeshes = [];
    const ringGroups = [];

    for (let i = 0; i < RING_COUNT; i++) {
      const geo = new THREE.TorusGeometry(TORUS_RADIUS, TUBE_THICKNESS, 16, 60);
      const mat = new THREE.MeshStandardMaterial({
        color: 0xfdfbf7,
        metalness: 0,
        roughness: 0.1,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.scale.set(0, 0, 0);
      mesh.rotation.x = Math.PI / 2;
      const group = new THREE.Group();
      group.add(mesh);
      scene.add(group);
      ringGroups.push(group);
      ringMeshes.push({ mesh, mat, startTime: Date.now() });
    }

    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    document.addEventListener("mousemove", onMouseMove);

    stateRef.current = { scene, camera, renderer, ringMeshes, ringGroups };

    let lastSp = 0;

    const animate = () => {
      const sp = getScrollProgress();
      const scrollDelta = Math.abs(sp - lastSp);
      lastSp = sp;

      // Boost animation speed when scrolling fast (up to 6x)
      const speedBoost = 1 + scrollDelta * 30;
      const boostedElapsed = (Date.now() - ringMeshes[0].startTime) / 1000 * speedBoost;

      const targetRotX = Math.PI / 2 + sp * (-Math.PI * 2.5 - Math.PI / 2);
      scene.rotation.x += (targetRotX - scene.rotation.x) * 0.08;
      scene.rotation.y += (1.25 * mouseX - scene.rotation.y) * 0.04;
      scene.rotation.z += (0.1 * mouseY - scene.rotation.z) * 0.04;

      let sceneOpacity = 1;
      if (sp > 0.6) {
        sceneOpacity = Math.max(0, 1 - (sp - 0.6) / 0.25);
      }

      // greeting visibility
      setGreetingVisible(sp > 0.55 && sp < 0.92);
      setGreetingDone(sp >= 0.92);

      for (let i = 0; i < ringMeshes.length; i++) {
        const rm = ringMeshes[i];
        const delay = (i * STAGGER_MS) / 1000;
        const phase = ((boostedElapsed - delay) % CYCLE_DURATION) / CYCLE_DURATION;
        const np = Math.max(0, Math.min(phase, 1));

        const easeScale = 1 - Math.pow(1 - Math.min(np * 1.5, 1), 3);
        const scrollScale = 0.5 + sp * 0.5;
        const s = easeScale * scrollScale;
        rm.mesh.scale.set(s, s, s);

        const floatAmp = 0.5 * (1 - sp * 0.5);
        rm.mesh.position.y = floatAmp * Math.sin(boostedElapsed * 1.5 + 0.2 * i);
        rm.mat.opacity = Math.min(1, easeScale * 1.5) * sceneOpacity;
      }

      for (let i = 0; i < ringGroups.length; i++) {
        const g = ringGroups[i];
        const m = sp * 0.8;
        g.rotation.x = (2.5 + 0.05 * i) * m;
        g.rotation.y = (4.8 + 0.1 * i) * m;
        g.rotation.z = (6.6 + 0.15 * i) * m;
      }

      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      ringMeshes.forEach((rm) => rm.mesh.geometry.dispose());
      renderer.dispose();
    };
  }, [getScrollProgress]);

  return (
    <div ref={containerRef} style={{ height: "180vh", position: "relative", zIndex: 1 }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: "var(--ink)",
        }}
      >
        <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />

        {/* Gradient overlay at bottom for smooth transition */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "40vh",
            background: "linear-gradient(to top, var(--bg) 0%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Greeting */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            opacity: greetingVisible ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
        >
          <span
            style={{
              fontFamily: "Outfit, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(6rem, 25vw, 16rem)",
              letterSpacing: "-0.04em",
              lineHeight: 1,
              display: "flex",
              gap: "0.02em",
              color: "var(--bg)",
            }}
          >
            {letters.map((letter, i) => {
              const delay = 0.55 + i * 0.18;
              return (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 80, scale: 0.4, rotate: -12 }}
                  animate={
                    greetingVisible
                      ? greetingDone
                        ? { opacity: 0, y: -60, scale: 0.8, rotate: 6 }
                        : { opacity: 1, y: 0, scale: 1, rotate: 0 }
                      : { opacity: 0, y: 80, scale: 0.4, rotate: -12 }
                  }
                  transition={{
                    duration: 0.7,
                    delay: greetingVisible && !greetingDone ? delay : 0,
                    ease: [0.17, 0.67, 0.29, 1.0],
                  }}
                  style={{ display: "inline-block", textShadow: "0 0 60px rgba(253,251,247,0.15)" }}
                >
                  {letter}
                </motion.span>
              );
            })}
          </span>
        </div>

        {/* Scroll indicator */}
        <motion.div
          style={{
            position: "absolute",
            bottom: "2.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "VT323, monospace",
            fontSize: "0.85rem",
            color: "rgba(253, 251, 247, 0.4)",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            textAlign: "center",
            pointerEvents: "none",
          }}
          animate={{ opacity: greetingVisible ? 0 : 0.5 }}
          transition={{ duration: 0.5 }}
        >
          ↓ scroll
        </motion.div>
      </div>
    </div>
  );
}
