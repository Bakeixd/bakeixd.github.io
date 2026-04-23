document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  document.querySelectorAll('a[href]').forEach(link => {
    const url = link.getAttribute('href');
    if (url && !url.startsWith('#')) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });

  let triggered = false;

  window.addEventListener('wheel', (e) => {
    const hero = document.querySelector('.hero');
    const about = document.getElementById('about');

    if (!hero || !about) return;

    const heroBottom = hero.offsetTop + hero.offsetHeight;
    const isInHero = window.scrollY < heroBottom - 50;

    if (isInHero) {
      if (!triggered && e.deltaY > 0) {
        triggered = true;
        about.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      triggered = false;
    }

  }, { passive: true });

});

