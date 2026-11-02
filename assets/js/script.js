/* ============================================================
   SUNIL ARYAL — MACINTOSH OS PORTFOLIO + EXACT OLD PROFILE CARD
   ============================================================ */

(() => {
  /* -------------------- Audio Effects -------------------- */
  let soundEnabled = true;
  const sounds = {
    click: new Audio('assets/audio/mouse-click.mp3'),
    swipe: new Audio('assets/audio/swipe.mp3'),
    chime: new Audio('assets/audio/chime.mp3'),
  };
  sounds.click.volume = 0.18;
  sounds.swipe.volume = 0.18;
  sounds.chime.volume = 0.14;

  function playSound(name) {
    if (!soundEnabled || !sounds[name]) return;
    try {
      sounds[name].currentTime = 0;
      sounds[name].play().catch(() => {});
    } catch {
      /* ignore autoplay restrictions */
    }
  }

  /* -------------------- Toast Notification -------------------- */
  const toastEl = document.getElementById('mac-toast');
  let toastTimer = null;
  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.hidden = true;
    }, 2600);
  }

  /* -------------------- Theme Management -------------------- */
  const themeBtn = document.getElementById('menubar-theme-btn');
  const themeIcon = document.getElementById('menubar-theme-icon');
  const themeCards = document.querySelectorAll('[data-set-theme]');

  function applyTheme(mode) {
    const isDark = mode === 'dark';
    document.body.classList.toggle('dark', isDark);
    document.body.classList.toggle('light', !isDark);
    if (themeIcon) {
      themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }
    themeCards.forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-set-theme') === mode);
    });
    try {
      localStorage.setItem('theme', mode);
    } catch {
      /* ignore */
    }
  }

  const savedTheme = (() => {
    try {
      return localStorage.getItem('theme');
    } catch {
      return null;
    }
  })();
  applyTheme(savedTheme === 'dark' ? 'dark' : 'light');

  themeBtn?.addEventListener('click', () => {
    playSound('click');
    const next = document.body.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(next);
  });

  themeCards.forEach((btn) => {
    btn.addEventListener('click', () => {
      playSound('click');
      applyTheme(btn.getAttribute('data-set-theme') || 'light');
    });
  });

  /* -------------------- Live Clock & Date -------------------- */
  const dateEl = document.getElementById('menubar-date');
  const timeEl = document.getElementById('menubar-time');

  function updateClock() {
    const now = new Date();
    if (dateEl) {
      dateEl.textContent = now.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'long',
        day: 'numeric',
      });
    }
    if (timeEl) {
      timeEl.textContent = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
    }
  }
  updateClock();
  setInterval(updateClock, 1000);

  /* -------------------- Network Status & macOS 27 Control Center -------------------- */
  const netBtn = document.getElementById('network-status-btn');
  netBtn?.addEventListener('click', () => {
    playSound('click');
    const online = navigator.onLine !== false;
    showToast(online ? 'Connection: Online (Ulsan, South Korea)' : 'Connection: Offline');
  });

  const ccBtn = document.getElementById('menubar-cc-btn');
  const ccPanel = document.getElementById('macos27-cc');
  const ccDarkTile = document.getElementById('cc-dark-tile');
  const ccBrightness = document.getElementById('cc-brightness');
  const ccBrightnessVal = document.getElementById('cc-brightness-val');
  const ccSound = document.getElementById('cc-sound');
  const ccSoundVal = document.getElementById('cc-sound-val');
  const wallpaperEl = document.getElementById('desktop-wallpaper');
  const wallpaperBtns = document.querySelectorAll('[data-wallpaper]');

  ccBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    playSound('click');
    if (ccPanel) ccPanel.hidden = !ccPanel.hidden;
  });

  ccPanel?.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  window.addEventListener('click', () => {
    if (ccPanel && !ccPanel.hidden) ccPanel.hidden = true;
  });

  ccPanel?.querySelectorAll('.cc-pill').forEach((pill) => {
    pill.addEventListener('click', () => {
      playSound('click');
      pill.classList.toggle('active');
    });
  });

  ccDarkTile?.addEventListener('click', () => {
    playSound('click');
    const next = document.body.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(next);
  });

  ccBrightness?.addEventListener('input', () => {
    const val = Number(ccBrightness.value || 100);
    if (ccBrightnessVal) ccBrightnessVal.textContent = `${val}%`;
    const desktopEl = document.getElementById('desktop');
    if (desktopEl) {
      desktopEl.style.filter = `brightness(${val / 100})`;
    }
  });

  ccSound?.addEventListener('input', () => {
    const val = Number(ccSound.value || 80);
    if (ccSoundVal) ccSoundVal.textContent = `${val}%`;
    const vol = (val / 100) * 0.25;
    sounds.click.volume = vol;
    sounds.swipe.volume = vol;
    sounds.chime.volume = vol * 0.8;
  });

  wallpaperBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      playSound('click');
      const src = btn.getAttribute('data-wallpaper');
      if (src && wallpaperEl) {
        wallpaperEl.src = src;
        wallpaperBtns.forEach((b) => b.classList.toggle('active', b.getAttribute('data-wallpaper') === src));
        showToast('macOS 27 Wallpaper updated');
      }
    });
  });

  /* -------------------- Centerpiece Hover Letters (macintosh-os style) -------------------- */
  const LETTER_WORDS = {
    S: ['Superb!', 'Stellar!', 'Sharp!', 'Skilled!', 'Spirited!', 'Smart!'],
    u: ['Unstoppable!', 'Unique!', 'Ultimate!', 'Unmatched!', 'Uplifting!'],
    N: ['Notable!', 'Noble!', 'Next-gen!', 'Nimble!', 'Natural!'],
    i: ['Innovative!', 'Inspiring!', 'Ingenious!', 'Inventive!', 'Iconic!'],
    L: ['Legendary!', 'Luminous!', 'Leader!', 'Limitless!', 'Logical!'],
    A: ['Awesome!', 'Ambitious!', 'Astounding!', 'Authentic!', 'Artistic!'],
    R: ['Remarkable!', 'Resilient!', 'Resourceful!', 'Radiant!', 'Revolutionary!'],
    y: ['Youthful!', 'Yearning!', 'Yes-minded!'],
  };

  const titleEl = document.getElementById('centerpiece-title');
  if (titleEl) {
    const text = 'SuNiL ARyAL';
    titleEl.innerHTML = '';
    [...text].forEach((ch) => {
      if (ch === ' ') {
        const sp = document.createElement('span');
        sp.className = 'centerpiece__space';
        sp.textContent = ' ';
        titleEl.appendChild(sp);
        return;
      }
      const span = document.createElement('span');
      span.className = 'centerpiece__letter';
      span.textContent = ch;
      span.addEventListener('mouseenter', () => {
        const pool = LETTER_WORDS[ch] || LETTER_WORDS[ch.toUpperCase()] || ['Awesome!'];
        const word = pool[Math.floor(Math.random() * pool.length)];
        let tag = span.querySelector('.centerpiece__word-tag');
        if (!tag) {
          tag = document.createElement('span');
          tag.className = 'centerpiece__word-tag';
          span.appendChild(tag);
        }
        tag.textContent = word;
      });
      span.addEventListener('mouseleave', () => {
        span.querySelector('.centerpiece__word-tag')?.remove();
      });
      titleEl.appendChild(span);
    });
  }

  /* -------------------- Typing Effect (from old website script.js) -------------------- */
  const typedEl = document.getElementById('typed-text');
  const words = ['Developer', 'Programmer', 'Graphic Designer', 'Writer'];
  let wordIndex = 0;
  let charIndex = words[0].length;
  let isDeleting = true;

  function typeEffect() {
    if (!typedEl) return;
    const current = words[wordIndex];
    if (isDeleting) {
      charIndex--;
      typedEl.textContent = current.substring(0, Math.max(0, charIndex));
      if (charIndex <= 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, 350);
        return;
      }
      setTimeout(typeEffect, 75);
      return;
    }
    charIndex++;
    typedEl.textContent = current.substring(0, charIndex);
    if (charIndex >= current.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1500);
      return;
    }
    setTimeout(typeEffect, 120);
  }
  setTimeout(typeEffect, 1400);

  /* -------------------- Window Manager -------------------- */
  let topZ = 20;
  const windows = new Map();

  const DEFAULT_LAYOUT = {
    profile:   { left: 520, top: 96,  width: 300, height: 375 },
    finder:    { left: 140, top: 64,  width: 580, height: 470 },
    launchpad: { left: 260, top: 80,  width: 560, height: 400 },
    photos:    { left: 220, top: 72,  width: 590, height: 450 },
    terminal:  { left: 250, top: 88,  width: 580, height: 390 },
    mail:      { left: 290, top: 86,  width: 520, height: 400 },
    settings:  { left: 320, top: 78,  width: 480, height: 440 },
    spotify:   { left: 310, top: 84,  width: 500, height: 400 },
    paint:     { left: 240, top: 68,  width: 570, height: 420 },
    projects:  { left: 200, top: 70,  width: 600, height: 440 },
    github:    { left: 230, top: 74,  width: 580, height: 430 },
    instagram: { left: 270, top: 78,  width: 540, height: 430 },
    whatsapp:  { left: 330, top: 82,  width: 480, height: 420 },
    youtube:   { left: 250, top: 76,  width: 560, height: 430 },
    bin:       { left: 350, top: 110, width: 460, height: 320 },
  };

  document.querySelectorAll('.mac-window').forEach((el) => {
    const id = el.getAttribute('data-window-id');
    if (!id) return;
    windows.set(id, el);
    const layout = DEFAULT_LAYOUT[id] || { left: 180, top: 80, width: 540, height: 400 };
    const maxLeft = Math.max(12, window.innerWidth - layout.width - 20);
    const maxTop = Math.max(12, window.innerHeight - layout.height - 100);
    el.style.left = `${Math.min(layout.left, maxLeft)}px`;
    el.style.top = `${Math.min(layout.top, maxTop)}px`;
    el.style.width = `${layout.width}px`;
    el.style.height = `${layout.height}px`;

    el.addEventListener('pointerdown', () => focusWindow(id));
  });

  function syncDockDots() {
    document.querySelectorAll('[data-dock-window]').forEach((btn) => {
      const id = btn.getAttribute('data-dock-window');
      const win = id ? windows.get(id) : null;
      const isOpen = Boolean(win && !win.hidden);
      btn.classList.toggle('is-open', isOpen);
    });
  }

  function focusWindow(id) {
    const win = windows.get(id);
    if (!win) return;
    topZ += 1;
    win.style.zIndex = String(topZ);
  }

  function openWindow(id) {
    const win = windows.get(id);
    if (!win) return;
    playSound('click');
    win.hidden = false;
    focusWindow(id);
    syncDockDots();
    if (id === 'terminal') {
      setTimeout(() => document.getElementById('terminal-input')?.focus(), 50);
    }
  }

  function closeWindow(id) {
    const win = windows.get(id);
    if (!win) return;
    playSound('swipe');
    win.hidden = true;
    win.classList.remove('is-maximized');
    syncDockDots();
  }

  function minimizeWindow(id) {
    const win = windows.get(id);
    if (!win) return;
    playSound('swipe');
    win.hidden = true;
    syncDockDots();
  }

  function toggleWindowFromDock(id) {
    const win = windows.get(id);
    if (!win) return;
    if (win.hidden) {
      openWindow(id);
      return;
    }
    const isTop = Number(win.style.zIndex || 0) === topZ;
    if (isTop) {
      minimizeWindow(id);
    } else {
      playSound('click');
      focusWindow(id);
    }
  }

  // Bind Dock Buttons
  document.querySelectorAll('[data-dock-window]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-dock-window');
      if (id) toggleWindowFromDock(id);
    });
  });

  // Bind any `[data-open-window]` triggers
  document.querySelectorAll('[data-open-window]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-open-window');
      if (id) openWindow(id);
    });
  });

  document.getElementById('menubar-profile-trigger')?.addEventListener('click', (e) => {
    e.preventDefault();
    openWindow('profile');
  });

  // Traffic Light Actions + Dragging + Resizing
  windows.forEach((win, id) => {
    win.querySelectorAll('[data-action]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const act = btn.getAttribute('data-action');
        if (act === 'close') closeWindow(id);
        else if (act === 'minimize') minimizeWindow(id);
        else if (act === 'maximize') {
          if (id === 'profile') {
            document.getElementById('exact-profile-card')?.classList.toggle('is-flipped');
          } else {
            win.classList.toggle('is-maximized');
          }
        }
      });
    });

    // Drag by title bar
    const bar = win.querySelector('[data-drag-handle]');
    bar?.addEventListener('pointerdown', (e) => {
      if (e.target.closest('button')) return;
      if (win.classList.contains('is-maximized')) return;
      focusWindow(id);
      const startX = e.clientX;
      const startY = e.clientY;
      const origLeft = parseFloat(win.style.left) || 0;
      const origTop = parseFloat(win.style.top) || 0;
      bar.setPointerCapture(e.pointerId);

      const onMove = (ev) => {
        const nx = origLeft + (ev.clientX - startX);
        const ny = Math.max(4, origTop + (ev.clientY - startY));
        win.style.left = `${nx}px`;
        win.style.top = `${ny}px`;
      };
      const onUp = () => {
        bar.removeEventListener('pointermove', onMove);
        bar.removeEventListener('pointerup', onUp);
      };
      bar.addEventListener('pointermove', onMove);
      bar.addEventListener('pointerup', onUp);
    });

    // Resize handles
    win.querySelectorAll('[data-resize]').forEach((handle) => {
      handle.addEventListener('pointerdown', (e) => {
        e.stopPropagation();
        focusWindow(id);
        const dir = handle.getAttribute('data-resize') || 'br';
        const startX = e.clientX;
        const startY = e.clientY;
        const origW = win.offsetWidth;
        const origH = win.offsetHeight;
        handle.setPointerCapture(e.pointerId);

        const onMove = (ev) => {
          if (dir.includes('r')) {
            win.style.width = `${Math.max(310, origW + (ev.clientX - startX))}px`;
          }
          if (dir.includes('b')) {
            win.style.height = `${Math.max(260, origH + (ev.clientY - startY))}px`;
          }
        };
        const onUp = () => {
          handle.removeEventListener('pointermove', onMove);
          handle.removeEventListener('pointerup', onUp);
        };
        handle.addEventListener('pointermove', onMove);
        handle.addEventListener('pointerup', onUp);
      });
    });
  });

  /* -------------------- Exact Old Profile Card Interactions -------------------- */
  const exactCard = document.getElementById('exact-profile-card');
  const touchMeBtn = document.getElementById('touch-me-btn');
  const flipToggleBtn = document.getElementById('profile-flip-toggle');

  touchMeBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    playSound('click');
    exactCard?.classList.toggle('is-flipped');
  });

  flipToggleBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    playSound('click');
    exactCard?.classList.toggle('is-flipped');
  });

  // Allow switching the front body section (home / about / education / skills / contact) from Settings
  document.querySelectorAll('[data-card-section]').forEach((pill) => {
    pill.addEventListener('click', () => {
      playSound('click');
      const sec = pill.getAttribute('data-card-section') || 'home';
      document.querySelectorAll('[data-card-section]').forEach((p) => p.classList.toggle('active', p === pill));
      document.querySelectorAll('#exact-profile-card .profile-body').forEach((body) => {
        body.classList.toggle('active', body.classList.contains(`profile-body--${sec}`));
      });
      exactCard?.classList.remove('is-flipped');
      openWindow('profile');
    });
  });

  /* -------------------- Desktop Shortcuts & Launchpad -------------------- */
  const LAUNCHPAD_ITEMS = [
    { title: 'Profile', icon: 'fas fa-id-badge', bg: 'linear-gradient(135deg,#5a4bd1,#a29bfe)', windowId: 'profile' },
    { title: 'Finder (Bio)', icon: 'fas fa-compass', bg: 'linear-gradient(135deg,#0984e3,#74b9ff)', windowId: 'finder' },
    { title: 'Education', icon: 'fas fa-graduation-cap', bg: 'linear-gradient(135deg,#f39c12,#f1c40f)', windowId: 'photos' },
    { title: 'Projects', icon: 'fas fa-folder-open', bg: 'linear-gradient(135deg,#00cec9,#81ecec)', windowId: 'projects' },
    { title: 'Terminal', icon: 'fas fa-terminal', bg: 'linear-gradient(135deg,#2d3436,#636e72)', windowId: 'terminal' },
    { title: 'GitHub', icon: 'fab fa-github', bg: 'linear-gradient(135deg,#24292e,#4b5563)', windowId: 'github' },
    { title: 'Instagram', icon: 'fab fa-instagram', bg: 'linear-gradient(135deg,#fd1d1d,#fcb045)', windowId: 'instagram' },
    { title: 'Mail', icon: 'fas fa-envelope', bg: 'linear-gradient(135deg,#6c5ce7,#fd79a8)', windowId: 'mail' },
    { title: 'WhatsApp', icon: 'fab fa-whatsapp', bg: 'linear-gradient(135deg,#25d366,#128c7e)', windowId: 'whatsapp' },
    { title: 'YouTube', icon: 'fab fa-youtube', bg: 'linear-gradient(135deg,#ff0000,#c0392b)', windowId: 'youtube' },
    { title: 'Settings', icon: 'fas fa-cog', bg: 'linear-gradient(135deg,#64748b,#475569)', windowId: 'settings' },
    { title: 'Bin', icon: 'fas fa-trash', bg: 'linear-gradient(135deg,#94a3b8,#64748b)', windowId: 'bin' },
  ];

  const launchpadGrid = document.getElementById('launchpad-grid');
  if (launchpadGrid) {
    LAUNCHPAD_ITEMS.forEach((item) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'launchpad-app';
      btn.innerHTML = `<span class="launchpad-app__icon" style="background:${item.bg}"><i class="${item.icon}"></i></span><span class="launchpad-app__title">${item.title}</span>`;
      btn.addEventListener('click', () => {
        closeWindow('launchpad');
        openWindow(item.windowId);
      });
      launchpadGrid.appendChild(btn);
    });
  }

  // Desktop Top-Left Shortcut Icons (Minimal: Profile & Projects only)
  const desktopShortcuts = document.getElementById('desktop-shortcuts');
  if (desktopShortcuts) {
    const shortcuts = [
      { label: 'Profile', img: 'assets/img/pro.png', windowId: 'profile' },
      { label: 'Projects', img: 'assets/icons/projects.svg', windowId: 'projects' },
    ];
    shortcuts.forEach((sc) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'desktop-shortcut';
      btn.innerHTML = `<img src="${sc.img}" alt="${sc.label}" draggable="false" /><span>${sc.label}</span>`;
      btn.addEventListener('click', () => openWindow(sc.windowId));
      desktopShortcuts.appendChild(btn);
    });
  }

  /* -------------------- Interactive Terminal -------------------- */
  const termHistoryEl = document.getElementById('terminal-history');
  const termInputEl = document.getElementById('terminal-input');
  const termBodyEl = document.getElementById('terminal-body');
  const cmdHistory = [];
  let cmdPointer = -1;

  termBodyEl?.addEventListener('click', () => termInputEl?.focus());

  function runTerminalCommand(raw) {
    const cmd = raw.trim();
    const lower = cmd.toLowerCase();
    const parts = lower.split(/\s+/);

    if (lower === 'clear') {
      if (termHistoryEl) termHistoryEl.innerHTML = '';
      return null;
    }
    if (lower === 'help') {
      return [
        'Available commands:',
        '  whoami      — Display Sunil Aryal profile summary',
        '  about       — About Sunil Aryal @ Ulsan Science University, South Korea',
        '  skills      — List technical skills & proficiency',
        '  education   — View education timeline (2021–Present)',
        '  projects    — View stats & featured projects',
        '  social      — List @rudralization social apps',
        '  contact     — Email details',
        '  card        — Open the Profile window',
        '  open <app>  — Open window (profile, finder, photos, mail, settings, github, instagram, whatsapp, youtube, projects)',
        '  theme <m>   — Switch theme (theme light | theme dark)',
        '  ls, pwd, date, uptime, uname -a, cowsay, fortune, clear',
      ].join('\n');
    }
    if (lower === 'whoami') {
      return 'Sunil Aryal (रुद्र.) — Passionate Programmer · Web Developer · IT Student @ Ulsan Science University, South Korea';
    }
    if (lower === 'about') {
      return "I'm Sunil Aryal, an IT student at Ulsan Science University in South Korea.\nPassionate about web development, database systems, and artificial intelligence.";
    }
    if (lower === 'skills') {
      return [
        '• Frontend Development  [●●●●] Advanced     (JavaScript, HTML5, CSS3)',
        '• Backend Development   [●●●○] Intermediate (Java, Python, REST APIs)',
        '• Programming Languages [●●●●] Advanced     (Python, Java, JS, C)',
        '• Database & Tools      [●●●○] Intermediate (MySQL, DB Design, Git & GitHub, Linux)',
        '• AI & Machine Learning [●●○○] Exploring    (Python, Data Analysis, Neural Nets)',
      ].join('\n');
    }
    if (lower === 'education') {
      return [
        '2025 – Present : B.Tech in Information Technology — Ulsan Science University, South Korea',
        '2023 – 2025    : External Courses — Web development, AI, and databases',
        '2021 – 2023    : Higher Secondary Education (SLC) — KMGSS, Butwal (Science)',
        '2021           : Secondary Education (SEE) — Riyale Secondary School, Gulmi (Ranked 1st locally)',
      ].join('\n');
    }
    if (lower === 'projects') {
      return '15+ Projects Completed · 8+ Technologies Learned · 3+ Years of Experience';
    }
    if (lower === 'social') {
      return [
        'GitHub    : open github    (@rudralization)',
        'Instagram : open instagram (@rudralization)',
        'WhatsApp  : open whatsapp  (@aryalsunil)',
        'YouTube   : open youtube   (@rudralization)',
      ].join('\n');
    }
    if (lower === 'contact') {
      return 'Email: aryalsunily@gmail.com';
    }
    if (lower === 'card') {
      openWindow('profile');
      return 'Opened Profile window.';
    }
    if (parts[0] === 'open' && parts[1]) {
      if (windows.has(parts[1])) {
        openWindow(parts[1]);
        return `Opened ${parts[1]}.`;
      }
      return `open: unknown app "${parts[1]}". Try: profile, finder, photos, mail, settings, github, instagram, whatsapp, youtube, projects`;
    }
    if (parts[0] === 'theme' && (parts[1] === 'dark' || parts[1] === 'light')) {
      applyTheme(parts[1]);
      return `Switched theme to ${parts[1]} mode.`;
    }
    if (lower === 'pwd') return '/Users/sunilaryal';
    if (lower === 'ls') return 'Profile.card  About.md  Education.md  Skills.json  Projects/  Contact.vcf';
    if (lower === 'date') return new Date().toString();
    if (lower === 'uptime') return 'up 365 days, 15+ projects completed, load averages: 1.42 1.18 1.05';
    if (lower === 'uname' || lower === 'uname -a') {
      return 'Darwin Sunils-MacBook-Pro.local 24.1.0 RudraOS Kernel Version 2026: arm64';
    }
    if (lower === 'fortune') {
      return '"First, solve the problem. Then, write the code." — Sunil Aryal @ Ulsan Science University';
    }
    if (lower.startsWith('cowsay')) {
      const msg = cmd.slice(6).trim() || 'Hello from Sunil Aryal!';
      return ` ${'_'.repeat(msg.length + 2)}\n< ${msg} >\n ${'-'.repeat(msg.length + 2)}\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||`;
    }
    if (lower.startsWith('echo ')) return cmd.slice(5);
    return `zsh: command not found: ${parts[0]}. Type "help" for available commands.`;
  }

  termInputEl?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = termInputEl.value;
      termInputEl.value = '';
      if (!val.trim()) return;
      cmdHistory.push(val);
      cmdPointer = -1;
      const out = runTerminalCommand(val);
      if (out !== null && termHistoryEl) {
        const entry = document.createElement('div');
        entry.className = 'terminal-entry';
        entry.innerHTML = `<div><span class="terminal-prompt">macbook@Sunils-MacBook-Pro ~ %</span><span></span></div><div class="terminal-output"></div>`;
        entry.querySelector('span:last-child').textContent = val;
        entry.querySelector('.terminal-output').textContent = out;
        termHistoryEl.appendChild(entry);
        termBodyEl.scrollTop = termBodyEl.scrollHeight;
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      cmdPointer = Math.min(cmdHistory.length - 1, cmdPointer + 1);
      termInputEl.value = cmdHistory[cmdHistory.length - 1 - cmdPointer];
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (cmdPointer <= 0) {
        cmdPointer = -1;
        termInputEl.value = '';
        return;
      }
      cmdPointer -= 1;
      termInputEl.value = cmdHistory[cmdHistory.length - 1 - cmdPointer];
    }
  });

  /* -------------------- Mail Form & In-OS Apps (WhatsApp / YouTube) -------------------- */
  const mailForm = document.getElementById('mail-form');
  mailForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    playSound('chime');
    const subject = document.getElementById('mail-subject')?.value.trim() || 'Message';
    showToast(`Message "${subject}" sent to aryalsunily@gmail.com`);
    mailForm.reset();
  });

  // In-OS WhatsApp Chat
  const waForm = document.getElementById('wa-form');
  const waInput = document.getElementById('wa-input');
  const waMessages = document.getElementById('wa-messages');
  waForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = waInput?.value.trim();
    if (!text || !waMessages) return;
    playSound('click');
    const outBubble = document.createElement('div');
    outBubble.className = 'wa-bubble wa-bubble--out';
    outBubble.textContent = text;
    waMessages.appendChild(outBubble);
    waInput.value = '';
    waMessages.scrollTop = waMessages.scrollHeight;

    setTimeout(() => {
      playSound('chime');
      const reply = document.createElement('div');
      reply.className = 'wa-bubble wa-bubble--in';
      reply.textContent = "Thanks for reaching out! I've received your message and will get back to you soon.";
      waMessages.appendChild(reply);
      waMessages.scrollTop = waMessages.scrollHeight;
    }, 550);
  });

  // In-OS YouTube Playlist Switcher
  const ytTitleEl = document.getElementById('yt-playing-title');
  const ytSubEl = document.getElementById('yt-playing-sub');
  document.querySelectorAll('.yt-video-item').forEach((btn) => {
    btn.addEventListener('click', () => {
      playSound('click');
      document.querySelectorAll('.yt-video-item').forEach((b) => b.classList.toggle('active', b === btn));
      const t = btn.getAttribute('data-yt-title');
      const s = btn.getAttribute('data-yt-sub');
      if (t && ytTitleEl) ytTitleEl.textContent = t;
      if (s && ytSubEl) ytSubEl.textContent = s;
    });
  });

  /* -------------------- Paint Studio -------------------- */
  const paintCanvas = document.getElementById('paint-canvas');
  const swatchesEl = document.getElementById('paint-swatches');
  const brushBtn = document.getElementById('paint-brush-btn');
  const eraserBtn = document.getElementById('paint-eraser-btn');
  const clearBtn = document.getElementById('paint-clear-btn');
  const sizeInput = document.getElementById('paint-size');

  const PAINT_COLORS = ['#5a4bd1', '#111115', '#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6'];
  let paintColor = PAINT_COLORS[0];
  let paintTool = 'brush';

  if (swatchesEl) {
    PAINT_COLORS.forEach((c, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = `paint-swatch ${i === 0 ? 'active' : ''}`;
      b.style.background = c;
      b.setAttribute('aria-label', `Color ${c}`);
      b.addEventListener('click', () => {
        paintColor = c;
        paintTool = 'brush';
        brushBtn?.classList.add('active');
        eraserBtn?.classList.remove('active');
        swatchesEl.querySelectorAll('.paint-swatch').forEach((s) => s.classList.toggle('active', s === b));
      });
      swatchesEl.appendChild(b);
    });
  }

  brushBtn?.addEventListener('click', () => {
    paintTool = 'brush';
    brushBtn.classList.add('active');
    eraserBtn?.classList.remove('active');
  });

  eraserBtn?.addEventListener('click', () => {
    paintTool = 'eraser';
    eraserBtn.classList.add('active');
    brushBtn?.classList.remove('active');
  });

  if (paintCanvas) {
    const ctx = paintCanvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, paintCanvas.width, paintCanvas.height);
    let drawing = false;

    const getPos = (e) => {
      const r = paintCanvas.getBoundingClientRect();
      return {
        x: ((e.clientX - r.left) / r.width) * paintCanvas.width,
        y: ((e.clientY - r.top) / r.height) * paintCanvas.height,
      };
    };

    paintCanvas.addEventListener('pointerdown', (e) => {
      drawing = true;
      const p = getPos(e);
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
    });
    paintCanvas.addEventListener('pointermove', (e) => {
      if (!drawing) return;
      const p = getPos(e);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = Number(sizeInput?.value || 5);
      ctx.strokeStyle = paintTool === 'eraser' ? '#ffffff' : paintColor;
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    });
    window.addEventListener('pointerup', () => {
      drawing = false;
    });
    clearBtn?.addEventListener('click', () => {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, paintCanvas.width, paintCanvas.height);
    });
  }

  /* -------------------- Right-Click Context Menu -------------------- */
  const ctxMenu = document.getElementById('context-menu');
  document.getElementById('desktop-stage')?.addEventListener('contextmenu', (e) => {
    if (e.target.closest('.mac-window')) return;
    e.preventDefault();
    if (!ctxMenu) return;
    ctxMenu.hidden = false;
    ctxMenu.style.left = `${Math.min(e.clientX, window.innerWidth - 240)}px`;
    ctxMenu.style.top = `${Math.min(e.clientY, window.innerHeight - 200)}px`;
  });

  window.addEventListener('click', () => {
    if (ctxMenu) ctxMenu.hidden = true;
  });

  ctxMenu?.querySelectorAll('[data-ctx-action]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const act = btn.getAttribute('data-ctx-action');
      if (act === 'open-profile') openWindow('profile');
      else if (act === 'open-finder') openWindow('finder');
      else if (act === 'open-terminal') openWindow('terminal');
      else if (act === 'toggle-theme') {
        applyTheme(document.body.classList.contains('dark') ? 'light' : 'dark');
      } else if (act === 'copy-email') {
        navigator.clipboard?.writeText('aryalsunily@gmail.com');
        showToast('Copied aryalsunily@gmail.com to clipboard');
      }
    });
  });

  /* -------------------- Cursor Effects (Falling Star Spark + Liquid Glass) -------------------- */
  let starCursorEnabled = true;
  const starToggle = document.getElementById('toggle-star-cursor');
  const glassToggle = document.getElementById('toggle-glass-cursor');
  const soundToggle = document.getElementById('toggle-sound');
  const liquidCursor = document.getElementById('liquid-cursor');

  starToggle?.addEventListener('change', () => {
    starCursorEnabled = starToggle.checked;
  });
  glassToggle?.addEventListener('change', () => {
    if (liquidCursor) liquidCursor.hidden = !glassToggle.checked;
  });
  soundToggle?.addEventListener('change', () => {
    soundEnabled = soundToggle.checked;
  });

  let prevX = -100;
  let prevY = -100;

  function spawnSpark(x, y) {
    const spark = document.createElement('div');
    spark.className = 'cursor-spark';
    const size = 2 + Math.random() * 4;
    spark.style.width = `${size}px`;
    spark.style.height = `${size}px`;
    const colors = ['#ff6b35', '#ff8c42', '#ffab73', '#ffd699'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    spark.style.background = color;
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    spark.style.boxShadow = `0 0 ${size + 2}px ${color}`;
    document.body.appendChild(spark);

    const ang = Math.random() * Math.PI * 2;
    const speed = 18 + Math.random() * 32;
    const dx = Math.cos(ang) * speed;
    const dy = Math.sin(ang) * speed;
    const t0 = performance.now();
    const dur = 280 + Math.random() * 240;

    function anim(now) {
      const t = (now - t0) / dur;
      if (t >= 1) {
        spark.remove();
        return;
      }
      spark.style.transform = `translate(${dx * t}px, ${dy * t}px)`;
      spark.style.opacity = String(1 - t);
      requestAnimationFrame(anim);
    }
    requestAnimationFrame(anim);
  }

  document.addEventListener('mousemove', (e) => {
    if (liquidCursor && !liquidCursor.hidden) {
      liquidCursor.style.transform = `translate(${e.clientX - 28}px, ${e.clientY - 28}px)`;
    }
    if (!starCursorEnabled) return;
    const dist = Math.hypot(e.clientX - prevX, e.clientY - prevY);
    if (dist > 6 && prevX >= 0) {
      spawnSpark(e.clientX, e.clientY);
    }
    prevX = e.clientX;
    prevY = e.clientY;
  });

  // Sync initial dock indicators
  syncDockDots();
})();
