import { useEffect, useRef, useState } from "react";

export function HeroAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Basic theme detection
    const checkTheme = () => {
      const isDarkTheme =
        document.documentElement.getAttribute("data-theme") === "dark" ||
        (!document.documentElement.hasAttribute("data-theme") &&
          window.matchMedia("(prefers-color-scheme: dark)").matches);
      setIsDark(isDarkTheme);
    };

    checkTheme();

    // Create a MutationObserver to watch for theme changes on the html tag
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-theme") {
          checkTheme();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const shapes = ["circle", "square", "triangle", "diamond"];

    // Node definition
    class Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      isCore: boolean;
      shape: string;
      rotation: number;
      vRotation: number;

      constructor(x: number, y: number, isCore = false) {
        this.x = x;
        this.y = y;
        this.isCore = isCore;
        this.size = isCore ? 5 : Math.random() * 2 + 1;
        this.opacity = isCore ? 1 : Math.random() * 0.5 + 0.1;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.shape = isCore ? "diamond" : shapes[Math.floor(Math.random() * shapes.length)];
        this.rotation = Math.random() * Math.PI * 2;
        this.vRotation = (Math.random() - 0.5) * 0.02;
      }

      update() {
        if (!this.isCore) {
          this.x += this.vx;
          this.y += this.vy;
          this.rotation += this.vRotation;

          if (this.x < 0 || this.x > w) this.vx *= -1;
          if (this.y < 0 || this.y > h) this.vy *= -1;
        } else {
          this.rotation += 0.01; // slow spin for core
        }
      }

      draw(isDarkTheme: boolean) {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        ctx.beginPath();

        // Base color logic
        let fillColor;
        if (this.isCore) {
          fillColor = `rgba(139, 92, 246, ${this.opacity})`; // Purple
        } else {
          fillColor = isDarkTheme
            ? `rgba(255, 255, 255, ${this.opacity * 1.2})`
            : `rgba(20, 20, 20, ${this.opacity * 1.5})`; // Dark grey for light mode
        }

        ctx.fillStyle = fillColor;

        if (this.isCore) {
          ctx.shadowBlur = 20;
          ctx.shadowColor = "rgba(139, 92, 246, 0.8)";
        } else {
          ctx.shadowBlur = 0;
        }

        // Draw different shapes
        if (this.shape === "circle") {
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        } else if (this.shape === "square") {
          ctx.rect(-this.size, -this.size, this.size * 2, this.size * 2);
        } else if (this.shape === "triangle") {
          ctx.moveTo(0, -this.size * 1.2);
          ctx.lineTo(this.size * 1.2, this.size * 1.2);
          ctx.lineTo(-this.size * 1.2, this.size * 1.2);
          ctx.closePath();
        } else if (this.shape === "diamond") {
          ctx.moveTo(0, -this.size * 1.5);
          ctx.lineTo(this.size * 1.5, 0);
          ctx.lineTo(0, this.size * 1.5);
          ctx.lineTo(-this.size * 1.5, 0);
          ctx.closePath();
        }

        ctx.fill();
        ctx.restore();
      }
    }

    // Initialize nodes
    const nodes: Node[] = [];
    const coreNode = new Node(w / 2, h / 2, true);
    nodes.push(coreNode);

    // More nodes for a richer constellation
    for (let i = 0; i < 50; i++) {
      nodes.push(new Node(Math.random() * w, Math.random() * h));
    }

    // Network connections
    const drawConnections = (isDarkTheme: boolean) => {
      if (!ctx) return;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          const maxDist = 130;
          if (distance < maxDist) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);

            const isCoreConnection = nodes[i].isCore || nodes[j].isCore;
            const opacity = 1 - distance / maxDist;

            if (isCoreConnection) {
              ctx.strokeStyle = `rgba(139, 92, 246, ${opacity * 0.9})`; // Bright purple
              ctx.lineWidth = 1.5;
            } else {
              ctx.strokeStyle = isDarkTheme
                ? `rgba(255, 255, 255, ${opacity * 0.3})` // Soft white lines
                : `rgba(20, 20, 20, ${opacity * 0.15})`; // Soft dark lines
              ctx.lineWidth = 0.8;
            }

            ctx.stroke();
          }
        }
      }
    };

    // Main loop
    const render = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      // Update core position slightly
      coreNode.x = w / 2 + Math.sin(Date.now() / 3000) * 30;
      coreNode.y = h / 2 + Math.cos(Date.now() / 2000) * 20;

      // Pulse core size
      coreNode.size = 6 + Math.sin(Date.now() / 600) * 2;

      nodes.forEach((node) => {
        node.update();
        // Read the current state directly
        node.draw(isDark);
      });

      drawConnections(isDark);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Handle resize
    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      if (coreNode) {
        coreNode.x = w / 2;
        coreNode.y = h / 2;
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isDark]); // Re-initialize if theme deeply changes, though the state is checked in render

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
