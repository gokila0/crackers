import React, { useEffect, useRef } from 'react';

export default function FireworksCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight || 600;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system for fireworks
    let particles = [];
    let rockets = [];

    class Rocket {
      constructor() {
        this.x = Math.random() * (canvas.width * 0.8) + canvas.width * 0.1;
        this.y = canvas.height;
        this.targetY = Math.random() * (canvas.height * 0.4) + canvas.height * 0.1;
        this.speed = Math.random() * 3 + 4;
        this.angle = (Math.random() * 0.2 - 0.1);
        this.color = `hsl(${Math.random() * 60 + 15}, 100%, 60%)`; // Gold/amber hues
      }

      update() {
        this.y -= this.speed;
        this.x += Math.sin(this.angle);

        // Add rocket tail particle
        particles.push(new Particle(this.x, this.y, (Math.random() - 0.5) * 1, Math.random() * 2 + 1, 'rgba(251, 191, 36, 0.6)', 1.5, 0.05));

        if (this.y <= this.targetY) {
          this.explode();
          return false;
        }
        return true;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      explode() {
        const count = Math.floor(Math.random() * 40) + 30;
        const baseHue = Math.random() * 360;
        for (let i = 0; i < count; i++) {
          const angle = (Math.PI * 2 / count) * i + Math.random() * 0.2;
          const speed = Math.random() * 4 + 1.5;
          const vx = Math.cos(angle) * speed;
          const vy = Math.sin(angle) * speed;
          const hue = (baseHue + Math.random() * 40) % 360;
          const color = `hsl(${hue}, 95%, 65%)`;
          particles.push(new Particle(this.x, this.y, vx, vy, color, Math.random() * 2 + 1.5, 0.02));
        }
      }
    }

    class Particle {
      constructor(x, y, vx, vy, color, size, decay) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.size = size;
        this.alpha = 1;
        this.decay = decay || 0.02;
        this.gravity = 0.05;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.alpha -= this.decay;
        return this.alpha > 0;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.restore();
      }
    }

    let lastRocketTime = 0;

    const render = (time) => {
      // Trail effect
      ctx.fillStyle = 'rgba(11, 9, 20, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Spawn rockets periodically
      if (time - lastRocketTime > 800 + Math.random() * 1200) {
        rockets.push(new Rocket());
        lastRocketTime = time;
      }

      // Update rockets
      rockets = rockets.filter(rocket => {
        const alive = rocket.update();
        if (alive) rocket.draw();
        return alive;
      });

      // Update particles
      particles = particles.filter(particle => {
        const alive = particle.update();
        if (alive) particle.draw();
        return alive;
      });

      // Draw background warm ambient glow on the right bottom (temple area)
      const gradient = ctx.createRadialGradient(
        canvas.width * 0.85, canvas.height * 0.8, 10,
        canvas.width * 0.85, canvas.height * 0.8, canvas.width * 0.4
      );
      gradient.addColorStop(0, 'rgba(234, 88, 12, 0.12)');
      gradient.addColorStop(0.5, 'rgba(185, 28, 28, 0.06)');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Authentic Sivakasi Temple Gopuram Overlay on the Right */}
      <div
        className="absolute right-0 bottom-0 top-0 w-full sm:w-2/3 md:w-1/2 opacity-40 pointer-events-none bg-cover bg-center mix-blend-screen"
        style={{
          backgroundImage: `url('/temple-fireworks.png')`,
          maskImage: 'linear-gradient(to right, transparent 0%, black 40%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 40%)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b0914] via-[#0b0914]/80 to-transparent pointer-events-none" />
    </div>
  );
}
