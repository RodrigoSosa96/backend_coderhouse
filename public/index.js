let socket = io();
const form = document.querySelector("form");

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

const renderMensajes = (data) => {
	let html = data.chat
		.map(
			(e) => `
            <p><strong>${e.email}</strong><em>[${e.fecha}] : </em> ${e.mensaje} </p>
        `
		)
		.join("\n");
	document.getElementById("chat").innerHTML = html;
};

const chatForm = document.getElementById("chatForm");
chatForm.addEventListener("submit", (e) => {
	e.preventDefault();
	let chat = {
		email: document.getElementById("email").value,
		fecha: moment().format("DD/MM/YYYY HH:mm:ss"),
		mensaje: document.getElementById("mensaje").value,
	};
	socket.emit("nuevo-mensaje", chat);
});
