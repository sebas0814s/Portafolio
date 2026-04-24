// =============================================
// NAVBAR — Scroll effect & Mobile menu
// =============================================
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// =============================================
// TYPED TEXT — Hero subtitle animation
// =============================================
const phrases = [
  'Analista QA',
  'Testing Automation',
  'Software Developer',
  'Problem Solver',
];

const typedEl = document.getElementById('typed');
let phraseIndex  = 0;
let charIndex    = 0;
let isDeleting   = false;
let typingSpeed  = 90;

function type() {
  const current = phrases[phraseIndex];

  if (isDeleting) {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    typingSpeed = 90;
  }

  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    typingSpeed = 1800;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingSpeed = 400;
  }

  setTimeout(type, typingSpeed);
}

setTimeout(type, 800);

// =============================================
// SCROLL REVEAL — Animate elements on scroll
// =============================================
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll(
  '.skill-card, .project-card, .timeline-item, .reveal'
).forEach(el => revealObserver.observe(el));

// =============================================
// ACTIVE NAV LINK — Highlight current section
// =============================================
const sections = document.querySelectorAll('section[id]');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.querySelectorAll('a').forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}`
            ? 'var(--accent)'
            : '';
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => navObserver.observe(s));

// =============================================
// COPY EMAIL TO CLIPBOARD
// =============================================
function copyEmail() {
  const email    = document.getElementById('emailText').textContent;
  const feedback = document.getElementById('copyFeedback');
  const btn      = document.getElementById('copyBtn');

  navigator.clipboard.writeText(email).then(() => {
    feedback.classList.add('show');
    btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;

    setTimeout(() => {
      feedback.classList.remove('show');
      btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
    }, 2000);
  });
}

// =============================================
// SMOOTH HOVER on code window
// =============================================
const codeWindow = document.querySelector('.code-window');
if (codeWindow) {
  codeWindow.addEventListener('mousemove', (e) => {
    const rect = codeWindow.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 8;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 8;
    codeWindow.style.transform = `perspective(800px) rotateX(${-y}deg) rotateY(${x}deg)`;
  });

  codeWindow.addEventListener('mouseleave', () => {
    codeWindow.style.transform = '';
  });
}
