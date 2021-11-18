import { NextFunction, Request, Response } from "express";
import db from "../index"

import { mockMensajes, mockProductos } from "../utils/mockData";





export const mensajes = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const data = mockMensajes()
        await db.addItem("mensajes", data);
        res.status(202).json("Datos agregados a base de datos");
    } catch {
        next();
    }
}

export const productos = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const data = mockProductos()
        await db.addItem("productos", data);
        res.status(201).json(data)
    } catch {
        next();
    }
}
