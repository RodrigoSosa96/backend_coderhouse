import Express, { Application, NextFunction, Request, response, Response } from "express";
import handlebars from "express-handlebars";
import cookieParser from 'cookie-parser';
import MongoStore from "connect-mongo";
import session from "express-session";
import flash from "connect-flash";
import passport from "passport";
import path from "path";
import { fork } from "child_process";
import compression from "compression";

//	*Import de Routers
import routerCarrito from "./routes/api/carrito.routes";
import routerProductos from "./routes/api/productos.routes";
import routerMockData from "./routes/api/mockData.routes";
import routerUsuarios from "./routes/user/user.router";

//	*Varios
import auth from "./middlewares/auth.middleware";
import mongoConfig from "./configs/mongoDB.config";
import User from "./models/user/user.model";


const app: Application = Express();
/**
 ** Middlewares
 */
app.use(compression())
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));


// app.use((req: Request, res: Response, next: NextFunction) => {
// 	if (req.session?.contador ) {
// 		// res.locals.logged = req.session.logged;
// 		req.session.contador++;
// 		next();
// 	} else {
// 		next();
// 	}
// });

app.use(cookieParser());
app.use(session({
	store: new MongoStore({
		mongoUrl: mongoConfig.atlasUrl
	}),
	secret: process.env.SECRET_KEY as string,
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 600000 // 10 minutos
	}
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
passport.serializeUser((user: any, done) => {
	done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findById(id);
		done(null, user);
	}
	catch (err) {
		done(null, false);
	}
});


/**
 * * Rutas
 */

app.use(Express.static(path.join(__dirname, "../public")));
app.use("/productos", routerProductos);
app.use("/carrito", routerCarrito);
app.use("/mockdata", routerMockData);
app.use("/user", routerUsuarios);



//* Motor de plantillas
// app.set("view engine", "pug");
// app.set("views", path.resolve(__dirname, "../views"));
app.engine(
	"hbs",
	handlebars({
		extname: ".hbs",
		defaultLayout: "index.hbs",
		layoutsDir: path.resolve(__dirname, "../views/layouts"),
		partialsDir: path.resolve(__dirname, "../views/partials"),
	})
);
app.set("views", "./views");
app.set("view engine", "hbs");


//* Rutas
app.get("/", auth, async (req: any, res: Response) => {

	const user = req.user.firstName + " " + req.user.lastName;
	res.render("home", { logged: true, user });
});

//* Rutas
app.get("/info", async (req: Request, res: Response) => {
	res.json({
		"Argumentos de entrada": process.argv,
		"Nombre de la plataforma": process.platform,
		"Versión de node.js": process.version,
		"Uso de memoria": process.memoryUsage(),
		"Path de ejecución": process.cwd(),
		"Process id": process.pid,
		"Carpeta corriente": "qué es?"
	})
})

app.get("/randoms?", (req: Request, res: Response) => {
	//query cant convert to number
	const { cant } = req.query;
	let cantNumber = Number(cant);
	if (!cantNumber) cantNumber = 100000000;
	const forked = fork(path.resolve(__dirname, "utils/randoms" + path.extname(__filename)));
	forked.send(cantNumber);
	forked.on("message", (message: any) => {
		res.json(message);
	})
})

export default app;
