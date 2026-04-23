/* =============================================
   PrepPro — ui.js
   All DOM rendering functions.
   Reads from Store, writes to DOM.
   Never stores state — calls Store.set() for mutations.
   ============================================= */
'use strict';

/* ══════════════════════════════════════════
   TOAST SYSTEM
   ══════════════════════════════════════════ */
function showToast(message, type = 'success', duration = 3200) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  const icons = { success:'✅', error:'❌', info:'💡', warning:'⚠️', celebration:'🎉' };
  t.innerHTML = `<span class="toast-icon">${icons[type] || '📌'}</span><span>${message}</span>`;
  container.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));

  setTimeout(() => {
    t.classList.remove('show');
    setTimeout(() => t.remove(), 400);
  }, duration);
}

/* ══════════════════════════════════════════
   DYNAMIC GREETING
   ══════════════════════════════════════════ */
function getSmartGreeting() {
  const h     = new Date().getHours();
  const user  = Store.get('user');
  const name  = user?.name?.split(' ')[0] || 'Student';
  const sc    = Store.computed;
  const streak= Store.get('streak')?.count || 0;

  const base = h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';

  let sub = 'Ready to crack your placement? Let's go!';
  if (streak >= 7)           sub = `🔥 ${streak}-day streak! You're on fire!`;
  else if (sc.overallPct >= 70) sub = `You're ${sc.overallPct}% done — the finish line is near!`;
  else if (sc.overallPct >= 40) sub = 'Great progress! Keep the momentum going.';
  else if (sc.completedCount > 0) sub = 'Nice start! Every video watched is a step closer.';

  return { base, name, sub };
}

/* ══════════════════════════════════════════
   SMART RECOMMENDATIONS
   ══════════════════════════════════════════ */
function getRecommendations() {
  const sc   = Store.computed;
  const recs = [];

  if (sc.dsaPct < 100) {
    const topic  = Store.get('currentDsaTopic') || 'arrays';
    const videos = DSA_DATA[topic] || [];
    const done   = Store.get('completedVideos') || {};
    const next   = videos.find(v => !done[v.id]);
    if (next) recs.push({ icon:'🎯', label:'Next DSA Video', text: next.title, action: () => { navigateTo('dsa'); }, badge: topic });
  }

  if (sc.quizPct < 100) {
    const scores = Store.get('quizScores') || {};
    const catKey = Object.keys(QUIZ_DATA).find(k => scores[k] === undefined);
    if (catKey) recs.push({ icon:'🧮', label:'Start Quiz', text: QUIZ_DATA[catKey].name, action: () => { navigateTo('aptitude'); startQuiz(catKey); }, badge: 'New' });
  }

  if (sc.codingPct < 100) {
    const solved = Store.get('solvedProblems') || {};
    const next   = CODING_PROBLEMS.find(p => !solved[p.id]);
    if (next) recs.push({ icon:'💻', label:'Practice Problem', text: next.title, action: () => { navigateTo('coding'); }, badge: next.difficulty });
  }

  return recs.slice(0, 3);
}

/* ══════════════════════════════════════════
   DASHBOARD
   ══════════════════════════════════════════ */
function renderDashboard() {
  const sc     = Store.computed;
  const streak = Store.get('streak') || { count: 0, history: [] };

  /* ── Greeting ─────────────────────────── */
  const { base, name, sub } = getSmartGreeting();
  const gEl  = document.getElementById('greeting-text');
  const gnEl = document.getElementById('greeting-name');
  const gsEl = document.getElementById('greeting-sub');
  if (gEl)  gEl.textContent  = base + ',';
  if (gnEl) gnEl.textContent = name;
  if (gsEl) gsEl.textContent = sub;

  /* ── Stat cards (animated numbers) ───── */
  const prevVideos   = +(document.getElementById('stat-videos')?.dataset.val   || 0);
  const prevQuizzes  = +(document.getElementById('stat-quizzes')?.dataset.val  || 0);
  const prevProblems = +(document.getElementById('stat-problems')?.dataset.val || 0);
  const prevStreak   = +(document.getElementById('stat-streak')?.dataset.val   || 0);

  const animate = (id, from, to) => {
    const el = document.getElementById(id);
    if (el) { el.dataset.val = to; animateNumber(el, from, to); }
  };
  animate('stat-videos',   prevVideos,   sc.completedCount);
  animate('stat-quizzes',  prevQuizzes,  sc.quizCount);
  animate('stat-problems', prevProblems, sc.solvedCount);
  animate('stat-streak',   prevStreak,   streak.count);

  /* ── Progress bars ────────────────────── */
  const setPbar = (fillId, pctId, pct) => {
    animateProgressBar(document.getElementById(fillId), pct);
    const pEl = document.getElementById(pctId);
    if (pEl) animateNumber(pEl, 0, pct, 900, '%');
  };
  setPbar('progress-dsa',    'pct-dsa',    sc.dsaPct);
  setPbar('progress-quiz',   'pct-quiz',   sc.quizPct);
  setPbar('progress-coding', 'pct-coding', sc.codingPct);

  /* ── Overall ring ─────────────────────── */
  const ovEl = document.getElementById('overall-pct');
  if (ovEl) animateNumber(ovEl, 0, sc.overallPct, 900, '%');
  const ringEl = document.querySelector('.overall-ring-fill');
  if (ringEl) {
    const circ = 2 * Math.PI * 54;
    ringEl.style.strokeDashoffset = circ - (circ * sc.overallPct / 100);
  }

  /* ── Sidebar badge updates ─────────────── */
  updateSidebarBadges();

  /* ── Activity feed & streak ─────────────── */
  renderActivityFeed();
  renderStreakGrid();
  renderRecommendations();
}

/* ── Activity Feed ────────────────────────────── */
function renderActivityFeed() {
  const feed = document.getElementById('activity-feed');
  if (!feed) return;

  const acts = Store.get('activity') || [];
  const items = acts.length
    ? acts
    : [
        { icon:'🚀', text:'Start your preparation journey!', time:'Just now' },
        { icon:'💡', text:'Try completing a DSA video today', time:'' },
      ];

  feed.innerHTML = items.map((a, i) => `
    <div class="activity-item reveal" style="animation-delay:${i*60}ms">
      <div class="activity-dot" style="background:${actColor(a.icon)}"></div>
      <div class="activity-content">
        <span class="activity-icon-badge">${a.icon}</span>
        <span class="activity-text">${a.text}</span>
      </div>
      <div class="activity-time">${a.time}</div>
    </div>
  `).join('');

  ScrollReveal.observe();
}

function actColor(icon) {
  const map = { '✅':'#10b981','🧮':'#7c3aed','💻':'#00e5ff','🏆':'#f59e0b','🔥':'#f97316','🚀':'#00e5ff' };
  return map[icon] || '#8892b0';
}

/* ── Streak Heatmap ───────────────────────────── */
function renderStreakGrid() {
  const grid = document.getElementById('streak-grid');
  if (!grid) return;

  const history = Store.get('streak')?.history || [];
  const today   = new Date().toDateString();
  grid.innerHTML = '';

  // Build 56-cell (8-week) grid, latest on right
  for (let i = 55; i >= 0; i--) {
    const d   = new Date(Date.now() - i * 86400000).toDateString();
    const div = document.createElement('div');
    div.className = 'streak-day reveal';
    div.style.animationDelay = `${(55 - i) * 12}ms`;
    if (history.includes(d)) div.classList.add('active');
    if (d === today)         div.classList.add('today');
    div.title = d;
    grid.appendChild(div);
  }

  ScrollReveal.observe();
  setTimeout(animateStreakGrid, 100);
}

/* ── Smart Recommendations ───────────────────── */
function renderRecommendations() {
  const el = document.getElementById('recommendations');
  if (!el) return;

  const recs = getRecommendations();
  if (!recs.length) { el.innerHTML = '<p class="rec-empty">🎯 All caught up! Keep the streak going.</p>'; return; }

  el.innerHTML = recs.map((r, i) => `
    <div class="rec-item reveal tilt-card" style="animation-delay:${i*80}ms" onclick="(${r.action.toString()})()">
      <span class="rec-icon">${r.icon}</span>
      <div class="rec-body">
        <div class="rec-label">${r.label}</div>
        <div class="rec-text">${r.text}</div>
      </div>
      <span class="rec-badge">${r.badge}</span>
    </div>
  `).join('');

  ScrollReveal.observe();
  CardTilt.init();
}

/* ── Sidebar badges ──────────────────────────── */
function updateSidebarBadges() {
  const sc = Store.computed;
  const map = {
    'badge-dsa':    sc.dsaPct < 100 ? (Store.computed.totalVideos - sc.completedCount) : null,
    'badge-coding': sc.codingPct < 100 ? (Store.computed.totalProblems - sc.solvedCount) : null,
  };
  Object.entries(map).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (val && val > 0) { el.textContent = val; el.style.display = 'flex'; }
    else                { el.style.display = 'none'; }
  });
}

/* ══════════════════════════════════════════
   DSA SECTION
   ══════════════════════════════════════════ */
function renderDSASection() {
  const topic    = Store.get('currentDsaTopic') || 'arrays';
  const videos   = DSA_DATA[topic] || [];
  const done     = Store.get('completedVideos') || {};
  const bmarks   = Store.get('bookmarks') || {};
  const sc       = Store.computed;

  // Header stats
  const countEl  = document.getElementById('dsa-progress-count');
  const fillEl   = document.getElementById('dsa-overall-fill');
  const pctEl    = document.getElementById('dsa-overall-pct');
  if (countEl) countEl.textContent = `${sc.completedCount} / ${sc.totalVideos} completed`;
  if (fillEl)  animateProgressBar(fillEl, sc.dsaPct);
  if (pctEl)   pctEl.textContent = sc.dsaPct + '%';

  const grid = document.getElementById('video-grid');
  if (!grid) return;

  grid.innerHTML = videos.map((v, idx) => {
    const isCompleted  = !!done[v.id];
    const isBookmarked = !!bmarks[v.id];
    return `
      <div class="glass-card video-card tilt-card reveal ${isCompleted ? 'completed' : ''}"
           id="vcard-${v.id}" style="animation-delay:${idx*60}ms">
        <div class="video-thumbnail">
          <iframe src="https://www.youtube.com/embed/${v.videoId}?rel=0"
            title="${v.title}" allowfullscreen loading="lazy"></iframe>
          <div class="video-completed-overlay">✅</div>
        </div>
        <div class="video-meta">
          <span class="video-difficulty difficulty-${v.difficulty}">${v.difficulty}</span>
          <span class="video-duration">⏱ ${v.duration}</span>
          <button class="bookmark-btn ${isBookmarked ? 'bookmarked' : ''}"
            onclick="toggleBookmark('${v.id}','${v.title.replace(/'/g,"\\'")}')">
            ${isBookmarked ? '🔖' : '🏷️'}
          </button>
        </div>
        <div class="video-title">${v.title}</div>
        <div class="video-channel">📺 ${v.channel}</div>
        <button class="mark-complete-btn magnetic"
          onclick="toggleVideoComplete('${v.id}','${v.title.replace(/'/g,"\\'")}')">
          ${isCompleted ? '✅ Completed' : '⬜ Mark Complete'}
        </button>
      </div>
    `;
  }).join('');

  ScrollReveal.observe();
  CardTilt.init();
  MagneticButtons.init();
}

/* ══════════════════════════════════════════
   APTITUDE (just re-renders the category picker; quiz UI is in app.js)
   ══════════════════════════════════════════ */
function renderAptitudeSection() {
  const view = document.getElementById('aptitude-view');
  if (!view || Store.get('currentQuizCategory')) return;
  const scores = Store.get('quizScores') || {};

  view.innerHTML = `
    <div class="page-heading reveal">
      <h2>Aptitude Practice</h2>
      <p>Choose a category to start a timed quiz session</p>
    </div>
    <div class="quiz-category-grid">
      ${Object.entries(QUIZ_DATA).map(([key, cat], i) => {
        const sc = scores[key];
        const pct = sc !== undefined ? Math.round((sc / cat.questions.length) * 100) : null;
        return `
          <div class="glass-card quiz-cat-card tilt-card reveal magnetic" style="animation-delay:${i*70}ms"
               onclick="startQuiz('${key}')">
            <span class="quiz-cat-icon">${cat.icon}</span>
            <div class="quiz-cat-name">${cat.name}</div>
            <div class="quiz-cat-count">${cat.questions.length} questions · 45s each</div>
            ${pct !== null
              ? `<div class="quiz-score-pill ${pct>=70?'pill-green':pct>=40?'pill-yellow':'pill-red'}">
                   Last: ${sc}/${cat.questions.length} — ${pct}%
                 </div>`
              : `<div class="quiz-score-pill pill-muted">Not attempted</div>`
            }
          </div>
        `;
      }).join('')}
    </div>
  `;

  ScrollReveal.observe();
  CardTilt.init();
  MagneticButtons.init();
}

/* ══════════════════════════════════════════
   CODING SECTION
   ══════════════════════════════════════════ */
function renderCodingSection() {
  const list    = document.getElementById('problem-list');
  const solved  = Store.get('solvedProblems') || {};
  if (!list) return;

  list.innerHTML = CODING_PROBLEMS.map((p, i) => `
    <div class="glass-card problem-card reveal tilt-card ${solved[p.id] ? 'solved-card' : ''}"
         style="animation-delay:${i*50}ms"
         onclick="openProblem('${p.id}')">
      <div class="problem-left">
        <span class="solved-check">${solved[p.id] ? '✅' : '⬜'}</span>
        <div>
          <div class="problem-title">${p.title}</div>
          <div class="problem-tags">${p.tags.map(t=>`<span class="ptag">${t}</span>`).join('')}</div>
        </div>
      </div>
      <span class="difficulty-badge difficulty-${p.difficulty.toLowerCase()}">${p.difficulty}</span>
    </div>
  `).join('');

  ScrollReveal.observe();
  CardTilt.init();
}

/* ══════════════════════════════════════════
   INTERVIEW SECTION
   ══════════════════════════════════════════ */
function renderInterviewSection(filter = 'hr') {
  const container = document.getElementById('interview-cards');
  if (!container) return;

  const data = INTERVIEW_DATA[filter] || [];
  container.innerHTML = data.map((item, i) => `
    <div class="glass-card faq-card reveal" style="animation-delay:${i*50}ms"
         onclick="toggleFaq(this)">
      <div class="faq-question">
        <span>${item.q}</span>
        <span class="faq-arrow">▾</span>
      </div>
      <div class="faq-answer">${item.a}</div>
    </div>
  `).join('');

  ScrollReveal.observe();
}

function toggleFaq(card) {
  const isOpen = card.classList.contains('open');
  document.querySelectorAll('.faq-card.open').forEach(c => c.classList.remove('open'));
  if (!isOpen) card.classList.add('open');
}

/* ══════════════════════════════════════════
   COMPANIES SECTION
   ══════════════════════════════════════════ */
function renderCompanies(filter = 'all') {
  const grid = document.getElementById('companies-grid');
  if (!grid) return;

  const filtered = filter === 'all'
    ? COMPANIES_DATA
    : COMPANIES_DATA.filter(c => c.difficulty === filter || c.sector === filter);

  grid.innerHTML = filtered.map((c, i) => `
    <div class="glass-card company-card tilt-card reveal" style="animation-delay:${i*40}ms">
      <div class="company-header">
        <div class="company-logo" style="background:linear-gradient(135deg,${c.color}88,${c.color}33)">${c.name[0]}</div>
        <div>
          <div class="company-name">${c.name}</div>
          <div class="company-role">${c.role}</div>
        </div>
        <span class="difficulty-badge difficulty-${c.difficulty.toLowerCase()}">${c.difficulty}</span>
      </div>
      <div class="company-package">💰 ${c.package}</div>
      <div class="company-sector">🏭 ${c.sector}</div>
      <div class="company-tags">${c.tags.map(t=>`<span class="company-tag">${t}</span>`).join('')}</div>
    </div>
  `).join('');

  ScrollReveal.observe();
  CardTilt.init();
}

function filterCompanies(filter, btn) {
  document.querySelectorAll('#page-companies .topic-tab').forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderCompanies(filter);
}

/* ══════════════════════════════════════════
   GLOBAL SEARCH
   ══════════════════════════════════════════ */
const _searchCache = [];
function buildSearchIndex() {
  if (_searchCache.length) return;
  Object.entries(DSA_DATA).forEach(([topic, vids]) =>
    vids.forEach(v => _searchCache.push({ type:'video', title:v.title, sub:topic, action:() => { navigateTo('dsa'); Store.set('currentDsaTopic', topic, false); renderDSASection(); }, icon:'🎯' }))
  );
  CODING_PROBLEMS.forEach(p =>
    _searchCache.push({ type:'problem', title:p.title, sub:p.difficulty, action:() => { navigateTo('coding'); openProblem(p.id); }, icon:'💻' })
  );
  COMPANIES_DATA.forEach(c =>
    _searchCache.push({ type:'company', title:c.name, sub:c.role, action:() => navigateTo('companies'), icon:'🏢' })
  );
}

let _searchDebounce;
function handleSearch(e) {
  clearTimeout(_searchDebounce);
  _searchDebounce = setTimeout(() => {
    buildSearchIndex();
    const q   = e.target.value.trim().toLowerCase();
    const box = document.getElementById('search-results');
    if (!box) return;
    if (!q) { box.classList.remove('visible'); return; }

    const matches = _searchCache
      .filter(item => item.title.toLowerCase().includes(q) || item.sub.toLowerCase().includes(q))
      .slice(0, 6);

    if (!matches.length) { box.classList.remove('visible'); return; }
    box.innerHTML = matches.map(m => `
      <div class="search-result-item" onclick="(${m.action.toString()})(); closeSearch()">
        <span>${m.icon}</span>
        <div>
          <div class="sr-title">${m.title}</div>
          <div class="sr-sub">${m.type} · ${m.sub}</div>
        </div>
      </div>
    `).join('');
    box.classList.add('visible');
  }, 180);
}

function closeSearch() {
  const box = document.getElementById('search-results');
  const inp = document.getElementById('global-search');
  if (box) box.classList.remove('visible');
  if (inp) inp.value = '';
}

document.addEventListener('click', e => {
  if (!e.target.closest('.topbar-search')) closeSearch();
});

/* ══════════════════════════════════════════
   RESUME (live update helper)
   ══════════════════════════════════════════ */
function updateResume() {
  const g = id => (document.getElementById(id)||{}).value || '';
  const preview = document.getElementById('resume-content');
  if (!preview) return;

  const skills  = g('r-skills').split(',').map(s=>s.trim()).filter(Boolean);
  const p1desc  = g('r-proj1desc').split('\n').filter(Boolean);
  const p2desc  = g('r-proj2desc').split('\n').filter(Boolean);
  const achieve = g('r-achieve').split('\n').filter(Boolean);
  const expText = g('r-exp1');

  preview.innerHTML = `
    <h1>${g('r-name')||'Your Name'}</h1>
    <div class="contact-line">${g('r-email')||'email@example.com'} | ${g('r-phone')||'+91 XXXXX XXXXX'} | ${g('r-linkedin')||'linkedin.com/in/yourprofile'}</div>
    <h2>Education</h2>
    <div class="entry">
      <div class="entry-header"><span>${g('r-college')||'University Name'}</span><span>${g('r-year')||'2024'}</span></div>
      <div class="entry-sub">${g('r-degree')||'B.Tech Computer Science'} | CGPA: ${g('r-cgpa')||'8.0'}</div>
    </div>
    ${skills.length ? `<h2>Technical Skills</h2><div>${skills.join(', ')}</div>` : ''}
    ${expText ? `<h2>Experience</h2><div class="entry"><p>${expText}</p></div>` : ''}
    ${g('r-proj1') ? `
    <h2>Projects</h2>
    <div class="entry">
      <div class="entry-header"><span>${g('r-proj1')}</span><span>${g('r-proj1tech')}</span></div>
      <ul>${p1desc.map(d=>`<li>${d}</li>`).join('')}</ul>
    </div>` : ''}
    ${g('r-proj2') ? `
    <div class="entry">
      <div class="entry-header"><span>${g('r-proj2')}</span><span>${g('r-proj2tech')}</span></div>
      <ul>${p2desc.map(d=>`<li>${d}</li>`).join('')}</ul>
    </div>` : ''}
    ${achieve.length ? `<h2>Achievements</h2><ul>${achieve.map(a=>`<li>${a}</li>`).join('')}</ul>` : ''}
  `;
}

function downloadResume() {
  const content = document.getElementById('resume-content');
  if (!content) return;

  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8">
    <style>
      body{font-family:Arial,sans-serif;max-width:760px;margin:0 auto;padding:40px;font-size:13px;line-height:1.5;color:#222}
      h1{font-size:22px;margin-bottom:2px} h2{font-size:14px;border-bottom:1px solid #333;padding-bottom:2px;margin:14px 0 6px}
      .contact-line{color:#555;margin-bottom:4px} .entry-header{display:flex;justify-content:space-between;font-weight:bold}
      .entry-sub{color:#555} ul{margin:4px 0 0 18px} li{margin-bottom:2px}
    </style></head><body>${content.innerHTML}</body></html>`;

  const blob = new Blob([html], { type:'text/html' });
  const a    = Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download:'PrepPro_Resume.html' });
  a.click(); URL.revokeObjectURL(a.href);
  showToast('Resume downloaded! 📄', 'success');
  addActivity('📄', 'Downloaded resume');
  renderDashboard();
}

/* ══════════════════════════════════════════
   TOPBAR DATE & PAGE TITLE
   ══════════════════════════════════════════ */
function updateTopbar(section) {
  const titles = {
    dashboard: '📊 Dashboard',
    dsa:       '🎯 DSA Learning',
    aptitude:  '🧮 Aptitude Quiz',
    coding:    '💻 Coding Practice',
    interview: '🎤 Interview Prep',
    resume:    '📄 Resume Builder',
    companies: '🏢 Company Intel',
  };
  const el = document.getElementById('page-title');
  if (el) el.textContent = titles[section] || '📊 Dashboard';

  const dateEl = document.getElementById('current-date');
  if (dateEl) dateEl.textContent = new Date().toLocaleDateString('en-IN', { weekday:'short', month:'short', day:'numeric' });

  const streak = Store.get('streak')?.count || 0;
  const sc = document.getElementById('streak-count');
  if (sc) sc.textContent = `🔥 ${streak} day streak`;

  // User avatar & name
  const user = Store.get('user');
  const nameEls = document.querySelectorAll('.user-name-display');
  nameEls.forEach(el => el.textContent = user?.name?.split(' ')[0] || 'Student');
  const avatarEls = document.querySelectorAll('.user-avatar');
  avatarEls.forEach(el => el.textContent = (user?.name?.[0] || 'S').toUpperCase());
}