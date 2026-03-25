/**
 * Charlyn Teodoro Portfolio - JavaScript
 * Handles scroll-triggered animations and UI interactions
 */

document.addEventListener('DOMContentLoaded', function () {
  
  // 1. Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.08,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger animation with slight delay for groups of elements
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 80);

        // Optimization: Stop observing once element is visible
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with the .reveal class
  document.querySelectorAll('.reveal').forEach((el) => {
    observer.observe(el);
  });

  // 2. Smooth scroll enhancement for anchor links
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
});
