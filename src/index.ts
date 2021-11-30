import "dotenv/config"
import app from "./app"
import { createServer } from "https";
// import { createServer } from "http";
import { Server } from "socket.io";
import fs from "fs";

import { serverConfig } from "./configs"
import { ioSocket } from "./controllers/IoSocket.controller";
import DBConnection from "./models/persistence/DBConnection";

const httpsOptions = {
	key: serverConfig.key,
	cert: serverConfig.cert
}
const PORT = serverConfig.PORT || 8080
const db = new DBConnection(process.env.ACTIVE_PERSISTENCE as string);

const httpsServer = createServer(httpsOptions, app);

// TODO: socket.io
const io = new Server(httpsServer);

httpsServer.listen(PORT, async (): Promise<any> => {
	const DIR = `https://localhost:${PORT}`;
	console.log(`Servidor corriendo en ${DIR}`);
	db.instance.initSchemas()
		.then((res: any) => console.log(res))
		.catch((err) => console.log(err.message));
});


// io.on("connection", ioSocket)
export default db.instance;