
// Login form
let loginForm = document.getElementById("login-form")

// let loginButton = document.querySelector('#login-button');
// let messageError = document.querySelector('#signup-error');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log(loginForm.username.value);
    const data = new FormData(loginForm)
    try {
        let response = await fetch('/login', {
            method: 'POST',
            body: data
        })
        let result = await response.json();
        console.log(result)

    } catch {
        console.log("error")
    }
});


async function postFormDataAsJson({ url, formData }) {

    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);

    const fetchOptions = {

        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: formDataJsonString,
    };

    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
    return response.json();
}