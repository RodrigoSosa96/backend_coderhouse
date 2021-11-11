import { NextFunction, Request, Response } from "express";
import { DateTime } from "luxon";
import { v4 } from "uuid";
import { ProductoType } from "../utils/interface";
import { BadErrorHandler } from "../utils/Errors";
import { carritoHuevos, prodHuevos } from "../models/File.controler";
import { serverConfig } from "../constants/config";
import { Producto } from "../models/Producto";
import { CARRITO, PRODUCTOS } from "../backups";


export const getProductos = async (
	///		/listar/:id?
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let { body, params } = req;
	try {
		const datosProductos = (await prodHuevos.readFile()) as Array<ProductoType>;
		if (params.id !== undefined) {
			let arr = datosProductos.filter(
				(prod) => prod.id === parseInt(params.id)
			);
			res.status(202).json(arr);
		} else {
			res.status(202).json(datosProductos);
		}
	} catch {
		next(new BadErrorHandler({}));
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
			const datosProductos =
				(await prodHuevos.readFile()) as Array<ProductoType>;
			const newID = datosProductos.length + 1;
			const newProduct: ProductoType = {
				id: newID,
				timestamp: DateTime.now().toFormat("dd/MM/yyyy HH:mm:s"),
				nombre: body.nombre,
				descripcion: body.descripcion,
				codigo: v4(),
				foto: body.foto,
				precio: parseInt(body.precio),
				stock: parseInt(body.stock),
			};
			datosProductos.push(newProduct);
			await prodHuevos.writeFile(datosProductos);
			res.status(201).json(newProduct);
		} else {
			next(new BadErrorHandler({ statusCode: 401 }));
		}
	} catch {
		next(new BadErrorHandler({}));
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
		const datosProductos = (await prodHuevos.readFile()) as Array<ProductoType>;
		let objIndex = datosProductos.findIndex(
			(obj) => obj.id == parseInt(params.id)
		);
		if (objIndex !== -1) {
			// const newID = datosProductos.length + 1;
			datosProductos[objIndex] = {
				id: parseInt(body.id) || 0,
				timestamp: DateTime.now().toFormat("dd/MM/yyyy HH:mm:s"),
				nombre: body.nombre,
				descripcion: body.descripcion,
				codigo: v4(),
				foto: body.foto,
				precio: parseInt(body.precio),
				stock: parseInt(body.stock),
			};
			await prodHuevos.writeFile(datosProductos);
			res.status(201).json(datosProductos[objIndex])
		} else {
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
		const datosProductos = (await prodHuevos.readFile()) as Array<ProductoType>;
		let objIndex = datosProductos.findIndex(
			(obj) => obj.id == parseInt(params.id)
		);
		if (objIndex !== -1) {
			datosProductos.splice(objIndex, 1);
			await prodHuevos.writeFile(datosProductos);
			res.json(datosProductos);
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

