// carousel.js
document.querySelectorAll('.carousel').forEach(carousel => {
  const slides = carousel.querySelectorAll('.slide');

  // show first slide as in-view
  slides[0].classList.add('in-view');

  // observe each slide
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > .5) {
        entry.target.classList.add('in-view');
      } else {
        entry.target.classList.remove('in-view');
      }
    });
  }, {
    root:      carousel,
    threshold: [0.5]
  });

  slides.forEach(slide => observer.observe(slide));
});
