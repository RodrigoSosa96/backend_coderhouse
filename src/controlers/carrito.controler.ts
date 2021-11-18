import { NextFunction, Request, Response } from "express";
import { DateTime } from "luxon";

import db from "../index"


export const getCarrito = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// /listar/:id?
	let { params } = req;
	try {
		if (params.id) {
			const carrito = await db.getById("productos", params.id);
			res.status(202).json(carrito);
		} else {
			const carrito = await db.getAll("productos");
			res.status(202).json(carrito);
		}
	} catch {
		next();
	}
};

export const postCarrito = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	//	/agregar/:id_producto"
	try {
		let { params } = req;
		const { id_producto } = params;

		const producto = await db.getById("productos", id_producto);
		const carrito = await db.getById("carrito", "0");
		carrito.productos.push(producto);
		carrito.timestamp = DateTime.local().toISO();
		await db.updateItem("carrito", id_producto, carrito);
		res.status(202).json(carrito);
	} catch {
		next();
	}
};


export const deleteCarrito = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	//	/borrar/:id
	let { params } = req;
	try {
		const carrito = await db.getById("carrito", params.id);
		await db.deleteItem("carrito", params.id);
		res.status(202).json(carrito);
	} catch {
		next();
	}
};
