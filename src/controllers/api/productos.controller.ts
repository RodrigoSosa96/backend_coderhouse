import { NextFunction, Request, Response } from "express";
import { v4 } from "uuid";

import {  ProductoModel, Producto } from "../../models/_index";
import { isValidObjectId } from "mongoose";
import Logger from "../../utils/logger";


/**
 * * Ruta: /productos
 */
export const productosMain = async (req: Request, res: Response) => {
	try {
		const productos = await ProductoModel.find().select({ _id: 0, __v: 0 }).lean().exec()
		if (req.isAuthenticated()) res.render("home", { producto: productos, login: true });
		else res.render("home", { producto: productos, login: false });
	} catch {
		res.status(500).json({
			message: "Error al obtener los productos"
		})
	}
}



/**
 * * Ruta: /productos/listar/:id?
 */
export const getProductos = async (req: Request, res: Response) => {
	let { id } = req.params;
	try {
		if (!id) {
			const datos = await ProductoModel.find().select({_id: 0, __v: 0 }).lean().exec()
			res.status(202).json(datos);
		}
		else {
			if (isValidObjectId(id)) {
				const datos = await ProductoModel.findById(id).select({ _id: 0, __v: 0 }).lean().exec()
				res.status(202).json(datos);
			} else {
				res.status(400).json({
					message: "Id inválido"
				})
			}
		}

	} catch {
		res.status(500).json({
			message: "Error al obtener los productos"
		})
	}
};


/**
 * * Ruta: /productos/agregar
 * * Administrador
 */
export const postProductos = async (req: Request, res: Response, next: NextFunction) => {
	let body = req.body as Omit<Producto, "timestamp">
	try {
		if (body.name && body.description && body.image && body.price && body.stock) {
			const newProduct = await ProductoModel.create({
				...body,
				code: body.code ?? v4(),
				timestamp: new Date(),
			});
			res.status(201).json(newProduct);
		} else {
			res.status(401).json({
				error: "No se completaron los campos",
			});
		}
	} catch (err) {
		Logger.error(err)
		res.status(500).json({
			message: "Error al agregar el producto"
		})
	}
};


/**
 * * Ruta: /productos/actualizar/:id
 * * Administrador
 */
export const putProductos = async (req: Request, res: Response) => {
	let id = isValidObjectId(req.params.id) ? req.params.id : null;
	if (!id) return res.status(400).json({ message: "Id inválido" });

	let data = req.body as Producto;
	try {
		const updateProduct = await ProductoModel.findByIdAndUpdate(id, data, { new: true }).lean().exec();
		if (updateProduct) res.status(202).json(updateProduct);
		else res.status(404).json({ error: -1, message: "No se encontro el producto" });
	} catch (err) {
		Logger.error(err);
		res.status(500).json({
			message: "Error al actualizar el producto"
		})
	};
}


/**
 * * Ruta: /productos/borrar/:id
 */
export const deleteProductos = async (req: Request, res: Response) => {
	let id = isValidObjectId(req.params.id) ? req.params.id : null;
	if (!id) return res.status(404).json({ error: -1, message: "Id inválido" });

	try {
		const producto = await ProductoModel.findByIdAndDelete(id).lean().exec();
		producto
			? res.status(202).json({ message: "Producto eliminado" })
			: res.status(404).json({ error: -1, message: "No se encontro el producto" });


	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: "Error al eliminar el producto"
		})
	}
}
