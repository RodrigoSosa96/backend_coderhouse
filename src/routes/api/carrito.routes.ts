import { Router } from "express";

import { getCarrito, postCarrito, deleteCarrito } from "../../controllers/api/carrito.controller";
import { authCarrito } from "../../middlewares/auth.middleware";

const routerCarrito = Router()
routerCarrito
    .use(authCarrito)
    .get("/listar/:id?", getCarrito)
    .post("/agregar/:id_producto", postCarrito)
    .delete("/borrar/:id", deleteCarrito)


export default routerCarrito