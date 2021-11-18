import Express, { Application, NextFunction, Request, response, Response } from "express";
import handlebars from "express-handlebars";
import path from "path";
import cookieParser from 'cookie-parser';
import session from "express-session";
import MongoStore from "connect-mongo";

import routerCarrito from "./routes/carrito.routes";
import routerProductos from "./routes/productos.routes";
import routerMockData from "./routes/mockData.routes";
import routerUser from "./routes/user.routes";
import mongoConfig from "./configs/mongoDB";


const app: Application = Express();

//	Middlewares
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
const auth = (req: Request, res: Response, next: NextFunction) => {
	if (req.session.logged) return next() //req.session?.admin
	// else return res.render("index", { producto: {}, existe: false });
	return res.status(401).redirect("/user");
}

app.use((req: Request, _res: Response, next: NextFunction) => {
	if (req.session?.contador) {
		req.session.contador++;
		next();
	} else {
		next();
	}
});

//Cookie session con mongo
app.use(cookieParser());
app.use(session({
	store: new MongoStore({
		mongoUrl: mongoConfig.atlasUrl
	}),
	secret: process.env.SECRET_KEY as string,
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 60000 // 1 minuto
	}
}));



/**
 * * Rutas
 */
app.use(Express.static(path.join(__dirname, "../public")));
app.use("/productos", routerProductos);
app.use("/carrito", routerCarrito);
app.use("/mockdata", routerMockData);
app.use("/user", routerUser)

// Motor de plantillas
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


// Rutas
app.get("/", auth, async (req, res: Response) => {
	res.render("home");
});


// app.use(errorHandlerMiddleware);




// app.get("*", async (req, res, next) => {
// 	const error = new BadErrorHandler({statusCode:400});
// 	next(error);
// });

// app.use((error: any, req: any, res: any, next: NextFunction) => {
// 	return res.status(500).json({ error: error.toString() });

// });


export default app;
