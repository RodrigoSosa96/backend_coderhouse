// Boton pagina de error
const backButton = document.querySelector('#back-button');
if (backButton) {
    backButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (document.referrer.length > 0) {
            window.history.back();
        } else {
            window.location.href = '/';
        }
    });
}