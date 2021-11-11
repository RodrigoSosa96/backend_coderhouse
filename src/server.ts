import { createServer } from "http";
import app from "./app"
import { serverConfig } from "./constants/config"

const PORT = serverConfig.PORT || 8080

const httpServer = createServer(app);
// const io = new Server(httpServer);

httpServer.listen(PORT, (): void => {
	const DIR = `http://localhost:${PORT}`;
	console.log(`Servidor corriendo en ${DIR}
Direcciones disponibles : ${DIR}/
`);
});

