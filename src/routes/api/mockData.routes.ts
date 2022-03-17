import { Router } from "express";

import { mensajes, productos } from "../../controllers/api/mockData.controller";

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
    .post("/productos", productos)


export default routerMockData;