/**
 * splash.js
 * Auto-redirects to onboarding after a short delay.
 * In production, this is also where you'd check auth state
 * and route returning users straight to home.html.
 */

const SPLASH_DURATION_MS = 2200;

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const hasSeenOnboarding = Storage?.get?.('khotwa_seen_onboarding', false);
    window.location.href = hasSeenOnboarding
      ? '../home/home.html'
      : './onboarding.html';
  }, SPLASH_DURATION_MS);
});
