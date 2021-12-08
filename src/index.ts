import "dotenv/config"
import app from "./app"
import { createServer } from "https";
// import { createServer } from "http";
// import { Server } from "socket.io";
import fs from "fs";
import cluster from "cluster";
import os from "os";

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
if (process.argv[3] === "CLUSTER" && cluster.isPrimary) {
	const cpuCount = os.cpus().length;
	Logger.info(`Cantidad de CPUs: ${cpuCount}`);
	Logger.info(`Master PID ${process.pid} is running`);

	for (let i = 0; i < cpuCount; i++) {
		cluster.fork();
	}
	cluster.on("exit", (worker, code, signal) => {
		Logger.error(`Worker ${worker.process.pid} died`);
		cluster.fork();
	});
} else {
	const httpsServer = createServer(httpsOptions, app);

	httpsServer.listen(PORT, async (): Promise<any> => {
		try {
			Logger.info(`Servidor http escuchando en el puerto ${PORT}. `, `Process ID: ${process.pid}`);
			await db.instance.initSchemas()
		} catch (err: any) {
			Logger.error(err.message)
		}
	});
}

// Test loggers
Logger.info("Información");
Logger.debug("Debug");
Logger.warn("Advertencia");
Logger.error("Error");

export default db.instance;