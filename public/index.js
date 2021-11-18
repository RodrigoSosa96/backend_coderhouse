const loginForm = document.querySelector('#login-form');
const loginButton = document.querySelector('#login-button');
const messageError = document.querySelector('.wrong-pass');
const logoutButton = document.querySelector('#logout-button');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;
    const data = {
        username,
        password,
    };
    fetch('/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            if (!res.ok) {
                messageError.classList.remove('d-none');
                console.log(res.message);

            } else {
                messageError.classList.add('d-none');
                console.log('login success');
                window.location.href = '/';
            }
        })
        .catch((err) => {
            console.log("err");
        });
});

logoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    fetch('/user/logout', {
        method: 'POST',
    })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            if (!res.ok) {
                console.log(res.message);
            } else {
                console.log(res.message);
                // window.location.reload();
            }
        })
        .catch((err) => {
            console.log("err");
        });
});