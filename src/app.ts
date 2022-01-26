import Express, { Application } from "express";
import handlebars from "express-handlebars";
import passport from "passport";
import path from "path";

//	*Import de Routers
import { carrito, mockData, productos } from "./routes/api/_index";
import routerUsuarios from "./routes/user/user.router";

//	*Varios
import { middlewares } from "./middlewares/_init.middlewares";
import { passport_load } from "./passport";
import { upload } from "./middlewares/multer.middleware";
import { Types } from "mongoose";

declare global {
	namespace Express {
		interface User {
			_id?: Types.ObjectId;
			email?: string;
			name?: string;
			carrito?: any;
		}
	}
}
const app: Application = Express();

//*	Middlewares

app.use(middlewares)
passport_load(passport);


// * Rutas

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
	if (req.user) res.render("home", { logged: true, user: req.user.name});
	else res.render("home", { logged: true, user: "USER ERROR" });
});

app.get("/test",upload.single("picture"), (req, res, next) => {
	console.log("test");
	console.log(req.body);
	res.send("test");
})



//* Error 404
app.use(function (_req, res) {
	res.status(404).send('Ruta no encontrada');
});

export default app;
