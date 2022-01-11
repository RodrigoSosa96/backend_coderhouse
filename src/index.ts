import "dotenv/config";
import app from "./app";
import { createServer } from "http";
// import { Server } from "socket.io";

import { serverConfig } from "./configs"
// import { ioSocket } from "./controllers/IoSocket.controller";
import DBConnection from "./models/persistence/DBConnection";
import Logger from "./utils/logger";

// const httpsOptions = {
// 	key: serverConfig.key,
// 	cert: serverConfig.cert
// }
const PORT = serverConfig.PORT
const db = new DBConnection(process.env.ACTIVE_PERSISTENCE!);


const httpsServer = createServer(app);

httpsServer.listen(PORT, async () => {
	try {
		Logger.info(`Servidor http escuchando en http://localhost:${PORT}. Process ID: ${process.pid}`);
		const mongo = await db.instance.initSchemas()
		Logger.info(mongo);
	} catch (err) {
		Logger.error(err)
	}
});

export default db.instance;