/* =============================================
   PrepPro — style.css
   Design System: Cyberpunk Glassmorphism v3
   Every pixel is intentional.
   ============================================= */

@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&family=Syne:wght@400;600;700;800&display=swap');

/* ══════════════════════════════════════════════
   CSS CUSTOM PROPERTIES
   ══════════════════════════════════════════════ */
:root {
  /* ── Dark Theme ── */
  --bg-primary:    #050810;
  --bg-secondary:  #080d1a;
  --bg-tertiary:   #0d1426;
  --bg-card:       rgba(255,255,255,0.035);
  --bg-card-hover: rgba(255,255,255,0.065);
  --bg-card-deep:  rgba(255,255,255,0.015);

  --accent-cyan:   #00e5ff;
  --accent-purple: #7c3aed;
  --accent-pink:   #f472b6;
  --accent-green:  #10b981;
  --accent-orange: #f59e0b;
  --accent-red:    #ef4444;

  --text-primary:   #eef2ff;
  --text-secondary: #8892b0;
  --text-muted:     #4a5568;

  --border-glass:   rgba(255,255,255,0.07);
  --border-glow:    rgba(0,229,255,0.25);

  --glow-cyan:   0 0 40px rgba(0,229,255,0.25),  0 0 80px rgba(0,229,255,0.08);
  --glow-purple: 0 0 40px rgba(124,58,237,0.3),  0 0 80px rgba(124,58,237,0.1);
  --glow-green:  0 0 20px rgba(16,185,129,0.3);
  --glow-pink:   0 0 20px rgba(244,114,182,0.25);

  --sidebar-width:  260px;
  --topbar-height:  64px;

  --radius-sm:  8px;
  --radius-md:  14px;
  --radius-lg:  20px;
  --radius-xl:  28px;

  --ease-spring:  cubic-bezier(0.34,1.56,0.64,1);
  --ease-out:     cubic-bezier(0.16,1,0.3,1);
  --ease-in-out:  cubic-bezier(0.4,0,0.2,1);

  --transition:      all 0.3s var(--ease-in-out);
  --transition-fast: all 0.15s ease;
  --transition-slow: all 0.6s var(--ease-out);
}

/* ── Light Mode ── */
body.light-mode {
  --bg-primary:    #f0f4ff;
  --bg-secondary:  #e8edf8;
  --bg-tertiary:   #dde4f5;
  --bg-card:       rgba(255,255,255,0.7);
  --bg-card-hover: rgba(255,255,255,0.92);
  --bg-card-deep:  rgba(255,255,255,0.5);
  --text-primary:  #0f172a;
  --text-secondary:#475569;
  --text-muted:    #94a3b8;
  --border-glass:  rgba(0,0,0,0.07);
  --border-glow:   rgba(124,58,237,0.25);
}

/* ══════════════════════════════════════════════
   RESET & BASE
   ══════════════════════════════════════════════ */
*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
html { scroll-behavior:smooth; }

body {
  font-family: 'Outfit', sans-serif;
  background:   var(--bg-primary);
  color:        var(--text-primary);
  overflow-x:   hidden;
  min-height:   100vh;
  transition:   background 0.5s ease, color 0.5s ease;
  letter-spacing: 0.01em;
}

::-webkit-scrollbar { width:5px; height:5px; }
::-webkit-scrollbar-track  { background:var(--bg-secondary); }
::-webkit-scrollbar-thumb  { background:var(--accent-cyan); border-radius:99px; opacity:0.4; }

/* ══════════════════════════════════════════════
   CURSOR GLOW
   ══════════════════════════════════════════════ */
#cursor-glow {
  width:  400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%);
  position: fixed;
  top: 0; left: 0;
  pointer-events: none;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.3s ease;
  will-change: transform;
}

/* ══════════════════════════════════════════════
   PAGE TRANSITION OVERLAY
   ══════════════════════════════════════════════ */
#page-transition {
  position: fixed; inset: 0;
  background: linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary));
  z-index: 9990;
  transform: translateX(-100%);
  transition: transform 0.28s var(--ease-in-out);
  pointer-events: none;
}
#page-transition.active {
  transform: translateX(0);
}

/* ══════════════════════════════════════════════
   LOADING SCREEN
   ══════════════════════════════════════════════ */
#loading-screen {
  position: fixed; inset:0;
  background: var(--bg-primary);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 28px;
}

.loader-logo {
  font-family: 'Syne', sans-serif;
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple), var(--accent-pink));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200%;
  animation: gradShift 2s ease infinite, pulse 1.5s ease-in-out infinite;
}
.loader-tagline {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.15em;
  animation: pulse 2s ease infinite 0.5s;
}
.loader-bar {
  width: 280px; height: 2px;
  background: var(--bg-tertiary);
  border-radius: 99px; overflow: hidden;
}
.loader-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-cyan), var(--accent-purple), var(--accent-pink));
  border-radius: 99px;
  animation: loadFill 2.2s var(--ease-out) forwards;
}

@keyframes loadFill   { 0%{width:0} 100%{width:100%} }
@keyframes pulse      { 0%,100%{opacity:1} 50%{opacity:0.5} }
@keyframes gradShift  { 0%,100%{background-position:0%} 50%{background-position:100%} }

/* ══════════════════════════════════════════════
   PARTICLES CANVAS
   ══════════════════════════════════════════════ */
#particles-canvas {
  position: fixed; inset:0;
  pointer-events: none;
  z-index: 0;
  opacity: 0.35;
}

/* ══════════════════════════════════════════════
   LANDING PAGE
   ══════════════════════════════════════════════ */
#landing-page { min-height:100vh; position:relative; overflow:hidden; }

.landing-nav {
  position: fixed; top:0; left:0; right:0;
  height: 68px;
  display: flex; align-items: center;
  padding: 0 40px; gap: 32px;
  background: rgba(5,8,16,0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border-glass);
  z-index: 100;
}
.nav-logo {
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: 1.4rem;
  background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.nav-links { display:flex; gap:28px; list-style:none; margin-left:auto; }
.nav-links a { color:var(--text-secondary); text-decoration:none; font-size:0.9rem; font-weight:500; transition:color 0.2s; }
.nav-links a:hover { color:var(--accent-cyan); }
.nav-cta { display:flex; gap:10px; }

/* Hero */
.hero-section {
  min-height:100vh;
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  text-align:center; padding:120px 24px 80px;
  position:relative; z-index:1;
}
.hero-glow {
  position:absolute; border-radius:50%; filter:blur(80px); pointer-events:none;
  transition: transform 0.8s ease;
}
.hero-glow-1 { width:600px; height:600px; background:rgba(0,229,255,0.06); top:-100px; left:-100px; }
.hero-glow-2 { width:500px; height:500px; background:rgba(124,58,237,0.08); bottom:-100px; right:-100px; }

.hero-badge {
  display:inline-flex; align-items:center; gap:8px;
  background: var(--bg-card);
  border: 1px solid var(--border-glass);
  border-radius: 99px;
  padding: 6px 16px;
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-bottom: 32px;
  backdrop-filter: blur(12px);
}
.dot { width:7px; height:7px; border-radius:50%; background:var(--accent-green); box-shadow:0 0 8px var(--accent-green); animation: pulse 1.5s ease infinite; }

.hero-title {
  font-family:'Syne',sans-serif;
  font-size:clamp(2.8rem,6vw,5.5rem);
  font-weight:800;
  line-height:1.05;
  letter-spacing:-0.04em;
  margin-bottom:24px;
}
.gradient-text {
  background: linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-purple) 50%, var(--accent-pink) 100%);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent;
  background-size:200%; animation:gradShift 4s ease infinite;
}
.hero-subtitle {
  max-width:560px;
  font-size:1.05rem;
  color:var(--text-secondary);
  line-height:1.7;
  margin-bottom:40px;
}
.hero-actions  { display:flex; gap:16px; flex-wrap:wrap; justify-content:center; margin-bottom:60px; }
.hero-stats    { display:flex; gap:40px; flex-wrap:wrap; justify-content:center; }
.stat-item     { text-align:center; }
.stat-number   { display:block; font-family:'Syne',sans-serif; font-size:2rem; font-weight:800; color:var(--accent-cyan); }
.stat-label    { font-size:0.8rem; color:var(--text-muted); font-weight:500; }

/* Features Section */
.features-section { padding:80px 40px; max-width:1100px; margin:0 auto; position:relative; z-index:1; }
.section-header { text-align:center; margin-bottom:48px; }
.section-label {
  display:inline-block;
  font-size:0.75rem; font-weight:700; letter-spacing:0.15em; text-transform:uppercase;
  color:var(--accent-cyan); margin-bottom:12px;
}
.section-title { font-family:'Syne',sans-serif; font-size:2.2rem; font-weight:800; line-height:1.2; letter-spacing:-0.03em; }
.features-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(300px,1fr)); gap:20px; }

/* ══════════════════════════════════════════════
   BUTTONS
   ══════════════════════════════════════════════ */
.btn {
  display:inline-flex; align-items:center; gap:8px;
  border:none; cursor:pointer; border-radius:var(--radius-md);
  font-family:'Outfit',sans-serif; font-weight:600; font-size:0.88rem;
  padding:10px 20px;
  transition: var(--transition);
  position:relative; overflow:hidden;
  will-change: transform;
}
.btn::after {
  content:'';
  position:absolute; inset:0;
  background:rgba(255,255,255,0.06);
  opacity:0; transition:opacity 0.2s;
}
.btn:hover::after { opacity:1; }

.btn-primary {
  background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple));
  color: #fff;
  box-shadow: 0 4px 20px rgba(0,229,255,0.25);
}
.btn-primary:hover  { box-shadow:0 8px 32px rgba(0,229,255,0.4); }
.btn-primary:active { transform:scale(0.97)!important; }

.btn-secondary {
  background: var(--bg-card);
  color: var(--text-primary);
  border: 1px solid var(--border-glass);
}
.btn-secondary:hover { background:var(--bg-card-hover); border-color:var(--border-glow); }

.btn-ghost {
  background:transparent;
  color:var(--text-secondary);
  border:1px solid var(--border-glass);
}
.btn-ghost:hover { color:var(--text-primary); border-color:var(--border-glow); }

.btn-sm { padding:7px 14px; font-size:0.8rem; border-radius:var(--radius-sm); }

/* ══════════════════════════════════════════════
   GLASS CARDS
   ══════════════════════════════════════════════ */
.glass-card {
  background:   var(--bg-card);
  border:       1px solid var(--border-glass);
  border-radius:var(--radius-lg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 24px;
  transition:   var(--transition);
  position:relative;
  overflow:hidden;
}
.glass-card::before {
  content:'';
  position:absolute; top:0; left:0; right:0; height:1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
}
.glass-card:hover {
  background: var(--bg-card-hover);
  border-color: rgba(0,229,255,0.15);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.3), 0 0 1px rgba(0,229,255,0.1);
}

/* Feature cards */
.feature-card { cursor:default; }
.feature-icon { font-size:2rem; margin-bottom:16px; }
.feature-card h3 { font-family:'Syne',sans-serif; font-weight:700; margin-bottom:10px; font-size:1.05rem; }
.feature-card p  { font-size:0.88rem; color:var(--text-secondary); line-height:1.6; }

/* ══════════════════════════════════════════════
   MODAL / ONBOARDING
   ══════════════════════════════════════════════ */
.modal-overlay {
  position:fixed; inset:0;
  background:rgba(0,0,0,0.75);
  backdrop-filter:blur(8px);
  z-index:9000;
  display:flex; align-items:center; justify-content:center;
  padding:20px;
  animation:fadeIn 0.25s ease;
}
.modal {
  background:var(--bg-secondary);
  border:1px solid var(--border-glass);
  border-radius:var(--radius-xl);
  padding:40px;
  width:100%; max-width:480px;
  text-align:center;
  position:relative; overflow:hidden;
  animation:slideUp 0.3s var(--ease-spring);
}
.modal::before {
  content:''; position:absolute; top:0; left:-100%; right:-100%; height:1px;
  background:linear-gradient(90deg,transparent,rgba(0,229,255,0.5),transparent);
}
.modal-icon  { font-size:3rem; display:block; margin-bottom:16px; }
.modal h2    { font-family:'Syne',sans-serif; font-size:1.6rem; font-weight:800; margin-bottom:8px; letter-spacing:-0.02em; }
.modal p     { color:var(--text-secondary); margin-bottom:24px; line-height:1.6; }

/* Form */
.form-group  { margin-bottom:16px; }
.form-label  { display:block; font-size:0.82rem; color:var(--text-muted); margin-bottom:6px; font-weight:600; letter-spacing:0.05em; text-transform:uppercase; }
.form-input  {
  width:100%; padding:11px 14px;
  background:var(--bg-tertiary); border:1px solid var(--border-glass);
  border-radius:var(--radius-md); color:var(--text-primary);
  font-family:'Outfit',sans-serif; font-size:0.92rem;
  transition:var(--transition);
}
.form-input:focus { outline:none; border-color:var(--accent-cyan); box-shadow:0 0 0 3px rgba(0,229,255,0.1); }
.form-textarea { width:100%; padding:11px 14px; resize:vertical; min-height:80px;
  background:var(--bg-tertiary); border:1px solid var(--border-glass); border-radius:var(--radius-md);
  color:var(--text-primary); font-family:'Outfit',sans-serif; font-size:0.88rem; line-height:1.5;
}
.form-textarea:focus { outline:none; border-color:var(--accent-cyan); box-shadow:0 0 0 3px rgba(0,229,255,0.1); }
.form-row { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
.form-section-title { font-family:'Syne',sans-serif; font-weight:700; font-size:0.95rem; margin-bottom:14px; }

/* ══════════════════════════════════════════════
   APP SHELL (sidebar + topbar + content)
   ══════════════════════════════════════════════ */
#app {
  display:flex; height:100vh; overflow:hidden;
  opacity:0; transition:opacity 0.5s ease;
}

/* ── Sidebar ── */
.sidebar {
  width:var(--sidebar-width);
  background:rgba(8,13,26,0.95);
  backdrop-filter:blur(24px);
  border-right:1px solid var(--border-glass);
  display:flex; flex-direction:column;
  flex-shrink:0;
  z-index:200;
  overflow:hidden;
  transition:transform 0.3s var(--ease-out);
  position:relative;
}
.sidebar::before {
  content:''; position:absolute; top:0; bottom:0; right:0; width:1px;
  background:linear-gradient(180deg, transparent, rgba(0,229,255,0.15), transparent);
}

.sidebar-logo {
  display:flex; align-items:center; gap:12px;
  padding:20px 24px 16px;
  border-bottom:1px solid var(--border-glass);
}
.sidebar-logo-icon {
  width:34px; height:34px; border-radius:10px;
  background:linear-gradient(135deg,var(--accent-cyan),var(--accent-purple));
  display:flex; align-items:center; justify-content:center;
  font-weight:800; font-size:1rem; color:#fff;
}
.sidebar-logo-text { font-family:'Syne',sans-serif; font-weight:800; font-size:1.15rem; letter-spacing:-0.01em; }

.sidebar-user {
  display:flex; align-items:center; gap:12px;
  padding:16px 24px;
  border-bottom:1px solid var(--border-glass);
}
.user-avatar {
  width:38px; height:38px; border-radius:12px;
  background:linear-gradient(135deg,var(--accent-purple),var(--accent-pink));
  display:flex; align-items:center; justify-content:center;
  font-weight:700; font-size:0.95rem; color:#fff; flex-shrink:0;
}
.user-name   { font-weight:600; font-size:0.88rem; }
.user-streak { font-size:0.75rem; color:var(--text-muted); }

.sidebar-nav   { flex:1; overflow-y:auto; padding:12px 0; scrollbar-width:none; }
.sidebar-nav::-webkit-scrollbar { display:none; }
.nav-section   { font-size:0.68rem; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:var(--text-muted); padding:12px 24px 6px; }

.sidebar-nav-item {
  display:flex; align-items:center; gap:12px;
  padding:10px 24px;
  cursor:pointer; border-radius:0;
  color:var(--text-secondary);
  font-size:0.88rem; font-weight:500;
  transition:var(--transition);
  position:relative;
  margin:1px 0;
}
.sidebar-nav-item:hover {
  color:var(--text-primary);
  background:var(--bg-card);
}
.sidebar-nav-item.active {
  color:var(--accent-cyan);
  background:rgba(0,229,255,0.06);
  font-weight:600;
}
.sidebar-nav-item.active::before {
  content:''; position:absolute; left:0; top:0; bottom:0; width:2.5px;
  background:var(--accent-cyan); border-radius:0 2px 2px 0;
  box-shadow:0 0 12px var(--accent-cyan);
}
.nav-icon { font-size:1.1rem; flex-shrink:0; }
.nav-badge {
  margin-left:auto;
  min-width:20px; height:20px;
  background:var(--accent-cyan);
  color:var(--bg-primary);
  border-radius:99px;
  font-size:0.68rem; font-weight:700;
  display:flex; align-items:center; justify-content:center;
  padding:0 6px;
}

.sidebar-footer {
  padding:16px 24px;
  border-top:1px solid var(--border-glass);
  display:flex; gap:8px;
}

/* ── Topbar ── */
.topbar {
  position:sticky; top:0; z-index:100;
  height:var(--topbar-height);
  background:rgba(8,13,26,0.9);
  backdrop-filter:blur(24px);
  border-bottom:1px solid var(--border-glass);
  display:flex; align-items:center; gap:16px;
  padding:0 28px;
}
.hamburger { display:none; flex-direction:column; gap:5px; background:none; border:none; cursor:pointer; padding:8px; border-radius:8px; }
.hamburger span { display:block; width:20px; height:2px; background:var(--text-secondary); border-radius:2px; transition:var(--transition); }

.topbar-search {
  flex:1; position:relative; max-width:480px;
}
.search-icon { position:absolute; left:12px; top:50%; transform:translateY(-50%); font-size:0.9rem; pointer-events:none; }
.search-input {
  width:100%; padding:9px 16px 9px 38px;
  background:var(--bg-card);
  border:1px solid var(--border-glass);
  border-radius:var(--radius-md);
  color:var(--text-primary);
  font-family:'Outfit',sans-serif; font-size:0.88rem;
  transition:var(--transition);
}
.search-input:focus { outline:none; border-color:var(--border-glow); background:var(--bg-card-hover); box-shadow:0 0 0 3px rgba(0,229,255,0.08); }
.search-input::placeholder { color:var(--text-muted); }

.search-results {
  position:absolute; top:calc(100% + 6px); left:0; right:0;
  background:var(--bg-secondary);
  border:1px solid var(--border-glass);
  border-radius:var(--radius-md);
  max-height:320px; overflow-y:auto;
  z-index:500;
  display:none; flex-direction:column;
  box-shadow:0 16px 48px rgba(0,0,0,0.4);
}
.search-results.visible { display:flex; animation:fadeIn 0.2s ease; }
.search-result-item {
  display:flex; align-items:center; gap:12px;
  padding:12px 16px; cursor:pointer;
  font-size:0.88rem; transition:background 0.15s;
  border-bottom:1px solid var(--border-glass);
}
.search-result-item:last-child { border-bottom:none; }
.search-result-item:hover { background:var(--bg-card); }
.sr-title { font-weight:600; }
.sr-sub   { font-size:0.75rem; color:var(--text-muted); }

.topbar-actions { display:flex; align-items:center; gap:12px; margin-left:auto; }
.topbar-date    { font-size:0.8rem; color:var(--text-muted); font-family:'JetBrains Mono',monospace; }
.theme-toggle   { background:var(--bg-card); border:1px solid var(--border-glass); border-radius:var(--radius-sm); padding:7px 10px; cursor:pointer; font-size:1rem; transition:var(--transition); }
.theme-toggle:hover { border-color:var(--border-glow); }
.topbar-page-title { display:none; font-weight:700; font-size:0.95rem; }

/* ── Main Content ── */
.main-content {
  flex:1; overflow-y:auto; overflow-x:hidden;
  position:relative; z-index:1;
  display:flex; flex-direction:column;
}
.main-content > .section-page.active { flex:1; }

.section-page {
  display:none;
  padding:32px 32px 80px;
  min-height:100%;
  animation:sectionIn 0.35s var(--ease-out);
}
.section-page.active { display:block; }

@keyframes sectionIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }

/* ══════════════════════════════════════════════
   DASHBOARD
   ══════════════════════════════════════════════ */
.dashboard-greeting { margin-bottom:28px; }
.greeting-text {
  font-family:'Syne',sans-serif; font-size:clamp(1.5rem,3vw,2.2rem);
  font-weight:800; letter-spacing:-0.03em; margin-bottom:6px;
}
#greeting-name {
  background:linear-gradient(135deg,var(--accent-cyan),var(--accent-purple));
  -webkit-background-clip:text; -webkit-text-fill-color:transparent;
}
.greeting-sub { color:var(--text-secondary); font-size:0.95rem; }

/* Stat grid */
.dashboard-grid {
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(180px,1fr));
  gap:16px; margin-bottom:24px;
}
.stat-card {
  position:relative; overflow:hidden; text-align:center;
  padding:28px 20px; cursor:default;
  transition:var(--transition);
}
.stat-card:hover { transform:translateY(-4px); }
.stat-card-icon  { font-size:1.8rem; display:block; margin-bottom:12px; }
.stat-card-value {
  font-family:'Syne',sans-serif; font-size:2.4rem;
  font-weight:800; display:block; letter-spacing:-0.04em;
  background:linear-gradient(135deg,var(--text-primary),var(--text-secondary));
  -webkit-background-clip:text; -webkit-text-fill-color:transparent;
  transition:var(--transition);
}
.stat-card-label { font-size:0.78rem; color:var(--text-muted); font-weight:500; margin-top:4px; display:block; }
.stat-card-glow  {
  position:absolute; width:120px; height:120px; border-radius:50%;
  bottom:-40px; right:-40px; filter:blur(40px); opacity:0.15;
  transition:opacity 0.4s ease;
}
.stat-card:hover .stat-card-glow { opacity:0.3; }

.stat-pulse { animation:statBounce 0.6s var(--ease-spring); }
@keyframes statBounce { 0%,100%{transform:scale(1)} 40%{transform:scale(1.06)} }

/* Dashboard bottom grid */
.dashboard-bottom {
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:20px;
}

/* Progress bars */
.progress-list  { display:flex; flex-direction:column; gap:16px; }
.progress-item  { }
.progress-header { display:flex; justify-content:space-between; align-items:center; font-size:0.85rem; margin-bottom:8px; font-weight:500; }
.progress-pct    { color:var(--accent-cyan); font-weight:700; font-family:'JetBrains Mono',monospace; }
.progress-bar    { height:6px; background:rgba(255,255,255,0.06); border-radius:99px; overflow:hidden; }
.progress-fill   {
  height:100%; border-radius:99px; width:0;
  background:linear-gradient(90deg,var(--accent-cyan),var(--accent-purple));
  position:relative; overflow:hidden;
  transition:width 0.9s var(--ease-out);
}
.progress-fill::after {
  content:''; position:absolute; inset:0;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent);
  animation:shimmer 2.5s ease infinite;
}
@keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }

/* Overall ring */
.overall-ring-wrap { display:flex; align-items:center; gap:20px; margin-top:24px; padding-top:24px; border-top:1px solid var(--border-glass); }
.overall-ring svg  { transform:rotate(-90deg); }
.overall-ring-bg   { fill:none; stroke:rgba(255,255,255,0.06); stroke-width:8; }
.overall-ring-fill {
  fill:none;
  stroke:url(#ringGrad);
  stroke-width:8;
  stroke-linecap:round;
  stroke-dasharray: 339.3; /* 2π×54 */
  stroke-dashoffset: 339.3;
  transition:stroke-dashoffset 1.2s var(--ease-out);
}
.ring-label { font-family:'Syne',sans-serif; font-weight:700; }
.ring-label span { font-size:0.8rem; color:var(--text-muted); display:block; }
#overall-pct { font-size:2rem; font-weight:800; background:linear-gradient(135deg,var(--accent-cyan),var(--accent-purple)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }

/* Streak heatmap */
.streak-grid {
  display:grid; grid-template-columns:repeat(8,1fr); gap:4px; margin-top:8px;
}
.streak-day {
  aspect-ratio:1; border-radius:4px;
  background:rgba(255,255,255,0.04);
  border:1px solid var(--border-glass);
  transition:transform 0.2s var(--ease-spring), background 0.2s;
  cursor:default;
}
.streak-day.active {
  background:var(--accent-cyan);
  box-shadow:0 0 8px rgba(0,229,255,0.35);
  border-color:rgba(0,229,255,0.4);
}
.streak-day.today { border-color:var(--accent-purple); box-shadow:0 0 8px rgba(124,58,237,0.4); }
.streak-day:hover { transform:scale(1.3); }
.streak-wave { animation:waveIn 0.5s var(--ease-spring) both; }
@keyframes waveIn { from{opacity:0;transform:scale(0.5)} to{opacity:1;transform:scale(1)} }

/* Activity feed */
.activity-item {
  display:flex; align-items:center; gap:12px;
  padding:10px 0; border-bottom:1px solid var(--border-glass);
  font-size:0.85rem;
}
.activity-item:last-child { border-bottom:none; }
.activity-dot      { width:8px; height:8px; border-radius:50%; flex-shrink:0; }
.activity-content  { flex:1; display:flex; align-items:center; gap:8px; }
.activity-icon-badge { font-size:1.1rem; }
.activity-text     { color:var(--text-secondary); }
.activity-time     { font-size:0.72rem; color:var(--text-muted); font-family:'JetBrains Mono',monospace; white-space:nowrap; }

/* Recommendations */
.rec-item {
  display:flex; align-items:center; gap:14px;
  padding:14px 16px; border-radius:var(--radius-md);
  background:var(--bg-card); border:1px solid var(--border-glass);
  cursor:pointer; transition:var(--transition); margin-bottom:10px;
}
.rec-item:hover { background:var(--bg-card-hover); border-color:var(--border-glow); transform:translateX(4px); }
.rec-icon  { font-size:1.5rem; flex-shrink:0; }
.rec-body  { flex:1; }
.rec-label { font-size:0.72rem; color:var(--text-muted); font-weight:600; letter-spacing:0.08em; text-transform:uppercase; }
.rec-text  { font-weight:600; font-size:0.88rem; margin-top:2px; }
.rec-badge {
  background:rgba(0,229,255,0.12); color:var(--accent-cyan);
  border-radius:99px; padding:3px 10px; font-size:0.72rem; font-weight:700;
  white-space:nowrap; border:1px solid rgba(0,229,255,0.2);
}
.rec-empty { color:var(--text-muted); font-size:0.85rem; text-align:center; padding:16px; }

/* ══════════════════════════════════════════════
   DSA SECTION
   ══════════════════════════════════════════════ */
.page-heading { margin-bottom:28px; }
.page-heading h2 { font-family:'Syne',sans-serif; font-size:1.8rem; font-weight:800; letter-spacing:-0.03em; }
.page-heading p  { color:var(--text-secondary); margin-top:6px; font-size:0.92rem; }

.dsa-header { display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:20px; }
.dsa-progress-wrap { display:flex; align-items:center; gap:12px; flex:1; max-width:360px; }
.dsa-progress-bar  { flex:1; height:6px; background:rgba(255,255,255,0.06); border-radius:99px; overflow:hidden; }
.dsa-progress-fill { height:100%; background:linear-gradient(90deg,var(--accent-cyan),var(--accent-purple)); border-radius:99px; width:0; transition:width 0.9s var(--ease-out); }

.topic-tabs { display:flex; gap:8px; flex-wrap:wrap; margin-bottom:24px; }
.topic-tab  {
  background:var(--bg-card); border:1px solid var(--border-glass);
  border-radius:var(--radius-sm); padding:7px 16px;
  cursor:pointer; font-size:0.82rem; font-weight:600;
  color:var(--text-secondary); transition:var(--transition);
  font-family:'Outfit',sans-serif;
}
.topic-tab:hover  { color:var(--text-primary); border-color:var(--border-glow); }
.topic-tab.active {
  background:rgba(0,229,255,0.1); border-color:rgba(0,229,255,0.35);
  color:var(--accent-cyan); box-shadow:0 0 12px rgba(0,229,255,0.12);
}

.video-grid {
  display:grid; grid-template-columns:repeat(auto-fill,minmax(300px,1fr)); gap:20px;
}
.video-card { padding:0!important; }
.video-card.completed { border-color:rgba(16,185,129,0.3); }
.video-thumbnail { position:relative; border-radius:var(--radius-md) var(--radius-md) 0 0; overflow:hidden; background:#000; }
.video-thumbnail iframe { width:100%; aspect-ratio:16/9; display:block; border:none; }
.video-completed-overlay {
  position:absolute; inset:0;
  background:rgba(16,185,129,0.15);
  display:flex; align-items:center; justify-content:center;
  font-size:2.5rem; opacity:0; transition:opacity 0.25s;
}
.video-card.completed .video-completed-overlay { opacity:1; }

.video-meta    { display:flex; align-items:center; gap:8px; padding:14px 16px 8px; flex-wrap:wrap; }
.video-duration { font-size:0.75rem; color:var(--text-muted); font-family:'JetBrains Mono',monospace; margin-left:auto; }
.video-title   { padding:0 16px; font-weight:700; font-size:0.92rem; line-height:1.4; margin-bottom:8px; }
.video-channel { padding:0 16px; font-size:0.75rem; color:var(--text-muted); margin-bottom:12px; }
.video-difficulty { font-size:0.7rem; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; padding:3px 8px; border-radius:99px; }
.difficulty-beginner    { background:rgba(16,185,129,0.15); color:var(--accent-green); }
.difficulty-intermediate{ background:rgba(245,158,11,0.15); color:var(--accent-orange); }
.difficulty-advanced    { background:rgba(239,68,68,0.15);  color:var(--accent-red); }

.bookmark-btn    { background:none; border:none; cursor:pointer; font-size:1.1rem; padding:4px; border-radius:4px; transition:transform 0.2s; }
.bookmark-btn:hover    { transform:scale(1.2); }
.bookmark-btn.bookmarked { filter:drop-shadow(0 0 4px #f59e0b); }

.mark-complete-btn {
  display:block; width:calc(100% - 32px); margin:0 16px 16px;
  padding:10px; border:1px solid var(--border-glass);
  background:var(--bg-tertiary); color:var(--text-secondary);
  border-radius:var(--radius-sm); cursor:pointer;
  font-family:'Outfit',sans-serif; font-size:0.85rem; font-weight:600;
  transition:var(--transition);
}
.mark-complete-btn:hover { background:rgba(16,185,129,0.1); border-color:var(--accent-green); color:var(--accent-green); }
.video-card.completed .mark-complete-btn { background:rgba(16,185,129,0.1); border-color:var(--accent-green); color:var(--accent-green); }

/* ══════════════════════════════════════════════
   QUIZ
   ══════════════════════════════════════════════ */
.quiz-category-grid {
  display:grid; grid-template-columns:repeat(auto-fill,minmax(220px,1fr)); gap:16px;
}
.quiz-cat-card { text-align:center; cursor:pointer; padding:32px 24px!important; }
.quiz-cat-card:hover { border-color:var(--accent-cyan); }
.quiz-cat-icon  { font-size:2.5rem; display:block; margin-bottom:12px; }
.quiz-cat-name  { font-family:'Syne',sans-serif; font-weight:700; font-size:1.05rem; margin-bottom:4px; }
.quiz-cat-count { font-size:0.8rem; color:var(--text-muted); }

.quiz-score-pill {
  display:inline-block; margin-top:12px;
  padding:4px 12px; border-radius:99px; font-size:0.78rem; font-weight:700;
}
.pill-green  { background:rgba(16,185,129,0.15); color:var(--accent-green); }
.pill-yellow { background:rgba(245,158,11,0.15);  color:var(--accent-orange); }
.pill-red    { background:rgba(239,68,68,0.15);   color:var(--accent-red); }
.pill-muted  { background:rgba(255,255,255,0.05); color:var(--text-muted); }

.quiz-container { max-width:720px; margin:0 auto; }
.quiz-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; }
.quiz-cat-label { font-size:0.8rem; color:var(--text-muted); margin-bottom:2px; }
.quiz-q-num     { font-weight:700; }
.quiz-timer {
  font-family:'JetBrains Mono',monospace; font-size:1.3rem; font-weight:700;
  color:var(--accent-cyan); padding:8px 16px;
  background:rgba(0,229,255,0.08); border-radius:var(--radius-sm);
  transition:color 0.3s, background 0.3s;
}
.quiz-timer.timer-warning { color:var(--accent-orange); background:rgba(245,158,11,0.1); }
.quiz-timer.timer-danger  { color:var(--accent-red);    background:rgba(239,68,68,0.1); animation:pulse 0.8s ease infinite; }
.quiz-timer.timer-wrong   { animation:shake 0.4s ease; }
@keyframes shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-6px)} 40%,80%{transform:translateX(6px)} }

.quiz-progress-bar { height:3px; background:rgba(255,255,255,0.06); border-radius:99px; overflow:hidden; margin-bottom:20px; }
.quiz-progress-fill { height:100%; background:linear-gradient(90deg,var(--accent-cyan),var(--accent-purple)); transition:width 0.5s ease; }

.question-card  { margin-bottom:16px; }
.question-number { font-size:0.75rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:var(--text-muted); margin-bottom:10px; }
.question-text  { font-size:1.05rem; font-weight:600; line-height:1.6; margin-bottom:20px; }

.options-list   { display:flex; flex-direction:column; gap:10px; }
.option-item {
  display:flex; align-items:center; gap:14px;
  padding:14px 18px; border-radius:var(--radius-md);
  border:1px solid var(--border-glass);
  cursor:pointer; transition:var(--transition);
  font-size:0.92rem;
}
.option-item:hover { background:var(--bg-card-hover); border-color:var(--border-glow); }
.option-label {
  width:28px; height:28px; border-radius:8px; flex-shrink:0;
  background:rgba(255,255,255,0.06); border:1px solid var(--border-glass);
  display:flex; align-items:center; justify-content:center;
  font-weight:700; font-size:0.8rem; font-family:'JetBrains Mono',monospace;
}
.option-item.selected { border-color:var(--accent-cyan); background:rgba(0,229,255,0.07); }
.option-item.correct  { border-color:var(--accent-green); background:rgba(16,185,129,0.1); }
.option-item.wrong    { border-color:var(--accent-red);   background:rgba(239,68,68,0.08); }
.option-item.correct .option-label { background:var(--accent-green); color:#fff; border-color:var(--accent-green); }
.option-item.wrong .option-label   { background:var(--accent-red);   color:#fff; border-color:var(--accent-red); }

.explanation-box {
  margin-top:16px; padding:14px 16px; border-radius:var(--radius-md);
  background:rgba(0,229,255,0.04); border:1px solid rgba(0,229,255,0.15);
  font-size:0.87rem; color:var(--text-secondary); line-height:1.6;
  display:none;
}
.explanation-box.visible { display:block; animation:fadeIn 0.3s ease; }
.quiz-actions { display:flex; justify-content:space-between; gap:12px; margin-top:16px; }

/* Quiz Results */
.quiz-results { max-width:640px; margin:0 auto; text-align:center; }
.result-grade { font-family:'Syne',sans-serif; font-size:1.2rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; }
.result-score { font-family:'Syne',sans-serif; font-size:5rem; font-weight:800; letter-spacing:-0.06em; line-height:1; margin:12px 0 4px; }
.result-score span { font-size:2rem; color:var(--text-muted); }
.result-pct   { font-size:1.1rem; font-weight:600; margin-bottom:28px; }
.result-review { text-align:left; display:flex; flex-direction:column; gap:10px; margin-bottom:24px; max-height:340px; overflow-y:auto; }
.review-item   { padding:12px 14px; border-radius:var(--radius-md); border:1px solid var(--border-glass); font-size:0.85rem; }
.review-correct { border-color:rgba(16,185,129,0.3); background:rgba(16,185,129,0.05); }
.review-wrong   { border-color:rgba(239,68,68,0.3);  background:rgba(239,68,68,0.05); }
.review-q       { font-weight:600; margin-bottom:4px; }
.review-a, .review-correct-a { color:var(--text-secondary); font-size:0.82rem; }
.result-actions { display:flex; gap:12px; justify-content:center; }

/* ══════════════════════════════════════════════
   CODING SECTION
   ══════════════════════════════════════════════ */
.coding-layout { display:grid; grid-template-columns:1fr 0fr; gap:20px; transition:grid-template-columns 0.4s var(--ease-out); }
.coding-layout.panel-open { grid-template-columns:1fr 1fr; }

.problem-card {
  display:flex; align-items:center; justify-content:space-between;
  cursor:pointer; padding:16px 20px!important;
  transition:var(--transition);
}
.problem-left  { display:flex; align-items:center; gap:14px; }
.solved-check  { font-size:1.2rem; }
.problem-title { font-weight:600; font-size:0.92rem; }
.problem-tags  { display:flex; gap:6px; flex-wrap:wrap; margin-top:4px; }
.ptag          { font-size:0.68rem; font-weight:600; padding:2px 8px; border-radius:99px; background:rgba(0,229,255,0.08); color:var(--accent-cyan); }
.solved-card   { border-color:rgba(16,185,129,0.25); }

.difficulty-badge {
  font-size:0.7rem; font-weight:700; text-transform:uppercase; letter-spacing:0.08em;
  padding:4px 10px; border-radius:99px;
}
.difficulty-easy   { background:rgba(16,185,129,0.15); color:var(--accent-green); }
.difficulty-medium { background:rgba(245,158,11,0.15);  color:var(--accent-orange); }
.difficulty-hard   { background:rgba(239,68,68,0.15);   color:var(--accent-red); }

/* Problem Panel */
.problem-panel {
  overflow-y:auto; max-height:calc(100vh - var(--topbar-height) - 64px);
  display:none;
}
.problem-panel.open { display:block; }
.problem-panel > .glass-card { height:100%; }

.problem-detail-header { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:16px; gap:12px; }
.problem-detail-title  { font-family:'Syne',sans-serif; font-weight:700; font-size:1.1rem; margin-bottom:4px; }
.problem-description   { color:var(--text-secondary); font-size:0.87rem; line-height:1.7; white-space:pre-line; margin-bottom:14px; }
.problem-example       { background:var(--bg-tertiary); border-radius:var(--radius-md); padding:12px 14px; font-size:0.84rem; line-height:1.7; margin-bottom:16px; }
.problem-example code  { background:rgba(0,229,255,0.08); padding:1px 5px; border-radius:4px; font-family:'JetBrains Mono',monospace; font-size:0.82rem; color:var(--accent-cyan); }

.code-editor-wrap { border:1px solid var(--border-glass); border-radius:var(--radius-md); overflow:hidden; margin-bottom:14px; }
.code-editor-bar  { display:flex; justify-content:space-between; align-items:center; padding:8px 14px; background:var(--bg-tertiary); border-bottom:1px solid var(--border-glass); font-size:0.78rem; color:var(--text-muted); }
.code-editor {
  width:100%; min-height:200px; padding:16px;
  background:var(--bg-secondary); color:var(--text-primary);
  font-family:'JetBrains Mono',monospace; font-size:0.82rem; line-height:1.6;
  border:none; resize:vertical; outline:none; display:block;
}
.problem-actions { display:flex; gap:10px; margin-bottom:12px; }
.code-output     { border-radius:var(--radius-md); overflow:hidden; }
.output-running  { padding:12px 14px; background:var(--bg-tertiary); color:var(--text-muted); font-size:0.85rem; animation:pulse 1s ease infinite; }
.output-success  { padding:12px 14px; background:rgba(16,185,129,0.08); border:1px solid rgba(16,185,129,0.2); border-radius:var(--radius-md); color:var(--accent-green); font-family:'JetBrains Mono',monospace; font-size:0.82rem; margin:0; white-space:pre; }
.already-solved  { color:var(--accent-green); font-size:0.85rem; text-align:center; margin-top:12px; }

/* ══════════════════════════════════════════════
   INTERVIEW SECTION
   ══════════════════════════════════════════════ */
.faq-card { cursor:pointer; }
.faq-question {
  display:flex; justify-content:space-between; align-items:flex-start;
  gap:12px; font-weight:600; font-size:0.92rem;
}
.faq-arrow    { flex-shrink:0; font-size:1.1rem; transition:transform 0.3s ease; }
.faq-answer   { color:var(--text-secondary); font-size:0.88rem; line-height:1.7; max-height:0; overflow:hidden; transition:max-height 0.4s var(--ease-out), margin 0.3s ease; }
.faq-card.open .faq-arrow  { transform:rotate(180deg); }
.faq-card.open .faq-answer { max-height:300px; margin-top:14px; }

/* ══════════════════════════════════════════════
   RESUME BUILDER
   ══════════════════════════════════════════════ */
.resume-layout { display:grid; grid-template-columns:1fr 1fr; gap:24px; }
.resume-preview {
  background:#fff; border-radius:var(--radius-lg); overflow:hidden;
  box-shadow:0 8px 32px rgba(0,0,0,0.3);
  position:sticky; top:20px; max-height:calc(100vh - 120px); overflow-y:auto;
}
.resume-preview-header {
  display:flex; justify-content:space-between; align-items:center;
  padding:12px 20px; background:#f5f5f5; border-bottom:1px solid #e5e5e5;
}
.resume-preview-title { font-size:0.82rem; font-weight:600; color:#555; }
#resume-content { padding:32px; font-family:Georgia,serif; font-size:12px; color:#222; line-height:1.5; }
#resume-content h1 { font-size:18px; font-weight:bold; margin-bottom:3px; }
#resume-content h2 { font-size:13px; border-bottom:1px solid #333; padding-bottom:2px; margin:14px 0 6px; text-transform:uppercase; letter-spacing:0.06em; }
#resume-content .contact-line { color:#555; margin-bottom:6px; }
#resume-content .entry-header { display:flex; justify-content:space-between; font-weight:bold; }
#resume-content .entry-sub { color:#555; }
#resume-content ul { margin:4px 0 0 18px; }
#resume-content li { margin-bottom:2px; }

/* ══════════════════════════════════════════════
   COMPANIES SECTION
   ══════════════════════════════════════════════ */
.companies-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:16px; }
.company-card { cursor:default; }
.company-header { display:flex; align-items:center; gap:12px; margin-bottom:14px; }
.company-logo {
  width:44px; height:44px; border-radius:12px; flex-shrink:0;
  display:flex; align-items:center; justify-content:center;
  font-size:1.3rem; font-weight:800;
}
.company-name    { font-weight:700; font-size:1rem; }
.company-role    { font-size:0.78rem; color:var(--text-muted); }
.company-package { font-size:0.88rem; font-weight:600; color:var(--accent-green); margin-bottom:4px; }
.company-sector  { font-size:0.78rem; color:var(--text-muted); margin-bottom:10px; }
.company-tags    { display:flex; flex-wrap:wrap; gap:6px; }
.company-tag     { font-size:0.7rem; padding:3px 8px; border-radius:99px; background:var(--bg-card); border:1px solid var(--border-glass); color:var(--text-secondary); }

/* ══════════════════════════════════════════════
   TOASTS
   ══════════════════════════════════════════════ */
#toast-container { position:fixed; bottom:24px; right:24px; z-index:99999; display:flex; flex-direction:column; gap:10px; pointer-events:none; }
.toast {
  display:flex; align-items:center; gap:10px;
  padding:13px 18px; border-radius:var(--radius-md);
  font-size:0.88rem; font-weight:500;
  background:var(--bg-secondary);
  border:1px solid var(--border-glass);
  box-shadow:0 8px 32px rgba(0,0,0,0.4);
  backdrop-filter:blur(20px);
  transform:translateX(120%);
  transition:transform 0.4s var(--ease-spring);
  pointer-events:all;
  max-width:320px;
}
.toast.show { transform:translateX(0); }
.toast-success     { border-color:rgba(16,185,129,0.3); }
.toast-error       { border-color:rgba(239,68,68,0.3); }
.toast-info        { border-color:rgba(0,229,255,0.2); }
.toast-warning     { border-color:rgba(245,158,11,0.3); }
.toast-celebration { border-color:rgba(124,58,237,0.4); background:rgba(124,58,237,0.1); }
.toast-icon        { font-size:1.1rem; }

/* ══════════════════════════════════════════════
   SCROLL REVEAL
   ══════════════════════════════════════════════ */
.reveal {
  opacity:0; transform:translateY(14px);
  transition:opacity 0.5s var(--ease-out), transform 0.5s var(--ease-out);
}
.reveal.revealed { opacity:1; transform:translateY(0); }

/* ══════════════════════════════════════════════
   SKELETON LOADERS
   ══════════════════════════════════════════════ */
.skeleton-card {
  background:var(--bg-card); border:1px solid var(--border-glass);
  border-radius:var(--radius-lg); padding:24px; margin-bottom:16px;
}
.skeleton-line {
  height:12px; border-radius:99px;
  background:linear-gradient(90deg, var(--bg-tertiary) 25%, rgba(255,255,255,0.05) 50%, var(--bg-tertiary) 75%);
  background-size:200%;
  animation:skeletonShimmer 1.5s ease infinite;
  margin-bottom:10px;
}
.skeleton-line.w-90 { width:90%; } .skeleton-line.w-60 { width:60%; } .skeleton-line.w-40 { width:40%; }
@keyframes skeletonShimmer { 0%{background-position:100%} 100%{background-position:-100%} }

/* ══════════════════════════════════════════════
   FADE / SLIDE ANIMATIONS
   ══════════════════════════════════════════════ */
@keyframes fadeIn    { from{opacity:0} to{opacity:1} }
@keyframes slideUp   { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
@keyframes slideDown { from{opacity:0;transform:translateY(-24px)} to{opacity:1;transform:translateY(0)} }

.fade-in { opacity:0; animation:fadeIn 0.5s ease forwards; }
.fade-in-1 { animation-delay:0.05s; }
.fade-in-2 { animation-delay:0.12s; }
.fade-in-3 { animation-delay:0.19s; }
.fade-in-4 { animation-delay:0.26s; }

/* ══════════════════════════════════════════════
   RESPONSIVE
   ══════════════════════════════════════════════ */
@media (max-width:1024px) {
  .dashboard-bottom { grid-template-columns:1fr; }
  .resume-layout    { grid-template-columns:1fr; }
  .coding-layout, .coding-layout.panel-open { grid-template-columns:1fr; }
  .problem-panel { position:fixed; inset:var(--topbar-height) 0 0 0; z-index:300; max-height:none; }
}

@media (max-width:768px) {
  .sidebar {
    position:fixed; top:0; left:0; bottom:0; z-index:400;
    transform:translateX(-100%);
  }
  .sidebar.open { transform:translateX(0); box-shadow:8px 0 40px rgba(0,0,0,0.5); }
  .hamburger { display:flex; }
  .topbar-page-title { display:block; }
  .nav-links, .nav-cta { display:none; }
  .landing-nav { padding:0 20px; }
  .section-page { padding:24px 16px 60px; }
  .topbar { padding:0 16px; }
  .hero-section { padding:100px 20px 60px; }
  .hero-stats { gap:24px; }
  .dashboard-grid { grid-template-columns:1fr 1fr; }
  .video-grid { grid-template-columns:1fr; }
  .quiz-category-grid { grid-template-columns:1fr 1fr; }
  .companies-grid { grid-template-columns:1fr; }
  #cursor-glow { display:none; }
}

@media (max-width:480px) {
  .dashboard-grid { grid-template-columns:1fr; }
  .hero-title { font-size:2rem; }
  .quiz-category-grid { grid-template-columns:1fr; }
  .form-row { grid-template-columns:1fr; }
}