import Express, { Application, NextFunction, Request, Response } from "express";
import path from "path";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware";
import routerCarrito from "./routes/carrito.routes";
import routerProductos from "./routes/productos.routes";
import { BadErrorHandler } from "./utils/Errors";

const app: Application = Express();

//	Middlewares
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(Express.static(path.join(__dirname, "../public")));
app.use("/productos", routerProductos);
app.use("/carrito", routerCarrito);
// app.set("view engine", "pug");
// app.set("views", path.resolve(__dirname, "../views"));



app.get("/", (req: Request, res: Response) => {
	res.render("index");
});

app.use(errorHandlerMiddleware);




// app.get("*", async (req, res, next) => {
// 	const error = new BadErrorHandler({statusCode:400});
// 	next(error);
// });

// app.use((error: any, req: any, res: any, next: NextFunction) => {
// 	return res.status(500).json({ error: error.toString() });
	
// });


export default app;
