import { config } from "dotenv";
import * as path from "path";
import fs from "fs";

config({ path: path.resolve(__dirname, "../../.env") });

const serverConfig = {
	admin: true,
	hostNanme: "http://localhost:8080",
	PORT: parseInt(process.env.PORT as string),
	key: fs.readFileSync(path.resolve(__dirname, "../../sslcert/key.pem")),
	cert: fs.readFileSync(path.resolve(__dirname, "../../sslcert/cert.pem")),
	facebook: {
		clientID: process.env.FACEBOOK_APP_ID as string,
		clientSecret: process.env.FACEBOOK_APP_SECRET as string,
		callbackURL: process.env.FACEBOOK_APP_CALLBACK_URL as string,
	},
};

export default serverConfig;