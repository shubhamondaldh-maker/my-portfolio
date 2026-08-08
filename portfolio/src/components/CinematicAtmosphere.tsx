"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  targetAlpha: number;
  pulsePhase: number;
  pulseSpeed: number;
  z: number; // depth: < 0.8 is background (blurry), 0.8 to 1.2 is sharp, > 1.2 is foreground (large & soft)
  type: "firefly" | "petal" | "text";
  targetX?: number;
  targetY?: number;
  // Petal specific properties
  swaySpeed?: number;
  swayPhase?: number;
  rotation?: number;
  rotationSpeed?: number;
  fadeY?: number; // Y coordinate where it starts fading out
}

interface Sparkle {
  x: number;
  y: number;
  size: number;
  maxSize: number;
  alpha: number;
  life: number;
  maxLife: number;
  phase: number;
}

interface ShootingStar {
  x: number;
  y: number;
  tx: number;
  ty: number;
  vx: number;
  vy: number;
  length: number;
  alpha: number;
  active: boolean;
}

interface CursorIdleParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  life: number;
  maxLife: number;
  children: { x: number; y: number; vx: number; vy: number; alpha: number; life: number }[];
}

export default function CinematicAtmosphere() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Mouse & Scroll interaction refs
  const mouseRef = useRef({ x: 0, y: 0 });
  const mouseMovingRef = useRef(false);
  const mouseIdleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const cursorIdleParticleRef = useRef<CursorIdleParticle | null>(null);
  const scrollOffsetRef = useRef(0);
  const scrollDeltaRef = useRef(0);
  const lastScrollYRef = useRef(0);

  // First-load entrance stage control
  // 0 = dark/dormant, 1 = gathering text, 2 = dispersing, 3 = normal loop
  const entranceStageRef = useRef(0);
  const entranceTimeRef = useRef(0);

  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Responsive scaling variables
    let isMobile = width < 768;
    let isTablet = width >= 768 && width < 1024;
    let particleCountScale = isMobile ? 0.4 : isTablet ? 0.7 : 1.0;

    const maxFireflies = Math.round(20 * particleCountScale);
    const maxPetals = Math.round(8 * particleCountScale);

    // Particle arrays
    const fireflies: Particle[] = [];
    const petals: Particle[] = [];
    const sparkles: Sparkle[] = [];
    let shootingStar: ShootingStar = { x: 0, y: 0, tx: 0, ty: 0, vx: 0, vy: 0, length: 0, alpha: 0, active: false };
    
    // Light sweep variables
    let sweepX = -500;
    let sweepActive = false;
    let lastSweepTime = Date.now();
    let sweepInterval = 25000 + Math.random() * 15000; // 25-40s

    // Cosmic nebulas slow movement variables
    let nebulaLeftX = 0.2 * width;
    let nebulaRightX = 0.8 * width;
    let nebulaLeftTargetX = 0.6 * width;
    let nebulaRightTargetX = 0.4 * width;

    // Shooting star scheduler
    let lastShootingStarTime = Date.now();
    let shootingStarInterval = 20000 + Math.random() * 20000; // 20-40s

    // 1. Text Pixel scanning for Hero Entrance (Code. Test. Build.)
    const textPoints: { x: number; y: number }[] = [];
    const scanTextPoints = () => {
      const scanCanvas = document.createElement("canvas");
      // Scale offscreen canvas based on viewport width
      const scaleFactor = Math.min(width / 1200, 1);
      scanCanvas.width = 800 * scaleFactor;
      scanCanvas.height = 160 * scaleFactor;
      const scanCtx = scanCanvas.getContext("2d");
      
      if (scanCtx) {
        scanCtx.font = `bold ${Math.round(64 * scaleFactor)}px Inter, system-ui, -apple-system, sans-serif`;
        scanCtx.fillStyle = "#ffffff";
        scanCtx.textAlign = "center";
        scanCtx.textBaseline = "middle";
        scanCtx.fillText("Code. Test. Build.", scanCanvas.width / 2, scanCanvas.height / 2);

        const imgData = scanCtx.getImageData(0, 0, scanCanvas.width, scanCanvas.height);
        const data = imgData.data;
        const step = isMobile ? 8 : 5; // step density

        for (let y = 0; y < scanCanvas.height; y += step) {
          for (let x = 0; x < scanCanvas.width; x += step) {
            const alphaIndex = (y * scanCanvas.width + x) * 4 + 3;
            if (data[alphaIndex] > 128) {
              // Store normalized coordinates centered around (0,0)
              textPoints.push({
                x: x - scanCanvas.width / 2,
                y: y - scanCanvas.height / 2,
              });
            }
          }
        }
      }
    };
    scanTextPoints();

    // Initialize Particles
    const initParticles = () => {
      // Fireflies
      for (let i = 0; i < maxFireflies; i++) {
        const z = 0.5 + Math.random() * 1.0;
        fireflies.push({
          x: Math.random() * width,
          y: Math.random() * height,
          baseX: 0,
          baseY: 0,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: z < 0.8 ? 3.5 + Math.random() * 2.0 : z > 1.2 ? 5.5 + Math.random() * 2.5 : 2.0 + Math.random() * 1.5,
          alpha: Math.random() * 0.4,
          targetAlpha: 0.25 + Math.random() * 0.45,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.005 + Math.random() * 0.015,
          z,
          type: "firefly",
        });
      }

      // Petals
      for (let i = 0; i < maxPetals; i++) {
        const z = 0.6 + Math.random() * 0.8;
        petals.push({
          x: Math.random() * width,
          y: Math.random() * height - height, // spawn offscreen above
          baseX: 0,
          baseY: 0,
          vx: (Math.random() - 0.5) * 0.2,
          vy: 0.3 + Math.random() * 0.5,
          r: z < 0.8 ? 3.0 + Math.random() * 1.0 : z > 1.2 ? 4.5 + Math.random() * 1.5 : 1.8 + Math.random() * 1.2,
          alpha: 0.1 + Math.random() * 0.35,
          targetAlpha: 0.1 + Math.random() * 0.35,
          pulsePhase: 0,
          pulseSpeed: 0,
          z,
          type: "petal",
          swaySpeed: 0.005 + Math.random() * 0.015,
          swayPhase: Math.random() * Math.PI * 2,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: 0.002 + Math.random() * 0.008,
          fadeY: height * (0.4 + Math.random() * 0.5), // fade out somewhere in mid-lower viewport
        });
      }
    };
    initParticles();

    // Spawn sparkles Scheduler
    const handleSparkles = () => {
      if (sparkles.length < 4 && Math.random() < 0.022) {
        sparkles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: 0.1,
          maxSize: 5.5 + Math.random() * 4.5,
          alpha: 0,
          life: 0,
          maxLife: 60 + Math.random() * 60, // 1000 - 2000ms
          phase: Math.random() * Math.PI,
        });
      }
    };

    // Spawn Shooting Star
    const triggerShootingStar = () => {
      if (isMobile) return; // Disabled on mobile
      const startX = width * (0.3 + Math.random() * 0.5);
      const startY = height * (0.05 + Math.random() * 0.15);
      const angle = 0.55 + Math.random() * 0.1; // Diagonal fall angle
      const speed = 10 + Math.random() * 6;

      shootingStar = {
        x: startX,
        y: startY,
        tx: startX - Math.cos(angle) * 300,
        ty: startY + Math.sin(angle) * 300,
        vx: -Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        length: 80 + Math.random() * 70,
        alpha: 0.8,
        active: true,
      };
    };

    // Cursor idle magic event triggers
    const spawnCursorIdleMagic = () => {
      if (isMobile) return; // Disabled on mobile
      const mouse = mouseRef.current;

      cursorIdleParticleRef.current = {
        x: mouse.x,
        y: mouse.y,
        vx: 0,
        vy: 0,
        r: 4.5,
        alpha: 0.9,
        life: 0,
        maxLife: 30, // 500ms
        children: [],
      };
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      mouseMovingRef.current = true;
      cursorIdleParticleRef.current = null; // moving cancels immediately

      if (mouseIdleTimerRef.current) clearTimeout(mouseIdleTimerRef.current);
      
      mouseIdleTimerRef.current = setTimeout(() => {
        mouseMovingRef.current = false;
        spawnCursorIdleMagic();
      }, 1200); // 1.2s threshold
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Scroll tracker
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollYRef.current;
      scrollDeltaRef.current = deltaY;
      lastScrollYRef.current = currentScrollY;
      scrollOffsetRef.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);

    // Start Entrance Text Formation
    // A subset of fireflies will become text particles
    let textParticles: Particle[] = [];
    const triggerEntranceAnimation = () => {
      entranceStageRef.current = 1;
      entranceTimeRef.current = 0;

      // Map scanned points to dynamic text particles
      // Center of the upper region of the screen (typically hero box center)
      const heroCenterX = width * 0.46;
      const heroCenterY = height * 0.44;

      textPoints.forEach((pt) => {
        // We spawn them dispersely around the screen, then fly in
        const side = Math.random() > 0.5 ? -100 : width + 100;
        const randY = Math.random() * height;

        textParticles.push({
          x: side,
          y: randY,
          baseX: heroCenterX + pt.x,
          baseY: heroCenterY + pt.y,
          vx: 0,
          vy: 0,
          r: 1.0 + Math.random() * 1.5,
          alpha: 0,
          targetAlpha: 0.4 + Math.random() * 0.5,
          pulsePhase: Math.random() * Math.PI,
          pulseSpeed: 0.05,
          z: 1.0,
          type: "text",
        });
      });
    };

    // Run entrance after 300ms delay
    const entranceTimeout = setTimeout(() => {
      triggerEntranceAnimation();
    }, 400);

    // RENDER LOOP
    const render = () => {
      // Clear viewport
      ctx.clearRect(0, 0, width, height);

      // Decelerate scroll delta response
      scrollDeltaRef.current *= 0.92;

      // 1. NEBULA CLOUDS DRAWING (Distant Cosmic Purple Atmosphere)
      // Slow organic interpolation
      nebulaLeftX += (nebulaLeftTargetX - nebulaLeftX) * 0.002;
      nebulaRightX += (nebulaRightTargetX - nebulaRightX) * 0.002;

      if (Math.abs(nebulaLeftX - nebulaLeftTargetX) < 10) {
        nebulaLeftTargetX = (0.1 + Math.random() * 0.6) * width;
      }
      if (Math.abs(nebulaRightX - nebulaRightTargetX) < 10) {
        nebulaRightTargetX = (0.3 + Math.random() * 0.6) * width;
      }

      // Draw Left Nebula
      const leftGrad = ctx.createRadialGradient(
        nebulaLeftX,
        height * 0.3,
        0,
        nebulaLeftX,
        height * 0.3,
        Math.min(width, height) * 0.6
      );
      leftGrad.addColorStop(0, "rgba(139, 92, 246, 0.045)"); // Violet/Purple
      leftGrad.addColorStop(0.5, "rgba(99, 102, 241, 0.015)"); // Indigo
      leftGrad.addColorStop(1, "rgba(2, 6, 23, 0)");
      ctx.fillStyle = leftGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw Right Nebula
      const rightGrad = ctx.createRadialGradient(
        nebulaRightX,
        height * 0.7,
        0,
        nebulaRightX,
        height * 0.7,
        Math.min(width, height) * 0.5
      );
      rightGrad.addColorStop(0, "rgba(167, 139, 250, 0.04)"); // Lavender
      rightGrad.addColorStop(0.6, "rgba(139, 92, 246, 0.01)");
      rightGrad.addColorStop(1, "rgba(2, 6, 23, 0)");
      ctx.fillStyle = rightGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. LIGHT SWEEP TIMING
      const now = Date.now();
      if (!sweepActive && now - lastSweepTime > sweepInterval) {
        sweepActive = true;
        sweepX = -500;
      }

      if (sweepActive) {
        sweepX += 2.5; // slow speed sweep
        const sweepGrad = ctx.createLinearGradient(sweepX, 0, sweepX + 350, height);
        sweepGrad.addColorStop(0, "rgba(139, 92, 246, 0)");
        sweepGrad.addColorStop(0.5, "rgba(168, 85, 247, 0.025)"); // extremely faint purple-white mist
        sweepGrad.addColorStop(1, "rgba(139, 92, 246, 0)");
        ctx.fillStyle = sweepGrad;
        ctx.fillRect(0, 0, width, height);

        if (sweepX > width + 200) {
          sweepActive = false;
          lastSweepTime = Date.now();
          sweepInterval = 25000 + Math.random() * 20000;
        }
      }

      // 3. SHOOTING STAR LOGIC
      if (!shootingStar.active && now - lastShootingStarTime > shootingStarInterval) {
        triggerShootingStar();
        lastShootingStarTime = Date.now();
        shootingStarInterval = 25000 + Math.random() * 25000;
      }

      if (shootingStar.active) {
        shootingStar.x += shootingStar.vx;
        shootingStar.y += shootingStar.vy;

        // Draw trail
        const starGrad = ctx.createLinearGradient(
          shootingStar.x,
          shootingStar.y,
          shootingStar.x - shootingStar.vx * 3,
          shootingStar.y - shootingStar.vy * 3
        );
        starGrad.addColorStop(0, `rgba(255, 255, 255, ${shootingStar.alpha})`);
        starGrad.addColorStop(0.4, `rgba(168, 85, 247, ${shootingStar.alpha * 0.6})`);
        starGrad.addColorStop(1, "rgba(139, 92, 246, 0)");

        ctx.strokeStyle = starGrad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(shootingStar.x - shootingStar.vx * 3, shootingStar.y - shootingStar.vy * 3);
        ctx.stroke();

        // Check if finished
        if (shootingStar.y > shootingStar.ty || shootingStar.x < shootingStar.tx) {
          shootingStar.active = false;
        }
      }

      // 4. FIREFLIES LOOPING & RENDERING (Responsive scroll offsets added)
      fireflies.forEach((p) => {
        // Slow drifting velocities
        p.vx += (Math.random() - 0.5) * 0.04;
        p.vy += (Math.random() - 0.5) * 0.04;
        
        // Speed cap
        const maxV = 0.35;
        if (p.vx > maxV) p.vx = maxV;
        if (p.vx < -maxV) p.vx = -maxV;
        if (p.vy > maxV) p.vy = maxV;
        if (p.vy < -maxV) p.vy = -maxV;

        p.x += p.vx;
        p.y += p.vy + scrollDeltaRef.current * 0.12; // React subtly to scrolling

        // Wrap around boundaries
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Smooth Opacity Pulsing
        p.pulsePhase += p.pulseSpeed;
        const currentPulse = (Math.sin(p.pulsePhase) + 1) / 2; // [0, 1]
        p.alpha += (p.targetAlpha - p.alpha) * 0.015;
        const finalAlpha = p.alpha * (0.5 + currentPulse * 0.5);

        // Draw depending on Depth Category (z)
        if (p.z < 0.8) {
          // Blurred background
          const ffGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2.5);
          ffGrad.addColorStop(0, `rgba(139, 92, 246, ${finalAlpha})`);
          ffGrad.addColorStop(0.3, `rgba(167, 139, 250, ${finalAlpha * 0.5})`);
          ffGrad.addColorStop(0.6, `rgba(99, 102, 241, ${finalAlpha * 0.25})`);
          ffGrad.addColorStop(1, "rgba(2, 6, 23, 0)");
          ctx.fillStyle = ffGrad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2);
          ctx.fill();

          // Bubble light core
          ctx.fillStyle = `rgba(255, 255, 255, ${finalAlpha * 0.5})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 0.45, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.z > 1.2) {
          // Foreground: Large, soft and translucent
          const ffGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2.2);
          ffGrad.addColorStop(0, `rgba(167, 139, 250, ${finalAlpha * 0.75})`);
          ffGrad.addColorStop(0.4, `rgba(139, 92, 246, ${finalAlpha * 0.3})`);
          ffGrad.addColorStop(1, "rgba(2, 6, 23, 0)");
          ctx.fillStyle = ffGrad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 2.2, 0, Math.PI * 2);
          ctx.fill();

          // Bubble light core
          ctx.fillStyle = `rgba(255, 255, 255, ${finalAlpha * 0.6})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 0.4, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Midground: Sharp and glowy
          ctx.shadowBlur = 8;
          ctx.shadowColor = "rgba(167, 139, 250, 0.9)";
          ctx.fillStyle = `rgba(255, 255, 255, ${finalAlpha * 0.95})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
          // Reset shadow
          ctx.shadowBlur = 0;
        }
      });

      // 5. PETALS LOGIC & RENDERING
      petals.forEach((p) => {
        p.swayPhase! += p.swaySpeed!;
        p.rotation! += p.rotationSpeed!;

        // Falling down + horizontal swaying + scroll reactions
        const sway = Math.sin(p.swayPhase!) * 0.25;
        p.x += p.vx + sway;
        p.y += p.vy + scrollDeltaRef.current * 0.18; // reacting slightly faster to scroll

        // Reset if offscreen or faded
        const outOfScreen = p.y > height + 20 || p.x < -20 || p.x > width + 20;
        let opacityMultiplier = 1;

        if (p.y > p.fadeY!) {
          // Fade out as it goes lower than threshold
          const fadeDistance = height - p.fadeY!;
          const traversed = p.y - p.fadeY!;
          opacityMultiplier = Math.max(0, 1 - traversed / fadeDistance);
        }

        if (outOfScreen || opacityMultiplier <= 0) {
          p.x = Math.random() * width;
          p.y = -20;
          p.vy = 0.35 + Math.random() * 0.45;
          p.vx = (Math.random() - 0.5) * 0.15;
          p.fadeY = height * (0.35 + Math.random() * 0.55);
          opacityMultiplier = 1;
        }

        // Draw translucent curved petals
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation!);
        
        const currentAlpha = p.alpha * opacityMultiplier;

        ctx.fillStyle = `rgba(167, 139, 250, ${currentAlpha * 0.4})`;
        ctx.strokeStyle = `rgba(139, 92, 246, ${currentAlpha * 0.75})`;
        ctx.lineWidth = 0.8;
        
        ctx.beginPath();
        // Drawing abstract curved petal shape using bezier curves
        ctx.moveTo(0, -p.r);
        ctx.bezierCurveTo(p.r * 1.5, -p.r * 1.5, p.r * 1.5, p.r * 1.5, 0, p.r);
        ctx.bezierCurveTo(-p.r * 0.6, p.r * 0.6, -p.r * 0.6, -p.r * 0.6, 0, -p.r);
        ctx.fill();
        ctx.stroke();
        
        ctx.restore();
      });

      // 6. SPARKLES LOGIC
      handleSparkles();
      sparkles.forEach((s, idx) => {
        s.life += 1;
        s.phase = (s.life / s.maxLife) * Math.PI; // Sine wave phase for size/alpha
        
        s.alpha = Math.sin(s.phase) * 1.0;
        s.size = Math.sin(s.phase) * s.maxSize;

        // Apply a glowing drop shadow to sparkles so they shine clearly
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(167, 139, 250, 0.85)";
        ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
        
        // Draw ✦ vector shape
        ctx.beginPath();
        ctx.moveTo(s.x, s.y - s.size);
        ctx.quadraticCurveTo(s.x, s.y, s.x + s.size, s.y);
        ctx.quadraticCurveTo(s.x, s.y, s.x, s.y + s.size);
        ctx.quadraticCurveTo(s.x, s.y, s.x - s.size, s.y);
        ctx.quadraticCurveTo(s.x, s.y, s.x, s.y - s.size);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0; // Reset

        // Remove dead sparkles
        if (s.life >= s.maxLife) {
          sparkles.splice(idx, 1);
        }
      });

      // 7. CURSOR IDLE MAGIC RENDERING
      if (cursorIdleParticleRef.current) {
        const cp = cursorIdleParticleRef.current;
        cp.life += 1;

        if (cp.life < 15) {
          // Pulse / Grow phase
          const glowGrad = ctx.createRadialGradient(cp.x, cp.y, 0, cp.x, cp.y, cp.r * 2);
          glowGrad.addColorStop(0, `rgba(255, 255, 255, ${cp.alpha})`);
          glowGrad.addColorStop(0.5, `rgba(167, 139, 250, ${cp.alpha * 0.6})`);
          glowGrad.addColorStop(1, "rgba(139, 92, 246, 0)");
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(cp.x, cp.y, cp.r * 2, 0, Math.PI * 2);
          ctx.fill();

          // Spawning sparks on trigger frame
          if (cp.life === 14) {
            for (let i = 0; i < 3; i++) {
              const angle = Math.random() * Math.PI * 2;
              const spd = 0.5 + Math.random() * 0.8;
              cp.children.push({
                x: cp.x,
                y: cp.y,
                vx: Math.cos(angle) * spd,
                vy: Math.sin(angle) * spd,
                alpha: 0.95,
                life: 0,
              });
            }
          }
        } else {
          // Decay / fade main point
          cp.alpha *= 0.9;
        }

        // Draw child sparks
        cp.children.forEach((c, cIdx) => {
          c.life += 1;
          c.x += c.vx;
          c.y += c.vy;
          c.alpha -= 0.035;

          ctx.fillStyle = `rgba(167, 139, 250, ${c.alpha})`;
          ctx.beginPath();
          ctx.arc(c.x, c.y, 1.2, 0, Math.PI * 2);
          ctx.fill();

          if (c.alpha <= 0) {
            cp.children.splice(cIdx, 1);
          }
        });

        if (cp.life >= cp.maxLife && cp.children.length === 0) {
          cursorIdleParticleRef.current = null;
        }
      }

      // 8. HERO ENTRANCE TEXT MAGIC PROCESSOR
      if (entranceStageRef.current === 1 || entranceStageRef.current === 2) {
        entranceTimeRef.current += 1;
        const time = entranceTimeRef.current;

        // Stage 1: Move towards text coordinates
        if (entranceStageRef.current === 1) {
          // Duration: 120 frames (~2s)
          // Cubic ease-out interpolation
          const progress = Math.min(time / 110, 1.0);
          const t = 1 - Math.pow(1 - progress, 3); // easeOutCubic

          textParticles.forEach((p) => {
            p.x = p.x + (p.baseX - p.x) * t * 0.15;
            p.y = p.y + (p.baseY - p.y) * t * 0.15;
            p.alpha += (p.targetAlpha - p.alpha) * 0.05;

            ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.95})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
          });

          if (time >= 150) {
            // After 2.5 seconds, transition to Stage 2 (Dispersing)
            entranceStageRef.current = 2;
            entranceTimeRef.current = 0;
            textParticles.forEach((p) => {
              // Give them random exit velocities
              const angle = Math.random() * Math.PI * 2;
              const spd = 0.2 + Math.random() * 0.5;
              p.vx = Math.cos(angle) * spd;
              p.vy = Math.sin(angle) * spd;
            });
          }
        }
        
        // Stage 2: Disperse and fade out
        if (entranceStageRef.current === 2) {
          const progress = Math.min(time / 60, 1.0); // 1s disperse
          
          textParticles.forEach((p) => {
            p.x += p.vx;
            p.y += p.vy;
            p.alpha = p.targetAlpha * (1.0 - progress);

            ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
          });

          if (time >= 60) {
            entranceStageRef.current = 3; // Entrance finished, stop processing
            textParticles = []; // clear memory
          }
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    // Resize Handler
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      isMobile = width < 768;
      isTablet = width >= 768 && width < 1024;
      particleCountScale = isMobile ? 0.4 : isTablet ? 0.7 : 1.0;
      
      // Re-init count limits to avoid scaling overhead
      fireflies.length = 0;
      petals.length = 0;
      initParticles();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      if (mouseIdleTimerRef.current) clearTimeout(mouseIdleTimerRef.current);
      clearTimeout(entranceTimeout);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-10 bg-transparent block"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
