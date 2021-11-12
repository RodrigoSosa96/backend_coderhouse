import Express, { Application, NextFunction, Request, response, Response } from "express";
import handlebars from "express-handlebars";
import path from "path";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from "express-session";


import { PRODUCTOS } from "./backups";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware";
import routerCarrito from "./routes/carrito.routes";
import routerProductos from "./routes/productos.routes";
// import { BadErrorHandler } from "./utils/Errors";

dotenv.config();

const app: Application = Express();
// const io = new 

//	Middlewares
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
// app.use(cookieParser());

const auth = (req: Request, res: Response, next: NextFunction) => {
	if (req.session?.logged) return next() //req.session?.admin
	else return res.render("index", { producto: {}, existe: false });

}
app.use(Express.static(path.join(__dirname, "../public")));
app.use("/productos", routerProductos);
app.use("/carrito", routerCarrito);


// Motor de plantillas
// app.set("view engine", "pug");
// app.set("views", path.resolve(__dirname, "../views"));
app.engine(
	"hbs",
	handlebars({
		extname: ".hbs",
		defaultLayout: "index.hbs",
		layoutsDir: path.resolve(__dirname, "../views"),
		partialsDir: path.resolve(__dirname, "../views/partials"),
	})
);
app.set("views", "./views");
app.set("view engine", "hbs");


// Rutas
app.get("/", auth, (req, res: Response) => {
	res.redirect("/productos");
});



declare module 'express-session' {
	export interface SessionData {
		contador: number
		userName: string
		admin: boolean
		logged: boolean
	}
}

// app.get("/con-session", (req, res) => {
// 	if (req.session.contador) {
// 		req.session.contador++
// 		res.send(`Usted a visitado el sitio ${req.session.contador} veces`)
// 	} else {
// 		req.session.contador = 1
// 		res.send("Bienvenido")
// 	}
// })


app.get("/logout", (req, res) => {
	req.session.destroy(err => {
		if(!err) res.send("logout ok").redirect("/")
		else res.send({status:"logout error", body: err}).redirect("/")
	})
})

app.get("/login", (req, res) => {
	if (!req.query.username || !req.query.password) {
		res.send("login failed").redirect("/")
	} else if (req.query.username === "alex" && req.query.password === "password") {
		req.session.userName = req.query.username
		req.session.cookie.maxAge = 60000
		req.session.logged = true
		res.send("login success!").redirect("/")
	} else {
		res.send("something went wrong").redirect("/")
	}
	// res.render("index", { login: "true", userName: "test" })
});

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
