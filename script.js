const navToggle = document.querySelector('.nav-toggle');
const primaryNav = document.querySelector('.primary-nav');
const navLinks = primaryNav?.querySelectorAll('a') ?? [];

function setNavigation(open) {
  if (!navToggle || !primaryNav) return;

  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.querySelector('.sr-only').textContent = open
    ? 'Close navigation menu'
    : 'Open navigation menu';
  primaryNav.classList.toggle('is-open', open);
  document.body.classList.toggle('nav-open', open);
}

navToggle?.addEventListener('click', () => {
  setNavigation(navToggle.getAttribute('aria-expanded') !== 'true');
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => setNavigation(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navToggle?.getAttribute('aria-expanded') === 'true') {
    setNavigation(false);
    navToggle.focus();
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 960) setNavigation(false);
});

document.querySelectorAll('.faq-question').forEach((button) => {
  button.addEventListener('click', () => {
    const isOpen = button.getAttribute('aria-expanded') === 'true';
    const answerId = button.getAttribute('aria-controls');
    const answer = answerId ? document.getElementById(answerId) : null;

    button.setAttribute('aria-expanded', String(!isOpen));
    if (answer) answer.hidden = isOpen;
  });
});

const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();
