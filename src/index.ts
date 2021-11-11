import { createServer } from "http";
import { Server, Socket } from "socket.io";

import app from "./app"
import { serverConfig } from "./constants/config"
// import { ioSocket } from "./controlers/IoSocket.controler";
import DBConnection from "./models/persistence/DBConnection";
import { Database } from "./models/persistence/_AbstractClass";


const PORT = serverConfig.PORT || 8080
const db = new DBConnection(process.env.ACTIVE_PERSISTENCE as string);

const httpServer = createServer(app);
const io = new Server(httpServer);

httpServer.listen(PORT, async (): Promise<any> => {
	const DIR = `http://localhost:${PORT}`;
	console.log(`Servidor corriendo en ${DIR}`);
	db.instance.initSchemas()
		.then((res:any) => console.log(res))
		.catch((err) => console.log(err.message));
});


// io.on("connection", ioSocket)
export default db.instance;