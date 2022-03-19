const forms = document.forms
// console.log(forms["change-data"])

for (let i = 0; i < forms.length; i++) {
    forms[i].addEventListener('submit',  handleFormSubmit);
}


async function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const url = form.action;
    try {
        const formData = new FormData(form);
        let response
        if(form.enctype === "multipart/form-data") {
            response = await sendDataForm(url, formData, 'POST', form.enctype);
        }
        else  response = await sendDataForm(url, formData);
        // console.log({ response });
        form.reset();
        form.querySelector('p').classList.add('d-none');
        setTimeout(() => {
            window.location.href = '/';
        }, 2000);
        
    } catch (error) {
        console.log(error);
        form.querySelector("p").classList.remove('d-none');
    }
}


function removeEmpty(obj) {
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != ""));
}
async function sendDataForm(url, formData, method = 'POST', enctype = 'application/json') {
    try {
        let response
        if(enctype === "multipart/form-data") {
            response = await fetch(url, {
                method: method,
                body: formData
            });
        } else {
            const plainFormData = removeEmpty(Object.fromEntries(formData.entries()))
            const fetchOptions = {
                method,
                headers: {
                    'Content-Type': enctype,
                    'Accept': 'application/json'
                },
                body: JSON.stringify(plainFormData),
            };
            response = await fetch(url, fetchOptions);
        }
        if (response.statusText !== "OK" ) {
            const errorMessage = await response.text();
            throw errorMessage
        }
        return response.json();

    } catch (error) {
        throw error;
    }
}



