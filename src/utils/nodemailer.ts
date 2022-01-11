import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: '',
        pass: ''
    }
});
const mailOptions = {
    from: 'Servidor NODE',
    to : '',
    subject: '',
    html: `<h1>Hola</h1>`
}

// ... other code