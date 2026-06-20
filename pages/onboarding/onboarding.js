/**
 * onboarding.js
 * Controls the 4-slide onboarding carousel: next/skip navigation
 * and dot indicator sync.
 */

let currentSlide = 0;
const TOTAL_SLIDES = 4;

const slides = document.querySelectorAll('.onboarding__slide');
const dots = document.querySelectorAll('.dot');
const nextBtn = document.getElementById('nextBtn');
const skipBtn = document.getElementById('skipBtn');

function renderSlide() {
  slides.forEach((slide, i) => slide.classList.toggle('is-active', i === currentSlide));
  dots.forEach((dot, i) => dot.classList.toggle('is-active', i === currentSlide));
  nextBtn.textContent = currentSlide === TOTAL_SLIDES - 1 ? 'ابدأ الآن' : 'التالي';
}

function goToAuth() {
  Storage.set('khotwa_seen_onboarding', true);
  window.location.href = '../auth/login.html';
}

nextBtn.addEventListener('click', () => {
  if (currentSlide < TOTAL_SLIDES - 1) {
    currentSlide += 1;
    renderSlide();
  } else {
    goToAuth();
  }
});

skipBtn.addEventListener('click', goToAuth);

renderSlide();
