const serverConfig = {
	admin: true,
	hostName: "http://localhost:8080",
	mongoDB: {
		url:  process.env.MONGO_URL || "mongodb://localhost:27017/",
		options: {
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
		},
	},
	PORT: parseInt(process.env.PORT as string) || 8080,
	// key: fs.readFileSync(path.resolve(__dirname, "../../sslcert/key.pem")),
	// cert: fs.readFileSync(path.resolve(__dirname, "../../sslcert/cert.pem")),
	facebook: {
		clientID: process.env.FACEBOOK_APP_ID as string,
		clientSecret: process.env.FACEBOOK_APP_SECRET as string,
		callbackURL: process.env.FACEBOOK_APP_CALLBACK_URL as string,
	},
};

export default serverConfig;