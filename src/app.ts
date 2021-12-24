import Express, { Application, NextFunction, Request, Response } from "express";
import handlebars from "express-handlebars";
import cookieParser from 'cookie-parser';
import MongoStore from "connect-mongo";
import session from "express-session";
import flash from "connect-flash";
import passport from "passport";
import path from "path";
import compression from "compression";

//	*Import de Routers
import { carrito, mockData, productos } from "./routes/api";
import routerUsuarios from "./routes/user/user.router";

//	*Varios
import { auth } from "./middlewares";
import { mongoDbConfigs } from "./configs";
import userModel from "./models/user/user.model";


const app: Application = Express();
/**
 ** Middlewares
 */
app.use(compression())
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
	store: new MongoStore({
		mongoUrl: mongoDbConfigs.atlasUrl
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
		const user = await userModel.findById(id);
		done(null, user);
	}
	catch (err) {
		done(null, false);
	}
});


/**
 * * Routers
 */

app.use(Express.static(path.join(__dirname, "../public")));
app.use("/productos", productos);
app.use("/carrito", carrito);
app.use("/mockdata", mockData);
app.use("/user", routerUsuarios);



//* Motor de plantillas

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

declare global {
	namespace Express {
		interface User {
			firstName?: string;
			lastName?: string;
		}
	}
}
app.get("/", auth, async (req: Request, res: Response) => {
	if (req.user) res.render("home", { logged: true, user: req.user.firstName + " " + req.user.lastName });
	else res.render("home", { logged: true, user: "USER ERROR" });
});

app.get("/info", (_req, res: Response) => {
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

//* Error 404
app.use(function (_req, res, next) {
	res.status(404).send('Ruta no encontrada');
});

export default app;
