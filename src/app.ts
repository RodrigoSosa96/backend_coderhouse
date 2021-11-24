import Express, { Application, NextFunction, Request, response, Response } from "express";
import handlebars from "express-handlebars";
import path from "path";
import cookieParser from 'cookie-parser';
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";

import auth from "./middlewares/auth.middleware";
import routerCarrito from "./routes/carrito.routes";
import routerProductos from "./routes/productos.routes";
import routerMockData from "./routes/mockData.routes";
// import routerUser from "./routes/login.routes";
import mongoConfig from "./configs/mongoDB";
import login from "./routes/user/login.routes";
import logout from "./routes/user/logout.routes";
import signUp from "./routes/user/signup.routes";
import User from "./models/user/User";


const app: Application = Express();

/**
 ** Middlewares
 */
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
passport.serializeUser((user: any, done) => {
	done(null, user._id);
});

passport.deserializeUser((id, done) => {
	const usuario = User.findById(id);
	done(null, usuario);
});


/**
 * * Rutas
 */

app.use(Express.static(path.join(__dirname, "../public")));
app.use("/productos", routerProductos);
app.use("/carrito", routerCarrito);
app.use("/mockdata", routerMockData);
// app.use("/user", routerUser)
app.use("/login", login)
app.use("/logout", logout)
app.use("/signup", signUp)



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
app.get("/", auth, async (_req, res: Response) => {
	res.render("home", { logged: true });
});




export default app;
