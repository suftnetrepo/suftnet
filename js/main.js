// SUFTNET — shared JS

document.addEventListener('DOMContentLoaded', () => {

  // Mark active nav link
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

  // Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        const delay = e.target.dataset.delay || (i * 80);
        setTimeout(() => e.target.classList.add('visible'), parseInt(delay));
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Nav scroll shadow
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      nav?.classList.add('scrolled');
    } else {
      nav?.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      burger.classList.toggle('open');
    });
  }

  // Counter animation
  document.querySelectorAll('.count-up').forEach(el => {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const tick = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    io.observe(el);
  });

});
