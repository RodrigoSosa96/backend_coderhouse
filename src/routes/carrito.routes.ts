import { Router } from "express";
import { getCarrito, postCarrito, deleteCarrito } from "../controlers/carrito.controler";

const routerCarrito = Router()

routerCarrito
    .get("/listar/:id?", getCarrito)
    .post("/agregar/:id_producto", postCarrito)
    .delete("/borrar/:id", deleteCarrito)

export default routerCarrito