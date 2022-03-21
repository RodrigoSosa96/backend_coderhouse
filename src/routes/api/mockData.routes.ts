import { Router } from "express";

import mockController from "../../controllers/api/mockData.controller";

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
    .get("/mensajes", mockController.mensajes)
    .post("/productos", mockController.productos)


export default routerMockData;