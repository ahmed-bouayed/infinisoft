// ─── PAGE NAVIGATION ───
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  const page = document.getElementById('page-' + id);
  if (page) {
    page.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const nav = document.getElementById('nav-' + id);
    if (nav) nav.classList.add('active');
    else {
      const servicesNav = document.getElementById('nav-services');
      if (servicesNav) servicesNav.classList.add('active');
    }
  }
  // Fermer le menu mobile à chaque navigation
  closeMenu();
  initFadeIn();
}

// ─── FERMER LE MENU ───
function closeMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu && mobileMenu.classList.contains('open')) {
    mobileMenu.classList.remove('open');
    const sub = document.getElementById('mobileServicesMenu');
    const arrow = document.getElementById('mobileServicesArrow');
    if (sub) sub.style.display = 'none';
    if (arrow) arrow.style.transform = '';
  }
}

// ─── HAMBURGER (toggle) ───
function toggleMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  if (!mobileMenu) return;
  if (mobileMenu.classList.contains('open')) {
    closeMenu();
  } else {
    mobileMenu.classList.add('open');
  }
}

// ─── SOUS-MENU SERVICES MOBILE ───
function toggleMobileServices(e) {
  if (e) e.stopPropagation();
  const sub = document.getElementById('mobileServicesMenu');
  const arrow = document.getElementById('mobileServicesArrow');
  if (!sub) return;
  const isOpen = sub.classList.contains('services-open');
  if (isOpen) {
    sub.classList.remove('services-open');
    sub.style.display = 'none';
    if (arrow) arrow.style.transform = '';
  } else {
    sub.classList.add('services-open');
    sub.style.display = 'block';
    if (arrow) arrow.style.transform = 'rotate(180deg)';
  }
}

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
