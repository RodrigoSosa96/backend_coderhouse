let socket = io();
const form = document.querySelector("#form-productos");

form.addEventListener("submit", (e) => {
	e.preventDefault();
	let mensaje = {
		title: document.getElementById("title").value,
		price: document.getElementById("price").value,
		thumbnail: document.getElementById("thumbnail").value,
	};
	socket.emit("nuevo-producto", mensaje);
});

socket.on("catalogo", (data) => {
	render(data);
});

let render = (data) => {
	console.log(data.productos.length);
	if (data.productos.length > 0) {
		let html = data.productos
			.map(
				(e) => `
        <tr>
            <th scope="row">${e.id ?? 0} </th>
            <td class="w-25">
                <img
                    src=${e.thumbnail}
                    class="img-fluid img-thumbnail"
                    alt="${e.title}"
                />
            </td>
            <td>${e.title}</td>
            <td>${e.price}</td>
        </tr>`
			)
			.join(" ");
		document.getElementById("catalogoProductos").innerHTML = html;
	} else {
		console.log("Error al cargar archivos");
	}
};

socket.on("mensajes", (data) => {
	renderMensajes(data);
});

const schemaAuthor = new normalizr.schema.Entity('author', {}, { idAttribute: 'email' });
const schemaMessage = new normalizr.schema.Entity('message', { author: schemaAuthor }, { idAttribute: '_id' });
const schemaChat = new normalizr.schema.Array(schemaMessage);
const renderMensajes = (data) => {
	const denormalizedData = normalizr.denormalize(data.chat.result, schemaChat, data.entities);

	let html = denormalizedData
		.map(
			(e) => `
            <p><strong>${e.author.email}</strong><em>[${e.author.nombre} ${e.author.apellido}. ${e.author.edad} años: Alias ${e.author.alias}] : </em> ${e.mensaje} </p>
        `
		)
		.join("\n");
	document.getElementById("chat").innerHTML = html;
};
var mensaje = {
	author: {
		email: 'mail del usuario',
		nombre: 'nombre del usuario',
		apellido: 'apellido del usuario',
		edad: 'edad del usuario',
		alias: 'alias del usuario',
		avatar: 'url avatar (foto, logo) del usuario'
	},
	text: 'mensaje del usuario'
}
const chatForm = document.getElementById("chatForm");
chatForm.addEventListener("submit", (e) => {
	e.preventDefault();
	let chat = {
		author: {
			email: document.getElementById("email").value,
			nombre: document.getElementById("nombre").value,
			apellido: document.getElementById("apellido").value,
			edad: document.getElementById("edad").value,
			alias: document.getElementById("alias").value,
			avatar: document.getElementById("avatar").value
		},
		mensaje: document.getElementById("mensaje").value,
	};
	socket.emit("nuevo-mensaje", chat);
});


const login = document.getElementById("formLogin");
login.addEventListener("submit", (e) => {
	e.preventDefault();
	fetch('http://localhost:3000/user/login?' + new URLSearchParams({
		email: document.getElementById("email").value,
		password: document.getElementById("password").value
	}))
		// .then(res => res.json())
		// .then(data => {
		// 	if (data.success) {
		// 		localStorage.setItem('token', data.token);
		// 		window.location.href = 'http://localhost:3000/';
		// 	} else {
		// 		alert('Error al iniciar sesión');
		// 	}
		// });
});
