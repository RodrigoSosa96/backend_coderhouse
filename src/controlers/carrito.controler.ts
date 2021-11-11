import { NextFunction, Request, Response } from "express";
import { carritoHuevos, prodHuevos } from "../models/File.controler";
import { CarritoType, ProductoType } from "../utils/interface";
import { DateTime } from "luxon";
import { BadErrorHandler } from "../utils/Errors";
import { PRODUCTOS } from "../backups";
import { Carrito } from "../models/Carrito";



export const getCarrito = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// /listar/:id?
	let { body, params } = req;
	try {
		const datosCarrito = (await carritoHuevos.readFile()) as CarritoType;
		if (params.id !== undefined) {
			let arr = datosCarrito.producto.filter(
				(prod) => prod.id === parseInt(params.id)
			); // agregar para manejar errores
			res.status(202).json(arr);
		} else {
			res.status(202).json(datosCarrito);
		}
	} catch {
		next(new BadErrorHandler({}));
	}
};

export const postCarrito = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	//	/agregar/:id_producto"
	try {
		let { body, params } = req;
		const datosCarrito = (await carritoHuevos.readFile()) as CarritoType;
		const datosProductos = (await prodHuevos.readFile()) as Array<ProductoType>;
		let arrProd = datosProductos.filter(
			(prod) => prod.id === parseInt(params.id_producto)
		);
		if (arrProd.length > 0) {
			datosCarrito.producto.push(arrProd[0]);
			await carritoHuevos.writeFile(datosCarrito);
			res.json(datosCarrito);
		} else {
			res.json(202).json(datosCarrito);
		}
		// const newID = datosCarrito.length + 1;
		// const newCarrito: CarritoType = {
		// 	id: newID,
		// 	timestamp: DateTime.now().toFormat("dd/MM/yyyy HH:mm:s"),
		// 	producto: arrProd[0],
		// };
		// res.json(newCarrito);
		// datosCarrito[0].producto.push(arrProd)
	} catch {
		next(new BadErrorHandler({}));
	}
};


export const deleteCarrito = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	//	/borrar/:id
	let { body, params } = req;
	try {
		const datosCarrito = (await carritoHuevos.readFile()) as Array<CarritoType>;

		let objIndex = datosCarrito.producto.findIndex(
			(obj) => obj.id == parseInt(params.id)
		);
		if (objIndex !== -1) {
			datosCarrito.producto.splice(objIndex, 1);
			await carritoHuevos.writeFile(datosCarrito);
			res.json(datosCarrito);
		} else {
			res.status(403).json({
				error: -1,
				descripcion: "Id del archivo no valida",
			});
		}
	} catch {
		next(new BadErrorHandler({}));
	}
};
