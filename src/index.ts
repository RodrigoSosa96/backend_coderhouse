import "dotenv/config";
import app from "./app";
import { createServer } from "http";
// import { Server } from "socket.io";

import { serverConfig } from "./configs"
// import { ioSocket } from "./controllers/IoSocket.controller";
import DBConnection from "./models/persistence/DBConnection";
import Logger from "./utils/logger";
import minimist from "minimist";


// const httpsOptions = {
// 	key: serverConfig.key,
// 	cert: serverConfig.cert
// }
const PORT = serverConfig.PORT

const argv = minimist(process.argv.slice(2));
const dbType = argv.dbType || 0;
console.log(`dbType: ${dbType}`);


const db = DBConnection.getInstance(dbType);


const httpsServer = createServer(app);

httpsServer.listen(PORT, async () => {
	try {
		Logger.info(`Servidor http escuchando en http://localhost:${PORT}. Process ID: ${process.pid}`);
		const mongo = await db.initSchemas()
		Logger.info(mongo);
	} catch (err) {
		Logger.error(err)
	}
});

export default db;