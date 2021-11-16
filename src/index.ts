import "dotenv/config"
import app from "./app"
import { createServer } from "http";
import { Server } from "socket.io";
import { serverConfig } from "./configs"
import { ioSocket } from "./controllers/IoSocket.controller";
import DBConnection from "./models/persistence/DBConnection";


const PORT = serverConfig.PORT || 8080
const db = new DBConnection(process.env.ACTIVE_PERSISTENCE as string);

const httpServer = createServer(app);
const io = new Server(httpServer);

httpServer.listen(PORT, async (): Promise<any> => {
	const DIR = `http://localhost:${PORT}`;
	console.log(`Servidor corriendo en ${DIR}`);
	db.instance.initSchemas()
		.then((res: any) => console.log(res))
		.catch((err) => console.log(err.message));
});


// io.on("connection", ioSocket)
export default db.instance;