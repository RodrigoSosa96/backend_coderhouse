import { NextFunction, Request, Response } from "express";
import db from "../../index"

import { Carrito } from "../../models/ecommerce";

/**
 * ! Revisar todo el carrito
 * 
 */

/**
 * * Ruta: carrito/listar/:id?
 */
export const getCarrito = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		let { params } = req;
		if (params.id) {
			const carrito = await db.getById("productos", params.id);
			res.status(202).json(carrito);
		} else {
			const carrito = await db.getAll("productos") as Carrito
			if (carrito.productos.length > 0) res.status(202).json(carrito);
			else res.status(404).json({ message: "No hay productos en el carrito" });
		}
	} catch {
		next();
	}
};

/**
 * * Ruta: carrito/agregar/:id_producto
 */
export const postCarrito = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		let { params } = req;
		const { id_producto } = params;
		const producto = await db.getById("productos", id_producto);
		let carrito = await db.getById("carrito", "0");
		if(producto) {
			carrito.productos.push(producto);
			carrito.timestamp = new Date().toISOString();
			await db.updateItem("carrito", id_producto, carrito);
			res.status(202).json(carrito);
		} else {
			res.status(404).json({ message: "El producto no existe" });
		}
	} catch {
		next();
	}
};

/**
 * * Ruta: carrito/borrar/:id
 */
export const deleteCarrito = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	//	/borrar/:id
	let { params } = req;
	try {
		const carrito = await db.getById("carrito", params.id);
		const deleted = await db.deleteItem("carrito", params.id);
		if (deleted === 1) res.status(202).json(carrito);
		else res.status(404).json({ message: "No se pudo borrar el producto" });
	} catch {
		next();
	}
};
