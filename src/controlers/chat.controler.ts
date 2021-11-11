import { knex } from "knex";
import { Socket } from "socket.io";
import { v4 } from "uuid";

import { options } from "../options/databases";
import { PRODUCTOSA } from "../backups";

const sqlite = knex(options.sqlite3)
const maridb = knex(options.mariaDB)

export const ioSocket = async (socket: Socket) => {
    try {
        console.log("Cliente conectado!");

        await maridb.schema.createTableIfNotExists("productos", (table) => {
            table.increments("id"),
            table.string("title", 20),
            table.float("price"),
            table.string("thumbnail", 200)
        })

        let productos = await maridb.from("productos").select("*")

        socket.emit("catalogo", { productos: productos });

        socket.on("nuevo-producto",async (data) => {
            try {
                // productos.push(data);
                await maridb("productos").insert(data)
                // io.sockets.emit("catalogo", { productos: PRODUCTOSA }); //? revisar
                productos = await maridb.from("productos").select("*")
                socket.emit("catalogo", { productos: productos });
            } catch (e) {
                console.log('Error en proceso:', e);

            } finally {
                sqlite.destroy()
            }
        });



        await sqlite.schema.createTableIfNotExists("chat", (table) => {
            table.increments("id"),
                table.string("email", 100),
                table.string("fecha", 20),
                table.string("mensaje", 200)
        });
        const readChat = await sqlite.from("chat").select("*")

        console.log(readChat.length)

        socket.emit("mensajes", { chat: readChat });
        socket.on("nuevo-mensaje", async (data) => {
            try {
                const newMessage = Object.assign({ id: v4() }, data)
                readChat.push(newMessage)
                await sqlite("chat").insert(newMessage)
                socket.emit("mensajes", { chat: readChat })

            } catch (e) {
                console.log('Error en proceso:', e);

            } finally {
                sqlite.destroy()
            }

        });




    } catch (e) {
        console.log('Error en proceso:', e);

    } finally {
        sqlite.destroy()
    }


}