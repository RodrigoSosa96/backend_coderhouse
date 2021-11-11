import { NextFunction, Request, Response } from "express";
import { DateTime } from "luxon";
import { v4 } from "uuid";
import { ProductoType } from "../utils/interface";
import { BadErrorHandler } from "../utils/Errors";
import { serverConfig } from "../constants/config";
import { CARRITO, PRODUCTOS } from "../backups";
import { productos } from "../models/databases"

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
			const datosProductos = await productos.getItems(parseInt(params.id))
			res.status(202).json(datosProductos);
		} else {
			const datosProductos = await productos.getItems() as ProductoType[]
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
			await productos.newItems(newProduct)
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
		const existe = await productos.updateItem(params.id, updateProduct)
		if (existe !== 0) {
			const lastProd = await productos.getItems(params.id)
			res.status(201).json(lastProd)
		}
		else {
			res.status(403).json({
				error: -1,
				descripcion: "Id del archivo no valida",
			});
		}
	} else {
		next(new BadErrorHandler({ statusCode: 401, metodo: "PUT" }));
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
		const deleteProductos = await productos.deleteItem(params.id)
		if (deleteProductos !== 0) {
			const listaProd = await productos.getItems()
			res.json(listaProd);
		} else {
			res.status(403).json({
				error: -1,
				descripcion: "Id del archivo no valida",
			});
		}
	} else {
		next(new BadErrorHandler({ metodo: "DELETE", statusCode: 401 }))

	}

};


export const productosMain = async (
	_req: Request,
	res: Response,
) => {
	res.render("index", { producto: PRODUCTOS, existe: true });
}

