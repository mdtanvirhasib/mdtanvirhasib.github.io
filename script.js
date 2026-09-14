/* =========================================================
   Md. Tanvir Hasib Fahim — Portfolio Script
========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. MOBILE NAV TOGGLE ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  function closeMenu() {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  /* Close mobile menu after selecting a section */
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  /* ---------- 2. ACTIVE NAV LINK WHILE SCROLLING ---------- */
  const sections = document.querySelectorAll('main > section, .hero');
  const navLinkEls = document.querySelectorAll('.nav-link');

  function setActiveLink() {
    let current = 'home';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinkEls.forEach(link => {
      link.classList.remove('active-link');
      const href = link.getAttribute('href').replace('#', '');
      if (href === current) {
        link.classList.add('active-link');
      }
    });
  }

  window.addEventListener('scroll', setActiveLink);
  setActiveLink();

  /* ---------- 3. NAVBAR SHADOW / BACK TO TOP VISIBILITY ---------- */
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 480) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- 4. SCROLL REVEAL ANIMATIONS ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    revealEls.forEach(el => el.classList.add('in-view'));
  } else if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* ---------- 5. CURRENT YEAR IN FOOTER ---------- */
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* ---------- 6. TOAST NOTIFICATION SYSTEM ---------- */
  const toast = document.getElementById('toast');
  let toastTimer = null;

  function showToast(message, duration = 3500) {
    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  /* ---------- 7. CONTACT FORM VALIDATION ---------- */
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';

    if (!nameInput.value.trim()) {
      nameError.textContent = 'Please enter your name.';
      valid = false;
    }

    if (!emailInput.value.trim()) {
      emailError.textContent = 'Please enter your email.';
      valid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
      emailError.textContent = 'Please enter a valid email address.';
      valid = false;
    }

    if (!messageInput.value.trim()) {
      messageError.textContent = 'Please write a short message.';
      valid = false;
    }

    if (!valid) return;

    showToast("Thanks! This form is front-end only for now — please reach me directly at md.tanvirhasib11@gmail.com.");
    contactForm.reset();
  });

});
