const loginButton = document.querySelector('#login-button');

// Login form
const loginForm = document.querySelector('#login-form');
// const loginButton = document.querySelector('#login-button');

const messageError = document.querySelector('.wrong-pass');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = loginForm.username.value;
        const password = loginForm.password.value;
        const data = {
            username,
            password,
        };
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            // .then((res) => res.json())
            .then((res) => {
                if (!res.ok) {
                    messageError.classList.remove('d-none');
                    console.log(res.message);

                } else {
                    messageError.classList.add('d-none');

                    window.location.href = res.url
                }
            })
            .catch((err) => {
                err = JSON.parse(err);
                console.log(err);
            });
    });
}
const signupButton = document.querySelector('#signup-redirect');
if (signupButton) {
    signupButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = '/signup';
    });
}


//Logout button
const logoutButton = document.querySelector('#logout-button');
if (logoutButton) {
    logoutButton.addEventListener('click', (e) => {
        e.preventDefault();
        fetch('/logout/', {
            method: 'POST',
        })
            .then((res) => {
                if(res.ok)  window.location.href = '/';
                else console.log('logout failed');
                // window.location.href = '/';
                // window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    });
}
//Signup-form
const signupForm = document.querySelector('#signup-form');
const signupError = document.querySelector('#signup-error');
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = {
            username: signupForm.username.value,
            password: signupForm.password.value,
            email: signupForm.email.value,
            firstName: signupForm.name.value,
            lastName: signupForm.lastname.value,
        };
        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            // .then((res) => res.json())
            .then((res) => {
                if (!res.ok) {
                    res.json().then((data) => {
                        signupError.classList.remove('d-none');
                        console.log(data);
                        signupError.innerHTML = data.message;
                    });

                }
                else {
                    signupError.classList.add('d-none');
                    signupError.classList.remove('alert');
                    signupError.classList.add('success');
                    signupError.innerHTML = 'Signup successful';
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 10000 ); // 10 seconds
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
    );
}


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
