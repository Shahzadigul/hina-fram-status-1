(() => {
  const gallery = document.querySelector('.gallery');
  const slides = [...gallery.querySelectorAll('.slide')];
  const controls = gallery.querySelector('.gallery-controls');
  const toggle = document.querySelector('#toggle');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0, playing = !reducedMotion.matches, timer;
  function render() {
    slides.forEach((slide, n) => { slide.hidden = n !== index; });
    document.querySelector('#counter').textContent = `${index + 1} / ${slides.length}`;
    toggle.textContent = playing ? 'Pause' : 'Spill av';
  }
  function schedule() {
    clearInterval(timer);
    if (playing && !document.hidden) timer = setInterval(() => { index = (index + 1) % slides.length; render(); }, 7000);
  }
  function move(step) { playing = false; index = (index + step + slides.length) % slides.length; render(); schedule(); }
  document.querySelector('#prev').addEventListener('click', () => move(-1));
  document.querySelector('#next').addEventListener('click', () => move(1));
  toggle.addEventListener('click', () => { playing = !playing; render(); schedule(); });
  gallery.addEventListener('mouseenter', () => clearInterval(timer));
  gallery.addEventListener('mouseleave', schedule);
  gallery.addEventListener('focusin', () => { playing = false; render(); schedule(); });
  document.addEventListener('visibilitychange', schedule);
  reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) { playing = false; render(); schedule(); } });
  controls.hidden = false;
  render(); schedule();
})();
