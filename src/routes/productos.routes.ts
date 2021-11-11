import { Router } from "express";
import { getProductos, postProductos, putProductos, deleteProductos } from "../controlers/productos.controler";


const routerProductos = Router();

routerProductos
	.get("/listar/:id?", getProductos)
	.post("/agregar", postProductos)			//Admin
	.put("/actualizar/:id", putProductos)		//Admin
	.delete("/borrar/:id", deleteProductos);	//Admin

export default routerProductos;
