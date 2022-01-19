import Express, { Application } from "express";
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
import { passport_load } from "./passport";
import { mongoDbConfigs } from "./configs";
import { auth } from "./middlewares";
import { Types } from "mongoose";
import morganMiddleware from "./middlewares/morgan.middleware";

declare global {
	namespace Express {
		interface User {
			_id?: Types.ObjectId;
			firstName?: string;
			lastName?: string;
		}
	}
}
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
		mongoUrl: mongoDbConfigs.url,
		collectionName: "sessions"
	}),
	secret: process.env.SECRET_KEY!,
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 600000 // 10 minutos
	}
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(morganMiddleware)
app.use(flash());
passport_load(passport);


/**
 * * Routers
 */

app.use(Express.static(path.join(__dirname, "../public")));
app.use("/productos", productos);
app.use("/carrito", carrito);
app.use("/mockdata", mockData);
app.use("/", routerUsuarios);




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

app.get("/", async (req, res) => {
	if (req.user) res.render("home", { logged: true, user: req.user.firstName + " " + req.user.lastName });
	else res.render("home", { logged: true, user: "USER ERROR" });
});





//* Error 404
app.use(function (_req, res) {
	res.status(404).send('Ruta no encontrada');
});

export default app;
