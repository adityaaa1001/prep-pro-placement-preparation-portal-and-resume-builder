/* =============================================
   PrepPro — state.js
   Centralized reactive state store.
   Mini Redux-style pub/sub with localStorage.
   ============================================= */
'use strict';

const Store = (() => {

  /* ── Storage key mapping ────────────────── */
  const KEYS = {
    user:             'prepro_user',
    completedVideos:  'prepro_completed_videos',
    bookmarks:        'prepro_bookmarks',
    quizScores:       'prepro_quiz_scores',
    solvedProblems:   'prepro_solved_problems',
    streak:           'prepro_streak',
    lastVisit:        'prepro_last_visit',
    theme:            'prepro_theme',
    activity:         'prepro_activity',
    scrollPositions:  'prepro_scroll_positions',
  };

  /* ── Master state object ────────────────── */
  const _s = {
    // ── persisted ──────────────────────────
    user:            null,
    completedVideos: {},
    bookmarks:       {},
    quizScores:      {},
    solvedProblems:  {},
    streak:          { count: 0, history: [] },
    lastVisit:       null,
    theme:           'dark',
    activity:        [],
    scrollPositions: {},

    // ── session only ────────────────────────
    currentPage:           'dashboard',
    currentDsaTopic:       'arrays',
    currentQuizCategory:   null,
    currentQuizQuestion:   0,
    currentQuizAnswers:    [],
    quizTimeLeft:          0,
    currentProblem:        null,
    isQuizActive:          false,
    quizTimerInterval:     null,
    searchQuery:           '',
    isNavigating:          false,
  };

  /* ── Subscribers map ────────────────────── */
  // key → Set of handler functions
  const _subs = {};

  /* ── Internal helpers ───────────────────── */
  function _persist(key) {
    if (!KEYS[key]) return;
    try { localStorage.setItem(KEYS[key], JSON.stringify(_s[key])); } catch (_) {}
  }

  function _notify(key) {
    const val = _s[key];
    (_subs[key]  || []).forEach(fn => fn(val));
    (_subs['__any__'] || []).forEach(fn => fn(key, val));
  }

  /* ── Public API ─────────────────────────── */
  const Store = {

    /** Read a state slice */
    get(key) { return _s[key]; },

    /** Write a state slice, optionally persist, then notify subscribers */
    set(key, value, persist = true) {
      _s[key] = value;
      if (persist) _persist(key);
      _notify(key);
      return this;
    },

    /** Functional update: fn receives current value, returns new value */
    update(key, fn, persist = true) {
      return this.set(key, fn(_s[key]), persist);
    },

    /** Subscribe to a key (or '__any__' for all changes).
     *  Returns an unsubscribe function. */
    subscribe(key, fn) {
      if (!_subs[key]) _subs[key] = [];
      _subs[key].push(fn);
      return () => { _subs[key] = _subs[key].filter(s => s !== fn); };
    },

    /** Load all persisted keys from localStorage */
    init() {
      Object.entries(KEYS).forEach(([stateKey, storageKey]) => {
        try {
          const raw = localStorage.getItem(storageKey);
          if (raw !== null) _s[stateKey] = JSON.parse(raw);
        } catch (_) {}
      });
      return this;
    },

    /** Expose KEYS for external use */
    KEYS,

    /* ── Computed (derived, never stored) ── */
    computed: {
      get totalVideos()    { return Object.values(DSA_DATA).reduce((a,b) => a + b.length, 0); },
      get completedCount() { return Object.keys(_s.completedVideos).length; },
      get dsaPct()         { return Math.round((this.completedCount / this.totalVideos) * 100) || 0; },
      get quizCount()      { return Object.keys(_s.quizScores).length; },
      get totalCategories(){ return Object.keys(QUIZ_DATA).length; },
      get quizPct()        { return Math.min(100, Math.round((this.quizCount / this.totalCategories) * 100)) || 0; },
      get solvedCount()    { return Object.keys(_s.solvedProblems).length; },
      get totalProblems()  { return CODING_PROBLEMS.length; },
      get codingPct()      { return Math.round((this.solvedCount / this.totalProblems) * 100) || 0; },
      get overallPct()     { return Math.round((this.dsaPct + this.quizPct + this.codingPct) / 3); },
      get streakCount()    { return _s.streak.count; },
    },
  };

  return Store;
})();

/* ── Streak logic (lives here because it's pure state mutation) ── */
function updateStreak() {
  const today   = new Date().toDateString();
  const prev    = Store.get('lastVisit');
  let   sd      = Store.get('streak') || { count: 0, history: [] };

  if (prev === today) {
    // already counted today — no-op
  } else if (prev) {
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    sd.count = (prev === yesterday) ? sd.count + 1 : 1;
  } else {
    sd.count = 1;
  }

  if (!sd.history.includes(today)) {
    sd.history.push(today);
    if (sd.history.length > 56) sd.history.shift(); // keep 8-week heatmap
  }

  Store.set('streak', sd);
  Store.set('lastVisit', today);
  return sd.count;
}

/* ── Activity log ───────────────────────────────────────────────── */
function addActivity(icon, text) {
  Store.update('activity', acts => {
    const now = new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' });
    const next = [{ icon, text, time: now }, ...acts].slice(0, 10);
    return next;
  });
  // Notify dashboard to re-render activity feed
  Store.set('__activityTick__', Date.now(), false);
}