import { Router } from "express";
import { getProductos, postProductos, putProductos, deleteProductos, productosMain }  from "../../controllers/api/productos.controller";


const routerProductos = Router();
//! Admin middleware
routerProductos
	.get("/", productosMain)// arreglar
	.get("/listar/:id?", getProductos)
	.post("/agregar", postProductos)			//Admin
	.put("/actualizar/:id", putProductos)		//Admin
	.delete("/borrar/:id", deleteProductos)	//Admin

export default routerProductos;

