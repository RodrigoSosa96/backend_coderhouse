import { NextFunction, Request, Response } from "express";
import { DateTime } from "luxon";

import { carritoHuevos, prodHuevos } from "../models/File";
import { CarritoType, ProductoType } from "../utils/interface";




export const getCarrito = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// /listar/:id?
	let { params } = req;

	try {
		const datosCarrito = await carritoHuevos.readFile() as CarritoType[]
		if (params.id) {
			let arr = datosCarrito[0].producto.filter(
				(prod) => prod.id === parseInt(params.id)
			);

			res.status(202).json(arr);
		} else {
			res.status(202).json(datosCarrito);
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
		const datosCarrito = (await carritoHuevos.readFile()) as CarritoType[];
		const datosProductos = (await prodHuevos.readFile()) as Array<ProductoType>;
		let arrProd = datosProductos.filter(
			(prod) => prod.id === parseInt(params.id_producto)
		);
		if (arrProd.length > 0) {
			datosCarrito[0].producto.push(arrProd[0]);
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
		const datosCarrito = (await carritoHuevos.readFile()) as Array<CarritoType>;

		let objIndex = datosCarrito[0].producto.findIndex(
			(obj) => obj.id == parseInt(params.id)
		);
		if (objIndex !== -1) {
			datosCarrito[0].producto.splice(objIndex, 1);
			await carritoHuevos.writeFile(datosCarrito);
			res.json(datosCarrito);
		} else {
			res.status(403).json({
				error: -1,
				descripcion: "Id del archivo no valida",
			});
		}
	} catch {
		next();
	}
};
