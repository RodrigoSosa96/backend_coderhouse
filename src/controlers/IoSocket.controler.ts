// import { Socket } from "socket.io";
// // import { productos, mensajes } from "../models/databases";

// export const ioSocket = async (socket: Socket) => {
//     try {
//         console.log("Cliente conectado!");

//         //  Productos
//         let prodList = await productos.getItems()
//         socket.emit("catalogo", { productos: prodList });
//         socket.on("nuevo-producto", async (data) => {
//             try {
//                 await productos.newItems(data)
//                 // productosArray.push(data);
//                 prodList = await productos.getItems()
//                 socket.emit("catalogo", { productos: prodList })
//             } catch (e) {
//                 console.log('Error mandando mensaje: ', e);
//             }
//         });
        
//         //  Mensajes
//         let readChat = await mensajes.getItems()
//         socket.emit("mensajes", { chat: readChat })
//         socket.on("nuevo-mensaje", async (data) => {
//             try {
//                 // const newMessage = Object.assign({ id: v4() }, data)
//                 const newMessage = {
//                     email: data.email,
//                     fecha: data.fecha,
//                     mensaje: data.mensaje
//                 }
//                 await mensajes.newItems(newMessage)
//                 // readChat.push(newMessage)
//                 readChat = await mensajes.getItems()
//                 socket.emit("mensajes", { chat: readChat })
//             } catch (e) {
//                 console.log("Error mandando mensaje: " + e)
//             }
//         })
//     } catch (e) {
//         console.log('Error en ioSocket: ', e);
//     }


// }