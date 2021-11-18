import { NextFunction, Request, Response } from "express";
import { DateTime } from "luxon";
import { v4 } from "uuid";

import db from "../index"
import { BadErrorHandler } from "../utils/Errors";
import { serverConfig } from "../constants/config";
import { Producto } from "../models/ecommerce/Producto";



export const getProductos = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	///		/listar/:id?
	let { params } = req;
	try {
		if (params.id) {
			const datosProductos = await db.getById("productos", params.id);
			res.status(202).json(datosProductos);
		} else {
			const datosProductos = await db.getAll("productos") as Producto
			res.status(202).json(datosProductos);
		}
	} catch {
		next();
	}
};

export const postProductos = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// 	/agregar
	//	para administradores
	let { body } = req;
	try {
		if (serverConfig.admin === true) {
			const newProduct = new Producto(
				body.name,
				body.description,
				body.code,
				body.image,
				body.price,
				body.stock,)
			await db.addItem("productos", newProduct);
			res.status(201).json(newProduct);
		} else {
			next(new BadErrorHandler({ statusCode: 401 }));
		}
	} catch {
		next();
	}
};

export const putProductos = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	//	/actualizar/:id
	let { body, params } = req;
	if (serverConfig.admin === true) {
		const updateProduct = {
			timestamp: DateTime.now().toFormat("dd/MM/yyyy HH:mm:s"),
			nombre: body.nombre,
			descripcion: body.descripcion,
			codigo: v4(),
			foto: body.foto,
			precio: parseInt(body.precio),
			stock: parseInt(body.stock),
		};
		const existeProducto = await db.getById("productos", params.id);
		if (existeProducto) {
			await db.updateItem("productos", params.id, updateProduct);
			res.status(202).json(updateProduct);
		} else {
			next();
		}
	} else {
		next();
	}
};

export const deleteProductos = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	//	/borrar/:id
	let { body, params } = req;

	if (body.admin === "true") {
		const existeProducto = await db.getById("productos", params.id);
		if (existeProducto) {
			await db.deleteItem("productos", params.id);
			res.status(202).json({
				message: "Producto borrado",
			});
		} else {
			next(new BadErrorHandler({ statusCode: 404 }));
		}
	} else {
		next(new BadErrorHandler({ statusCode: 401, metodo: "DELETE" }));
	}
};


export const productosMain = async (
	req: Request,
	res: Response,
) => {
	const productos = await db.getAll("productos") as Producto
	if (req.session.logged) {
		res.render("index", { producto: productos, login: true });
	} else if (!req.session.logged) {
		res.render("index", { producto: productos, login: false });
	}
}

