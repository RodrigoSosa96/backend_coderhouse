import { config } from "dotenv";
import * as path from "path";


config({ path: path.resolve(__dirname, "../../.env") });


export const serverConfig = {
	admin: true,
	hostNanme: "http://localhost:8080",
	PORT: parseInt(process.env.PORT as string),
};
