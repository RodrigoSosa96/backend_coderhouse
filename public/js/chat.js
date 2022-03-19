const socket = io();
const chat = document.forms["chat"]

chat.addEventListener('submit',  handleChat);

async function handleChat(e) {
	e.preventDefault();
	const form = e.currentTarget;
	const readForm = new FormData(form);
	const message = {
		chat: readForm.get('mensaje')
	}
	console.log(message)
	socket.emit('nuevo-mensaje', message);
	form.reset();
		
}
socket.on("mensajes", ({chat, user, error}) => {
	console.log(chat);
	console.log(user);
	render(chat, user)
	if (error) {
		console.log(error)
	}
})


const messages = document.querySelector("#messages")
function render(chat) {
	let fragment = new DocumentFragment();
	chat.forEach(message => {
		const messageElement = document.createElement("p");
		const email = document.createElement('p');
		email.textContent = message.email;
		const text = document.createElement('p');
		text.textContent = message.body;
		messageElement.appendChild(email);
		messageElement.appendChild(text);
		fragment.appendChild(messageElement);
	})
	messages.appendChild(fragment);
}
