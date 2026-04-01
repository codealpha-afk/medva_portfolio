/**

- assets/js/script.js
- Charlyn Mae Teodoro — Portfolio
- Vanilla JS: nav, scroll reveal, sticky elements, calculator, footer year
  */

(function () {
‘use strict’;

/* ── DOM refs ── */
const header     = document.getElementById(‘site-header’);
const navToggle  = document.getElementById(‘navToggle’);
const navLinks   = document.getElementById(‘navLinks’);
const stickyCta  = document.getElementById(‘stickyCta’);
const scrollTop  = document.getElementById(‘scrollTopBtn’);
const heroSection = document.getElementById(‘home’);
const footerYear  = document.getElementById(‘footer-year’);
const contactForm = document.getElementById(‘contactForm’);

/* ══════════════════════════════════════
FOOTER YEAR
══════════════════════════════════════ */
if (footerYear) {
footerYear.textContent = new Date().getFullYear();
}

/* ══════════════════════════════════════
SMOOTH SCROLL for anchor links
══════════════════════════════════════ */
document.querySelectorAll(‘a[href^=”#”]’).forEach(function (anchor) {
anchor.addEventListener(‘click’, function (e) {
var target = document.querySelector(this.getAttribute(‘href’));
if (target) {
e.preventDefault();
var headerH = header ? header.offsetHeight : 70;
var top = target.getBoundingClientRect().top + window.pageYOffset - headerH;
window.scrollTo({ top: top, behavior: ‘smooth’ });
}
});
});

/* ══════════════════════════════════════
SCROLL EVENTS (header shadow, sticky, scroll-top)
══════════════════════════════════════ */
function onScroll() {
var y = window.pageYOffset;


/* Header shadow */
if (header) {
  header.classList.toggle('scrolled', y > 20);
}

/* Scroll-to-top button */
if (scrollTop) {
  scrollTop.classList.toggle('show', y > 400);
}

/* Sticky CTA — appears after hero is past */
if (stickyCta && heroSection) {
  var heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
  stickyCta.classList.toggle('show', y > heroBottom);
}

}

window.addEventListener(‘scroll’, onScroll, { passive: true });
onScroll(); // run once on load

/* Scroll-to-top click */
if (scrollTop) {
scrollTop.addEventListener(‘click’, function () {
window.scrollTo({ top: 0, behavior: ‘smooth’ });
});
}

/* ══════════════════════════════════════
HAMBURGER NAV
══════════════════════════════════════ */
if (navToggle && navLinks) {
navToggle.addEventListener(‘click’, function () {
var isOpen = navLinks.classList.toggle(‘open’);
navToggle.classList.toggle(‘active’, isOpen);
navToggle.setAttribute(‘aria-expanded’, isOpen ? ‘true’ : ‘false’);
});

/* Close on link click */
navLinks.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* Close on outside click */
document.addEventListener('click', function (e) {
  if (navLinks.classList.contains('open') &&
      !header.contains(e.target)) {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
  }
});

}

/* ══════════════════════════════════════
SCROLL REVEAL (IntersectionObserver)
══════════════════════════════════════ */
var revealEls = document.querySelectorAll(’.reveal-up, .reveal-left’);

if (‘IntersectionObserver’ in window && revealEls.length) {
var revealObserver = new IntersectionObserver(function (entries) {
entries.forEach(function (entry) {
if (entry.isIntersecting) {
entry.target.classList.add(‘in-view’);
revealObserver.unobserve(entry.target);
}
});
}, { threshold: 0.1, rootMargin: ‘0px 0px -48px 0px’ });


revealEls.forEach(function (el) { revealObserver.observe(el); });


} else {
/* Fallback for older browsers */
revealEls.forEach(function (el) { el.classList.add(‘in-view’); });
}

/* ══════════════════════════════════════
WORKFLOW / SAVINGS CALCULATOR
══════════════════════════════════════ */
var calcInputIds = [‘patientVolume’, ‘priorAuths’, ‘adminHours’, ‘hourlyRate’, ‘insuranceTypes’];

function getVal(id, fallback) {
var el = document.getElementById(id);
if (!el) return fallback;
return parseFloat(el.value) || fallback;
}

function setTxt(id, value) {
var el = document.getElementById(id);
if (el) el.textContent = value;
}

function updateCalculator() {
var patients       = getVal(‘patientVolume’, 150);
var priorAuths     = getVal(‘priorAuths’, 40);
var adminHours     = getVal(‘adminHours’, 40);
var hourlyRate     = getVal(‘hourlyRate’, 35);
var insuranceTypes = getVal(‘insuranceTypes’, 3);

/* Display slider values */
setTxt('patientDisplay', patients);
setTxt('priorAuthsDisplay', priorAuths);
setTxt('adminHoursDisplay', adminHours);

/* Calculations */
var timeSaving  = 0.5 + (insuranceTypes / 100);
var hoursSaved  = Math.round(adminHours * timeSaving);
var weekly      = hoursSaved * hourlyRate;
var monthly     = Math.round(weekly * 4.33);
var annual      = Math.round(weekly * 52);
var fte         = (hoursSaved / 40).toFixed(1);

setTxt('hoursSaved', hoursSaved);
setTxt('monthlySavings', monthly.toLocaleString());
setTxt('annualSavings', annual.toLocaleString());
setTxt('fteDisplay', fte);

}

calcInputIds.forEach(function (id) {
var el = document.getElementById(id);
if (el) {
el.addEventListener(‘input’, updateCalculator);
el.addEventListener(‘change’, updateCalculator);
}
});

updateCalculator(); /* init */

/* ══════════════════════════════════════
CONTACT FORM — Success message
══════════════════════════════════════ */
if (contactForm) {
/* Check for success param on load */
if (window.location.search.indexOf(‘success=true’) !== -1 ||
window.location.hash.indexOf(‘success=true’) !== -1) {
showFormSuccess();
}

contactForm.addEventListener('submit', function () {
  var btn = contactForm.querySelector('button[type="submit"]');
  if (btn) {
    btn.textContent = 'Sending…';
    btn.disabled = true;
  }
});

}

function showFormSuccess() {
var wrapper = document.querySelector(’.contact-form-wrap’);
if (!wrapper) return;
var successBanner = document.createElement(‘div’);
successBanner.style.cssText =
‘background:#EFF6FF;border:1.5px solid #60A5FA;border-radius:12px;’ +
‘padding:1.5rem;text-align:center;margin-bottom:1.5rem;color:#1E40AF;font-size:.92rem;line-height:1.6;’;
successBanner.innerHTML =
‘<strong>✅ Message received!</strong><br/>I'll get back to you within 24 hours.’;
wrapper.insertBefore(successBanner, wrapper.firstChild);
}

/* ══════════════════════════════════════
ACTIVE NAV LINK on scroll
══════════════════════════════════════ */
var sections = document.querySelectorAll(‘section[id]’);
var navAnchors = document.querySelectorAll(’.nav-links a[href^=”#”]’);

function updateActiveNav() {
var scrollPos = window.pageYOffset + (header ? header.offsetHeight + 20 : 90);
var current = ‘’;
sections.forEach(function (sec) {
if (sec.offsetTop <= scrollPos) {
current = sec.id;
}
});
navAnchors.forEach(function (a) {
var href = a.getAttribute(‘href’).replace(’#’, ‘’);
a.style.color = (href === current) ? ‘var(–blue-500)’ : ‘’;
});
}

window.addEventListener(‘scroll’, updateActiveNav, { passive: true });
updateActiveNav();

})();
