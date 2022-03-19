import { Socket, Server } from "socket.io";
import { Mensaje, MensajeModel } from "../../models";
import sessionMiddleware from "../../middlewares/session.middleware";
import passport from "passport";


interface User {
    email: string;
    name: string;
    picture: string;
}

interface ServerToClient {
	"mensajes": ({ chat, user, error }: { chat: Mensaje[] | Mensaje , user: User | null, error?:string }) => void;
}

interface ClientToServer {
	"nuevo-mensaje": ({ chat, error }: { chat: string, error?:string }) => void;
}

export default class SocketController {
	private _io: Server<ClientToServer, ServerToClient>;
	constructor(io: Server) {
		this._io = io;
	}
	init() {
        const wrapper = (middleware: any) => (socket: Socket, next: Function) => middleware(socket.request, {}, next);
        this._io.use(wrapper(sessionMiddleware));
        this._io.use(wrapper(passport.initialize()));
        this._io.use(wrapper(passport.session()));
		this._io.on("connection", async (socket: Socket<ClientToServer, ServerToClient> ) => {
                try {
                    // @ts-ignore
                    const {email, name, picture}: User = socket.request.user;
                    let mensajes = await MensajeModel.find({}).lean().orFail().exec();
                    socket.emit("mensajes", { chat: mensajes, user: {email, name, picture } });
                    socket.on("nuevo-mensaje", async ({chat, error}) => {
                        try {
                            const newMessage = {
                                email,
                                fecha: new Date(),
                                body: chat,
                                tipo: "usuario"
                            }
                            console.log(newMessage);
                            const mensaje = new MensajeModel(newMessage);
                            await mensaje.save();
                            mensajes.push(mensaje);
                            this._io.emit("mensajes", { chat: [mensaje], user: {email, name, picture } });
                        } catch {
                            socket.emit("mensajes", { chat: [], user: null,  error: "Error al guardar el mensaje" });
                        }
                    });
                    socket.on("disconnect", () => {
                        mensajes = [];
                    })
                } catch(err) {
                    socket.emit("mensajes", { chat: [], user: null, error: "Error al obtener los mensajes" });
                }
			}
		);
	}
}
