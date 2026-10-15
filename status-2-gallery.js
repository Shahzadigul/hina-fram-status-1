(() => {
 const gallery = document.querySelector('.work-gallery');
 const slides = [...gallery.querySelectorAll('.work-slide')];
 let current = 0;
 function show() { slides.forEach((slide,i) => {slide.hidden = i !== current;}); document.querySelector('#work-count').textContent = `${current+1} / ${slides.length}`; }
 document.querySelector('#work-prev').addEventListener('click',()=>{current=(current-1+slides.length)%slides.length;show();});
 document.querySelector('#work-next').addEventListener('click',()=>{current=(current+1)%slides.length;show();});
 gallery.querySelector('.work-controls').hidden=false;show();
})();