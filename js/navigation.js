/**
 * navigation.js
 * Shared bottom-navigation behavior used across all main screens.
 * Highlights the active tab and wires up navigation clicks.
 */

document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('.bottom-nav__item');

  navItems.forEach((item) => {
    item.addEventListener('click', () => {
      const target = item.getAttribute('data-href');
      if (target) {
        window.location.href = target;
      }
    });

    // Mark current page as active based on data-page attribute
    const currentPage = document.body.getAttribute('data-page');
    if (item.getAttribute('data-page') === currentPage) {
      item.classList.add('is-active');
    }
  });
});

/**
 * Helper used by inline "back" buttons across screens.
 */
function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = '/pages/home/home.html';
  }
}
