import Express, { Application, NextFunction, Request, Response } from "express";
import handlebars from "express-handlebars";
import path from "path";
import { PRODUCTOS } from "./backups";

import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware";
import routerCarrito from "./routes/carrito.routes";
import routerProductos from "./routes/productos.routes";
// import { BadErrorHandler } from "./utils/Errors";


const app: Application = Express();
// const io = new 

//	Middlewares
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
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
app.get("/", (_req, res: Response) => {
	res.redirect("/productos");
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
