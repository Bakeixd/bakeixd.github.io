document.addEventListener('DOMContentLoaded', function(){

  const tabs = document.querySelectorAll('.work-tab li');
  const grids = document.querySelectorAll('.work-grid');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {

      tabs.forEach(t => t.classList.remove('on'));
      tab.classList.add('on');

      grids.forEach(g => g.classList.remove('active'));
      const target = document.getElementById(tab.dataset.tab);
      if (target) target.classList.add('active');

    });
  });


  const sections = document.querySelectorAll('.section');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(el => observer.observe(el));
  sections.forEach(section => section.classList.add('show'));


  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const images = document.querySelectorAll('.work-images img, .mockup-area img, .leaflet-sub img, .leaflet-main img');

  if (modal && modalImg) {

    images.forEach(img => {
      img.addEventListener('click', () => {
        modal.classList.add('active');
        modalImg.src = img.src;
      });
    });

    modal.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        modal.classList.remove('active');
      }
    });

  }


  const hotspots = document.querySelectorAll(".hotspot");

  hotspots.forEach(h => {

    const zoomImg = h.querySelector(".zoom-img");
    const wrap = h.closest(".hotspot-wrap");
    const origin = wrap.querySelector(".origin-img");

    if (!zoomImg || !origin) return;

    h.addEventListener("mouseenter", () => {

      const x = parseFloat(h.dataset.x) || 0;
      const y = parseFloat(h.dataset.y) || 0;
      const zoom = parseFloat(h.dataset.zoom) || 2;

      zoomImg.src = origin.src;
      zoomImg.style.transform = `scale(${zoom})`;

      zoomImg.style.left = `-${x * zoom}px`;
      zoomImg.style.top = `-${y * zoom}px`;

    });

  });


  const wrap = document.querySelector(".hotspot-wrap");

  if (wrap) {
    wrap.addEventListener("click", function(e) {

      if (e.target.closest(".hotspot")) return;

      const rect = wrap.getBoundingClientRect();

      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      console.log(`top:${y.toFixed(2)}%; left:${x.toFixed(2)}%`);
    });
  }

});

