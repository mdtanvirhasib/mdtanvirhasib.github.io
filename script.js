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

  /* ---------- 7. CONTACT FORM: VALIDATION + REAL EMAIL DELIVERY ---------- */
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const submitBtn = document.getElementById('formSubmitBtn');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  contactForm.addEventListener('submit', async (e) => {
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

    // Honeypot check: if this hidden field has a value, silently drop the submission.
    const honeypot = contactForm.querySelector('input[name="_honey"]');
    if (honeypot && honeypot.value) {
      contactForm.reset();
      return;
    }

    const ajaxAction = contactForm.getAttribute('data-ajax-action');
    const originalBtnText = submitBtn.textContent;

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      const response = await fetch(ajaxAction, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(contactForm)
      });

      if (response.ok) {
        showToast("Thanks! Your message has been sent — I'll get back to you soon.");
        contactForm.reset();
      } else {
        showToast("Something went wrong sending your message. Please email me directly at md.tanvirhasib11@gmail.com.");
      }
    } catch (err) {
      showToast("Network error. Please email me directly at md.tanvirhasib11@gmail.com.");
    } finally {
      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;
    }
  });

});
