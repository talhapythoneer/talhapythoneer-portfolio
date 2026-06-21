"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  hx: number; // home position — nodes spring back here so the net is static at rest
  hy: number;
  vx: number;
  vy: number;
  radius: number;
  pop: number; // 0..1 bounce/scale impulse, decays each frame
}

export default function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const runningRef = useRef(false);
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const sizeRef = useRef({ w: 0, h: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const seedNodes = (w: number, h: number) => {
      const count = Math.max(28, Math.min(80, Math.floor((w * h) / 15000)));
      nodesRef.current = Array.from({ length: count }, () => {
        const x = Math.random() * w;
        const y = Math.random() * h;
        return {
          x,
          y,
          hx: x,
          hy: y,
          vx: 0,
          vy: 0,
          radius: Math.random() * 2 + 1.6,
          pop: 0,
        };
      });
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (w === 0 || h === 0) return;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // draw in CSS pixels, crisp on retina
      if (nodesRef.current.length === 0 || sizeRef.current.w === 0) seedNodes(w, h);
      sizeRef.current = { w, h };
      kick(); // redraw after layout changes
    };

    const LINK_DIST = 155; // max distance to draw a connecting line
    const REPEL_DIST = 150; // cursor influence radius
    const MAX_SPEED = 3.5; // cap so bouncy pushes don't fling nodes off
    const SPRING = 0.035; // pull back toward home
    const DAMP = 0.86; // settle velocity

    const render = () => {
      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);
      const nodes = nodesRef.current;
      const mouse = mouseRef.current;

      let active = false;

      nodes.forEach((node) => {
        // Bouncy cursor interaction: repel + a decaying "pop" scale impulse.
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.hypot(dx, dy);
        if (dist < REPEL_DIST && dist > 0) {
          const t = (REPEL_DIST - dist) / REPEL_DIST;
          const force = t * t * 1.8;
          node.vx -= (dx / dist) * force;
          node.vy -= (dy / dist) * force;
          node.pop = Math.max(node.pop, t);
        }

        // Spring back toward home so the network is static when undisturbed.
        node.vx += (node.hx - node.x) * SPRING;
        node.vy += (node.hy - node.y) * SPRING;
        node.vx *= DAMP;
        node.vy *= DAMP;

        const sp = Math.hypot(node.vx, node.vy);
        if (sp > MAX_SPEED) {
          node.vx = (node.vx / sp) * MAX_SPEED;
          node.vy = (node.vy / sp) * MAX_SPEED;
        }

        node.x += node.vx;
        node.y += node.vy;
        node.pop *= 0.9;

        if (sp > 0.05 || node.pop > 0.01 || Math.hypot(node.x - node.hx, node.y - node.hy) > 0.4) {
          active = true;
        }
      });

      // links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(225, 29, 72, ${alpha})`;
            ctx.lineWidth = 1.1;
            ctx.stroke();
          }
        }
      }

      // nodes
      nodes.forEach((node) => {
        const dist = Math.hypot(node.x - mouse.x, node.y - mouse.y);
        const near = dist < 130;
        const glow = Math.min(1, (near ? (1 - dist / 130) * 0.6 : 0) + node.pop * 0.5 + 0.5);
        const r = node.radius * (1 + node.pop * 1.3); // bounce scale

        ctx.beginPath();
        ctx.arc(node.x, node.y, r + 4 + node.pop * 6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244, 63, 94, ${node.pop * 0.25 + (near ? 0.12 : 0.06)})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244, 63, 94, ${glow})`;
        ctx.fill();
      });

      return active;
    };

    const loop = () => {
      const { w, h } = sizeRef.current;
      if (w === 0 || h === 0) {
        animRef.current = requestAnimationFrame(loop);
        return;
      }
      const mouse = mouseRef.current;
      const mouseInBounds = mouse.x >= 0 && mouse.y >= 0 && mouse.x <= w && mouse.y <= h;
      const active = render();
      // Keep animating only while the cursor is over the hero or nodes are still
      // settling; otherwise stop so the network sits perfectly static.
      if (!prefersReduced && (mouseInBounds || active)) {
        animRef.current = requestAnimationFrame(loop);
      } else {
        runningRef.current = false;
      }
    };

    // Start (or restart) the loop on demand.
    const kick = () => {
      if (prefersReduced) {
        render();
        return;
      }
      if (!runningRef.current) {
        runningRef.current = true;
        animRef.current = requestAnimationFrame(loop);
      }
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    render(); // initial static frame

    // Listen on window so hovering anywhere over the hero (including over the
    // text/photo that sit above the canvas) still drives the interaction.
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const inBounds = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      mouseRef.current = inBounds ? { x, y } : { x: -9999, y: -9999 };
      if (inBounds) kick();
    };
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      cancelAnimationFrame(animRef.current);
      runningRef.current = false;
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-95"
      aria-hidden="true"
    />
  );
}
