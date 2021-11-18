// const login_form = document.querySelector('#loginForm');

// // enviar formulario login por ajax
// login_form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const form = new FormData(login_form);
//     const url = login_form.getAttribute('action');
//     const method = login_form.getAttribute('method');
//     const data = {};
//     form.forEach((value, key) => {
//         data[key] = value;
//     });
//     fetch(url, {
//         method: method,
//         body: JSON.stringify(data),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//         .then(response => response.json())
//         .then(data => {
//             // if (data.status === 'success') {
//             //     window.location.href = data.url;
//             // } else {
//             //     alert(data.message);
//             // }
//             console.log(data);
//         })
//         .catch(error => console.log(JSON.stringify(error)));
        
// });