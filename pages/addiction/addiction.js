const addictionTabs = document.querySelectorAll('.tab');
const addictionPanels = document.querySelectorAll('.tab-panel');

addictionTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    addictionTabs.forEach((item) => item.classList.remove('is-active'));
    addictionPanels.forEach((panel) => panel.classList.remove('is-active'));
    tab.classList.add('is-active');
    document.querySelector(`[data-panel="${tab.dataset.tab}"]`)?.classList.add('is-active');
  });
});
