// ===== Year in footer =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Navbar: scroll class & active link =====
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function updateNav() {
  // Scrolled style
  navbar.classList.toggle('scrolled', window.scrollY > 50);

  // Active link highlighting
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// ===== Mobile menu toggle =====
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close menu when a link is clicked
navMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// Close menu with Escape key for keyboard accessibility
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && navMenu.classList.contains('open')) {
    navMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    navToggle.focus();
  }
});

// ===== Scroll-reveal (fade-up) =====
const fadeEls = document.querySelectorAll(
  '.skill-card, .project-card, .about-grid, .contact-wrapper, .section-title'
);
fadeEls.forEach(el => el.classList.add('fade-up'));

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

fadeEls.forEach(el => revealObserver.observe(el));

// ===== Contact form (client-side validation) =====
const form       = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

function showStatus(msg, isError = false) {
  formStatus.textContent = msg;
  formStatus.className   = 'form-status' + (isError ? ' error' : '');
}

form.addEventListener('submit', e => {
  e.preventDefault();
  formStatus.textContent = '';

  const nameEl    = form.elements['name'];
  const emailEl   = form.elements['email'];
  const messageEl = form.elements['message'];
  let valid = true;

  [nameEl, emailEl, messageEl].forEach(el => el.classList.remove('invalid'));

  if (!nameEl.value.trim()) {
    nameEl.classList.add('invalid');
    valid = false;
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailEl.value.trim())) {
    emailEl.classList.add('invalid');
    valid = false;
  }
  if (!messageEl.value.trim()) {
    messageEl.classList.add('invalid');
    valid = false;
  }

  if (!valid) {
    showStatus('Please fill in all fields correctly.', true);
    return;
  }

  // Simulate a successful send
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  setTimeout(() => {
    showStatus('✓ Message sent! I\'ll get back to you soon.');
    form.reset();
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
  }, 1200);
});
