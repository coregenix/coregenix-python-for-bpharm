/*
 * Python for B.Pharm — COREGENIX
 * App logic: routing, progress (XP, badges), editors, Pyodide runner, quizzes.
 */
(function () {
  'use strict';

  /* ================= progress storage (safe if storage is blocked) ================= */
  const KEY = 'coregenix-pybpharm-v1';
  let mem = null;
  function load() {
    try { const raw = localStorage.getItem(KEY); if (raw) return JSON.parse(raw); } catch (e) {}
    return { xp: 0, done: {}, quiz: {}, ran: false, days: [], badges: {}, drafts: {} };
  }
  mem = load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(mem)); } catch (e) {} }

  const BADGES = [
    { id: 'first-run', emoji: '🚀', name: 'First Run', desc: 'Run your first Python code' },
    { id: 'first-pass', emoji: '✅', name: 'Challenger', desc: 'Pass your first challenge' },
    { id: 'quiz-whiz', emoji: '🧠', name: 'Quiz Whiz', desc: 'Answer every question right in one lesson' },
    { id: 'half', emoji: '⭐', name: 'Halfway There', desc: 'Complete 7 lessons' },
    { id: 'beginner', emoji: '🌱', name: 'Beginner Graduate', desc: 'Complete all Beginner lessons' },
    { id: 'lab', emoji: '🔬', name: 'Lab Scientist', desc: 'Complete all Pharma Lab lessons' },
    { id: 'streak3', emoji: '🔥', name: '3-Day Streak', desc: 'Learn on 3 different days' },
    { id: 'all', emoji: '🏆', name: 'Pharma Coder', desc: 'Complete every lesson' },
  ];

  const $ = (sel, root) => (root || document).querySelector(sel);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const doneCount = () => LESSONS.filter((l) => mem.done[l.id]).length;
  const levelDone = (lv) => LESSONS.filter((l) => l.level === lv).every((l) => mem.done[l.id]);

  /* ================= XP, badges, toast, confetti ================= */
  function toast(msg) {
    const t = document.createElement('div');
    t.className = 'toast'; t.textContent = msg;
    $('#toasts').appendChild(t);
    setTimeout(() => t.remove(), 4200);
  }
  function renderXP() {
    const lvl = Math.floor(mem.xp / 100) + 1;
    $('#xpLevel').textContent = 'Lv ' + lvl;
    $('#xpFill').style.width = (mem.xp % 100) + '%';
    $('#xpNum').textContent = mem.xp + ' XP';
  }
  function addXP(n, why) {
    mem.xp += n; save(); renderXP();
    toast('+' + n + ' XP · ' + why);
  }
  function giveBadge(id) {
    if (mem.badges[id]) return;
    const b = BADGES.find((x) => x.id === id);
    mem.badges[id] = true; save();
    toast('🏅 Badge unlocked: ' + b.name);
    confetti();
  }
  function touchStreak() {
    const today = new Date().toISOString().slice(0, 10);
    if (!mem.days.includes(today)) { mem.days.push(today); save(); }
    if (mem.days.length >= 3) giveBadge('streak3');
  }
  function checkBadges() {
    if (doneCount() >= 1) giveBadge('first-pass');
    if (doneCount() >= 7) giveBadge('half');
    if (levelDone(0)) giveBadge('beginner');
    if (levelDone(2)) giveBadge('lab');
    if (doneCount() === LESSONS.length) giveBadge('all');
  }
  function confetti() {
    const c = $('#confetti'); const ctx = c.getContext('2d');
    c.width = innerWidth; c.height = innerHeight;
    const colors = ['#2ea043', '#58a6ff', '#e3b341', '#f778ba', '#ffffff'];
    const bits = Array.from({ length: 140 }, () => ({
      x: innerWidth / 2, y: innerHeight / 3, vx: (Math.random() - .5) * 14, vy: Math.random() * -12 - 2,
      s: Math.random() * 7 + 3, r: Math.random() * 6, c: colors[(Math.random() * colors.length) | 0],
    }));
    let frames = 0;
    (function tick() {
      ctx.clearRect(0, 0, c.width, c.height);
      bits.forEach((b) => { b.x += b.vx; b.y += b.vy; b.vy += .35; b.r += .2; ctx.fillStyle = b.c; ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(b.r); ctx.fillRect(-b.s / 2, -b.s / 2, b.s, b.s * .6); ctx.restore(); });
      if (++frames < 130) requestAnimationFrame(tick); else ctx.clearRect(0, 0, c.width, c.height);
    })();
  }

  /* ================= Pyodide ================= */
  let pyReady = null; let runUser = null;
  function ensurePython() {
    if (pyReady) return pyReady;
    pyReady = (async () => {
      if (typeof loadPyodide !== 'function') throw new Error('Could not download Python (Pyodide). Check your internet connection and refresh.');
      const py = await loadPyodide();
      py.runPython(RUNNER_PY);
      runUser = py.globals.get('run_user');
      return py;
    })();
    pyReady.catch(() => { pyReady = null; });
    return pyReady;
  }
  async function runPython(code, check) {
    await ensurePython();
    await new Promise((r) => setTimeout(r, 30)); // let the UI repaint before heavy work
    const raw = check ? runUser(code, check) : runUser(code);
    return JSON.parse(raw);
  }

  /* ================= editor widget ================= */
  function makeEditor(opts) {
    // opts: {file, code, lesson, mode: 'example' | 'challenge' | 'play', key}
    const wrap = document.createElement('div');
    wrap.innerHTML = `
      <div class="editor">
        <div class="editor-bar">
          <span class="file">${esc(opts.file)}</span>
          <button class="btn small primary" data-act="run">▶ Run</button>
          ${opts.mode === 'challenge' ? '<button class="btn small" data-act="check">✔ Check my answer</button><button class="btn small" data-act="hint">💡 Hint</button>' : ''}
          <button class="btn small" data-act="reset">↺ Reset</button>
        </div>
        <textarea spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="Python code editor"></textarea>
        <div class="output"><span class="empty">Output appears here. Press Run (or Ctrl + Enter).</span></div>
      </div>
      ${opts.mode === 'challenge' ? '<div class="feedback"></div><div class="solution-box"><p class="muted">Here is one possible solution. Read it, understand it, then try typing it yourself:</p><pre></pre></div>' : ''}`;
    const ta = $('textarea', wrap), out = $('.output', wrap), fb = $('.feedback', wrap);
    const runBtn = $('[data-act=run]', wrap), checkBtn = $('[data-act=check]', wrap);
    let fails = 0;

    const saved = opts.key && mem.drafts[opts.key];
    ta.value = saved != null ? saved : opts.code;
    const fit = () => { ta.style.height = 'auto'; ta.style.height = Math.min(Math.max(ta.scrollHeight + 2, 90), 520) + 'px'; };
    setTimeout(fit, 0);
    ta.addEventListener('input', () => {
      fit();
      if (opts.key) { mem.drafts[opts.key] = ta.value; save(); }
    });
    ta.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const s = ta.selectionStart, en = ta.selectionEnd;
        ta.value = ta.value.slice(0, s) + '    ' + ta.value.slice(en);
        ta.selectionStart = ta.selectionEnd = s + 4;
      } else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault(); doRun(false);
      } else if (e.key === 'Enter') {
        // keep indentation of the current line; add 4 more after a colon
        const s = ta.selectionStart;
        const before = ta.value.slice(0, s);
        const line = before.slice(before.lastIndexOf('\n') + 1);
        let indent = (line.match(/^\s*/) || [''])[0];
        if (/:\s*$/.test(line)) indent += '    ';
        if (indent) {
          e.preventDefault();
          ta.value = before + '\n' + indent + ta.value.slice(ta.selectionEnd);
          ta.selectionStart = ta.selectionEnd = s + 1 + indent.length;
          fit();
        }
      }
    });

    function show(res) {
      out.innerHTML = '';
      if (res.output) out.appendChild(document.createTextNode(res.output));
      if (res.error) {
        const e = document.createElement('div'); e.className = 'err'; e.textContent = (res.output ? '\n' : '') + res.error;
        out.appendChild(e);
        if (res.hint) { const h = document.createElement('span'); h.className = 'hint'; h.textContent = '💡 ' + res.hint; out.appendChild(h); }
      }
      if (!res.output && !res.error) out.innerHTML = '<span class="empty">(no output - use print() to show something)</span>';
    }
    async function doRun(withCheck) {
      runBtn.disabled = true; if (checkBtn) checkBtn.disabled = true;
      out.innerHTML = '<span class="loader">Starting Python… (first time takes a few seconds)</span>';
      if (fb) fb.className = 'feedback';
      try {
        const res = await runPython(ta.value, withCheck ? opts.lesson.check : null);
        show(res);
        if (!mem.ran && !res.error) { mem.ran = true; save(); giveBadge('first-run'); addXP(5, 'first program run'); }
        touchStreak();
        if (withCheck) handleCheck(res);
      } catch (err) {
        out.innerHTML = '';
        const e = document.createElement('div'); e.className = 'err'; e.textContent = String(err.message || err);
        out.appendChild(e);
      } finally { runBtn.disabled = false; if (checkBtn) checkBtn.disabled = false; }
    }
    function handleCheck(res) {
      const L = opts.lesson;
      if (res.passed) {
        fails = 0;
        fb.className = 'feedback ok';
        fb.innerHTML = '🎉 <b>Correct!</b> Challenge complete.';
        if (!mem.done[L.id]) {
          mem.done[L.id] = true; save();
          addXP(50, 'challenge passed'); confetti(); checkBadges(); renderSidebar();
          fb.innerHTML += ' You earned <b>50 XP</b>. Now try the quiz below, then go to the next lesson.';
        }
      } else {
        fails++;
        fb.className = 'feedback bad';
        fb.textContent = '❌ ' + (res.message || 'Not quite yet.');
        if (fails >= 3) {
          $('.solution-box pre', wrap).textContent = L.solution;
          $('.solution-box', wrap).style.display = 'block';
        }
      }
    }
    wrap.addEventListener('click', (e) => {
      const act = e.target.dataset && e.target.dataset.act;
      if (act === 'run') doRun(false);
      if (act === 'check') doRun(true);
      if (act === 'reset') { ta.value = opts.code; if (opts.key) { delete mem.drafts[opts.key]; save(); } fit(); }
      if (act === 'hint') { fb.className = 'feedback info'; fb.innerHTML = '💡 <b>Hint:</b> ' + esc(opts.lesson.hint); }
    });
    return wrap;
  }

  /* ================= quiz widget ================= */
  function makeQuiz(L) {
    const box = document.createElement('div');
    L.quiz.forEach((item, qi) => {
      const q = document.createElement('div'); q.className = 'q';
      q.innerHTML = `<p>${qi + 1}. ${esc(item.q)}</p>` +
        item.options.map((o, oi) => `<button class="opt" data-o="${oi}">${esc(o)}</button>`).join('') +
        `<div class="why"></div>`;
      q.addEventListener('click', (e) => {
        const b = e.target.closest('.opt'); if (!b || b.disabled) return;
        const pick = +b.dataset.o; const ok = pick === item.answer;
        b.classList.add(ok ? 'right' : 'wrong');
        if (ok) {
          q.querySelectorAll('.opt').forEach((x) => (x.disabled = true));
        } else { b.disabled = true; }
        const why = $('.why', q); why.style.display = 'block';
        why.textContent = (ok ? '✅ Correct. ' : '❌ Try another option. ') + (ok ? item.why : '');
        if (ok) {
          const k = L.id + '-' + qi;
          if (!mem.quiz[k]) { mem.quiz[k] = true; save(); addXP(10, 'quiz answer'); touchStreak();
            if (L.quiz.every((_, i) => mem.quiz[L.id + '-' + i])) giveBadge('quiz-whiz'); }
        }
      });
      box.appendChild(q);
    });
    return box;
  }

  /* ================= views ================= */
  const main = $('#main');

  function renderSidebar(activeId) {
    const sb = $('#sidebar');
    const cur = activeId != null ? activeId : (sb.dataset.active ? +sb.dataset.active : null);
    sb.dataset.active = cur == null ? '' : cur;
    let html = '';
    LEVELS.forEach((lv, li) => {
      html += `<div class="side-level">${esc(lv.name)}</div>`;
      LESSONS.filter((l) => l.level === li).forEach((l) => {
        html += `<a class="side-item ${mem.done[l.id] ? 'done' : ''} ${cur === l.id ? 'active' : ''}" href="#/lesson/${l.id}">
          <span class="num">${mem.done[l.id] ? '✓' : l.id}</span><span>${esc(l.title)}</span></a>`;
      });
    });
    sb.innerHTML = html;
  }

  function viewHome() {
    const nextLesson = LESSONS.find((l) => !mem.done[l.id]) || LESSONS[0];
    const started = doneCount() > 0;
    let html = `
      <section class="hero">
        <div class="hero-floaters" aria-hidden="true"><span>💊</span><span>🧪</span><span>🐍</span></div>
        <div class="pill" style="display:inline-block">New subject in B.Pharm · Free · No installation</div>
        <h1>Learn <span>Python</span> the pharmacy way</h1>
        <p>Run real Python right in your browser. Every lesson uses examples from pharmacy: doses, labels, assays, calibration curves and shelf life. Earn XP, collect badges and level up.</p>
        <div class="pills"><span class="pill">▶ Live code editor</span><span class="pill">🧩 Auto-checked challenges</span><span class="pill">🧠 Quizzes</span><span class="pill">🏅 XP &amp; badges</span><span class="pill">📱 Works on phone</span></div>
        <a class="btn primary" href="#/lesson/${nextLesson.id}">${started ? 'Continue learning →' : 'Start Lesson 1 →'}</a>
        <a class="btn" href="#/playground">Open Playground</a>
      </section>
      <div class="stats">
        <div class="stat"><b>${doneCount()}/${LESSONS.length}</b>Lessons done</div>
        <div class="stat"><b>${mem.xp}</b>XP earned</div>
        <div class="stat"><b>${Object.keys(mem.badges).length}/${BADGES.length}</b>Badges</div>
        <div class="stat"><b>${mem.days.length}</b>Learning days</div>
      </div>`;
    LEVELS.forEach((lv, li) => {
      html += `<h2 class="section-title">${['🌱', '🧪', '🔬'][li]} ${esc(lv.name)}</h2><div class="muted">${esc(lv.blurb)}</div><div class="grid">`;
      LESSONS.filter((l) => l.level === li).forEach((l) => {
        html += `<a class="card ${mem.done[l.id] ? 'done' : ''}" href="#/lesson/${l.id}">
          ${mem.done[l.id] ? '<span class="check">✓ Done</span>' : ''}<div class="emoji">${l.emoji}</div>
          <h3>${l.id}. ${esc(l.title)}</h3><div class="tag">${esc(lv.name)}</div></a>`;
      });
      html += '</div>';
    });
    html += `<h2 class="section-title">About</h2>
      <div class="block"><p><b>Python for B.Pharm</b> is an open-source learning project created by <b>Sant Kumar</b> (<b>COREGENIX</b>).
      Questions, ideas or corrections? Write to <a href="mailto:coregenix@rediffmail.com">coregenix@rediffmail.com</a>.</p>
      <p class="muted">Educational use only. The pharmacy examples teach programming and must not be used for real patient dosing.</p></div>`;
    main.innerHTML = html;
  }

  function viewLesson(id) {
    const L = LESSONS.find((l) => l.id === id);
    if (!L) { location.hash = '#/home'; return; }
    renderSidebar(id);
    const prev = LESSONS.find((l) => l.id === id - 1), next = LESSONS.find((l) => l.id === id + 1);
    main.innerHTML = `
      <div class="crumbs"><a href="#/home">Home</a> › ${esc(LEVELS[L.level].name)} › Lesson ${L.id}</div>
      <h1 class="lesson-title">${L.emoji} ${esc(L.title)}</h1>
      <section class="block"><h2>📘 Learn</h2>${L.intro}</section>
      <section class="block"><h2>▶ Try it - edit the code and press Run</h2><div id="exSlot"></div></section>
      <section class="block"><h2>🧩 Challenge</h2><div class="task">${L.task}</div><div id="chSlot"></div></section>
      <section class="block"><h2>🧠 Quick quiz</h2><div id="qzSlot"></div></section>
      <div class="lesson-nav">
        ${prev ? `<a class="btn" href="#/lesson/${prev.id}">← ${esc(prev.title)}</a>` : '<span></span>'}
        ${next ? `<a class="btn primary" href="#/lesson/${next.id}">Next: ${esc(next.title)} →</a>` : '<a class="btn primary" href="#/progress">See my progress 🏆</a>'}
      </div>`;
    $('#exSlot').appendChild(makeEditor({ file: 'example.py', code: L.example, mode: 'example', key: 'ex' + L.id }));
    $('#chSlot').appendChild(makeEditor({ file: 'challenge.py', code: L.starter, mode: 'challenge', lesson: L, key: 'ch' + L.id }));
    $('#qzSlot').appendChild(makeQuiz(L));
    ensurePython().catch(() => {}); // warm up in the background
  }

  function viewPlayground() {
    renderSidebar(null);
    main.innerHTML = `
      <div class="crumbs"><a href="#/home">Home</a> › Playground</div>
      <h1 class="lesson-title">🧪 Python Playground</h1>
      <p class="muted">A free space to experiment. Your code is saved in this browser. Available modules include <code>math</code>, <code>statistics</code>, <code>random</code>, <code>datetime</code> and more.</p>
      <div class="block"><div id="pgSlot"></div></div>
      <div class="block"><h2>💡 Ideas to try</h2><ul>
        <li>Calculate the <b>BMI</b> of a patient and print the category.</li>
        <li>Loop through a list of tablets and print how many strips you need for 28 days.</li>
        <li>Use <code>random.randint(1, 6)</code> to simulate rolling a dice for random sampling.</li>
        <li>Convert doses between <b>mg</b> and <b>µg</b> with a function.</li></ul></div>`;
    $('#pgSlot').appendChild(makeEditor({
      file: 'playground.py', mode: 'play', key: 'play',
      code: 'import math\n\n# Free space - write anything!\nweight_kg = 65\nheight_m = 1.68\nbmi = weight_kg / height_m ** 2\nprint(f"BMI = {bmi:.1f}")\nprint("sqrt(2) =", round(math.sqrt(2), 4))\n',
    }));
    ensurePython().catch(() => {});
  }

  function viewProgress() {
    renderSidebar(null);
    let html = `<div class="crumbs"><a href="#/home">Home</a> › My Progress</div>
      <h1 class="lesson-title">🏆 My Progress</h1>
      <div class="stats">
        <div class="stat"><b>Lv ${Math.floor(mem.xp / 100) + 1}</b>Level</div>
        <div class="stat"><b>${mem.xp}</b>Total XP</div>
        <div class="stat"><b>${doneCount()}/${LESSONS.length}</b>Lessons</div>
        <div class="stat"><b>${mem.days.length}</b>Learning days</div>
      </div>
      <h2 class="section-title">Badges</h2><div class="grid">`;
    BADGES.forEach((b) => {
      html += `<div class="badge ${mem.badges[b.id] ? 'got' : ''}"><div class="big">${b.emoji}</div><b>${b.name}</b><small>${b.desc}</small></div>`;
    });
    html += `</div><h2 class="section-title">Settings</h2>
      <div class="block"><p class="muted">Your progress is saved only in this browser.</p>
      <button class="btn" id="resetAll">Reset all progress</button></div>`;
    main.innerHTML = html;
    $('#resetAll').onclick = () => {
      if (confirm('Delete all your progress, XP and badges on this device?')) {
        mem = { xp: 0, done: {}, quiz: {}, ran: false, days: [], badges: {}, drafts: {} }; save(); renderXP(); renderSidebar(); viewProgress();
      }
    };
  }

  /* ================= router ================= */
  function route() {
    document.body.classList.remove('menu-open');
    const h = location.hash.replace(/^#\/?/, '') || 'home';
    const [page, arg] = h.split('/');
    document.querySelectorAll('.topnav a').forEach((a) => a.classList.toggle('active', a.dataset.nav === page));
    if (page === 'lesson') viewLesson(+arg);
    else if (page === 'playground') viewPlayground();
    else if (page === 'progress') viewProgress();
    else { renderSidebar(null); viewHome(); }
    window.scrollTo(0, 0);
  }

  $('#menuBtn').addEventListener('click', () => document.body.classList.toggle('menu-open'));
  $('#scrim').addEventListener('click', () => document.body.classList.remove('menu-open'));
  window.addEventListener('hashchange', route);
  renderXP();
  route();
})();
