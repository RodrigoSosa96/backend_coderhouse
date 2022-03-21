import { Router } from "express";

import CarritoController from "../../controllers/api/carrito.controller";
import { authCarrito } from "../../middlewares/auth.middleware";

const routerCarrito = Router()
routerCarrito
    .use(authCarrito)
    .get("/listar/:id?", CarritoController.get)
    .post("/agregar/:id_producto", CarritoController.post)
    .delete("/borrar/:id", CarritoController.delete)


export default routerCarrito