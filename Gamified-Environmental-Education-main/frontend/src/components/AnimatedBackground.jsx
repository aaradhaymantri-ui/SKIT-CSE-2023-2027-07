import React, { useEffect, useRef } from "react";

function AnimatedBackground() {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const particlesRef = useRef([]);
  const lastTsRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      canvas.width = Math.floor(width * DPR);
      canvas.height = Math.floor(height * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      initParticles();
    }

    function initParticles() {
      const count = Math.floor((width * height) / 24000); // density-based
      particlesRef.current = new Array(count).fill(0).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        r: Math.random() * 1.6 + 0.6,
        h: 140 + Math.floor(Math.random() * 40), // green/teal hue
        a: Math.random() * 0.35 + 0.15,
      }));
    }

    function flowFieldForce(x, y, t) {
      // lightweight pseudo-noise based on sin/cos
      const k1 = 0.0009;
      const k2 = 0.0013;
      const n = Math.sin(x * k1 + t * 0.2) + Math.cos(y * k2 - t * 0.25);
      const angle = n * Math.PI;
      const speed = 0.25 + 0.25 * Math.sin(t * 0.5);
      return { fx: Math.cos(angle) * speed, fy: Math.sin(angle) * speed };
    }

    function step(ts) {
      const t = ts / 1000;
      const dt = Math.min(0.033, (ts - lastTsRef.current) / 1000 || 0.016);
      lastTsRef.current = ts;

      ctx.clearRect(0, 0, width, height);

      // soft gradient background tint (green/cyan/amber accent for light theme)
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, "#f7fff8");
      grad.addColorStop(1, "#ffffff");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // particle trails layer
      particlesRef.current.forEach(p => {
        const { fx, fy } = flowFieldForce(p.x, p.y, t);
        p.vx = p.vx * 0.96 + fx * 0.04;
        p.vy = p.vy * 0.96 + fy * 0.04;
        p.x += p.vx * (1 + 0.5 * p.r);
        p.y += p.vy * (1 + 0.5 * p.r);
        if (p.x < -5) p.x = width + 5; if (p.x > width + 5) p.x = -5;
        if (p.y < -5) p.y = height + 5; if (p.y > height + 5) p.y = -5;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = `hsla(${p.h}, 55%, 40%, ${p.a})`;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(step);
    }

    resize();
    window.addEventListener("resize", resize);
    rafRef.current = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="eco-bg-canvas"
      aria-hidden="true"
    />
  );
}

export default AnimatedBackground;


