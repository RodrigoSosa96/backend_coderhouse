const loginButton = document.querySelector('#login-button');

// Login form
const loginForm = document.querySelector('#login-form');
// const loginButton = document.querySelector('#login-button');

const messageError = document.querySelector('#signup-error');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        console.log("loginForm");
        e.preventDefault();
        const data = {
            username: loginForm.email.value,
            password: loginForm.password.value,
        };
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((res) => {
                if (!res.ok) {
                    messageError.classList.remove('d-none');
                    messageError.innerHTML = res.message || "Error iniciando sesión";
                } else {
                    messageError.classList.add('d-none');
                    //success class
                    messageError.classList.add('success');
                    messageError.innerHTML = 'Bienvenido';
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 3000);
                }
            })
            .catch(() => {
                messageError.classList.add('d-none');
                messageError.innerHTML = 'Error iniciando sesión';

            });
    });
}