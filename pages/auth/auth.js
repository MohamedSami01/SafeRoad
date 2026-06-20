/**
 * auth.js
 * Handles login, signup, and guest-mode flows.
 * This is front-end boilerplate: form submission is intercepted
 * and mocked via localStorage. Replace with real API calls later.
 */

const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const guestBtn = document.getElementById('guestBtn');

function goToHome() {
  window.location.href = '../home/home.html';
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailOrPhone = document.getElementById('emailOrPhone').value.trim();

    const registered = Storage.get('khotwa_registered_user');
    const name = registered?.identifier === emailOrPhone ? registered.name : 'مستخدم';
    Storage.set(Storage.KEYS.USER, { name, identifier: emailOrPhone, isGuest: false });
    goToHome();
  });
}

if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fullName = document.getElementById('fullName').value.trim();
    const emailOrPhone = document.getElementById('emailOrPhone').value.trim();

    const user = { name: fullName, identifier: emailOrPhone, isGuest: false };
    Storage.set('khotwa_registered_user', user);
    Storage.set(Storage.KEYS.USER, user);
    goToHome();
  });
}

if (guestBtn) {
  guestBtn.addEventListener('click', () => {
    Storage.set(Storage.KEYS.USER, { name: 'زائر', isGuest: true });
    goToHome();
  });
}
