import { NextFunction, Request, Response } from "express";
import { v4 } from "uuid";

import { ProductosModel, IProductos } from "../../models/schemas";
import { serverConfig } from "../../configs";


/**
 * * Ruta: /productos
 */
export const productosMain = async (
	req: Request,
	res: Response,
) => {
	try {
		const productoss: IProductos[] = await ProductosModel.find().exec()
		if (req.isAuthenticated()) res.render("home", { producto: productoss, login: true });
		else res.render("home", { producto: ProductosModel, login: false });
	} catch {
		res.status(500).json({
			message: "Error al obtener los productos"
		})
	}
}



/**
 * * Ruta: /productos/listar/:id?
 */
export const getProductos = async (
	req: Request,
	res: Response,
) => {
	try {
		let { params } = req;
		if (params.id) {
			const datosProductos = await ProductosModel.findById(params.id).exec()
			if (datosProductos) res.status(202).json(datosProductos);
			else res.status(404).json({ error: -1, message: "No se encontro el producto" });
		} else {
			const datosProductos = await ProductosModel.find().exec()
			res.status(202).json(datosProductos);
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
export const postProductos = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		let { body } = req;
		if (!serverConfig.admin) throw new Error("No esta autorizado para realizar esta accion");
		if (body.name && body.description && body.image && body.price && body.stock) {
			const newProduct: IProductos = await ProductosModel.create({
				code: v4(),
				name: body.name,
				description: body.description,
				image: body.image,
				price: body.price,
				stock: body.stock
			});
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
		if (serverConfig.admin) {
			const data = {
				...body
			};
			const updateProduct = await ProductosModel.findByIdAndUpdate(params.id, data, { new: true }).exec();
			if (updateProduct) res.status(202).json(updateProduct);
			else res.status(404).json({ error: -1, message: "No se encontro el producto" });
		} else {
			res.status(401).json({
				error: "No tienes permisos para actualizar productos",
			});
		}
	} catch {
		res.status(500).json({
			message: "Error al actualizar el producto"
		})
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
			const existeProducto = await ProductosModel.findById(params.id).exec();
			if (!existeProducto) next();
			await ProductosModel.deleteOne({ _id: params.id }).exec();
			res.status(202).json({
				message: "Producto borrado",
			});
		} else {
			res.status(401).json({
				error: "No tienes permisos para borrar productos",
			});
		}
	} catch {
		res.status(500).json({
			message: "Error al borrar el producto"
		})
	}
};
