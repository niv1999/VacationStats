// JS for the welcome page:
// ----------------------------

// Add/remove the ".active" class to alter what form the user sees:
const container = document.querySelector('.container');

function changeToLogin() {
    container.classList.add('active');
}

function changeToRegister() {
    container.classList.remove('active');
}
