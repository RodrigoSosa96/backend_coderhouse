import { Socket } from "socket.io";
import db from "../index"
import Logger from "../utils/logger";


export const ioSocket = async (socket: Socket) => {
    try {
        Logger.info("Cliente conectado!");

        //  Productos
        let prodList = await db.getAll("productos");
        socket.emit("catalogo", { productos: prodList });
        socket.on("nuevo-producto", async (data) => {
            try {
                await db.addItem("productos", data);
                // productosArray.push(data);
                prodList.push(data); //? es recomendable?
                socket.emit("catalogo", { productos: prodList })
            } catch (e) {
                Logger.error('Error mandando mensaje: ', e);
            }
        });
        
        //  Mensajes
        let readChat = await db.getAll("mensajes");
        socket.emit("mensajes", { chat: readChat })
        socket.on("nuevo-mensaje", async (data) => {
            try {
                // const newMessage = Object.assign({ id: v4() }, data)
                const newMessage = {
                    email: data.email,
                    fecha: data.fecha,
                    mensaje: data.mensaje
                }
                await db.addItem("mensajes", newMessage);
                readChat.push(newMessage)
                socket.emit("mensajes", { chat: readChat })
            } catch (e) {
                Logger.warn("Error mandando mensaje: " + e)
            }
        })
    } catch (e) {
        Logger.warn('Error en ioSocket: ', e);
    }


}