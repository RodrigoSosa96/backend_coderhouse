import { NextFunction, Request, Response } from "express";
import { DateTime } from "luxon";
import { v4 } from "uuid";

import db from "../index"
import { serverConfig } from "../configs";
import { Producto } from "../models/ecommerce/Producto";


export const getProductos = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	///		/listar/:id?
	try {
		let { params } = req;
		if (params.id) {
			const datosProductos = await db.getById("productos", params.id);
			if (datosProductos) res.status(202).json(datosProductos);
			else res.status(404).json({ error: -1, message: "No se encontro el producto" });
		} else {
			const datosProductos = await db.getAll("productos") as Producto
			res.status(202).json(datosProductos);
		}
	} catch {
		next();
	}
};


/**
 * * Ruta: /productos/agregar
 * * Administrador
 */
export const postProductos = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		let { body } = req;
		if(!serverConfig.admin) throw new Error("No esta autorizado para realizar esta accion");  
		if (body.name && body.description && body.image && body.price && body.stock) {
			const newProduct = new Producto(
				body.name,
				body.description,
				body.code ?? v4(),
				body.image,
				body.price,
				body.stock,
			)
			await db.addItem("productos", newProduct);
			res.status(201).json(newProduct);
		} else {
			res.status(401).json({
				error: "No se completaron los campos",
			});
		}
	} catch {
		next();
	}
};


/**
 * * Ruta: /productos/actualizar/:id
 * * Administrador
 */
export const putProductos = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		let { body, params } = req;
		if (serverConfig.admin === true) {
			//! Revisar propiedades que no existen en el modelo
			//! Revisar si vale la pena con mongo
			const data = {
				...body
			};
			const updateProduct = await db.updateItem("productos", params.id, data);
			if (updateProduct) res.status(202).json(updateProduct);
			else res.status(404).json({ error: -1, message: "No se encontro el producto" });
			
			// let existeProducto = await db.getById("productos", params.id);
			// if (existeProducto) {
			// 	existeProducto = { ...existeProducto, ...updateProduct }
			// 	await db.updateItem("productos", params.id, existeProducto);
			// 	res.status(202).json(existeProducto);
			// } else {
			// 	res.status(404).json({ error: -1, message: "No se encontro el producto" });
			// }
		} else {
			res.status(401).json({
				error: "No tienes permisos para actualizar productos",
			});
		}
	} catch(err) {
		next(err);
	}
};


/**
 * * Ruta: /productos/borrar/:id
 */
export const deleteProductos = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		let { params } = req;
		if (serverConfig.admin) {
			const existeProducto = await db.getById("productos", params.id);
			if (!existeProducto) next();
			await db.deleteItem("productos", params.id);
			res.status(202).json({
				message: "Producto borrado",
			});
		} else {
			res.status(401).json({
				error: "No tienes permisos para borrar productos",
			});
		}
	} catch {
		next();
	}


};

/**
 * * Ruta: /productos
 */
export const productosMain = async (
	req: Request,
	res: Response,
) => {
	if (req.session.logged) {
		res.render("index", { producto: db.getAll("productos"), login: true });
	} else if (!req.session.logged) {
		res.render("index", { producto: db.getAll("productos"), login: false });
	}
}

