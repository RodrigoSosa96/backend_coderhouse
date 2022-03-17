import "dotenv/config";
import app from "./app";
import { createServer } from "http";
import mongoose from "mongoose";
// import { Server } from "socket.io";

import { serverConfig } from "./configs"
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
		const DB = await mongoose.connect(serverConfig.mongoDB.url);
		Logger.info(`MongoDB Schemas inicializados en ${DB.connection.host + ":" + DB.connection.port + "/" + DB.connection.name}`);
		Logger.info(`Servidor http escuchando en http://localhost:${PORT}. Process ID: ${process.pid}`);
	} catch (err) {
		Logger.error(err)
	}
});

const exitGracefully = () => {
	Logger.debug('SIGTERM signal received.');
	Logger.debug('Closing http server.');
	httpsServer.close(() => {
		Logger.debug('Http server closed.');
		// boolean means [force], see in mongoose doc
		mongoose.connection.close(false, () => {
			Logger.debug('MongoDb connection closed.');
			process.exit(0);
		});
	});
}

process.on('SIGTERM', exitGracefully);
process.on('SIGINT', exitGracefully);
