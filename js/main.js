// ─── FADE-IN OBSERVER ───
function initFadeIn() {
  setTimeout(() => {
    const activePage = document.querySelector('.page.active');
    if (!activePage) return;
    const els = activePage.querySelectorAll('.fade-in');
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.1 });
      els.forEach(el => obs.observe(el));
    } else {
      els.forEach(el => el.classList.add('visible'));
    }
  }, 50);
}

// ─── COUNTER ANIMATION ───
function animateCounters() {
  document.querySelectorAll('.stat-num,.num').forEach(el => {
    const target = parseInt(el.textContent);
    if (isNaN(target)) return;
    const suffix = el.textContent.replace(/[0-9]/g, '');
    let current = 0;
    const step = target / 40;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current) + suffix;
      if (current >= target) clearInterval(timer);
    }, 30);
  });
}

// ─── INIT ───
document.addEventListener('DOMContentLoaded', () => {
  initFadeIn();
  animateCounters();
});
