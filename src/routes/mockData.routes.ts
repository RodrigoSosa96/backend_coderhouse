import { Router } from "express";

import { mensajes, productos } from "../controllers/mockData.controller";

const routerMockData = Router();

routerMockData
    .get("/", (_req, res) => {
        res.json({
            ok: true,
            mensaje: "MockData",
            rutasGET: {
                mensajes: "/mensajes",
                productos: "/productos",
            }
            })
    })
    .get("/mensajes", mensajes)
    .get("/productos", productos)


export default routerMockData;