import { Request, Response } from "express";
import { ProductoModel, MensajeModel } from "../../models"
import { mockProductos } from "../../utils/mockData";


class mockController {
    constructor() {}
    static async productos  (_req: Request, res: Response) {
        try {
            const data = mockProductos()
            const test = await ProductoModel.create(data);
            res.status(201).json(test)
        } catch {
            res.status(500).json("Error al agregar datos a base de datos");
        }
    }
    static async mensajes (_req: Request, res: Response) {
        res.status(200).json({ ok: true, mensaje: "Mock mensajes no implementado" });
        // try {
        //     const data = mockMensajes()
        //     await MensajesModel.create(data);
        //     res.status(202).json("Datos agregados a base de datos");
        // } catch {
        //     res.status(500).json("Error al agregar datos a base de datos");
        // }
    }
    

}

export default mockController;