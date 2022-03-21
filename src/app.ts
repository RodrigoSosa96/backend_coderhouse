import Express, { Application } from "express";
import handlebars from "express-handlebars";
import passport from "passport";
import path from "path";

//	*Import de Routers
import { carrito, mockData, productos } from "./routes/api";
import routerUsuarios from "./routes/user/user.router";

//	*Varios
import { middlewares } from "./middlewares/Init.middlewares";
import { passport_load } from "./controllers/passport";
// import { upload } from "./middlewares/multer.middleware";
import { Types } from "mongoose";
import { User as U } from "./models/user";


declare global {
	namespace Express {
		
		interface User extends U {
			_id?: Types.ObjectId;
		}
	}
}
const app = Express()

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
	if (req.isAuthenticated())
		res.render("home", { logged: true, user: req.user.name, jsfile: "chat.js" });
	else res.render("home", { logged: false }); 
});


//* Error 404
app.use(function (_req, res) {
	res.status(404).send('Ruta no encontrada');
	// res.render('404');

});

export default app;
