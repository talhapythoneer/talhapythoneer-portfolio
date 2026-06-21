"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export default function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
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
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.3 + Math.random() * 0.5; // varied drift speeds
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: Math.random() * 1.6 + 1.1,
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
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    const LINK_DIST = 150;
    const MIN_SPEED = 0.25; // baseline drift so the network is always moving
    const MAX_SPEED = 1.2; // cap so cursor pushes don't fling nodes

    const draw = () => {
      const { w, h } = sizeRef.current;
      if (w === 0 || h === 0) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }
      ctx.clearRect(0, 0, w, h);

      const nodes = nodesRef.current;
      const mouse = mouseRef.current;

      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;
        node.x = Math.max(0, Math.min(w, node.x));
        node.y = Math.max(0, Math.min(h, node.y));

        // gentle attraction toward cursor
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 150 && dist > 0) {
          const force = ((150 - dist) / 150) * 0.22;
          node.vx += (dx / dist) * force;
          node.vy += (dy / dist) * force;
        }

        // Keep nodes perpetually drifting: clamp speed to [MIN, MAX] so they
        // never decay to a standstill and never run away after cursor pushes.
        let sp = Math.hypot(node.vx, node.vy);
        if (sp < 1e-4) {
          const a = Math.random() * Math.PI * 2;
          node.vx = Math.cos(a);
          node.vy = Math.sin(a);
          sp = 1;
        }
        if (sp < MIN_SPEED) {
          node.vx = (node.vx / sp) * MIN_SPEED;
          node.vy = (node.vy / sp) * MIN_SPEED;
        } else if (sp > MAX_SPEED) {
          node.vx = (node.vx / sp) * MAX_SPEED;
          node.vy = (node.vy / sp) * MAX_SPEED;
        }
      });

      // links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.4;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(225, 29, 72, ${alpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }

      // nodes
      nodes.forEach((node) => {
        const dist = Math.hypot(node.x - mouse.x, node.y - mouse.y);
        const near = dist < 110;
        const glow = near ? (1 - dist / 110) * 0.7 + 0.3 : 0.35;

        if (near) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(244, 63, 94, ${glow * 0.18})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244, 63, 94, ${glow})`;
        ctx.fill();
      });

      if (!prefersReduced) animRef.current = requestAnimationFrame(draw);
    };

    draw(); // reduced-motion users get a single static frame

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-80"
      aria-hidden="true"
    />
  );
}
