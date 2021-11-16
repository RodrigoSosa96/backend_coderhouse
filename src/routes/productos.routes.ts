import { Router } from "express";
import { getProductos, postProductos, putProductos, deleteProductos, productosMain }  from "../controllers/productos.controller";


const routerProductos = Router();

routerProductos
	.get("/", productosMain)// arreglar
	.get("/listar/:id?", getProductos)
	.post("/agregar", postProductos)			//Admin
	.put("/actualizar/:id", putProductos)		//Admin
	.delete("/borrar/:id", deleteProductos)	//Admin

export default routerProductos;

