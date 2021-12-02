import "dotenv/config"
import app from "./app"
import { createServer } from "https";
// import { createServer } from "http";
import { Server } from "socket.io";
import fs from "fs";
import cluster from "cluster";
import os from "os";

import { serverConfig } from "./configs"
import { ioSocket } from "./controllers/IoSocket.controller";
import DBConnection from "./models/persistence/DBConnection";

const httpsOptions = {
	key: serverConfig.key,
	cert: serverConfig.cert
}
const PORT = serverConfig.PORT || 8080
const db = new DBConnection(process.env.ACTIVE_PERSISTENCE as string);
const CLUSTER_MODE = process.argv[5] || "FORK"
if (CLUSTER_MODE === "CLUSTER" && cluster.isPrimary) {
	const cpuCount = os.cpus().length;
	console.log(`Cantidad de CPUs: ${cpuCount}`);
	console.log(`Master PID ${process.pid} is running`);

	for (let i = 0; i < cpuCount; i++) {
		cluster.fork();
	}
	cluster.on("exit", (worker, code, signal) => {
		console.log(`Worker ${worker.process.pid} died`);
		cluster.fork();
	});
} else {
	const httpsServer = createServer(httpsOptions, app);

	httpsServer.listen(PORT, async (): Promise<any> => {
		try {
			console.log(`Servidor http escuchando en el puerto ${PORT}. `, `Process ID: ${process.pid}`);
			await db.instance.initSchemas()
		} catch (err: any) {
			console.log(err.message)
		}
	});
}

export default db.instance;