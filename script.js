// =============================================
// NAVBAR — Scroll effect & Mobile menu
// =============================================
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');

const scrollProgress = document.getElementById('scrollProgress');
const backToTop      = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  const scrollTop  = window.scrollY;
  const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.style.width = `${(scrollTop / docHeight) * 100}%`;

  navbar.classList.toggle('scrolled', scrollTop > 20);
  backToTop.classList.toggle('visible', scrollTop > 400);
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
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

if (navLinks) {
  sections.forEach(s => navObserver.observe(s));
}

// =============================================
// ORB MOUSE PARALLAX — subtle depth effect
// =============================================
const orb1 = document.querySelector('.orb-1');
const orb2 = document.querySelector('.orb-2');

document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth  - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;

  if (orb1) {
    orb1.style.transform = `translate(${x * 18}px, ${y * 14}px)`;
  }
  if (orb2) {
    orb2.style.transform = `translate(${x * -12}px, ${y * -10}px)`;
  }
});

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