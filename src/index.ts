import "dotenv/config";
import app from "./app";
import { createServer } from "https";
// import { Server } from "socket.io";

import { serverConfig } from "./configs"
import { ioSocket } from "./controllers/IoSocket.controller";
import DBConnection from "./models/persistence/DBConnection";
import Logger from "./utils/logger";

const httpsOptions = {
	key: serverConfig.key,
	cert: serverConfig.cert
}
const PORT = serverConfig.PORT
const db = new DBConnection(process.env.ACTIVE_PERSISTENCE as string);



const httpsServer = createServer(httpsOptions, app);

httpsServer.listen(PORT, async () => {
	try {
		Logger.info(`Servidor http escuchando en el puerto ${PORT}. Process ID: ${process.pid}`);
		await db.instance.initSchemas()
	} catch (err: any) {
		Logger.error(err.message)
	}
});

export default db.instance;