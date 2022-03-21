import { Router } from "express";
import ProductosController from "../../controllers/api/productos.controller";


const routerProductos = Router();
//! Admin middleware
routerProductos
	.get("/", ProductosController.mainPage)// arreglar
	.get("/listar/:id?", ProductosController.get)
	.post("/agregar", ProductosController.post)			//Admin
	.put("/actualizar/:id", ProductosController.put)		//Admin
	.delete("/borrar/:id", ProductosController.delete)	//Admin

export default routerProductos;

