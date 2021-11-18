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
import db from "./index"

const app: Application = Express();
// const io = new 

//	Middlewares
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

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



const auth = (req: Request, res: Response, next: NextFunction) => {
	if (req.session.logged) return next() //req.session?.admin
	// else return res.render("index", { producto: {}, existe: false });
	return res.status(401).redirect("/login");
}


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
	// if (req.session.logged) {
	// 	const productos = await db.getAll("productos");
	// 	res.render("index", {
	// 		productos,
	// 		login: true
	// 	});
	// } else {
	// 	res.render("login");
	// }
	res.render("home");
});

declare module 'express-session' {
	export interface SessionData {
		logged: boolean
		contador: number
		user: string
		admin: boolean
	}
}
app.get("/login", (req, res: Response) => {
	if (req.session.logged || req.body.user === "alex" && req.body.password === "20605") {
		req.session.logged = true;
		req.session.user = req.body.user;
		res.redirect("/");
	} else {
		res.render("login");
	}
});
// app.post("/login", (req, res: Response) => {
// 	if (req.body.user === "alex" && req.body.password === "20605") {
// 		req.session.logged = true;
// 		req.session.user = req.body.user;
// 		res.redirect("/");
// 	} else {
// 		res.redirect("/login");
// 	}
// });
app.get("/login/test", (req, res: Response) => {
	if(req.session.logged) {
		res.redirect("/");
	} else if(req.query.username === "alex" && req.query.password === "20605") {
		req.session.logged = true;
		req.session.user = req.query.username;
		res.redirect("/");
	} else {
		res.redirect("/login");
	}

})


// app.get("/logout", (req, res) => {
// 	req.session.destroy(err => {
// 		if (!err) res.send("logout ok").redirect("/")
// 		else res.send({ status: "logout error", body: err }).redirect("/")
// 	})
// })

// app.get("/login", (req, res) => {
// 	if(req.session.logged) return res.redirect("/")
// 	res.render("login", { existe: false });
// })
// if (!req.query.username || !req.query.password) {
// 	res.send("login failed").redirect("/")
// } else if (req.query.username === "alex" && req.query.password === "password") {
// 	req.session.userName = req.query.username
// 	req.session.cookie.maxAge = 60000
// 	req.session.logged = true
// 	res.send("login success!").redirect("/")
// } else {
// 	res.send("something went wrong").redirect("/")
// }
// res.render("index", { login: "true", userName: "test" })
// });

// app.get("/content", auth, (req, res) => {
//     res.send('Puedes ver este contenido si estás logueado y sos un administrador');
// })


// app.use(errorHandlerMiddleware);




// app.get("*", async (req, res, next) => {
// 	const error = new BadErrorHandler({statusCode:400});
// 	next(error);
// });

// app.use((error: any, req: any, res: any, next: NextFunction) => {
// 	return res.status(500).json({ error: error.toString() });

// });


export default app;
