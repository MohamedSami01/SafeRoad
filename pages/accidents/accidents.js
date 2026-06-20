/**
 * accidents.js
 * Controls tab switching on the accidents listing screen
 * (Videos / Real Stories / Tips / Statistics).
 */

const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.tab-panel');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const targetPanel = tab.getAttribute('data-tab');

    tabs.forEach((t) => t.classList.remove('is-active'));
    panels.forEach((p) => p.classList.remove('is-active'));

    tab.classList.add('is-active');
    document.querySelector(`.tab-panel[data-panel="${targetPanel}"]`)?.classList.add('is-active');
  });
});
