/**
 * Charlyn Teodoro Portfolio - JavaScript
 * Handles scroll-triggered animations using Intersection Observer API
 * Performance-optimized with requestAnimationFrame
 */

document.addEventListener('DOMContentLoaded', function () {
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.08,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger animation with slight delay
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 80);

        // Stop observing once element is visible (optimization)
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all reveal elements
  document.querySelectorAll('.reveal').forEach((el) => {
    observer.observe(el);
  });
});

/**
 * Optional: Smooth scroll enhancement for links
 * (Note: CSS scroll-behavior: smooth handles most of this)
 */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
});
