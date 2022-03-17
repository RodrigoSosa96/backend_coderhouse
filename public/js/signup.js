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
        window.location.href = '/user/logout';
    });
}
//Signup-form
const signupForm = document.querySelector('#signup-form');
const signupError = document.querySelector('#signup-error');
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = {
            email: signupForm.email.value,
            password: signupForm.password.value,
            name: signupForm.name.value,
            address: signupForm.address.value,
            age: signupForm.age.value,
            phoneNumber: signupForm.phoneNumber.value,
            picture: signupForm.picture.value,
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

                        signupError.innerHTML = data.message;
                        if (!data.message) signupError.innerHTML = 'Error creando el usuario';
                    });

                }
                else {
                    signupError.classList.add('d-none');
                    signupError.classList.remove('alert');
                    signupError.classList.add('success');
                    signupError.innerHTML = 'Signup successful';
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 3000);
                }
            })
            .catch(() => {
                console.log("Error");
            });
    }
    );
}
