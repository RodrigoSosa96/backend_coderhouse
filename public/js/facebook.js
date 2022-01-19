const facebookButton = document.querySelector('#facebook-login');
if (facebookButton) {
    facebookButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = '/user/auth/facebook';
    });
}