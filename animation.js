/* =============================================
   PrepPro — animations.js
   All animation subsystems.
   Uses requestAnimationFrame exclusively.
   Zero dependencies.
   ============================================= */
'use strict';

/* ══════════════════════════════════════════════
   1. CURSOR GLOW
   ══════════════════════════════════════════════ */
const CursorGlow = (() => {
  let el, raf, mx = -200, my = -200, cx = -200, cy = -200;

  function init() {
    el = document.getElementById('cursor-glow');
    if (!el) return;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
    document.addEventListener('mouseenter', () => el.style.opacity = '1');
    document.addEventListener('mouseleave', () => el.style.opacity = '0');
    loop();
  }

  function loop() {
    // Smooth follow with lerp
    cx += (mx - cx) * 0.12;
    cy += (my - cy) * 0.12;
    if (el) el.style.transform = `translate(${cx - 200}px, ${cy - 200}px)`;
    raf = requestAnimationFrame(loop);
  }

  return { init };
})();

/* ══════════════════════════════════════════════
   2. MAGNETIC BUTTONS
   ══════════════════════════════════════════════ */
const MagneticButtons = {
  init() {
    // Apply to all .btn-primary & .btn-magnetic
    const apply = () => {
      document.querySelectorAll('.btn-primary, .magnetic').forEach(btn => {
        if (btn._magInit) return;
        btn._magInit = true;

        btn.addEventListener('mousemove', e => {
          const r   = btn.getBoundingClientRect();
          const dx  = e.clientX - (r.left + r.width  / 2);
          const dy  = e.clientY - (r.top  + r.height / 2);
          const mag = Math.min(0.35, 16 / Math.sqrt(r.width * r.height));
          btn.style.transform = `translate(${dx * mag}px, ${dy * mag}px) scale(1.04)`;
        }, { passive: true });

        btn.addEventListener('mouseleave', () => {
          btn.style.transition = 'transform 0.5s cubic-bezier(0.175,0.885,0.32,1.275)';
          btn.style.transform  = 'translate(0,0) scale(1)';
          setTimeout(() => btn.style.transition = '', 500);
        });
      });
    };
    apply();
    // Re-apply after dynamic renders
    return apply;
  },
};

/* ══════════════════════════════════════════════
   3. PARTICLES BACKGROUND
   ══════════════════════════════════════════════ */
const Particles = (() => {
  let canvas, ctx, W, H, pts = [], raf;
  const COUNT = 70;

  function mkPt() {
    return {
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r:  Math.random() * 1.5 + 0.5,
      a:  Math.random(),
    };
  }

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    pts.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,229,255,${p.a * 0.5})`;
      ctx.fill();
    });

    // Connect nearby particles
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        const d  = Math.sqrt(dx*dx + dy*dy);
        if (d < 100) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(0,229,255,${(1 - d/100) * 0.08})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    raf = requestAnimationFrame(draw);
  }

  function init() {
    canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    resize();
    pts = Array.from({ length: COUNT }, mkPt);
    window.addEventListener('resize', resize, { passive: true });
    draw();
  }

  return { init };
})();

/* ══════════════════════════════════════════════
   4. ANIMATED NUMBER COUNTER
   ══════════════════════════════════════════════ */
function animateNumber(el, from, to, duration = 800, suffix = '') {
  if (!el) return;
  const start = performance.now();
  const diff  = to - from;

  function step(now) {
    const t       = Math.min((now - start) / duration, 1);
    const eased   = 1 - Math.pow(1 - t, 3); // ease-out-cubic
    el.textContent = Math.round(from + diff * eased) + suffix;
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ══════════════════════════════════════════════
   5. PROGRESS BAR ANIMATION
   ══════════════════════════════════════════════ */
function animateProgressBar(fillEl, targetPct, duration = 900) {
  if (!fillEl) return;
  const start = performance.now();

  function step(now) {
    const t     = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    fillEl.style.width = (eased * targetPct) + '%';
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ══════════════════════════════════════════════
   6. PAGE TRANSITION OVERLAY
   ══════════════════════════════════════════════ */
const PageTransition = {
  el: null,

  init() {
    this.el = document.getElementById('page-transition');
  },

  async run(callback) {
    if (!this.el) { callback(); return; }
    // Slide in
    this.el.classList.add('active');
    await new Promise(r => setTimeout(r, 300));
    callback();
    await new Promise(r => setTimeout(r, 50));
    // Slide out
    this.el.classList.remove('active');
  },
};

/* ══════════════════════════════════════════════
   7. SCROLL-REVEAL (IntersectionObserver)
   ══════════════════════════════════════════════ */
const ScrollReveal = {
  observer: null,

  init() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          this.observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    this.observe();
  },

  observe() {
    document.querySelectorAll('.reveal').forEach(el => {
      this.observer && this.observer.observe(el);
    });
  },
};

/* ══════════════════════════════════════════════
   8. CARD TILT (3D hover)
   ══════════════════════════════════════════════ */
const CardTilt = {
  init() {
    const apply = () => {
      document.querySelectorAll('.tilt-card').forEach(card => {
        if (card._tiltInit) return;
        card._tiltInit = true;

        card.addEventListener('mousemove', e => {
          const r  = card.getBoundingClientRect();
          const cx = r.left + r.width  / 2;
          const cy = r.top  + r.height / 2;
          const rx = ((e.clientY - cy) / r.height) * -10;
          const ry = ((e.clientX - cx) / r.width)  *  10;
          card.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
        }, { passive: true });

        card.addEventListener('mouseleave', () => {
          card.style.transition = 'transform 0.5s ease';
          card.style.transform  = 'perspective(600px) rotateX(0) rotateY(0) scale(1)';
          setTimeout(() => card.style.transition = '', 500);
        });
      });
    };
    apply();
    return apply;
  },
};

/* ══════════════════════════════════════════════
   9. CONFETTI CELEBRATION
   ══════════════════════════════════════════════ */
const Confetti = (() => {
  const COLORS = ['#00e5ff','#7c3aed','#f472b6','#10b981','#f59e0b','#ff6b6b'];
  let particles = [], canvas, ctx, raf;

  function spawn(n = 120) {
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'confetti-canvas';
      Object.assign(canvas.style, {
        position:'fixed', inset:'0', pointerEvents:'none',
        zIndex:'99998', width:'100%', height:'100%',
      });
      document.body.appendChild(canvas);
      ctx = canvas.getContext('2d');
    }
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    particles = Array.from({ length: n }, () => ({
      x:   Math.random() * canvas.width,
      y:   -10,
      w:   Math.random() * 8 + 4,
      h:   Math.random() * 6 + 3,
      r:   Math.random() * Math.PI * 2,
      vx:  (Math.random() - 0.5) * 4,
      vy:  Math.random() * 3 + 2,
      vr:  (Math.random() - 0.5) * 0.2,
      c:   COLORS[Math.floor(Math.random() * COLORS.length)],
      a:   1,
    }));

    cancelAnimationFrame(raf);
    animate();

    setTimeout(cleanup, 3500);
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter(p => p.a > 0.05);

    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.r += p.vr; p.vy += 0.05;
      if (p.y > canvas.height * 0.8) p.a -= 0.02;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.r);
      ctx.globalAlpha = p.a;
      ctx.fillStyle   = p.c;
      ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
      ctx.restore();
    });

    if (particles.length) raf = requestAnimationFrame(animate);
    else cleanup();
  }

  function cleanup() {
    cancelAnimationFrame(raf);
    if (canvas) { canvas.remove(); canvas = null; }
  }

  return { spawn };
})();

/* ══════════════════════════════════════════════
   10. SKELETON LOADERS
   ══════════════════════════════════════════════ */
function showSkeleton(container, rows = 3) {
  container.innerHTML = Array.from({ length: rows }, () => `
    <div class="skeleton-card">
      <div class="skeleton-line w-60"></div>
      <div class="skeleton-line w-90"></div>
      <div class="skeleton-line w-40"></div>
    </div>
  `).join('');
}

/* ══════════════════════════════════════════════
   11. PARALLAX BACKGROUND
   ══════════════════════════════════════════════ */
const Parallax = {
  init() {
    const glows = document.querySelectorAll('.hero-glow');
    if (!glows.length) return;

    window.addEventListener('mousemove', e => {
      const px = (e.clientX / window.innerWidth  - 0.5) * 30;
      const py = (e.clientY / window.innerHeight - 0.5) * 30;
      glows.forEach((g, i) => {
        const dir = i % 2 === 0 ? 1 : -1;
        g.style.transform = `translate(${px * dir}px, ${py * dir}px)`;
      });
    }, { passive: true });
  },
};

/* ══════════════════════════════════════════════
   12. STREAK HEATMAP WAVE ANIMATION
   ══════════════════════════════════════════════ */
function animateStreakGrid() {
  const cells = document.querySelectorAll('.streak-day');
  cells.forEach((cell, i) => {
    cell.style.animationDelay = `${i * 20}ms`;
    cell.classList.add('streak-wave');
  });
}

/* ══════════════════════════════════════════════
   13. STAT CARD GLOW PULSE
   ══════════════════════════════════════════════ */
function pulseStatCard(cardEl) {
  if (!cardEl) return;
  cardEl.classList.add('stat-pulse');
  setTimeout(() => cardEl.classList.remove('stat-pulse'), 800);
}

/* ══════════════════════════════════════════════
   INIT ALL
   ══════════════════════════════════════════════ */
function initAnimations() {
  CursorGlow.init();
  Particles.init();
  ScrollReveal.init();
  CardTilt.init();
  MagneticButtons.init();
  PageTransition.init();
  Parallax.init();
}