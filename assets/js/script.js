// ============================================================
// THEME TOGGLE
// ============================================================
const themeButton = document.getElementById('theme-button');
const icon = themeButton.querySelector('i');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
  document.body.classList.add('dark-theme');
  icon.className = 'fas fa-sun';
}

themeButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  const isDark = document.body.classList.contains('dark-theme');
  icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// ============================================================
// MOBILE NAV TOGGLE
// ============================================================
const navToggle = document.getElementById('nav-toggle');
const navList = document.getElementById('nav-list');

navToggle.addEventListener('click', () => {
  navList.classList.toggle('show');
});

document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    navList.classList.remove('show');
    navLinks.forEach(l => l.classList.remove('active-link'));
    link.classList.add('active-link');
  });
});

// ============================================================
// ACTIVE NAV LINK
// ============================================================
const sections = document.querySelectorAll('#home, .section');
const navLinks = document.querySelectorAll('.nav__link');
const mainEl = document.querySelector('main');

mainEl.addEventListener('scroll', () => {
  let current = 'home';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (mainEl.scrollTop >= top) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active-link', link.getAttribute('href') === '#' + current);
  });

  document.querySelectorAll('.profile-body').forEach(body => {
    body.classList.toggle('active', body.classList.contains('profile-body--' + current));
  });
});

// ============================================================
// FADE UP ENTRANCE ANIMATION
// ============================================================
const fadeEls = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

fadeEls.forEach(el => observer.observe(el));

// ============================================================
// STATS COUNTER
// ============================================================
const statEls = document.querySelectorAll('.hero__stat');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      const span = el.querySelector('.stat-num');
      let current = 0;
      const step = Math.ceil(target / 40);
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        span.textContent = current + (el.dataset.suffix || '');
      }, 30);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statEls.forEach(el => counterObserver.observe(el));

// ============================================================
// REVEAL ANIMATION (staggered via data-delay)
// ============================================================
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = parseInt(el.dataset.delay || '0');
      el.style.transitionDelay = (delay * 0.1) + 's';
      el.classList.add('visible');
      revealObserver.unobserve(el);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));

// ============================================================
// MOUSE FOLLOW GLOW ON SKILL CARDS
// ============================================================
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', x + '%');
    card.style.setProperty('--my', y + '%');
  });
});

// ============================================================
// TYPING ANIMATION
// ============================================================
const typedEl = document.querySelector('.typed-text');
const words = ['Developer', 'Programmer', 'Graphic Designer', 'Writer'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const current = words[wordIndex];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex);
    charIndex--;
    if (charIndex < 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(typeEffect, 400);
      return;
    }
    setTimeout(typeEffect, 80);
    return;
  }

  typedEl.textContent = current.substring(0, charIndex + 1);
  charIndex++;

  if (charIndex === current.length) {
    isDeleting = true;
    setTimeout(typeEffect, 1500);
    return;
  }

  setTimeout(typeEffect, 130);
}
setTimeout(typeEffect, 1500);

// ============================================================
// CURSOR — FALLING STAR
// ============================================================
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || 'ontouchstart' in window) {
  document.body.style.cursor = 'auto';
} else {
const cDot = document.createElement('div');
cDot.id = 'cursor-dot';
document.body.append(cDot);

let cx = -100, cy = -100;
let prevCx = cx, prevCy = cy;
let sparkTimer = null;

document.addEventListener('mousemove', e => {
  cx = e.clientX;
  cy = e.clientY;
  cDot.style.transform = `translate(${cx - 4}px, ${cy - 4}px)`;
  cDot.classList.remove('hide');

  const dx = cx - prevCx;
  const dy = cy - prevCy;
  const dist = Math.hypot(dx, dy);

  if (dist > 2) {
    const steps = Math.min(Math.floor(dist / 4), 5);
    for (let i = 0; i < steps; i++) {
      const t = (i + 1) / steps;
      spawnSpark(prevCx + dx * t, prevCy + dy * t);
    }
  }

  prevCx = cx;
  prevCy = cy;
});

document.addEventListener('mouseleave', () => {
  cDot.classList.add('hide');
});

document.addEventListener('mouseenter', () => {
  if (cx >= 0 && cy >= 0) return;
  cDot.classList.remove('hide');
});

function spawnSpark(x, y) {
  const spark = document.createElement('div');
  spark.className = 'cursor-spark';
  const size = 2 + Math.random() * 4;
  spark.style.width = size + 'px';
  spark.style.height = size + 'px';
  const colors = ['#ff6b35', '#ff8c42', '#ffab73', '#ffd699'];
  spark.style.background = colors[Math.floor(Math.random() * colors.length)];
  spark.style.left = x + 'px';
  spark.style.top = y + 'px';
  spark.style.boxShadow = `0 0 ${size + 2}px ${spark.style.background}`;
  document.body.append(spark);

  const ang = Math.random() * Math.PI * 2;
  const speed = 20 + Math.random() * 40;
  const dx = Math.cos(ang) * speed;
  const dy = Math.sin(ang) * speed;
  const t0 = performance.now();
  const dur = 300 + Math.random() * 300;

  function anim(now) {
    const t = (now - t0) / dur;
    if (t >= 1) { spark.remove(); return; }
    spark.style.transform = `translate(${dx * t}px, ${dy * t}px)`;
    spark.style.opacity = 1 - t;
    requestAnimationFrame(anim);
  }
  requestAnimationFrame(anim);
}
}
