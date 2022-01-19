import { Request, Response } from "express";
import { ProductosModel, MensajesModel } from "../../models/schemas"
import { mockProductos } from "../../utils/mockData";





export const mensajes = async (_req: Request, res: Response) => {
    // try {
    //     const data = mockMensajes()
    //     await MensajesModel.create(data);
    //     res.status(202).json("Datos agregados a base de datos");
    // } catch {
    //     res.status(500).json("Error al agregar datos a base de datos");
    // }
}

export const productos = async (_req: Request, res: Response) => {
    try {
        const data = mockProductos()
        await ProductosModel.create(data);
        res.status(201).json(data)
    } catch {
        res.status(500).json("Error al agregar datos a base de datos");
    }
}
