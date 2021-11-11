import { createServer } from "http";
import { Server, Socket } from "socket.io";

import app from "./app"
import { serverConfig } from "./constants/config"
import { ioSocket } from "./controlers/IoSocket.controler";

const PORT = serverConfig.PORT || 8080

const httpServer = createServer(app);
const io = new Server(httpServer);

httpServer.listen(PORT, (): void => {
	const DIR = `http://localhost:${PORT}`;
	console.log(`Servidor corriendo en ${DIR}
Direcciones disponibles : ${DIR}/
`);
});


io.on("connection", ioSocket)