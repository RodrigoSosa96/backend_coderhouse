import { NextFunction, Request, Response } from "express";
import { DateTime } from "luxon";
import { v4 } from "uuid";

import db from "../index"
import { BadErrorHandler } from "../utils/Errors";
import { serverConfig } from "../constants/config";
import { PRODUCTOS } from "../backups";
import { ProductoType } from "../utils/interface";



export const getProductos = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	///		/listar/:id?
	let { params } = req;
	try {
		// const datosProductos = await prodHuevos.readFile() as ProductoType[];
		if (params.id) {
			const datosProductos = await db.getById("productos", params.id);
			res.status(202).json(datosProductos);
		} else {
			const datosProductos = await db.getAll("productos") as ProductoType[]
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

			// const datosProductos = await prodHuevos.readFile() as ProductoType[];
			// const newID = datosProductos.length + 1;
			const newProduct: ProductoType = {
				timestamp: DateTime.now().toFormat("dd/MM/yyyy HH:mm:s"),
				nombre: body.nombre,
				descripcion: body.descripcion,
				codigo: v4(),
				foto: body.foto,
				precio: parseInt(body.precio),
				stock: parseInt(body.stock),
			};
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
		// const datosProductos = (await prodHuevos.readFile()) as ProductoType[];
		// let objIndex = datosProductos.findIndex(
		// 	(obj) => obj.id == parseInt(params.id)
		// );
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
			next(new BadErrorHandler({ statusCode: 404 }));
		}
	} else {
		next(new BadErrorHandler({ statusCode: 401, metodo: "PUT", message: "No tienes permisos para actualizar productos" }));
	}
	// const existe = await productos.updateItem(params.id, updateProduct)
	// if (existe !== 0) {
	// 	const lastProd = await productos.getItems(params.id)
	// 	res.status(201).json(lastProd)
	// }
	// else {
	// 	res.status(403).json({
	// 		error: -1,
	// 		descripcion: "Id del archivo no valida",
	// 	});
	// }

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
	// 	const deleteProductos = await db.deleteItem("productos", Number(params.id));
	// 	if (deleteProductos !== 0) {
	// 		const listaProd = await productos.getItems()
	// 		res.json(listaProd);
	// 	} else {
	// 		res.status(403).json({
	// 			error: -1,
	// 			descripcion: "Id del archivo no valida",
	// 		});
	// 	}
	// } else {
	// 	next(new BadErrorHandler({ metodo: "DELETE", statusCode: 401 }))

	// }

};


export const productosMain = async (
	req: Request,
	res: Response,
) => {
	if (req.session.logged) {
		res.render("index", { producto: PRODUCTOS, login: true });
	} else if (!req.session.logged) {
		res.render("index", { producto: PRODUCTOS, login: false });
	}
}

