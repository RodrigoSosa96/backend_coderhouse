import "dotenv/config";
import app from "./app";
import { createServer } from "http";
import mongoose from "mongoose";
// import { Server } from "socket.io";

import { serverConfig, mongoDbConfigs } from "./configs"
// import { ioSocket } from "./controllers/IoSocket.controller";
import Logger from "./utils/logger";

// const httpsOptions = {
// 	key: serverConfig.key,
// 	cert: serverConfig.cert
// }
const PORT = serverConfig.PORT

const httpsServer = createServer(app);

httpsServer.listen(PORT, async () => {
	try {
		const DB = await mongoose.connect(mongoDbConfigs.url);
		Logger.info(`MongoDB Schemas inicializados en ${DB.connection.host + ":" + DB.connection.port + "/" + DB.connection.name}`);
		Logger.info(`Servidor http escuchando en http://localhost:${PORT}. Process ID: ${process.pid}`);
	} catch (err) {
		Logger.error(err)
	}
});
